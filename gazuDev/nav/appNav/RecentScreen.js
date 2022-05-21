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
import { Ionicons } from "@expo/vector-icons";

export default function RecentScreen({ navigation }) {
  const goHome = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={goHome}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.headerWrapper}>
            <Text
              style={[
                styles.headerTexts,
                { fontFamily: "gelasioRegular", color: "#242424" }
              ]}
            >
              Activites
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
