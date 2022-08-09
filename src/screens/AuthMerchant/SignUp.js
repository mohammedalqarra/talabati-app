import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Input, Avatar, Stack, Button, Pressable, Heading } from "native-base";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";
import { signup_api, Api_url } from "../../utilites/ApiConstants";
import axios from "axios";
import { Formik } from "formik";
import { Modal } from "native-base";

const SignUp = ({ navigation }) => {
  const [gender, setGender] = useState("male");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sucessModal, setSucessModal] = useState(false);
  const { t } = useTranslation();
  const { height } = useWindowDimensions();
  // for picking images
  // avatarImage
  const [avatar, setAvatar] = useState(null);
  const pickAvatarImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };
  // storefront
  const [storefront, setStorefront] = useState(null);
  const pickStorefront = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setStorefront(result.uri);
    }
  };
  // avatarImage
  const [commercialImg, setCommercialImg] = useState(null);
  const pickCommercialImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setCommercialImg(result.uri);
    }
  };
  // handling signup

  const HandleSellerRegister = async (
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
    <ScrollView>
      <Formik
        initialValues={{
          username: "",
          name: "",
          mobile: "",
          password: "",
          organization_name: "",
          role_id: "seller",
        }}
        onSubmit={async (values) =>
          await HandleUserRegister(
            values.username,
            values.name,
            values.mobile,
            values.password,
            values.organization_name,
            values.role_id
          )
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.container}>
            <Image
              source={require("../../images/logo.png")}
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
                    <Image source={require("../../images/thumbs-up.png")} />
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
            <View>
              <View style={styles.headerContainer}>
                <Heading
                  style={styles.heading}
                  fontFamily={"Tajawal_500Medium"}
                >
                  {t("newaccount1")}
                </Heading>
              </View>
              <Stack space={4} w="100%" alignItems="center">
                <Pressable onPress={pickAvatarImage}>
                  <Avatar
                    width={100}
                    height={100}
                    backgroundColor={"white"}
                    borderWidth={1}
                    borderColor={"#E56B1F"}
                  >
                    {avatar && (
                      <Image
                        source={{ uri: avatar }}
                        style={{ width: 90, height: 90, borderRadius: 50 }}
                      />
                    )}
                  </Avatar>
                </Pressable>
                <Input
                  w={{
                    base: "75%",
                    md: "25%",
                  }}
                  _text={{
                    color: "#ECECEC",
                  }}
                  variant="underlined"
                  height={35}
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
                  placeholder={t("phonenumber")}
                  onBlur={handleBlur("phonenumber")}
                  value={values.phonenumber}
                  onChangeText={handleChange("phonenumber")}
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
                  type={"password"}
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
                  height={35}
                  variant="underlined"
                  fontFamily={"Tajawal_500Medium"}
                  placeholder={t("organizationname")}
                  onBlur={handleBlur("organizationname")}
                  value={values.organizationname}
                  onChangeText={handleChange("organizationname")}
                />

                <View
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
                        source={require("../../images/Icononic-ios-woman.png")}
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
                        source={require("../../images/Icononic-ios-woman.png")}
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
                </View>
                <View style={styles.smallcontainer}>
                  <View style={styles.txtaround}>
                    <Pressable onPress={pickStorefront}>
                      <Text style={styles.txt}>choose file</Text>
                    </Pressable>
                  </View>
                  <Text style={styles.txt}>{t("merchantlogoo")}</Text>
                </View>
                {storefront && (
                  <Image
                    source={{ uri: storefront }}
                    style={{
                      height: 150,
                      width: 300,
                      borderWidth: 1,
                      borderColor: "#E56B1F",
                    }}
                  />
                )}
                <View style={styles.smallcontainer}>
                  <View style={styles.txtaround2}>
                    <Pressable onPress={pickCommercialImage}>
                      <Text style={styles.txt}>choose file</Text>
                    </Pressable>
                  </View>
                  <Text style={styles.txt}>{t("picoflicencemerchant")}</Text>
                </View>
                {commercialImg && (
                  <Image
                    source={{ uri: commercialImg }}
                    style={{
                      height: 150,
                      width: 300,
                      borderWidth: 1,
                      borderColor: "#E56B1F",
                    }}
                  />
                )}
              </Stack>

              <Button
                onPress={() => navigation.navigate("VerfiyNumbers")}
                style={styles.firstBut}
                marginTop={15}
                size="sm"
                backgroundColor={"#E56B1F"}
                _text={{ fontSize: 14 }}
              >
                {t("register")}
              </Button>
              <View style={styles.clickContainer}>
                <Pressable
                  onPress={() => navigation.navigate("ForgetPasswords")}
                >
                  <Text style={styles.click}> {t("loginnow")}</Text>
                </Pressable>
                <Text>{t("haveaccount")}</Text>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
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
  txt: {
    color: "#E56B1F",
    fontFamily: "Tajawal_500Medium",
    fontSize: 16,
  },
  txtaround: {
    backgroundColor: "#CCCCCC",
    borderRadius: 15,
    padding: 5,
    marginRight: 140,
  },
  smallcontainer: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  txtaround2: {
    backgroundColor: "#CCCCCC",
    borderRadius: 15,
    padding: 5,
    marginRight: 60,
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
