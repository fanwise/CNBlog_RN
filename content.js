import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, ActivityIndicator, WebView } from "react-native";
import BlogRow from './blogRow';

export default class Content extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            loading: true,
            dataSource: ds.cloneWithRows([]),
            html: ""
        }
    }
    componentWillMount() {
        this.fetchApi();
    }
    fetchApi() {
        if (this.props.contentType === 'list') {
            this.fetchBlogList()
        } else if (this.props.contentType === 'detial') {
            this.fetchBlogDetial()
        }
    }
    fetchBlogList() {
        var url = 'https://api.cnblogs.com/api/blogposts/@sitehome?pageIndex=1&pageSize=20';
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
    fetchBlogDetial() {
        var url = 'https://api.cnblogs.com/api/blogposts/' + this.props.blogId + '/body';
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer HkgUpM8pyyCZM2gjr8k0FORNkBM98UIbFnJ7-Tv1z2QduHeA1sDtNhJi9o3-glPeY4WOoAfCnGiCAYcvFZhAn9ch_qnQMTSaCAcCV0PCdLbEO-JCsqm2FQSffcAr2Yl2E-msKnKEAkZC5jkrueHKIgk9LHh1g76LkguaovOQxboHEX64FbzvJIy2XUGBvWDN9IaGpH8PwQpS5mr1exXOYg',
                'Accept':'text/plain'
            }
        })
            .then((response) => response.text())
            .then((responseText) => {
                this.setState({
                    loading: false,
                    html: responseText
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        const blogListComponent = (
            <ListView
                enableEmptySections
                showsVerticalScrollIndicator={false}
                dataSource={this.state.dataSource}
                renderRow={({...value}) => {
                    return (
                        <BlogRow
                            onSelectBlog={this.props.onForward}
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
        )
        const blogDetialComponent = (
            <WebView
                style={{
                    backgroundColor: "#E5F9FF99"
                }}
                source={{html: this.state.html}}
            />
        )
        return (
            <View style={styles.container}>
                {/*{blogListComponent}*/}
                {(this.props.contentType === 'list') ? blogListComponent : blogDetialComponent}
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
        backgroundColor: "rgba(180, 180, 180, .3)"
    }
});
