import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Svg, { Path } from "react-native-svg";

// TODO make imports more pure
import { Icon } from "../components/Icon";
import { Button } from "../components/Button";
import { constants } from "../constants/constants";
import { LinearGradient } from "expo-linear-gradient";

const TEXT_1 = `IHG is a hashtag generator and description editor`;
const TEXT_2 = `We want to help you create well formatted profile descriptions with provided options for up to 30 popular hash tags to help grow your instagram network.`;
const TEXT_3 = `Curious to how this product works? Check out our tutorial`;
const termsFromLocalStorage = ["#terence", "#bighips", "#scottfromlowes"];
const mockedTerms = [
  `#korean #korea #kdrama #seoul #koreanpop `,
  `#pizza #italianfood #italian #pizzeria #pizzaria #피자 #megherita #dinner #ピザ #pizzaparty #napoli #pizzaislife #pizzalovers `,
  `#taco #tacotuesday #tacos #tacoma #yota `
];

export const Home = () => {
  // TODO have a text input handler that automatically adds the hashtag if user hasn't manually added it
  // TODO simply all this and break it up into components
  const [searchTerm, setSearchTerm] = useState("");
  const [recentlySearchedTerms, setRecentlySearchedTerms] = useState<string[]>(
    termsFromLocalStorage
  );
  const [suggestedHashtagList, setSuggestedHashtagList] = useState<string[]>(
    mockedTerms
  );

  const [searching, setSearching] = useState(false);
  const [showingSearchResults, setShowingSearchResults] = useState(false);

  const [fadeAnim] = useState(new Animated.Value(1));
  const [slideAnim] = useState(new Animated.Value(0));
  const [shadowSlideAnim] = useState(new Animated.Value(1000));

  const fade = () =>
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150
    }).start();

  const unfade = () =>
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400
    }).start();

  const slideUp = () =>
    Animated.spring(slideAnim, {
      toValue: -72
    }).start();

  const slideDown = () =>
    Animated.spring(slideAnim, {
      toValue: 0
    }).start();

  const shadowSlideUp = () =>
    Animated.spring(shadowSlideAnim, {
      toValue: 0
    }).start();

  const shadowSlideDown = () =>
    Animated.spring(shadowSlideAnim, {
      toValue: 500
    }).start();

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }]
          }}
        >
          <Animated.View
            style={[
              styles.container,
              {
                paddingBottom: shadowSlideAnim
              }
            ]}
          >
            <Icon opacity={fadeAnim} />
            {!showingSearchResults ? (
              <Text style={[styles.headerText, { marginTop: 15 }]}>
                Generate hash tags
              </Text>
            ) : (
              <View
                style={{
                  marginTop: 15,
                  marginBottom: -2,
                  width: "100%",
                  flexDirection: "row"
                }}
              >
                <BackButton />
                <View
                  style={{
                    flexGrow: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text style={[styles.headerText, { marginTop: 2 }]}>
                    Your 30 hash tags
                  </Text>
                </View>
              </View>
            )}
            <TextInput
              onFocus={() => {
                fade();
                slideUp();
                shadowSlideUp();
                setShowingSearchResults(false);
                setSearching(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  if (!showingSearchResults) {
                    console.log("\n\nnot showing search results\n\n");
                    unfade();
                    slideDown();
                    shadowSlideDown();
                  }
                }, 0);

                setSearching(false);
              }}
              onChangeText={text => setSearchTerm(text)}
              placeholder="#kimchi, #architecture, #fashion"
              returnKeyType="search"
              onSubmitEditing={() => setShowingSearchResults(true)}
              style={styles.textInput}
              value={searchTerm}
            />

            {!searching && !showingSearchResults && (
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
                <View style={styles.weakTextContainer}>
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
          </Animated.View>
          {!showingSearchResults ? (
            <>
              <LinearGradient
                colors={["#D7D7D7", "#F6F6F6", "#FFF"]}
                style={{ height: 20, marginBottom: -5 }}
              />
              <View style={styles.bottomContainer}>
                <Text style={styles.headerText}>Recently Searched</Text>
                {recentlySearchedTerms.map(term => (
                  <Text style={styles.recentlySearched}>{term}</Text>
                ))}
              </View>
            </>
          ) : (
            <>
              <View style={styles.bottomContainer}>
                <Text>
                  {suggestedHashtagList.map((tag, idx) => (
                    <Text
                      style={[
                        styles.hashTagList,
                        {
                          color:
                            hashTagListColors[idx % hashTagListColors.length]
                        }
                      ]}
                    >
                      {tag}
                    </Text>
                  ))}
                </Text>
              </View>
            </>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    paddingHorizontal: 22,
    backgroundColor: "#fff"
    // box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
    // shadowOffset: { height: 4, width: 0 },
    // shadowColor: "#000",
    // shadowOpacity: 0.25,
    // shadowRadius: 16
  },
  bottomContainer: {
    paddingHorizontal: 22
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
    marginBottom: 10
  },
  weakTextContainer: {
    paddingRight: 30
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
  },
  recentlySearched: {
    color: "#96ABCB",
    fontFamily: "RobotoMonoBold",
    fontSize: 15,
    marginTop: 5,
    marginBottom: 10
  },
  hashTagList: {
    fontFamily: "RobotoMonoBold",
    fontSize: 15,
    marginTop: 5,
    lineHeight: 25,
    marginBottom: 10
  }
});

const hashTagListColors = ["#FF38C7", "#4EFF10", "#13FFD5"];

const BackButton = () => (
  <Svg width="13" height="24" viewBox="0 0 13 24" fill="none">
    <Path d="M11 23L2 12.5L11 1" stroke="#FF0000" strokeWidth="3" />
  </Svg>
);
