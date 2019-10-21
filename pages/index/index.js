var utils = require('../../common/js/utils.js');

Page({
  data: {
    "id": null, // 期刊id
    "index": null, // 期号
    "month": "",
    "year": "",
    "like_status": null, // 是否点赞
    "fav_nums": null, // 点赞次数
    "image": "", // 图片
    "type": null,
    "content": "", //内容
    "title": "",

    "firstDataItem": 1, // 第一页期刊码
    "lastDataItem": null, // 最后一期期刊码
    "isPlaying": false
  },
  onLoad: function() {
    var _self = this;
    wx.request({
      url: 'http://bl.7yue.pro/v1/classic/latest?appkey=rT6NqlbzIKUu0NNa',
      data: {},
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        _self.setData({
          lastDataItem: res.data.index
        });
        _self.dealRes(res);

        // var currentNewData = res.
      },
      fail: function() {
        console.log('失败')
      }
    })
  },
  dealRes: function(res) {
    var _self = this;
    var data = res && res.data;
    var month = utils.getMonth(data.pubdate).currentMonth;
    var year = new Date(data.pubdate).getFullYear();
    _self.setData({
      "id": data.id, // 期刊id
      "index": data.index, // 期号
      "month": month,
      "year": year,
      "like_status": data.like_status, // 是否点赞
      "fav_nums": data.fav_nums, // 点赞次数
      "image": data.image, // 图片
      "type": data.type,
      "content": data.content, //内容
      "title": data.title
    });
  },
  getPrevPeriodical: function() { // 获取上一期
    var _self = this;
    if (this.data.index <= this.data.firstDataItem) return;
    var isRequest = false;
    if (isRequest) return;
    var index = this.data.index;
    var type = this.data.type;

    wx.request({
      url: 'http://bl.7yue.pro/v1/classic/'+ index +'/previous?appkey=rT6NqlbzIKUu0NNa',
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (res.statusCode == 200) {
          _self.dealRes(res);
        }
      },
      complete: function() {
        isRequest = false;
      }
    })
  },
  getNextPeriodical: function() { // 获取下一期
    var _self = this;
    if (this.data.index >= this.data.lastDataItem) return;
    var isRequest = false;
    if (isRequest) return;
    var index = this.data.index;
    var type = this.data.type;

    wx.request({
      url: 'http://bl.7yue.pro/v1/classic/'+ index +'/next?appkey=rT6NqlbzIKUu0NNa',
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (res.statusCode == 200) {
          _self.dealRes(res);
        }
      },
      error: function(err) {
        console.log(err);
      },
      complete: function () {
        isRequest = false;
      }
    })
  },
  tapLike: function() { // 点赞
    var _self = this;
    var isRequest = false;
    if (isRequest) return;
    var art_id = _self.data.id;
    var type = _self.data.type;
    isRequest = true;
    if (_self.data.like_status == true) { // 取消点赞   
      wx.request({
        url: 'http://bl.7yue.pro/v1/like/cancel?appkey=rT6NqlbzIKUu0NNa',
        method: 'POST',
        data: {
          art_id: art_id,
          type: type
        },
        dataType: 'json',
        success: function (res) {
          if (res.statusCode == 201) {
            _self.setData({
              fav_nums: _self.data.fav_nums - 1,
              like_status: false
            })
          }
        },
        error: function (err) {
          console.log(err);
        },
        complete: function () {
          isRequest = false;
        }
      })
    } else { // 点赞
      wx.request({
        url: 'http://bl.7yue.pro/v1/like?appkey=rT6NqlbzIKUu0NNa',
        method: 'POST',
        data: {
          art_id: art_id,
          type: type
        },
        dataType: 'json',
        success: function (res) {
          if (res.statusCode == 201) {
            _self.setData({
              fav_nums: _self.data.fav_nums+1,
              like_status: true
            })
          }
        },
        error: function (err) {
          console.log(err);
        },
        complete: function () {
          isRequest = false;
        }
      })
    }
  }

})