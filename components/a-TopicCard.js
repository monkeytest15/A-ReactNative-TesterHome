'use strict';

var React = require('react-native');
var superagent = require('superagent');
var RefreshableListView = require('react-native-refreshable-listview');
var apilist = require('../apilist');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  ActivityIndicatorIOS
} = React;


var TopicCard = React.createClass({
  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      currentOffset: 0
    }
  },

  componentDidMount() {
    this.fetchTopicsData();
  },

  _avatarFilter(avatar: string): string {
    return /testerhome/i.test(avatar) ?
           avatar :
           'https://testerhome.com' + avatar;
  },

  _stringFilter(title: string, len: number): string {
    return title.length >= len ?
           title.slice(0, len) + '...' :
           title
  },

  _countRate(count: number): string {
    let num = Number(count);
    if(num > 100) {
      return '热评';
    } else {
      return num.toString();
    }
  },

  _loadMore() {
    // console.log('reached to bottom');
    // this.fetchTopicsData(
    //   apilist.fetchResourceWithPage(
    //     apilist[this.props.currentReqName],
    //     this.state.currentOffset + 20
    //   ),
    //   20
    // )
  },

  _reload() {
    this.fetchTopicsData(
      apilist.fetchResourceWithPage(
        apilist[this.props.currentReqName],
      )
    )
  },

  fetchTopicsData(api=this.props.resourceApi, more=0) {
    superagent.get(api)
              .set('Accept', 'application/json')
              .end((err, res) => {
                this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(res.body.topics),
                  loaded: true,
                  currentOffset: this.state.currentOffset + more
                });
              })
  },

  render() {
    return (
      !this.state.loaded ?
      <View style={ styles.loading }>
        <ActivityIndicatorIOS
            size="small"
            color="#333333"
        />
        <Text style={styles.loadingTip}>加载中...</Text>
      </View> :
      <RefreshableListView
        initialListSize={20}
        pageSize={20}
        onEndReached={this._loadMore}
        dataSource={this.state.dataSource}
        renderRow={this.renderTopicItem}
        style={styles.topicListView}
        removeClippedSubviews={true}
        onEndReachedThreshold={0}
        loadData={this._reload}
        refreshDescription='正在刷新...'
        refreshingIndictatorComponent={
          <RefreshableListView.RefreshingIndicator stylesheet={indicatorStylesheet} />
        }
        minDisplayTime={500}
        minPulldownDistance={80}
        minBetweenTime={2000}
      />
    )
  },

  renderTopicItem(topic: Object) {
    return (
      <View style={styles.topicCard}>
        <View style={styles.avatar}>
          <Image
            style={styles.avatarImg}
            source={{uri:this._avatarFilter(topic.user.avatar_url)}}
            resizeMode='cover'
          />
        </View>

        <View style={styles.titleMeta}>
          <Text style={styles.topicTitle}>{topic.title}</Text>
            <View style={styles.metaarea}>
              <Text style={styles.metainfo}>{topic.user.login}</Text>
              <Text style={styles.metainfo}>刚刚更新</Text>
            </View>

            <View style={styles.metaareatag}>
              <Text style={styles.nodename}>{topic.node_name}</Text>
              <View style={styles.replieCountBg}>
                <Text style={styles.replieCount}>{this._countRate(topic.replies_count)}</Text>
              </View>
            </View>
        </View>
      </View>
    );
  }
});

var indicatorStylesheet = StyleSheet.create({
  wrapper: {
    height: 80,
    marginTop: 10,
    marginBottom: 10
  },
  content: {
    marginTop: 10,
    marginBottom: 10,
    height: 60,
  },
});

var styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingTip: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 12
  },
  topicListView: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 5,
    overflow: 'hidden'
  },
  topicCard: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ffffff',
    marginBottom: 5,
    borderColor: '#f0f0f0',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 0,
  },
  avatarImg: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  metainfo: {
    color: '#999999',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1,
    marginRight: 5
  },
  avatar: {
    flex: 2,
  },
  titleMeta: {
    flex: 7,
    justifyContent: 'center'
  },
  replieCount: {
    fontSize: 12,
    lineHeight: 12,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  replieCountBg: {
    backgroundColor: '#e74c3c',
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 11
  },
  nodename: {
    color: '#999999',
    fontSize: 12,
    lineHeight: 16
  },
  metaarea: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  metaareatag: {
    flexDirection: 'row',
    marginTop: 2,
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  topicTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#333333'
  }
});

module.exports = TopicCard
