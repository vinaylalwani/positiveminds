import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import {View} from 'react-native';
import { Alignment } from '../../Theme';



export function KitLoader({navigation, size = 'large'}) {
  const [animate, setAnimate] = React.useState(true);

  return (
    <View
      style={{
        ...Alignment.fillRowCenter,
      }}>
      <ActivityIndicator size={size} animating={animate} />
    </View>
  );
}


