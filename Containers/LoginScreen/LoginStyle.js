import { StyleSheet } from "react-native"
import { Fonts, Alignment, Colors} from "../../Theme"

export default StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...Fonts.h5,
    ...Alignment.textLeft,
    color: Colors.primary,
    fontWeight: 'bold'
  },
  subTitle:{
    ...Fonts.sub1,
    ...Alignment.textLeft,
    color: Colors.ash2,
  }
})