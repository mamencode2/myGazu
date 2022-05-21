import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  UIManager,
  LayoutAnimation,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../config/firebaseConfig";
export default function ProfileScreen({ route }) {
  const user = auth.currentUser;
  console.log(user);
  //const { close } = route.params;
  const navigation = useNavigation();
  const goHome = () => {
    //console.log(close);
    navigation.navigate("home");
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => goHome()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.headerWrapper}>
            <Text
              style={[
                styles.headerTexts,
                { fontFamily: "gelasioRegular", color: "#242424" }
              ]}
            >
              My Profile
            </Text>
          </View>
          <View></View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerStyle: {
    flexDirection: "row",
    marginTop: 40,
    marginHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerTexts: {
    fontSize: 20,
    lineHeight: 24
  }
});
