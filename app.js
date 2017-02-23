import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Platform, ActivityIndicator, Image } from "react-native";
import Content from './content';
import Header from './header';
import Footer from './footer';
import Dimensions from 'Dimensions';

var {screenWidth, screenHeight} = Dimensions.get('window');

export default class App extends Component {
    render() {
        return (
            <Image source={require('./icon/wallpaper.jpg')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <Header></Header>
                    <Content></Content>
                    <Footer></Footer>
                </View>
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#30B3EE88"
    },
    backgroundImage: {
        flex: 1,
        width: screenWidth,
        height: screenHeight,
        resizeMode: 'cover'
    }
});