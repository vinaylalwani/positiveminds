import { View } from 'react-native';

export function KitSpace({
  children,
  height = 10,
  width = 10,
  ...props
}) {
  return (
    <View style={{height: height, width:width}}></View>
  )
}