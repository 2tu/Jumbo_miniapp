let WxParse = require('../../utils/wxParse/wxParse.js');
import request from "../../utils/request";

Page({
  data: {
    isLike: true,
    // banner
    imgUrls: [
      "http://cnd.wgj360.com/Admin/Pic/2019/07/08/201907081652485394.jpg",
      "http://cnd.wgj360.com/Admin/Pic/2019/07/08/201907081652599416.png",
      "http://cnd.wgj360.com/Admin/Pic/2019/06/24/201906241357583829.jpg"
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s

    // 商品详情介绍
    detailImg: [
      "http://cnd.wgj360.com/User/j/jingboyujia/21089/Pic/2019/06/24/201906241353352685.jpg",
      "http://cnd.wgj360.com/User/j/jingboyujia/21089/Pic/2019/06/24/201906241354109285.jpg",
      "http://cnd.wgj360.com/User/j/jingboyujia/21089/Pic/2019/06/24/201906241354468188.jpg"
    ],
    // 商品信息
    product: {}
  },
  onLoad: function (options) {
    let that = this;

    let productId = options.productId;
    if (productId === null || productId === undefined) {
      productId = 8;
    }

    // 请求商品详情
    request.send({
      url: '/productDetail/' + productId,
      data: {},
      success: res => {
        if (res.data.code === 0) {
          that.setData({
            product: res.data.product
          });
          WxParse.wxParse('article', 'html', res.data.product.detail, that, 5);   // 实例化对象
        } else {
          wx.showToast({
            title: '您所请求的内容不见咯~',
            icon: 'none',
            duration: 1500,
            mask: true
          });
        }
      }
    });
  },
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: [this.data.product.image] // 需要预览的图片http链接列表  
    })
  },
  // 回到主页
  gotoHome() {
    wx.switchTab({
      url: '../home/home'
    });
      
  },
  // 收藏
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
  },
  // 跳到购物车
  toCar() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  // 立即购买
  immeBuy() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });
  },
})
