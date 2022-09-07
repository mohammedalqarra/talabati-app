import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// the screens
// import Home from '../screens/Merchant/TabNavigation/Home';
import MerchantHomeNavigation from './MerchantHomeNavigation'
// import Orders from '../screens/Merchant/TabNavigation/Orders';
import MerchantOrderDetails from './MerchantsOrdersNavigations'
// import Notification from '../screens/Merchant/TabNavigation/Notification';
import MercantNotificationsNavigations from './MerchantNotificationNavigation'
// import Myaccount from '../screens/Merchant/TabNavigation/Myaccount';
import MerchantAccountNavigation from './MerchantAccountNavigation'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Icon1 from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();

export default function MerchantTabNavigation() {
  const { t } = useTranslation();

  // screenOptions={{headerShown: false}}
  return (
    <Tab.Navigator
      initialRouteName="Homess"
      screenOptions={{
        tabBarActiveTintColor: "#E56B1F",
      }}
    >
      <Tab.Screen
        name="accountss"
        component={MerchantAccountNavigation}
        options={{
          headerStyle: {
            height: 50,
          },
          tabBarLabel: i18n.t("myaccount"),
          headerShown: false,
          tabBarOptions: { showIcon: true },
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: "Tajawal_500Medium",
          },
          tabBarIcon: ({ focused, tintColor }) => (
            <Icon3
              focused={focused}
              name={"person-outline"}
              tintColor={{ tintColor }}
              color={focused ? "#E56B1F" : "black"}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="notificationss"
        component={MercantNotificationsNavigations}
        options={{
          headerStyle: {
            height: 50,
          },
          tabBarLabel: i18n.t("notifications"),
          headerShown: false,
          tabBarOptions: { showIcon: true },
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: "Tajawal_500Medium",
          },
          tabBarIcon: ({ focused, tintColor }) => (
            <Icon1
              focused={focused}
              name={"shoppingcart"}
              tintColor={{ tintColor }}
              color={focused ? "#E56B1F" : "black"}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Orderss"
        component={MerchantOrderDetails}
        options={{
          headerStyle: {
            height: 50,
          },
          tabBarLabel: i18n.t("orders"),
          headerShown: false,
          tabBarOptions: { showIcon: true },
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: "Tajawal_500Medium",
          },
          tabBarIcon: ({ focused, tintColor }) => (
            <Icon2
              focused={focused}
              name={"shoppingcart"}
              tintColor={{ tintColor }}
              color={focused ? "#E56B1F" : "black"}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Homess"
        component={MerchantHomeNavigation}
        options={{
          headerStyle: {
            height: 50,
          },
          tabBarLabel: i18n.t("home"),
          headerShown: false,
          tabBarOptions: { showIcon: true },
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: "Tajawal_500Medium",
          },
          tabBarIcon: ({ focused, tintColor }) => (
            <Icon
              focused={focused}
              name={"home"}
              tintColor={{ tintColor }}
              color={focused ? "#E56B1F" : "black"}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
