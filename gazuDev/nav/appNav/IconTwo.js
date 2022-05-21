import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg";




const indicators=[
    {id: 'full', color: '#00ffff'},
    {id: 'meddium', color: '#ff7f50'},
    {id: 'low', color: '#b22222'},
    ];

const IconTwo = (props) => {
    const value= 56- props.amount


const Color = props.amount<=15? indicators[2].color:props.amount>15 && props.amount<35? indicators[1].color:  indicators[0].color
  return (
    <View>
      <Svg
      width={56}
      height={58}>
     <Path
        d="M0 54  H56 V2.209 H0 z "
        fill="#556080"
      />
       
     
     <Path
       d={`M0 54  H56 V${value} H0 z `}
       fill={Color}
     />
      <Path
        d="M28 8c15.464 0 28-1.79 28-4S43.464 0 28 0 0 1.79 0 4s12.536 4 28 4z"
        fill="#7383BF"
      />
      <Path
        d="M28 58c15.464 0 28-1.79 28-4s-12.536-4-28-4-28 1.79-28 4 12.536 4 28 4z"
        fill="#434C6D"
      />


      </Svg>
    </View>
  )
}

export default IconTwo

//const styles = StyleSheet.create({})