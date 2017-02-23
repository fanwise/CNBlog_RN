import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, ActivityIndicator } from "react-native";
import BlogRow from './blogRow';

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
        var url = 'https://api.cnblogs.com/api/blogposts/@sitehome?pageIndex=1&pageSize=50';
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer HkgUpM8pyyCZM2gjr8k0FORNkBM98UIbFnJ7-Tv1z2QduHeA1sDtNhJi9o3-glPeY4WOoAfCnGiCAYcvFZhAn9ch_qnQMTSaCAcCV0PCdLbEO-JCsqm2FQSffcAr2Yl2E-msKnKEAkZC5jkrueHKIgk9LHh1g76LkguaovOQxboHEX64FbzvJIy2XUGBvWDN9IaGpH8PwQpS5mr1exXOYg'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    dataSource: this.state.dataSource.cloneWithRows(responseJson)
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections
                    showsVerticalScrollIndicator={false}
                    dataSource={this.state.dataSource}
                    renderRow={({...value}) => {
                        return (
                            <BlogRow
                                {...value}
                            />
                        )
                    }}
                    renderSeparator={(sectionId, rowId) => {
                        return (
                            <View key={rowId}>
                                <Text></Text>
                            </View>
                        )
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
