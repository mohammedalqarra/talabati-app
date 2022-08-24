import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Button, Input, Modal, TextArea } from "native-base";
import { useTranslation } from "react-i18next";
import { Api_url, create_order } from "../../utilites/ApiConstants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { handlelogOut } from "../../features/auth/authSlice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ContinueShop = ({ route, navigation }) => {
  const { region, textAreaValue, name, mobile, email, id } = route.params;
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const show = () => {
    console.log("name", region.name);
    console.log("mobile", region.mobile);
    console.log("email", region.email);
    // console.log("phone", phone);
    console.log("region", region);
    console.log("id", region.id);
    console.log("textAreaValue", textAreaValue);
  };

  const { t } = useTranslation();
  const IsGuest = useSelector((state) => state.auth.IsGuest);

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

  const RenderItems = ({ region, textAreaValue }) => {
    const token = useSelector((state) => state.auth.data.token);
    const phone = useSelector((state) => state.auth.data.data.mobile);
    const demoValueControlledTextArea = (e) => {
      setAddress(e.currentTarget.value);
    };
    const makeRequest = () => {
      const url = Api_url + create_order;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const name = region.name;
      const mobile = region.mobile;
      const email = region.email;
      const latitude = region.latitude;
      const provider_id = region.id;
      const longitude = region.longitude;
      const order_details = textAreaValue;

      console.log(order_details);
      setShowModal(true);
      axios
        .post(
          url,
          {
            name,
            mobile,
            email,
            phone,
            provider_id,
            latitude,
            longitude,
            address,
            order_details,
          },
          config
        )
        .then((res) => {
          if (res && res.status == 200) {
            setShowModal(false);
            setShowModal2(true);
            navigation.navigate("home");
          }
        })
        .catch((err) => {
          setError(err.response.data.message);
          setShowModal(false);
        });
    };

    return (
      <>
        <KeyboardAwareScrollView
          style={{
            marginTop: 70,
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
          {/* start of modal2 */}
          <Modal isOpen={showModal2}>
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
                    {t("orderconfirmed")}
                  </Text>
                </View>
              </Modal.Body>
            </Modal.Content>
          </Modal>
          {/* end of modal2 */}
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
            {/* <TextArea
              value={address}
              onChange={demoValueControlledTextArea}
              w="75%"
              maxW="400"
              h={10}
              borderRadius={15}
              marginTop={5}
              placeholderTextColor={"#E6E6E6"}
              style={styles.txtfamily}
              backgroundColor={"white"}
              placeholder={t("develeryadress")}
            /> */}
            <Input
              w={{
                base: "75%",
                md: "25%",
              }}
              value={address}
              onChangeText={(text) => setAddress(text)}
              // InputLeftElement={
              //   <Pressable onPress={() => setShowModal(true)}>
              //     <Image
              //       source={require("../../images/down-filled-triangular-arrow.png")}
              //     />
              //   </Pressable>
              // }
              // InputRightElement={
              //   <Pressable>
              //     <Image
              //       source={require("../../images/Icon material-location-on.png")}
              //     />
              //   </Pressable>
              // }
              placeholder={t("develeryadress")}
            />
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
            onPress={() => makeRequest()}
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
        </KeyboardAwareScrollView>
      </>
    );
  };
  return (
    <View style={styles.container}>
      {IsGuest == true ? (
        <RenderGuestItems />
      ) : (
        <RenderItems
          name={name}
          region={region}
          textAreaValue={textAreaValue}
          mobile={mobile}
          email={email}
          id={id}
        />
      )}
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

export default ContinueShop;
