import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";

import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";

export default class Landing extends Component {
  constructor() {
    super();

    this.state = {
      activePage: "login"
    };
  }

  navigate = activePage => {
    this.setState({
      activePage
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Go Practice!</Text>
        <Text style={styles.subTitle}>Teacher Portal</Text>
        {this.state.activePage === "login" && (
          <Login navigate={this.navigate} setUser={this.props.setUser} />
        )}
        {this.state.activePage === "signup" && (
          <Signup navigate={this.navigate} />
        )}
        {this.state.activePage === "reset password" && (
          <ResetPassword navigate={this.navigate} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#d5d5d5",
    position: "absolute",
    top: 50,
    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 10
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#d5d5d5",
    position: "absolute",
    top: 90,
    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 10
  }
});
