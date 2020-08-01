import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, ImageBackground, RefreshControl, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import TouchableComponent from '../components/TouchableComponent';
import MyText from './MyText';
import CustomColors from '../constants/CustomColors';
import * as Enumerable from 'linq-es2015';
import SponsorsList from '../components/SponsorsList';
import { useSelector, useDispatch } from 'react-redux';
var DomParser = require('react-native-html-parser').DOMParser;
import * as PostsActions from '../store/actions/posts';
import { decodeString } from '../helpers/apiUtils';

//
// var doc = new DomParser().parseFromString(htmlString, 'text/html');
// var goldenSponsorDOM = doc.getElementById('wp-bannerize-widget-4').getElementsByTagName('a');
// var goldenSponsor2DOM = doc.getElementById('wp-bannerize-widget-3').getElementsByTagName('a');
// var sponsorsDOM = doc.getElementById('wp-bannerize-widget-2').getElementsByTagName('a');
//var imagesList = [];
var sponsorsLimit = 4;
var sponsorsPostsOffset = 3;
// const setSponsors = () => {
// 	imagesList = [];
// 	imagesList = getSponsorsImages(sponsorsDOM, 'standard');
// 	imagesList = [...imagesList, ...getSponsorsImages(goldenSponsorDOM, 'golden-1')];
// 	imagesList = [...imagesList, ...getSponsorsImages(goldenSponsor2DOM, 'golden-2')];
// 	//try {
// 	imagesList = Enumerable.asEnumerable(imagesList).OrderBy((image) => {
// 		let title = image.title.split('-')[0];
// 		return !isNaN(title) ? parseInt(title) : title
// 	}).ThenBy((image) => {
// 		let title = image.title.split('-')[1];
// 		return title ? title : null;
// 	}).ToArray();
// 	//}
// 	// catch{
// 	//     //console.log('Article does not contain a pdf link');
// 	//     return (<View><Text>No sponsors!</Text></View>);
// 	// }
// }

const getSponsorsImages = (dom, tag) => {
	let images = [];
	for (let i = 0; i < dom.length; i++) {
		let link = dom[i].getAttribute('href');
		let imageUrl = dom[i].getElementsByTagName('img')[0].getAttribute('src');
		let title = dom[i].getElementsByTagName('img')[0].getAttribute('title');
		images.push({ link: link, imageUrl: imageUrl, title: title, tag: tag });
	}
	return images;
}

//setSponsors();
// const getSponsors = (start, limit) => {
// 	// debugger;
// 	return Enumerable.asEnumerable(sponsorsList).Where(img => img.tag === 'standard').Skip(start).Take(limit).ToArray();
// }

// const getGoldenSponsors = () => {
// 	return Enumerable.asEnumerable(sponsorsList).Where(img => (img.tag === 'golden-1' || img.tag === 'golden-2')).OrderBy(img => img.tag).ToArray();
// }


