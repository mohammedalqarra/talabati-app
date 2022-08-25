import {
  View,
  Image,
  StyleSheet,
  Keyboard,
  FlatList,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Heading, Center, Button } from "native-base";
import { useTranslation } from "react-i18next";
import { firebase } from "../firebase";

const IntroScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const dataRef = firebase.firestore().collection("messages");

  // to add data to firebase
  const addField = () => {
    if (data && data.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: data,
        createdAt: timestamp,
      };
      dataRef
        .add(add)
        .then(() => {
          setData("");
          Keyboard.dismiss();
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  useEffect(() => {
    // to get data from firebase
    var db = firebase.firestore();
    dataRef.onSnapshot((querySnapshot) => {
      const mydata = [];
      querySnapshot.forEach((doc) => {
        const { data, title } = doc.data();
        mydata.push({
          id: doc.id,
          data,
          title,
        });
        setData(mydata);
      });
    });
    // var db = firebase.firestore();
    // var docRef = db.collection("messages");
    // const output = {};

    // docRef
    //   .limit(50)
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.docs.map(function (documentSnapshot) {
    //       return (output[documentSnapshot.data] = documentSnapshot.data());
    //     });
    //     setData({ dataSource: Object.entries(output) });
    //     console.log("datasource:", data);
    //   });
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
              <Text>{item.data}</Text>
            </View>
          )}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <View style={styles.headerContainer}>
          <Heading style={styles.heading} fontFamily={"Tajawal_500Medium"}>
            {t("login")}
          </Heading>
        </View>

        <View>
          <Center style={styles.box} height={150}>
            <Image
              source={require("../images/logo.png")}
              style={styles.logo}
              resizeMode={"contain"}
            />
            <Button
              onPress={() => navigation.navigate("Login")}
              style={styles.btn}
              width={250}
              fontFamily={"Tajawal_500Medium"}
              height={50}
              borderRadius={10}
            >
              {t("loginasauser")}
            </Button>
          </Center>
          <Center style={styles.box} marginTop={10}>
            <Image
              source={require("../images/logo.png")}
              style={styles.logo}
              resizeMode={"contain"}
            />
            <Button
              onPress={() => navigation.navigate("MerchantAuth")}
              style={styles.btn2}
              _text={{ color: "black" }}
              width={250}
              height={50}
              fontFamily={"Tajawal_500Medium"}
              borderRadius={10}
            >
              {t("loginasmerchant")}
            </Button>
          </Center>
        </View>

        <Image
          style={styles.lastImg}
          source={require("../images/image-removebg.png")}
        />
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
    marginTop: 50,
    marginBottom: 40,
  },
  heading: {
    textAlign: "center",
    color: "#E56B1F",
  },
  lastImg: {
    display: "flex",
    alignContent: "flex-end",
    marginTop: 20,
  },
  box: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    elevation: 20,
    shadowColor: "#52006A",
  },
  btn: {
    backgroundColor: "#E56B1F",
  },
  btn2: {
    backgroundColor: "#F3F3F3",
  },
});
export default IntroScreen;
