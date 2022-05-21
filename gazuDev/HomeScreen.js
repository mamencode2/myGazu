import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  Dimensions,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { app, auth, db } from "../../config/firebaseConfig";
import { setSignOut } from "../../redux/slives/authSlice";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import stationData from "../../assets/data/stationData";
import fuelData from "../../assets/data/fuelData";
import FuelItem from "../../components/FuelItem";
MapboxGL.setAccessToken(
  "pk.eyJ1IjoibWFtZW5jb2RlIiwiYSI6ImNrbmMyNDhmbzF4ZHIyd282NDJ5cDl4dmEifQ.kB0rN0t8PgA822CqczbbqQ"
);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const routes = [
  {
    nav: "profile",
    icon: "person-outline"
  },
  { nav: "setting", icon: "settings-outline" },
  { nav: "activity", icon: "time-outline" },
  { nav: "payment", icon: "card-outline" }
];

export default function HomeScreen({ navigation }) {
  const [isOpen, setOpen] = useState(false);
  const [op, setOp] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [selItem, setSelItem]= useState(null)

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const [chV, setChV] = useState(fuelData)
 
 const chHandler = (value,index)=>{
 console.log(value)
 const newValue = chV.map((checkbox, i) => {
    if (i !== index)
      return {
        ...checkbox,
        checked: false,
      }
    if (i === index) {
      const item = {
        ...checkbox,
        checked: !checkbox.checked,
      }
      return item
    }
   return checkbox
 })
 
 setChV(newValue)
 setSelItem(value)


 }

  const handleToogle = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        300,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.opacity
      )
    );
    setExpanded(!expanded);
  };

  

  function handleNavi(navto) {
    setOpen(false);
    setExpanded(false);
    navigation.navigate(`${navto}`);
  }

  const Item = ({ list }) => {
    return (
      <Pressable
        style={styles.listwrapper}
        onPress={() => handleNavi(list.nav)}
      >
        <Text style={styles.text}>{list.nav}</Text>

        <Ionicons name={list.icon} size={30} color="black" />
      </Pressable>
    );
  };



  const Mark = ({ item }) => {
    return (
        <MapboxGL.MarkerView id={"marker"} coordinate={item.geometry.coordinates}>
            <View>
                <View style={styles.markerContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{item.properties.stName}</Text>
                    </View>
                    <Image
                        source={require("../../assets/images/location.png")}
                        style={{
                            width: 20,
                            height: 30,

                            resizeMode: "cover",
                        }}
                    />
                </View>
            </View>
        </MapboxGL.MarkerView>
    )
}

const handleFind = ()=>{
  console.log(selItem.fuel)


}

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar style="light" /> */}

      <MapboxGL.MapView
        styleURL={MapboxGL.StyleURL.Street}
        zoomLevel={10}
        centerCoordinate={[38.763611, 9.005401]}
        showUserLocation={true}
        style={{ flex: 1, height: windowHeight }}
      >
        <MapboxGL.Camera
          zoomLevel={14}
          centerCoordinate={[38.763611, 9.005401]}
        ></MapboxGL.Camera>

{stationData.map((item) => (
                    <Mark key={item.id} item={item} />
                ))}
      </MapboxGL.MapView>

      {expanded && (
        <>
          <Pressable style={styles.overlay} onPress={handleToogle} />

          <View style={styles.drawer}>
            {routes.map((list) => (
              <Item key={list.nav} list={list} />
            ))}
          </View>
        </>
      )}
      {!expanded && (
        <Pressable onPress={handleToogle} style={styles.abtest}>
          <Feather name="menu" size={34} color="black" />
        </Pressable>
      )}
      <View style={{flexDirection: 'row'}}>
    {chV.map((item, i)=> (
    <FuelItem key={i} item={item} 
    chHandler={chHandler}
    i={i}
    />
    
    ))}
    
    
    </View>
    <TouchableOpacity style={selItem? styles.active: styles.disabled } disabled={!selItem}
    onPress={handleFind}
    >

      <Text style={styles.continued}>Find</Text>
    </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  active:{
position: 'absolute',
bottom: 0,
margin: 20,
backgroundColor: "#F4982E",

    padding: 10,
    borderRadius: 15

  },
  disabled:{
    position: 'absolute',
bottom: 0,
margin: 20,
backgroundColor: "gray",

    padding: 10,
   
    borderRadius: 15
  },
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
  listwrapper: {
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    marginVertical: 5
  },
  drawer: {
    position: "absolute",
    left: 0,
    width: windowWidth * 0.7,
    backgroundColor: "green",
    height: windowHeight,
    alignItems: "center",
    justifyContent: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.2)"
  },
  ic: {
    marginTop: 30,
    marginLeft: 20,
    backgroundColor: "red",
    width: 50,
    height: 50
  },
  abtest: {
    marginTop: 30,
    marginLeft: 20,
    position: "absolute",

    width: 50,
    height: 50
  },
  text: {
    fontSize: 20,
    fontWeight: "bold"
  }
});