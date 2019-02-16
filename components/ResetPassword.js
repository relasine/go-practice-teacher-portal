import React, { Component } from "react";

import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity
} from "react-native";

import fetchCalls, { resetStudentPassword } from "../utilities/fetchCalls";

export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      incomplete: false,
      fetching: false,
      error: false,
      noMatch: false,
      success: false
    };
  }

  handleEmailPress = text => {
    this.setState({
      email: text,
      incomplete: false,
      error: false
    });
  };

  handleReset = () => {
    if (this.state.fetching) {
      return;
    }

    if (this.state.email) {
      this.callReset();
    } else {
      this.setIncomplete();
    }
  };

  callReset = async () => {
    if (!this.state.email) {
      this.setIncomplete();

      return;
    }

    this.setFetching();

    try {
      const response = await resetStudentPassword(this.state.email);

      if (response === "Password reset email sent") {
        this.setState({
          success: true,
          fetching: false,
          error: false
        });
      }

      if (response === "User not found") {
        this.setState({
          fetching: false,
          noMatch: true,
          error: false,
          success: false
        });
      }
    } catch (error) {
      this.setState({
        error: true,
        fetching: false,
        noMatch: false,
        success: false
      });
      console.log(error);
    }
  };

  setIncomplete = () => {
    this.setState({
      incomplete: true,
      fetching: false,
      error: false,
      noMatch: false,
      success: false
    });
  };

  setFetching = () => {
    this.setState({
      incomplete: false,
      fetching: true,
      error: false,
      noMatch: false,
      success: false
    });
  };

  handleLogin = () => {
    this.props.navigate("login");
  };

  render() {
    return (
      <View style={styles.container}>
        {!this.state.error &&
          !this.state.noMatch &&
          !this.state.fetching &&
          !this.state.incomplete &&
          !this.state.success && (
            <Text style={styles.text}>Forgot My Password</Text>
          )}
        {this.state.error && (
          <Text style={styles.text}>Server error - please try again later</Text>
        )}
        {this.state.incomplete && (
          <Text style={styles.text}>Please enter an email address</Text>
        )}
        {this.state.noMatch && (
          <Text style={styles.text}>Email address does not match any user</Text>
        )}
        {this.state.success && (
          <Text style={styles.text}>Success! Email sent.</Text>
        )}
        {this.state.fetching && (
          <Text style={styles.text}>Checking database...</Text>
        )}
        <TextInput
          onChangeText={text => this.handleEmailPress(text)}
          style={styles.input}
          placeholder="email"
          value={this.state.email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.button} onPress={this.handleReset}>
          <Text style={styles.submit}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleLogin}>
          <Text style={styles.login}>Back to log in</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  input: {
    marginTop: 10,
    width: 250,
    backgroundColor: "#d5d5d5",
    height: 26,
    paddingLeft: 8
  },
  bottomInput: {
    marginBottom: 20
  },
  text: {
    color: "#d5d5d5"
  },
  button: {
    backgroundColor: "#d5d5d5",
    width: 170,
    paddingBottom: 4,
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 32
  },
  submit: {
    fontFamily: "Malayalam Sangam MN",
    fontSize: 18,
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
    paddingTop: 8
  },
  login: {
    fontFamily: "Malayalam Sangam MN",
    fontSize: 14,
    textAlign: "center",
    color: "#d5d5d5",
    paddingTop: 8
  }
});
