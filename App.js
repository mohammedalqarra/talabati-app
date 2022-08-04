import React, { useEffect, useState } from "react";
// import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider } from "native-base";
// navigation setup
import { NavigationContainer } from "@react-navigation/native";
// multi languages setup
import { tranulate } from "react-i18next";
import "./src/i18n";

// the navigations
import Paths from "./src/navigation/Paths";
// the tab navigation
import TabNavigation from "./src/navigation/TabNabvigation";
import * as SplashScreen from "expo-splash-screen";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { store } from "./src/features/store";
import { Provider } from "react-redux";
import {
  useFonts,
  Tajawal_200ExtraLight,
  Tajawal_300Light,
  Tajawal_400Regular,
  Tajawal_500Medium,
  Tajawal_700Bold,
  Tajawal_800ExtraBold,
  Tajawal_900Black,
} from "@expo-google-fonts/tajawal";

const App = () => {
  // for protected routes
  const [appIsReady, setAppIsReady] = useState(false);

  // Keep the splash screen visible while we fetch resources
  SplashScreen.preventAutoHideAsync();

  let [fontsLoaded] = useFonts({
    Tajawal_200ExtraLight,
    Tajawal_300Light,
    Tajawal_400Regular,
    Tajawal_500Medium,
    Tajawal_700Bold,
    Tajawal_800ExtraBold,
    Tajawal_900Black,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Paths />
      </NativeBaseProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
