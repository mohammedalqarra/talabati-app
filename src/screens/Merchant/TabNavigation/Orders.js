import React, { useState } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { Text, Button, Pressable, Box } from "native-base";

import { useTranslation } from "react-i18next";

const Orders = ({ navigation }) => {
  const { t } = useTranslation();
  const [active, setActive] = useState("delevery");
  const [FlatListData, setFlatListData] = useState([
    {
      id: "bd7acbea-c1b1-461231f33dsfci2-aed5-3ad53abb28ba",
      status: "new",
      payerName: "احمد محمد",
      price: 320,
    },
    {
      id: "3ac68afc-c605-48d3-a31ds5ds24f8-fbd91aa97f63",
      status: "new",
      payerName: "احمد محمد",
      price: 320,
    },
    {
      id: "58694a0f-3da1-4742341f-bd496-145571e279d72",
      status: "new",
      payerName: "احمد محمد",
      price: 320,
    },
    {
      id: "58666694a0f-3da1-471f-bd4596-14545431e29d72",
      status: "new",
      payerName: "احمد محمد",
      price: 320,
    },
    {
      id: "58694a20f-3da1-2471f-bd96-1451123e29d72",
      status: "new",
      payerName: "احمد محمد",
      price: 320,
    },
    {
      id: "58694a0f-3da1-477771f-bd396-145ada66se929d72",
      status: "new",
      payerName: "احمد محمد",
      price: 320,
    },
    {
      id: "58694a0f-3da1-477771f-bd396-145ada6622se929d72",
      status: "new",
      payerName: "حمزه احمد",
      price: 320,
    },
  ]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 27,
          borderRadius: 15,
          marginVertical: 10,
          backgroundColor: "#ECECEC",
          padding: 4,
          elevation: 1,
          shadowColor: "#52006A",
        }}
      >
        <Pressable
          onPress={() => setActive("cancel")}
          style={
            active === "cancel" && {
              backgroundColor: "#FFFFFF",
              borderRadius: 15,
            }
          }
        >
          <Text
            style={{
              padding: 15,
              color: "#E56B1F",
              fontSize: 14,
              fontFamily: "Tajawal_500Medium",
              paddingHorizontal: 25,
            }}
          >
            {t("cancel")}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActive("new")}
          style={
            active === "new" && {
              backgroundColor: "#FFFFFF",
              borderRadius: 15,
            }
          }
        >
          <Text
            style={{
              padding: 15,
              color: "#E56B1F",
              fontSize: 14,
              fontFamily: "Tajawal_500Medium",
              paddingHorizontal: 25,
            }}
          >
            {t("new")}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActive("delevery")}
          style={
            active === "delevery" && {
              backgroundColor: "#FFFFFF",
              borderRadius: 15,
            }
          }
        >
          <Text
            style={{
              padding: 15,
              color: "#E56B1F",
              fontSize: 14,
              fontFamily: "Tajawal_500Medium",
              paddingHorizontal: 25,
            }}
          >
            {t("delevried")}
          </Text>
        </Pressable>
      </View>
      <FlatList
        style={styles.container}
        data={FlatListData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Box
            padding={5}
            backgroundColor={"#FFFFFF"}
            margin={2}
            width={"90%"}
            marginLeft={6}
            height={165}
            borderRadius={15}
            elevation={5}
            shadowColor={"#52006A"}
          >
            <View style={styles.mainrow}>
              <View style={styles.secrow}>
                <View>
                  {/* if new */}
                  {item.status === "new" && (
                    <View style={styles.firsthead}>
                      <Text
                        style={{
                          color: "#74DA7F",
                          fontFamily: "Tajawal_500Medium",
                          fontSize: 14,
                        }}
                      >
                        {t("delevried")}
                      </Text>
                      <Image
                        source={require("../../../images/check.png")}
                        style={styles.firstheadimg}
                      />
                    </View>
                  )}
                </View>
                <View style={styles.line}></View>
                <View style={styles.rowhead}>
                  <Text style={styles.txt}>{item.payerName}</Text>
                  <View style={styles.rowhead}>
                    <Text style={styles.txt3}>{t("merchantname")}</Text>
                    <Image
                      source={require("../../../images/Iconawesome-user.png")}
                    />
                  </View>
                </View>
                <View style={styles.rowhead}>
                  <Text style={styles.txt}>
                    {item.price} {t("rial")}
                  </Text>
                  <View style={styles.rowhead}>
                    <Text style={styles.txt3}>{t("price")}</Text>
                    <Image
                      source={require("../../../images/Iconawesome-money-bill.png")}
                      style={{ marginTop: 5 }}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.rightImg}>
                <Image source={require("../../../images/logo/logo4.png")} />
              </View>
            </View>
            <View style={styles.btncontainer}>
              <Button
                onPress={() => navigation.navigate("MerchantOrderDetails")}
                style={styles.firstBut}
                size="sm"
                width={"100%"}
                height={10}
                leftIcon={
                  <Image
                    source={require("../../../images/down-filled-triangular-arrow.png")}
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
                  color: "#E56B1F",
                  fontFamily: "Tajawal_400Regular",
                }}
              >
                {t("orderdetails")}
              </Button>
            </View>
          </Box>
        )}
      />
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
    color: "#A8A8A8",
    fontFamily: "Tajawal_500Medium",
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
    marginRight: 25,
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
    width: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 40,
    marginLeft: 5,
  },
  rowhead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txt2: {
    fontFamily: "Tajawal_400Regular",
    fontSize: 14,
    color: "#555555",
  },
  txt3: {
    fontFamily: "Tajawal_400Regular",
    fontSize: 14,
    color: "#555555",
    marginRight: 5,
  },
});

export default Orders;
