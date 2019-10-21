// pages/booklist/booklist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: true,
    dataList: {}, // 普通列表数据
    searchkeywordslist: {},
    hotsearchkeywordlist: {},
    searchDataList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _self = this;
      var isRequest = false;
      if(isRequest) return;
      wx.request({
        url: 'http://bl.7yue.pro/v1/book/hot_list?appkey=rT6NqlbzIKUu0NNa', 
        success(res) {
          console.log(res.data)
          _self.setData({
            dataList: res.data
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
  }
})