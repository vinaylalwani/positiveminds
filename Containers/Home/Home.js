import React, { useState, useEffect } from "react";
import { View, ImageBackground } from 'react-native'
import { Card, Chip } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KitText, KitSpace, KitLoader } from '../../Components';
import styles from "./HomeStyle";
import { getQuotesOfDayApi } from "../../Services/API/QuotesApi";

function Home({ navigation }) {
  const [quotesData, setQuotesData] = useState({});
  const [loader, setLoader] = useState(true);
  const [isRefreshing, setIsRefresh] = useState(false);

  const fetchQuotes = async () => {
    let token = await AsyncStorage.getItem('token');
    
    if(token) {
      getQuotesOfDayApi(token)
        .then(res => {
          // console.warn('quotes of day page res', res);
          if (res) {
            setQuotesData(res?.data?.data);
            setLoader(false);
            setIsRefresh(false);
          }
        })
        .catch(err => {
          // console.warn('quotes of day err', err);
          setLoader(false);
          setIsRefresh(false);
        });
    }
  }


  useEffect(() => {
    fetchQuotes();
  }, [])

  const image = { uri:'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=3308&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'  };
  

  // 'https://images.unsplash.com/photo-1682686578615-39549501dd08?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW90aXZhdGlvbiUyQyUyMHN1bnJpc2V8ZW58MHx8MHx8fDA%3D'

  if(loader) {
    return (<KitLoader />)
  }

  return (<View style={{ flex: 1, backgroundColor: 'white', padding:10 }}>

    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{
        borderWidth: 1, borderColor: '#ccc', marginBottom: 20,
        // height:200,
        flex: 1
      }}
      >
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
          {/* <Card.Title title={content_title}/> */}
          <Card.Actions style={{ flexWrap: 'wrap', alignSelf: 'flex-start', justifyContent: "flex-start", }}>

            <Chip
              disabled
            // icon="account-star" 
            >#{quotesData?.content_title}</Chip>
          </Card.Actions>
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, flex: 1 }}>

            {/* <Card.Content > */}
            <KitText  variant="titleMedium" style={{ backgroundColor: 'rgba(0,0,0,0.1)', textAlign: 'center', color: '#fff', fontWeight: 'bold',  }}>~ Quote of the day ~</KitText>

            <KitSpace height={10} />

            <KitText  variant="titleMedium" style={{ backgroundColor: 'rgba(0,0,0,0.1)', textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>"{quotesData?.description}"</KitText>
            {/* </Card.Content> */}
          </View>

          <KitSpace height={10} />

          {/* <Divider /> */}


          <Card.Actions style={{ flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'flex-end' }}>

            <Chip icon="account-check" mode="flat">By:- {quotesData?.author}</Chip>

            {/* <Chip icon="share-variant" mode="flat" onPress={() => onShare(quotesData.Quote, quotesData.Quote, quotesData.author)}>Share</Chip> */}
          </Card.Actions>
        </ImageBackground>

      </View>

    </View>
  </View>
  )
}

export default Home