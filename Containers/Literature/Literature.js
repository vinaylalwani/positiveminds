import React, { useState, useCallback, useRef } from "react";
import { View, ScrollView, ImageBackground, SafeAreaView, FlatList } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";
import { Button, Card, Divider, Chip } from 'react-native-paper';
import { KitText, KitVideoPlayer, KitSpace } from '../../Components';
import { Alignment, GlobalStyle, Spacer } from '../../Theme';
import styles from "./LiteratureStyle";

function Literature({ navigation }) {
  const [articleData, setArticleData] = useState([
    {
      "_id": "65a128522dd54a29013f4446",
      "content_id": "40a889ec-76c6-4a9d-945b-3335fb540ccb",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "Talk to yourself once in a day, otherwise you may miss meeting an intelligent person in this world.",
      "persona_category": "Persona1",
      "content_destination": "DB",
      "content_source": "Google",
      "qoutes_day": 1,
      "author": "Vivekananda",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T11:53:54.121Z",
      "updatedAt": "2024-01-12T11:53:54.121Z",
      "__v": 0
    },
    {
      "_id": "65a13c712dd54a29013f444e",
      "content_id": "da0b3bab-a528-4f27-8075-504a1add853d",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "End is not the end if fact E.N.D. Means \"Efforts Never Dies.",
      "persona_category": "Persona1",
      "content_destination": "DB",
      "content_source": "pw.live website",
      "qoutes_day": 11,
      "author": "Dr. A.P.J. Abdul Kalam",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:19:45.686Z",
      "updatedAt": "2024-01-12T13:19:45.686Z",
      "__v": 0
    },
    {
      "_id": "65a13c872dd54a29013f4450",
      "content_id": "e3d194db-7c8f-4d75-9581-c996ac21ad34",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "Education is the most powerful weapon you can use to change the world.",
      "persona_category": "Persona1",
      "content_destination": "DB",
      "content_source": "pw.live website",
      "qoutes_day": 12,
      "author": "Nelson Mandela",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:20:07.947Z",
      "updatedAt": "2024-01-12T13:20:07.947Z",
      "__v": 0
    },
    {
      "_id": "65a13c882dd54a29013f4452",
      "content_id": "2f9ea13b-d3fe-4622-adcf-c695fe7c7c89",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "A person who never made a mistake never tried anything new.",
      "persona_category": "Persona1",
      "content_destination": "DB",
      "content_source": "pw.live website",
      "qoutes_day": 13,
      "author": "Albert Einstein",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:20:08.458Z",
      "updatedAt": "2024-01-12T13:20:08.458Z",
      "__v": 0
    },
    {
      "_id": "65a13c882dd54a29013f4454",
      "content_id": "27394cf2-874d-4c5f-af1a-27bd573c1630",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "There are plenty of difficult obstacles in your path. Don't allow yourself to become one of them.",
      "persona_category": "Persona1",
      "content_destination": "DB",
      "content_source": "pw.live website",
      "qoutes_day": 14,
      "author": "Ralph Marston",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:20:08.923Z",
      "updatedAt": "2024-01-12T13:20:08.923Z",
      "__v": 0
    },
    {
      "_id": "65a13c892dd54a29013f4456",
      "content_id": "2fff6073-6eee-440a-bea0-481ac071ab52",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "Only I can change my life. No one can do it for me.",
      "persona_category": "Persona1",
      "content_destination": "DB",
      "content_source": "pw.live website",
      "qoutes_day": 15,
      "author": "Carol Burnett",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:20:09.389Z",
      "updatedAt": "2024-01-12T13:20:09.389Z",
      "__v": 0
    },
    {
      "_id": "65a13c892dd54a29013f4458",
      "content_id": "6e3e935a-60b8-440a-852c-8a7c3d6fdd50",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "I think I can. I know I can.",
      "persona_category": "Persona1",
      "content_destination": "DB",
      "content_source": "pw.live website",
      "qoutes_day": 16,
      "author": "Jennifer Wittwer",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:20:09.878Z",
      "updatedAt": "2024-01-12T13:20:09.878Z",
      "__v": 0
    },
    {
      "_id": "65a13c8b2dd54a29013f445a",
      "content_id": "a30b199c-b700-49c4-9843-70db296166f9",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "Learning is never done without error, and defeat",
      "persona_category": "Persona1",
      "content_destination": "DB",
      "content_source": "pw.live website",
      "qoutes_day": 17,
      "author": "Vladimir Lenin",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:20:11.283Z",
      "updatedAt": "2024-01-12T13:20:11.283Z",
      "__v": 0
    },
    {
      "_id": "65a13c8b2dd54a29013f445c",
      "content_id": "5f212db5-0960-45d1-b52d-50a6da90c500",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "You must be the change you wish to see in the world.",
      "persona_category": "Persona1",
      "content_destination": "DB",
      "content_source": "pw.live website",
      "qoutes_day": 18,
      "author": "Mahatma Gandhi",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:20:11.749Z",
      "updatedAt": "2024-01-12T13:20:11.749Z",
      "__v": 0
    },
    {
      "_id": "65a13c8c2dd54a29013f445e",
      "content_id": "6efc8cb7-a4c2-43ac-a9cb-dc1c4cda7390",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "There is no substitute for hard work",
      "persona_category": "Persona1",
      "content_destination": "DB",
      "content_source": "pw.live website",
      "qoutes_day": 19,
      "author": "Thomas Alva Edison",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:20:12.243Z",
      "updatedAt": "2024-01-12T13:20:12.243Z",
      "__v": 0
    },
    {
      "_id": "65a13c8c2dd54a29013f4460",
      "content_id": "7b146b65-c6b3-4c71-97c1-f0a653110ba1",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "Don't wait for the opportunity. Create it.",
      "persona_category": "Persona1",
      "content_destination": "DB",
      "content_source": "pw.live website",
      "qoutes_day": 20,
      "author": "George Bernard Shaw",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:20:12.704Z",
      "updatedAt": "2024-01-12T13:20:12.704Z",
      "__v": 0
    },
    {
      "_id": "65a13c8d2dd54a29013f4462",
      "content_id": "a72a6e64-ed0a-4c36-a87f-ee634fdece18",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "Aging is not �lost youth� but a new stage of opportunity and strength.",
      "persona_category": "Persona2",
      "content_destination": "DB",
      "content_source": "homeinstead website",
      "qoutes_day": 11,
      "author": "Betty Friedan",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:20:13.188Z",
      "updatedAt": "2024-01-12T13:20:13.188Z",
      "__v": 0
    },
    {
      "_id": "65a13c8d2dd54a29013f4464",
      "content_id": "90ef2fa0-834f-485a-8bc8-dc2ed7e17139",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "The longer I live, the more beautiful life becomes.",
      "persona_category": "Persona2",
      "content_destination": "DB",
      "content_source": "homeinstead website",
      "qoutes_day": 12,
      "author": "Frank Lloyd Wright",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:20:13.681Z",
      "updatedAt": "2024-01-12T13:20:13.681Z",
      "__v": 0
    },
    {
      "_id": "65a13c8e2dd54a29013f4466",
      "content_id": "2e2ae0a7-029c-4d8a-ba56-e8452829dad2",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "In the end, it�s not the years in your life that count. It�s the life in your years.",
      "persona_category": "Persona2",
      "content_destination": "DB",
      "content_source": "homeinstead website",
      "qoutes_day": 13,
      "author": "Abraham Lincoln",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:20:14.152Z",
      "updatedAt": "2024-01-12T13:20:14.152Z",
      "__v": 0
    },
    {
      "_id": "65a13c8f2dd54a29013f4468",
      "content_id": "0c636757-5dd1-4392-a995-c780f99295fd",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "Count your age by friends, not years. Count your life by smiles, not tears.",
      "persona_category": "Persona2",
      "content_destination": "DB",
      "content_source": "homeinstead website",
      "qoutes_day": 14,
      "author": "John Lennon",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:20:15.437Z",
      "updatedAt": "2024-01-12T13:20:15.437Z",
      "__v": 0
    },
    {
      "_id": "65a13c8f2dd54a29013f446a",
      "content_id": "4fa9aeb3-6726-4b7b-bca9-ccaa1c55e7f7",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "Aging has a wonderful beauty, and we should have respect for that.",
      "persona_category": "Persona2",
      "content_destination": "DB",
      "content_source": "homeinstead website",
      "qoutes_day": 15,
      "author": "Eartha Kitt",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:20:15.902Z",
      "updatedAt": "2024-01-12T13:20:15.902Z",
      "__v": 0
    },
    {
      "_id": "65a13c902dd54a29013f446c",
      "content_id": "2dd40778-bd7b-48ef-8fcf-85e4ad1b6723",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "Age is just a number. Life and aging are the greatest gifts that we could possibly ever have.",
      "persona_category": "Persona2",
      "content_destination": "DB",
      "content_source": "homeinstead website",
      "qoutes_day": 16,
      "author": "Cicely Tyson",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:20:16.358Z",
      "updatedAt": "2024-01-12T13:20:16.358Z",
      "__v": 0
    },
    {
      "_id": "65a13c902dd54a29013f446e",
      "content_id": "169b9d3c-dda8-48ea-a467-af6c607a651b",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "The ordinary experiences of aging alter and clarify your view of past, present and future.",
      "persona_category": "Persona2",
      "content_destination": "DB",
      "content_source": "homeinstead website",
      "qoutes_day": 17,
      "author": "Edith Pearlman",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:20:16.845Z",
      "updatedAt": "2024-01-12T13:20:16.845Z",
      "__v": 0
    },
    {
      "_id": "65a13c912dd54a29013f4470",
      "content_id": "36b31a42-44a8-49b9-97cd-fd62d8019e55",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "Aging is just another word for living.",
      "persona_category": "Persona2",
      "content_destination": "DB",
      "content_source": "homeinstead website",
      "qoutes_day": 18,
      "author": "Cindy Joseph",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:20:17.322Z",
      "updatedAt": "2024-01-12T13:20:17.322Z",
      "__v": 0
    },
    {
      "_id": "65a13c912dd54a29013f4472",
      "content_id": "a41fa600-44c0-4bcb-9418-3358e1572721",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "Aging is not an option, not for anyone. It is how gracefully we handle the process and how lucky we are, as the process handles us.",
      "persona_category": "Persona2",
      "content_destination": "DB",
      "content_source": "homeinstead website",
      "qoutes_day": 19,
      "author": "Cindy McDonal",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:20:17.798Z",
      "updatedAt": "2024-01-12T13:20:17.798Z",
      "__v": 0
    },
    {
      "_id": "65a13c922dd54a29013f4474",
      "content_id": "e0a8ad6b-9fa7-4e3a-a58e-0d38dc041b33",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "Beautiful young people are accidents of nature, but beautiful old people are works of art.",
      "persona_category": "Persona2",
      "content_destination": "DB",
      "content_source": "homeinstead website",
      "qoutes_day": 20,
      "author": "Eleanor Roosevelt",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-12T13:20:18.268Z",
      "updatedAt": "2024-01-12T13:20:18.268Z",
      "__v": 0
    },
    {
      "_id": "65a574962dd54a29013f448d",
      "content_id": "66e7a86a-62e7-430a-9486-04c60dbb9eb5",
      "content_type": "QUOTES",
      "content_title": "Motivation Quotes",
      "description": "Talk to yourself once in a day, otherwise you may miss meeting an intelligent person in this world.",
      "persona_category": "Persona1",
      "content_destination": "DB",
      "content_source": "Google",
      "qoutes_day": 1,
      "author": "Vivekananda",
      "author_type": "EXTERNAL",
      "url": [],
      "is_verified": true,
      "createdAt": "2024-01-15T18:08:22.985Z",
      "updatedAt": "2024-01-15T18:08:22.985Z",
      "__v": 0
    }
  ])

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

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
      <Card style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 20, }} key={_id}>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Title title={content_title} />

        {/* <Card.Actions style={{ flexWrap: 'wrap', alignSelf: 'flex-start' }}>

          <Chip
            // icon="account-star" 
            disabled>#{content_title}</Chip>
        </Card.Actions> */}
        <Card.Content>
          <KitText variant="bodyLarge">{description}</KitText>
        </Card.Content>

        <KitSpace height={10} />

        {/* <Divider /> */}


        <Card.Actions style={{ flexWrap: 'wrap' }}>

          <Chip icon="account-check" mode="flat">{author}</Chip>

          <Chip icon="share-variant" mode="flat" onPress={() => alert('share')}>Share</Chip>
        </Card.Actions>
      </Card>
    )
  }

  return (
    <SafeAreaView style={Alignment.fill}>
      <View style={styles.container}>

        <FlatList
          // ListHeaderComponent={renderListHeader}
          // nestedScrollEnabled
          data={articleData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          // onRefresh={onRefreshHandle}
          // refreshing={isRefreshing}
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
          initialNumToRender={10}
          // onScrollEndDrag={() => setScrollToBottomVisible(true)}
          // onScrollBeginDrag={() =>
          //   setScrollToBottomVisible(!scrollToBottomVisible)
          // }
          // inverted
          onEndReached={() => {
            // console.log('end');
          }}
          onEndReachedThreshold={0.1}
        />





      </View>
    </SafeAreaView>
  )
}

export default Literature;