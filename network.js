import XmlParser from './xmlParser';

const blogListBaseUrl = 'http://wcf.open.cnblogs.com/blog/sitehome/paged/';
const itemsInEachPage = 20;
const blogDetailBaseUrl = 'http://wcf.open.cnblogs.com/blog/post/body/';

export default class Network {
    static fetchApi(url, callbackFunc) {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                var json = new XmlParser().parseXmlText(responseText);
                callbackFunc(json);
            })
            .catch((error) => {
                console.log('Error fetching the feed: ', error);
            });
    }

    static fetchBlogList(page, callbackFunc) {
        let url = blogListBaseUrl + page + '/' + itemsInEachPage;
        this.fetchApi(url, callbackFunc);
    }

    static fetchBlogDetail(blogId, callbackFunc) {
        let url = blogDetailBaseUrl + blogId;
        this.fetchApi(url, callbackFunc);
    }
}
