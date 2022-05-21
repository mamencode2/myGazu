import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg";




const indicators=[
    {id: 'full', color: '#00ffff'},
    {id: 'meddium', color: '#ff7f50'},
    {id: 'low', color: '#b22222'},
    ];

const Icon = (props) => {
    const value= 44- props.amount
    
    const Color = props.amount<=10? indicators[2].color:props.amount>10 && props.amount<20? indicators[1].color:  indicators[0].color
  
    
    
  return (
    <View>
      <Svg
      width={25}
      height={44}>

<Path
d="M.25.25h24.5V42A1.75 1.75 0 0123 43.75H2A1.75 1.75 0 01.25 42V.25z"
fill="#DCDCDC"
      stroke="#000"
      strokeWidth=".5"
      />

<Path
     d={`M.25 ${value} h24.5V42A1.75 1.75 0 0123 43.75H2A1.75 1.75 0 01.25 42V.25z`}
     fill={Color}
        strokeWidth={0.5}
     /> 
      </Svg>
    </View>
  )
}

export default Icon