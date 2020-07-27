import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, Image } from 'react-native';
import PostsList from '../components/PostsList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomColors from '../constants/CustomColors';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { isPlatformAndroid } from '../helpers/Platform';
import TouchableComponent from '../components/TouchableComponent';

const SPONSORS_IMAGE_HEIGHT = 70;
const HomeScreen = (props) => {

    const [scrollToTop, setScrollToTop] = useState([]);
    const logoClickHandler = useCallback(() => {
        setScrollToTop(stt => stt.concat(1));
    }, [scrollToTop]);

    useEffect(() => {
        props.navigation.setParams({ scrollHandler: logoClickHandler });
    }, [logoClickHandler]);

    return (
        <View style={styles.screen}>
            <PostsList {...props} showBetweenPostsSponsors={true} scrollToTop={scrollToTop}></PostsList>
            <View style={styles.sponsorsContainer}>
                <ImageBackground style={styles.sponsorsImage} source={{
                    uri: 'https://assafinaonline.com/wp-content/uploads/MUSASINO-BANNER.gif'
                }}></ImageBackground>
            </View>
        </View >
    )
};


HomeScreen.navigationOptions = (navigationData) => {
    const scrollHandler = navigationData.navigation.getParam('scrollHandler');
    return {
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item onPress={() => { navigationData.navigation.push('Search') }} style={{ backgroundColor: '#eaeaea', borderRadius: 50, height: 40, width: 40, marginLeft: 5 }} title="Search" color={CustomColors.primaryColor} iconName={isPlatformAndroid() ? 'md-search' : 'ios-search'}></Item>
                </HeaderButtons>
            )
        },
        headerRight: () => {
            return (
                <TouchableComponent onPress={() => { scrollHandler(); }}>
                    <View style={{ padding: 5, flex: 1 }}>
                        <Image style={{ width: 120, height: 45 }} source={require('../assets/logo.png')}></Image>
                    </View>
                </TouchableComponent>
            )
        }
    }
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    sponsorsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        elevation: 2,
        borderTopColor: '#ccc'
    },
    sponsorsImage: {
        width: '100%',
        height: SPONSORS_IMAGE_HEIGHT
    }
});

export default HomeScreen;