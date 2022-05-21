import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions
  } from "react-native";
  import React from "react";
  import { useNavigation } from "@react-navigation/native";
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const logo = require("../../assets/images/logo.png");
  export default function SplashScreen() {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.imageStyle} />
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => navigation.navigate("phonenumber")}
        >
          <Text style={styles.getStart}>Get Start</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#DCDFE1",
      alignItems: "center",
      justifyContent: "center"
    },
  
    buttonWrapper: {
      position: "absolute",
      bottom: 30,
      padding: 10,
      textAlign: "center",
      backgroundColor: "#F4982E",
      borderRadius: 15,
      width: width * 0.65
    },
    imageStyle: {
      height: 200,
      marginHorizontal: 20,
      resizeMode: "contain",
      width: width * 0.9
    },
    getStart: {
      color: "rgb(255, 255, 255)",
      fontSize: 18,
      fontWeight: "700",
      textAlign: "center",
      lineHeight: 24.5741
    }
  });
  