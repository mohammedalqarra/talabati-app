import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { TextArea, Button, Modal, Input } from 'native-base'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { Api_url, get_certain_order } from '../../../../utilites/ApiConstants'
import { useSelector } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ConfirmOrder = ({ route, navigation }) => {
  const { id } = route.params;
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.data.token);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("ملاحظات");
  const [textAreaValue1, setTextAreaValue1] = useState("سبب الالغاء");
  const demoValueControlledTextArea = (e) => {
    setTextAreaValue(e.currentTarget.value);
  };
  const demoValueControlledTextArea1 = (e) => {
    setTextAreaValue1(e.currentTarget.value);
  };

  const acceptData = () => {
    const url = Api_url + get_certain_order + `${id}` + "/Accept";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(
        url,
        {
          textAreaValue,
          textAreaValue1,
        },
        config
      )
      .then((res) => {
        if (res && res.status == 200) {
          setShowModal(true);
          // console.log(res.data.data);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const cancelData = () => {
    const url = Api_url + get_certain_order + `${id}` + "/Cancel";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(url, config)
      .then((res) => {
        if (res && res.status == 200) {
          setShowModal1(false);
          // console.log(res.data.data);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {/* error */}
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
                Check Your Connection and retry to log in{" "}
              </Text>
            </View>
          )}
        </View>
      </View>
      {/* start of modal */}
      {/* modal number 1 */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <View style={styles.centerizedCol}>
              <Image source={require("../../../../images/okay.png")} />
              <Text
                style={{
                  marginTop: 13,
                  fontSize: 16,
                  color: "#E56B1F",
                  fontFamily: "Tajawal_500Medium",
                }}
              >
                {t("applicationsend")}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#E56B1F",
                  fontFamily: "Tajawal_500Medium",
                }}
              >
                {t("applicationwaiting")}
              </Text>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      {/* end of modal */}
      {/* start of modal */}
      {/* modal number 2 */}
      <Modal isOpen={showModal1} onClose={() => setShowModal1(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <View style={styles.centerizedCol}>
              <Image source={require("../../../../images/sad.png")} />
              <TextArea
                value={textAreaValue1}
                onChange={demoValueControlledTextArea1}
                w="100%"
                maxW="400"
                h={95}
                marginLeft={5}
                marginTop={5}
                placeholderTextColor={"#ECECEC"}
                color={"#ECECEC"}
                style={styles.txtfamily}
                backgroundColor={"white"}
              />
              <Button
                onPress={() => {
                  cancelData();
                }}
                style={styles.firstBut}
                size="sm"
                width={"40%"}
                height={10}
                marginTop={3}
                marginLeft={"7%"}
                backgroundColor={"#E56B1F"}
                borderRadius={25}
              >
                <Text style={styles.txt}>{t("done")}</Text>
              </Button>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      {/* end of modal */}
      <View style={styles.firstsec}>
        <Input
          w={{
            base: "90%",
          }}
          marginLeft={5}
          backgroundColor={"#FFFFFF"}
          style={styles.txtfamily}
          placeholderTextColor={"#ECECEC"}
          placeholder={t("totalcost")}
        />
        <TextArea
          value={textAreaValue}
          onChange={demoValueControlledTextArea}
          w="90%"
          maxW="400"
          h={95}
          marginLeft={5}
          marginTop={5}
          placeholderTextColor={"#ECECEC"}
          color={"#ECECEC"}
          style={styles.txtfamily}
          backgroundColor={"white"}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 40,
          marginVertical: 5,
        }}
      >
        <Pressable
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#ECECEC",
            borderRadius: 30,
            padding: 10,
          }}
        >
          <Text
            style={{
              color: "#E56B1F",
              fontSize: 16,
              fontFamily: "Tajawal_500Medium",
            }}
          >
            Camera
          </Text>
          <Image
            source={require("../../../../images/Icononic-ios-camera.png")}
            style={{
              marginTop: 4,
              marginLeft: 5,
            }}
          />
        </Pressable>
        <Pressable>
          <Text
            style={{
              color: "#E56B1F",
              fontSize: 16,
              fontFamily: "Tajawal_500Medium",
              marginTop: 9,
            }}
          >
            {t("fatora")}
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          height: 150,
          width: 150,
          borderWidth: 2,
          marginLeft: 130,
          borderColor: "#E56B1F",
          borderRadius: 15,
          marginVertical: 5,
          marginBottom: 30,
        }}
      ></View>
      <Button
        onPress={() => {
          acceptData();
        }}
        style={styles.firstBut}
        size="sm"
        width={"85%"}
        height={10}
        marginLeft={"7%"}
        backgroundColor={"#E56B1F"}
        borderRadius={10}
      >
        <Text style={styles.txt}>{t("send")}</Text>
      </Button>
      <Button
        onPress={() => {
          setShowModal1(true);
        }}
        style={styles.firstBut}
        size="sm"
        width={"85%"}
        marginTop={5}
        height={10}
        marginLeft={"7%"}
        backgroundColor={"#ffffff"}
        borderWidth={1}
        borderColor={"#EF1D1D"}
        borderRadius={10}
      >
        <Text style={styles.txt1}>{t("canceling")}</Text>
      </Button>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF9F9",
    flex: 1,
  },

  upperlogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginHorizontal: 15,
    height: 200,
  },
  centerizedCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  centerized: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  firstBut: {
    fontFamily: "Tajawal_500Medium",
  },
  txt: {
    fontSize: 14,
    color: "white",
    fontFamily: "Tajawal_500Medium",
  },
  txt1: {
    color: "#E56B1F",
    fontFamily: "Tajawal_500Medium",
    fontSize: 14,
  },
  firstsec: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 20,
    marginTop: 20,
  },
  txtfamily: {
    fontSize: 14,
    fontFamily: "Tajawal_500Medium",
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

export default ConfirmOrder;
