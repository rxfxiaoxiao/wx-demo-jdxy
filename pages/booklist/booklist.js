// pages/booklist/booklist.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: false,
    dataList: {}, // 普通列表数据
    searchkeywordslist: [], // 搜索关键字列表
    hotsearchkeywordlist: [], // 热门关键字
    searchDataList: {}, // 搜索之后返回的数据
    currentSearchWord: '', // 
    isSearching: false, // 正在搜索
    isfocus: false, // 没有获取焦点
    isLoadding: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _self = this;

      // wx.clearStorage();

      // 请求列表数据
      wx.request({
        url: 'http://bl.7yue.pro/v1/book/hot_list?appkey=rT6NqlbzIKUu0NNa', 
        success(res) {
          // console.log(res.data)
          _self.setData({
            dataList: res.data
          })
        }
      })

      // 请求热门搜索关键字
      wx.request({
        url: 'http://bl.7yue.pro/v1/book/hot_keyword?appkey=rT6NqlbzIKUu0NNa',
        success(res) {
          var data = res.data;
          _self.setData({
            hotsearchkeywordlist: data.hot
          })
        }
      })

      // 获取历史搜索关键字
      wx.getStorage({
        key: 'historyWord',
        success(res) {
          // console.log(res.data);
          _self.setData({
            searchkeywordslist: res.data
          })
        } 
      })  

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toDetails: function(e) {
    var id = e.currentTarget.dataset && e.currentTarget.dataset.id;
    wx.navigateTo({ url: '../detail/detail?id='+id });
  },
  // 按下enter键进行搜索
  searchAjax: function(e) {
    var _self = this;
    var word = e.detail.value;
    if (word.replace(/(^\s*)|(\s*$)/g, "").length < 1) return;
    // 修改正在搜索中的状态
    _self.setData({
      isSearching: true
    })
    wx.request({
      url: 'http://bl.7yue.pro/v1/book/search?appkey=rT6NqlbzIKUu0NNa',
      data: {
        start: 0,
        count: 20,
        summary: 0,
        q: word
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data);
        if(res.data.length > 0) { // 取的数据，进行渲染
          _self.setData({
            searchDataList: res.data
          })

        

          // 存取关键字
          var historyWordArr = [];
          wx.getStorage({
            key: 'historyWord',
            success(res) {
              historyWordArr = historyWordArr.concat(res.data);
            },
            complete(res) {

              console.log(historyWordArr.indexOf(word));

              if (!historyWordArr.indexOf(word)) {
                historyWordArr.push(word);
              }
              wx.setStorage({
                key: 'historyWord',
                data: historyWordArr,
                success() {
                  _self.setData({
                    searchkeywordslist: historyWordArr
                  });
                }
              })
            }
          }) 

        }
      },
      fail: function () {
        console.log('失败')
      },
      complete: function() {
        _self.setData({
          isLoadding: false
        })
      }
    })

  },
  clearInput: function() {
    var _self = this;  
    _self.setData({
      isSearching: false,
      currentSearchWord: ''
    })
  },
  cancelOpt: function() {
    this.setData({
      search: false
    })
  },
  toSearch: function() {
    this.setData({
      search: true
    })
  }
})