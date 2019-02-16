import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions
} from "react-native";

export default class Nav extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => this.props.navigate("records")}
        >
          <Image style={styles.icon} source={require("../assets/folder.png")} />
          <Text style={styles.text}>Records</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => this.props.navigate("practice card")}
        >
          <Image style={styles.icon} source={require("../assets/list.png")} />
          <Text style={styles.text}>New Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => this.props.navigate("settings")}
        >
          <Image
            style={styles.icon}
            source={require("../assets/settings.png")}
          />
          <Text style={styles.text}>Settings</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: width
  },
  icon: {
    justifyContent: "center",
    margin: "auto",
    height: 25,
    width: 25,
    marginBottom: 4
  },
  text: {
    color: "#d5d5d5",
    fontWeight: "bold",
    textAlign: "center"
  },
  buttons: {
    width: 80,
    justifyContent: "center",
    alignItems: "center"
  }
});
