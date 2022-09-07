import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { Input, Avatar, Stack, Button, Pressable, Heading } from 'native-base'
import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const SignUpWithPhone = ({ navigation }) => {
  const { t } = useTranslation();

  const { height } = useWindowDimensions();
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Image
        source={require("../../images/logo.png")}
        style={styles.logo}
        resizeMode={"contain"}
      />
      <View>
        <View style={styles.headerContainer}>
          <Heading style={styles.heading} fontFamily={"Tajawal_500Medium"}>
            {t("newaccount1")}
          </Heading>
        </View>
        <Stack space={4} w="100%" alignItems="center">
          <Avatar
            width={100}
            height={100}
            backgroundColor={"white"}
            borderWidth={1}
            borderColor={"#E56B1F"}
          ></Avatar>
          <Input
            w={{
              base: "75%",
              md: "25%",
            }}
            _text={{
              color: "#ECECEC",
            }}
            height={35}
            fontFamily={"Tajawal_500Medium"}
            placeholder={t("phonenumber")}
          />
          <Input
            w={{
              base: "75%",
              md: "25%",
            }}
            _text={{
              color: "#ECECEC",
            }}
            height={35}
            fontFamily={"Tajawal_500Medium"}
            placeholder={t("name")}
          />
          <Input
            w={{
              base: "75%",
              md: "25%",
            }}
            _text={{
              color: "#ECECEC",
            }}
            height={35}
            fontFamily={"Tajawal_500Medium"}
            placeholder={t("email")}
          />
          <Input
            w={{
              base: "75%",
              md: "25%",
            }}
            _text={{
              color: "#ECECEC",
            }}
            height={35}
            fontFamily={"Tajawal_500Medium"}
            placeholder={t("password")}
          />
          <Input
            w={{
              base: "75%",
              md: "25%",
            }}
            _text={{
              color: "#ECECEC",
            }}
            height={35}
            fontFamily={"Tajawal_500Medium"}
            placeholder={t("birthday")}
          />
        </Stack>
        <View style={styles.clickContainer}>
          <Pressable onPress={() => navigation.navigate("ForgetPassword")}>
            <Text style={styles.click}> {t("loginnow")}</Text>
          </Pressable>
          <Text>{t("haveaccount")}</Text>
        </View>
        <Button
          onPress={() => navigation.navigate("VerfiyNumber")}
          style={styles.firstBut}
          size="sm"
          backgroundColor={"#E56B1F"}
          _text={{ fontSize: 14 }}
        >
          {t("register")}
        </Button>
        <Button
          onPress={() => navigation.navigate("VerfiyNumber")}
          style={styles.secBut}
          size="sm"
          background={"#FBF9F9"}
          borderWidth={1}
          borderColor={"#FFE3D2"}
          _text={{ color: "#E56B1F", fontSize: 14 }}
        >
          {t("ignore")}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FBF9F9",
    flex: 1,
    marginTop: -10,
  },
  logo: {
    width: 133,
    height: 117,
  },
  headerContainer: {},
  heading: {
    textAlign: "center",
    color: "#E56B1F",
  },
  clickContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
    marginBottom: 25,
  },
  click: {
    color: "#2680EB",
    textDecorationLine: "underline",
  },
  firstBut: {
    fontFamily: "Tajawal_500Medium",
    fontSize: 14,
  },
  secBut: {
    marginTop: 15,
    fontSize: 14,
  },
});

export default SignUpWithPhone;
