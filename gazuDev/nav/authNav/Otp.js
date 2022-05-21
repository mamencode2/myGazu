import React, { useState, useRef, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  Animated,
  Dimensions,
  Vibration,
  Alert,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator
} from "react-native";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner
} from "expo-firebase-recaptcha";
import { useDispatch } from "react-redux";
import { app, auth, db } from "../../config/firebaseConfig";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { setSignIn } from "../../redux/slices/authSlice";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function Otp({ route, navigation }) {
  const { confirm } = route.params;
  const { phoneNum } = route.params;
  const dispatch = useDispatch();
  const [message, showMessage] = useState();
  const [verificationCode, setVerificationCode] = useState();
  const [loading, setLoading] = useState(false);
  //   const savingUserandRedirect = async (user) => {
  //     console.log(user)
  //     try {
  //       await setDoc(doc(db, "users", user.uid), {
  //         phoneNumber: user.phoneNumber,
  //         email: user.email || "",
  //         uid: user.uid,
  //         displayName: user.displayName || "",
  //         photoUrl: user.photoURL || ""

  //       }, { merge: true })
  //       dispatch(login({
  //         isLoggedIn: true,
  //         phoneNumber: user.phoneNumber,
  //         email: user.email || "",
  //         uid: user.uid,
  //         displayName: user.displayName || "",
  //         photoUrl: user.photoURL || ""
  //       }))

  //     } catch (error) {
  // console.log("error")
  //     }
  //   }
  const handleLogin = () => {
    const user = {
      isLoggedIn: true,
      email: "jdoe@test.com",
      userName: "johnDoe"
    };

    dispatch(setSignIn(user));
    setLoading(false);
  };
  const confirmCode = async () => {
    try {
      setLoading(true);
      const credential = PhoneAuthProvider.credential(
        confirm,
        verificationCode
      );
      const result = await signInWithCredential(auth, credential);
      //savingUserandRedirect(result.user);
      console.log(result.user);

      showMessage({ text: "Phone authentication successful 👍" });
      handleLogin();
    } catch (err) {
      showMessage({ text: `Error: ${err.message}`, color: "red" });
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.topgrad}>
        <Text style={styles.your}>Verification code</Text>
      </View>
      <View style={{ marginTop: 30, marginHorizontal: 25 }}>
        <Text style={styles.verify}>Please enter Code Sent to</Text>
      </View>
      <View style={styles.changeWrapper}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {JSON.stringify(phoneNum)}
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ textDecorationLine: "underline" }}>
            Change Phone Number
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.otpWrapper}>
        <TextInput
          style={styles.input}
          autoFocus={true}
          keyboardType="numeric"
          value={verificationCode}
          placeholder="123456"
          onChangeText={setVerificationCode}
          maxLength={6}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={confirmCode}
        disabled={!verificationCode || loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Text style={styles.continued}>Continue</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: "#F4982E",

    padding: 10,
    textAlign: "center",
    marginHorizontal: 27,
    marginTop: 50,
    borderRadius: 15
  },
  continued: {
    lineHeight: 24.5741,
    color: "rgb(255, 255, 255)",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    paddingHorizontal: 55,
    paddingVertical: 10
  },
  otpWrapper: {
    marginTop: 50,
    marginHorizontal: 30
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 27,
    fontWeight: "bold"
  },

  verify: {
    flexShrink: 0,
    color: "rgb(0, 0, 0)",
    fontSize: 18,
    fontWeight: "400",
    //fontFamily: "Inter",
    letterSpacing: 0,
    textAlign: "left"
  },
  changeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 25,
    justifyContent: "space-between",
    marginTop: 20
  },
  your: {
    marginHorizontal: 25,
    paddingTop: 90,
    color: "rgb(255, 255, 255)",
    fontSize: 26,
    fontWeight: "400",
    //fontFamily: "Inter",
    letterSpacing: 0,
    textAlign: "left",
    paddingHorizontal: 25
  },
  container: {
    flex: 1
  },

  topgrad: {
    width: width,

    height: height * 0.23,

    borderBottomRightRadius: 320,
    backgroundColor: "rgba(55, 41, 64, 1)"
  }
});
