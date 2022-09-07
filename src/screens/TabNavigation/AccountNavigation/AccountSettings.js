import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import PhoneInput from 'react-native-phone-number-input'
import { Input, Button, Modal } from 'native-base'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Formik } from 'formik'
import { Api_url, update_account } from '../../../utilites/ApiConstants'
import axios from 'axios'

const AccountSettings = ({ route, navigation }) => {
  const token = useSelector((state) => state.auth.data.token);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const data = useSelector((state) => state.data.data);
  const { username, name_ar, name_en, mobile } = data;
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleUpdateAccount = async (username, name_ar, name_en) => {
    const url = Api_url + update_account;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setShowModal(true);
    axios
      .post(
        url,
        {
          username,
          name_ar,
          name_en,
        },
        config
      )
      .then((res) => {
        if (res && res.status == 200) {
          setShowModal(false);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setShowModal(false);
      });
  };

  return (
    <Formik
      initialValues={{ username: "", namear: "", nameen: "" }}
      onSubmit={async (values) =>
        handleUpdateAccount(values.username, values.namear, values.nameen)
      }
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <View style={styles.inputWrapper}>
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
            <PhoneInput
              withShadow
              defaultValue={mobile}
              backgroundColor={"white"}
              onChangeFormattedText={(text) => {
                setPhoneNumber(text);
              }}
              containerStyle={styles.phoneNumberInput}
              textContainerStyle={styles.phoneNumberInputtxt}
              defaultCode="EG"
            />

            <View style={styles.phoneNumberInputtxt1}>
              <Text>{t("username")}</Text>

              <Input
                w={{
                  base: "87%",
                }}
                _text={{
                  color: "#ECECEC",
                }}
                height={50}
                fontFamily={"Tajawal_500Medium"}
                placeholder={username}
                style={styles.phoneNumberInputtxt}
                fontSize={14}
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
              />
            </View>

            <View style={styles.phoneNumberInputtxt1}>
              <Text>Name Ar :</Text>
              <Input
                w={{
                  base: "87%",
                }}
                _text={{
                  color: "#ECECEC",
                }}
                height={50}
                fontFamily={"Tajawal_500Medium"}
                placeholder={name_ar}
                style={styles.phoneNumberInputtxt}
                fontSize={14}
                value={values.namear}
                onChangeText={handleChange("namear")}
                onBlur={handleBlur("namear")}
              />
            </View>
            <View style={styles.phoneNumberInputtxt1}>
              <Text>Name En :</Text>

              <Input
                w={{
                  base: "87%",
                }}
                _text={{
                  color: "#ECECEC",
                }}
                height={50}
                fontFamily={"Tajawal_500Medium"}
                placeholder={name_en}
                style={styles.phoneNumberInputtxt}
                fontSize={14}
                value={values.nameen}
                onChangeText={handleChange("nameen")}
                onBlur={handleBlur("nameen")}
              />
            </View>
            <Button
              onPress={handleSubmit}
              style={styles.firstBut}
              size="sm"
              backgroundColor={"#E56B1F"}
              _text={{ fontSize: 14 }}
            >
              {t("confirm")}
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF9F9",
    flex: 1,
  },
  inputWrapper: {
    marginTop: 15,
    marginHorizontal: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  phoneNumberInput: {
    height: 60,
    marginVertical: 10,
  },
  phoneNumberInputtxt: {
    backgroundColor: "white",
    borderLeftWidth: 1,
    borderColor: "#ECECEC",
  },
  phoneNumberInputtxt1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  firstBut: {
    marginVertical: 35,
  },
});

// <View style={styles.phoneNumberInputtxt1}>
// <Input
//   w={{
//     base: "87%",
//   }}
//   _text={{
//     color: "#ECECEC",
//   }}
//   height={50}
//   fontFamily={"Tajawal_500Medium"}
//   placeholder={name}
//   style={styles.phoneNumberInputtxt}
//   fontSize={14}
// />
// </View>
// <View style={styles.phoneNumberInputtxt1}>
// <Input
//   w={{
//     base: "87%",
//   }}
//   _text={{
//     color: "black",
//   }}
//   height={50}
//   fontFamily={"Tajawal_500Medium"}
//   placeholder={email}
//   style={styles.phoneNumberInputtxt}
//   fontSize={14}
// />
// </View>
// <View style={styles.phoneNumberInputtxt1}>
// <Input
//   w={{
//     base: "87%",
//   }}
//   _text={{
//     color: "black",
//   }}
//   height={50}
//   fontFamily={"Tajawal_500Medium"}
//   placeholder={t("birthday")}
//   style={styles.phoneNumberInputtxt}
//   fontSize={14}
// />
// <Button
//   onPress={() => navigation.goBack()}
//   style={styles.firstBut}
//   size="sm"
//   backgroundColor={"#E56B1F"}
//   height={10}
//   borderRadius={10}
//   fontFamily={"Tajawal_500Medium"}
//   _text={{ fontSize: 16, fontFamily: "Tajawal_500Medium" }}
// >
//   {t("save")}
// </Button>
// </View>
