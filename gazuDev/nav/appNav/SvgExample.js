import * as React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Rect, Path } from 'react-native-svg';

export default function SvgComponent(props) {
  return (
    
    <Svg height="50%" width="50%" viewBox="0 0 44 25" {...props}>
      <Path
d="M.25.25h24.5V42A1.75 1.75 0 0123 43.75H2A1.75 1.75 0 01.25 42V.25z"
fill="#DCDCDC"
      stroke="#000"
      strokeWidth=".5"
      />
    </Svg>
    
  );
}