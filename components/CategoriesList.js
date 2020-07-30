import React from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { categories_data } from '../data/categories';
import TouchableComponent from './TouchableComponent';
import MyText from './MyText';
import CustomColors from '../constants/CustomColors';
import { FontAwesome } from '@expo/vector-icons';
import * as Enumerable from 'linq-es2015';

const CategoriesList = (props) => {
    //const categories = categories_data.filter(c => c.parent != 81 && c.parent != 202 && c.count > 0);
    let categories = Enumerable.asEnumerable(categories_data).Where(c => c.parent == 166).OrderBy(c => c.order).ToArray();//assafina news
    const otherCategories = Enumerable.asEnumerable(categories_data).Where(c => [167, 169, 170].includes(c.id)).OrderBy(c => c.order).ToArray();
    categories = [...categories, ...otherCategories];
    const renderCategory = (itemData, index) => {
        const parentCategory = categories_data.find(c => c.id == itemData.item.parent);
        return (
            <View style={styles.container}>
                <TouchableComponent onPress={() => { props.navigation.push('CategoryPosts', { categoryId: itemData.item.id, categoryTitle: itemData.item.name }) }}>
                    <View style={styles.cardContainer}>
                        <View style={styles.topContainer}>
                            <View style={styles.bubble}>
                                <FontAwesome
                                    name="anchor"
                                    size={13}
                                    color="#fff"
                                ></FontAwesome>
                            </View>
                            <View style={styles.topTextContainer}>
                                <MyText numberOfLines={2} style={styles.topText}>{parentCategory ? parentCategory.name : ''}</MyText>
                            </View>
                        </View>
                        <View style={styles.titleContainer}>
                            <View style={styles.title}>
                                <MyText style={styles.titleText} numberOfLines={2} bold={true}>{itemData.item.name}</MyText>
                            </View>
                            <View>
                                {/* <MyText numberOfLines={1} style={styles.countText}>{itemData.item.count}+ articles</MyText> */}
                            </View>
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        )
    };
    return (
        <View style={styles.list}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                renderItem={renderCategory}></FlatList>
        </View >
    )
};

const styles = StyleSheet.create({
    list: {
        width: '100%'
    },
    container: {
        flex: 1,
        maxWidth: (Dimensions.get('window').width / 2) - 20,
        margin: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        height: 180,
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
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 23,
        height: 23,
        borderRadius: 23
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
        textAlign: 'left'
    },
    countText: {
        color: '#acacac',
        fontSize: 15
    }
});

export default CategoriesList;