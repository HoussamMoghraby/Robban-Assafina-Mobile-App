import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyText from '../components/MyText';
import CategoriesList2 from '../components/CategoriesList2';
const CategoriesScreen = (props) => {
    return (
        <View style={styles.screen}>
            <CategoriesList2 {...props}></CategoriesList2>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});


export default CategoriesScreen;