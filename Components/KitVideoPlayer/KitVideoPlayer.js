import { StyleSheet, View } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";
import { Fonts } from '../../Theme';

export function KitVideoPlayer({
  children,
  playing,
  onStateChange,
  videoId,
  ...props
}) {
  return (
    <View>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={videoId}//i8kgJv8ykho, iee2TATGMyI, Wi_dQEtX4AQ
        onChangeState={onStateChange}
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 14,
    ...Fonts.fontRegular
  },
  
})