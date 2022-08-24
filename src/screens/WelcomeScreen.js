import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Heading } from "native-base";
import { useTranslation } from "react-i18next";
// to get data from firebase
import { database } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
const WelcomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  // start firebase
  // const onSend = async () => {
  //   await addDoc(collection(database, "messages"), newItem);
  // };

  const fetchdata = async () => {
    const response = database.collection("messages");
    const data = await response.get();
    data.docs.forEach((item) => {
      setData([...data, item.data()]);
    });
    console.log(data);
  };
  useEffect(() => {
    // fetchdata();
  }, []);

  // useEffect(() => {
  //   const collectionRef = collection(database, "messages");
  //   const q = query(collectionRef, orderBy("createdAt"));
  //   const unsuscribe = onSnapshot(q, (qureysnapshot) => {
  //     setData(
  //       qureysnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         title: doc.data().title,
  //         data: doc.data().data,
  //       }))
  //     );
  //   });
  //   console.log(data);
  //   return unsuscribe;
  // }, []);
  // end firebase
  // // to get data from firebase

  // const dataRef = firebase.firestore().collection("messages");
  // useEffect(async () => {
  //   dataRef.onSnapshot((querySnapshot) => {
  //     const sdata = [];
  //     querySnapshot.forEach((doc) => {
  //       const { title, data } = doc.data();
  //       sdata.push({
  //         id: doc.id,
  //         title,
  //         data,
  //       });
  //     });
  //     setData(sdata);
  //   });
  // }, []);
  // // finish firebase
  return (
    <View style={styles.container}>
      {/* {data &&
        data.map((d) => {
          return (
            <View className="blog-container">
              <Text>{d.title}</Text>
              <Text>{d.body}</Text>
            </View>
          );
        })} */}
      <View
        style={{
          alignItems: "center",
          marginTop: 120,
        }}
      >
        <Image
          source={require("../images/logo.png")}
          style={styles.logo}
          resizeMode={"contain"}
        />
        <View>
          <View style={styles.headerContainer}>
            <Heading style={styles.heading} fontFamily={"Tajawal_500Medium"}>
              {t("signup")}
            </Heading>
          </View>
          <Button
            onPress={() => navigation.navigate("IntroScreen")}
            colorScheme="red"
            size="md"
            width={350}
            borderRadius={10}
            height={50}
          >
            <View style={styles.uniBtn}>
              <Image
                style={styles.btn1Logo}
                source={require("../images/google.png")}
              />
              <Text style={styles.btn1Text}>{t("loginwithgoogle")}</Text>
            </View>
          </Button>
          <View style={styles.divider}></View>
          <Button
            onPress={() => navigation.navigate("IntroScreen")}
            size="md"
            width={350}
            borderRadius={10}
            height={50}
            backgroundColor={"#000000"}
          >
            <View style={styles.uniBtn}>
              <Image
                style={styles.btn1Logo}
                source={require("../images/apple.png")}
              />
              <Text style={styles.btn1Text}>{t("loginwithapple")}</Text>
            </View>
          </Button>

          <View style={styles.line}></View>
          <Button
            onPress={() => navigation.navigate("IntroScreen")}
            size="md"
            width={350}
            borderRadius={10}
            height={50}
            backgroundColor={"#05D605"}
          >
            <View style={styles.uniBtn}>
              <Image
                style={styles.btn1Logo}
                source={require("../images/mobile-alt.png")}
              />
              <Text style={styles.btn1Text}>{t("loginwithphonenumber")}</Text>
            </View>
          </Button>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FBF9F9",
    flex: 1,
  },
  logo: {
    width: 133,
    height: 117,
  },
  headerContainer: {
    marginVertical: 20,
    marginBottom: 40,
  },
  heading: {
    textAlign: "center",
    color: "#E56B1F",
  },
  divider: {
    marginTop: 20,
  },
  clickContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 25,
  },
  click1: {
    color: "#E56B1F",
  },
  click2: {
    color: "#2680EB",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  uniBtn: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  line: {
    marginVertical: 25,
    height: 1,
    backgroundColor: "#e6e6e6",
  },
  btn1Text: {
    color: "white",
  },
  btn1Logo: {
    marginHorizontal: 15,
  },
});

export default WelcomeScreen;
