import React, { Component } from "react";

import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity
} from "react-native";

import fetchCalls, { studentLogin } from "../utilities/fetchCalls";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      incomplete: false,
      fetching: false,
      error: false,
      noMatch: false
    };
  }

  handleEmailPress = text => {
    this.setState({
      email: text,
      incomplete: false,
      error: false
    });
  };

  handlePasswordPress = text => {
    this.setState({
      password: text,
      incomplete: false,
      error: false
    });
  };

  handleLogin = () => {
    if (this.state.fetching) {
      return;
    }

    if (this.state.email && this.state.password) {
      this.callLogin();
    } else {
      this.setIncomplete();
    }
  };

  callLogin = async () => {
    const payload = { email: this.state.email, password: this.state.password };

    try {
      const response = await studentLogin(payload);

      if (response === "Email/password do not match our records") {
        this.setState({ fetching: false, noMatch: true });
        return;
      }

      this.props.setUser(response);
    } catch (error) {
      console.log(error);
      this.setState({ fetching: false, error: true });
    }
  };

  setIncomplete = () => {
    this.setState({ incomplete: true, error: false, noMatch: false });
  };

  setFetching = () => {
    this.setState({ fetching: true, error: false });
  };

  handleSignup = () => {
    this.props.navigate("signup");
  };

  handleResetPassword = () => {
    this.props.navigate("reset password");
  };

  render() {
    const { fetching, incomplete, error, noMatch } = this.state;
    return (
      <View style={styles.container}>
        {!fetching && !incomplete && !error && !noMatch && (
          <Text style={styles.text}>Log in to Go Practice</Text>
        )}
        {fetching && <Text style={styles.text}>Logging you in...</Text>}
        {incomplete && (
          <Text style={styles.text}>Fill out both fields to login...</Text>
        )}
        {error && (
          <Text style={styles.text}>Server error - try again later</Text>
        )}
        {noMatch && (
          <Text style={styles.text}>Email/Password do not match</Text>
        )}
        <TextInput
          onChangeText={text => this.handleEmailPress(text)}
          style={styles.input}
          placeholder="email"
          value={this.state.email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          onChangeText={text => this.handlePasswordPress(text)}
          style={[styles.input, styles.bottomInput]}
          placeholder="password"
          value={this.state.password}
          textContentType="password"
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.submit}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.forgotButton}
          onPress={this.handleResetPassword}
        >
          <Text style={styles.forgot}>Forgot password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleSignup}>
          <Text style={styles.signup}>
            Don't have an account? <Text style={styles.bold}>Sign up.</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  input: {
    marginTop: 10,
    width: 200,
    backgroundColor: "#d5d5d5",
    height: 26,
    paddingLeft: 8
  },
  text: { color: "#d5d5d5" },
  bottomInput: {
    marginBottom: 20
  },
  button: {
    backgroundColor: "#d5d5d5",
    width: 100,
    paddingBottom: 4,
    alignSelf: "center",
    marginTop: 0,
    marginBottom: 16
  },
  signupButton: {
    backgroundColor: "#333",
    width: 100,
    paddingBottom: 4,
    alignSelf: "center",
    marginTop: 24,
    marginBottom: 32
  },
  bigButton: {
    backgroundColor: "#333",
    width: 170,
    paddingBottom: 4,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 44
  },
  submit: {
    fontFamily: "Malayalam Sangam MN",
    fontSize: 18,
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
    paddingTop: 8
  },
  signup: {
    fontFamily: "Malayalam Sangam MN",
    fontSize: 14,
    textAlign: "center",
    color: "#d5d5d5",
    paddingTop: 8
  },
  forgot: {
    fontFamily: "Malayalam Sangam MN",
    fontSize: 14,
    textAlign: "center",
    color: "#d5d5d5",
    paddingTop: 8
  },
  bold: {
    fontWeight: "bold"
  },
  forgotButton: {
    marginBottom: 48
  }
});
