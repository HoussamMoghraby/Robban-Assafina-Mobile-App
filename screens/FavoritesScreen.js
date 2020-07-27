import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import PostsList from '../components/PostsList';

const FavoritesScreen = (props) => {
    return (
        <View style={styles.screen}>
            <PostsList isFavorites={true} {...props}></PostsList>
        </View >
    )
};

FavoritesScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Favorites'
    }
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

export default FavoritesScreen;