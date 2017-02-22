import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";
import XmlParser from './xmlParser';

var DOMParser = require('xmldom').DOMParser;

export default class App extends Component {
    componentWillMount() {
        this.fetchApi();
    }
    fetchApi() {
        var url = "http://wcf.open.cnblogs.com/blog/sitehome/paged/1/20";
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                var json = new XmlParser().parseXmlText(responseText);
                var jsonText = JSON.stringify(json);
                console.log(jsonText);
            })
            .catch((error) => {
                console.log('Error fetching the feed: ', error);
            });
    }
    render() {
        return (
            <View>
                <Text>Hello World!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    default: {
        flex: 1
    }
});