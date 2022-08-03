import React, { useEffect, useState, useMemo } from "react";
// import SplashScreen from 'react-native-splash-screen';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
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
import { AuthContext } from "./src/components/Context";
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
  // for auth
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const authContext = useMemo(
    () => ({
      signIn: () => {
        setUserToken("faketoken");
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      },
      signUp: () => {
        setUserToken("fjdisjfpsd");
        setIsLoading(false);
      },
      signOut: () => {
        setUserToken(null);
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      },
    }),
    []
  );

  // Keep the splash screen visible while we fetch resources
  const [appIsReady, setAppIsReady] = useState(false);
  SplashScreen.preventAutoHideAsync();
  // for the font
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

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NativeBaseProvider>
        <NavigationContainer>
          {userToken !== null ? <TabNavigation /> : <AuthNavigation />}
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
