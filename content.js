import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, ActivityIndicator, WebView, RefreshControl } from "react-native";
import XmlParser from './xmlParser';
import BlogRow from './blogRow';

export default class Content extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            loading: true,
            loadingMore: false,
            items: [],
            dataSource: ds.cloneWithRows([]),
            html: "",
            page : 1,
            isRefreshing: false
        }
    }
    componentDidMount() {
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
        var url = "http://wcf.open.cnblogs.com/blog/sitehome/paged/1/20";
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                var json = new XmlParser().parseXmlText(responseText);
                const newItems = [... this.state.items, ... json.feed.entry];
                this.setState({
                    loading: false,
                    isRefreshing: false,
                    items: newItems,
                    dataSource: this.state.dataSource.cloneWithRows(newItems)
                });
            })
            .catch((error) => {
                console.log('Error fetching the feed: ', error);
            });
    }
    fetchBlogDetial() {
        var url = 'http://wcf.open.cnblogs.com/blog/post/body/' + this.props.blogId;
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                var json = new XmlParser().parseXmlText(responseText);
                this.setState({
                    loading: false,
                    html: json.string.text
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    fetchMore() {
        var url = "http://wcf.open.cnblogs.com/blog/sitehome/paged/" + (this.state.page + 1) +"/20";
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                var json = new XmlParser().parseXmlText(responseText);
                const newItems = [... this.state.items, ... json.feed.entry];
                this.setState({
                    loadingMore: false,
                    isRefreshing: false,
                    items: newItems,
                    dataSource: this.state.dataSource.cloneWithRows(newItems),
                    page: this.state.page + 1
                });
            })
            .catch((error) => {
                console.log('Error fetching the feed: ', error);
            });
    }
    onRefresh = () => {
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            this.fetchBlogList();
        }, 5000);
    };
    onEndReached = () => {
        if (true) {
            this.setState({ loadingMore: true });
            this.fetchMore();
        }
    }
    renderFooter = () => {
        if (this.state.loadingMore) {
            return <ActivityIndicator/>;
        }else {
            return <View/>
        }
    }
    render() {
        const blogListComponent = (
            <ListView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh}
                        tintColor="#FFF"
                    />
                }
                enableEmptySections
                showsVerticalScrollIndicator={false}
                dataSource={this.state.dataSource}
                onEndReached={this.onEndReached}
                renderFooter={this.renderFooter}
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
                source={{ html: this.state.html }}
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
