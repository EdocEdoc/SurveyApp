import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Rating, AirbnbRating } from "react-native-ratings";

const SurveyScreen = ({ navigation, Question, index }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>SurveyScreen</Text>
      <Rating
        type="star"
        ratingCount={3}
        imageSize={60}
        showRating
        onFinishRating={(rating) => {
          console.log(
            "🚀 ~ file: SurveyScreen.js:15 ~ SurveyScreen ~ rating",
            rating
          );
          return;
        }}
      />
    </View>
  );
};

export default SurveyScreen;

const styles = StyleSheet.create({});
