import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Button, Input, Modal } from "native-base";
import { useTranslation } from "react-i18next";
import { Api_url, create_order } from "../../utilites/ApiConstants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { handlelogOut } from "../../features/auth/authSlice";

const ContinueShop = ({ route, navigation }) => {
  const { region, textAreaValue, name, mobile, email, id } = route.params;
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const { t } = useTranslation();
  const IsGuest = useSelector((state) => state.auth.IsGuest);
  const phone = useSelector((state) => state.auth.data.mobile);
  const handleChange = (text) => setAddress(text);

  const NewOrder = () => {
    const url = Api_url + create_order;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const formData = new FormData();
    formData.append("name", name);
    formData.append("mobile", mobile);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("provider_id", id);
    formData.append("latitude", region.latitude);
    formData.append("longitude", region.longitude);
    formData.append("address", address);
    formData.append("order_details", textAreaValue);

    setShowModal(true);
    axios
      .post(
        url,
        {
          username,
          name_ar,
          name_en,
        },
        config
      )
      .then((res) => {
        if (res && res.status == 200) {
          setShowModal(false);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setShowModal(false);
      });
  };

  const RenderGuestItems = () => {
    return (
      <>
        {/* start of modal */}
        <Modal isOpen={IsGuest}>
          <Modal.Content maxWidth="400px">
            <Modal.Body>
              <View style={styles.centerizedCol}>
                <Text>Please Log In </Text>
                <Button
                  onPress={() => dispatch(handlelogOut())}
                  style={styles.firstBut}
                  size="sm"
                  backgroundColor={"#E56B1F"}
                  marginTop={10}
                  _text={{ fontSize: 14 }}
                >
                  {t("log")}
                </Button>
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>
        {/* end of modal */}
      </>
    );
  };

  const RenderItems = () => {
    const token = useSelector((state) => state.auth.data.token);
    const makeRequest = () => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("mobile", mobile);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("provider_id", id);
      formData.append("latitude", region.latitude);
      formData.append("longitude", region.longitude);
      formData.append("address", address);
      formData.append("order_details", textAreaValue);

      console.log(formData);
      // console.log("region", region);
      // console.log("textAreaValue", textAreaValue);
      // console.log("address", address);
      // console.log("token", token);
    };

    return (
      <>
        <View
          style={{
            marginTop: 70,
          }}
        >
          <View>
            {/* header */}
            <View>
              <View style={styles.upperlogo}>
                <Image
                  source={require("../../images/continue.png")}
                  width={120}
                  height={150}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
          <View style={styles.lastsec}>
            <Text
              style={{
                marginVertical: 20,
                fontSize: 16,
                color: "#555555",
                fontFamily: "Tajawal_500Medium",
              }}
            >
              {t("delevrydata")}
            </Text>
            <Input
              w={{
                base: "75%",
                md: "25%",
              }}
              value={address}
              onChangeText={handleChange}
              InputLeftElement={
                <Pressable onPress={() => setShowModal(true)}>
                  <Image
                    source={require("../../images/down-filled-triangular-arrow.png")}
                  />
                </Pressable>
              }
              InputRightElement={
                <Pressable>
                  <Image
                    source={require("../../images/Icon material-location-on.png")}
                  />
                </Pressable>
              }
              placeholder={t("develeryadress")}
            />
            {/* {<Text>{address}</Text>} */}
            <Button
              onPress={() => navigation.navigate("GetLocation")}
              style={styles.firstBut}
              size="sm"
              width={"75%"}
              marginVertical={20}
              height={10}
              backgroundColor={"#F3F3F3"}
              borderRadius={10}
              _text={{ fontSize: 14 }}
            >
              <View style={styles.centerized}>
                <Image source={require("../../images/mapmarket.png")} />
                <Text
                  style={{ marginLeft: 10, fontFamily: "Tajawal_500Medium" }}
                >
                  {t("adressonmap")}
                </Text>
              </View>
            </Button>
          </View>
          <Button
            onPressOut={() => makeRequest()}
            // onPress={() => navigation.navigate("KeepShop")}
            style={styles.firstBut}
            size="sm"
            width={"85%"}
            height={10}
            marginLeft={"7%"}
            backgroundColor={"#E56B1F"}
            borderRadius={10}
          >
            <Text style={styles.txt}>{t("sendrequest")}</Text>
          </Button>
        </View>
      </>
    );
  };
  return (
    <View style={styles.container}>
      {IsGuest == true ? <RenderGuestItems /> : <RenderItems />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF9F9",
    flex: 1,
  },

  upperlogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginHorizontal: 15,
    height: 200,
  },

  lastsec: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 35,
    backgroundColor: "white",
    marginHorizontal: 15,
    borderRadius: 25,
    elevation: 20,
    shadowColor: "#52006A",
  },
  centerizedCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  centerized: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  firstBut: {
    fontFamily: "Tajawal_500Medium",
  },
  txt: {
    fontSize: 14,
    color: "white",
    fontFamily: "Tajawal_500Medium",
  },
});

export default ContinueShop;
