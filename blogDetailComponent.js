import React, { Component } from 'react';
import { View, Text, StyleSheet, WebView, AsyncStorage } from 'react-native';
import Network from './network'
import Dimensions from 'Dimensions';

var {height, width} = Dimensions.get('window');

export default class BlogDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            html: ''
        }
    }
    componentDidMount() {
        if (this.props.route.sence === 'blog') {
            Network.fetchBlogDetail(this.props.route.blogId, this.blogDetailfetchCallback)
        } else if (this.props.route.sence === 'saved') {
            AsyncStorage.getItem(this.props.route.blogId + 'detail')
                .then((result) => {
                    this.setState({
                        loading: false,
                        html: result
                    });
                });
        }
    }
    blogDetailfetchCallback = (json) => {
        const htmlStyles = '<style type="text/css">'
            + 'body {font-size: 14px; width: ${width}px}'
            + 'div {max-width: 100%; overflow: scroll}'
            + 'img {max-width: ${width - 16}px}'
            + 'table {max-width: ${width - 16}px; overflow: scroll}'
            + 'h1 {font-size: 18px}'
            + 'h2 {font-size: 16px}'
            + 'h3 {font-size: 14px}'
            + '</style>';
        this.setState({
            loading: false,
            html: json.string.text + htmlStyles
        })
        AsyncStorage.setItem(this.props.route.blogId + 'tmp' + 'detail', json.string.text + htmlStyles);
    }
    render() {
        return (
            <View style={styles.container}>
                <WebView
                    style={{ backgroundColor: '#E5F9FF99' }}
                    source={{ html: this.state.html }}
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
