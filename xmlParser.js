import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";

var DOMParser = require('xmldom').DOMParser;

export default class XmlParser {
    parseXmlText(responseText) {
        var xml = new DOMParser().parseFromString(responseText, 'text/xml');
        return this.xmlToJson(xml);
    }
    xmlToJson(xml) {
        var obj = {};
        if (xml.nodeType == 1) {
            if (xml.attributes.length > 0) {
                obj["attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) {
            obj = xml.nodeValue;
        }
        if (xml.hasChildNodes()) {
            for (var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (nodeName === "#text")
                    nodeName = "text";
                if (typeof (obj[nodeName]) == "undefined") {
                    obj[nodeName] = arguments.callee(item);
                } else {
                    if (typeof (obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(arguments.callee(item));
                }
            }
        }
        return obj;
    }
}
