import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import Swiper from "react-native-swiper";
import { colors } from "../common/colors";
import { Rating } from "react-native-ratings";

import { Appbar, TextInput } from "react-native-paper";
import { scale } from "react-native-size-matters";
import { generateUid } from "../common/Utils";
import { GET_ALL_QUESTION } from "../database/QuestionTable";
import SurveyScreen from "../components/SurveyScreen";

const START_IMAGE = require("../../assets/images/star05.png");

const ClientSurveyScreen = ({ navigation }) => {
  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
  };

  const ClientUID = generateUid();
  console.log(
    "🚀 ~ file: ClientSurveyScreen.js:18 ~ ClientSurveyScreen ~ ClientUID",
    ClientUID
  );

  const [Questions, setQuestions] = useState([]);
  const [CLientResponse, setCLientResponse] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);

  const getAllQuestions = async () => {
    try {
      const res = await GET_ALL_QUESTION();
      if (res.success && res.success.rows.length > 0) {
        setQuestions(res.success.rows);
        console.log(
          "🚀 ~ file: ClientSurveyScreen.js:35 ~ getAllQuestions ~ res.success.rows",
          res.success.rows
        );
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: ClientSurveyScreen.js:36 ~ getAllQuestions ~ error",
        error
      );
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: colors.SAFFRONYELLOWDARK }}>
        <Appbar.Content
          title={"Survey"}
          titleStyle={{
            fontSize: scale(10),
            fontWeight: "bold",
            color: "white",
          }}
        />
        <Appbar.Action
          icon="close"
          label={"close"}
          onPress={() => navigation.goBack()}
          color={"white"}
        />
      </Appbar.Header>

      <View>
        {Questions.map((item, index) => (
          <View
            key={index}
            style={{
              borderRadius: 5,
              backgroundColor: "white",
              padding: 20,
              marginTop: 20,
              marginHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: scale(10) }}>{`${index + 1}. ${
              item?.Question
            }`}</Text>
            {item?.WithRating == 1 && (
              <Rating
                type="custom"
                ratingImage={START_IMAGE}
                ratingColor={colors.SAFFRONYELLOW}
                ratingBackgroundColor="#c8c7c8"
                ratingCount={item?.MaxRating}
                imageSize={50}
                showRating
                onFinishRating={(rating) => {
                  console.log(
                    "🚀 ~ file: SurveyScreen.js:15 ~ SurveyScreen ~ rating",
                    rating
                  );
                  return;
                }}
              />
            )}
            {item?.WithInput == 1 && (
              <TextInput
                label=""
                value={null}
                mode="outlined"
                onChangeText={(text) => {}}
                style={{
                  fontSize: scale(8),
                  marginVertical: 20,
                }}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default ClientSurveyScreen;

const styles = StyleSheet.create({});
