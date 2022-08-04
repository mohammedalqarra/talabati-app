// In App.js in a new project

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// the screens
import IntroScreen from "../screens/IntroScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import SignUpWithPhone from "../screens/SignUpWithPhone";
import VerfiyNumber from "../screens/VerfiyNumber";
import ForgetPassword from "../screens/ForgetPassword";
import MerchantAuthNavigation from "../navigation/MerchantAuthNavigation";
import TabNavigation from "./TabNabvigation";
import MerchantTabNavigation from "./MerchantTabNavigator";
import { useSelector, useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();

function Paths() {
  const IsLogged = useSelector((state) => state.auth.IsLogged);
  const IsMerchantLogged = useSelector((state) => state.auth.IsMerchantLogged);

  return (
    <NavigationContainer>
      {IsLogged ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home" component={TabNavigation} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="WelcomeScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="IntroScreen" component={IntroScreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignUpWithPhone" component={SignUpWithPhone} />
          <Stack.Screen name="VerfiyNumber" component={VerfiyNumber} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="SellerHome" component={TabNavigation} />
          <Stack.Screen
            name="MerchantAuth"
            component={MerchantAuthNavigation}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default Paths;
