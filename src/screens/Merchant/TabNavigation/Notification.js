import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Modal } from "native-base";
import axios from "axios";
import { Api_url, get_notification } from "../../../utilites/ApiConstants";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Notifications = ({ navigation }) => {
  const token = useSelector((state) => state.auth.data.token);
  const { t } = useTranslation();
  const [FlatListData, setFlatListData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  //! dummy data for testing

  // const [FlatListData, setFlatListData] = useState([
  //   {
  //     id: "bd7ace3213bea-c1b1-461231c2-aed5-3ad53a3bb28ba",
  //     data: "تم تأكيد الطلب من قبل العميل",
  //     date: "6-4-2022",
  //   },
  //   {
  //     id: "3ac68afc-c605-483214d3-a3124f8-fbd91aa597f63",
  //     data: "تم تأكيد الطلب من قبل العميل",
  //     date: "6-4-2022",
  //   },
  //   {
  //     id: "58694a0f-3da1-471f-b5556-145571e29d72",
  //     data: "تم تأكيد الطلب من قبل العميل",
  //     date: "6-4-2022",
  //   },
  //   {
  //     id: "58694a0f-3da1-1471f-bd5623s96-14545431e29d72",
  //     data: "تم تأكيد الطلب من قبل العميل",
  //     date: "6-4-2022",
  //   },
  //   {
  //     id: "58694a0f-3da1-22b434471f-bd96-1451123e29d72",
  //     data: "تم تأكيد الطلب من قبل العميل",
  //     date: "6-4-2022",
  //   },
  //   {
  //     id: "586194a0f-3da1-471f-bd96-14555667ada66se29d72",
  //     data: "تم تأكيد الطلب من قبل العميل",
  //     date: "6-4-2022",
  //   },
  //   {
  //     id: "586194a0f-3da1-471f-bd96-145223ada66se29d72",
  //     data: "تم تأكيد الطلب من قبل العميل",
  //     date: "6-4-2022",
  //   },
  //   {
  //     id: "5816194a0f-3da1-471f-bd96-145ada1166se29d72",
  //     data: "تم تأكيد الطلب من قبل العميل",
  //     date: "6-4-2022",
  //   },
  //   {
  //     id: "586194a0f-3da1-471f-b555596-145ada66se29d72",
  //     data: "تم تأكيد الطلب من قبل العميل",
  //     date: "6-4-2022",
  //   },
  //   {
  //     id: "5816194a0f-3da1-471f-bd96-145ada116644se29d72",
  //     data: "تم تأكيد الطلب من قبل العميل",
  //     date: "6-4-2022",
  //   },
  //   {
  //     id: "586194a0f-3da1-471f-b555596-14522ada66se29d72",
  //     data: "تم تأكيد الطلب من قبل العميل",
  //     date: "6-4-2022",
  //   },
  // ]);
  //! end of dummy data for testing

  const getData = () => {
    const url = Api_url + get_notification;
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
          setFlatListData(res.data.data);
        }
      })
      .catch((err) => {
        setShowModal(false);
      });
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getData();
    });
  }, [navigation]);

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
      {FlatListData.length === 0 ? (
        <View style={styles.errmessage}>
          <Text style={styles.errmessagetxt}>{t("nothing")}</Text>
        </View>
      ) : (
        <FlatList
          height={100}
          data={FlatListData}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.navigate("MerchantNotificationDetails")}
            >
              <Text
                style={{
                  fontFamily: "Tajawal_400Regular",
                  fontSize: 14,
                  color: "#E1E1E1",
                  marginLeft: 20,
                  marginTop: 10,
                }}
              >
                {item.date}
              </Text>
              <View style={styles.mainone}>
                <View>
                  <Text style={styles.mainonetxt}>{item.data}</Text>
                </View>
                <View>
                  <Image
                    source={require("../../../images/Iconmaterial-notifications-active.png")}
                    width={15}
                    style={{ marginTop: 5 }}
                  />
                </View>
              </View>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF9F9",
    flex: 1,
  },
  mainone: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 30,
    marginHorizontal: 25,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#DCDCDC",
  },
  mainonetxt: {
    fontSize: 16,
    fontFamily: "Tajawal_500Medium",
    color: "#555555",
    marginRight: 15,
    lineHeight: 25,
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
