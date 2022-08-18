import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
  Platform,
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
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [blobavatar, setBlobavatar] = useState({});
  const [avatarphoto, setAvatarphoto] = useState("");
  const [blobStorefront, setBlobStorefront] = useState("");
  const [storephoto, setStorephoto] = useState("");
  const [blobCommercialLicense, setBlobCommercialLicense] = useState("");
  const [commercialphoto, setCommercialphoto] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [roleId, setRoleId] = useState("provider");
  const [gender, setGender] = useState("male");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sucessModal, setSucessModal] = useState(false);
  const { t } = useTranslation();
  const { height } = useWindowDimensions();
  const formData = new FormData();
  // for picking images
  // pick avatar
  //? try one
  // const pickAvatar = async () => {
  //   const { uri } = await DocumentPicker.getDocumentAsync();
  //   console.log("pickerResponse", uri);
  //   const { uri: avatar } = result;
  //   const filename = avatar.split("/").pop();
  //   const match = /\.(\w+)$/.exec(filename);
  //   const type = match ? `image/${match[1]}` : "image";
  //   const blobFile = { uri: avatar, name: filename, type };
  //   setBlobavatar(blobFile);
  //   setAvatarphoto(fetchResponse.url);
  //   console.log(blobavatar);
  //   console.log(avatarphoto);
  // };
  //? try two
  // const pickAvatar = async () => {
  //   const { uri } = await DocumentPicker.getDocumentAsync({
  //     copyToCacheDirectory: false,
  //     type: "*/*",
  //   });
  //   console.log("pickerResponse", uri);
  //   try {
  //     const fetchResponse = await fetch(uri);
  //     console.log("fetchResponse", fetchResponse);
  //     const blob = await fetchResponse.blob();
  //     const filename = uri.split("/").pop();
  //     const match = /\.(\w+)$/.exec(filename);
  //     const type = match ? `image/${match[1]}` : "image";
  //     setBlobavatar({ uri, name: filename, type });
  //     setAvatarphoto(fetchResponse.url);
  //     console.log(blobavatar);
  //   } catch (error) {
  //     console.log("ERR: " + error.message);
  //   }
  // };
  //? try three

  const pickAvatar = async () => {
    const { uri } = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: "*/*",
    });
    try {
      const response = await fetch(uri);
      console.log(response);
      setAvatarphoto(response.url);
      const avatarblob = await response.blob();
      console.log(avatarblob);
      formData.append("avatarBlob", response.url);
    } catch (error) {
      console.log("ERR: " + error.message);
    }
  };

  //! origional

  // const pickAvatar = async () => {
  //   const { type, uri } = await DocumentPicker.getDocumentAsync({
  //     copyToCacheDirectory: false,
  //     type: "*/*",
  //   });

  //   if (type === "cancel") {
  //     return;
  //   }
  //   console.log("pickerResponse", uri);

  //   try {
  //     const fetchResponse = await fetch(uri);
  //     console.log("fetchResponse", fetchResponse);
  //     const blob = await fetchResponse.blob();
  //     setBlobavatar({ uri, name: "media", type: `image/${type}` });
  //     setAvatarphoto(fetchResponse.url);
  //     console.log(blobavatar);
  //   } catch (error) {
  //     console.log("ERR: " + error.message);
  //   }
  // };
  // pick store
  const pickStore = async () => {
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
      setBlobStorefront({ uri, name: "media", type: `image/${type}` });
      setStorephoto(fetchResponse.url);
      console.log(blobavatar);
    } catch (error) {
      console.log("ERR: " + error.message);
    }
  };
  // pickcommercial
  const pickCommercial = async () => {
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
      setBlobCommercialLicense({ uri, name: "media", type: `image/${type}` });
      setCommercialphoto(fetchResponse.url);
      console.log(blobavatar);
    } catch (error) {
      console.log("ERR: " + error.message);
    }
  };

  //////////////////////////////////////////

  // const HandleSellerRegister = () => {
  //   console.log(username);
  // };

  const HandleSellerRegister = async () => {
    const url = Api_url + signup_api;
    // const formData = new FormData();
    // const avatarb = await avatarphoto.blob();
    // console.log(avatarphoto);
    // console.log(avatarb);

    // formData.append("username", username);
    // formData.append("name", name);
    // formData.append("mobile", mobile);
    // formData.append("password", password);
    // formData.append("password_confirmation", passwordConfirmation);
    // // formData.append("avatarBlob", blobavatar, "avatarBlob");
    // // formData.append("storeBlob", blobStorefront, "storeBlob");
    // // formData.append("commercialBlob", blobCommercialLicense, "commercialBlob");
    // formData.append("organization_name", organizationName);
    // formData.append("role_id", roleId);
    console.log(formData);
    setShowModal(true);
    axios
      .post(url, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res && res.status == 200) {
          setSucessModal(true);
          console.log(formData);
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
        {/* start of error */}
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
        {/* end of error */}
        <View>
          <View style={styles.headerContainer}>
            <Heading style={styles.heading} fontFamily={"Tajawal_500Medium"}>
              {t("newaccount1")}
            </Heading>
          </View>
          <Stack space={4} w="100%" alignItems="center">
            <Pressable onPress={() => pickAvatar()}>
              <Avatar
                width={100}
                height={100}
                backgroundColor={"white"}
                borderWidth={1}
                borderColor={"#E56B1F"}
              >
                {avatarphoto && (
                  <Image
                    source={{ uri: avatarphoto }}
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
              value={username}
              onChangeText={(text) => setUsername(text)}
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
              value={name}
              onChangeText={(text) => setName(text)}
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
              value={mobile}
              onChangeText={(text) => setMobile(text)}
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
              value={password}
              onChangeText={(text) => setPassword(text)}
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
              value={passwordConfirmation}
              onChangeText={(text) => setPasswordConfirmation(text)}
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
              value={organizationName}
              onChangeText={(text) => setOrganizationName(text)}
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
                <Pressable onPress={() => pickStore()}>
                  <Text style={styles.txt}>choose file</Text>
                </Pressable>
              </View>
              <Text style={styles.txt}>{t("merchantlogoo")}</Text>
            </View>
            {storephoto && (
              <Image
                source={{ uri: storephoto }}
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
                <Pressable onPress={() => pickCommercial()}>
                  <Text style={styles.txt}>choose file</Text>
                </Pressable>
              </View>
              <Text style={styles.txt}>{t("picoflicencemerchant")}</Text>
            </View>
            {commercialphoto && (
              <Image
                source={{ uri: commercialphoto }}
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
            onPress={HandleSellerRegister}
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
