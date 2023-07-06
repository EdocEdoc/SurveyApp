import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput, Switch, Divider, Button } from "react-native-paper";
import { scale } from "react-native-size-matters";
import { Rating } from "react-native-ratings";
import { INSERT_QUESTION, UPDATE_QUESTIONS } from "../database/QuestionTable";
import { colors } from "../common/colors";

const AddQuestionScreen = ({ navigation, route }) => {
  const question = route.params?.question;
  const [RatingSwitch, setRatingSwitch] = useState(
    question ? Boolean(question.WithRating) : false
  );
  const [InputSwitch, setInputSwitch] = useState(
    question ? Boolean(question.WithInput) : true
  );
  const [IsLoading, setIsLoading] = useState(false);
  const [Question, setQuestion] = useState(question ? question.Question : null);
  const [MaxRating, setMaxRating] = useState(
    question ? question.MaxRating : 10
  );
  const [InputTittle, setInputTittle] = useState(
    question ? question.InputTittle : "Answer"
  );
  const [ErrorMessage, setErrorMessage] = useState(null);

  const onSave = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = {
        Question: Question,
        WithRating: RatingSwitch ? 1 : 0,
        MaxRating: MaxRating,
        WithInput: InputSwitch ? 1 : 0,
        InputTittle: InputTittle,
      };
      let res = null;
      if (question) {
        res = await UPDATE_QUESTIONS({ ...data, id: question.id });
      } else {
        res = await INSERT_QUESTION(data);
      }
      if (res?.success) {
        navigation.goBack();
      } else if (res?.failed) {
        setErrorMessage(res.failed);
      }
    } catch (error) {
      console.log("🚀 ~ file: AddQuestionScreen.js:19 ~ onSave ~ error", error);
    }
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ padding: 20 }} contentContainerStyle={{ flex: 1 }}>
        <TextInput
          label="Question"
          value={Question}
          mode="outlined"
          onChangeText={(text) => setQuestion(text)}
          numberOfLines={4}
          multiline
          style={{
            fontSize: scale(10),
            textAlign: "center",
            paddingVertical: 20,
          }}
        />
        <View
          style={{
            marginTop: 20,
            borderWidth: 0,
            borderColor: "gray",
            borderRadius: 5,
            padding: 15,
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: scale(8), textAlignVertical: "center" }}>
              Rating
            </Text>
            <Switch
              value={RatingSwitch}
              onValueChange={() => setRatingSwitch(!RatingSwitch)}
            />
          </View>
          <Divider />
          {RatingSwitch && (
            <View style={{ width: "100%", paddingVertical: 20 }}>
              <Rating
                type="star"
                ratingCount={MaxRating}
                imageSize={scale(12)}
                showRating
                onFinishRating={(rating) => {
                  console.log(
                    "🚀 ~ file: AddQuestionScreen.js:57 ~ AddQuestionScreen ~ rating",
                    rating
                  );
                  return;
                }}
              />
              <TextInput
                label="Max Rating"
                value={MaxRating?.toString()}
                mode="outlined"
                onChangeText={(text) => setMaxRating(Number(text))}
                style={{
                  fontSize: scale(8),
                  textAlign: "center",
                  marginTop: 10,
                }}
                keyboardType="numeric"
              />
              <Text
                style={{
                  fontSize: scale(6),
                  color: "gray",
                  fontStyle: "italic",
                  marginTop: 20,
                  textAlign: "center",
                }}
              >
                Toggle Switch to DISABLE
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            marginTop: 20,
            borderWidth: 0,
            borderColor: "gray",
            borderRadius: 5,
            padding: 15,
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: scale(8), textAlignVertical: "center" }}>
              Input Feedback
            </Text>
            <Switch
              value={InputSwitch}
              onValueChange={() => setInputSwitch(!InputSwitch)}
            />
          </View>
          <Divider />
          {InputSwitch && (
            <View
              style={{
                width: "100%",
                paddingVertical: 20,
                justifyContent: "center",
              }}
            >
              <TextInput
                label="Input Title"
                value={InputTittle}
                mode="outlined"
                onChangeText={(text) => setInputTittle(text)}
                style={{
                  fontSize: scale(8),
                  textAlign: "center",
                }}
              />
              <Text
                style={{
                  fontSize: scale(6),
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                Clients can now write a/an{" "}
                <Text style={{ fontSize: scale(6), fontWeight: "bold" }}>
                  {InputTittle}
                </Text>{" "}
                to the Survey Question above.
              </Text>
              <Text
                style={{
                  fontSize: scale(6),
                  color: "gray",
                  fontStyle: "italic",
                  marginTop: 20,
                  textAlign: "center",
                }}
              >
                Toggle Switch to DISABLE
              </Text>
            </View>
          )}
        </View>
        <View style={{ flex: 1 }} />
        <Text
          style={{
            fontSize: scale(6),
            color: colors.RED01,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          {ErrorMessage}
        </Text>
        <Button
          mode="contained"
          style={{ marginVertical: 20, borderRadius: 5 }}
          disabled={IsLoading}
          loading={IsLoading}
          contentStyle={{ padding: 10 }}
          icon={question ? "check" : "plus"}
          labelStyle={{
            fontSize: scale(8),
            fontWeight: "bold",
          }}
          onPress={onSave}
        >
          {question ? "UPDATE" : "ADD"}
        </Button>
      </ScrollView>
    </View>
  );
};

export default AddQuestionScreen;

const styles = StyleSheet.create({});
