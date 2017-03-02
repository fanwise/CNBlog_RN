import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, RefreshControl, ActivityIndicator } from 'react-native';
import BlogRow from './blogRow';
import Network from './network';

export default class BlogListComponent extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            loading: true,
            loadingMore: false,
            isRefreshing: false,
            items: [],
            dataSource: ds.cloneWithRows([]),
            page: 1
        }
    }
    componentDidMount() {
        this.fetchInitBlogList();
    }
    fetchInitBlogList = () => {
        Network.fetchBlogList(1, this.blogListFetchCallback);
    }
    blogListFetchCallback = (json) => {
        const newItems = [... this.state.items, ...json.feed.entry];
        this.setState({
            loading: false,
            isRefreshing: false,
            items: newItems,
            dataSource: this.state.dataSource.cloneWithRows(newItems)
        });
    }
    fetchMore = () => {
        Network.fetchBlogList(this.state.page + 1, this.blogListFetchCallback);
        this.setState({
            loadingMore: false,
            page: this.state.page + 1
        });
    }
    onRefresh = () => {
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            this.fetchInitBlogList();
        }, 3000);
    };
    onEndReached = () => {
        if (!this.state.loadingMore) {
            this.setState({ loadingMore: true });
            this.fetchMore();
        }
    }
    renderFooter = () => {
        if (this.state.loadingMore) {
            return <ActivityIndicator />;
        } else {
            return <View />
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ListView ref='listView'
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh}
                            tintColor='#FFF'
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
                                route={this.props.route}
                                navigator={this.props.navigator}
                                {...value}
                            />
                        )
                    }}
                />
                {this.state.loading && <View style={styles.loading}>
                    <ActivityIndicator
                        animating
                        size='large'
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
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(180, 180, 180, .3)'
    }
});