import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NativeBaseProvider } from "native-base";
import './src/i18n';
import Paths from "./src/navigation/Paths";
import * as SplashScreen from 'expo-splash-screen';
import AppLoading from "expo-app-loading";
import { store } from "./src/features/store";
import { Provider } from "react-redux";
import "./src/firebase";
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
  // Keep the splash screen visible while we fetch resources
  const [appIsReady, setAppIsReady] = useState(false);
  SplashScreen.preventAutoHideAsync();

  // for the font
  const [fontsLoaded] = useFonts({
    Tajawal_200ExtraLight,
    Tajawal_300Light,
    Tajawal_400Regular,
    Tajawal_500Medium,
    Tajawal_700Bold,
    Tajawal_800ExtraBold,
    Tajawal_900Black,
  });

  // if (fontsLoaded) {
  // }
  if (!fontsLoaded) {
    // return null;
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
