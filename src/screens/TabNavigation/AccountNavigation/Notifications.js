import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Api_url, notifications } from '../../../utilites/ApiConstants'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Notifications = ({ navigation }) => {
  const { t } = useTranslation();
  const [FlatListData, setFlatListData] = useState([
    // dummydata
    {
      id: "bd7ace3213bea-c1b1-461231c2-aed5-3ad53abb28ba",
      data: "تم الرد علي طلبك من قبل متجر هايبر السلام, بانتظار التأكيد",
      date: "6-4-2022",
    },
    {
      id: "3ac68afc-c605-483214d3-a3124f8-fbd91aa97f63",
      data: "عروض كبيرة جدا علي كل المنتجات في قسم المشروبات,الحق العرض",
      date: "6-4-2022",
    },
    {
      id: "58694a0f-3da1-471f-bd45556-145571e29d72",
      data: "تم الرد علي طلبك من قبل متجر هايبر السلام, بانتظار التأكيد",
      date: "6-4-2022",
    },
    {
      id: "58694a0f-3da1-471f-bd5623s96-14545431e29d72",
      data: "تم الغاء الطلب من قبل التاجر لعدم توفر المنتجات بالمتجر حاليا",
      date: "6-4-2022",
    },
    {
      id: "58694a0f-3da1-22b34471f-bd96-1451123e29d72",
      data: "عروض كبيرة جدا علي كل المنتجات في قسم المشروبات,الحق العرض",
      date: "6-4-2022",
    },
    {
      id: "586194a0f-3da1-471f-bd96-1455667ada66se29d72",
      data: "تم الرد علي طلبك من قبل متجر هايبر السلام, بانتظار التأكيد",
      date: "6-4-2022",
    },
    {
      id: "586194a0f-3da1-471f-bd96-145223ada66se29d72",
      data: "عروض كبيرة جدا علي كل المنتجات في قسم المشروبات,الحق العرض",
      date: "6-4-2022",
    },
    {
      id: "586194a0f-3da1-471f-bd96-145ada1166se29d72",
      data: "تم الرد علي طلبك من قبل متجر هايبر السلام, بانتظار التأكيد",
      date: "6-4-2022",
    },
    {
      id: "586194a0f-3da1-471f-b555596-145ada66se29d72",
      data: "عروض كبيرة جدا علي كل المنتجات في قسم المشروبات,الحق العرض",
      date: "6-4-2022",
    },
  ]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.data.token);

  useEffect(() => {
    navigation.addListener("focus", () => {
      RefresinNotifications(token);
    });
    // navigation.addListener("blur", () => {
    //   dispatch(RemoveData());
    // });
  }, []);

  const RefresinNotifications = async (token) => {
    setLoading(true);
    const url = Api_url + notifications;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res && res.status == 200) {
          // console.log(res.data.data);
          setLoading(false);
        }
      })
      // .then(() => {
      //   const data = useSelector((state) => state.data);
      // })

      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
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
                Check Your Connection and Refresh Your App{" "}
              </Text>
            </View>
          )}
        </View>
      </View>

      {loading == true ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          height={100}
          data={FlatListData}
          renderItem={({ item }) => (
            <View>
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
            </View>
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
    height: 60,
    marginHorizontal: 25,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DCDCDC",
  },
  mainonetxt: {
    fontSize: 18,
    fontFamily: "Tajawal_400Regular",
    color: "#555555",
    marginRight: 15,
    lineHeight: 25,
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
