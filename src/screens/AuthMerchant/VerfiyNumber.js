import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Input, Stack, Button, Pressable, Heading } from 'native-base'
// import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const VerfiyNumber = ({ navigation }) => {
  const { t } = useTranslation();

  const [number, setNumber] = useState("01555560534");
  // const {height} = useWindowDimensions();
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View
        style={{
          marginTop: 120,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../images/logo.png")}
          style={styles.logo}
          resizeMode={"contain"}
        />
        <View>
          <View style={styles.headerContainer}>
            <Heading style={styles.heading} fontFamily={"Tajawal_500Medium"}>
              {t("code")}
            </Heading>
          </View>
          <Stack space={4} w="100%" alignItems="center">
            <Text>{t("enteryourcode")} </Text>
            <Text>{number}</Text>
            <Input width={350} borderRadius={10} type="number" />
            {/* <OTPInputView pinCount={4} /> */}
          </Stack>
          <View style={styles.clickContainer}>
            <Pressable onPress={() => console.warn("send again")}>
              <Text style={styles.click}>{t("resendyourcode")}</Text>
            </Pressable>
          </View>
        </View>
        <Button
          onPress={() => navigation.navigate("Logins")}
          style={styles.But}
          size="sm"
          width={350}
          height={10}
          marginTop={25}
          borderRadius={10}
          backgroundColor={"#E56B1F"}
          fontFamily={"Tajawal_500Medium"}
          _text={{ fontSize: 15 }}
        >
          {t("done")}
        </Button>
      </View>
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
    fontFamily: "Tajawal_700Bold",
  },
  clickContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 25,
  },
  click: {
    color: "#402CF3",
    fontSize: 15,
    fontFamily: "Tajawal_500Medium",
  },
});

export default VerfiyNumber;
