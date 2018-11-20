window.FnvalleySdk = function () {
  var appObject = "pc";
  var u = navigator.userAgent;
  var app = navigator.appVersion;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //Android终端
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    //这个是安卓操作系统
    appObject = "android";
  }
  if (isIOS) {
    //这个是ios操作系统
    appObject = "ios";
  }
  console.log(this)
  //获取原生APP当前的运行环境
  this.agent = function () {
    console.log("fnvalleyAgent");
    if (appObject === "android") {
      window.android.fnvalleyAgent();
    } else {
      window.webkit.messageHandlers.agent.postMessage('');
    }
    var pro = new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (FnvalleySdk.agent != null) {
          resolve(FnvalleySdk.agent);
        } else {
          reject('agent is null!');
        }
      }, 500);
    });
    return pro;
  }
  //获取当前用户的token
  this.userAccessToken = function () {
    console.log("userAccessToken");

    var pro = new Promise(function (resolve, reject) {
      if (appObject === "android") {
        if (window.android.fnvalleyUserAccessToken() !== undefined) {
          window.android.fnvalleyUserAccessToken();
        } else {
          window.FnvalleySdk.accessToken = window.android.getToken();
        }
      } else {
        window.webkit.messageHandlers.accessToken.postMessage('');
      }
      setTimeout(function () {
        if (FnvalleySdk.accessToken != null) {
          // alert(FnvalleySdk.accessToken)
          resolve(FnvalleySdk.accessToken);
        } else {
          reject('accessToken is null!');
        }
      }, 500);
    });
    return pro;
  }
  //获取当前用户的LoginId
  this.userLoginId = function () {
    console.log("userLoginId");
    if (appObject === "android") {
      window.android.fnvalleyLoginId();
    } else {
      window.webkit.messageHandlers.getLoginId.postMessage('');
    }
    var pro = new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (FnvalleySdk.loginId != null) {
          resolve(FnvalleySdk.loginId);
        } else {
          reject('loginId is null!');
        }
      }, 500);
    });
    return pro;
  }
  //获取用户的刷新token
  this.refreshUserAccessToken = function (callback) {
    console.log("refreshUserAccessToken");
    if (appObject === "android") {
      window.android.fnvalleyRefreshUserAccessToken();
    } else {
      window.webkit.messageHandlers.refreshAccessToken.postMessage('');
    }
    var pro = new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (FnvalleySdk.refreshAccessToken != null) {
          resolve(FnvalleySdk.refreshAccessToken);
        } else {
          reject('refreshAccessToken is null!');
        }
      }, 500);
    });
    return pro;
  }
  //打开指定的页面
  //{ "name": "BTV"}
  //
  this.openView = function (prams) {//prams 为json对象
    if (appObject === "android") {
      window.android.fnvalleyOpenView(JSON.stringify(params));//Android 必须把对象转化为json字符串
    } else {
      window.webkit.messageHandlers.openView.postMessage(prams);
    }
  }
  //打开app分享页面
  //  params=  {
  //	"title": "分享标题",
  //	"describe": "分享描述",
  //	"weburl": "http://分享的网页地址"
  //}
  this.openAPPShare = function (params) {//prams 为json对象
    if (appObject === "android") {
      window.android.openShare(JSON.stringify(params));//Android 必须把对象转化为json字符串
    } else {
      window.webkit.messageHandlers.openShare.postMessage(params);
    }
  };
  //上传img图片
  this.uploadImage = function () {
    return new Promise(function (resolve, reject) {
      FnvalleySdk.uploadFinish = false;
      if (appObject === "android") {
        window.android.uploadImage();
      } else {
        window.webkit.messageHandlers.uploadImage.postMessage('');
      }
      var flag = setInterval(function () {
        console.log("uploadFinish:" + FnvalleySdk.uploadFinish);
        if (FnvalleySdk.uploadFinish) {
          clearInterval(flag);
          if (FnvalleySdk.uploadImageUrl != null) {
            resolve(FnvalleySdk.uploadImageUrl);
          } else {
            reject("upload Image failed !");
          }

        }
      }, 1000);
    });
  }
  window.FnvalleySdk.prototype.check = function () {
    alert('check')
  };

  window.FnvalleySdk.accessToken = 'aaa';
  window.FnvalleySdk.agent = null;
  window.FnvalleySdk.loginId = null;
  window.FnvalleySdk.refreshAccessToken = null;
  //上传图片后获取的图片url地址
  window.FnvalleySdk.uploadImageUrl = null;
  //app上传操作是否完成
  window.FnvalleySdk.uploadFinish = false;
  //APP传递过来的AccessToken
  window.FnvalleySdk.getAccessToken = function (json) {
    console.log("getAccessToken" + json.data);
    // alert('FnvalleySdk.accessToken' + json.data)
    window.FnvalleySdk.accessToken = json.data;
  }
  //IOS
  window.FnvalleySdk.LoginId = function (json) {
    console.log("getLoginId" + json.data);
    FnvalleySdk.loginId = json.data;
  }
  //Android
  window.FnvalleySdk.getLoginId = function (json) {
    console.log("getLoginId" + json.data);
    FnvalleySdk.loginId = json.data;
  }
  window.FnvalleySdk.getAgent = function (json) {
    console.log("getAgent" + json.data);
    FnvalleySdk.agent = json.data;
  }

  window.FnvalleySdk.getRefreshAccessToken = function (json) {
    console.log("getRefreshAccessToken" + json.data);
    FnvalleySdk.refreshAccessToken = json.data;
  }

  //上传图片地址
  window.FnvalleySdk.getUploadImageUrl = function (json) {
    console.log("uploadImageUrl:" + json.data + ",json.success:" + json.success);
    FnvalleySdk.uploadFinish = true;
    if (json.success) {
      FnvalleySdk.uploadImageUrl = json.data;
    } else {
      FnvalleySdk.uploadImageUrl = null;
    }
  }
}
export default window.FnvalleySdk
