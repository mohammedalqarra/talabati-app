import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Text, Button, Box, Modal } from "native-base";
// importing photos
import SmallLogo4 from "../../images/smallLogo/4.png";
// importing small icons
import Checked from "../../images/check.png";
import Cancel from "../../images/cancel.png";
import Waiting from "../../images/waiting.png";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Api_url, get_my_orders } from "../../utilites/ApiConstants";
import { useDispatch, useSelector } from "react-redux";
import { handlelogOut } from "../../features/auth/authSlice";

const Orders = ({ navigation }) => {
  const IsGuest = useSelector((state) => state.auth.IsGuest);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [FlatListData1, setFlatListData1] = useState([]);

  //! dummy data for testing
  // const [FlatListData, setFlatListData] = useState([
  //   {
  //     id: "bd7acbea-c1b1-461231fdsfci2-aed5-3ad53abb28ba",
  //     status: "done",
  //     title: "هايبر توفير",
  //     photo: SmallLogo4,
  //   },
  //   {
  //     id: "3ac68afc-c605-48d3-a31dsds24f8-fbd91aa97f63",
  //     status: "canceled",
  //     title: "هايبر توفير",
  //     photo: SmallLogo4,
  //   },
  //   {
  //     id: "58694a0f-3da1-4742341f-bd496-145571e29d72",
  //     status: "waiting",
  //     title: "هايبر توفير",
  //     photo: SmallLogo4,
  //   },
  //   {
  //     id: "58666694a0f-3da1-471f-bd596-14545431e29d72",
  //     status: "canceled",
  //     title: "هايبر توفير",
  //     photo: SmallLogo4,
  //   },
  //   {
  //     id: "58694a0f-3da1-2471f-bd96-1451123e29d72",
  //     status: "done",
  //     title: "هايبر توفير",
  //     photo: SmallLogo4,
  //   },
  //   {
  //     id: "58694a0f-3da1-477771f-bd96-145ada66se929d72",
  //     status: "canceled",
  //     title: "هايبر توفير",
  //     photo: SmallLogo4,
  //   },
  // ]);
  //! end of testing dummy data

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

    const getData = () => {
      const url = Api_url + get_my_orders;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      setShowModal(true);
      axios
        .get(url, config)
        .then((res) => {
          if (res && res.status == 200) {
            setShowModal(false);
            console.log(res.data.data);
            setFlatListData1(res.data.data);
          }
        })
        .catch((err) => {
          setShowModal(false);
        });
    };

    useEffect(() => {
      if (IsGuest == false) {
        navigation.addListener("focus", () => {
          getData();
        });
      } else {
        return "";
      }
    }, [navigation]);
    return (
      <>
        {/* start of Loading modal */}
        <Modal isOpen={showModal}>
          <Modal.Content maxWidth="400px">
            <Modal.Body>
              <View style={styles.centerizedCol}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>
        {/* end of Loading modal */}
        <FlatList
          style={styles.container}
          data={FlatListData1}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Box
              padding={5}
              backgroundColor={"#FFFFFF"}
              margin={2}
              width={"90%"}
              marginLeft={6}
              height={140}
              borderRadius={15}
            >
              <View style={styles.mainrow}>
                <View style={styles.secrow}>
                  <View>
                    {/* if checked */}
                    {item.order_status_id === 2 && (
                      <View style={styles.firsthead}>
                        <Text
                          style={{
                            color: "#74DA7F",
                            fontFamily: "Tajawal_500Medium",
                            fontSize: 14,
                          }}
                        >
                          {t("deleveried")}
                        </Text>
                        <Image source={Checked} style={styles.firstheadimg} />
                      </View>
                    )}
                    {/* if canceled */}

                    {item.order_status_id === 3 && (
                      <View style={styles.firsthead}>
                        <Text
                          style={{
                            color: "#E24D4C",
                            fontFamily: "Tajawal_500Medium",
                            fontSize: 14,
                          }}
                        >
                          {t("canceled")}
                        </Text>
                        <Image source={Cancel} style={styles.firstheadimg} />
                      </View>
                    )}
                    {/* if waiting */}
                    {item.order_status_id === 1 && (
                      <View style={styles.firsthead}>
                        <Text
                          style={{
                            color: "#FF9756",
                            fontFamily: "Tajawal_500Medium",
                            fontSize: 14,
                          }}
                        >
                          {t("waitingmerchants")}
                        </Text>
                        <Image source={Waiting} style={styles.firstheadimg} />
                      </View>
                    )}
                  </View>
                  <View style={styles.line}></View>
                  <View>
                    <Text style={styles.txt}>{item.name}</Text>
                  </View>
                </View>
                {/* <View style={styles.rightImg}>
                  <Image source={item.photo} />
                </View> */}
              </View>
              <View style={styles.btncontainer}>
                <Button
                  onPress={() =>
                    navigation.navigate("OrderDetails", {
                      id: item.id,
                    })
                  }
                  style={styles.firstBut}
                  size="sm"
                  width={"50%"}
                  height={10}
                  leftIcon={
                    <Image
                      source={require("../../images/down-filled-triangular-arrow-black.png")}
                    />
                  }
                  marginVertical={5}
                  backgroundColor={"#0000000A"}
                  borderRadius={10}
                  borderColor={"#F3F3F3"}
                  fontFamily={"Tajawal_400Regular"}
                  borderWidth={1}
                  _text={{
                    fontSize: 14,
                    color: "#555555",
                    fontFamily: "Tajawal_400Regular",
                  }}
                >
                  {t("orderdetails")}
                </Button>
                <Button
                  style={styles.firstBut}
                  size="sm"
                  width={"50%"}
                  leftIcon={
                    <Image
                      source={require("../../images/clockwise-circular-arrow.png")}
                    />
                  }
                  onPress={() => console.warn("Re Order")}
                  height={10}
                  marginVertical={5}
                  backgroundColor={"#fffff"}
                  borderRadius={10}
                  borderColor={"#F3F3F3"}
                  fontFamily={"Tajawal_400Regular"}
                  borderWidth={1}
                  _text={{
                    fontSize: 14,
                    color: "#555555",
                    fontFamily: "Tajawal_400Regular",
                  }}
                >
                  {t("reorder")}
                </Button>
              </View>
            </Box>
          )}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      {IsGuest == true ? (
        <RenderGuestItems />
      ) : (
        <>
          <RenderItems />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF9F9",
    flex: 1,
    width: "100%",
  },
  line: {
    marginVertical: 8,
    height: 2,
    backgroundColor: "#e6e6e6",
    marginBottom: 5,
  },
  txt: {
    fontSize: 14,
    color: "#E56B1F",
    fontFamily: "Tajawal_500Medium",
    marginRight: 5,
  },
  mainrow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  secrow: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    width: "80%",
    marginVertical: 5,
  },
  firsthead: {
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 25,
  },
  firstheadimg: {
    width: 20,
    height: 20,
    marginTop: 5,
    marginLeft: 10,
  },
  btncontainer: {
    display: "flex",
    flexDirection: "row",
    marginRight: 45,
    backgroundColor: "white",
    width: "100%",
    borderRadius: 15,
  },
  rightImg: {
    backgroundColor: "#F3F3F3",
    width: 65,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 65,
    marginLeft: 5,
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

export default Orders;
