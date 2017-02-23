import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, ActivityIndicator } from "react-native";
import XmlParser from './xmlParser';
import Row from './row';

var DOMParser = require('xmldom').DOMParser;

export default class Content extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            loading: true,
            dataSource: ds.cloneWithRows([])
        }
    }
    componentWillMount() {
        this.fetchApi();
    }
    fetchApi() {
        var url = "http://wcf.open.cnblogs.com/blog/sitehome/paged/1/40";
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                var json = new XmlParser().parseXmlText(responseText);

                this.setState({
                    loading: false,
                    dataSource: this.state.dataSource.cloneWithRows(json.feed.entry)
                })
            })
            .catch((error) => {
                console.log('Error fetching the feed: ', error);
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={({...value}) => {
                        return (
                            <Row
                                {...value}
                            />
                        )
                    }}
                    renderSeparator={(sectionId, rowId) => {
                        return <View key={rowId} />
                    }}
                />
                {this.state.loading && <View style={styles.loading}>
                    <ActivityIndicator
                        animating
                        size="large"
                    />
                </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loading: {
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0,0,0,.2)"
    }
});
