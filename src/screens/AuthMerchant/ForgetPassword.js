//finished
import { View, Image, StyleSheet, ActivityIndicator, Text } from "react-native";
import React, { useState } from "react";
import { Input, Stack, Button, Heading } from "native-base";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { Api_url, forget_pass_api } from "../../utilites/ApiConstants";
import axios from "axios";
import { Modal } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ForgetPassword = () => {
  const { t } = useTranslation();
  const [number, setNumber] = useState();
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSucessModal, setShowSucessModal] = useState(false);
  const HandleForgetPassword = async (login_id) => {
    const url = Api_url + forget_pass_api;
    setShowModal(true);
    axios
      .post(url, {
        login_id,
      })
      .then((res) => {
        if (res && res.status == 200) {
          console.log(res.data);
          setShowModal(false);
          setShowSucessModal(true);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response.data.message);
        setShowModal(false);
      });
  };
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Formik
        initialValues={{ username: "" }}
        onSubmit={async (values) => await HandleForgetPassword(values.username)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <View
              style={{
                marginTop: 180,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../images/logo.png")}
                style={styles.logo}
                resizeMode={"contain"}
              />
              {/* start of modal */}
              <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                  <Modal.Body>
                    <View style={styles.centerizedCol}>
                      <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                  </Modal.Body>
                </Modal.Content>
              </Modal>
              {/* end of modal */}
              {/* start sucess of modal */}
              <Modal
                isOpen={showSucessModal}
                onClose={() => setShowSucessModal(false)}
              >
                <Modal.Content maxWidth="400px">
                  <Modal.Body>
                    <View style={styles.centerizedCol}>
                      <Text
                        style={{
                          marginTop: 13,
                          fontSize: 16,
                          color: "#EF1D1D",
                          fontFamily: "Tajawal_500Medium",
                        }}
                      >
                        تم إرسال رمز إعادة تعيين كلمة المرور
                      </Text>
                    </View>
                  </Modal.Body>
                </Modal.Content>
              </Modal>
              {/* end sucess of modal */}
              <View>
                <View style={styles.headerContainer}>
                  <Heading
                    style={styles.heading}
                    fontFamily={"Tajawal_400Regular"}
                  >
                    {t("forgetpassword")}
                  </Heading>
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
                            Check Your Connection and retry to log in{" "}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
                <Stack space={4} w="100%" alignItems="center">
                  <Input
                    _text={{
                      fontSize: 15,
                    }}
                    width={350}
                    borderRadius={10}
                    placeholder={t("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                    onChangeText={handleChange("username")}
                  />
                </Stack>
              </View>
              <Button
                onPress={handleSubmit}
                style={styles.But}
                size="sm"
                width={350}
                height={10}
                marginTop={45}
                borderRadius={10}
                backgroundColor={"#E56B1F"}
                _text={{ fontSize: 15 }}
              >
                {t("send")}
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
    marginBottom: 20,
  },
  heading: {
    textAlign: "center",
    color: "#E56B1F",
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

export default ForgetPassword;
