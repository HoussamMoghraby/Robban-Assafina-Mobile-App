import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, NativeModules, StatusBar, ImageBackground, Dimensions } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import AssafinaNavigator from './navigation/AssafinaNavigator';
import { enableScreens } from 'react-native-screens';
import CustomColors from './constants/CustomColors';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import postsReducer from './store/reducers/posts';
import categoriesReducer from './store/reducers/categories';
import authReducer from './store/reducers/auth';
import ReduxThunk from 'redux-thunk';
import { isPlatformAndroid } from './helpers/Platform';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true
    }
  }
});

enableScreens();

const rootReducer = combineReducers({
  posts: postsReducer,
  categories: categoriesReducer,
  auth: authReducer
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {

  StatusBar.setBarStyle(isPlatformAndroid() ? 'light-content' : 'default');
  if (isPlatformAndroid())
    StatusBar.setBackgroundColor(CustomColors.accentColor);

  const [fontLoaded, setFontLoaded] = useState(false);
  const [loadCustomSplash, setLoadCustomSplash] = useState(0);
  const [customSplashURL, setCustomSplashURL] = useState();

  useEffect(() => {
    const loadSplash = async () => {
      console.log('getting custom splash');
      try {
        const splashResponse = await fetch('http://assafinaonline.com/wp-json/wp/v2/media?search=Mobile_App_Splash_Screen&ordeby=date&order=desc');
        const splashResponseJSON = await splashResponse.json();
        console.log('setting custom splash');
        setCustomSplashURL(splashResponseJSON[0].media_details.sizes.full.source_url);
      }
      catch (error) {
        console.log(error);
        setCustomSplashURL('');
      }
    }
    if (loadCustomSplash == 0)
      loadSplash();
  }, [loadCustomSplash]);

  if (!fontLoaded)
    return (<AppLoading startAsync={fetchFonts} onFinish={() => { setFontLoaded(true); setLoadCustomSplash(1); }}></AppLoading>);

  if (loadCustomSplash == 1) {
    setTimeout(() => {
      setLoadCustomSplash(2);
    }, 4000);
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        {customSplashURL ?
          <ImageBackground source={{ uri: customSplashURL }} style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }} resizeMode="contain" >
          </ImageBackground>
          : <View></View>
        }
      </View >
    );
  }
  else if (loadCustomSplash == 2) {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.appContainer}>
          <AssafinaNavigator></AssafinaNavigator>
        </SafeAreaView>
      </Provider>
    );
  }
  else
    return (<View></View>)
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  }
});
