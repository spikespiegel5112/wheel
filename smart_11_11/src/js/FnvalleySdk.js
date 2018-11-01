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
      window.webkit.messageHandlers.loginId.postMessage('');
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
  this.openView = function (prams) {
    if (appObject === "android") {
      window.android.fnvalleyOpenView(prams);
    } else {
      window.webkit.messageHandlers.openView.postMessage(prams);
    }
  }


  window.FnvalleySdk.prototype.check = function () {
    alert('check')
  };

  window.FnvalleySdk.accessToken = 'aaa';
  window.FnvalleySdk.agent = null;
  window.FnvalleySdk.loginId = null;
  window.FnvalleySdk.refreshAccessToken = null;
//APP传递过来的AccessToken
  window.FnvalleySdk.getAccessToken = function (json) {
    console.log("getAccessToken" + json.data);
    // alert('FnvalleySdk.accessToken' + json.data)
    window.FnvalleySdk.accessToken = json.data;
  }
  window.FnvalleySdk.getLoginId = function (json) {
    console.log("getAgent" + json.data);
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


// if(export!==undefined&&!!export){
//     export Index;
// }

  // return FnvalleySdk;
}
export default window.FnvalleySdk
