import React, { useState, useCallback, useEffect } from "react";
import { View, SafeAreaView, FlatList, Share, Platform, TouchableOpacity } from 'react-native';
import { Card, Chip, Modal, Portal } from 'react-native-paper';
import { KitText, KitVideoPlayer, KitSpace, KitLoader, KitButton } from '../../Components';
import { Alignment, Colors } from '../../Theme';
import { getExercisesApi } from "../../Services/API/ExercisesApi";
import styles from "./ExercisesStyle";
import Snackbar from "react-native-snackbar";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';

function Exercises({ navigation }) {
  const [playing, setPlaying] = useState(false);
  const [excerciseData, setExcerciseData] = useState([])
  const [loader, setLoader] = useState(true);
  const [isRefreshing, setIsRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState(false);
  const [nextPage, setNextPage] = useState(null);


  const containerStyle = {
    backgroundColor: 'white',
    // padding: 20, 
    flex: 1 / 2,
    justifyContent: 'center',
    // alignItems:'center',
    shadowOffset: { height: 0 }, opacity: 1, shadowRadius: 0, shadowColor: '#fff',
  };

  const showModal = () => setModalVisible(true);
  const hideModal = () => {
    setModalVisible(false)
  };

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      // Alert.alert("video has finished playing!");
    }
  }, []);


  const onShare = async (title, content, author) => {
    const iosUrl = 'https://apps.apple.com/us/app/positiveminds/id6503220621';
    const androidUrl = '';
  
    const url = Platform.OS === 'ios' ? iosUrl : androidUrl;

    try {
      const result = await Share.share({
        message: `${title} - by Positive Minds - ${author}. 
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

  const fetchExercises = () => {
    let nextPageCall = null;
    if(nextPage) {
      nextPageCall = nextPage;
    }

    getExercisesApi()
      .then(res => {
        // console.warn('excercise page res cur', res.data.cursor.nextCursor);
        // console.warn('data', res?.data?.data.length);
        

        if (res) {
          if (res?.data?.cursor?.nextCursor) {
            setExcerciseData(prevData => [...prevData, ...res?.data?.data]);
            setNextPage(res?.data?.cursor?.nextCursor);
          }else {
            setExcerciseData(res?.data?.data);
          }
          // setQuotesData(prevData => [...prevData, ...res?.data?.data])
          
          setLoader(false);
          setIsRefresh(false);
        }
      })
      .catch(err => {
        // console.log('exercises err', err);
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
    fetchExercises();

  }

  const onEndReachedHandle = () => {
    fetchExercises()
  }

  const videoId = (url) => {
    let urlsplit = url[0].split('/');
    return urlsplit[urlsplit.length - 1];
  }


  const openVideoModal = (url) => {
    const videoUrl = videoId(url);
    setVideoUrl(videoUrl);
    showModal();
  }


  useEffect(() => {
    fetchExercises();
  }, [])

  const renderItem = ({ item }) => {
    const {
      _id,
      thumbnail,
      content_title,
      description,
      author,
      url
    } = item || {};

    const renderVideo = () => {
      return(
        <View style={{
          borderWidth: 1, borderColor: '#ccc', marginBottom: 20,
          // height: SCREEN_HEIGHT,
          flex: 1
        }}>
          <TouchableOpacity onPress={() => openVideoModal(url)}>
            <Card.Cover source={{ uri: thumbnail[0] }} />
          </TouchableOpacity>

          <KitSpace height={10} />
          <Card.Content>

            <KitText onPress={() => openVideoModal(url)} variant="titleLarge">{content_title}</KitText>
          </Card.Content>

          <KitSpace height={10} />

          <Card.Actions style={{ flexWrap: 'wrap' }}>
            <Chip icon="account-check" mode="flat">By:- {author}</Chip>
            <Chip icon="share-variant" mode="flat" onPress={() => onShare(content_title, description, author)}>Share</Chip>
          </Card.Actions>
        </View>
      )
    }

    const renderArticle = () => {
      return(
        <View style={{
          borderWidth: 1, borderColor: '#ccc', marginBottom: 20, paddingVertical:10,
          // height: SCREEN_HEIGHT,
          flex: 1
        }}>
          <Card.Content>
            <KitText
              onPress={() => navigation.navigate('ArticleDetails', { url: url[0], title: content_title })}
              // onPress={()=>openPdf(url[0])}
              variant="titleLarge">{content_title} ff</KitText>
          </Card.Content>

          <KitSpace height={10} />
          <Card.Content>
            <KitText variant="bodyLarge">{description}</KitText>
          </Card.Content>

          <KitSpace height={10} />

          <View style={{ paddingHorizontal: 10, flex: 1 }}>
            <Chip icon="account-check" mode="flat">{author}</Chip>

            <KitSpace height={10} />

            <Chip icon="share-variant" mode="flat" onPress={() => onShare(content_title, description, author)}>Share</Chip>


          </View>
        </View>
      )
    }

    return (
      <React.Fragment key={_id}>
        {item?.content_form === 'ARTICLES' ? renderArticle(item) : renderVideo(item)}
      </React.Fragment>
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
          ListHeaderComponent={excerciseData && excerciseData.length && renderListHeader}
          // nestedScrollEnabled
          data={excerciseData}
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
          // initialNumToRender={1}
          // onScrollEndDrag={() => setScrollToBottomVisible(true)}
          // onScrollBeginDrag={() =>
          //   setScrollToBottomVisible(!scrollToBottomVisible)
          // }
          // inverted
          onEndReached={onEndReachedHandle}
          onEndReachedThreshold={0.1}
        />

      </View>
      <Portal>
        <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <View style={{ padding: 10, }}>
            <AwesomeIcon onPress={() => hideModal()} name="times" size={25} style={{ margin: 10, textAlign: 'right', marginBottom: 10 }} color="#000" />

            <KitVideoPlayer
              height={250}
              play={playing}
              videoId={videoUrl}//i8kgJv8ykho, iee2TATGMyI, Wi_dQEtX4AQ
              onChangeState={onStateChange}
            />
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  )
}

export default Exercises;