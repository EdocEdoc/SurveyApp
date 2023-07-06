import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import Swiper from "react-native-swiper";
import { colors } from "../common/colors";
import { Rating, AirbnbRating } from "react-native-ratings";
import { Headline, Title } from "react-native-paper";
import { useOrientation } from "../common/orientation";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { GOTO_ADMIN } from "../redux/actions/app";

const HomePage = ({ navigation }) => {
  const orientation = useOrientation();
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, backgroundColor: colors.SAFFRONYELLOWDARK }}>
      <View
        style={{
          flexDirection: orientation != "PORTRAIT" ? "row" : "column",
          flex: 1,
        }}
      >
        <TouchableOpacity
          delayLongPress={5000}
          onLongPress={() => dispatch(GOTO_ADMIN(true))}
          activeOpacity={0.6}
          style={{
            flex: 1,
            backgroundColor: colors.SAFFRONYELLOWDARK,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/images/CGM.png")}
            style={{
              width: "50%",
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ClientSurveyScreen")}
          style={{
            flex: 1,
            backgroundColor: colors.SAFFRONYELLOW,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="create-outline" size={120} color={"white"} />
          <Text
            style={{
              color: "white",
              fontSize: 30,
            }}
          >
            Take Survey
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
