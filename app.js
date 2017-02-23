import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Platform, ActivityIndicator } from "react-native";
import Content from './content';
import Header from './header';
import Footer from './footer';

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header></Header>
                <Content></Content>
                <Footer></Footer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
         flex: 1,
         backgroundColor: "#30B3EE"
    }

});