import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList, Share, Dimensions, ImageBackground, Platform } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import { KitText,  KitSpace, KitButton, KitLoader } from '../../Components';
import { Alignment, Colors } from '../../Theme';
import styles from "./QuotesStyle";
import { getQuotesApi } from "../../Services/API/QuotesApi";
import Snackbar from "react-native-snackbar";

const image = { uri: 'https://images.unsplash.com/photo-1682686578615-39549501dd08?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW90aXZhdGlvbiUyQyUyMHN1bnJpc2V8ZW58MHx8MHx8fDA%3D' };
// https://images.unsplash.com/photo-1682687220509-61b8a906ca19?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
// https://images.unsplash.com/photo-1682687220067-dced9a881b56?q=80&w=3350&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
// https://images.unsplash.com/photo-1702858740524-bc05413be3a3?q=80&w=1830&auto=format&fit=crokitp&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
const SCREEN_HEIGHT = Dimensions.get("screen").height - 150;
// const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

function Quotes({ navigation }) {
  // const [playing, setPlaying] = useState(false);
  const [quotesData, setQuotesData] = useState([]);
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

  const fetchQuotes = () => {
    let nextPageCall = null;
    if(nextPage) {
      nextPageCall = nextPage;
    }

    getQuotesApi(nextPageCall)
      .then(res => {
        // console.warn('quotes page res cur', res.data.cursor.nextCursor);
        // console.warn('data', res?.data?.data.length);
        

        if (res) {
          if (res?.data?.cursor?.nextCursor) {
            setQuotesData(prevData => [...prevData, ...res?.data?.data]);
            setNextPage(res?.data?.cursor?.nextCursor);
          }else {
            setQuotesData(res?.data?.data);
          }
          // setQuotesData(prevData => [...prevData, ...res?.data?.data])
          
          setLoader(false);
          setIsRefresh(false);
        }
      })
      .catch(err => {
        // console.log('quotes err', err);
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
    fetchQuotes();
  }

  const onEndReachedHandle = () => {
    fetchQuotes()
  }

  useEffect(() => {
    fetchQuotes();
  }, [])


  const renderItem = ({ item }) => {
    const {
      _id,
      content_title,
      content_type,
      description,
      persona_category,
      content_source,
      author,
      url
    } = item || {};

    // console.warn(item)
    return (
      <View style={{
        borderWidth: 1, borderColor: '#ccc', marginBottom: 20,
        height: SCREEN_HEIGHT,
        flex: 1
      }} key={_id}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
          {/* <Card.Title title={content_title}/> */}
          <Card.Actions style={{ flexWrap: 'wrap', alignSelf: 'flex-start', justifyContent: "flex-start", }}>

            <Chip
            disabled
            // icon="account-star" 
            >#{content_title}</Chip>
          </Card.Actions>
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, flex: 1 }}>

            {/* <Card.Content > */}
            <KitText adjustsFontSizeToFit  variant="displaySmall" style={{ backgroundColor: 'rgba(0,0,0,0.1)', textAlign: 'center', color:'#fff', fontWeight:'bold' }}>{description}</KitText>
            {/* </Card.Content> */}
          </View>

          <KitSpace height={10} />

          <Card.Actions style={{ flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'flex-end' }}>

            <Chip icon="account-check" mode="flat">By:- {author}</Chip>

            <Chip icon="share-variant" mode="flat" onPress={() => onShare(content_title, description, author)}>Share</Chip>
          </Card.Actions>
        </ImageBackground>

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
          ListHeaderComponent={quotesData && quotesData.length && renderListHeader}
          // nestedScrollEnabled
          data={quotesData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          onRefresh={onRefreshHandle}
          refreshing={isRefreshing}
          // initialScrollIndex={0}
          // invertStickyHeaders
          // stickySectionHeadersEnabled
          // ref={flatListRef}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            flex: 1,
            // transform: [{ scaleY: -1 }]
          }}
          initialNumToRender={1}
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

export default Quotes