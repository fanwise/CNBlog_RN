import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, RefreshControl, ActivityIndicator, AsyncStorage } from 'react-native';
import BlogRow from './blogRow';
import Network from './network';
import * as parser from './parser';

export default class SavedListComponent extends Component {
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
    componentWillReceiveProps() {
        this.fetchInitBlogList();
    }
    fetchInitBlogList = () => {
        AsyncStorage.getItem('summaries')
            .then((result) => {
                var summaries = JSON.parse(result);
                const newItems = summaries ? [...summaries] : [];
                this.setState({
                    loading: false,
                    isRefreshing: false,
                    items: newItems,
                    dataSource: this.state.dataSource.cloneWithRows(newItems)
                });
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <ListView ref='listView'
                    enableEmptySections
                    showsVerticalScrollIndicator={false}
                    dataSource={this.state.dataSource}
                    renderRow={({...value}) => {
                        return (
                            <BlogRow
                                route={this.props.route}
                                navigator={this.props.navigator}
                                { ...value }
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