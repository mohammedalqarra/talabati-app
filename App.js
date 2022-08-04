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

// the navigations
import Paths from "./src/navigation/Paths";
// the tab navigation
import TabNavigation from "./src/navigation/TabNabvigation";
import * as SplashScreen from "expo-splash-screen";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
<<<<<<< HEAD
import { store } from "./src/features/store";
import { Provider } from "react-redux";
=======
import { AuthContext } from "./src/components/Context";
>>>>>>> 4d638a36fc3946dc5f3cd65a47d34221f636bc56
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
<<<<<<< HEAD
  // for protected routes
  const [appIsReady, setAppIsReady] = useState(false);
=======
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
        setUserToken("fjdisjfp222sd");
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
>>>>>>> 4d638a36fc3946dc5f3cd65a47d34221f636bc56

  // Keep the splash screen visible while we fetch resources
  const [appIsReady, setAppIsReady] = useState(false);
  SplashScreen.preventAutoHideAsync();
<<<<<<< HEAD

=======
  // for the font
>>>>>>> 4d638a36fc3946dc5f3cd65a47d34221f636bc56
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
<<<<<<< HEAD
    <Provider store={store}>
      <NativeBaseProvider>
        <Paths />
      </NativeBaseProvider>
    </Provider>
=======
    <AuthContext.Provider value={authContext}>
      <NativeBaseProvider>
        <NavigationContainer>
          {userToken !== null ? <TabNavigation /> : <AuthNavigation />}
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthContext.Provider>
>>>>>>> 4d638a36fc3946dc5f3cd65a47d34221f636bc56
  );
};

const styles = StyleSheet.create({});

export default App;
