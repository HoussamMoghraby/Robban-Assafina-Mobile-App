import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import PostsList from '../components/PostsList';

const PostsScreen = (props) => {
    const categoryId = props.navigation.getParam('categoryId');
    return (
        <View style={styles.screen}>
            <PostsList categoryId={categoryId} {...props}></PostsList>
        </View >
    )
};

PostsScreen.navigationOptions = (navigationData) => {
    const categoryTitle = navigationData.navigation.getParam('categoryTitle');

    if (categoryTitle) {
        return {
            headerTitle: categoryTitle
        }
    }
    return {}
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

export default PostsScreen;