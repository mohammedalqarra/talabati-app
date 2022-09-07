import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { Button, Modal } from 'native-base'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Api_url, get_certain_order } from '../../../../utilites/ApiConstants'

const NewOrders = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.data.token);
  const { id } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      getData();
    });
  });

  const getData = () => {
    const url = Api_url + get_certain_order + `${id}`;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setShowModal(true);
    axios
      .get(url, config)
      .then((res) => {
        if (res && res.status == 200) {
          setShowModal(false);
          // console.log(res.data.data);
          setData(res.data.data);
        }
      })
      .catch((err) => {
        setShowModal(false);
      });
  };

  //! dummy data for testing

  // const [FlatListData, setFlatListData] = useState([
  //   {
  //     id: "bd7acbea-46c2-aed5-3ad53abb28ba",
  //     name: "بيض",
  //     quantity: "8",
  //   },
  //   {
  //     id: "3ac68afc-c605-48d3-fbd91aa97f63",
  //     name: "لبن",
  //     quantity: "2",
  //   },
  //   {
  //     id: "58694a0f-3da1-bd96-145571e29d72",
  //     name: "بيبسي",
  //     quantity: "4",
  //   },
  //   {
  //     id: "58694a0f-3da1-471f-bd96-1454529d72",
  //     name: "مربي",
  //     quantity: "1",
  //   },
  // ]);

  //! end of dummy data for testing

  return (
    <View style={styles.container}>
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
      <View style={styles.container1}>
        {/* the second */}
        <View style={styles.card}>
          <View style={styles.Header}>
            <Text
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginVertical: 5,
                fontSize: 16,
                color: "#E56B1F",
                fontFamily: "Tajawal_700Bold",
              }}
            >
              {t("merchantdetails")}
            </Text>
          </View>
          <View style={styles.line}></View>
          <View>
            <View style={styles.smallcard2}>
              <Text
                style={{
                  color: "#A8A8A8",
                  fontSize: 14,
                  fontFamily: "Tajawal_400Regular",
                }}
              >
                {data.name}
              </Text>
              <View style={styles.smallhead}>
                <Text
                  style={{
                    color: "#555555",
                    fontSize: 14,
                    fontFamily: "Tajawal_500Medium",
                  }}
                >
                  {t("name")}
                </Text>
                <Image
                  source={require("../../../../images/Iconawesome-user.png")}
                  style={{ marginLeft: 5 }}
                />
              </View>
            </View>
            <View style={styles.smallcard2}>
              <Text
                style={{
                  color: "#A8A8A8",
                  fontSize: 14,
                  fontFamily: "Tajawal_500Medium",
                }}
              >
                {data.address}
              </Text>
              <View style={styles.smallhead}>
                <Text
                  style={{
                    color: "#555555",
                    fontSize: 14,
                    fontFamily: "Tajawal_500Medium",
                  }}
                >
                  {t("address")}
                </Text>
                <Image
                  source={require("../../../../images/Iconmaterial-locationCopy.png")}
                  style={{ marginLeft: 5 }}
                />
              </View>
            </View>
            <View style={styles.smallcard2}>
              <Text
                style={{
                  color: "#A8A8A8",
                  fontSize: 14,
                  fontFamily: "Tajawal_500Medium",
                }}
              >
                {data.value}
              </Text>
              <View style={styles.smallhead}>
                <Text
                  style={{
                    color: "#555555",
                    fontSize: 14,
                    fontFamily: "Tajawal_500Medium",
                  }}
                >
                  {t("totalcost")}
                </Text>
                <Image
                  source={require("../../../../images/Iconawesome-phone-alt.png")}
                  style={{ marginLeft: 5 }}
                />
              </View>
            </View>
          </View>
        </View>
        {/* the second card */}
        <View style={styles.card}>
          <View style={styles.Header}>
            <Text
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginVertical: 5,
                fontSize: 16,
                color: "#E56B1F",
                fontFamily: "Tajawal_700Bold",
              }}
            >
              {t("orderscontain")}
            </Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.CardPart}>
            <Text style={{ marginRight: 15, fontFamily: "Tajawal_500Medium" }}>
              {data.order_details}
            </Text>
            <Text style={styles.dot}>{"\u2022"}</Text>
          </View>
        </View>
        <Button
          onPress={() =>
            navigation.navigate("HomeConfirmOrdersMerchant", {
              id,
            })
          }
          style={styles.firstBut}
          size="sm"
          width={"85%"}
          height={10}
          marginVertical={5}
          marginLeft={"8%"}
          backgroundColor={"#E56B1F"}
          borderRadius={10}
          _text={{ fontSize: 14, fontFamily: "Tajawal_500Medium" }}
        >
          {t("confirm")}
        </Button>
        <Button
          onPress={() => navigation.goBack()}
          style={styles.firstBut}
          size="sm"
          width={"85%"}
          height={10}
          marginVertical={5}
          marginLeft={"8%"}
          backgroundColor={"#fffff"}
          borderRadius={10}
          borderColor={"#EF1D1D"}
          borderWidth={1}
          _text={{
            fontSize: 14,
            color: "#EF1D1D",
            fontFamily: "Tajawal_500Medium",
          }}
        >
          {t("cancel")}
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF9F9",
    flex: 1,
  },
  container1: {
    marginTop: 15,
  },
  firstone: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 25,
    marginVertical: 15,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "90%",
    marginHorizontal: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
    //start of  shadow
    elevation: 5,
    shadowColor: "#52006A",
    //end of shadow
  },
  Header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    fontSize: 16,
    color: "#E56B1F",
  },
  line: {
    marginTop: 2,
    marginBottom: 5,
    height: 2,
    backgroundColor: "#e6e6e6",
  },
  CardPart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 15,
    marginVertical: 5,
  },
  dot: {
    fontSize: 18,
  },
  smallcard2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 5,
  },
  smallhead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default NewOrders;
