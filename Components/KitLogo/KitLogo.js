import * as React from "react"
import {Image, View} from 'react-native';
// import Svg, { Path } from "react-native-svg"
// import SvgUri from 'react-native-svg-uri';
import logo from '../../Assests/Images/logo.png'

const KitLogo = (props) => {
  return (
    <View>
    <Image source={logo} style={{width:187/4, height:166/4}}  />
  </View>
  )
}
export {KitLogo};
