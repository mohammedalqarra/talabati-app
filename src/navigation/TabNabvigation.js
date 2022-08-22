import React from "react";
import { Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// the screens
import Home from "../screens/TabNavigation/Home";
import HomeHeader from "../screens/TabNavigation/HomeHeader";
// import Merchants from '../screens/TabNavigation/Merchants';
import BuyingNavigation from "./BuyingNavigation";
import AccountingNavigation from "./AccountNavigation";
// import MyAccount from '../screens/TabNavigation/MyAccount';
import OrdersNavigation from "../navigation/OrdersNavigation";
// import Orders from '../screens/TabNavigation/Orders';
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Icon1 from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/AntDesign";
import Icon3 from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const { t } = useTranslation();

  // screenOptions={{headerShown: false}}
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#E56B1F",
        tabBarStyle: {
          height: 55,
        },
      }}
    >
      <Tab.Screen
        name="MyAccount1"
        component={AccountingNavigation}
        options={{
          headerStyle: {
            height: 130,
          },
          headerTitleStyle: {
            fontFamily: "Tajawal_500Medium",
          },
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: "Tajawal_500Medium",
          },
          title: i18n.t("myaccount"),
          headerShown: false,

          tabBarIcon: ({ focused, tintColor }) => (
            <Icon3
              focused={focused}
              name={"person-outline"}
              tintColor={{ tintColor }}
              color={focused ? "#E56B1F" : "black"}
              size={24}
            />
          ),
          tabBarOptions: {
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          },
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersNavigation}
        options={{
          headerStyle: {
            height: 130,
          },
          headerTitleStyle: {
            fontFamily: "Tajawal_500Medium",
          },
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: "Tajawal_500Medium",
          },
          title: i18n.t("orders"),
          headerShown: false,

          tabBarIcon: ({ focused, tintColor }) => (
            <Icon2
              focused={focused}
              name={"shoppingcart"}
              tintColor={{ tintColor }}
              color={focused ? "#E56B1F" : "black"}
              size={24}
            />
          ),
          tabBarOptions: {
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          },
        }}
      />
      <Tab.Screen
        name="Merchants"
        component={BuyingNavigation}
        options={{
          headerStyle: {
            height: 130,
          },
          headerTitleStyle: {
            fontFamily: "Tajawal_500Medium",
          },
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: "Tajawal_500Medium",
          },
          title: i18n.t("merchants"),
          headerShown: false,

          tabBarIcon: ({ focused, tintColor }) => (
            <Icon1
              focused={focused}
              name={"storefront"}
              tintColor={{ tintColor }}
              color={focused ? "#E56B1F" : "black"}
              size={24}
            />
          ),
          tabBarOptions: {
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          },
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {
            height: 130,
          },
          headerTitleStyle: {
            fontFamily: "Tajawal_500Medium",
          },
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: "Tajawal_500Medium",
          },
          title: i18n.t("home"),
          headerTitle: () => <HomeHeader />,
          tabBarIcon: ({ focused, tintColor }) => (
            <Icon
              focused={focused}
              name={"home"}
              tintColor={{ tintColor }}
              color={focused ? "#E56B1F" : "black"}
              size={24}
            />
          ),
          tabBarOptions: {
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          },
        }}
      />
    </Tab.Navigator>
  );
}
