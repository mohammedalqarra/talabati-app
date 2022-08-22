import {
  View,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";
import React, { useState } from "react";
import { Input, Stack, Button } from "native-base";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import {
  Api_url,
  change_password_api,
} from "../../../../utilites/ApiConstants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { Modal } from "native-base";
const ChangePassword = ({ navigation }) => {
  const token = useSelector((state) => state.auth.data.token);
  const [country, setCountry] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [confirmtxt, setConfirmtxt] = useState("");
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const { height } = useWindowDimensions();

  const handleChangePassword = async (password, password_confirmation) => {
    const url = Api_url + change_password_api;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setShowModal(true);
    axios
      .post(
        url,
        {
          password,
          password_confirmation,
        },
        config
      )
      .then((res) => {
        if (res && res.status == 200) {
          setShowModal(false);
          setShowModal2(true);
          setConfirmtxt(res.data.message);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setShowModal(false);
      });
  };

  return (
    <KeyboardAwareScrollView>
      <Formik
        initialValues={{ newpassword: "", confirmNewPassword: "" }}
        onSubmit={async (values) =>
          handleChangePassword(values.newpassword, values.confirmNewPassword)
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
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
                      Check Your Connection and retry to log in{" "}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            {/* start of modal2 */}
            <Modal isOpen={showModal}>
              <Modal.Content maxWidth="400px">
                <Modal.Body>
                  <View style={styles.centerizedCol}>
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                </Modal.Body>
              </Modal.Content>
            </Modal>
            {/* end of modal */}
            {/* start of modal */}
            <Modal isOpen={showModal2} onClose={() => setShowModal2(false)}>
              <Modal.Content maxWidth="400px" height="100px">
                <Modal.CloseButton />
                <Modal.Body>
                  <View style={styles.centerizedCol}>
                    <Text style={{ textAlign: "center" }}>{confirmtxt}</Text>
                  </View>
                </Modal.Body>
              </Modal.Content>
            </Modal>
            {/* end of modal */}
            <View style={{ marginTop: 20, flex: 1 }}>
              <Stack space={4} w="100%" alignItems="center">
                <Input
                  w={{
                    base: "75%",
                    md: "25%",
                  }}
                  _text={{
                    color: "#ECECEC",
                  }}
                  height={45}
                  fontFamily={"Tajawal_500Medium"}
                  placeholder={t("newpassword")}
                  backgroundColor={"white"}
                  type={"password"}
                  value={values.newpassword}
                  onChangeText={handleChange("newpassword")}
                  onBlur={handleBlur("newpassword")}
                />
                <Input
                  w={{
                    base: "75%",
                    md: "25%",
                  }}
                  _text={{
                    color: "#ECECEC",
                  }}
                  height={45}
                  type={"password"}
                  fontFamily={"Tajawal_500Medium"}
                  placeholder={t("confirmpassword")}
                  backgroundColor={"white"}
                  value={values.confirmNewPassword}
                  onChangeText={handleChange("confirmNewPassword")}
                  onBlur={handleBlur("confirmNewPassword")}
                />
              </Stack>
              <Button
                onPress={handleSubmit}
                style={styles.firstBut}
                marginTop={25}
                size="sm"
                backgroundColor={"#E56B1F"}
                _text={{ fontSize: 14, fontFamily: "Tajawal_500Medium" }}
              >
                {t("save")}
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 133,
    height: 117,
  },
  headerContainer: {},
  heading: {
    textAlign: "center",
    color: "#E56B1F",
  },
  clickContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
    marginBottom: 25,
  },
  click: {
    color: "#2680EB",
    textDecorationLine: "underline",
  },
  firstBut: {
    fontFamily: "Tajawal_500Medium",
    fontSize: 14,
  },
  secBut: {
    marginTop: 15,
    fontSize: 14,
  },
  txt: {
    color: "#E56B1F",
    fontFamily: "Tajawal_500Medium",
    fontSize: 16,
  },
  txtaround: {
    backgroundColor: "#CCCCCC",
    borderRadius: 15,
    padding: 5,
    marginRight: 140,
  },
  smallcontainer: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    marginVertical: 15,
  },
  txtaround2: {
    backgroundColor: "#CCCCCC",
    borderRadius: 15,
    padding: 5,
    marginRight: 60,
  },
});

export default ChangePassword;
