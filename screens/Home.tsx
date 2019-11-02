import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Icon } from "../components/Icon";
import { constants } from "../constants/constants";

export const Home = () => {
  return (
    <View style={styles.container}>
      <Icon />
      <View>
        <Text
          style={{
            color: "red",
            fontFamily: "InterBold",
            fontSize: 16,
            marginBottom: 10,
            marginTop: 15
          }}
        >
          Generate hash tags
        </Text>
        <TextInput
          style={{
            backgroundColor: "#EAF2FF",
            color: "#97ABCB",
            fontFamily: "RobotoMonoBold",
            fontSize: 16,
            height: 50,
            marginBottom: 6,
            paddingHorizontal: 12
          }}
          value="#kimchi #architecture #fashion"
        />
        <Button
          style={{ backgroundColor: "#FF0000", borderRadius: "8px" }}
          title="SEARCH"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: constants.containerPadding,
    margin: 22,
    // flex: 1,
    backgroundColor: "#fff"
  }
});
