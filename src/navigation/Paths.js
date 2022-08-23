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
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const Renderpages = () => {
  const IsUser = useSelector((state) => state.auth.IsUser);
  const IsMerchant = useSelector((state) => state.auth.IsMerchant);
  return (
    <>
      {IsUser && (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home" component={TabNavigation} />
        </Stack.Navigator>
      )}
      {IsMerchant && (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MerchantHome" component={MerchantTabNavigation} />
        </Stack.Navigator>
      )}
    </>
  );
};

// const Renderpages2 = () => {
//   const IsGuest = useSelector((state) => state.auth.IsGuest);

//   return (
//     <>
//       {IsGuest ? (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="home" component={TabNavigation} />
//         </Stack.Navigator>
//       ) : (
//         <Stack.Navigator
//           initialRouteName="WelcomeScreen"
//           screenOptions={{ headerShown: false }}
//         >
//           <Stack.Screen name="IntroScreen" component={IntroScreen} />
//           <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
//           <Stack.Screen name="Login" component={Login} />
//           <Stack.Screen name="SignUp" component={SignUp} />
//           <Stack.Screen name="SignUpWithPhone" component={SignUpWithPhone} />
//           <Stack.Screen name="VerfiyNumber" component={VerfiyNumber} />
//           <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
//           <Stack.Screen
//             name="MerchantAuth"
//             component={MerchantAuthNavigation}
//           />
//         </Stack.Navigator>
//       )}
//     </>
//   );
// };

const Renderpages2 = () => {
  const IsGuest = useSelector((state) => state.auth.IsGuest);

  return (
    <>
      {IsGuest ? (
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
          <Stack.Screen
            name="MerchantAuth"
            component={MerchantAuthNavigation}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

function Paths() {
  const IsLogged = useSelector((state) => state.auth.IsLogged);

  return (
    <NavigationContainer>
      {IsLogged ? <Renderpages /> : <Renderpages2 />}
    </NavigationContainer>
  );
}

export default Paths;
