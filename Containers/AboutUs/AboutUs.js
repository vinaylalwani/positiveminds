import React, { useState, useEffect } from "react";
import { View, ScrollView } from 'react-native';
import { KitText, KitLoader } from '../../Components';
import { Colors } from '../../Theme';
import { getAboutUsApi } from "../../Services/API/AboutApi";
import styles from "./AboutUsStyle";

import Snackbar from "react-native-snackbar";

function AboutUs({ navigation, route }) {
  const [loader, setLoader] = useState(false);
  const [aboutDetails, setAboutDetails] = useState([]);

  const fetchAboutDetails = () => {
    getAboutUsApi()
      .then(res => {
        // console.warn('abbout page res', res);
        if (res) {
          setAboutDetails(res?.data?.data);
          setLoader(false);
        }
      })
      .catch(err => {
        // console.log('abbout err', err);
        setLoader(false);
        Snackbar.show({
          text: err.message,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: Colors.error,
        });

      });
  }

  useEffect(()=> {
    // fetchAboutDetails();
  })

  return (
    <View
      style={styles.container}>
      {loader &&
          <KitLoader />
        }

      <ScrollView
        // keyboardDismissMode="on-drag"
        // keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          padding:10,
          // ...Alignment.mainCenter,
          // ...Alignment.fill,
        }}>
      <KitText variant="headlineLarge" style={{marginBottom:10}}>Positive Minds</KitText>
      <KitText variant="bodyLarge" style={{marginBottom:10}}>
      PositiveMinds helps build positive thinking and develop emotional intelligence (EQ).
Based on the concept "Impressions generate thoughts, and Thoughts create actions", PositiveMinds provide quote of the Day, articles, videos, music, stories, music, exercises and books to build a strong mental foundation on Positivity.</KitText>
<KitText variant="bodyLarge">
In order to help remain resilient and operate with positivity through the day, PositiveMinds sends a positive quote of the day to initiate the morning thought process with positivity. The users can benefit from the rich content to effectively manage stress and anxiety, The users can pick and choose the rich resources in the App including articles, videos, music, exercises and books to build a strong foundation and deal/solve problems with positivity and mindfulness.
      </KitText>
      </ScrollView>
    </View>
  )
}

export default AboutUs