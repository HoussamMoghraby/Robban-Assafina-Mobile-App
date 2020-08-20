//import { posts_data } from '../../data/posts';
import { TOGGLE_FAVORITE, FETCH_ARCHIVES, FETCH_POSTS, SEARCH_POSTS, UPDATE_POSTS_MEDIAS, TOGGLE_FAVORITE_NEW, FETCH_FAVORITES_NEW, FETCH_SPONSORS_HTML, ADD_NOTIFICATION_POST, SET_NOTIFICATION_POST_LOADER } from '../actions/posts';
export const initialState = {
    posts: [],
    filteredPosts: [],
    favoritePosts: [],
    postsMedias: [],
    stopSearchPagination: false,
    stopHomePagination: false,
    categoryPosts: [],
    stopCategoryPagination: false,
    archivePosts: new Map(),
    stopArchivesPagination: false,
    sponsorsHtmlString: null,
    notificationPost: undefined,
    notificationIsLoading: false
}

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SPONSORS_HTML:
            return { ...state, sponsorsHtmlString: action.sponsorsHTML }
        case FETCH_FAVORITES_NEW:
        case TOGGLE_FAVORITE_NEW:
            return { ...state, favoritePosts: action.favs }
        case TOGGLE_FAVORITE:
            const allPosts = [...state.posts, ...state.filteredPosts, ...state.categoryPosts, ...state.notificationPost];
            const existingIndex = state.favoritePosts.indexOf(allPosts.find(p => p.id === action.postId));
            if (existingIndex >= 0) {
                const updateFavPosts = [...state.favoritePosts];
                updateFavPosts.splice(existingIndex, 1);
                //AsyncStorage.setItem('favoritePosts', JSON.stringify({ list: updateFavPosts }));
                //await AsyncStorage.setItem('favorites', updateFavPosts);
                return { ...state, favoritePosts: updateFavPosts };
            }
            else {
                //debugger;
                const favPost = allPosts.find(p => p.id == action.postId);
                //await AsyncStorage.setItem('favorites', [favPost].concat(state.favoritePosts));
                return { ...state, favoritePosts: [favPost].concat(state.favoritePosts) }
            }
        case FETCH_POSTS:
            const loadedPosts = action.posts;
            const category = action.categoryId;
            var newList = loadedPosts;
            if (action.page > 1)
                newList = !category ? state.posts.concat(loadedPosts) : state.categoryPosts.concat(loadedPosts);
            if (!category)
                return { ...state, posts: newList, stopHomePagination: action.stopPagination };
            return { ...state, categoryPosts: newList, stopCategoryPagination: action.stopPagination };
        case SEARCH_POSTS:
            const searchedPosts = action.posts;
            var newSearchList = searchedPosts;
            if (action.page > 1)
                newSearchList = state.filteredPosts.concat(searchedPosts);
            return { ...state, filteredPosts: newSearchList, stopSearchPagination: action.stopPagination };
        case UPDATE_POSTS_MEDIAS:
            const postsMedias = action.medias;
            //debugger;
            const newMedias = postsMedias.filter(pm => !state.postsMedias.map(sm => sm.id).includes(pm.id));
            const allpostMedias = state.postsMedias.concat(newMedias);
            return { ...state, postsMedias: allpostMedias };
        //ARCHIVES
        case FETCH_ARCHIVES:
            var archives = action.archives;
            //debugger;
            state.archivePosts.set(action.categoryId, archives);
            return { ...state, archivePosts: state.archivePosts, stopArchivesPagination: action.stopPagination }
        case ADD_NOTIFICATION_POST:
            debugger;
            const collectedPost = action.notificationPost;
            return { ...state, notificationPost: { ...collectedPost }, notificationIsLoading: false };
        case SET_NOTIFICATION_POST_LOADER:
            return { ...state, notificationPost: { ...state.notificationPost }, notificationIsLoading: { ...action.value } };
        default:
            return state;
    }
}

export default postsReducer;