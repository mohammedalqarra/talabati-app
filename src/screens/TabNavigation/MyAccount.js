import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { handlelogOut } from "../../features/auth/authSlice";
import axios from "axios";
import { check_token, Api_url } from "../../utilites/ApiConstants";
import { storeData, RemoveData } from "../../features/dataSlice";
import { Modal, Button } from "native-base";

const MyAccount = ({ navigation }) => {
  const IsGuest = useSelector((state) => state.auth.IsGuest);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const RenderItems = () => {
    const token = useSelector((state) => state.auth.data.token);

    // The Data
    const data = useSelector((state) => state.data.data);
    const { name, email, mobile } = data;

    useEffect(() => {
      if (IsGuest == false) {
        navigation.addListener("focus", () => {
          RefresingData(token);
        });
      } else {
        return "";
      }
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
        .catch((err) => {
          setError(err.response.data.message);
          setLoading(false);
        });
    };

    return (
      <>
        <View>
          <View style={styles.Imgwrapper}>
            <Image
              style={styles.Imgwrapperimg}
              source={require("../../images/profile-placeholder.png")}
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
                source={require("../../images/phonealt.png")}
              />
              <Text>{mobile}</Text>
            </View>
          </View>
          {loading == true ? (
            <View>
              <ActivityIndicator />
            </View>
          ) : (
            <View style={styles.pressablesacontainer}>
              <Pressable
                style={styles.singlePress}
                onPress={() => navigation.navigate("AccountSettings")}
              >
                <Image source={require("../../images/left-arrow1.png")} />
                <View style={styles.singlePressContainer}>
                  <Text style={styles.txt}>{t("accountsettings")}</Text>
                  <Image
                    source={require("../../images/Iconawesome-user-alt.png")}
                  />
                </View>
              </Pressable>
              {/* second */}
              <Pressable
                style={styles.singlePress}
                onPress={() => navigation.navigate("LangSettings")}
              >
                <Image source={require("../../images/left-arrow1.png")} />

                <View style={styles.singlePressContainer}>
                  <Text style={styles.txt}>{t("langsettings")}</Text>
                  <Image
                    source={require("../../images/Iconmaterial-language.png")}
                  />
                </View>
              </Pressable>
              {/* second */}
              <Pressable
                style={styles.singlePress}
                onPress={() => navigation.navigate("ChangePasswordss")}
              >
                <Image source={require("../../images/left-arrow1.png")} />

                <View style={styles.singlePressContainer}>
                  <Text style={styles.txt}>{t("editpassword")}</Text>
                  <Image source={require("../../images/padlock.png")} />
                </View>
              </Pressable>
              {/* third */}
              <Pressable
                style={styles.singlePress}
                onPress={() => navigation.navigate("MyAdresses")}
              >
                <Image source={require("../../images/left-arrow1.png")} />

                <View style={styles.singlePressContainer}>
                  <Text style={styles.txt}>{t("myadresses")}</Text>
                  <Image source={require("../../images/map.png")} />
                </View>
              </Pressable>
              {/* 4th */}
              <Pressable
                style={styles.singlePress}
                onPress={() => navigation.navigate("RatingApp")}
              >
                <Image source={require("../../images/left-arrow1.png")} />

                <View style={styles.singlePressContainer}>
                  <Text style={styles.txt}>{t("rateapp")}</Text>
                  <Image
                    source={require("../../images/Iconawesome-star-half-alt.png")}
                  />
                </View>
              </Pressable>
              {/* 5th */}
              <Pressable
                style={styles.singlePress}
                onPress={() => navigation.navigate("Notifications")}
              >
                <Image source={require("../../images/left-arrow1.png")} />

                <View style={styles.singlePressContainer}>
                  <Text style={styles.txt}>{t("notifications")}</Text>
                  <Image
                    source={require("../../images/Iconmaterial-notifications-active.png")}
                  />
                </View>
              </Pressable>
              {/* 6th */}
              <Pressable
                style={styles.singlePress}
                onPress={() => navigation.navigate("UsingConditions")}
              >
                <Image source={require("../../images/left-arrow1.png")} />

                <View style={styles.singlePressContainer}>
                  <Text style={styles.txt}>{t("usingterms")}</Text>
                  <Image source={require("../../images/to-do-list.png")} />
                </View>
              </Pressable>
              {/* 7th */}
              <Pressable
                style={styles.singlePress}
                onPress={() => navigation.navigate("PrivacySettings")}
              >
                <Image source={require("../../images/left-arrow1.png")} />

                <View style={styles.singlePressContainer}>
                  <Text style={styles.txt}>{t("privacyterms")}</Text>
                  <Image source={require("../../images/shield.png")} />
                </View>
              </Pressable>
              {/* 8th */}
              <Pressable
                style={styles.singlePress}
                onPress={() => navigation.navigate("AboutApp")}
              >
                <Image source={require("../../images/left-arrow1.png")} />

                <View style={styles.singlePressContainer}>
                  <Text style={styles.txt}>{t("aboutapp")}</Text>
                  <Image source={require("../../images/information.png")} />
                </View>
              </Pressable>
              {/* 9th */}
              <Pressable onPress={() => dispatch(handlelogOut())}>
                <View style={styles.singlePressContainerlast}>
                  <Text style={styles.txt}>{t("signout")}</Text>
                  <Image source={require("../../images/logout.png")} />
                </View>
              </Pressable>
            </View>
          )}
        </View>
      </>
    );
  };

  const RenderGuestItems = () => {
    return (
      <>
        {/* start of modal */}
        <Modal isOpen={IsGuest}>
          <Modal.Content maxWidth="400px">
            <Modal.Body>
              <View style={styles.centerizedCol}>
                <Text>Please Log In </Text>
                <Button
                  onPress={() => dispatch(handlelogOut())}
                  style={styles.firstBut}
                  size="sm"
                  backgroundColor={"#E56B1F"}
                  marginTop={10}
                  _text={{ fontSize: 14 }}
                >
                  {t("log")}
                </Button>
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>
        {/* end of modal */}
      </>
    );
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
      {IsGuest == true ? (
        <RenderGuestItems />
      ) : (
        <>
          <RenderItems />
        </>
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
