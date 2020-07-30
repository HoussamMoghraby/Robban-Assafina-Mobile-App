import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MyText from '../components/MyText';
import { TextInput } from 'react-native-paper';
import CustomColors from '../constants/CustomColors';
import PostsList from '../components/PostsList';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/actions/posts';

// let searchHandler;

const SearchScreen = (props) => {
    const [searchKeyword, setSearchKeyword] = useState();

    const dispatch = useDispatch();
    const searchHandler = useCallback((keyword) => {
        dispatch(setFilters(keyword));
        setSearchKeyword(keyword);
    }, [dispatch, searchKeyword]);

    useEffect(() => {
        props.navigation.setParams({ searchHandlerParam: searchHandler });
    }, [searchHandler]);


    // searchHandler = (searchValue) => {
    //     setSearchKeyword(searchValue);
    // };
    //console.log('search:' + searchKeyword);
    return (
        // <TouchableWithoutFeedback onAccessibilityTap onPress={() => { Keyboard.dismiss(); }}>
        <View style={styles.screen}>
            {searchKeyword ? <PostsList showBetweenPostsSponsors={true} search={searchKeyword} {...props}></PostsList> : <View><MyText>Start searching to see results here.</MyText></View>}
        </View>
        // </TouchableWithoutFeedback>
    )
};

SearchScreen.navigationOptions = (navigationData) => {
    const searchHandlerParam = navigationData.navigation.getParam('searchHandlerParam');
    return {
        headerTitleAlign: 'center',
        headerTitle: () => {
            return (
                <View style={styles.searchContainer}>
                    <TextInput
                        onSubmitEditing={(e) => { searchHandlerParam(e.nativeEvent.text); }}
                        blurOnSubmit={true}
                        onBlur={() => { Keyboard.dismiss(); }}
                        theme={{ colors: { primary: CustomColors.primaryColor, underlineColorAndroid: '#fff' } }} selectionColor="#ccc"
                        underlineColorAndroid="#fff"
                        selectTextOnFocus={true}
                        caretHidden={false}
                        autoFocus={true}
                        autoCompleteType="off"
                        autoCorrect={true}
                        numberOfLines={1}
                        placeholder="Search..."
                        style={styles.searchInput}></TextInput>
                </View>
            )
        },
    }

};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    searchContainer: {
        justifyContent: 'center',
        alignItems: 'stretch',
        borderRadius: 30,
        overflow: 'hidden',
        height: 39
    },
    searchInput: {
        height: 40,
        borderColor: 'transparent',
        borderWidth: 0,
        overflow: 'hidden',
        backgroundColor: '#fff',
        width: Dimensions.get('window').width - 100
    }
});


export default SearchScreen;