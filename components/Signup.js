import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { studentSignup } from "../utilities/fetchCalls";

export default class Signup extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      error: false,
      fetching: false,
      badEmail: false,
      noMatch: false,
      success: false
    };
  }

  handleEmailChange = email => {
    if (this.state.fetching) {
      return;
    }

    this.setState({ email, error: false });
  };

  handleNameChange = name => {
    if (this.state.fetching) {
      return;
    }

    this.setState({ name, error: false });
  };

  handlePasswordChange = password => {
    if (this.state.fetching) {
      return;
    }

    this.setState({ password, error: false });
  };

  handleConfirmPasswordChange = confirmPassword => {
    if (this.state.fetching) {
      return;
    }

    this.setState({ confirmPassword, error: false });
  };

  setBadEmail = () => {
    this.setState({
      fetching: false,
      error: false,
      noMatch: false,
      badEmail: true,
      success: false
    });
  };

  setFetching = () => {
    this.setState({
      fetching: true,
      error: false,
      noMatch: false,
      badEmail: false,
      success: false
    });
  };

  setError = () => {
    this.setState({
      error: true,
      fetching: false,
      noMatch: false,
      badEmail: false,
      success: false
    });
  };

  setNoMatch = () => {
    this.setState({
      noMatch: true,
      fetching: false,
      error: false,
      badEmail: false,
      success: false
    });
  };

  handleSignup = () => {
    const { email, name, password, confirmPassword } = this.state;
    if (!email || !name || !password || !confirmPassword) {
      return;
    }

    if (password !== confirmPassword) {
      this.setState({
        noMatch: true
      });
      return;
    }

    const payload = {
      email,
      name,
      password
    };

    this.fetchSignup(payload);
  };

  fetchSignup = async payload => {
    this.setFetching();
    try {
      const response = await studentSignup(payload);

      if (response === "User already exists") {
        this.setState({
          error: false,
          fetching: false,
          badEmail: true,
          noMatch: false,
          success: false
        });

        return;
      }
      console.log(response);
      this.setState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        error: false,
        fetching: false,
        badEmail: false,
        noMatch: false,
        success: true
      });
    } catch (error) {
      this.setState({
        error: true,
        fetching: false,
        badEmail: false,
        noMatch: false,
        success: false
      });
    }
  };

  handleLogin = () => {
    this.props.navigate("login");
  };

  render() {
    const { noMatch, error, fetching, badEmail, success } = this.state;
    return (
      <View>
        {!noMatch && !error && !fetching && !badEmail && !success && (
          <Text style={styles.text}>Create a new account</Text>
        )}
        {noMatch && <Text style={styles.text}>Passwords do no match</Text>}
        {error && (
          <Text style={styles.text}>Server error - try again later...</Text>
        )}
        {fetching && <Text style={styles.text}>Signing you up...</Text>}
        {badEmail && (
          <Text style={styles.text}>Email address already in use</Text>
        )}
        {success && <Text style={styles.text}>Created new account</Text>}
        <TextInput
          onChangeText={text => this.handleEmailChange(text)}
          style={styles.input}
          placeholder="email"
          value={this.state.email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          onChangeText={text => this.handleNameChange(text)}
          style={styles.input}
          placeholder="name"
          value={this.state.name}
        />
        <TextInput
          onChangeText={text => this.handlePasswordChange(text)}
          style={[styles.input]}
          placeholder="password"
          value={this.state.password}
          textContentType="password"
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <TextInput
          onChangeText={text => this.handleConfirmPasswordChange(text)}
          style={[styles.input, styles.bottomInput]}
          placeholder="confirm password"
          value={this.state.confirmPassword}
          textContentType="password"
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
          <Text style={styles.submit}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleLogin}>
          <Text style={styles.login}>
            Have an account? <Text style={{ fontWeight: "bold" }}>Log in.</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  text: { color: "#d5d5d5" },
  input: {
    marginTop: 10,
    width: 200,
    backgroundColor: "#d5d5d5",
    height: 26,
    paddingLeft: 8
  },
  bottomInput: {
    marginBottom: 20
  },
  button: {
    backgroundColor: "#d5d5d5",
    width: 100,
    paddingBottom: 4,
    alignSelf: "center",
    marginTop: 0,
    marginBottom: 44
  },
  signup: {
    fontFamily: "Malayalam Sangam MN",
    fontSize: 18,
    textAlign: "center",
    color: "#d5d5d5",
    fontWeight: "bold",
    paddingTop: 8
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
