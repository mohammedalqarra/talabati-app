import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Button, Modal } from "native-base";
import { useTranslation } from "react-i18next";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const KeepShop = ({ route, navigation }) => {
  const { data } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const { t } = useTranslation();

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {/* start of modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <View style={styles.centerizedCol}>
              <Image source={require("../../images/cancelled.png")} />
              <Text
                style={{
                  marginTop: 13,
                  fontSize: 16,
                  color: "#EF1D1D",
                }}
              >
                {t("ordercanceled")}
              </Text>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      {/* end of modal */}

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
              fontFamily: "Tajawal_400Regular",
            }}
          >
            {t("orderscontain")}
          </Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.CardPart}>
          <Text style={{ marginRight: 15, fontFamily: "Tajawal_400Regular" }}>
            {data.data.order_details}
          </Text>
          <Text style={styles.dot}>{"\u2022"}</Text>
        </View>
        {/* <View style={styles.CardPart}>
          <Text style={{ marginRight: 15, fontFamily: "Tajawal_400Regular" }}>
            2 لبن
          </Text>
          <Text style={styles.dot}>{"\u2022"}</Text>
        </View>
        <View style={styles.CardPart}>
          <Text style={{ marginRight: 15, fontFamily: "Tajawal_400Regular" }}>
            4 بيبسي
          </Text>
          <Text style={styles.dot}>{"\u2022"}</Text>
        </View>
        <View style={styles.CardPart}>
          <Text style={{ marginRight: 15, fontFamily: "Tajawal_400Regular" }}>
            1 مربي
          </Text>
          <Text style={styles.dot}>{"\u2022"}</Text>
        </View> */}
      </View>
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
              fontFamily: "Tajawal_400Regular",
            }}
          >
            {t("orderscontain")}
          </Text>
        </View>
        <View>
          <View style={styles.smallcard2}>
            <Text
              style={{
                color: "#555555",
                fontSize: 14,
                fontFamily: "Tajawal_400Regular",
              }}
            >
              {data.data.value} {t("rial")}
            </Text>
            <Text
              style={{
                color: "#A8A8A8",
                fontSize: 14,
                fontFamily: "Tajawal_400Regular",
              }}
            >
              {t("theprice")}
            </Text>
          </View>
          <View style={styles.smallcard2}>
            <Text
              style={{
                color: "#555555",
                fontSize: 14,
                fontFamily: "Tajawal_400Regular",
              }}
            >
              {data.data.value} {t("rial")}
            </Text>
            <Text
              style={{
                color: "#A8A8A8",
                fontSize: 14,
                fontFamily: "Tajawal_400Regular",
              }}
            >
              {t("paid")}
            </Text>
          </View>
          <View style={styles.smallcard2}>
            <Text
              style={{
                color: "#555555",
                fontSize: 14,
                fontFamily: "Tajawal_400Regular",
              }}
            >
              {data.data.value} {t("rial")}
            </Text>
            <Text
              style={{
                color: "#A8A8A8",
                fontSize: 14,
                fontFamily: "Tajawal_400Regular",
              }}
            >
              {t("totalcost")}
            </Text>
          </View>
        </View>
      </View>
      {/* last img */}
      <View style={styles.lastimg}>
        <Image
          source={require("../../images/ticket.png")}
          height={30}
          width={30}
        />
      </View>
      <Button
        onPress={() => navigation.navigate("paymentStack")}
        style={styles.firstBut}
        size="sm"
        width={"85%"}
        height={10}
        marginVertical={5}
        marginLeft={"8%"}
        backgroundColor={"#E56B1F"}
        borderRadius={10}
        _text={{ fontSize: 14 }}
      >
        {t("paid")}
      </Button>
      <Button
        onPress={() => setShowModal(true)}
        style={styles.firstBut}
        size="sm"
        width={"85%"}
        height={10}
        marginVertical={5}
        marginLeft={"8%"}
        backgroundColor={"#fffff"}
        borderRadius={10}
        borderColor={"#EF1D1D"}
        fontFamily={"Tajawal_400Regular"}
        borderWidth={1}
        _text={{
          fontSize: 14,
          color: "#EF1D1D",
          fontFamily: "Tajawal_400Regular",
        }}
      >
        {t("cancell")}
      </Button>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF9F9",
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "90%",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    marginHorizontal: 25,
    paddingHorizontal: 15,
    marginVertical: 5,
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
  lastimg: {
    marginVertical: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginHorizontal: 90,
    borderRadius: 20,
    borderColor: "#E56B1F",
  },
  centerizedCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

export default KeepShop;
