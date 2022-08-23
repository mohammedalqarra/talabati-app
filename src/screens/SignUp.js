import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Input, Avatar, Stack, Button, Pressable, Heading } from "native-base";
import { useTranslation } from "react-i18next";
import { signup_api, Api_url } from "../utilites/ApiConstants";
import axios from "axios";
import { Formik } from "formik";
import { Modal } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUp = ({ navigation }) => {
  const [gender, setGender] = useState("male");
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sucessModal, setSucessModal] = useState(false);

  const HandleUserRegister = async (
    username,
    name,
    mobile,
    email,
    password,
    password_confirmation,
    role_id
  ) => {
    const url = Api_url + signup_api;
    setShowModal(true);
    axios
      .post(url, {
        username,
        name,
        mobile,
        email,
        password,
        password_confirmation,
        role_id,
      })
      .then((res) => {
        if (res && res.status == 200) {
          setSucessModal(true);
          navigation.goBack();
          // navigation.navigate("VerfiyNumber");
          setShowModal(false);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setShowModal(false);
      });
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Formik
        initialValues={{
          username: "",
          name: "",
          mobile: "",
          email: "",
          password: "",
          password_confirmation: "",
          role_id: "customer",
        }}
        onSubmit={async (values) =>
          await HandleUserRegister(
            values.username,
            values.name,
            values.mobile,
            values.email,
            values.password,
            values.password_confirmation,
            values.role_id
          )
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Image
              source={require("../images/logo.png")}
              style={styles.logo}
              resizeMode={"contain"}
            />
            {/* start of modal */}
            <Modal isOpen={showModal}>
              <Modal.Content maxWidth="400px">
                <Modal.Body>
                  <View style={styles.centerizedCol}>
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                </Modal.Body>
              </Modal.Content>
            </Modal>
            {/* Successfully sign up modal */}
            <Modal isOpen={sucessModal}>
              <Modal.Content maxWidth="400px">
                <Modal.Body>
                  <View style={styles.centerizedCol}>
                    <Image source={require("../images/thumbs-up.png")} />
                    <Text
                      style={{
                        marginTop: 13,
                        fontSize: 16,
                        color: "#EF1D1D",
                        fontFamily: "Tajawal_500Medium",
                      }}
                    >
                      {t("signupsucess")}
                    </Text>
                  </View>
                </Modal.Body>
              </Modal.Content>
            </Modal>
            {/* end of modal */}
            <View>
              <View style={styles.headerContainer}>
                <Heading
                  style={styles.heading}
                  fontFamily={"Tajawal_500Medium"}
                >
                  {t("newaccount1")}
                </Heading>
              </View>
              <View>
                <View>
                  {error && (
                    <View style={styles.errmessage}>
                      <Text style={styles.errmessagetxt}>{error}</Text>
                    </View>
                  )}
                </View>
                <View>
                  {error === undefined && (
                    <View style={styles.errmessage}>
                      <Text style={styles.errmessagetxt}>
                        {" "}
                        Check Your Connection and retry to log in{" "}
                      </Text>
                    </View>
                  )}
                </View>
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
                  variant="underlined"
                  fontFamily={"Tajawal_500Medium"}
                  placeholder={t("phonenumber")}
                  onBlur={handleBlur("mobile")}
                  value={values.mobile}
                  onChangeText={handleChange("mobile")}
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
                  variant="underlined"
                  fontFamily={"Tajawal_500Medium"}
                  placeholder={t("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  onChangeText={handleChange("username")}
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
                  variant="underlined"
                  fontFamily={"Tajawal_500Medium"}
                  placeholder={t("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  onChangeText={handleChange("name")}
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
                  variant="underlined"
                  fontFamily={"Tajawal_500Medium"}
                  placeholder={t("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  onChangeText={handleChange("email")}
                />
                <Input
                  w={{
                    base: "75%",
                    md: "25%",
                  }}
                  _text={{
                    color: "#ECECEC",
                  }}
                  type={"password"}
                  height={35}
                  variant="underlined"
                  fontFamily={"Tajawal_500Medium"}
                  placeholder={t("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  onChangeText={handleChange("password")}
                />
                <Input
                  w={{
                    base: "75%",
                    md: "25%",
                  }}
                  _text={{
                    color: "#ECECEC",
                  }}
                  type={"password"}
                  variant="underlined"
                  height={35}
                  fontFamily={"Tajawal_500Medium"}
                  placeholder={t("confirmpassword")}
                  onBlur={handleBlur("password_confirmation")}
                  value={values.password_confirmation}
                  onChangeText={handleChange("password_confirmation")}
                />
                {/* <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Pressable
                  style={
                    gender === "female" && {
                      borderColor: "#E56B1F",
                      borderWidth: 1,
                    }
                  }
                  onPress={() => setGender("female")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: 150,
                      height: 30,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        marginTop: 5,
                        fontFamily: "Tajawal_500Medium",
                        fontSize: 14,
                      }}
                    >
                      {t("female")}
                    </Text>
                    <Image
                      source={require("../images/Icononic-ios-woman.png")}
                      style={{
                        height: 25,
                        marginTop: 5,
                        marginRight: 15,
                        marginLeft: 15,
                        width: 10,
                      }}
                    />
                  </View>
                </Pressable>
                <Pressable
                  style={
                    gender === "male" && {
                      borderColor: "#E56B1F",
                      borderWidth: 1,
                    }
                  }
                  onPress={() => setGender("male")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: 150,
                      height: 30,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        marginTop: 5,
                        fontFamily: "Tajawal_500Medium",
                        fontSize: 14,
                      }}
                    >
                      {t("male")}
                    </Text>
                    <Image
                      source={require("../images/Icononic-ios-woman.png")}
                      style={{
                        height: 25,
                        marginTop: 5,
                        marginRight: 15,
                        marginLeft: 15,
                        width: 10,
                      }}
                    />
                  </View>
                </Pressable>
              </View> */}
              </Stack>
              <View style={styles.clickContainer}>
                <Pressable
                  onPress={() => navigation.navigate("ForgetPassword")}
                >
                  <Text style={styles.click}> {t("loginnow")}</Text>
                </Pressable>
                <Text>{t("haveaccount")}</Text>
              </View>
              <Button
                onPress={handleSubmit}
                // onPress={() => navigation.navigate("VerfiyNumber")}
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
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FBF9F9",
    flex: 1,
    marginTop: 40,
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
  centerizedCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  errmessage: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  errmessagetxt: {
    fontSize: 14,
    fontFamily: "Tajawal_500Medium",
    color: "red",
  },
});

export default SignUp;
