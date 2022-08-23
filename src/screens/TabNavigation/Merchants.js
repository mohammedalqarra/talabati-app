import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  Text,
  Input,
  Icon,
  Stack,
  Button,
  Pressable,
  Heading,
  VStack,
  Box,
  AspectRatio,
  Center,
  Divider,
  Modal,
} from "native-base";
// // dummy images
// import SmallLogo1 from "../../images/smallLogo/1.png";
// import SmallLogo2 from "../../images/smallLogo/2.png";
// import SmallLogo3 from "../../images/smallLogo/3.png";
// import SmallLogo4 from "../../images/smallLogo/4.png";
// import SmallLogo5 from "../../images/smallLogo/5.png";
// import SmallLogo6 from "../../images/smallLogo/6.png";

// import Logo1 from "../../images/logo/logo1.png";
// import Logo2 from "../../images/logo/logo2.png";
// import Logo3 from "../../images/logo/logo3.png";
// import Logo4 from "../../images/logo/logo4.png";
// import Logo5 from "../../images/logo/logo5.png";
// import Logo6 from "../../images/logo/logo6.png";
import { useTranslation } from "react-i18next";
import {
  Api_url,
  guest_categories_api,
  guest_get_merchant,
} from "../../utilites/ApiConstants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Merchants = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [FlatListData1, setFlatListData1] = useState([]);
  const [FlatListData2, setFlatListData2] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const IsGuest = useSelector((state) => state.auth.IsGuest);
  //! start Dummy Data just for testing
  //  const [FlatListData1, setFlatListData1] = useState([
  //     {
  //       id: "bd7acbea-c1b1-461231c2-aed5-3ad53abb28ba",
  //       title: "بقاله",
  //       photo: SmallLogo1,
  //     },
  //     {
  //       id: "3ac68afc-c605-48d3-a3124f8-fbd91aa97f63",
  //       title: "صيدليات",
  //       photo: SmallLogo2,
  //     },
  //     {
  //       id: "58694a0f-3da1-471f-bd496-145571e29d72",
  //       title: "مطاعم",
  //       photo: SmallLogo3,
  //     },
  //     {
  //       id: "58694a0f-3da1-471f-bd596-14545431e29d72",
  //       title: "مشروبات",
  //       photo: SmallLogo4,
  //     },
  //     {
  //       id: "58694a0f-3da1-2471f-bd96-1451123e29d72",
  //       title: "حلويات",
  //       photo: SmallLogo5,
  //     },
  //     {
  //       id: "58694a0f-3da1-471f-bd96-145ada66se29d72",
  //       title: "تمور",
  //       photo: SmallLogo6,
  //     },
  //   ]);

  // const [FlatListData2, setFlatListData2] = useState([
  //   {
  //     id: "213123123123",
  //     title: "سوبر ماركت زلفه",
  //     photo: Logo1,
  //   },
  //   {
  //     id: "432453242344",
  //     title: "سوبر ماركت مشهور",
  //     photo: Logo2,
  //   },
  //   {
  //     id: "4324234234",
  //     title: "سوبر ماركت مشهور",
  //     photo: Logo3,
  //   },
  //   {
  //     id: "654645543534",
  //     title: "سوبر ماركت مشهور",
  //     photo: Logo4,
  //   },
  //   {
  //     id: "54353467y",
  //     title: "سوبر ماركت مشهور",
  //     photo: Logo5,
  //   },
  //   {
  //     id: "4325266",
  //     title: "سوبر ماركت مشهور",
  //     photo: Logo6,
  //   },
  // ]);
  //! end of Dummy Data

  const RefresingData = async () => {
    setLoading(true);
    const url = Api_url + guest_categories_api;
    axios
      .get(url)
      .then((res) => {
        if (res && res.status == 200) {
          setLoading(false);
          console.log(res.data.data);
          setFlatListData1(res.data.data);
        }
      })
      // .then(() => {
      //   console.log("flatlist is ", FlatListData1);
      // })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  };

  const getAllMerchant = async (num) => {
    const url = Api_url + guest_get_merchant + `?itemsPerPage=${num}`;
    axios
      .get(url)
      .then((res) => {
        if (res && res.status == 200) {
          console.log(res.data.data);
          setFlatListData2(res.data.data);
        }
      })
      // .then(() => {
      //   console.log("flatlist 2 is ", FlatListData0);
      // })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      RefresingData();
      getAllMerchant(8);
    });
  }, []);

  const { height } = useWindowDimensions();
  return (
    <View style={styles.container}>
      {loading == true ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView>
          <View>
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
            <FlatList
              height={80}
              style={{}}
              horizontal
              keyExtractor={(item) => item.id}
              data={FlatListData1}
              renderItem={({ item }) => (
                <Pressable marginHorizontal={10}>
                  <Box>
                    <Box width={75} height={75} alignItems="center">
                      <Image
                        style={styles.smalllogo}
                        source={{ uri: item.avatar }}
                        alt="image"
                        resizeMode="contain"
                      />

                      <Center width={"100%"} height={"40%"}>
                        <View style={styles.FlatListContainerUnder3}>
                          {i18n.language === "ar" && (
                            <Text style={styles.txt1}>{item.name_ar}</Text>
                          )}
                          {i18n.language === "en" && (
                            <Text style={styles.txt1}>{item.name_en}</Text>
                          )}
                        </View>
                      </Center>
                    </Box>
                  </Box>
                </Pressable>
              )}
            />
          </View>
          {/* second flatlist */}
          <View
            style={{
              marginTop: 10,
            }}
          >
            <FlatList
              data={FlatListData2}
              keyExtractor={(item) => item.id}
              numColumns={2}
              style={{
                marginBottom: 90,
              }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate("ShopDetail", {
                      avatar: item.avatar,
                      name: item.name,
                      mobile: item.mobile,
                      email: item.email,
                      id: item.id,
                    })
                  }
                >
                  <Box
                    padding={8}
                    backgroundColor={"#FFFFFF"}
                    margin={2}
                    width={185}
                    height={240}
                  >
                    <Image
                      source={{ uri: item.avatar }}
                      style={{ height: 100 }}
                    />
                    <View style={styles.line}></View>
                    {i18n.language === "ar" && (
                      <Text style={styles.txt}>{item.name_ar}</Text>
                    )}
                    {i18n.language === "en" && (
                      <Text style={styles.txt}>{item.name_en}</Text>
                    )}
                  </Box>
                </Pressable>
              )}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF9F9",
    flex: 1,
  },
  smalllogo: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  FlatListContainerUnder3: {
    display: "flex",
    justifyContent: "center",
    marginTop: 5,
  },
  card: {
    justifyContent: "center",
    width: "100%",
    marginVertical: 10,
    flex: 1,
  },
  line: {
    marginVertical: 25,
    height: 1,
    backgroundColor: "#e6e6e6",
  },
  txt: {
    fontSize: 14,
    color: "#E56B1F",
    fontFamily: "Tajawal_500Medium",
  },
  txt1: {
    color: "#555555",
    fontSize: 14,
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

export default Merchants;
