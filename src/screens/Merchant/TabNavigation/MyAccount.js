import { StyleSheet, Text, View, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { handlelogOut } from '../../../features/auth/authSlice'
import axios from 'axios'
import { check_token, Api_url } from '../../../utilites/ApiConstants'
import { storeData, RemoveData } from '../../../features/dataSlice'

const MyAccount = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.data.token);
  // const name = useSelector((state) => state.auth.data.data.name);
  // const mobile = useSelector((state) => state.auth.data.data.mobile);
  // const email = useSelector((state) => state.auth.data.data.email);

  const data = useSelector((state) => state.data.data);
  const { name, email, mobile } = data;

  useEffect(() => {
    navigation.addListener("focus", () => {
      RefresingData(token);
    });
    navigation.addListener("blur", () => {
      dispatch(RemoveData());
    });
  }, []);

  const RefresingData = async (token) => {
    setLoading(true);
    const url = Api_url + check_token;
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
          dispatch(storeData(res.data.data));
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
    <ScrollView style={styles.container}>
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
      <View style={styles.Imgwrapper}>
        <Image
          style={styles.Imgwrapperimg}
          source={require("../../../images/profile-placeholder.png")}
        />
        <Text
          style={{
            color: "#E56B1F",
            fontSize: 16,
            fontFamily: "Tajawal_500Medium",
          }}
        >
          {name}
        </Text>
        <View style={styles.smallcontainer}>
          <Image
            style={styles.smallcontainerimg}
            source={require("../../../images/phonealt.png")}
          />
          <Text>{mobile}</Text>
        </View>
      </View>
      {/* first */}
      {loading == true ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={styles.pressablesacontainer}>
          <Pressable
            style={styles.singlePress}
            onPress={() => navigation.navigate("EditingAccounts")}
          >
            <Image source={require("../../../images/left-arrow1.png")} />
            <View style={styles.singlePressContainer}>
              <Text style={styles.txt}>{t("editaccount")}</Text>
              <Image
                source={require("../../../images/Iconawesome-user-alt.png")}
              />
            </View>
          </Pressable>
          {/* second */}
          <Pressable
            style={styles.singlePress}
            onPress={() => navigation.navigate("LangSettings")}
          >
            <Image source={require("../../../images/left-arrow1.png")} />

            <View style={styles.singlePressContainer}>
              <Text style={styles.txt}>{t("langsettings")}</Text>
              <Image
                source={require("../../../images/Iconmaterial-language.png")}
              />
            </View>
          </Pressable>
          {/* second */}
          <Pressable
            style={styles.singlePress}
            onPress={() => navigation.navigate("ChangePasswords")}
          >
            <Image source={require("../../../images/left-arrow1.png")} />

            <View style={styles.singlePressContainer}>
              <Text style={styles.txt}>{t("editpassword")}</Text>
              <Image source={require("../../../images/padlock.png")} />
            </View>
          </Pressable>
          {/* third */}
          <Pressable
            style={styles.singlePress}
            onPress={() => navigation.navigate("NumberOfProductss")}
          >
            <Image source={require("../../../images/left-arrow1.png")} />

            <View style={styles.singlePressContainer}>
              <Text style={styles.txt}>{t("noofmerchant")}</Text>
              <Image source={require("../../../images/shopping-bag(1).png")} />
            </View>
          </Pressable>
          {/* 4th */}
          <Pressable
            style={styles.singlePress}
            onPress={() => navigation.navigate("Offerss")}
          >
            <Image source={require("../../../images/left-arrow1.png")} />

            <View style={styles.singlePressContainer}>
              <Text style={styles.txt}>{t("Offers")}</Text>
              <Image source={require("../../../images/price-tag.png")} />
            </View>
          </Pressable>
          {/* 5th */}
          <Pressable
            style={styles.singlePress}
            onPress={() => navigation.navigate("UsingConditions")}
          >
            <Image source={require("../../../images/left-arrow1.png")} />

            <View style={styles.singlePressContainer}>
              <Text style={styles.txt}>{t("usingterms")}</Text>
              <Image source={require("../../../images/to-do-list.png")} />
            </View>
          </Pressable>
          {/* 6th */}
          <Pressable
            style={styles.singlePress}
            onPress={() => navigation.navigate("PrivacySettingss")}
          >
            <Image source={require("../../../images/left-arrow1.png")} />

            <View style={styles.singlePressContainer}>
              <Text style={styles.txt}>{t("privacyterms")}</Text>
              <Image source={require("../../../images/shield.png")} />
            </View>
          </Pressable>
          {/* 7th */}
          <Pressable
            style={styles.singlePress}
            onPress={() => navigation.navigate("RatingApps")}
          >
            <Image source={require("../../../images/left-arrow1.png")} />

            <View style={styles.singlePressContainer}>
              <Text style={styles.txt}>{t("rateapp")}</Text>
              <Image
                source={require("../../../images/Iconawesome-star-half-alt.png")}
              />
            </View>
          </Pressable>
          {/* 8th */}
          <Pressable onPress={() => dispatch(handlelogOut())}>
            <View style={styles.singlePressContainerlast}>
              <Text style={styles.txt}>{t("signout")}</Text>
              <Image source={require("../../../images/logout.png")} />
            </View>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF9F9",
    flex: 1,
  },
  Imgwrapper: {
    display: "flex",
    flexdirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  Imgwrapperimg: {
    width: 96,
    height: 96,
    borderRadius: 15,
    marginBottom: 10,
  },
  pressablesacontainer: {
    marginHorizontal: 15,
  },
  smallcontainer: {
    display: "flex",
    flexDirection: "row",
  },
  smallcontainerimg: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  singlePress: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    padding: 15,
  },
  singlePressContainer: {
    display: "flex",
    flexDirection: "row",
  },
  singlePressContainerlast: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 5,
    padding: 10,
  },
  txt: {
    fontSize: 16,
    fontFamily: "Tajawal_500Medium",
    color: "#555555",
    marginRight: 10,
  },
});
