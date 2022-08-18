import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import { Text, Pressable, Box, Center } from "native-base";
import Logo1 from "../../images/logo/logo1.png";
import Logo2 from "../../images/logo/logo2.png";
import Logo3 from "../../images/logo/logo3.png";
import Logo4 from "../../images/logo/logo4.png";
import Logo5 from "../../images/logo/logo5.png";
import Logo6 from "../../images/logo/logo6.png";

import { useTranslation } from "react-i18next";
import {
  Api_url,
  guest_orders_api,
  guest_get_merchant,
} from "../../utilites/ApiConstants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Home = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const IsGuest = useSelector((state) => state.auth.IsGuest);
  const dimensions = useWindowDimensions();
  const { t, i18n } = useTranslation();
  const [FlatListData0, setFlatListData0] = useState([]);
  const [FlatListData1, setFlatListData1] = useState([]);
  const [FlatListData2, setFlatListData2] = useState([]);
  // ! start Dummy Data just for testing
  // const [FlatListData0, setFlatListData0] = useState([
  //   {
  //     id: "bd7acbrewea-c1b1-461231c2-aed5-3ad53abb28ba",
  //     photo: "https://dev.talbati.com/storage/media/1/1.png",
  //   },
  //   {
  //     id: "bd7acbrew44ea-c1b1-461231c2-aed5-3ad53abb28ba",
  //     photo: "https://dev.talbati.com/storage/media/2/2.png",
  //   },
  // ]);

  // const [FlatListData1, setFlatListData1] = useState([
  //   {
  //     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  //     title: "سوبر ماركت زلفه",
  //     distance: "1.23",
  //     icon: Logo1,
  //     photo: Logo1,
  //     star: "4.8",
  //   },
  //   {
  //     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
  //     title: "Second Item",
  //     distance: "1.23",
  //     icon: Logo2,
  //     photo: Logo2,
  //     star: "3.2",
  //   },
  //   {
  //     id: "58694a0f-3da1-471f-bd96-145571e29d72",
  //     title: "Third Item",
  //     distance: "1.23",
  //     icon: Logo3,
  //     photo: Logo3,
  //     star: "2.7",
  //   },
  //   {
  //     id: "58694a0f-3da1-471f-bd96-14545431e29d72",
  //     title: "forth Item",
  //     distance: "1.62",
  //     icon: Logo4,
  //     photo: Logo4,
  //     star: "4.5",
  //   },
  //   {
  //     id: "58694a0f-3da1-471f-bd96-1451123e29d72",
  //     title: "fifth Item",
  //     distance: "2.10",
  //     icon: Logo5,
  //     photo: Logo5,
  //     star: "6.3",
  //   },
  //   {
  //     id: "58694a0f-3da1-471f-bd96-145adase29d72",
  //     title: "sixth Item",
  //     distance: "1.96",
  //     icon: Logo6,
  //     photo: Logo6,
  //     star: "5.2",
  //   },
  // ]);

  // const [FlatListData2, setFlatListData2] = useState([
  //   {
  //     id: "213123123123",
  //     title: "سوبر ماركت زلفه",
  //     photo: Logo1,
  //   },
  //   {
  //     id: "432453242344",
  //     title: "Second Item",
  //     photo: Logo2,
  //   },
  //   {
  //     id: "4324234234",
  //     title: "Third Item",
  //     photo: Logo3,
  //   },
  //   {
  //     id: "654645543534",
  //     title: "forth Item",
  //     photo: Logo4,
  //   },
  //   {
  //     id: "54353467y",
  //     title: "fifth Item",
  //     photo: Logo5,
  //   },
  //   {
  //     id: "4325266",
  //     title: "sixth Item",
  //     photo: Logo6,
  //   },
  // ]);
  //! end of dummy Data

  const RefresingData = async () => {
    setLoading(true);
    const url = Api_url + guest_orders_api;
    axios
      .get(url)
      .then((res) => {
        if (res && res.status == 200) {
          setLoading(false);
          console.log(res.data.data);
          setFlatListData0(res.data.data);
        }
      })
      .then(() => {
        console.log("flatlist is ", FlatListData0);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  };

  const getFamousMerchant = async (num) => {
    const url = Api_url + guest_get_merchant + `?itemsPerPage=${num}`;
    axios
      .get(url)
      .then((res) => {
        if (res && res.status == 200) {
          console.log(res.data.data);
          setFlatListData1(res.data.data);
        }
      })
      // .then(() => {
      //   console.log("flatlist 1 is ", FlatListData0);
      // })
      .catch((err) => {
        setError(err.response.data.message);
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
      getFamousMerchant(4);
      getAllMerchant(6);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {loading == true ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <View>
          <View style={styles.firstText}>
            <Text
              style={styles.txt}
              color={"#555555"}
              fontSize={15}
              fontFamily={"Tajawal_500Medium"}
            >
              {t("Offers")}
            </Text>
          </View>
          <View>
            <FlatList
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              height={80}
              style={styles.FirstImgContainer}
              horizontal
              keyExtractor={(item) => item.id}
              data={FlatListData0}
              renderItem={({ item }) => (
                <View>
                  <Image
                    source={{ uri: item.avatar }}
                    resizeMode={"contain"}
                    style={styles.bannerImg}
                  />
                </View>
              )}
            />
          </View>
          <View style={styles.secondText}>
            <Pressable onPress={() => navigation.navigate("Merchants")}>
              <Text
                style={styles.txt}
                color={"#555555"}
                fontSize={15}
                fontFamily={"Tajawal_500Medium"}
              >
                {t("showAll")}
              </Text>
            </Pressable>
            <Text
              style={styles.txt}
              color={"#555555"}
              fontSize={15}
              fontFamily={"Tajawal_500Medium"}
            >
              {t("famousMerchant")}
            </Text>
          </View>
          <FlatList
            data={FlatListData1}
            renderItem={({ item }) => (
              <Pressable
                marginHorizontal={10}
                onPress={() => console.warn(`you clicked num ${item.name}`)}
              >
                <Box alignItems="center">
                  <Box
                    width={210}
                    rounded="lg"
                    overflow="hidden"
                    borderColor="coolGray.200"
                    borderWidth="1"
                    justifyItems={"center"}
                    height={160}
                  >
                    <Image
                      source={{ uri: item.avatar }}
                      alt={item.name}
                      style={{ marginLeft: 50, height: 150 }}
                    />
                    <Center
                      backgroundColor={"rgba(0,0,0,0.5)"}
                      _text={{
                        color: "#FFFFFF",
                      }}
                      position="absolute"
                      bottom="0"
                      width={"100%"}
                      height={"40%"}
                      flexDirection={"row"}
                      justifyItems={"center"}
                    >
                      <View style={styles.FlatListContainerUnder}>
                        <View style={styles.FlatListContainerUnder1}>
                          {/* <Image
                            style={styles.star}
                            source={require("../../images/star.png")}
                          /> */}
                          <Text style={styles.txt} color={"#FFFFFF"}>
                            {item.name}
                          </Text>
                        </View>
                        <View style={styles.FlatListContainerUnder2}>
                          {i18n.language === "ar" && (
                            <Text color={"#FFFFFF"} style={styles.txt}>
                              {item.name_ar}
                            </Text>
                          )}
                          {i18n.language === "en" && (
                            <Text color={"#FFFFFF"} style={styles.txt}>
                              {item.name_en}
                            </Text>
                          )}
                          {/* <Text style={styles.txt} color={"#FFFFFF"}>
                            {item.distance} {t("km")}
                          </Text> */}
                        </View>
                      </View>
                    </Center>
                  </Box>
                </Box>
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
            horizontal
          />
          <View style={styles.thirdText}>
            <Pressable onPress={() => navigation.navigate("Merchants")}>
              <Text color={"#555555"} fontSize={15} style={styles.txt}>
                {t("showAll")}
              </Text>
            </Pressable>
            <Text color={"#555555"} fontSize={15} style={styles.txt}>
              {t("Merchant")}
            </Text>
          </View>
          <FlatList
            data={FlatListData2}
            renderItem={({ item }) => (
              <Pressable
                marginHorizontal={10}
                onPress={() => console.warn(`you clicked num ${item.title}`)}
              >
                <Box alignItems="center">
                  <Box
                    width={150}
                    rounded="lg"
                    overflow="hidden"
                    borderColor="coolGray.200"
                    borderWidth="1"
                    justifyItems={"center"}
                    height={160}
                  >
                    <Image
                      source={{ uri: item.avatar }}
                      alt={item.name}
                      style={{ marginLeft: 20, height: 110, marginTop: 5 }}
                    />
                    <View style={styles.line}></View>
                    <Center
                      _text={{
                        color: "#FFFFFF",
                      }}
                      position="absolute"
                      bottom="0"
                      width={"100%"}
                      height={"40%"}
                      flexDirection={"row"}
                      justifyItems={"center"}
                    >
                      <View style={styles.FlatListContainerUnder3}>
                        {i18n.language === "ar" && (
                          <Text style={styles.txt}>{item.name_ar}</Text>
                        )}
                        {i18n.language === "en" && (
                          <Text style={styles.txt}>{item.name_en}</Text>
                        )}
                      </View>
                    </Center>
                  </Box>
                </Box>
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
            horizontal
          />
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF9F9",
    flex: 1,
  },
  firstText: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: 20,
    marginVertical: 10,
    fontFamily: "Tajawal_500Medium",
  },
  FirstImgContainer: {
    marginTop: 10,
    height: 150,
  },
  bannerImg: {
    marginHorizontal: 35,
    width: 350,
    height: 150,
    marginBottom: 60,
  },
  secondText: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 20,
    fontFamily: "Tajawal_500Medium",
  },
  FlatListContainerUnder: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  FlatListContainerUnder2: {
    marginLeft: 20,
  },
  FlatListContainerUnder1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    marginRight: 25,
    alignItems: "center",
  },
  star: {
    marginRight: 5,
  },
  thirdText: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  line: {
    marginVertical: 25,
    height: 1,
    backgroundColor: "#e6e6e6",
  },
  FlatListContainerUnder3: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
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

export default Home;
