import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from "react-native";

export default class Header extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.navigationButton}>
                        <Text>left</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>CNBlog_RN</Text>
                    <TouchableOpacity style={styles.navigationButton}>
                        <Text>right</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: 64,
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        ...Platform.select({
            ios: { paddingTop: 20 }
        })
    },
    title: {
        fontSize: 20
    },
    navigationButton: {
        marginHorizontal: 16,
        width: 35
    }
});