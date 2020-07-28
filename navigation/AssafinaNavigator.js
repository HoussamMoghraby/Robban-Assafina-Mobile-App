import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Platform, Image, View, Text } from 'react-native';
import Colors from '../constants/CustomColors';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons, FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import SearchScreen from '../screens/SearchScreen';
import ArchivesScreen from '../screens/ArchivesScreen';
import ArchiveScreen from '../screens/ArchiveScreen';
import PostScreen from '../screens/PostScreen';
import PostsScreen from '../screens/PostsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { isPlatformAndroid } from '../helpers/Platform';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomColors from '../constants/CustomColors';
import MoreScreen from '../screens/MoreScreen';
import LoginScreen from '../screens/LoginScreen';

const defaultStackNavigatorConfig = {
    mode: 'modal',
    transitionSpec: {
        open: {
            animation: 'timing',
            config: {
                duration: 50
            },
        },
        close: {
            animation: 'timing',
            config: {
                duration: 50
            },
        }
    },
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: isPlatformAndroid() ? Colors.primaryColor : '#fff',
        },
        headerTintColor: isPlatformAndroid() ? '#fff' : Colors.primaryColor,
        headerTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerBackTitleVisible: false
    }
}

const HomeNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                headerStyle: { backgroundColor: '#fff' },
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
                headerTitle: ''
                // headerRight: () => {
                //     return (
                //         <View style={{ padding: 5, flex: 1 }}>
                //             <Image style={{ width: 120, height: 45 }} source={require('../assets/logo.png')}></Image>
                //         </View>
                //     )
                // }
            }
        },
        Post: {
            screen: PostScreen,
        },
        Search: {
            screen: SearchScreen
        },
        SearchPost: {
            screen: PostScreen
        }
    }, defaultStackNavigatorConfig
);

const CategoriesNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen,
        },
        CategoryPosts: {
            screen: PostsScreen,
        },
        CategoryPost: {
            screen: PostScreen
        }
    }, defaultStackNavigatorConfig
);

// const SearchNavigator = createStackNavigator(
//     {
//         Search: { screen: SearchScreen },
//         SearchPost: { screen: PostScreen }
//     }, defaultStackNavigatorConfig
// );

const ArchivesNavigator = createStackNavigator(
    {
        Archives: { screen: ArchivesScreen },
        ArchivePost: { screen: ArchiveScreen },
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                headerTitleAlign: 'center'
            }
        }
    }, defaultStackNavigatorConfig
);

const FavoritesNavigator = createStackNavigator(
    {
        FavoritePosts: {
            screen: FavoritesScreen,
        },
        FavoritePost: {
            screen: PostScreen
        }
    }, defaultStackNavigatorConfig
);

const MoreNavigator = createStackNavigator(
    {
        More: { screen: MoreScreen },
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                headerTitleAlign: 'center'
            }
        }
    }, defaultStackNavigatorConfig
);


const tabSreenConfig = {
    News: {
        screen: HomeNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Entypo
                        size={23}
                        color={tabInfo.tintColor}
                        name="news" />
                )
            }
        }
    },
    Categories: {
        screen: CategoriesNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Entypo
                        size={23}
                        color={tabInfo.tintColor}
                        name="grid" />
                )
            }
        }
    },
    // Search: {
    //     screen: SearchNavigator,
    //     navigationOptions: {
    //         tabBarIcon: (tabInfo) => {
    //             return (
    //                 <Ionicons
    //                     size={23}
    //                     color={tabInfo.tintColor}
    //                     name={isPlatformAndroid() ? "md-search" : "ios-search"} />
    //             )
    //         }
    //     }
    // },
    Archives: {
        screen: ArchivesNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        size={23}
                        color={tabInfo.tintColor}
                        name={isPlatformAndroid() ? "md-today" : "ios-today"} />
                )
            }
        }
    },
    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <MaterialCommunityIcons
                        size={23}
                        color={tabInfo.tintColor}
                        name="star" />
                )
            }
        }
    },
    More: {
        screen: MoreNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Entypo
                        size={23}
                        color={tabInfo.tintColor}
                        name="dots-three-horizontal" />
                )
            }
        }
    }
};

const MainTabsNavigator =
    // isPlatformAndroid() ?
    //     createMaterialBottomTabNavigator(tabSreenConfig, {
    //         animation: false,
    //         shifting: false,
    //         activeColor: '#fff',
    //         barStyle: {
    //             backgroundColor: Colors.primaryColor,
    //             elevation: 6,
    //         },
    //     }) :
    createBottomTabNavigator(tabSreenConfig, {
        tabBarOptions: {
            activeTintColor: isPlatformAndroid() ? '#fff' : Colors.primaryColor,
            adaptive: true,
            inactiveBackgroundColor: isPlatformAndroid() ? Colors.primaryColor : '#fff',
            activeBackgroundColor: isPlatformAndroid() ? Colors.primaryColor : '#fff',
            keyboardHidesTabBar: true,
            style: { height: 55 },
            tabStyle: { padding: 5 },
            labelStyle: { fontFamily: 'open-sans' }
        }
    });


export default createAppContainer(MainTabsNavigator);