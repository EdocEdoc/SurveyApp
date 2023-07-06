import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Appbar,
  Button,
  Caption,
  Dialog,
  FAB,
  Portal,
} from "react-native-paper";
import { colors } from "../common/colors";
import { scale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import { GOTO_ADMIN } from "../redux/actions/app";
import { DELETE_QUESTION, GET_ALL_QUESTION } from "../database/QuestionTable";
import Ionicons from "@expo/vector-icons/Ionicons";

const AdminHomePage = ({ navigation }) => {
  const dispatch = useDispatch();

  const [Questions, setQuestions] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [QuestionToDelete, setQuestionToDelete] = useState(null);

  const getAllQuestions = async () => {
    try {
      const res = await GET_ALL_QUESTION();
      if (res.success && res.success.rows.length > 0) {
        setQuestions(res.success.rows);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: AdminHomePage.js:25 ~ getAllQuestions ~ error",
        error
      );
    }
  };

  const [visible, setVisible] = React.useState(false);

  const showDialog = (question) => {
    setQuestionToDelete(question);
    setVisible(true);
  };

  const hideDialog = () => {
    setQuestionToDelete(null);
    setVisible(false);
  };

  const confirmDialog = async () => {
    try {
      const res = await DELETE_QUESTION(QuestionToDelete?.id, false);
    } catch (error) {}
    setQuestionToDelete(null);
    setVisible(false);
    getAllQuestions();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAllQuestions();
    });
    return unsubscribe;
  }, [navigation]);

  const renderContent = ({ item }) => (
    <View
      style={{
        backgroundColor: "white",
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 5,
        padding: 20,
        flexDirection: "row",
        width: "100%",
      }}
    >
      <Text style={{ fontSize: scale(9), width: "80%" }}>{item.Question}</Text>
      <View
        style={{
          width: "20%",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddQuestionScreen", { question: item })
          }
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Ionicons name="create" size={50} color={colors.SAFFRONYELLOW} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => showDialog(item)}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Ionicons name="trash-bin" size={50} color={colors.RED01} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Appbar.Header style={{ backgroundColor: colors.SAFFRONYELLOWDARK }}>
        <Appbar.Content
          title={"Admin Panel"}
          titleStyle={{
            fontSize: scale(10),
            fontWeight: "bold",
            color: "white",
          }}
        />
        <Appbar.Action
          icon="logout"
          label={"close"}
          onPress={() => dispatch(GOTO_ADMIN(false))}
          color={"white"}
        />
      </Appbar.Header>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text style={{ fontSize: scale(10) }}>
              Are you sure you want to delete question{" "}
              <Text style={{ fontWeight: "bold" }}>
                '{QuestionToDelete?.Question}'
              </Text>{" "}
              ?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <TouchableOpacity onPress={hideDialog}>
              <Text
                style={{
                  color: colors.SAFFRONYELLOW,
                  fontSize: scale(9),
                  marginRight: 20,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmDialog}>
              <Text style={{ color: colors.RED01, fontSize: scale(9) }}>
                Confirm
              </Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FlatList
        data={Questions}
        renderItem={renderContent}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={IsLoading}
            onRefresh={() => getAllQuestions()}
          />
        }
        ListFooterComponent={() => (
          <View style={{ marginTop: 20 }}>
            {Questions?.length > 0 ? (
              <Caption
                style={{
                  margin: 20,
                  textAlign: "center",
                  marginBottom: 50,
                }}
              >
                PULL DOWN TO REFRESH
              </Caption>
            ) : (
              <View>
                <Caption
                  style={{
                    textAlign: "center",
                  }}
                >
                  No available Questions
                </Caption>
                <Button
                  onPress={() => navigation.navigate("AddQuestionScreen")}
                >
                  ADD SURVEY QUESTION
                </Button>
              </View>
            )}
          </View>
        )}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("AddQuestionScreen")}
        variant="tertiary"
        size="medium"
      />
    </View>
  );
};

export default AdminHomePage;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 30,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
});
