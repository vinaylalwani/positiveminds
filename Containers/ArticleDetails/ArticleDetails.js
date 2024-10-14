import React, { useState, useEffect } from "react";
import { View, Share } from 'react-native';
// import YoutubePlayer from "react-native-youtube-iframe";
import { Appbar } from 'react-native-paper';
import { KitText } from '../../Components';
import { Colors } from '../../Theme';
import { getArticlesApi } from "../../Services/API/ArticlesApi";
import styles from "./ArticleDetailsStyle";
import WebView from "react-native-webview";
function ArticleDetails({ navigation, route }) {
  const [articleData, setArticleData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [isRefreshing, setIsRefresh] = useState(false);

  const onShare = async (title, content, author) => {
    try {
      const result = await Share.share({
        message: `${title} - by Positive Minds - "${content}" - ${author}. 
        http://positiveminds.ai`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const fetchArticles = () => {
    getArticlesApi()
      .then(res => {
        // console.warn('article page res', res);
        if (res) {
          setArticleData(res?.data?.data);
          setLoader(false);
          setIsRefresh(false);
        }
      })
      .catch(err => {
        // console.log('article err', err);
        setLoader(false);
        setIsRefresh(false);

      });
  }

  useEffect(() => {
    fetchArticles();
  }, [])

  function renderTitle() {
    return (
      <View>
        <KitText variant="labelMedium" style={{ color: Colors.white }} numberOfLines={1} ellipsizeMode='tail'>{route?.params.title}</KitText>
        <KitText variant="labelSmall" style={{ color: Colors.white }} numberOfLines={1} ellipsizeMode='tail'>{route?.params.url}</KitText>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <Appbar.Header mode="small" style={{ backgroundColor: '#5f56af' }}>
          <Appbar.BackAction iconColor={Colors.white} onPress={() => navigation.goBack()} />
          <Appbar.Content title={renderTitle()} />
          {/* <Appbar.Action icon="calendar" onPress={() => {}} /> */}
          <Appbar.Action icon="share" iconColor={Colors.white} onPress={() => onShare(route?.params.title, route?.params.url, route?.params.author)} />
        </Appbar.Header>
      </View>
      <WebView
        // source={{ uri: 'https://medium.com/@jankammerath/the-ai-dilemma-when-large-language-model-training-reaches-a-dead-end-e2cf1de4a2ad' }}
        source={{ uri: route?.params.url }}
        // injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=2, maximum-scale=0.5, user-scalable=2'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        scalesPageToFit={false}
        onContentProcessDidTerminate={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          // console.warn('Content process terminated, reloading', nativeEvent);
          this.refs.webview.reload();

        }}
        containerStyle={{ width: '100%' }}
      />
    </View>
  )
}

export default ArticleDetails