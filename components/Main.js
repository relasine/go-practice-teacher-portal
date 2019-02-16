import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import Nav from "./Nav";

export default class Main extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: ""
    };
  }

  navigate = currentPage => {
    if (currentPage !== this.state.currentPage) {
      this.setState({
        currentPage
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Nav navigate={this.navigate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1
  }
});
