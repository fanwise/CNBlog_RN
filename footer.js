import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default class Footer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <Text>Blog List</Text>
                </TouchableOpacity>
                 <TouchableOpacity>
                    <Text>Mine</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 49,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }
});