import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from "react-native";

// TODO make imports more pure
import { Icon } from "../components/Icon";
import { Button } from "../components/Button";
import { BackButton } from "../components/BackButton";
import { constants } from "../constants/constants";
import { LinearGradient } from "expo-linear-gradient";

const TEXT_1 = `IHG is a hashtag generator and description editor`;
const TEXT_2 = `We want to help you create well formatted profile descriptions with provided options for up to 30 popular hash tags to help grow your instagram network.`;
const TEXT_3 = `Curious to how this product works? Check out our tutorial`;
const termsFromLocalStorage = ["#terence", "#bighips", "#scottfromlowes"];
const mockedTerms = [
  [`#korean`, `#korea`, `#kdrama`, `#seoul`, `#koreanpop`],
  [
    `#pizza`,
    `#italianfood`,
    `#italian`,
    `#pizzeria`,
    `#pizzaria`,
    `#피자`,
    `#megherita`,
    `#dinner`,
    `#ピザ`,
    `#pizzaparty`
  ],
  [
    `#napoli`,
    `#pizzaislife`,
    `#pizzalovers`,
    `#taco`,
    `#tacotuesday`,
    `#tacos`,
    `#tacoma`,
    `#yota`
  ]
];

export const Home = () => {
  // TODO have a text input handler that automatically adds the hashtag if user hasn't manually added it
  // TODO simplify all this and break it up into components
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [recentlySearchedTerms, setRecentlySearchedTerms] = useState<string[]>(
    termsFromLocalStorage
  );
  const [showingSearchResults, setShowingSearchResults] = useState(false);
  const [suggestedHashtagList, setSuggestedHashtagList] = useState<string[]>(
    mockedTerms
  );
  const [error, setError] = useState<Error | null>(null);

  // ANIMATIONS
  const [fadeAnim] = useState(new Animated.Value(1));
  const [slideAnim] = useState(new Animated.Value(0));
  const [shadowSlideAnim] = useState(new Animated.Value(1000));
  const slideUp = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150
    }).start();
    Animated.spring(slideAnim, {
      toValue: -67
    }).start();
    Animated.spring(shadowSlideAnim, {
      toValue: 0
    }).start();
  };
  const slideDown = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400
    }).start();
    Animated.spring(slideAnim, {
      toValue: 0
    }).start();
    Animated.spring(shadowSlideAnim, {
      toValue: 500
    }).start();
  };

  // EVENT HANDLERS
  const reset = () => {
    shadowSlideAnim.setValue(1000);
    slideDown();
    setSearchTerm("");
    setIsTyping(false);
    setShowingSearchResults(false);
    setError(null);
  };
  const handleInputFocus = () => {
    slideUp();
    setShowingSearchResults(false);
    setIsTyping(true);
  };
  const handleInputBlur = () => {
    if (error) {
      return;
    }
    if (!showingSearchResults) {
      slideDown();
    }
    setIsTyping(false);
  };

  // TODO - prevent user from typing in weird symbols
  const handleChangeText = text => {
    setSearchTerm(last => {
      if (text.length < last.length) {
        // They're trying to backspace, so let's not do any wack formatting here
        return text;
      }

      // prevent empty hashtags by spamming spacebar
      if (text.substr(-1) === " ") {
        if (last === "" || last.substr(-1) === "#" || last.substr(-1) === " ") {
          return last;
        }
        if (last.substr(-1) === ",") {
          return `${last} `;
        }
        return `${last}, `;
      }

      const tags = text.split(", ");

      const tagsWithHashes = tags.map(tag => {
        if (tag[0] === "#") {
          return tag;
        }

        return `#${tag}`;
      });

      const joinedTags = tagsWithHashes.join(", ");

      return joinedTags;
    });
  };

  const handleSubmit = () => {
    if (searchTerm === "") {
      setError(new Error("Type something in!"));
    } else {
      setError(null);
      slideUp();
      Keyboard.dismiss();
      setIsTyping(false);
      setShowingSearchResults(true);
    }
  };

  return (
    <>
      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }]
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              <View style={styles.searchResultsHeaderContainer}>
                <BackButton onPress={reset} />
                <View style={styles.centerHeaderText}>
                  <Text style={[styles.headerText, { marginTop: 2 }]}>
                    Your 30 hash tags
                  </Text>
                </View>
              </View>
            )}

            <TextInput
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onChangeText={handleChangeText}
              placeholder="#kimchi, #architecture, #fashion"
              returnKeyType="search"
              onSubmitEditing={handleSubmit}
              enablesReturnKeyAutomatically
              style={[
                styles.textInput,
                error && { borderColor: "orange", borderWidth: 1 }
              ]}
              value={searchTerm}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
            {!showingSearchResults && (
              <Button
                onPress={handleSubmit}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                text="SEARCH"
              />
            )}

            {!isTyping && !showingSearchResults && (
              /* TODO: Figure out how to add that smaller shadow to the button */
              <>
                <Text style={[styles.headerText, { marginTop: 50 }]}>
                  About
                </Text>
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
        </TouchableWithoutFeedback>

        {!showingSearchResults ? (
          <>
            <LinearGradient
              colors={["#D7D7D7", "#F6F6F6", "#FFF"]}
              style={{ height: 20, marginBottom: -5 }}
            />
            <View style={[styles.bottomContainer, { height: "100%" }]}>
              <Text style={styles.headerText}>Recently Searched</Text>
              {recentlySearchedTerms.map(term => (
                <Text key={term} style={styles.recentlySearched}>
                  {term}
                </Text>
              ))}
            </View>
          </>
        ) : (
          <>
            <View style={[styles.bottomContainer, { marginBottom: 20 }]}>
              <Text>
                {suggestedHashtagList.map((tagArray, idx) => (
                  <>
                    <Text
                      style={[
                        styles.hashTagList,
                        {
                          color:
                            hashTagListColors[idx % hashTagListColors.length]
                        }
                      ]}
                    >
                      {tagArray.join(" ")}
                    </Text>
                    <Text> </Text>
                  </>
                ))}
              </Text>
            </View>
            <LinearGradient
              colors={["#D7D7D7", "#F6F6F6", "#FFF"]}
              style={{ height: 20, marginBottom: -5 }}
            />
            <ScrollView>
              {suggestedHashtagList.map(tagArray => (
                <>
                  <Text style={{ backgroundColor: "pink", width: "100%" }}>
                    HEADER
                  </Text>
                  {tagArray.map(tag => (
                    <Text>{tag}</Text>
                  ))}
                </>
              ))}
              {suggestedHashtagList.map(tagArray => (
                <>
                  <Text style={{ backgroundColor: "pink", width: "100%" }}>
                    HEADER
                  </Text>
                  {tagArray.map(tag => (
                    <Text>{tag}</Text>
                  ))}
                </>
              ))}
            </ScrollView>
            {/* TODO: Really need to clean up this file and look into a better way of laying this out and doing the slide animation.
            This bottom: 300 prob won't work on all devices */}
            {/* THOUGHT: Instead of bs padding, should position: absolute the other layer off screen and then translate it up. */}
            {/* Measure screen height, subtract top layer height, use that to set height of the off screen slidable page */}
            <View style={{ position: "absolute", bottom: 300, width: "100%" }}>
              <Button
                onPress={handleSubmit}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                text="CONFIRM"
              />
            </View>
          </>
        )}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    paddingHorizontal: 22,
    backgroundColor: "#fff"
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
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#EAF2FF",
    borderStyle: "dashed"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FF0000",
    borderRadius: 8,
    justifyContent: "center",
    height: 50,
    marginBottom: 15
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
  },
  backButtonContainer: {
    width: 24,
    height: 24,
    position: "absolute",
    zIndex: 10000,
    alignItems: "center"
  },
  centerHeaderText: {
    width: "100%",
    alignItems: "center"
  },
  searchResultsHeaderContainer: {
    marginTop: 15,
    marginBottom: 3,
    width: "100%",
    flexDirection: "row"
  },
  errorText: {
    fontFamily: "RobotoMonoBold",
    color: "orange",
    marginLeft: 5,
    marginTop: -10,
    marginBottom: 10
  }
});

const hashTagListColors = ["#FF38C7", "#4EFF10", "#13FFD5"];
