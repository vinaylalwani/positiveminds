import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList, Share, Platform } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import { KitText, KitSpace, KitButton, KitLoader } from '../../Components';
import { Alignment } from '../../Theme';
import { getStoriesApi } from "../../Services/API/StoriesApi";
import styles from "./StoriesStyle";

function Stories({ navigation }) {
  const [storiesData, setStoriesData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [isRefreshing, setIsRefresh] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const onShare = async (title, content, author) => {
    const iosUrl = 'https://apps.apple.com/us/app/positiveminds/id6503220621';
    const androidUrl = '';
  
    const url = Platform.OS === 'ios' ? iosUrl : androidUrl;

    try {
      const result = await Share.share({
        message: `${title} - by Positive Minds - "${content}" - ${author}. 
        ${url}`,
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

  const fetchStories = () => {
    let nextPageCall = null;
    if(nextPage) {
      nextPageCall = nextPage;
    }

    getStoriesApi(nextPageCall)
      .then(res => {
        // console.warn('storeis page res cur', res.data.cursor.nextCursor);
        // console.warn('data', res?.data?.data.length);
        

        if (res) {
          if (res?.data?.cursor?.nextCursor) {
            setStoriesData(prevData => [...prevData, ...res?.data?.data]);
            setNextPage(res?.data?.cursor?.nextCursor);
          }else {
            setStoriesData(res?.data?.data);
          }
          
          setLoader(false);
          setIsRefresh(false);
        }
      })
      .catch(err => {
        // console.log('stories err', err);
        setLoader(false);
        setIsRefresh(false);
        Snackbar.show({
          text: err.message,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: Colors.error,
        });

      });
  }

  const onRefreshHandle = () => {
    setIsRefresh(true);
    fetchStories();

  }

  const onEndReachedHandle = () => {
    fetchStories()
  }


  useEffect(() => {
    fetchStories();
  }, [])
 
  const renderItem = ({ item }) => {
    const {
      _id,
      content_title,
      description,
      author,
      url
    } = item || {};
    // console.warn(item)
    return (
      <View style={{
        borderWidth: 1, borderColor: '#ccc', marginBottom: 20, paddingVertical:10,
        // height: SCREEN_HEIGHT,
        flex: 1
      }} key={_id}>
        <Card.Content>

          <KitText onPress={()=> navigation.navigate('ArticleDetails', {url: url[0], title:content_title})} variant="titleLarge">{content_title}</KitText>
        </Card.Content>

        <KitSpace height={10} />
        <Card.Content>
          <KitText variant="bodyLarge">{description}</KitText>
        </Card.Content>

        <KitSpace height={10} />

        {/* <Divider /> */}


        <View style={{paddingHorizontal:10, flex:1}}>

          <Chip icon="account-check" mode="flat">By:- {author}</Chip>

          <KitSpace height={10} />

<Chip icon="share-variant" mode="flat" onPress={() => onShare(content_title, description, author)}>Share</Chip>

          
        </View>
      </View>
    )
  }

  const renderListHeader = () => {
    return (
      <KitButton icon="refresh" onPress={onRefreshHandle} mode="outline">Refresh</KitButton>
    )
  }

  return (
    <SafeAreaView style={Alignment.fill}>
      <View style={styles.container}>
        {loader &&
          <KitLoader />
        }

        <FlatList
          ListHeaderComponent={storiesData && storiesData.length && renderListHeader}
          // nestedScrollEnabled
          data={storiesData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          onRefresh={onRefreshHandle}
          refreshing={isRefreshing}
          // initialScrollIndex={0}
          invertStickyHeaders
          stickySectionHeadersEnabled
          // ref={flatListRef}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            flex: 1,
            // transform: [{ scaleY: -1 }]
          }}
          // initialNumToRender={10}
          // onScrollEndDrag={() => setScrollToBottomVisible(true)}
          // onScrollBeginDrag={() =>
          //   setScrollToBottomVisible(!scrollToBottomVisible)
          // }
          // inverted
          onEndReached={onEndReachedHandle}
          onEndReachedThreshold={0.1}
        />
      </View>
    </SafeAreaView>
  )
}

export default Stories