import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heroContainer}>
          <Image
            style={styles.heroImage}
            source={{
              uri:
                "https://images.goreadymade.com/f_auto,fl_lossy,q_auto/goreadymade_website/homepage/mobile_hero_top.jpg"
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>EMAIL</Text>
          <TextInput
            style={styles.inputStyles}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10
  },
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    height: 200,
    width: 300,
    backgroundColor: "green"
  },
  heroContainer: {
    alignSelf: "stretch",
    width: "100%",
    height: 56
  },
  heroImage: {
    width: "100%",
    height: 56
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  inputStyles: {
    width: 200,
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    marginLeft: 10
  }
});
