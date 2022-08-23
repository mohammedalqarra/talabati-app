import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Input, Stack, Button, Pressable, Heading } from "native-base";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// import { UserLogIn } from "../features/auth/authSlice";
import { Formik } from "formik";
import { handlelogInUser, handlelogInGuest } from "../features/auth/authSlice";
import { login_api, Api_url } from "../utilites/ApiConstants";
import axios from "axios";
import { Modal } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const HandleUserLogin = async (login_id, password) => {
    const url = Api_url + login_api;
    setShowModal(true);
    axios
      .post(url, {
        login_id,
        password,
      })
      .then((res) => {
        if (res && res.status == 200) {
          dispatch(handlelogInUser(res.data));
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
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) =>
          await HandleUserLogin(values.username, values.password)
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <View
              style={{
                alignItems: "center",
                marginTop: 120,
              }}
            >
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
              {/* end of modal */}
              <Image
                source={require("../images/logo.png")}
                style={styles.logo}
                resizeMode={"contain"}
              />
              <View>
                <View style={styles.headerContainer}>
                  <Heading
                    style={styles.heading}
                    fontFamily={"Tajawal_500Medium"}
                  >
                    {t("login")}
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
                  <Input
                    w={{
                      base: "75%",
                      md: "25%",
                    }}
                    fontFamily={"Tajawal_500Medium"}
                    variant="underlined"
                    placeholder={t("username")}
                    value={values.username}
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                  />

                  <Input
                    w={{
                      base: "75%",
                      md: "25%",
                    }}
                    onBlur={handleBlur("password")}
                    variant="underlined"
                    type={"password"}
                    fontFamily={"Tajawal_500Medium"}
                    placeholder={t("password")}
                    value={values.password}
                    onChangeText={handleChange("password")}
                  />
                </Stack>
                <View style={styles.clickContainer}>
                  <Pressable onPress={() => navigation.navigate("SignUp")}>
                    <Text style={styles.click1}>{t("newaccount")}</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => navigation.navigate("ForgetPassword")}
                  >
                    <Text style={styles.click2}>{t("forgetpassword")}</Text>
                  </Pressable>
                </View>
                <Button
                  onPress={handleSubmit}
                  style={styles.firstBut}
                  size="sm"
                  backgroundColor={"#E56B1F"}
                  _text={{ fontSize: 14 }}
                >
                  {t("log")}
                </Button>
                <Button
                  onPress={() => dispatch(handlelogInGuest())}
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
        )}
      </Formik>
    </KeyboardAwareScrollView>
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

export default Login;
