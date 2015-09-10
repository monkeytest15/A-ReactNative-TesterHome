/* @flow */
'use strict';

var React = require('react-native');
var TopicPage = require('./components/a-TopicPage');
var apilist = require('./apilist');
var AppMain = require('./components/a-AppMain');

var {
  AppRegistry,
  NavigatorIOS,
  View,
  ScrollView,
  ListView,
  StyleSheet,
  TabBarIOS,
  StatusBarIOS
} = React;

var Demo = React.createClass({
    
    componentDidMount() {
      StatusBarIOS.setStyle('light-content');
    },
    
    render() {
      return (            
            <View style={{ flex: 1 }}>
              <AppMain />
            </View>
      );
    }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

AppRegistry.registerComponent('Demo', () => Demo);
