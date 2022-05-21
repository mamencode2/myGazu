import React, { useRef, useState, useEffect, useCallback } from "react";
import {
    Button,
    DrawerLayoutAndroid,
    StatusBar,
    Text,
    StyleSheet,
    View,
    Pressable,
    SafeAreaView,
    Dimensions,
    ScrollView,
    FlatList,
    Image,
    TouchableOpacity

} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { FAB } from 'react-native-paper';
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
import MapboxGL from "@react-native-mapbox-gl/maps";
import stationData from '../../assets/data/stationData'
import useDistance from "../../helpers/useDistance";
import Color from "../../assets/data/colors";

import SvgComponent from './SvgExample'
import Icon from './Icon'
import IconTwo from './IconTwo'
MapboxGL.setAccessToken(
    "pk.eyJ1IjoibWFtZW5jb2RlIiwiYSI6ImNrbmMyNDhmbzF4ZHIyd282NDJ5cDl4dmEifQ.kB0rN0t8PgA822CqczbbqQ"
);
const { width, height } = Dimensions.get('screen');
const SPACING = 20;
const AVATAR_SIZE = 70;

const initialPos = height * 0.60;
const accessToken = 'pk.eyJ1IjoibWFtZW5jb2RlIiwiYSI6ImNrbmMyNDhmbzF4ZHIyd282NDJ5cDl4dmEifQ.kB0rN0t8PgA822CqczbbqQ';
const directionsClient = MapboxDirectionsFactory({ accessToken });


export default function ResultScreen({ route, navigation }) {
    const {coords} = route.params;
    const [isTrue, setTue] = useState(true)

    const filkey = 'benzin'
    const mapRef = useRef(null)
    const scrollRef = useRef(null)
    const [stwith, setStW] = useState([])
    const benzinAvailable = stationData.filter((item) => item.stockStatus[filkey] > 0)
    const animation = useSharedValue(initialPos)

    function handleToogle() {
        setTue(!isTrue)


        animation.value = animation.value === initialPos ? 3 : initialPos
    }
    const theStyle = useAnimatedStyle(() => {

        return {
            top: withTiming(animation.value, {
                duration: 500
            })
        }
    })

    const renderAnnotations = () => {
        return (
            <MapboxGL.PointAnnotation
                key="pointAnnotation"
                id="pointAnnotation"
                coordinate={coords}
            >
                <View
                    style={{
                        height: 30,
                        width: 30,
                        backgroundColor: "#00cccc",
                        borderRadius: 50,
                        borderColor: "#fff",
                        borderWidth: 3
                    }}
                />
            </MapboxGL.PointAnnotation>
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
                            source={require("../assets/images/location.png")}
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


    const destpo = stationData.filter((item) => item.stockStatus[filkey] > 0).map((it, index) => {
        return {
            id: it.id,
            locAna: useDistance(coords, it.geometry.coordinates),
            stName: it.properties.stName,
            stockAmount: it.stockStatus[filkey]
        }
    })

    return (
        <SafeAreaView style={styles.container}>
<MapboxGL.MapView
                styleURL={MapboxGL.StyleURL.Street}
                logoEnabled={false}
            compassEnabled={false}
            
                zoomLevel={10}
                centerCoordinate={[38.763611, 9.005401]}
                showUserLocation={true}
                style={{ flex: 1, width: width, height: height }}

                ref={mapRef}
            >
                <MapboxGL.Camera
                    zoomLevel={13}
                    centerCoordinate={coords}
                ></MapboxGL.Camera>

                <View>

                    {renderAnnotations()}
                </View>
                {benzinAvailable.map((item) => (
                    <Mark key={item.id} item={item} />
                ))}
            </MapboxGL.MapView>
            

            <Animated.View
                style={[isTrue ? styles.hr : styles.vr, theStyle]}>

                <FlatList
                    data={destpo}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}

                    horizontal={isTrue}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                        padding: SPACING,
                        paddingTop: StatusBar.currentHeight || 40
                    }}

                    renderItem={({ item, index }) => {
                        return <View style={[styles.wrapper, { marginRight: isTrue ? SPACING : 0 }]}>

                            <Text
                                style={{ fontSize: 22, fontWeight: '700' }}
                            >{item.stName}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>

                                <View
                                    style={styles.amtleft}
                                >
                                    <Text style={{ fontSize: 14, fontWeight: '700', color: Color.darkgray }}>
                                        Amount</Text>
                                    <Text>
                                        {item.stockAmount} litter
                                    </Text>
                                </View>
                                <IconTwo amount={item.stockAmount / 1000} />

                            </View>
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, marginTop: 10 }}
                            >
                                <View>
                                    <Text style={{ fontSize: 14, fontWeight: '700', color: Color.darkgray }}>
                                        Distance</Text>
                                    <Text>3 km</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 14, fontWeight: '700', color: Color.darkgray }}>
                                        Duration</Text>
                                    <Text>8 min 34sec</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={{
                                width: '70%',
                                marginTop: SPACING,
                                padding: 5,
                                borderRadius: 10, backgroundColor: '#5ba7cc', alignSelf: 'center', alignItems: 'center'
                            }}>
                                <FontAwesome5 name="directions" size={24} color="white" />
                            </TouchableOpacity>


                        </View>
                    }}

                />


            </Animated.View>




            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={handleToogle}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    amtleft: {
        paddingTop: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,

    },
    amt: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    vr: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        top: 0
    },
    wrapper: {
        padding: 10,
        marginBottom: SPACING,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 13.16,
        elevation: 20,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 12,

        width: width * 0.8
    },
    hr: {
        position: 'absolute',
        margin: 16,
    },
    markerContainer: {
        alignItems: "center",
        width: 60,
        backgroundColor: "transparent",
        height: 70,
    },
})