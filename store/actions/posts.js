import { apiUrl } from "../../helpers/apiUtils";
import AsyncStorage from "@react-native-community/async-storage";
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';
export const FETCH_POSTS = 'FETCH_POSTS';
export const SEARCH_POSTS = 'SEARCH_POSTS';
export const UPDATE_POSTS_MEDIAS = 'UPDATE_POSTS_MEDIAS';
export const FETCH_ARCHIVES = 'FETCH_ARCHIVES';
export const FETCH_FAVORITES_NEW = 'FETCH_FAVORITES_NEW';
export const TOGGLE_FAVORITE_NEW = 'TOGGLE_FAVORITE_NEW';

// export const toggleFavorite = (postId) => {
//     return async dispatch => {
//         try {
//             //async code here
//             await AsyncStorage.setItem('favorites', postId.toString());
//             var cc = await AsyncStorage.getItem('favorites');
//             console.log('FAV');
//             console.log(cc);
//             dispatch({ type: TOGGLE_FAVORITE, postId: postId });
//         }
//         catch (error) { throw error; }
//     }
// };

export const toggleFavorite = (post) => {
    return async dispatch => {
        try {
            //async code here
            debugger;
            var savedFavs = await AsyncStorage.getItem('favorites');
            var favsList = savedFavs ? JSON.parse(savedFavs).list : [];
            var updatedList = favsList;
            var foundFavIndex = updatedList.indexOf(updatedList.find(p => p.id == post.id))
            if (foundFavIndex >= 0) {
                updatedList.splice(foundFavIndex, 1);
            }
            else {
                updatedList = [post].concat(favsList);
            }
            await AsyncStorage.setItem('favorites', JSON.stringify({ list: updatedList }));
            console.log(updatedList);
            //await AsyncStorage.setItem('favorites', postId.toString());
            //var cc = await AsyncStorage.getItem('favorites');
            dispatch({ type: TOGGLE_FAVORITE_NEW, favs: updatedList });
        }
        catch (error) {
            throw error;
        }
    }
};

export const fetchFavorites = () => {
    return async dispatch => {
        try {
            //async code here
            var savedFavs = await AsyncStorage.getItem('favorites');
            var favsList = savedFavs ? JSON.parse(savedFavs).list : [];
            dispatch({ type: FETCH_FAVORITES_NEW, favs: favsList });
        }
        catch (error) { throw error; }
    }
}

export const setFilters = (keyword) => {
    return { type: SET_FILTERS, keyword: keyword }
}

const DEFAULT_LIMIT = 10;
const DEFAULT_ARCHIVES_LIMIT = 50;

var excludedCategories = [];
export const fetchPosts = (categoryId, start = 1, limit = DEFAULT_LIMIT) => {
    return async dispatch => {
        try {
            //any async code
            await setExludedCategories();
            let url = `${apiUrl}posts?_embed&status=publish&per_page=${limit}&page=${start}`;
            if (categoryId)
                url += `&categories=${categoryId}`;
            else
                url += `&categories_exclude=${excludedCategories.join(',')}`;
            const response = await fetch(url);
            var resData = await response.json();
            console.log('fetch response:');
            var stopPagination = false;
            if (resData.code) {
                stopPagination = true;
                resData = [];
                console.log('PAGINATION STOPED (FETCH)');
            }
            //debugger;
            //await getPostsMedias(resData);
            //setPostsMedia(resData);
            //console.log(resData);
            //throw ('123');
            dispatch({ type: FETCH_POSTS, posts: resData, page: start, stopPagination: stopPagination, categoryId: categoryId });
        } catch (error) {
            throw error;
        }
    }
}

export const setPostsMedia = (posts, allMediasIds) => {
    //debugger;
    // const posts = initialState.posts;
    return async dispatch => {
        try {
            let medias = await getPostsMedias(posts, allMediasIds);
            dispatch({ type: UPDATE_POSTS_MEDIAS, medias: medias });
        }
        catch (error) { console.log(error) }
    }
}


export const searchPosts = (keyword, start = 1, limit = DEFAULT_LIMIT) => {
    return async dispatch => {
        try {
            //debugger;
            //any async code
            console.log('search: ' + keyword);
            await setExludedCategories();
            const response = await fetch(`${apiUrl}posts?_embed&status=publish&per_page=${limit}&page=${start}&categories_exclude=${excludedCategories.join(',')}&search=${keyword}`);
            var resData = await response.json();
            console.log('search response:');
            //await getPostsMedias(resData);
            console.log(resData);
            var stopPagination = false;
            if (resData.code) {
                stopPagination = true;
                resData = [];
                console.log('PAGINATION STOPED (SEARCH)');
            }
            //throw ('123');
            dispatch({ type: SEARCH_POSTS, posts: resData, page: start, stopPagination: stopPagination });
        } catch (error) {
            throw error;
        }
    }
}

const setExludedCategories = async () => {
    if (excludedCategories.length == 0) {
        try {
            const excludedCategoriesResponse = await fetch(`${apiUrl}categories?parent=202&per_page=100`);
            excludedCategories = (await excludedCategoriesResponse.json()).map(ec => ec.id);
            console.log(`excluded_categories:${excludedCategories}`);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const getPostsMedias = async (posts, allMediasIds = []) => {
    if (posts) {
        // debugger;
        const featured_medias_urls = posts.filter(p => !allMediasIds.includes(p.featured_media) && p.media === undefined && p.featured_media !== undefined && p.featured_media != 0 && p.featured_media != null).map(p => `https://assafinaonline.com/wp-json/wp/v2/media/${p.featured_media}`);

        const fetches = featured_medias_urls.map(url => {
            return fetch(url).then(response => response.json());
        });
        console.log('fetches collected');
        var media_response = await Promise.all(fetches);
        console.log('fetches called:' + media_response.length);
        // media_response.forEach(media => {
        //     var foundPost = posts.find(p => p.featured_media == media.id);
        //     if (foundPost) {
        //         foundPost.media = media.guid.rendered;
        //     }
        // });
        //console.log('media assigned to posts');
        return media_response;
        //debugger;
        //dispatch({ type: FETCH_POSTS, posts: posts });
    }
}



export const fetchArchives = (categoryId, start = 1, limit = DEFAULT_ARCHIVES_LIMIT) => {
    return async dispatch => {
        try {
            //any async code
            let url = `${apiUrl}posts?_embed&status=publish&per_page=${limit}&page=${start}&categories=${categoryId}`;
            const response = await fetch(url);
            var resData = await response.json();
            console.log('archives response:');
            var stopPagination = false;
            if (resData.code) {
                stopPagination = true;
                resData = [];
                console.log('PAGINATION STOPED (ARCHIVES)');
            }
            console.log(resData);
            //debugger;
            dispatch({ type: FETCH_ARCHIVES, archives: resData, page: start, stopPagination: stopPagination, categoryId: categoryId });
        } catch (error) {
            throw error;
        }
    }
}


// const getPostMediaUrl = (mediaId) => {
//     return fetch(`https://assafinaonline.com/wp-json/wp/v2/media/${mediaId}`)
//         .then(response => { return response.json() })
//         .then(json => {
//             //console.log(postsImages);
//             //debugger;
//             if (!postsImages.find(pi => pi.id == mediaId))
//                 setPostsImages(pi => [...pi, { id: mediaId, url: /*json.media_details.sizes.medium.source_url*/ json.guid.rendered }])
//             //postsImages.current = [...postsImages.current, { id: mediaId, url: json.guid.rendered }];
//         }).done();
//     //return mediaUrl;
// };