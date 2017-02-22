import React, { Component } from 'react';
import {View, Text, StyleSheet } from "react-native";

export default class Row extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.title.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    default: {
        flex: 1
    }
});