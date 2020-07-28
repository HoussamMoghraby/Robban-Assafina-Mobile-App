import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, RefreshControl, ActivityIndicator } from 'react-native';
import MyText from '../components/MyText';
import { FlatList } from 'react-native-gesture-handler';
import { categories_data } from '../data/categories';
import * as Enumerable from 'linq-es2015';
import TouchableComponent from '../components/TouchableComponent';
import CustomColors from '../constants/CustomColors';
import { FontAwesome } from '@expo/vector-icons';
import * as _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import * as CategoriesActions from '../store/actions/categories';
import * as PostsActions from '../store/actions/posts';
import LoginScreen from './LoginScreen';
import * as AuthActions from '../store/actions/auth';
const CARD_HEIGHT = 'auto';
const IMAGE_HEIGHT = 244.5;
//let archivesCategories = Enumerable.asEnumerable(categories_data).Where(c => c.parent == 202).OrderByDescending(c => c.name).ToArray();


const getPostMediaUrl = (post) => {
    if (post && post['_embedded']['wp:featuredmedia'] && post['_embedded']['wp:featuredmedia'].length > 0) {
        var mediaUrl = post['_embedded']['wp:featuredmedia'][0].source_url;
        if (mediaUrl)
            return { uri: mediaUrl };
        return require(`../assets/placeholder.png`);
    }
    return require(`../assets/placeholder.png`);

};

