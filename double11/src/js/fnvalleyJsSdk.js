// (function () {
let FnvalleySdk = function () {
  this.appObject = "pc";
  let u = navigator.userAgent;
  let app = navigator.appVersion;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //Android终端
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    //这个是安卓操作系统
    this.appObject = "android";
  }
  if (isIOS) {
    //这个是ios操作系统
    this.appObject = "ios";
  }

  this.check = function () {
    alert('inner check')
  };
  this.accessToken = '';
  this.agent = '';
  this.refreshAccessToken = '';
  //获取原生APP当前的运行环境
  this.agent = function () {
    console.log("fnvalleyAgent");
    if (this.appObject === "android") {
      window.android.fnvalleyAgent();
    } else {
      window.webkit.messageHandlers.agent.postMessage('');
    }
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (FnvalleySdk.agent != null) {
          resolve(FnvalleySdk.agent);
        } else {
          reject('agent is null!');
        }
      }, 500);
    });
  };
  //获取当前用户的token
  this.userAccessToken = function () {
    console.log("userAccessToken");
    if (appObject === "android") {
      window.android.fnvalleyUserAccessToken();
    } else {
      window.webkit.messageHandlers.accessToken.postMessage('');
    }

    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (FnvalleySdk.accessToken != null) {
          resolve(FnvalleySdk.accessToken);
        } else {
          reject('agent is null!');
        }
      }, 500);
    });
  };
  //获取用户的刷新token
  this.refreshUserAccessToken = function (callback) {
    console.log("refreshUserAccessToken");
    if (appObject === "android") {
      window.android.fnvalleyRefreshUserAccessToken();
    } else {
      window.webkit.messageHandlers.refreshAccessToken.postMessage('');
    }
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (FnvalleySdk.refreshAccessToken != null) {
          resolve(FnvalleySdk.refreshAccessToken);
        } else {
          reject('agent is null!');
        }
      }, 500);
    });
  };
  //打开指定的页面
  this.openView = function (params) {
    if (appObject === "android") {
      window.android.fnvalleyOpenView(JSON.stringify(params));
    } else {
      window.webkit.messageHandlers.openView.postMessage(params);
    }
  };
  return this;
};


//==========================

FnvalleySdk.check = function () {
  alert('static check')
};

FnvalleySdk.accessToken = null;
FnvalleySdk.agent = null;
FnvalleySdk.refreshAccessToken = null;
//APP传递过来的AccessToken
FnvalleySdk.getAccessToken = function (json) {
  console.log("getAccessToken" + json.data);
  FnvalleySdk.accessToken = json.data;
};

FnvalleySdk.getAgent = function (json) {
  console.log("getAgent" + json.data);
  FnvalleySdk.agent = json.data;
};

FnvalleySdk.getRefreshAccessToken = function (json) {
  console.log("getRefreshAccessToken" + json.data);
  FnvalleySdk.refreshAccessToken = json.data;
};

// console.log(new FnvalleySdk())

// window.FnvalleySdk = FnvalleySdk;

// })();

// if(export!==undefined){
// export default FnvalleySdk;
// }
export default FnvalleySdk;

