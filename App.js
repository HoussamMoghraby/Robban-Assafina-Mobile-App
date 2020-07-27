import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, NativeModules, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import AssafinaNavigator from './navigation/AssafinaNavigator';
import { enableScreens } from 'react-native-screens';
import CustomColors from './constants/CustomColors';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import postsReducer from './store/reducers/posts';
import categoriesReducer from './store/reducers/categories';
import ReduxThunk from 'redux-thunk';

enableScreens();

const rootReducer = combineReducers({
  posts: postsReducer,
  categories: categoriesReducer
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {

  StatusBar.setBarStyle('light-content');
  StatusBar.setBackgroundColor(CustomColors.accentColor);

  const [fontLoaded, setFontLoaded] = useState(false);
  const [sponsors, setSponsors] = useState();
  const fetchSponsors = async () => {
    await fetchFonts();
    let response = await fetch('https://assafinaonline.com/about-us/');
    const htmlString = await response.text();
    setSponsors(htmlString);
    return 1;
  };

  if (!fontLoaded)
    return (<AppLoading startAsync={fetchFonts} onFinish={() => { setFontLoaded(true); }}></AppLoading>);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.appContainer}>
        <AssafinaNavigator></AssafinaNavigator>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  }
});
