import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator
} from "react-native";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner
} from "expo-firebase-recaptcha";
import React, { useState, useRef } from "react";

import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential
} from "firebase/auth";

import { useNavigation } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";
import { auth, app } from "../../config/firebaseConfig";
//import { auth } from "../../config/firebaseConfig";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
if (!app?.options || Platform.OS === "web") {
  throw new Error(
    "This example only works on Android or iOS, and requires a valid Firebase config."
  );
}


//const auth = getAuth();

export default function PhoneNumber  ()  {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [verificationId, setVerificationId] = useState();
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef(null);
  const firebaseConfig = app ? app.options : undefined;
  const [message, showMessage] = useState();
  const attemptInvisibleVerification = false;

  const sendVerification = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      showMessage({
        text: "Verification code has been sent to your phone."
      });
      navigation.navigate("otp", {
        confirm: verificationId,
        phoneNum: phoneNumber
      });
    } catch (err) {
      showMessage({ text: `Error: ${err.message}`, color: "red" });
    }
  };

  const sendVerificationCode = async (formattedValue) => {
    console.log(formattedValue);
    try {
      setLoading(true);

      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        formattedValue,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      showMessage({
        text: "Verification code has been sent to your phone."
      });
      setLoading(false);
      navigation.navigate("otp", {
        confirm: verificationId,
        phoneNum: formattedValue
      });
    } catch (err) {
      showMessage({ text: `Error: ${err.message}`, color: "red" });
      setLoading(false);
      console.log("error occured");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles._Topbg}></View>
      <View style={styles._Frame_2}>
        <Text style={styles.yourn}>What Is Your Phone Number?</Text>
      </View>
      <View style={styles.frame_3}>
        <Text style={styles.verify}>
          Please enter your phone number to verify your account
        </Text>
      </View>

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        // attemptInvisibleVerification
      />

      <View style={styles.phoneMain}>
        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          defaultCode="ET"
          layout="first"
          onChangeText={(text) => {
            setValue(text);
          }}
          onChangeFormattedText={(text) => {
            setFormattedValue(text);
          }}
          countryPickerProps={{ withAlphaFilter: true }}
          withShadow
          autoFocus
        />
      </View>

      <TouchableOpacity
        style={styles.yelloButtonbackground}
        disabled={!value}
        onPress={() => sendVerificationCode(formattedValue)}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Text style={styles._Send_Verification_Code}>
            Send Verification Code
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("splash")}>
        <Text style={styles._Skip}>Skip</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  phoneMain: {
    backgroundColor: "rgb(255, 255, 255)",
    marginTop: height * 0.38,
    marginHorizontal: 25,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderStyle: "solid",
    borderColor: "rgb(229, 229, 229)",
    borderRadius: 10
  },
  _Topbg: {
    width: "auto",

    height: height * 0.23,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    borderBottomRightRadius: 320,
    backgroundColor: "rgba(55, 41, 64, 1)"
  },
  _Frame_2: {
    width: "auto",
    height: "auto",
    backgroundColor: "rgba(0, 0, 0, 0)",
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    left: 18,
    top: 92,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10
  },
  yourn: {
    width: 278,
    height: "auto",
    flexShrink: 0,
    color: "rgb(255, 255, 255)",
    fontSize: 26,
    fontWeight: "400",
    //fontFamily: "Inter",
    letterSpacing: 0,
    textAlign: "left"
  },
  frame_3: {
    width: "auto",
    height: "auto",
    backgroundColor: "rgba(0, 0, 0, 0)",
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    left: 18,
    top: 247,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10
  },
  verify: {
    width: 366,
    height: "auto",
    flexShrink: 0,
    color: "rgb(0, 0, 0)",
    fontSize: 18,
    fontWeight: "400",
    //fontFamily: "Inter",
    letterSpacing: 0,
    textAlign: "left"
  },
  yelloButtonbackground: {
    width: width * 0.85,
    height: 74,
    backgroundColor: "#F4982E",
    padding: 10,
    textAlign: "center",
    left: 27,
    marginTop: 50,
    borderRadius: 15
  },
  _Send_Verification_Code: {
    lineHeight: 24.5741,
    color: "rgb(255, 255, 255)",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    paddingHorizontal: 55,
    paddingVertical: 10
  },
  _Skip: {
    marginTop: 20,
    color: "rgb(141, 138, 138)",
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 24.5741,
    //fontFamily: "Inter",
    letterSpacing: 0,
    textAlign: "left",
    paddingLeft: 20
  }
})