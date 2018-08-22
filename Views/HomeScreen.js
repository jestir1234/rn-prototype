import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heroContainer}>
          <Image
            style={styles.heroImage}
            source={{
              uri:
                "https://images.goreadymade.com/f_auto,fl_lossy,q_auto/goreadymade_website/homepage/banner_3-12-18-bigger.jpg"
            }}
          />
        </View>

        <View style={styles.loginContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputStyles}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              placeholder={"EMAIL"}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputStyles}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              placeholder={"PASSWORD"}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.props.navigation.navigate("MyDeliveries")}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "100%"
  },
  loginContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: 200,
    height: 200
  },
  heroContainer: {
    alignSelf: "stretch",
    width: "100%",
    height: "100%",
    zIndex: -1,
    position: "absolute"
  },
  heroImage: {
    alignSelf: "stretch",
    width: "100%",
    height: "100%",
    zIndex: -1
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    margin: 10,
    backgroundColor: "white"
  },
  inputStyles: {
    width: 200,
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10
  },

  loginBtn: {
    backgroundColor: "#29b06b",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30
  },

  loginText: {
    color: "white",
    fontWeight: "bold"
  }
});
