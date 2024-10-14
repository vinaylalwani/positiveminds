import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper';
import { Fonts } from '../../Theme';

export function KitText({
  children,
  ...props
}) {
  return (
    <Text style={styles.defaultText} {...props}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  defaultText: {
    // fontSize: 14,
    ...Fonts.fontRegular
  },
  
})