import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  Paragraph,
  Portal,
  Headline,
  TextInput,
  Title,
} from "react-native-paper";
import { colors } from "../common/colors";
import Spacer from "../components/Spacer";
import { useDispatch } from "react-redux";
import { GOTO_ADMIN } from "../redux/actions/app";
import { ADMIN_LOGIN } from "../database/AccountTable";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [secured, setSecured] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const goBackToClient = () => {
    dispatch(GOTO_ADMIN(false));
  };

  const verifyLogin = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      if (username && password) {
        const data = {
          email: username.trim(),
          password: password.trim(),
        };
        const res = await ADMIN_LOGIN(data);
        if (res.success) {
          // store account to redux
          navigation.replace("AdminHomePage");
        } else {
          // have error message here
          console.log(
            "🚀 ~ file: LoginScreen.js:47 ~ verifyLogin ~ res.failed.error",
            res.failed.error
          );
          setErrorMessage(res.failed.error);
        }
      } else {
        setErrorMessage("Complete input Fields");
      }
    } catch (error) {
      console.log("verifyLogin error:", error);
    }
    setIsLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={[{ justifyContent: "center", flex: 1 }]}>
      <View style={styles.container}>
        <Headline style={{ textAlign: "center", fontWeight: "bold" }}>
          ADMIN
        </Headline>
        <Paragraph style={{ color: colors.RED01, textAlign: "center" }}>
          {errorMessage ? errorMessage : ""}
        </Paragraph>
        <View style={{ paddingHorizontal: 5 }}>
          <Title>Username</Title>
          <TextInput
            value={username}
            mode="outlined"
            onChangeText={(text) => setUsername(text)}
            autoCapitalize="none"
          />
          <Title>Password</Title>
          <TextInput
            value={password}
            mode="outlined"
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
            secureTextEntry={secured}
            right={
              <TextInput.Icon
                name={secured ? "eye" : "eye-off"}
                onPress={() => setSecured(!secured)}
                color={colors.GRAY600}
              />
            }
          />
          <Spacer />
        </View>
      </View>

      <Button
        icon="login"
        mode="contained"
        loading={isLoading}
        disabled={isLoading}
        style={styles.loginBTn}
        onPress={verifyLogin}
        labelStyle={{ padding: 10, fontSize: 16, fontWeight: "bold" }}
      >
        LOGIN
      </Button>
      <Spacer></Spacer>
      <Button
        icon="cancel"
        mode="contained-tonal"
        loading={isLoading}
        disabled={isLoading}
        style={[styles.loginBTn, { backgroundColor: colors.RED01 }]}
        onPress={goBackToClient}
        labelStyle={{
          padding: 10,
          fontSize: 16,
          fontWeight: "bold",
          color: "white",
        }}
        color={colors.RED01}
      >
        cancel
      </Button>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
  },
  remember: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    paddingVertical: 5,
  },
  loginBTn: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
  },
});
