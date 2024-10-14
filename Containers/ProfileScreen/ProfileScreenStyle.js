import { StyleSheet } from "react-native"
import { Fonts, Alignment, Colors} from "../../Theme"

export default StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  subTitle:{
    ...Fonts.sub1,
    ...Alignment.textLeft,
    color: Colors.ash2,
  }
})