const ArchivesScreen = (props) => {
    const userToken = useSelector(state => state.auth.token);
    const [tokenFetched, setTokenFetched] = useState(false);
    //const [isUserLoggedIn, setIsUserLoggedIn] = useState(userToken ? true : false);
    debugger;
    const dispatch = useDispatch();

    // useEffect(() => {
    //     console.log('props changed');
    //     console.log(props.navigation.getParam('loggedIn'));
    //     if (props.navigation.getParam('loggedIn')) {
    //         setIsUserLoggedIn(true);
    //     }
    // }, [props.navigation]);
    // useEffect(() => {


    // }, [props]);

    useEffect(() => {
        const getUserToken = async () => {
            try {
                await dispatch(AuthActions.fetchUserToken());
                setTokenFetched(true);
                debugger;
            }
            catch (error) {
                console.log(error);
            }
        }
        getUserToken();
    }, [dispatch]);

    useEffect(() => {
        console.log(`userToken: ${userToken}`);
        if (!userToken && tokenFetched) {
            console.log('Go to login');
            props.navigation.replace('Login');
            //return (
            //<LoginScreen {...props}></LoginScreen>
            //)
        }
    }, [tokenFetched]);

    const [isLoading, setIsLoading] = useState(true);
    const [isArchivesLoading, setIsArchivesLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState();

    useEffect(() => {
        const getCategories = async () => {
            setIsLoading(true);
            await dispatch(CategoriesActions.fetchArchivesCategories());
            setIsLoading(false);
        }
        if (userToken)
            getCategories();
    }, [dispatch]);

    const archivesCategories = useSelector(state => state.categories.archiveCategories);
    const categories = Enumerable.asEnumerable(archivesCategories).OrderByDescending(c => c.name).ToArray();

    const availablePosts = useSelector(state => state.posts.archivePosts);
    //debugger;
    let archives = availablePosts ? availablePosts.get(selectedCategory) : [];
    //let archives = Enumerable.asEnumerable(availablePosts).OrderByDescending(p => p.id).ToArray();
    // archives = [...archives, ...archives, ...archives, ...archives, ...archives, ...archives, ...archives, ...archives, ...archives];
    //archives.forEach((a, i) => { a.id = (i < archives.length - 1) ? i.toString() : 1000; });
    //console.log('archives');


    useEffect(() => {
        if (archivesCategories && archivesCategories.length > 0) {
            console.log('set selected category:' + archivesCategories[archivesCategories.length - 1].id);
            setSelectedCategory(archivesCategories[archivesCategories.length - 1].id);
        }
    }, [archivesCategories]);

    const selectedCategoryHandler = useCallback((categoryId) => {
        console.log('selected category: ' + categoryId);
        setSelectedCategory(categoryId);
    }, [dispatch]);


    const [isRefreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const getArchives = async () => {
            try {
                setIsArchivesLoading(true);
                if (!availablePosts.has(selectedCategory))
                    await dispatch(PostsActions.fetchArchives(selectedCategory));
                setIsArchivesLoading(false);
            }
            catch (error) {
                console.log(error);
            }
        }
        if (selectedCategory && userToken) {
            console.log('Get Archives');
            getArchives();
        }
    }, [selectedCategory, dispatch]);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => { setRefreshing(false); }, 2000)
    };

    const renderArchiveCategory = (itemData, index) => {
        return (
            <View style={styles.categoryContainer}>
                <TouchableComponent onPress={() => { selectedCategoryHandler(itemData.item.id); }}>
                    <View style={(selectedCategory && selectedCategory == itemData.item.id) ? styles.categorySelected : styles.category}>
                        <MyText bold={true} style={(selectedCategory && selectedCategory == itemData.item.id) ? styles.categoryTextSelected : styles.categoryText}>{itemData.item.name}</MyText>
                    </View>
                </TouchableComponent>
            </View >
        );
    };
    const renderArchive = (itemData, index) => {
        return (
            <View style={styles.archiveContainer}>
                <TouchableComponent onPress={() => { props.navigation.push('ArchivePost', { id: itemData.item.id, title: itemData.item.title.rendered, post: itemData.item }) }}>
                    <View style={styles.archive}>
                        <View style={styles.imageContainer}>
                            <ImageBackground style={styles.imageBackground} source={getPostMediaUrl(itemData.item)} resizeMode="contain">
                                <View style={styles.year}>
                                    <MyText bold={true} style={styles.yearText}>{archivesCategories.find(c => c.id === selectedCategory).name}</MyText>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={styles.textContainer}>
                            <View style={styles.title}>
                                <MyText bold={true} style={styles.titleText}>{itemData.item.title.rendered}</MyText>
                            </View>
                            <View style={styles.date}>
                                <FontAwesome name="clock-o" color="#454545" size={13} ></FontAwesome>
                                <MyText style={styles.dateText}>{new Date(itemData.item.date).toDateString()}</MyText>
                            </View>
                        </View>
                    </View>
                </TouchableComponent>
            </View >
        )
    };

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
        <View style={styles.screen}>
            <View style={styles.topCategories}>
                <FlatList
                    pagingEnabled={true}
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal={true}
                    renderItem={renderArchiveCategory}
                ></FlatList>
            </View>
            {
                isArchivesLoading ?
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View>
                            <ActivityIndicator size="large" color={CustomColors.primaryColor} ></ActivityIndicator>
                        </View>
                    </View>
                    :
                    <View style={styles.archives}>
                        <FlatList
                            data={archives}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={2}
                            renderItem={renderArchive}
                        // refreshControl={
                        //     <RefreshControl
                        //         onRefresh={() => { console.log('refresh'); onRefresh(); }}
                        //         refreshing={isRefreshing}>
                        //     </RefreshControl>}
                        >
                        </FlatList>
                    </View>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        flex: 1
    },
    topCategories: {
        backgroundColor: '#fff',
        height: 60,
        elevation: 1,
        borderColor: '#ccc',
        borderBottomWidth: 1
    },
    categoryContainer: {
        flex: 1,
        backgroundColor: CustomColors.lightGrey,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: CustomColors.primaryColor,
        elevation: 1
    },
    category: {
        width: 80,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    categorySelected: {
        width: 80,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: CustomColors.primaryColor
    },
    categoryText: {
        textAlign: 'center',
        color: CustomColors.primaryColor
    },
    categoryTextSelected: {
        textAlign: 'center',
        color: '#fff'
    },
    archives: {
        flex: 1,
        width: '100%'
    },
    archiveContainer: {
        flex: 1,
        height: CARD_HEIGHT,
        justifyContent: 'flex-start',
        margin: 10,
        backgroundColor: CustomColors.white,
        borderWidth: 1,
        borderColor: CustomColors.grey,
        elevation: 1,
        maxWidth: (Dimensions.get('window').width / 2) - 20
    },
    archive: {

    },
    imageContainer: {
        backgroundColor: CustomColors.lightGrey
    },
    imageBackground: {
        width: '100%',
        height: IMAGE_HEIGHT,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    year: {
        backgroundColor: CustomColors.primaryColor,
        padding: 5
    },
    yearText: {
        color: '#fff',
        fontSize: 12
    },
    textContainer: {
        padding: 10
    },
    title: {

    },
    titleText: {
        textAlign: 'left',
        fontSize: 15
    },
    date: {
        marginTop: 5,
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    dateText: {
        fontSize: 13,
        color: "#454545"
    }
});

export default ArchivesScreen;