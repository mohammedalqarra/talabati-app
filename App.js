import React, { useEffect, useState } from "react";
// import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider } from "native-base";
// navigation setup
import { NavigationContainer } from "@react-navigation/native";
// multi languages setup
import { tranulate } from "react-i18next";
import "./src/i18n";
// the screens
import LoadingScreen from "./src/screens/LoadingScreen";
import IntroScreen from "./src/screens/IntroScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";
import VerfiyNumber from "./src/screens/VerfiyNumber";
import ForgetPassword from "./src/screens/ForgetPassword";
// the navigations
import AuthNavigation from "./src/navigation/AuthNavigation";
// the tab navigation
import TabNavigation from "./src/navigation/TabNabvigation";
import * as SplashScreen from "expo-splash-screen";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

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
  const [appIsReady, setAppIsReady] = useState(false);

  // Keep the splash screen visible while we fetch resources
  SplashScreen.preventAutoHideAsync();

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       // // Pre-load fonts, make any API calls you need to do here
  //       // await Font.loadAsync(Tajawal.font);
  //       // // Artificially delay for two seconds to simulate a slow loading
  //       // // experience. Please remove this if you copy and paste the code!
  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       setAppIsReady(true);
  //       await SplashScreen.hideAsync();
  //     }
  //   }

  //   prepare();
  // }, []);

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
    <NativeBaseProvider>
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
