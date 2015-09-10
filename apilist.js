var config = require('./config');

// lambdas
var apiResourceWrapper = (...params) => config.apiBaseUrl + params.join('/');
var requestParamsWrapper = (api, ...params) => api + '?' + params.join('&');

// 分页获取
var fetchResourceWithPage = (request, offset=0, pageSize=20) => {
  let _pageParams = [
      'offset=' + offset,
      'limit=' + pageSize,
  ].join('&');

  if(request.endsWith('&')) {
    return request + _pageParams;
  } else if(/\?/.test(request)) {
    return request + '&' + _pageParams;
  } else {
    return request + '/?' + _pageParams;
  }
}

// 默认主题列表
var TOPIC_API = apiResourceWrapper('topics.json');
// 最近主题
var RECENT_TOP_API = requestParamsWrapper(TOPIC_API, 'type=recent')
// 热门主题
var POP_TOPIC_API = requestParamsWrapper(TOPIC_API, 'type=popular')
// 精华主题
var EXEC_TOPIC_API = requestParamsWrapper(TOPIC_API, 'type=excellent')
// 还没有任何回复的
var NO_REPLY_API = requestParamsWrapper(TOPIC_API, 'type=no_reply')

module.exports = {
  TOPIC_API,
  POP_TOPIC_API,
  EXEC_TOPIC_API,
  NO_REPLY_API,
  RECENT_TOP_API,
  fetchResourceWithPage
}
