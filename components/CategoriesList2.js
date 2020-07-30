import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
//import { categories_data } from '../data/categories';
import TouchableComponent from './TouchableComponent';
import MyText from './MyText';
import CustomColors from '../constants/CustomColors';
import { FontAwesome } from '@expo/vector-icons';
import * as Enumerable from 'linq-es2015';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../store/actions/categories';
import * as CategoriesActions from '../store/actions/categories';

const CategoriesList2 = (props) => {
    //const categories = categories_data.filter(c => c.parent != 81 && c.parent != 202 && c.count > 0);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        const getCategories = async () => {
            try {
                setIsLoading(true);
                await dispatch(CategoriesActions.fetchCategories());
                setIsLoading(false);
            }
            catch (error) {
                console.log(error);
            }
        }
        getCategories();
    }, [dispatch]);

    const availableCategories = useSelector(state => state.categories.categories);
    let categories = Enumerable.asEnumerable(availableCategories).Where(c => c.parent == 166).OrderBy(c => c.order).ToArray();//assafina news
    const otherCategories = Enumerable.asEnumerable(availableCategories).Where(c => [167, 169, 170].includes(c.id)).OrderBy(c => c.order).ToArray();
    categories = [...categories, ...otherCategories];
    const renderCategory = (itemData) => {
        //debugger;
        const parentCategory = availableCategories.find(c => c.id == itemData.item.parent);
        return (
            <View style={styles.container} key={itemData.item.id}>
                <TouchableComponent onPress={() => { props.navigation.push('CategoryPosts', { categoryId: itemData.item.id, categoryTitle: itemData.item.name }) }}>
                    <View style={styles.cardContainer}>
                        <View style={styles.topContainer}>
                            <View style={styles.bubble}>
                                <FontAwesome
                                    name="anchor"
                                    size={17}
                                    color="#fff"
                                ></FontAwesome>
                            </View>
                            <View style={styles.topTextContainer}>
                                <MyText numberOfLines={2} style={styles.topText}>{parentCategory ? parentCategory.name : ''}</MyText>
                            </View>
                        </View>
                        <View style={styles.titleContainer}>
                            <View style={styles.title}>
                                <MyText style={styles.titleText} numberOfLines={2} bold={true}>{itemData.item.name.trim()}</MyText>
                            </View>
                            <View>
                                <MyText numberOfLines={1} style={styles.countText}>{itemData.item.count}+ articles</MyText>
                            </View>
                        </View>
                    </View>
                </TouchableComponent>
            </View>
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
        <ScrollView style={{ width: '100%', flex: 1 }}>
            <View style={styles.list}>
                {categories.map(c => renderCategory({ item: c }))}
                {/* <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
            renderItem={renderCategory}></FlatList> */}
            </View >
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    list: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        flex: 1
    },
    parentCategory: {
        width: '100%',
        flex: 1
    },
    parentCategoryText: {
        color: 'red'
    },
    container: {
        //width: '100%',
        //flex: 1,
        width: (Dimensions.get('window').width / 2) - 20,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        height: 150,
        overflow: 'hidden',
        shadowColor: '#ccc',
        backgroundColor: '#fff'
    },
    cardContainer: {
        height: '100%',
        padding: 10,
        justifyContent: 'space-between'
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    bubble: {
        backgroundColor: CustomColors.primaryColor,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        borderRadius: 30
    },
    topTextContainer: {
        width: '80%'
    },
    topText: {
        fontSize: 12,
        color: '#767676',
        textAlign: 'right'
    },
    titleContainer: {
        backgroundColor: '#eeeeee',
        padding: 5,
        height: 75,
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    title: {
    },
    titleText: {
        fontSize: 16,
        textAlign: 'left',
        color: CustomColors.primaryColor
    },
    countText: {
        color: '#acacac',
        fontSize: 15
    }
});

export default CategoriesList2;