'use strict';

var React = require('react-native');
var TopicCard = require('./a-TopicCard');
var apilist = require('../apilist');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var TopicTabBar = require('./a-TopicTabBar');

var {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
  ScrollView
} = React;

var TopicPage = React.createClass({
  
  _renderSlidesContent(slides) {
     return slides.map((obj) => {
       return (
         <View tabLabel={obj.tabLable} style={{ flex: 1 }}>
          <TopicCard
            resourceApi={obj.api}
            currentReqName={obj.apiName}
          />
        </View>
       )
     });
  },
  
  getInitialState: function() {
    return {
      
    };
  },

  render: function() {
    return (
      <ScrollableTabView
        renderTabBar={() => <TopicTabBar
          
        />}
       >

       {this._renderSlidesContent(this.props.needSlideContents)}  
      </ScrollableTabView>
    );
  },

});

var styles = StyleSheet.create({
  
});

module.exports = TopicPage;
