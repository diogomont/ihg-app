import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Animated } from "react-native";

// TODO make imports more pure
import { Icon } from "../components/Icon";
import { Button } from "../components/Button";
import { constants } from "../constants/constants";

const TEXT_1 = `IHG is a hashtag generator and description editor`;
const TEXT_2 = `We want to help you create well formatted profile descriptions with provided options for up to 30 popular hash tags to help grow your instagram network.`;
const TEXT_3 = `Curious to how this product works? Check out our tutorial`;

export const Home = () => {
  // TODO have a text input handler that automatically adds the hashtag if user hasn't manually added it
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);

  const [fadeAnim] = useState(new Animated.Value(1));

  const fade = () =>
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500
    }).start();

  const unfade = () =>
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500
    }).start();

  return (
    <View
      style={[
        styles.container,
        { transform: [{ translateY: searching ? -72 : 0 }] }
      ]}
    >
      <Icon opacity={fadeAnim} />
      <Text style={styles.headerText}>Generate hash tags</Text>
      <TextInput
        onBlur={() => {
          unfade();
          setSearching(false);
        }}
        onFocus={() => {
          fade();
          setSearching(true);
        }}
        onChangeText={text => setSearchTerm(text)}
        placeholder="#kimchi, #architecture, #fashion"
        returnKeyType="search"
        style={styles.textInput}
        value={searchTerm}
      />

      {searching ? null : (
        /* TODO: Figure out how to add that smaller shadow to the button */
        <>
          <Button
            onPress={() => {
              setSearching(false);
              console.log("Search clicked");
            }}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            text="SEARCH"
          />
          <Text style={styles.headerText}>About</Text>
          <View style={{}}>
            <Text style={styles.weakText}>{TEXT_1}</Text>
            <Text style={styles.weakText}>{TEXT_2}</Text>
            <Text style={styles.weakText}>{TEXT_3}</Text>
          </View>
          <Button
            onPress={() => {
              console.log("Learn more clicked");
            }}
            buttonStyle={styles.learnMoreButton}
            textStyle={styles.learnMoreButtonText}
            text="LEARN MORE"
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: constants.containerPadding,
    margin: 22,
    // flex: 1,
    backgroundColor: "#fff"
  },
  textInput: {
    backgroundColor: "#EAF2FF",
    color: "#97ABCB",
    fontFamily: "RobotoMonoBold",
    fontSize: 16,
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 12
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FF0000",
    borderRadius: 8,
    justifyContent: "center",
    height: 50,
    marginBottom: 60
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "InterBlack",
    letterSpacing: 1
  },
  headerText: {
    color: "red",
    fontFamily: "InterBold",
    fontSize: 16,
    marginBottom: 10,
    marginTop: 15
  },
  weakTextContainer: {
    paddingRight: 30,
    marginBottom: 40
  },
  weakText: {
    color: "#97ABCB",
    fontFamily: "InterBold",
    fontSize: 18,
    marginBottom: 20
  },
  learnMoreButton: {
    alignItems: "center",
    borderColor: "#FF0000",
    borderWidth: 2,
    justifyContent: "center",
    height: 50,
    marginBottom: 60,
    width: "40%"
  },
  learnMoreButtonText: {
    color: "#FF0000",
    fontSize: 16,
    fontFamily: "InterBlack",
    letterSpacing: 1
  }
});
