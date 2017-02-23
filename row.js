import React, { Component } from 'react';
import {View, Text, StyleSheet,TouchableOpacity } from "react-native";

export default class Row extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity>
                    <Text>{this.props.title.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    default: {
        flex: 1
    }
});