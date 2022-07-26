import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { Input, Stack, Button, Pressable, Heading } from "native-base";
import { useTranslation } from "react-i18next";

const Login = ({ navigation }) => {
  const { t } = useTranslation();

  const { height } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 120,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../images/logo.png")}
          style={styles.logo}
          resizeMode={"contain"}
        />
        <View>
          <View style={styles.headerContainer}>
            <Heading style={styles.heading} fontFamily={"Tajawal_400Regular"}>
              {t("login")}
            </Heading>
          </View>
          <Stack space={4} w="100%" alignItems="center">
            <Input
              w={{
                base: "75%",
                md: "25%",
              }}
              fontFamily={"Tajawal_500Medium"}
              placeholder={t("username")}
            />
            <Input
              w={{
                base: "75%",
                md: "25%",
              }}
              type={"password"}
              fontFamily={"Tajawal_500Medium"}
              placeholder={t("password")}
            />
          </Stack>
          <View style={styles.clickContainer}>
            <Pressable onPress={() => navigation.navigate("SignUps")}>
              <Text style={styles.click1}>{t("newaccount")}</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("ForgetPasswords")}>
              <Text style={styles.click2}>{t("forgetpassword")}</Text>
            </Pressable>
          </View>
          <Button
            onPress={() => navigation.navigate("MerchantHome")}
            style={styles.firstBut}
            size="sm"
            backgroundColor={"#E56B1F"}
            _text={{ fontSize: 14 }}
          >
            {t("log")}
          </Button>
          <Button
            onPress={() => navigation.navigate("MerchantHome")}
            style={styles.secBut}
            size="sm"
            background={"#FBF9F9"}
            borderWidth={1}
            borderColor={"#FFE3D2"}
            _text={{ color: "#E56B1F", fontSize: 14 }}
          >
            {t("skip")}
          </Button>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FBF9F9",
    flex: 1,
  },
  logo: {
    width: 133,
    height: 117,
  },
  headerContainer: {
    marginVertical: 20,
    marginBottom: 40,
  },
  heading: {
    textAlign: "center",
    color: "#E56B1F",
  },
  clickContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 25,
  },
  click1: {
    color: "#E56B1F",
  },
  click2: {
    color: "#2680EB",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  firstBut: {
    fontFamily: "Tajawal_400Regular",
    fontSize: 14,
  },
  secBut: {
    marginTop: 15,
    fontSize: 14,
  },
});

export default Login;
