import React, { Component } from 'react';
import { View, Text, StyleSheet, WebView } from 'react-native';
import Network from './network'

export default class BlogDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            html: ''
        }
    }
    componentDidMount() {
        Network.fetchBlogDetail(this.props.route.blogId, this.blogDetailfetchCallback)
    }
    blogDetailfetchCallback = (json) => {
        this.setState({
            loading: false,
            html: json.string.text
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <WebView
                    style={{ backgroundColor: '#E5F9FF99'}}
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
