import { StyleSheet } from 'react-native'
import { Button, IconButton } from 'react-native-paper';
import { dp } from '../../Utilities/css';
import { Fonts } from '../../Theme';

export function KitButton({
  children,
  mode = "contained",// 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal'
  ...props
}) {
  return (
    <Button mode={mode} style={styles.wrapBtn} contentStyle={styles.defaultButton} {...props}>
      {children}
    </Button>
  )
}

const styles = StyleSheet.create({
  wrapBtn: {
    borderRadius:6,
    
  },
  defaultButton: {
    fontSize: 14,
    borderTopEndRadius:0,
    paddingVertical:3,
    ...Fonts.fontRegular
  },

})

export function KitIconButton({
  children,
  color = "black",
  size = 20,
  ...props
}) {
  return (
    <IconButton
    color={color}
    size={size}
    {...props}
  />
  )
}
