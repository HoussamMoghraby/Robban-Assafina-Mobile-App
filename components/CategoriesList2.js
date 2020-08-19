import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions, ActivityIndicator, ImageBackground } from 'react-native';
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
import { decodeString } from '../helpers/apiUtils';
const CARD_HEIGHT = 200;
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
        var categoryImage = '../assets/placeholder.png';
        return (
            <View style={styles.container} key={itemData.item.id}>
                <TouchableComponent onPress={() => { props.navigation.push('CategoryPosts', { categoryId: itemData.item.id, categoryTitle: decodeString(itemData.item.name.trim()) }) }}>
                    <ImageBackground style={{ height: CARD_HEIGHT, width: '100%' }} source={
                        itemData.item.id == 167 ? require('../assets/categories/167.jpg') :
                            (itemData.item.id == 169 ? require('../assets/categories/169.jpg') :
                                (itemData.item.id == 170 ? require('../assets/categories/170.jpg') :
                                    (itemData.item.id == 182 ? require('../assets/categories/182.jpg') :
                                        (itemData.item.id == 183 ? require('../assets/categories/183.jpg') :
                                            (itemData.item.id == 184 ? require('../assets/categories/184.jpg') :
                                                (itemData.item.id == 188 ? require('../assets/categories/188.jpg') :
                                                    (itemData.item.id == 189 ? require('../assets/categories/189.jpg') :
                                                        (itemData.item.id == 190 ? require('../assets/categories/190.jpg') : require(categoryImage))))))))
                            )
                    }>
                        <View style={styles.imageBackgroundOverlay}>
                            <View style={styles.cardContainer}>
                                <View style={styles.topContainer}>
                                    {/* <View style={styles.bubble}>
                                <FontAwesome
                                    name="anchor"
                                    size={17}
                                    color="#fff"
                                ></FontAwesome>
                            </View> */}
                                    <View style={styles.topTextContainer}>
                                        <MyText numberOfLines={2} style={styles.topText}>{parentCategory ? parentCategory.name : ''}</MyText>
                                    </View>
                                </View>
                                <View style={styles.titleContainer}>
                                    <View style={{ ...styles.titleLeft, flex: (decodeString(itemData.item.name.trim()).length > itemData.item.description.length) ? 0.6 : 0.4 }}>
                                        <MyText style={{ ...styles.titleText, textAlign: 'left' }} numberOfLines={3} bold={true}>{decodeString(itemData.item.name.trim())}</MyText>
                                        {/* {
                                            itemData.item.description ? <MyText style={{ ...styles.titleText, textAlign: 'right' }} numberOfLines={3} bold={true}> {`${itemData.item.description}`}</MyText> : <View></View>
                                        } */}

                                    </View>
                                    {/* <View>{
                                        itemData.item.description ? <MyText style={{ color: '#fff' }}> - </MyText> : <View></View>
                                    }</View> */}
                                    {
                                        itemData.item.description ?
                                            <View style={{ ...styles.titleRight, flex: (decodeString(itemData.item.name.trim()).length > itemData.item.description.length) ? 0.4 : 0.6 }}>
                                                <MyText style={{ ...styles.titleText, textAlign: 'right' }} numberOfLines={3} bold={true}>{itemData.item.description}</MyText>
                                            </View> :
                                            <View></View>
                                    }
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
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
        width: Dimensions.get('window').width - 20,
        //width: (Dimensions.get('window').width / 2) - 20,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        height: CARD_HEIGHT,
        overflow: 'hidden',
        shadowColor: '#ccc',
        backgroundColor: '#fff'
    },
    cardContainer: {
        height: '100%',
        //padding: 10,
        justifyContent: 'space-between'
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
        padding: 10,
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
        width: '100%'
    },
    topText: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'left'
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 10,
        //height: 75,
        //borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'nowrap'
        //maxWidth: '100%',
    },
    titleLeft: {
        //flex: 0.6,
        //backgroundColor:'red',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // flexWrap: 'wrap',
        // alignItems:'center'
    },
    titleRight: {
        //flex: 0.4,
        //backgroundColor:'yellow'
    },
    titleText: {
        fontSize: 18,
        textAlign: 'right',
        color: '#fff',
        //marginHorizontal: 15
    },
    countText: {
        color: '#acacac',
        fontSize: 15
    },
    imageBackgroundOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end'
    },
});

export default CategoriesList2;