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
import * as DocumentPicker from "expo-document-picker";
import { signup_api, Api_url } from "../../utilites/ApiConstants";
import axios from "axios";
import { Formik } from "formik";
import { Modal } from "native-base";
// import RNFetchBlob from "rn-fetch-blob";

const SignUp = ({ navigation }) => {
  const [gender, setGender] = useState("male");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sucessModal, setSucessModal] = useState(false);
  const [avatarBlob, setAvatarBlob] = useState({
    uri: "",
    name: "",
    type: "",
  });
  const [storeBlob, setStoreBlob] = useState("");
  const [commercialBlob, setCommercialBlob] = useState("");

  const { t } = useTranslation();
  const { height } = useWindowDimensions();
  // for picking images

  const pickAvatar = async (handleChange) => {
    const { type, uri } = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: "*/*",
    });

    if (type === "cancel") {
      return;
    }
    console.log("pickerResponse", uri);

    try {
      const fetchResponse = await fetch(uri);
      console.log("fetchResponse", fetchResponse);
      const blob = await fetchResponse.blob();
      console.log("blob avatar", blob);
      setAvatarBlob({ uri, name: "media", type: `image/${type}` });
      console.log("blob avatar 1111", avatarBlob);

      handleChange(fetchResponse.url);
    } catch (error) {
      console.log("ERR: " + error.message);
    }
  };

  const pickStore = async (handleChange) => {
    const { type, uri } = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: "*/*",
    });

    if (type === "cancel") {
      return;
    }
    console.log("pickerResponse", uri);

    try {
      const fetchResponse = await fetch(uri);
      console.log("fetchResponse", fetchResponse);
      const blob = await fetchResponse.blob();
      console.log("blob store", blob);
      setStoreBlob({ uri, name: "media", type: `image/${type}` });
      handleChange(fetchResponse.url);
    } catch (error) {
      console.log("ERR: " + error.message);
    }
  };

  const pickCommercial = async (handleChange) => {
    const { type, uri } = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: "*/*",
    });

    if (type === "cancel") {
      return;
    }
    console.log("pickerResponse", uri);

    try {
      const fetchResponse = await fetch(uri);
      console.log("fetchResponse", fetchResponse);
      const blob = await fetchResponse.blob();
      console.log("blob commercial", blob);
      setCommercialBlob({ uri, name: "media", type: `image/${type}` });
      handleChange(fetchResponse.url);
    } catch (error) {
      console.log("ERR: " + error.message);
    }
  };

  // const pickDocument = async (handleChange) => {
  //   let result = await DocumentPicker.getDocumentAsync({});
  //   handleChange(result.uri);
  //   console.log(result.uri);
  // };

  // avatarImage
  // const [avatar, setAvatar] = useState(null);
  const pickAvatarImage = async (handleChange) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      // includeBase64: true,
    });
    if (!result.cancelled) {
      handleChange(result.uri);
      console.log(result.uri);
      console.log(result);
    }
  };

  // storefront
  // const [storefront, setStorefront] = useState(null);
  const pickStorefront = async (handleChange) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      handleChange(result.uri);
    }
  };
  // avatarImage
  // const [commercialImg, setCommercialImg] = useState(null);
  const pickCommercialImage = async (handleChange) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      handleChange(result.uri);
    }
  };

  // const HandleSellerRegister = async (
  //   username,
  //   name,
  //   mobile,
  //   password,
  //   password_confirmation,
  //   blobAvatar,
  //   blobStorefront,
  //   blobCommercialLicense,
  //   organization_name,
  //   role_id
  // ) => {
  //   const url = Api_url + signup_api;
  //   RNFetchBlob.fetch(
  //     "POST",
  //     url,
  //     {
  //       "Content-Type": "multipart/form-data",
  //     },
  //     [
  //       { name: "username", data: username },
  //       { name: "name", data: name },
  //       { name: "mobile", data: mobile },
  //       { name: "password", data: password },
  //       { name: "password_confirmation", data: password_confirmation },
  //       { name: "blobAvatar", filename: "blobAvatar.png", data: blobAvatar },
  //       {
  //         name: "blobStorefront",
  //         filename: "blobStorefront.png",
  //         data: blobStorefront,
  //       },
  //       {
  //         name: "blobCommercialLicense",
  //         filename: "blobCommercialLicense.png",
  //         data: blobCommercialLicense,
  //       },
  //       { name: "organization_name", data: organization_name },
  //       { name: "role_id", data: role_id },
  //       ,
  //     ]
  //   )
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const HandleSellerRegister = async (
    username,
    name,
    mobile,
    password,
    password_confirmation,
    avatarBlob,
    storeBlob,
    commercialBlob,
    organization_name,
    role_id
  ) => {
    const url = Api_url + signup_api;
    // const avatarpic = await blobAvatar.blob();
    // const storepic = await blobStorefront.blob();
    // const commericalpic = await blobCommercialLicense.blob();

    setShowModal(true);
    axios
      .post(url, {
        username,
        name,
        mobile,
        password,
        password_confirmation,
        avatarBlob,
        storeBlob,
        commercialBlob,
        organization_name,
        role_id,
      })
      .then((res) => {
        if (res && res.status == 200) {
          setSucessModal(true);
          navigation.goBack();
          // navigation.navigate("VerfiyNumber");
          setShowModal(false);
          console.log(res);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setShowModal(false);
        console.log(res);
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
          password_confirmation: "",
          blobAvatar: "",
          blobStorefront: "",
          blobCommercialLicense: "",
          organization_name: "",
          role_id: "provider",
        }}
        onSubmit={async (values) => {
          HandleSellerRegister(
            values.username,
            values.name,
            values.mobile,
            values.password,
            values.password_confirmation,
            avatarBlob,
            storeBlob,
            commercialBlob,
            values.organization_name,
            values.role_id
          );
        }}
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
                <Pressable
                  onPress={() => pickAvatar(handleChange("blobAvatar"))}
                >
                  <Avatar
                    width={100}
                    height={100}
                    backgroundColor={"white"}
                    borderWidth={1}
                    borderColor={"#E56B1F"}
                  >
                    {values.blobAvatar && (
                      <Image
                        source={{ uri: values.blobAvatar }}
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
                  type={"password"}
                  variant="underlined"
                  height={35}
                  fontFamily={"Tajawal_500Medium"}
                  placeholder={t("confirmpassword")}
                  onBlur={handleBlur("password_confirmation")}
                  value={values.password_confirmation}
                  onChangeText={handleChange("password_confirmation")}
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
                  onBlur={handleBlur("organization_name")}
                  value={values.organization_name}
                  onChangeText={handleChange("organization_name")}
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
                    <Pressable
                      onPress={() => pickStore(handleChange("blobStorefront"))}
                    >
                      <Text style={styles.txt}>choose file</Text>
                    </Pressable>
                  </View>
                  <Text style={styles.txt}>{t("merchantlogoo")}</Text>
                </View>
                {values.blobStorefront && (
                  <Image
                    source={{ uri: values.blobStorefront }}
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
                    <Pressable
                      onPress={() =>
                        pickCommercial(handleChange("blobCommercialLicense"))
                      }
                    >
                      <Text style={styles.txt}>choose file</Text>
                    </Pressable>
                  </View>
                  <Text style={styles.txt}>{t("picoflicencemerchant")}</Text>
                </View>
                {values.blobCommercialLicense && (
                  <Image
                    source={{ uri: values.blobCommercialLicense }}
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
                onPress={handleSubmit}
                style={styles.firstBut}
                marginTop={15}
                size="sm"
                backgroundColor={"#E56B1F"}
                _text={{ fontSize: 14 }}
              >
                {t("register")}
              </Button>
              <View style={styles.clickContainer}>
                <Pressable onPress={() => navigation.goBack()}>
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