const CARD_HEIGHT = 240;
const PostsList = (props) => {
	const flatRef = useRef();
	//const search = { props };
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [isSearchMode, setSearchMode] = useState(props.search ? true : false);
	const [currentPage, setCurrentPage] = useState(1);
	//var currentPage = useRef(1);
	var availablePosts = useSelector(state => { return isSearchMode ? state.posts.filteredPosts : state.posts.posts });
	var categoryPosts = useSelector(state => state.posts.categoryPosts);
	var favoritePosts = useSelector(state => state.posts.favoritePosts);
	var stopSearchPagination = useSelector(state => state.posts.stopSearchPagination);
	var stopHomePagination = useSelector(state => state.posts.stopHomePagination);
	var stopCategoryPagination = useSelector(state => state.posts.stopCategoryPagination);
	var posts = !props.isFavorites ? availablePosts : favoritePosts;
	if (props.categoryId)
		posts = categoryPosts;

	const dispatch = useDispatch();
	const sponsorsHTML = useSelector(state => state.posts.sponsorsHtmlString);
	const [sponsorsList, setSponsorsList] = useState([]);

	const getSponsors = useCallback((start, limit) => {
		// debugger;
		return Enumerable.asEnumerable(sponsorsList).Where(img => img.tag === 'standard').Skip(start).Take(limit).ToArray();
	}, [sponsorsList])

	const getGoldenSponsors = useCallback(() => {
		return Enumerable.asEnumerable(sponsorsList).Where(img => (img.tag === 'golden-1' || img.tag === 'golden-2')).OrderBy(img => img.tag).ToArray();
	}, [sponsorsList]);

	useEffect(() => {
		const setSponsorsNew = async () => {
			console.log('Setting Sponsors list _ NEW');
			var doc = new DomParser().parseFromString(sponsorsHTML, 'text/html');
			var goldenSponsorDOM = doc.getElementById('wp-bannerize-widget-4').getElementsByTagName('a');
			var goldenSponsor2DOM = doc.getElementById('wp-bannerize-widget-3').getElementsByTagName('a');
			var sponsorsDOM = doc.getElementById('wp-bannerize-widget-2').getElementsByTagName('a');
			var imagesList = [];
			imagesList = getSponsorsImages(sponsorsDOM, 'standard');
			imagesList = [...imagesList, ...getSponsorsImages(goldenSponsorDOM, 'golden-1')];
			imagesList = [...imagesList, ...getSponsorsImages(goldenSponsor2DOM, 'golden-2')];
			//try {
			imagesList = Enumerable.asEnumerable(imagesList).OrderBy((image) => {
				let title = image.title.split('-')[0];
				return !isNaN(title) ? parseInt(title) : title
			}).ThenBy((image) => {
				let title = image.title.split('-')[1];
				return title ? title : null;
			}).ToArray();
			setSponsorsList(imagesList);
		}
		if (sponsorsHTML && sponsorsHTML != 'COULD_NOT_LOAD')
			setSponsorsNew();
	}, [dispatch, sponsorsHTML]);

	useEffect(() => {
		if (props.scrollToTop && props.scrollToTop.length > 0) {
			flatRef.current.scrollToOffset({ animated: true, offset: 0 });
		}
	}, [props.scrollToTop]);



	useEffect(() => {
		const loadPosts = async () => {
			console.log(`search:${props.search}`);
			setIsLoading(true);
			setHasError(false);
			setCurrentPage(1);
			//currentPage = 1;
			//setSearchMode(props.search ? true : false);
			try {
				if (isSearchMode)
					await dispatch(PostsActions.searchPosts(props.search));
				else if (!props.isFavorites)
					await dispatch(PostsActions.fetchPosts(props.categoryId, currentPage));
				else await dispatch(PostsActions.fetchFavorites());
			} catch (error) {
				setHasError(true);
			}
			setIsLoading(false);
		}
		loadPosts();
	}, [dispatch, props.search, props.categoryId, props.isFavorites]);


	const endOfListHandler = useCallback(() => {
		//var stopPaginationIndicator = isSearchMode ? stopSearchPagination : stopHomePagination;
		//if (!isRefreshing && !stopPaginationIndicator) {
		console.log('set page');
		setCurrentPage(p => p + 1);
		//currentPage = currentPage + 1;
		//}
	}, [dispatch]);

	useEffect(() => {
		const paginate = async () => {
			var stopPaginationIndicator = isSearchMode ? stopSearchPagination : !props.categoryId ? stopHomePagination : stopCategoryPagination;
			if ((currentPage > 0 && posts && posts.length > 0) /*&& !isRefreshing*/ && !stopPaginationIndicator) {
				console.log('paginate:' + currentPage);
				setScrollerRefreshing(true);
				if (isSearchMode)
					await dispatch(PostsActions.searchPosts(props.search, currentPage));
				else
					await dispatch(PostsActions.fetchPosts(props.categoryId, currentPage));
				setScrollerRefreshing(false);
				setRefreshing(false);
			}
		}
		if (!props.isFavorites)
			paginate();
	}, [currentPage/*, props.search*/]);


	console.log(availablePosts.length);
	//var posts = Enumerable.asEnumerable(availablePosts).Where(p => !p.title.rendered.includes('Issue')).ToArray();


	const [isRefreshing, setRefreshing] = useState(false);
	const [isScrollerRefreshing, setScrollerRefreshing] = useState(false);
	const handleSponsorsDisplay = (loadedAt) => {
		let skip = ((loadedAt / sponsorsPostsOffset) * sponsorsLimit) - sponsorsLimit;
		if (skip <= sponsorsList.length) {
			//console.log(`loadedAt:${loadedAt}, skip:${skip}`);
			return (
				<View>
					{loadedAt == sponsorsPostsOffset ?
						<SponsorsList images={getGoldenSponsors()}></SponsorsList> : <View></View>
					}
					<View>
						<SponsorsList images={getSponsors(skip, sponsorsLimit)}></SponsorsList>
					</View>
				</View>
			)
		}
		return;
	}

	// const onRefresh = () => {
	// 	setRefreshing(true);
	// 	setTimeout(() => {
	// 		setRefreshing(false);
	// 	}, 1000)
	// };
	const onRefresh = useCallback(() => {
		if (!props.isFavorites) {
			if (currentPage && currentPage > 1)
				setRefreshing(true);
			setCurrentPage(1);
		}
	});

	const navigateToPost = (id, title, mediaUrl, post) => {
		//debugger;
		let routeName = props.navigation.getParam('categoryId') ? 'CategoryPost' : (props.isFavorites ? 'FavoritePost' : 'Post');
		if (props.search)
			routeName = "SearchPost";
		props.navigation.push(routeName, { id: id, title: title, mediaUrl: mediaUrl, post: post });
	};

	const getPostMediaUrl = useCallback((post) => {
		if (post && post['_embedded']['wp:featuredmedia'] && post['_embedded']['wp:featuredmedia'].length > 0) {
			var mediaUrl = post['_embedded']['wp:featuredmedia'][0].source_url;
			if (mediaUrl)
				return { uri: mediaUrl };
			return require(`../assets/placeholder.png`);
		}
		return require(`../assets/placeholder.png`);

	});

	const renderPost = (itemData) => {
		return (
			<View>
				<View style={styles.postContainer}>
					<TouchableComponent onPress={() => { navigateToPost(itemData.item.id, decodeString(itemData.item.title.rendered), getPostMediaUrl(itemData.item), itemData.item) }}>
						<View style={styles.imageContainer}>
							<ImageBackground style={styles.imageBackground} source={getPostMediaUrl(itemData.item)}>
								<View style={styles.imageBackgroundOverlay}>
									<View style={styles.textContainer}>
										<View style={styles.titleContainer}>
											<MyText numberOfLines={2} bold={true} style={styles.titleText}>{decodeString(itemData.item.title.rendered.trim())}</MyText>
										</View>
										{itemData.item.date ?
											(<View style={styles.dateContainer}>
												<FontAwesome name="clock-o" color='#fff' size={15} ></FontAwesome>
												<MyText bold={true} style={styles.dateText}>{new Date(itemData.item.date).toDateString()}</MyText>
											</View>) : ''}
									</View>
								</View>
							</ImageBackground>
						</View>
					</TouchableComponent>
				</View>
				{
					(props.showBetweenPostsSponsors && ((itemData.index + 1) % sponsorsPostsOffset == 0)) ?
						handleSponsorsDisplay(itemData.index + 1)
						: <View></View>
				}
				{
					((itemData.index == posts.length - 1) && isScrollerRefreshing) ?
						<View style={{ alignItems: 'center', padding: 5, marginVertical: 3 }}>
							{/* <MyText style={{ textAlign: 'center' }}>Loading more...</MyText> */}
							<ActivityIndicator size="large" color={CustomColors.primaryColor}></ActivityIndicator>
						</View>
						:
						<View></View>
				}

			</View>
		)
	};

	if (hasError) {
		return (
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<MyText style={{ color: CustomColors.error, fontSize: 17 }}>Oops something went wrong!</MyText>
			</View>
		)
	}

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<View>
					<ActivityIndicator size="large" color={CustomColors.primaryColor} ></ActivityIndicator>
				</View>
			</View>
		)
	}
	return (
		<View style={{ flex: 1 }}>
			{/* <View style={{ flex: 1 }}>
                <SponsorsList></SponsorsList>
            </View> */}
			<View style={{ flex: 1 }}>
				{
					posts && posts.length > 0 ?
						<FlatList
							ref={flatRef}
							//contentContainerStyle={{ flex: 1 }}
							//onEndReachedThreshold={8}
							onEndReached={(info) => { console.log(info); endOfListHandler(); }}
							data={posts}
							keyExtractor={(item) => item.id.toString()}
							renderItem={renderPost}
							refreshControl={
								<RefreshControl
									onRefresh={() => { console.log('refresh'); onRefresh(); }}
									refreshing={isRefreshing}>
								</RefreshControl>}
						>
						</FlatList>
						:
						<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
							<MyText bold={false} style={{ fontSize: 16, textAlign: 'center' }}> No results found</MyText>
						</View>
				}
			</View>
		</View>
	)
};

const styles = StyleSheet.create({
	postContainer: {
		flex: 1,
		height: CARD_HEIGHT,
		borderColor: CustomColors.grey,
		elevation: 3,
		margin: 10,
		borderRadius: 10,
		overflow: 'hidden',
		borderWidth: 1
	},
	imageContainer: {
		width: '100%'
	},
	imageBackground: {
		width: '100%',
		height: CARD_HEIGHT,
		justifyContent: 'flex-end'
	},
	imageBackgroundOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.30)',
		justifyContent: 'flex-end'
	},
	textContainer: {
		backgroundColor: 'rgba(0,0,0,0.6)'
	},
	dateContainer: {
		padding: 7,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	dateText: {
		color: '#fff',
		fontSize: 12,
		marginLeft: 5
	},
	titleContainer: {
		padding: 7
	},
	titleText: {
		color: '#fff',
		fontSize: 18
	}
});

export default PostsList;
