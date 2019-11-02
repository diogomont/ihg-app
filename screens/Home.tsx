import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Icon } from "../components/Icon";
import { constants } from "../constants/constants";

export const Home = () => {
  return (
    <View style={styles.container}>
      <Icon />
      <View>
        <Text style={styles.headerText}>Generate hash tags</Text>
        <TextInput
          style={styles.textInput}
          value="#kimchi #architecture #fashion"
        />
        {/* TODO: Figure out how to add that smaller shadow to the button */}
        <TouchableOpacity
          onPress={() => console.log("Search clicked")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>About</Text>
        <View style={{}}>
          <Text style={styles.weakText}>
            IHG is a hashtag generator and description editor
          </Text>
          <Text style={styles.weakText}>
            We want to help you create well formatted profile descriptions with
            provide options for up to 30 popular hash tags to help grow your
            instagram network.
          </Text>
          <Text style={styles.weakText}>
            Curious to how this product works? Check out our tutorial
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => console.log("Search clicked")}
          style={styles.learnMoreButton}
        >
          <Text style={styles.learnMoreButtonText}>LEARN MORE</Text>
        </TouchableOpacity>
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
