/* eslint-disable */
!function(){
    /* eslint-disable */
/* eslint-disable */
/* eslint-disable */
var now = (+new Date());
var _id = (now + '').slice(-3);
var ua = navigator.userAgent;

/** @lends Bdbox */
var $ = {
    /**
     * 当前环境是否为框，通过userAgent判断
     * @type {Boolean}
     */
    isBox: / baiduboxapp\//i.test(ua) &&  !/ lite baiduboxapp/.test(ua),
    $isBox: function(){
        var navigator = window.navigator || {}
        var ua = navigator.userAgent
        return / baiduboxapp\//i.test(ua) &&  !/ lite baiduboxapp/.test(ua)
    },
    isLiteBox: / lite baiduboxapp\//i.test(ua),
    $isLiteBox: function(){
        var navigator = window.navigator || {}
        var ua = navigator.userAgent
        return / lite baiduboxapp\//i.test(ua)
    },
    /**
     * 当前系统是否为iOS
     * @type {Boolean}
     */
    isIOS: /(iPhone|iPod|iPad)/.test(ua),
    $isIOS: function(){
        var navigator = window.navigator || {}
        return /(iPhone|iPod|iPad)/.test(navigator.userAgent)
    },
    /**
     * 当前系统是否为android
     * @type {Boolean}
     */
    isAndroid: /(Android);?[\s\/]+([\d.]+)?/.test(ua),
    $isAndroid: function(){
        var navigator = window.navigator || {}
        return /(Android);?[\s\/]+([\d.]+)?/.test(navigator.userAgent)
    },
    /**
     * 获取唯一id，用于一些随机数
     * @return {Number} id 随机数
     * @example
     * var jsonpFnName = '_box_' + Bdbox.getId();
     */
    getId: function() {
        return _id++;
    },
    /**
     * 空数组
     * @type {Array}
     */
    emptyArr: [],
    /**
     * 空function，用于一些回调函数默认函数
     * @return {Undefined} undefined 未定义
     */
    emptyFn: function() {},
    /**
     * 空object
     * @type {Object}
     */
    cleanObj: {},
    /**
     * document.getElementById实现
     * @param  {String} id nodeID，不带#
     * @return {Object} domlist  DOM节点
     * @example
     * Bdbox.getId('id').style.display = 'none';
     */
    byId: function(id) {
        return $.isString(id) ? document.getElementById(id) : id;
    },
    /**
     * 泛数组转换为数组
     * @description 转换后的数组可以用数组方法
     * @param  {Object} arrayLike 类似数组的对象
     * @return {Array}  array 转成数组类型的数组
     * Bdbox.toArray(document.querySelectorAll('*')).forEach(function(node){
     *     console.log(node);
     * });
     */
    toArray: function(arrayLike) {
        return $.emptyArr.slice.call(arrayLike);
    },
    /**
     * querySelectorAll选择器
     * @param  {String} selector 选择器
     * @param  {DOM} [context=document]  上下文
     * @return {DomList}   array  返回toArray处理好的dom节点数组
     */
    $: function(selector, context) {
        context = (context && context.nodeType === 1) ? context : document;
        return $.toArray(context.querySelectorAll(selector));
    }
};

/**
 * 是否是function类型
 * @name isFunction
 * @function
 * @memberOf Bdbox
 * @param  {Object} obj 要判断的对象
 * @return {Boolean} bool  true|false
 */
/**
 * 是否是string类型
 * @name isString
 * @function
 * @memberOf Bdbox
 * @param  {Object} obj 要判断的对象
 * @return {Boolean} bool true|false
 */
/**
 * 是否是array类型
 * @name isArray
 * @function
 * @memberOf Bdbox
 * @param  {Object} obj 要判断的对象
 * @return {Boolean} bool 返回true|false
 */
/**
 * 是否是一个Number类型
 * @name isNumber
 * @function
 * @memberOf Bdbox
 * @param  {Object} obj 要判断的对象
 * @return {Boolean} bool  返回true|false
 */
/**
 * 是否是一个RegExp类型
 * @name isRegExp
 * @function
 * @memberOf Bdbox
 * @param  {Object} obj 要判断的对象
 * @return {Boolean} bool  返回true|false
 */
'Function,String,Array,Number,RegExp'.replace(/[^, ]+/g, function(t) {
    $['is' + t] = function(s) {
        return isType(s, t);
    };
});
/**
 * 是否为布尔
 * @function
 * @name isBoolean
 * @memberOf Bdbox
 * @param  {Object}  obj 要判断的对象
 * @return {Boolean}  bool true|false
 */
$.isBoolean = function(obj) {
    return obj === true || obj === false;
};
/**
 * 是否为object
 * @function
 * @name isObject
 * @memberOf Bdbox
 * @param  {Object}  obj 要判断的对象
 * @return {Boolean} bool true|false
 */
$.isObject = function(obj) {
    return typeof obj === 'object';
};
/**
 * 是否为undefined
 * @function
 * @name isUndefined
 * @memberOf Bdbox
 * @param  {Object}  obj 要判断的对象
 * @return {Boolean} bool  true|false
 */
$.isUndefined = function(obj) {
    return obj === undefined;
};
/**
 * 是否是window对象
 * @function
 * @name isWindow
 * @memberOf Bdbox
 * @param  {Object}  obj 要判断的对象
 * @type {Boolean}
 */
$.isWindow = function(obj) {
    return obj != null && obj == obj.window
}

/**
 * 是否是纯object对象
 * @function
 * @name isPlainObject
 * @memberOf Bdbox
 * @param  {Object}  obj 要判断的对象
 * @type {Boolean}
 */
$.isPlainObject = function(obj) {
    return $.isObject(obj) && !$.isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
}

function isType(obj, type) {
    return $.cleanObj.toString.call(obj).slice(8, -1) === type;
}

;
//模块化
var modulesMap = {};
var factoryMap = {};
var loadingMap = {};
function define(id, factory, hash) {
    id = id.replace(/\.js$/i, '');
    factoryMap[id] = factory;
    loadingMap[id] = 1;
}

/**
 * 判断模块是否已经定义
 * @param  {String} id 模块名
 * @return {Boolean}    是否已经定义
 */
$.defined = function(id) {
    return loadingMap[id];
}
$.required = function(id) {
    return modulesMap[id] && modulesMap[id].exports;
}

/**
 * require方法
 * @description 请求需要一个模块，id按照fis规范：`命名空间:xxx/xxx`，
 * 例如Bdbox的模块都是：`common:bdbox/xxx`
 * @function
 * @name require
 * @memberOf Bdbox
 * @param  {String} id 模块名
 * @return {Object} obj  模块对象
 * @example
 * var module = require('common:bdbox/someModule');
 * module.someFn();
 * //test.js
 * var version_compare = require('common:bdbox/utils/version_compare');
 * var getVersion = require('common:bdbox/utils/getVersion');
 * var boxversion = getVersion();
 * console.log(boxversion);
 * //也可以直接使用Bdbox.xxx.xxx形式，例如：
 * require('common:bdbox/android/invokeApp');
 * Bdbox.android.invokeApp('bd_query', 'setQuery', ['web','上框关键词']);
 */
function require(id) {
    var mod = modulesMap[id];
    if (mod) {
        return mod.exports;
    }
    var factory = factoryMap[id];
    if (!factory) {
        throw 'Cannot find module `' + id + '`';
    }
    var ids = id.split(':');
    var names = ids.pop().split('/');
    var root = $;
    var name, lastName;

    while (name = names.shift()) {
        if (name === 'bdbox') {
            continue;
        }
        lastName = name;
        if (names.length) {
            root = (root[name] = root[name] || {});
        }
    }

    var mod = modulesMap[id] = {
        exports: {}
    };
    var ret = $.isFunction(factory) ? factory.apply(mod, [require, mod.exports, mod, $]) : factory;

    if (ret) {
        mod.exports = ret;
    }
    return root[lastName] = mod.exports;
}
;
$._v = '20170516114328';
$.define = define;
$.require = require;
window.BoxJS = $;//暴露全局变量给注入js使用
var DEFAULT_NS = 'BoxJS:';

BoxJS.define('BoxJS:bdbox/utils/version_compare', function(require, exports, module, $){
/**
 * 版本比较；
 * @memberOf Bdbox.utils
 * @name version_compare
 * @param  {String} version1 第一个版本号
 * @param  {String} version2 第二个版本号
 * @return {Nubmer} num  version1==version2返回0；version1>version2返回1；小于返回-1
 * @author wangyongqing01
 * @version $Id: version_compare.js 175996 2014-05-16 00:48:03Z wangyongqing01 $
 * @example
 * var version_compare = require('common:bdbox/utils/version_compare');
 * var getVersion = require('common:bdbox/utils/getVersion');
 * version_compare(getVersion(), '4.7.1');
 * //version1==version2返回0；
 * //version1>version2返回1；
 * //小于返回-1
 */
var self = function(version1, version2) {
    version2 += '';
    version1 += '';

    var a = version1.split('.'),
        b = version2.split('.'),
        i = 0,
        len = Math.max(a.length, b.length);

    for (; i < len; i++) {
        if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
            return 1;
        } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
            return -1;
        }
    }
    return 0;
};
module.exports = self;

});;
BoxJS.define('BoxJS:bdbox/utils/getLiteVersion', function(require, exports, module, $){
/* eslint-disable */
/**
 * 获取框的版本号
 * @memberOf Bdbox.utils
 * @name getLiteVersion
 * @function
 * @return {String} version 返回框的版本号
 * @author wangyongqing01
 * @version  $Id: getLiteVersion.js 175996 2017-04-16 00:48:03Z wangyongqing01 $
 */
var self = function () {
  var back = 0
  if ($.$isLiteBox()) {
    var str = navigator.userAgent
    var a
    if (a = /baiduboxapp\/([\d+.]+)/.exec(str)) {
      back = a[1]
    }
  }
  self = function () {
    return back
  }
  return back
}

module.exports = self

});;
BoxJS.define('BoxJS:bdbox/utils/getVersion', function(require, exports, module, $){
/* eslint-disable */
/**
 * 获取框的版本号
 * @memberOf Bdbox.utils
 * @name getVersion
 * @function
 * @return {String} version 返回框的版本号
 * @author wangyongqing01
 * @version  $Id: getVersion.js 175996 2014-05-16 00:48:03Z wangyongqing01 $
 */
var self = function () {
  var back = 0
  if (window.baiduboxapp_version) {
    back = window.baiduboxapp_version
  } else if ($.$isBox()) {
    var str = navigator.userAgent
    var a
    if (a = /([\d+.]+)_(?:diordna|enohpi)_/.exec(str)) {
      a = a[1].split('.')
      back = a.reverse().join('.')
    } else if (a = /baiduboxapp\/([\d+.]+)/.exec(str)) {
      back = a[1]
    }
  }
  self = function () {
    return back
  }
  return back
}

module.exports = self

});;
BoxJS.define('BoxJS:bdbox/utils/queryToJson', function(require, exports, module, $){
/**
 * 对传入url query 部分转成json格式
 * @memberOf Bdbox.utils
 * @name queryToJson
 * @function
 * @param {string} url 待处理的url
 * @return {Object} obj 返回处理后的json
 */
module.exports = function(url) {

    var locse = url.split('?'),
        search = locse[1] ? locse[1] : locse[0],
        pairs = search.split('&'),
        result = {};

    pairs.forEach(function(pair) {
        pair = pair.split('=');
        if (pair[0].length > 0) {
            var resultPair = '';
            try {
                resultPair = decodeURIComponent(pair[1]) || '';
            } catch (e) {}
            result[pair[0]] = resultPair;
        }
    });

    return result;
};

});;
BoxJS.define('BoxJS:bdbox/utils/jsonToQuery', function(require, exports, module, $){
/**
 * 将对象转成url，但是没有添加对数组支持
 * @memberOf Bdbox.utils
 * @name jsonToQuery
 * @function
 * @param  {Object} json 待处理的json对象
 * @return {string}  str  处理之后的string字符串
 */
module.exports = function(json) {
    if ($.isString(json)) {
        return json;
    }
    var arr = [];
    for (var i in json) {
        arr.push(i + '=' + json[i]);
    }
    return arr.join('&');
};

});;
BoxJS.define('BoxJS:bdbox/utils/ready', function(require, exports, module, $){
/**
 * dom ready方法
 *
 * @memberOf Bdbox
 * @function
 * @name ready
 * @param  {Array} ready的回调函数队列
 * @example
 * Bdbox.utils.ready(function() {
 *     console.log('dom is ready');
 * });
 * @version $Id: ready.js 266107 2015-09-28 06:01:02Z wangyongqing01 $
 */

var funList = [];
var isReady = false;

function onReady() {
    funList.forEach(function(fun) {
        fun();
    });

    funList.length = 0;
    isReady = true;
}

function ready(fun) {
    if (typeof fun !== 'function') {
        return;
    }

    if (isReady) {
        fun();
    } else {
        funList.push(fun);
    }
}

if ('complete,loaded,interactive'.indexOf(document.readyState) > -1 && document.body) {
    onReady();
} else {
    document.addEventListener('DOMContentLoaded', onReady, false);
}

module.exports = ready;

});;
BoxJS.define('BoxJS:bdbox/utils/detect', function(require, exports, module, $){
/**
 * 探测ua，已经集成到zepto，**不需要**单独引用，直接用Zepto.os
 * Zepto.os里面没有微信微博的判断方法，如果使用，请单独引入detect模块
 * @memberOf Bdbox.utils
 * @name detect
 * @function
 * @param  {String} ua userAgent字符串
 * @return {Object} obj  返回对象
 * @example
 * if(Bdbox.os.android){alert(Bdbox.os.version);}
 * if(Bdbox.os.isWechat){
 *     alert('微信');
 * }
 * if(Bdbox.os.isWeibo){
 *     alert('微博');
 * }
 * //部分userAgent可能是后注入的，所以需要重新获取
 * var os = Bdbox.utils.detect();
 * if(os.isWechat){
 *     alert('微信');
 * }
 * //还可以传入一个userAgent
 * var os = Bdbox.utils.detect(userAgent);
 * console.log(os);
 *
 * @author wangyongqing01
 * $Id: detect.js 286951 2016-03-17 09:28:35Z wangyongqing01 $
 */
function detect(ua) {
    var os = {
        name: 'unknown',
        version: 0
    };
    //赋值
    if (this !== window && !this.os) {
        this.os = os;
    }
    ua = ua || navigator.userAgent;
    //增加微信和微博判断
    var iobj = {
        Weibo: /weibo/i,
        Wechat: /micromessenger\//i,
        QQ: /QQ\//
    };
    for (var i in iobj) {
        if (iobj.hasOwnProperty(i)) {
            os['is' + i] = iobj[i].test(ua);
        }
    }
    os.isUC = ua.match(/UC/) || window.ucweb || window.ucbrowser;
    var win10 = ua.match(/Windows Phone ([\d.]+)/);
    if (win10) {
        os.win10 = true;
        os.version = win10[1];
        os.name = 'win10';
        return os;
    }

    var android = ua.match(/(Android);?\s+([\d.]+)?/);
    if (android) {
        os.android = true;
        os.version = android[2];
        os.name = 'android';
        return os;
    }

    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
        iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    if (iphone && !ipod) {
        os.ios = os.iphone = true;
        os.version = iphone[2].replace(/_/g, '.');
        os.name = 'ios';
        return os;
    }
    if (ipad) {
        os.ios = os.ipad = true;
        os.name = 'ios';
        os.version = ipad[2].replace(/_/g, '.');
        return os;
    }
    if (ipod) {
        os.name = 'ios';
        os.ios = os.ipod = true;
        os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
        return os;
    }

    return os;
};
detect.apply($);
module.exports = detect;

});;
BoxJS.define('BoxJS:bdbox/android/invokeApp', function(require, exports, module, $){
/* eslint-disable */
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');
var getLiteVersion = require('BoxJS:bdbox/utils/getLiteVersion');
/**
 * @namespace Bdbox.android
 */
/**
 * @memberOf Bdbox.android
 * @name invokeApp
 * @function
 * @param  {String} name android提供的命名空间
 * @param  {String} func android命名空间下的方法名
 * @param  {Array} args 接受参数
 * @return {Object}      返回对象格式的json
 * @requires common:bdbox/utils/version_compare
 * @requires common:bdbox/utils/getVersion
 * @version  $Id: invokeApp.js 286328 2016-03-14 08:32:28Z wangyongqing01 $
 */
function invokeApp(name, func, args) {
    if (args && !$.isArray(args)) {
        args = Array.prototype.slice.call(arguments, 0).slice(2);
    }
    //如果存在就执行，如果不存在就通过版本号来判断
    if (window[name] && window[name][func]) {
        var result = window[name][func].apply(window[name], args);
        //直接调用
        return {
            error: 0,
            result: result,
            __from: 'js' //打个标记
        };
    }
    var version = getVersion();
    if (version_compare(version, 4.8) >= 0 || version_compare(getLiteVersion(), 2.0) >= 0) {
        //调用方法拿4.8版本来判断
        //prompt调用一个不存在的接口，也不会报错，只是调用无效
        //但有错误值
        //2017年04月20日 新增lite版本2.0以上增加lite版本调起
        var back = execCaller(name, func, args);

        back = back ? JSON.parse(back) : {};
        back.__from = 'app';
        return back;
    } else if (version === '4.7.1' || version == '4.7') {
        //需要给4.7加个特殊标记
        //对于4.8出现的接口或者不存在的接口，在4.7内调用
        //会进入下面的逻辑，但是有风险！！！！！
        //4.7~4.7.1对于不存在的接口，使用prompt调用会出现假死状态
        //无法解决，因为无解……
        //只能在使用4.8之后的js接口，在invokeApp之前提前做判断
        //例如：bd_searchbox_interface.sendLog方法是4.8引入的
        //在使用4.7中使用invokeApp调用，会走到的逻辑，然后假死！！！切记！！！！
        var rs = execCaller(name, func, args);

        return {
            error: 0,
            result: rs,
            __from: 'app4.7'
        };
    }
    return {
        error: 200
    };
}

function execCaller(nameSpace, funcName, funcArgs) {
    if (!$.$isBox() && !$.$isLiteBox()) {
        return {
            error: 201
        };
    } else if (!$.$isAndroid()) {
        return {
            error: 202
        };
    }
    //保证要有[]
    var caller = {
        obj: nameSpace,
        func: funcName,
        args: funcArgs ? funcArgs : []
    };
    try {
        return window.prompt('BdboxApp:' + JSON.stringify(caller));
    } catch (e) {
        return {
            error: 201
        };
    }
}
module.exports = invokeApp;

});;
BoxJS.define('BoxJS:bdbox/ios/invokeApp', function(require, exports, module, $){
/* eslint-disable */
/**
 * @namespace Bdbox.ios
 */
/**
 * ios.invokeApp，因为需要创建iframe，所以回调是异步的请求
 * @memberOf Bdbox.ios
 * @function
 * @name invokeApp
 * @param  {String}   action   调用的action，例如downloadnovel
 * @param  {Object}   params   参数对象
 * @param  {Function} callback 回调函数
 * @example
 * Bdbox.ios.invokeApp('getspeedlogdata', function(cData) {
 *     console.log(cData);
 * });
 * Bdbox.ios.invokeApp('downloadnovel', {
 *     url:'xxxx',
 *     title: 'xxxxxxx'
 * }, function(cData) {
 *     if(cData.error==0){
 *         console.log('success');
 *         alert(cData.result);
 *     }else{
 *         console.log('fail');
 *     }
 * });
 * $Id: invokeApp.js 286585 2016-03-15 11:57:15Z wangyongqing01 $
 */
module.exports = function(action, params, callback) {
    //baiduboxapp://jsbridge?action=ios-action&func=js-func-name&params=ios-action-arguments
    if (!action || !$.$isBox()) {
        return;
    }

    var url = [];
    if ($.isFunction(params)) {
        callback = params;
    } else {
        for (var i in params) {
            url.push(i + '=' + params[i]);
        }
    }
    if ($.isFunction(callback)) {
        var funcName = '_bdbox_js_' + $.getId();
        window[funcName] = function() {
            callback.apply(window, ([]).slice.call(arguments, 0));
            /*delete window[funcName];*/
        };
        url.push('func=' + funcName);
    } else {
        if (callback) {
            url.push('func=' + callback);
        }
    }
    url = 'baiduboxapp://' + action + '?' + url.join('&');

    var $node = document.createElement('iframe');
    $node.style.display = 'none';
        $node.src = url;
    var body = document.body || document.getElementsByTagName('body')[0];
    body.appendChild($node);
    // 销毁 iframe
    setTimeout(function() {
        body.removeChild($node);
        $node = null;
    }, 0);
};

});;
BoxJS.define('BoxJS:bdbox/invoke/newInvoke', function(require, exports, module, $){
/* eslint-disable */
/**
 * 新调起协议封装
 */
/*jshint -W802,-W079*/
module.exports = function(action, params, callback) {
    //baiduboxapp://version/component/module/../action?k1=$v1&k2=$v2..&upgrade=1
    if (!action || !$.$isBox() && !$.$isLiteBox()) {
        return;
    }

    var url = [];
    if ($.isFunction(params)) {
        callback = params;
    } else {
        for (var i in params) {
            url.push(i + '=' + params[i]);
        }
    }
    if ($.isFunction(callback)) {
        var funcName = '_bdbox_js_' + $.getId();
        window[funcName] = function() {
            callback.apply(window, ([]).slice.call(arguments, 0));
            /*delete window[funcName];*/
        };
        url.push('callback=' + funcName);
    } else {
        if (callback) {
            url.push('callback=' + callback);
        }
    }
    url = 'baiduboxapp://' + action + '?' + url.join('&');

    var $node = document.createElement('iframe');
    $node.style.display = 'none';
        $node.src = url;
    var body = document.body || document.getElementsByTagName('body')[0];
    body.appendChild($node);
    // 销毁 iframe
    setTimeout(function() {
        body.removeChild($node);
        $node = null;
    }, 0);
};

});;
//pblog
BoxJS.define('BoxJS:bdbox/extend', function(require, exports, module, $){
var isPlainObject = $.isPlainObject,
  isArray = $.isArray,
  isBoolean = $.isBoolean,
  isUndefined = $.isUndefined;

function extend(target, source, deep) {
  for (var key in source)
    if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
      if (isPlainObject(source[key]) && !isPlainObject(target[key]))
        target[key] = {};
      if (isArray(source[key]) && !isArray(target[key]))
        target[key] = [];
      extend(target[key], source[key], deep);
    } else if (!isUndefined(source[key])) {
    target[key] = source[key];
  }
}
/**
 * extend方法
 * @memberOf Bdbox
 * @function extend
 * @example
 * $.extend(target, [source, [source2, ...]])  ⇒ target
 * $.extend(true, target, [source, ...]) ⇒ target
 * var target = { one: 'patridge' },
 *   source = { two: 'turtle doves' }
 * $.extend(target, source)
 * //=> { one: 'patridge',
 * //     two: 'turtle doves' }
 */
module.exports = function(target) {
  var deep, args = $.emptyArr.slice.call(arguments, 1);
  if (isBoolean(target)) {
    deep = target;
    target = args.shift();
  }
  args.forEach(function(arg) {
    extend(target, arg, deep);
  });
  return target;
};

});;
BoxJS.define('BoxJS:bdbox/clone', function(require, exports, module, $){
var toString = Object.prototype.toString;
var map = function(obj, callback, merge) {
    var index = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (merge) {
                callback[key] = obj[key];
            } else if (callback(key, obj[key], index++)) {
                break;
            }
        }
    }
};
var clone = function(source) {
    var ret;
    switch (toString.call(source)) {
        case '[object Object]':
            ret = {};
            map(source, function(k, v) {
                ret[k] = clone(v);
            });
            break;
        case '[object Array]':
            ret = [];
            source.forEach(function(ele) {
                ret.push(clone(ele));
            });
            break;
        default:
            ret = source;
    }
    return ret;
};

module.exports = clone;

});;
BoxJS.define('BoxJS:bdbox/monitor/monitor', function(require, exports, module, $){
/* eslint-disable */
var urlencode = encodeURIComponent;

var Monitor = function(url, opts) {
    url = url + (url.indexOf('?') < 0 ? '?' : '&');
    this.url = url;
    this.options = opts;
};
//上报
Monitor.prototype.report = function(data, callback) {
    var _isCallbackCalled = false;
    data = data || '';
    var img = new Image(1, 1),
        items = [];
    if ($.isObject(data)) {
        for (var i in data) {
            items.push(i + '=' + urlencode(String(data[i])));
        }
        data = items.join('&');
    }
    var imgName = '_box_mt' + $.getId();
    window[imgName] = img;
    img.onload = img.onerror = img.onabort = function() {
        // 打点结束之后，执行 callback
        if (callback && typeof callback === 'function' && !_isCallbackCalled) {
            _isCallbackCalled = true;
            callback()
        }
        img.onload = img.onerror = img.onabort = null;
        window[imgName] = img = null;
    };
    var url = this.url + data;
    if ($.isFunction(this.options.customHandler)) {
        url = this.options.customHandler(url);
    }
    img.src = url + '&_rnd=' + Math.floor(Math.random() * 0x80000000);

    // 为了避免打点超时，设置 100ms 之后强制执行 callback
    setTimeout(function () {
        if (callback && typeof callback === 'function' && !_isCallbackCalled) {
            _isCallbackCalled = true;
            callback()
        }
    }, 100)

    return this;
};

Monitor.prototype.main = function(func, args) {
    if (func && $.isFunction(this[func])) {
        this[func].apply(this, $.toArray(args || []));
    }
    return this;
};

/**
 * 监控上报类
 * @namespace Bdbox.monitor
 * @param  {string} url  收集url
 * @param  {object} opts 配置项，非必填
 * @return {Monitor}      返回monitor实例
 * @example
 * var hm = monitor(HM_GIF_URI);
 * module.exports = function(){
 *    //monitor 目录下必须按照此格式来写
 *    hm.main.apply(hm, arguments);
 * };
 */
module.exports = function(url, opts) {
    return new Monitor(url, opts);
};

});;
BoxJS.define('BoxJS:bdbox/monitor/multilog', function(require, exports, module, $){
/**
 * @file multilog.js 改进pblog多id冲突
 *
 * @author Created by youliang on 17/2/4.
 */
/* eslint-disable fecs-camelcase */
var monitor = require('BoxJS:bdbox/monitor/monitor');
var extend = require('BoxJS:bdbox/extend');
var query2Json = require('BoxJS:bdbox/utils/queryToJson');
var getVersion = require('BoxJS:bdbox/utils/getVersion');
var clone = require('BoxJS:bdbox/clone');
// url中存在公共参数，则给tcbox拼上，透传
var URL = query2Json(location.search);

var ua = navigator.userAgent;
var protocol = window.location.protocol;
if (protocol !== 'http:') {
    protocol = 'https:';
}
var GIF_URI = protocol + '//m.baidu.com/tcbox';
var urlencode = encodeURIComponent;

// 开始改造
var Multilog = function (cateid) {
    // 继承monitor
    var self = this;
    this.CUSTOM_ARG = {
        service: 'bdbox',
        action: 'pblog',
        // 表明参数协议第二个版本
        ctv: 2,
        // 表明参数加密
        cen: 'uid_ua_ut',
        data: {
            // 手百为1
            appid: '1',
            // 客户端：1、JS：2、SERVER：3
            dataid: '2',
            // 区分主动/被动行为，主动：1、被动：0
            actiontype: '1',
            // 写死, actionid：2=事件统计，1=pv统计
            actionid: '2',
            actiondata: {
                ref: URL.ref || '',
                gmv: URL.vmgdb || '',
                source: URL.from || URL.ref || '',
                boxVersion: getVersion(),
                boxPlatform: ua.match(/(iPad|iPhone|iPod)/igm) ? 'ios' : 'android'
            }
        }
    };

    if (URL.uid && URL.osname) {
        ['osname', 'ua', 'ut', 'from', 'cfrom', 'uid', 'pkgname'].forEach(function (v) {
            URL[v] && (self.CUSTOM_ARG[v] = URL[v]);
        });
    }
    if (cateid) {
        this.CUSTOM_ARG.data.cateid = cateid;
    }
    this.tmpArg = {};
    this.options = {};
    this.options.customHandler = function (url) {
        var arr = [];
        if (self.tmpArg) {
            for (var i in self.tmpArg) {
                if (self.tmpArg.hasOwnProperty(i)) {
                    var val = self.tmpArg[i];
                    if ($.isPlainObject(val)) {
                        val = JSON.stringify(val);
                    }
                    arr.push(i + '=' + urlencode(val));
                }
            }
        }
        if (arr.length) {
            url += arr.join('&');
        }
        return url;
    };
};
Multilog.prototype = monitor(GIF_URI);

/**
 * pv统计
 *
 * @param  {string} url 统计的pv url
 * @param  {string} u  来源url，可选
 * @return {Object} report 上报
 */
Multilog.prototype.pv = function (url, u) {
    this.tmpArg = clone(this.CUSTOM_ARG);
    var _data = this.tmpArg.data;
    // 写死, actionid：2=事件统计，1=pv统计
    _data.actionid = '1';
    var data = {};
    data.url = url || location.href;
    if (u) {
        data.u = u;
    }
    _data.actiondata = extend(_data.actiondata, data);
    this.tmpArg.data = _data;
    return this.report();
};
/**
 * /searchbox?action=pblog&service=bdbox&pu=六大公共参数data={
    "dataid":"__DATA_ID__", //区分sdk客户端：1、JS：2、SERVER：3
    "cateid":"__CATE_ID__", // 区分业务 卡片、小说、视频…
    "actionid":"__ACTION_ID__", //区分行为
    "actiontype":"__ACTION_TYPE__", //区分主动/被动行为，主动：1、被动：0
    "actiondata":"__ACTION_DATA__", //业务具体数据，json格式
}

 */

/**
 * 事件打点统计
 * @param  {string} evtName 事件名称
 * @param  {string} evtType   事件类型
 * @param  {string} evtTag    事件tag标示
 * @return {Object} report 上报
 */
Multilog.prototype.event = function (evtName, evtType, evtTag) {
    if (!evtName) {
        throw 'monitor.tc.event need a evtName';
    }
    if ($.isPlainObject(evtType) && !evtTag) {
        var data = {
            evtName: evtName
        };
        for (var i in evtType) {
            data[i] = evtType[i];
        }
    } else {
        var data = {
            evtName: evtName,
            evtType: evtType || '',
            evtTag: evtTag || ''
        };
    }
    this.tmpArg = clone(this.CUSTOM_ARG);
    var _data = this.tmpArg.data;
    // 写死, actionid：2=事件统计，1=pv统计
    _data.actionid = '2';
    _data.actiondata = extend(_data.actiondata, data);
    this.tmpArg.data = _data;
    return this.report();
};
// 结束改造

/**
 * Multilog, 事件跟踪 可适用于多个cateid在一个页面相互独立打点
 * @param  {number} cateid server分配id
 * @return {Object} Multilog 新的实例对象
 *
 * @memberOf Bdbox.monitor
 * @name  Multilog
 * @example
 * var Multilog = Bdbox.monitor.multilog;
 * var demoLog = Multilog(18); //如cateid是18
 * //统计PV
 * demoLog.pv(18,{name:123})
 * //统计事件
 * demoLog.event(evtName, evtType, evtTag)
 */
module.exports = function (cateid) {
    return new Multilog(cateid);
};
});;
BoxJS.define('BoxJS:bdbox/monitor/pblog', function(require, exports, module, $){
/**
 * @file pblog.js
 */
/* eslint-disable fecs-camelcase */
var monitor = require('BoxJS:bdbox/monitor/monitor');
var extend = require('BoxJS:bdbox/extend');
var query2Json = require('BoxJS:bdbox/utils/queryToJson');
var getVersion = require('BoxJS:bdbox/utils/getVersion');
var clone = require('BoxJS:bdbox/clone');
//url中存在公共参数，则给tcbox拼上，透传
var URL = query2Json(location.search);

var ua = navigator.userAgent;
var protocol = window.location.protocol;
if (protocol !== 'http:') {
    protocol = 'https:';
}
var GIF_URI = protocol + '//m.baidu.com/tcbox';
var CUSTOM_ARG = {
    service: 'bdbox',
    action: 'pblog',
    ctv: 2, //表明参数协议第二个版本
    cen: 'uid_ua_ut', //表明参数加密
    data: {
        appid: '1', //手百为1
        dataid: '2', //客户端：1、JS：2、SERVER：3
        actiontype: '1', //区分主动/被动行为，主动：1、被动：0
        actionid: '2', //写死, actionid：2=事件统计，1=pv统计
        actiondata: {
            ref: URL.ref || '',
            gmv: URL.vmgdb || '',
            source: URL.from || URL.ref || '',
            boxVersion: getVersion(),
            boxPlatform: ua.match(/(iPad|iPhone|iPod)/igm) ? 'ios' : 'android'
        }
    }
};
var urlencode = encodeURIComponent;


if (URL.uid && URL.osname) {
    var arr = [];
    ['osname', 'ua', 'ut', 'from', 'cfrom', 'uid', 'pkgname'].forEach(function(v) {
        URL[v] && (CUSTOM_ARG[v] = URL[v]);
    });
}

var tmpArg;
var PBLOG = monitor(GIF_URI, {
    customHandler: function(url) {
        var arr = [];
        if (tmpArg) {
            for (var i in tmpArg) {
                if (tmpArg.hasOwnProperty(i)) {
                    var val = tmpArg[i];
                    if ($.isPlainObject(val)) {
                        val = JSON.stringify(val);
                    }
                    arr.push(i + '=' + urlencode(val));
                }
            }
        }
        if (arr.length) {
            url += arr.join('&');
        }
        return url;
    }
});
PBLOG.init = function(cateId, obj) {
    if ($.isPlainObject(obj)) {
        CUSTOM_ARG = extend(CUSTOM_ARG, obj);
    }
    CUSTOM_ARG.data.cateid = cateId;
}

/**
 * pv统计
 * @param  {string} url 统计的pv url
 * @param  {string} su  来源url，可选
 * @return {this}     PBLOG
 */
PBLOG.pv = function(url, u) {
    tmpArg = clone(CUSTOM_ARG);
    var _data = tmpArg.data;
    _data.actionid = '1'; ////写死, actionid：2=事件统计，1=pv统计
    var data = {};
    data.url = url || location.href;
    if (u) {
        data.u = u;
    }
    _data.actiondata = extend(_data.actiondata, data);
    return PBLOG.report();
}

/**
 * /searchbox?action=pblog&service=bdbox&pu=六大公共参数data={
    "dataid":"__DATA_ID__", //区分sdk客户端：1、JS：2、SERVER：3
    "cateid":"__CATE_ID__", // 区分业务 卡片、小说、视频…
    "actionid":"__ACTION_ID__", //区分行为
    "actiontype":"__ACTION_TYPE__", //区分主动/被动行为，主动：1、被动：0
    "actiondata":"__ACTION_DATA__", //业务具体数据，json格式
}

 */

/**
 * 事件打点统计
 * @param  {string} evtName 事件名称
 * @param  {string} evtType   事件类型
 * @param  {string} evtTag    事件tag标示
 * @param  {?number} cateId    业务类型，可选用于指定打点业务类型
 * @return {object}  tc    tc函数
 */
PBLOG.event = function (evtName, evtType, evtTag, cateId, callback) {
    // console.log(arguments);
    if (!evtName) {
        throw 'monitor.tc.event need a evtName';
    }
    if ($.isPlainObject(evtType) && !evtTag) {
        var data = {
            evtName: evtName
        };
        for (var i in evtType) {
            data[i] = evtType[i];
        }
    } else {
        var data = {
            evtName: evtName,
            evtType: evtType || '',
            evtTag: evtTag || ''
        };
    }
    tmpArg = clone(CUSTOM_ARG);
    var _data = tmpArg.data;
    _data.actionid = '2'; ////写死, actionid：2=事件统计，1=pv统计
    if (cateId) {
        tmpArg.data.cateid = cateId;
    }
    _data.actiondata = extend(_data.actiondata, data);
    return PBLOG.report(null, callback);
}

/**
 * pblog, 事件跟踪
 * @memberOf Bdbox.monitor
 * @name  pblog
 * @author wangyongqing01
 * @version $Id: pblog.js 293584 2016-05-06 07:44:21Z yupeng07 $
 * @example
 * init方法一般不使用
 * Bdbox.monitor.pblog('init',[cateId])
 * //统计PV
 * Bdbox.monitor.pblog('pv')
 * //统计事件
 * Bdbox.monitor.pblog('event',[evtName, evtType, evtTag])
 * onclick="Bdbox.monitor.pblog('event',[evtName, evtType, evtTag])"
 */
module.exports = function() {
    PBLOG.main.apply(PBLOG, arguments);
    //return PBLOG.report('ep=' + urlencode(ep.join('*')) + '&et=4');
};

});;
//评论
BoxJS.define('BoxJS:bdbox/io/loadJS', function(require, exports, module, $){
var json2q = require('BoxJS:bdbox/utils/jsonToQuery');
/**
 * @namespace Bdbox.io
 */
var emptyFn = $.emptyFn;
/**
 * 加载js和jsonp
 * @memberOf Bdbox.io
 * @function
 * @param  {String|loadJSOptions}   opts      加载的url，或者options
 * @param {string|object} data 数据，选填
 * @param  {callback} success 成功回调，jsonp使用，选填
 * @author wangyongqing01
 * @version $Id: loadJS.js 286585 2016-03-15 11:57:15Z wangyongqing01 $
 * @example
 * var loadJS = require('../io/loadJS');
 * loadJS('http://libs.baidu.com/jquery/2.0.0/jquery.min.js', function(){
 *      alert(jQuery);
 * });
 * loadJS({
 *     url: 'xxx',
 *     data: {},
 *     success:function(){},
 *     error: function(){},
 *     timeout: 3000
 * });
 * //使用jsonp
 * loadJS('/someAPI?datatype=jsonp&callback=?', function(data){
 *     //这里是jsonp接收到的数据
 *     alert(data);
 * });
 */
function loadJS(opts, data, success) {
    var js = document.createElement('script');
    var url, error, timeout;
    if ($.isString(opts)) {
        url = opts;
        if ($.isFunction(data)) {
            success = data;
            data = null;
        }
    } else {
        url = opts.url;
        data = opts.data;
        success = opts.success;
        error = opts.error || $.emptyFn;
        timeout = opts.timeout;
    }
    if ($.isObject(data)) {
        data = json2q(data);
    }
    if (data) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + data;
    }



    url = url.replace(/[&?]{1,2}/, '?');
    var callbackName;
    if (/=\?/.test(url)) {
        callbackName = '_box_jsonp' + $.getId();
        url = url.replace(/=\?/, '=' + callbackName);
    }
    var HEAD = getHead();

    timeout = timeout || 2e4; //20秒超时
    js.type = 'text/javascript';


    js.src = url;
    var done = true,
        timer;
    var clear = function() {
        //防止多次回调
        if (callbackName) {
            delete window[callbackName];
        }
        timer && clearTimeout(timer);
        js.onload = js.onreadystatechange = js.onerror = null;
        // HEAD.removeChild(js);
        js = null;
    };
    var cb = function(evt, isTimeout) {
        if (js && (!js.readyState || /loaded|complete/.test(js.readyState))) {
            clear();
            if (done && $.isFunction(success)) {
                success.apply(null, $.toArray(arguments));
            }
            done = false;
        }
    };
    var errorCallback = function(evt) {
        clear();
        if (done) {
            error(evt);
        }
        done = false;
    };

    if (callbackName) {
        window[callbackName] = cb;
    }
    timer = setTimeout(function() {
        clear();
        if (done) {
            error('timeout');
        }
        done = false;
    }, timeout);

    js.onload = js.onreadystatechange = js.onerror = cb;
    js.onerror = errorCallback;
    HEAD.appendChild(js);
}
module.exports = loadJS;

function getHead() {
    return document.head || document.getElementsByTagName('head')[0] || document.documentElement;
}

});;
BoxJS.define('BoxJS:bdbox/each', function(require, exports, module, $){
/**
 * each方法
 * @memberOf Bdbox
 * @function each
 * @param  {Object} obj      要遍历的对象
 * @param  {Function} iterator 处理函数
 * @param  {Object} context  选填上下文
 * @return {Object}          Bdbox对象
 * @example
 * Bdbox.each([1,2,3], function(v, i){console.log(v,i)});
 * 1,0
 * 2,1
 * 3,2
 * //注意和jQuery和zepto的each不同，第一个参数是索引
 */
module.exports = function(obj, iterator, context) {
    if (typeof obj !== 'object') {
        return;
    }

    var i, l, t = type(obj);
    context = context || obj;
    if (t === 'array' || t === 'arguments' || t === 'nodelist') {
        for (i = 0, l = obj.length; i < l; i++) {
            if (iterator.call(context, obj[i], i, obj) === false) return;
        }
    } else {
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                if (iterator.call(context, obj[i], i, obj) === false) return;
            }
        }
    }
}


function type(obj) {
    var t;
    if (obj == null) {
        t = String(obj);
    } else {
        t = Object.prototype.toString.call(obj).toLowerCase();
        t = t.substring(8, t.length - 1);
    }
    return t;
}

});;
BoxJS.define('BoxJS:bdbox/client/o2o', function(require, exports, module, $){
/* eslint-disable */
/**
 * 调起o2o框架，支持轻应用（直达号）调起
 * @memberOf Bdbox.client
 * @name o2o
 * @param  {string} url 调起的url
 * @param  {object} opt 调起的参数
 * @return {object}     Bdbox
 *
 * @author wangyongqing01
 * @version $Id: o2o.js 289534 2016-04-07 06:00:51Z yupeng07 $
 *
 * @example
 * ```js
 * //例如：调起o2o打开百度首页
 * Box.o2o('http://m.baidu.com', {color:'0000ff'});
 * //调起o2o框架，打开首页，并且指定顶框黑条颜色改变成0000ff(16进制颜色值)
 * Box.o2o('http://m.baidu.com', {color:'0000ff'});
 * //调起直达号
 * Bdbox.client.o2o('http://m.baidu.com', {appid:xxxx})
 * ```
 */
var andInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
var encode = encodeURIComponent;
var each = require('BoxJS:bdbox/each');

var o2o = $.$isAndroid() ? function o2o(url, opt) {
    //android
    if ($.isObject(url)) {
        opt = url;
        url = url.url;
        delete opt.url;
    }
    var intent = [
        'S.bdsb_light_start_url=' + encode(url)
    ];

    if ($.isObject(opt)) {
        //android intent中不能传递不认参数，不然会报错,因为他们只是透传 intent,没有处理，所以要把多于参数去掉。
        ////2016.04.07
        var min_v = opt.min_v;
        delete opt.min_v;
        var alias = {
            color: 'i.extra_actionbar_color_id',
            appid: 'S.bdsb_wallet_appid'
        };
        each(opt, function(value, key) {
            if (key === 'color') {
                value = parseInt('0x' + value) | 0xff000000;
            }
            key = alias[key] || key;
            intent.push(key + '=' + value);
        });
    }
    intent = intent.join(';');
    var params = {
        intent: 'intent:#Intent;' + intent + ';end',
        min_v: min_v && min_v != '' ? min_v : '16783629',
        mode: '0'
    };
    //android需要统计各种O2O打开时长，扩展了几个O2O 框架，需要传component参数来区分，以及版本信息，参数不能向下兼容。
    //当参数存在component时，不设置class,因为端需要做统计使用的class不一样，为了统一以后都只传 component参数就OK。为了兼容之前的代码如果为空时class保持不变。
    //2016.04.07
    if(!opt || !opt.component || opt.component == ''){
        params.class = 'com.baidu.searchbox.wallet.WalletServiceActivity'
    }
    andInvoke('Bdbox_android_utils', 'command', [JSON.stringify(params)]);
} : function(url, opt) {
    //ios
    if ($.isObject(url)) {
        opt = url;
        url = url.url;
        delete opt.url;
    }
    var obj = {
        openurl: encode(url),
        minver: '5.3.0.0',
        isla: 0,
        opentype: 1,
        append: 0,
        rbtnstyle: 2
    };
    if ($.isObject(opt)) {
        var alias = {
            color: 'barcolor'
        }
        each(opt, function(value, key) {
            key = alias[key] || key;
            obj[key] = value;
        });
    }
    if (obj.appid) {
        obj.isla = 1;
    }
    iosInvoke('easybrowse', obj);
}

module.exports = o2o;

});;
BoxJS.define('BoxJS:bdbox/client/share', function(require, exports, module, $){
/* eslint-disable */
/**
 * 分享
 * @memberOf Bdbox.client
 * @name share
 * @version $Id$
 * @example
 * Bdbox.client.share({
 *     'content': 'xxxx',
 *     'title': 'xxxx',
 *     'linkUrl': 'xxxx',
 *     'iconUrl': 'xxx',
 *     'success': function(){},
 *     'error': function(){}
 * });
 * //设置通用native分享
 * Bdbox.client.share.setNative({
 *     'xxx': xx
 * });
 */
/* jshint -W802 */
var getVersion = require('BoxJS:bdbox/utils/getVersion'),
  version_compare = require('BoxJS:bdbox/utils/version_compare'),
  A_NAMESPACE = 'Bdbox_android_utils',
  version = getVersion(),
  ios_invokeApp = require('BoxJS:bdbox/ios/invokeApp'),
  android_invokeApp = require('BoxJS:bdbox/android/invokeApp')

var self = function (options, sc, ec) {
  var defalutOpt = {
      'mediaType': 'all',
      'title': document.title,
      'content': document.title,
      'linkUrl': location.href,
      'imageUrl': '',
      'iconUrl': '',
      'source': 'bdbox',
      'type': 'url'
    },
    attr,
    successcallback = handleCallback(sc),
    errorcallback = handleCallback(ec)

  for (attr in defalutOpt) {
    if (!options.hasOwnProperty(attr) && options[attr]) {
      options[attr] = defalutOpt[attr]
    }
  }

  if (version_compare(version, '5.3.5') >= 0 || $.isLiteBox) {
    if ($.$isIOS()) {
      opt = JSON.stringify(options)
      ios_invokeApp('callShare', {
        'options': encodeURIComponent(opt),
        'successcallback': successcallback,
        'errorcallback': errorcallback
      })
    } else {
      if (version_compare(version, '6.5') < 0) {
                // android有了imageUrl就是图片分享，但是去掉，微博就是截图分享，orz
        delete options.imageUrl
      }
      android_invokeApp(A_NAMESPACE, 'callShare', [JSON.stringify(options), successcallback, errorcallback])
    }
  }
}

var handleCallback = function (cb) {
  cb = cb || 'console.log'
  if ($.isFunction(cb)) {
    var cbname = '_shareCB_' + $.getId()
    window[cbname] = cb
    cb = cbname
  }
  return cb
}
self.setNative = function (opt) {
  var sucName = handleCallback(opt.success),
    failName = handleCallback(opt.error)
  delete opt.success
  delete opt.error

    // native和顶部[...]分享配置
  var BoxShareData = {
        // 成功回调函数名，经过测试and6.5以上微信分享success可用，ios可用
    successcallback: sucName,
        // 失败回调函数名，android6.5及其以下分享fail均不可用
    errorcallback: failName,
    options: opt
  }
  if ($.$isAndroid() && version_compare(version, '6.5') < 0) {
        // android有了imageUrl就是图片分享，但是去掉，微博就是截图分享，orz
    delete BoxShareData.options.imageUrl
  }
  window.BoxShareData = BoxShareData
}
module.exports = self

});;
BoxJS.define('BoxJS:bdbox/client/getCuid', function(require, exports, module, $){
/* eslint-disable */
/**
 * 获取cuid；
 * 手百android6.5+才提供，低版本的安卓从cookie获取的加密的cuid，ios直接从userAgent获取
 * @memberOf Bdbox.client
 * @name getCuid
 * @example:
 * Bdbox.client.getCuid();
 *
 * @version: $Id: getCuid.js 286585 2016-03-15 11:57:15Z wangyongqing01 $
 */
var getVersion = require('BoxJS:bdbox/utils/getVersion'),
    version_compare = require('BoxJS:bdbox/utils/version_compare'),
    A_NAMESPACE = 'Bdbox_android_utils',
    android_invokeApp = require('BoxJS:bdbox/android/invokeApp'),
    ios_invokeApp = require('BoxJS:bdbox/ios/invokeApp');

var self = function(callback) {
    var cuid;
    if ($.$isIOS()) {
        if (version_compare(getVersion(), '8.4') > 0) {
            ios_invokeApp('utils', {
                action: 'getCUID'
            }, function(data) {
                try {
                    // 非加密
                    cuid = JSON.parse(data).unique_id;
                } catch (e) {}
                callback && callback(cuid);
            });
            return;
        }
        var reg = /baiduboxapp\/.*\/(\w+)\/\d/,
            ua = navigator.userAgent,
            list = ua.match(reg);
        // 非加密
        cuid = list ? list[1] : '';
    } else {
        if (version_compare(getVersion(), '6.5') >= 0 || $.isLiteBox) {
            // 非加密
            cuid = android_invokeApp(A_NAMESPACE, 'getcuid').result;
        } else {
            // 加密
            var match = document.cookie.match(/BAIDUCUID=(.+?);/);
            cuid = match ? match[1] : '';
        }
    }
    callback && callback(cuid);
    return cuid;
};
module.exports = self;

});;
BoxJS.define('BoxJS:bdbox/utils/each', function(require, exports, module, $){
module.exports = function(obj, callback, scope) {
    if ($.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
            if (callback.call(scope || obj[i], obj[i], i) === false) {
                return obj
            }
        }
    } else {
        for (var key in obj) {
            if (callback.call(scope || obj[key], obj[key], key) === false) {
                return obj
            }
        }

    }
    return obj;
};

});;
BoxJS.define('BoxJS:bdbox/event/delegate', function(require, exports, module, $){
/* eslint-disable */
/* jshint ignore: start */

var each = require('BoxJS:bdbox/utils/each');
var classSelectorRE = /^\.([\w-]+)$/,
    idSelectorRE = /^#([\w-]*)$/,
    tagSelectorRE = /^[\w-]+$/,
    hover = {
        mouseenter: 'mouseover',
        mouseleave: 'mouseout'
    },
    handlers = {};
var returnTrue = function() {
    return true
},
    returnFalse = function() {
        return false
    },
    ignoreProperties = /^([A-Z]|layer[XY]$)/,
    eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
    };
/**
 * 事件代理，用法同Zepto.delegate
 * @memberOf Bdbox.event
 * @namespace delegate
 * @author wangyongqing01
 * @version $Id: delegate.js 286585 2016-03-15 11:57:15Z wangyongqing01 $
 */
var delegate = {
    /**
     * on方法
     * @memberOf Bdbox.event.delegate
     * @param  {element}   parentNode 父节点
     * @param  {string}   selector   选择器
     * @param  {string}   event      事件类型
     * @param  {Function} callback   回调函数
     */
    on: function(parentNode, selector, event, callback) {
        return add(parentNode, event, callback, selector, function(fn) {
            return function(e) {
                var evt, match = closest(e.target, selector, parentNode);
                if (match) {
                    evt = createProxy(e);
                    evt.currentTarget = match;
                    evt.liveFired = parentNode;
                    return fn.apply(match, [evt].concat([].slice.call(arguments, 1)));
                }
            };
        });
    },
    /**
     * off方法
     * @memberOf Bdbox.event.delegate
     * @param  {Element}   parentNode 父节点
     * @param  {string}   selector   选择器
     * @param  {string}   event      事件类型
     * @param  {Function} callback   回调函数
     */
    off: function(parentNode, selector, event, callback) {
        return remove(parentNode, event, callback, selector);
    }
};

module.exports = delegate;


function bid(element) {
    return element._bid || (element._bid = $.getId());
}

function createProxy(event) {
    var key, proxy = {
            originalEvent: event
        };
    for (key in event)
        if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key];

    each(eventMethods, function(predicate, name) {
        proxy[name] = function() {
            this[predicate] = returnTrue;
            return event[name].apply(event, arguments);
        };
        proxy[predicate] = returnFalse;
    })
    return proxy;
}

function parse(event) {
    var parts = ('' + event).split('.')
    return {
        e: parts[0],
        ns: parts.slice(1).sort().join(' ')
    }
}

function add(element, events, fn, selector, getDelegate, capture) {
    var id = bid(element),
        set = (handlers[id] || (handlers[id] = []));

    eachEvent(events, fn, function(event, fn) {

        var handler = parse(event)
        handler.fn = fn
        handler.sel = selector
        // emulate mouseenter, mouseleave
        if (handler.e in hover) fn = function(e) {
            var related = e.relatedTarget
            if (!related || (related !== this && !contains(this, related)))
                return handler.fn.apply(this, arguments)
        }
        handler.del = getDelegate && getDelegate(fn, event)
        var callback = handler.del || fn
        handler.proxy = function(e) {
            var result = callback.apply(element, [e].concat(e.data))
            if (result === false) {
                e.preventDefault();
                e.stopPropagation();
            }
            return result
        }
        handler.i = set.length;
        set.push(handler);
        if ('addEventListener' in element) {

            element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
        }
    })
}

function realEvent(type) {
    return hover[type] || type
}

function eventCapture(handler, captureSetting) {
    return handler.del &&
        (handler.e == 'focus' || handler.e == 'blur') || !! captureSetting
}

function eachEvent(events, fn, iterator) {
    events.split(/\s/).forEach(function(type) {
        iterator(type, fn)
    });
}

function remove(element, events, fn, selector, capture) {
    var id = bid(element)
    eachEvent(events || '', fn, function(event, fn) {
        findHandlers(element, event, fn, selector).forEach(function(handler) {
            delete handlers[id][handler.i]
            if ('removeEventListener' in element) {
                element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
            }
        });
    })
}



function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return (handlers[bid(element)] || []).filter(function(handler) {
        return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || bid(handler.fn) === bid(fn)) && (!selector || handler.sel == selector)
    })
}

function closest(node, selector, context) {
    var collection = false;

    while (node && !(collection ? collection.indexOf(node) >= 0 : matches(node, selector))) {
        node = node !== context && !isDocument(node) && node.parentNode
    }
    return node;
}

function isDocument(obj) {
    return obj != null && obj.nodeType == obj.DOCUMENT_NODE
}

function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
}

function matches(element, selector) {
    if (!element || element.nodeType !== 1) {
        return false
    }
    var matchesSelector = element.webkitMatchesSelector || element.matchesSelector;
    if (matchesSelector) {
        return matchesSelector.call(element, selector);
    }
    // fall back to performing a selector:
    var match, parent = element.parentNode,
        temp = !parent;
    if (temp)(parent = tempParent).appendChild(element);
    match = ~qsa(parent, selector).indexOf(element);
    temp && tempParent.removeChild(element);
    return match;
};

var qsa = function(element, selector) {
    var found;
    return (isDocument(element) && idSelectorRE.test(selector)) ?
        ((found = element.getElementById(RegExp.$1)) ? [found] : []) :
        (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
        slice.call(
            classSelectorRE.test(selector) ? element.getElementsByClassName(RegExp.$1) :
            tagSelectorRE.test(selector) ? element.getElementsByTagName(selector) :
            element.querySelectorAll(selector)
    );
};

function contains(parent, node) {
    return parent !== node && parent.contains(node)
}

});;
//关注
BoxJS.define('BoxJS:bdbox/android/invokeLiteApp', function(require, exports, module, $){
/* eslint-disable */
/**
 * @namespace Bdbox.android
 */
/**
 * @memberOf Bdbox.android
 * @name invokeApp
 * @function
 * @param  {String} name android提供的命名空间
 * @param  {String} func android命名空间下的方法名
 * @param  {Array} args 接受参数
 * @return {Object}      返回对象格式的json
 * @requires common:bdbox/utils/version_compare
 * @requires common:bdbox/utils/getVersion
 * @version  $Id: invokeApp.js 286328 2016-03-14 08:32:28Z wangyongqing01 $
 */
function invokeApp (name, func, args) {
  if (args && !$.isArray(args)) {
    args = Array.prototype.slice.call(arguments, 0).slice(2)
  }
  if (!$.$isLiteBox() || !$.$isAndroid()) {
    return {
      error: 201
    }
  }
  var back = execCaller(name, func, args)

  back = back ? JSON.parse(back) : {}
  back.__from = 'liteApp'
  return back
}

function execCaller (nameSpace, funcName, funcArgs) {
  // 保证要有[]
  var caller = {
    obj: nameSpace,
    func: funcName,
    args: funcArgs ? funcArgs : []
  }
  try {
    return window.prompt('BdboxApp:' + JSON.stringify(caller))
  } catch (e) {
    return {
      error: 201
    }
  }
}
module.exports = invokeApp

});;
BoxJS.define('BoxJS:bdbox/ios/open', function(require, exports, module, $){
/**
 * ios打开schema协议，封装了callback方法
 * @memberOf Bdbox.ios
 * @function
 * @name open
 * @param  {String} url schema协议，比如`baiduboxappv5://openxxx?abc=fff`
 * @param  {Function} callback 回调函数，接收一个参数isTimeout
 * @example
 * Bdbox.ios.open('baiduboxapp://', function(isTimeout) {
 *   if (isTimeout) {
 *       console.log('通过isTimeout是true，判断没有安装');
 *   } else {
 *       console.log('成功');
 *   }
 * });
 * @version $Id: open.js 260791 2015-08-18 06:42:13Z wangyongqing01 $
 */

function openIos(url, callback) {
    if (!url) {
        $.isFunction(callback) && callback(false);
        return;
    }
    // 记录起始时间
    var last = Date.now();
    // 创建一个iframe
    var ifr = document.createElement('IFRAME');
    ifr.src = url;
    ifr.style.display = 'none';
    // 飘出屏幕外
    ifr.style.position = 'absolute';
    ifr.style.left = '-2000px';
    ifr.style.top = '-1000px';
    ifr.style.width = '1px';
    ifr.style.height = '1px';
    // 设置一个4秒的动画用于检查客户端是否被调起
    ifr.style.webkitTransition = 'all 1s';
    ifr.style.transition = 'all 1s';
    document.body.appendChild(ifr);
    setTimeout(function() {
        var end = function() {
            document.body.removeChild(ifr);
            if (Date.now() - last < 1500) {
                // 如果动画执行时间在预设范围内，就认为没有调起客户端
                callback(true);
            } else {
                // 动画执行超过预设范围，认为调起成功
                callback(false);
            }
        }

        // 监听动画完成时间
        ifr.addEventListener('webkitTransitionEnd', end, false);
        ifr.addEventListener('transitionEnd', end, false);
        // 启动动画
        ifr.style.left = '-10px';
    }, 0);
}

module.exports = openIos;

});;
BoxJS.define('BoxJS:bdbox/client/toast', function(require, exports, module, $){
/* eslint-disable */

/**
 * 使用客户端弹toast；
 * @memberOf Bdbox.client
 * @name toast
 *
 */
var getVersion = require('BoxJS:bdbox/utils/getVersion');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var A_NAMESPACE = 'Bdbox_android_utils';
var ios_invokeApp = require('BoxJS:bdbox/ios/invokeApp');
var android_invokeApp = require('BoxJS:bdbox/android/invokeApp');
var invokeLiteApp = require('BoxJS:bdbox/android/invokeLiteApp');

var self = function (string) {

    if ($.$isLiteBox()) {
        invokeLiteApp(A_NAMESPACE, 'toast', [string]);
        return;
    }

    if ($.$isIOS()) {
        if (version_compare(getVersion(), '6.0') < 0) {
            return;
        }

        ios_invokeApp('utils', {
            action: 'toast',
            string: string,
            minver: '6.0.0.0'
        });

    } else {
        if (version_compare(getVersion(), '4.6') < 0) {
            return;
        }

        android_invokeApp(A_NAMESPACE, 'toast', [string]);
    }
};

module.exports = self;

});;

/**
 * BoxJS注入 JS 部分
 */
BoxJS.define('BoxJS:utils/ready', function(require, exports, module, $){
/* eslint-disable */
module.exports = function() {
    var _completes = [];
    var _isReady = false;

    function ready(fn) {
        if (_isReady) {
            fn();
        } else {
            _completes.push(fn);
        }
    }

    function complete() {
        if (_isReady) {
            return;
        }
        _isReady = true;
        _completes.forEach(function(fn) {
            fn();
        });
        _completes.length = 0;
    }
    return {
        ready: ready,
        complete: complete,
        isReady: function() {
            return _isReady;
        }
    };
};

});;
var injectReady = require('BoxJS:utils/ready')();
$.ready = injectReady.ready;
/**
 * 暴露注入JS的API
 */
var _extend = require('BoxJS:bdbox/extend');
$.injectComplete = function(boxjsNative){
    boxjsNative = boxjsNative || window._Box_;
    $.broadcast = boxjsNative.event.broadcast;
    $.fire = $.broadcast.fire;
    $.on = $.broadcast.on;
    $.off = $.broadcast.off;
    $.offAll = $.broadcast.removeAll;
    _extend($, _Box_.invoke);
    injectReady.complete();
};

injectReady.ready(function() {
    console.log('BoxJS is ready');
});
/**
 * 开始注入
 * 如果在框内并且版本7.4及以上，就申请注入inject.js
 */
BoxJS.define('BoxJS:invoke/utils/injectJS', function(require, exports, module, $){
/* eslint-disable */
var iosInvokeApp = require('BoxJS:bdbox/ios/invokeApp');
var androidInvokeApp = require('BoxJS:bdbox/android/invokeApp');
/**
 * 注入JS
 * @param  {Function} callback [回调函数]
 * {
 *     "errno": "注入是否成功，0失败/1成功",
 *     "errmsg": "失败描述。String"
 * }
 */
module.exports = function(callback) {
    if (!callback && $.isFunction(callback)) {
        console.log('error: callback is null or type is not function');
        return;
    }

    var callName = '_BoxJS_feed_injectJS_' + $.getId();
    window[callName] = function(data) {
        var callbackData;
        if ($.isIOS) {
            callbackData = JSON.parse(data);
        } else {
            callbackData = data;
        }
        callback(callbackData);
    };
    if ($.isBox || $.isLiteBox) {
        if ($.isIOS) {
            iosInvokeApp('feed', {
                action: 'injectJS'
            }, callName);
        } else {
            androidInvokeApp('Bdbox_android_feed', 'injectJS', [callName]);
        }
    } else {
        console.log('bdbox is fail');
    }
};

});;
var injectJS = require('BoxJS:invoke/utils/injectJS');
injectJS(function(data) {
    if (data.errno == '1') {
        console.log('inject success');
    } else {
        console.log('_Box_ inject fail');
    }
});

$.getVersion = require('BoxJS:bdbox/utils/getVersion');
$.version_compare = require('BoxJS:bdbox/utils/version_compare');
$.invokeIOS = require('BoxJS:bdbox/ios/invokeApp');
$.invokeAndroid = require('BoxJS:bdbox/android/invokeApp');
$.newInvoke = require('BoxJS:bdbox/invoke/newInvoke');

var configReady = require('BoxJS:utils/ready')(); //@Todo支持后续异步扩展
$.config = function(opt, fn) {
        if (opt.id == 'feed') { //@Todo,先 inline
            BoxJS.define('BoxJS:ui/comment/index', function(require, exports, module, $){
/* eslint-disable */
BoxJS.define('BoxJS:bdbox/comment/duration', function(require, exports, module, $){
/* eslint-disable */
var invoke = require('BoxJS:bdbox/invoke/newInvoke');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');

/**
 * 展现时长统计
 * @param  {Object} data 上报数据，具体参数参考：
 */
module.exports = function(params) {
    if (($.$isBox() && version_compare(getVersion(), '8.3') >= 0) || $.$isLiteBox()) {
        var data = { key: params.data.key };
        if (params.data.options) {
            data.options = params.data.options;
        }
        switch (params.action) {
            case 'appear':
                invoke('v4/ubc/duration/appear', {
                    params: encodeURIComponent(JSON.stringify(data))
                });
                break;
            case 'disappear':
                invoke('v4/ubc/duration/disappear', {
                    params: encodeURIComponent(JSON.stringify(data))
                });
                break;
        }
    }
};

});;
BoxJS.define('BoxJS:bdbox/comment/favLs', function(require, exports, module, $){
/* eslint-disable */
var KEY = 'cmtfav';
var MAX = 1024 * 1024 * 0.5;
var clone = require('BoxJS:bdbox/clone');

module.exports = function(key) {
    var data = { key: [] };
    try{
        data = window.localStorage.getItem(KEY) ? JSON.parse(window.localStorage.getItem(KEY)) : { key: [] };
    }catch(e){};
    var favData = data[key];

    clearFav();

    function initFavData() {
        if (!favData) {
            data.key.push(key);
            data[key] = {};
            favData = data[key];
        }
    }

    function clearFav() {
    	//必须有2篇评论时，才进行删除尝试。
        if (data && data.key && data.key.length > 1) {
        	try{
    			var str = JSON.stringify(data);
    			if(str.length * 2 > MAX){
                	delete data[data.key.shift()];
    			}
	        	save();
        	}catch(e){}
        }
    }

    function save() {
    	try{
        	window.localStorage.setItem(KEY, JSON.stringify(data));
    	}catch(e){
            try{
                window.localStorage.setItem(KEY, '');
            }catch(e){}
        }
    }
    /**
     * 点赞
     * @param  {String} id [点在id]
     * @return {Object}    [点赞的状态]
     * return {
     *     hadFav:true,//是否已经点过
     *     state:1,//1点亮状态，0非点亮状态
     * }
     */
    function fav(id) {
        initFavData();
        var favState = {hadFav: true};
        if (favData[id] === undefined) {
            favState.hadFav = false;
            favData[id] = 0;
        }
        favData[id] = Number(!favData[id]);
        favState.state = favData[id];
        save();
        return favState;
    }
    /**
     * 获取点赞数据
     * @return {Object} 已经点过的id数据
     * {
     *     1111:1,
     *     1112:0
     * }
     */
    function getData() {
        return favData ? clone(favData) : null;
    }

    return {
        getData: getData,
        fav: fav
    };
};

});;
BoxJS.define('BoxJS:bdbox/comment/timingLs', function(require, exports, module, $){
/* eslint-disable */
/**
 * 评论缓存用户发布的评论，默认过期时长60分钟。
 * 混存最细力度：分钟级别
 *
 * var timingCach = require('common:bdbox/comment/timingCache')($key, $time)
 * $key:String 自定义纬度的唯一标识，例如：评论id+用户id
 * $time:int 过期时长，单位：分钟
 *
 * timingCach.add($data);
 * timingCach.get();
 * timingCach.remove($timeId, 0);
 */
var KEY = '__comment_timing__';
var ease = 60000;

var clone = require('BoxJS:bdbox/clone');

module.exports = function(key, disTime) {
    disTime = disTime ? Math.floor(disTime) : 30;
    var timingData = {};
    try{
        timingData = window.localStorage.getItem(KEY) ? JSON.parse(window.localStorage.getItem(KEY)) : {};
    }catch(e){}
    clear();
    /**
     * 添加缓存
     * @param {*} data 需要缓存数据
     * @return {Object}
     *
     * 存储数据结构：
     * {
     *  $timeId:[$content, $content]
     * }
     */
    function add(data) {
        clear();
        if (!timingData[key]) {
            timingData[key] = [];
        }
        var d = {
            index: +Date.now(),
            time: Math.floor(Date.now() / ease),
            data: clone(data)
        }
        timingData[key].push(d);
        save();
        return d;
    }
    /**
     * 获取缓存
     * @return {Array} 返回缓存的数据
     * 返回数据结构：
     * [{
     *  $index: 11233,//索引值
     *  $time:1234567,//自动生成的Id,计算公式：Math.floor(存储时本地时间戳/过期时长)
     *  $data:*,//原始数据
     * }]
     * $timeId   存储时
     * $content  存储内容
     */
    function get() {
        clear(); //获取前先清除过期数据。
        return clone(timingData[key]);
    }
    /**
     * 删除某条缓存
     * @param {int} index  删除数据，对应存储数组内的索引
     */
    function remove(index) {
        if (!timingData[key]) {
            return;
        }
        for (var i = timingData[key].length - 1; i >= 0; i--) {
            if (timingData[key][i].index == index) {
                timingData[key].splice(i, 1);
            }
        }
        if (timingData[key].length == 0) {
            delete timingData[key];
        }
        save();
    }
    /**
     * 清除过期数据
     * 正常操作不需要关注
     */
    function clear() {
        if (timingData) {
            var clearTime = Math.floor(Date.now() / ease) - disTime;
            for (var i in timingData) {
                for (var j = timingData[i].length - 1; j >= 0; j--) {
                    if (clearTime > timingData[i][j].time) {
                        timingData[i].splice(j, 1);
                    }
                }
                if (timingData[i].length == 0) {
                    delete timingData[i];
                }
            }
            save();
        }
    }

    function save(){
        try{
           localStorage.setItem(KEY, JSON.stringify(timingData));
        }catch(e){
            try{
                window.localStorage.setItem(KEY, '');
            }catch(e){}
        }
    }

    return {
        add: add,
        get: get,
        remove: remove,
        clear: clear
    };
};

});;
BoxJS.define('BoxJS:bdbox/comment/commentStyle', function(require, exports, module, $){
/* eslint-disable */
module.exports = function () {
    var str = "@charset \"UTF-8\";\n/**\n * @file 评论sdk样式\n * commentSDK: 框外及非交互评论样式\n * cmtList: 交互式评论样式(来自unicomment)\n */\n/* 非公共部分 */\n.commentsdk {\n  background-color: #fff;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.05);\n  tap-highlight-color: rgba(0, 0, 0, 0.05);\n}\n\n.cmt-page:last-child .cmt-list:last-child .cmt-bar:after,\n.cmt-page:last-child .cmt-list:last-child .cmt-sublists:after {\n  display: none;\n}\n";
    str += ".commentEmbed-footer .commentEmbed-inputBox-warp:before, .commentEmbed .headIcon:before, .commentEmbed .headIcon:after {\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0;\n}\n\n.commentEmbed .commentEmbed-title:after, .commentEmbed .commentEmbed-title .title-text:after, .commentEmbed .commentEmbed-listItem:after, .commentEmbed .commentEmbed-layer:last-child:after {\n  -webkit-transform-origin: 0 100%;\n  transform-origin: 0 100%;\n}\n\n.commentEmbed-footer .commentEmbed-inputBox-warp, .commentEmbed .commentEmbed-title, .commentEmbed .commentEmbed-title .title-text, .commentEmbed .commentEmbed-listItem, .commentEmbed .commentEmbed-layer:last-child, .commentEmbed .headIcon {\n  position: relative;\n  overflow: hidden;\n}\n\n@media (-webkit-device-pixel-ratio: 1.5) {\n  .commentEmbed-footer .commentEmbed-inputBox-warp:before, .commentEmbed .commentEmbed-title:after, .commentEmbed .commentEmbed-title .title-text:after, .commentEmbed .commentEmbed-listItem:after, .commentEmbed .commentEmbed-layer:last-child:after, .commentEmbed .headIcon:before, .commentEmbed .headIcon:after {\n    width: 150%;\n    height: 150%;\n    -webkit-transform: scale(0.66667);\n    transform: scale(0.66667);\n  }\n}\n\n@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5), (min-resolution: 144dpi), (min-resolution: 1.5dppx) {\n  .commentEmbed-footer .commentEmbed-inputBox-warp:before, .commentEmbed .commentEmbed-title:after, .commentEmbed .commentEmbed-title .title-text:after, .commentEmbed .commentEmbed-listItem:after, .commentEmbed .commentEmbed-layer:last-child:after, .commentEmbed .headIcon:before, .commentEmbed .headIcon:after {\n    width: 200%;\n    height: 200%;\n    -webkit-transform: scale(0.5);\n    transform: scale(0.5);\n  }\n}\n\n@media (-webkit-device-pixel-ratio: 3) {\n  .commentEmbed-footer .commentEmbed-inputBox-warp:before, .commentEmbed .commentEmbed-title:after, .commentEmbed .commentEmbed-title .title-text:after, .commentEmbed .commentEmbed-listItem:after, .commentEmbed .commentEmbed-layer:last-child:after, .commentEmbed .headIcon:before, .commentEmbed .headIcon:after {\n    width: 300%;\n    height: 300%;\n    -webkit-transform: scale(0.33333);\n    transform: scale(0.33333);\n  }\n}\n\n.commentEmbed-footer .commentEmbed-inputBox-warp:before {\n  content: '';\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  height: 1px;\n  pointer-events: none;\n}\n\n.commentEmbed .commentEmbed-title:after, .commentEmbed .commentEmbed-title .title-text:after, .commentEmbed .commentEmbed-listItem:after, .commentEmbed .commentEmbed-layer:last-child:after {\n  content: '';\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  height: 1px;\n  pointer-events: none;\n}\n\n.commentEmbed .headIcon:before {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 0;\n  pointer-events: none;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\nhtml {\n  font-size: 100px;\n}\n\n@media screen and (max-width: 360px) {\n  html {\n    font-size: 90px;\n  }\n}\n\n.commentEmbed {\n  background-color: #fff;\n}\n\n.commentEmbed .commentEmbed-title {\n  position: relative;\n  height: 0.4rem;\n  line-height: 0.4rem;\n  font-size: 0.16rem;\n  color: #999;\n  margin: 0 0.17rem;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.commentEmbed .commentEmbed-title:after {\n  height: 2px;\n  background-color: #eaeaea;\n}\n\n.commentEmbed .commentEmbed-title .title-text {\n  position: relative;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  display: inline-block;\n  height: 0.4rem;\n  line-height: 0.4rem;\n  z-index: 3;\n}\n\n.commentEmbed .commentEmbed-title .title-text:after {\n  height: 2px;\n  background-color: #3c76ff;\n}\n\n.commentEmbed .commentEmbed-listItem {\n  position: relative;\n  margin: 0 0.17rem;\n  padding: 0.14rem 0 0.1rem;\n}\n\n.commentEmbed .commentEmbed-listItem:after {\n  height: 1px;\n  background-color: #eaeaea;\n}\n\n.commentEmbed .commentEmbed-layer:active {\n  background-color: #f2f2f2;\n}\n\n.commentEmbed .commentEmbed-layer:last-child:after {\n  height: 1px;\n  background-color: #eaeaea;\n}\n\n.commentEmbed .commentEmbed-layer:last-child .commentEmbed-listItem {\n  border-bottom-width: 0;\n}\n\n.commentEmbed .headIcon {\n  width: 0.35rem;\n  height: 0.35rem;\n  display: block;\n  border-radius: 100%;\n  position: absolute;\n  top: 0.14rem;\n  left: 0;\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: 50% 50%;\n}\n\n.commentEmbed .headIcon:before {\n  border-top: 1px solid #eaeaea;\n  border-left: 1px solid #eaeaea;\n  border-radius: 100%;\n}\n\n.commentEmbed .headIcon:after {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 0;\n  pointer-events: none;\n  border-right: 1px solid #eaeaea;\n  border-bottom: 1px solid #eaeaea;\n  border-radius: 100%;\n}\n\n.commentEmbed .commentEmbed-content {\n  line-height: 1;\n  position: relative;\n  padding-left: 0.43rem;\n}\n\n.commentEmbed .commentEmbed-content .cmt-author {\n  color: #999;\n}\n\n.commentEmbed .commentEmbed-content .cmt-vip {\n  padding-left: 0.21rem;\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAMAAAANxBKoAAAAh1BMVEUAAAD/uj3/ujr/uDr/uDn/uDr/uDn/uTv/uDn/uTv/ujv/ujz/uj3/vUD/zk7/uDr/uDn/uDr/uDr/uDn//8L/uDn/uDn/ujv/uDz/uz3/uDn/uDn/wEL/0VH/uDr/uTn/uTr/ujr/ujv/uDn/uDr/uTr/tzn/uDn/uDn/uDv/uTn/uTz/tzlD21yEAAAALHRSTlMAIydm79yiXfk6MSwfEwjnqJ174gHztVFAGtHJDQTEhVZGL5OQcsC/j2xMN40FCIsAAAGFSURBVEjHrZTpboMwEIQNGMJNoATIfTS95/2fr8nKjgx22Vbq/EGMR/Bhxiv+pmH4SjPf9+7ysyxNhs+dXivOiV7z/dtSIp4wkQxLne5XMBXXos2CSJvdIi1aYapI1Kq8njL1lDSm8MbNmgE4FIaxpPTSnfYAuTaNBaUP7vQReBkZaxBb6wrvJMJybIUU913pBugnVk3pwBEuJF7vVxs8cqSvQDr1ckqHdjiPUVumAl9bfoQVmS7w09S+AI2V1eDPU7vDU+lI585/PwCLiWWC78bmFlv1x5zg55F3AhIraIAfTWsf6qLZ4HaxAsS5+EF0iGJjB8qKXuVWBGDE2aCij54Bb4w6UctmwTuh9Y7N/naZBZfto060nQz45XHXiTkFlP7QdYr92bRnHvxONYwBr1SdJE0QFtyjOtFQ4MGpoj1C2j0evKY69YJVpY5ygDfl8OBFWRlDgQPvmzsNL5/SkVRDgQdXReSl57g1FPgd/zW4ORR48MQ0OPAlG3IPBR5804h/0zcpFzrmMKUwuAAAAABJRU5ErkJggg==) 0.08rem center no-repeat;\n  background-size: 0.11rem 0.11rem;\n  white-space: nowrap;\n}\n\n.commentEmbed .commentEmbed-content .commentEmbed-name {\n  font-size: 0.16rem;\n  color: #405b95;\n}\n\n.commentEmbed .commentEmbed-content .commentEmbed-name .commentEmbed-fav {\n  float: right;\n  color: #999;\n  font-size: 0.13rem;\n  line-height: 1.3;\n}\n\n.commentEmbed .commentEmbed-content .commentEmbed-name .commentEmbed-favWord {\n  line-height: 1.3;\n  float: right;\n  font-size: 0.13rem;\n  color: #999;\n}\n\n.commentEmbed .commentEmbed-content .commentEmbed-msg {\n  margin: 0.06rem 0 0 0;\n  font-size: 0.18rem;\n  color: #333;\n  line-height: 0.26rem;\n  word-break: break-all;\n  -webkit-line-clamp: 3;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.commentEmbed .commentEmbed-content .commentEmbed-time {\n  margin: 0.06rem 0 0 0;\n  font-size: 0.13rem;\n  color: #999;\n  line-height: 1;\n}\n\n.commentEmbed .commentEmbed-nolist {\n  text-align: center;\n  font-size: 0.16rem;\n  color: #333;\n  line-height: 0.69rem;\n}\n\n.commentEmbed .commentEmbed-more {\n  height: 0.4rem;\n  line-height: 0.4rem;\n  text-align: center;\n  font-size: 0.16rem;\n  color: #3c76ff;\n}\n\n.commentEmbed .commentEmbed-more:active {\n  background-color: #f2f2f2;\n}\n\n.commentEmbed .commentEmbed-nolist + .commentEmbed-more {\n  display: none;\n}\n\n.commentEmbed .commentEmbed-backHomeBtn {\n  padding: 0.1rem 0.18rem;\n}\n\n.commentEmbed .commentEmbed-backHomeBtn p {\n  color: #3c76ff;\n  text-align: center;\n  font-size: 0.14rem;\n  border-radius: 0.04rem;\n  border: 1px solid #3c76ff;\n  height: 0.39rem;\n  line-height: 0.39rem;\n}\n\n.commentEmbed-footer {\n  position: relative;\n  width: 100%;\n  height: 44px;\n}\n\n.commentEmbed-footer .commentEmbed-inputBox-warp {\n  box-sizing: border-box;\n  position: fixed;\n  z-index: 99;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  height: inherit;\n  background: #f5f5f5;\n  padding: 0 26px 0 10px;\n  display: box;\n  display: -webkit-box;\n  -webkit-box-align: center;\n  box-align: center;\n}\n\n.commentEmbed-footer .commentEmbed-inputBox-warp:before {\n  height: 1px;\n  background-color: #ccc;\n}\n\n.commentEmbed-footer .commentEmbed-inputBox-warp .commentEmbed-inputBox-input {\n  -webkit-box-flex: 1;\n  box-flex: 1;\n  background: #fff;\n  border: 1px solid #ccc;\n  -webkit-border-radius: 16px;\n  border-radius: 5px;\n  height: 30px;\n  line-height: 30px;\n  font-size: 14px;\n  color: #999;\n  padding-left: 10px;\n}\n\n.commentEmbed-footer .commentEmbed-inputBox-warp .commentEmbed-inputBox-icon {\n  position: relative;\n  width: 18px;\n  height: 18px;\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxNjViODFjYS00ZjQ1LTRiYTYtYTc5OC00MGI1Njk5M2Y2NmQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTg2RkEzNTZGNTc5MTFFNTlFRTRFRTI2NDJDQjUzRTAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTg2RkEzNTVGNTc5MTFFNTlFRTRFRTI2NDJDQjUzRTAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTdlMWU4Y2QtNDUwZi00ZjgwLTg0ZTgtMWQ1NzA3ODE2ZDk1IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MjQ3Y2Y0NDAtMWQwYi0xMTc5LTg5MWUtZDRhOWFiZTMzMzMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+meFUOgAAAZhJREFUeNrsmLtKA0EYhWeXxcIbpvEBfIZoZyFYWAXfQBAbxWgsZBGxVBvBK9iqjWAhqIVPEMRY6BNYKVgm3tCArOfXM7KERF3N7G4xB77s7Pwz+Q+zs5mZOL7vKyoHCqAXtKt49AguwCo4kQqXgSVwBAZiNKOYS3Ie08OHIRmZOVAFUyADnJjoYs4qPeQ8fMzQ7SzYVPGqwpwyMGviRQpZBvdUctrhNeuG5kw5QUMVPadclTJZQ9aQNWQNNdAieODVRPxLDrYfgS5/0+4VtHC70GEgLgqijNAKeAIbhuKRRygOBfYts4asIWsoLYb05r47QR86d1kMFXmTT9CQzl2Ug+IyGALzPBLtgvs6na5r7jPkP+oEI2AavIkXjyOU5wmyQOque6HyIDhogiEtMTOpR0i0Dc5Y2QfaQo17ajqPc9WWvrfcWvxVsgMogS1wpfilWlIx1mgVZtt1MME62WwthOJNkfeLZyx6Bqd8VC9gFOybmN0/GdLzppVm7sAwODf1unkR2l6qz/+SbtLwS30I+k2bEb0LMADPElcDZK2pTwAAAABJRU5ErkJggg==) no-repeat;\n  background-size: 100% 100%;\n  margin-left: 26px;\n}\n\n.commentEmbed-footer .commentEmbed-inputBox-warp .commentEmbed-inputBox-icon .commentEmbed-inputBox-icon-num {\n  position: absolute;\n  background-color: #f43531;\n  top: 0;\n  right: 0;\n  padding: 0 8px;\n  border-radius: 15px;\n  font-size: 18px;\n  -webkit-transform: translate(55%, -25%) scale(0.5, 0.5);\n  transform: translate(55%, -25%) scale(0.5, 0.5);\n  -webkit-transform-origin: 50% 0%;\n  transform-origin: 50% 0%;\n}\n\n.commentEmbed-footer .commentEmbed-inputBox-warp .commentEmbed-inputBox-icon .commentEmbed-inputBox-icon-num p {\n  text-align: center;\n  color: #fff;\n  white-space: nowrap;\n}\n\n.commentEmbed-footer .commentEmbed-inputBox-warp .commentEmbed-inputBox-icon:after {\n  content: '';\n  display: block;\n  position: absolute;\n  top: -10px;\n  left: -10px;\n  right: -20px;\n  bottom: -10px;\n}\n\n.commentEmbed-footer .commentEmbed-inputBox-warp .commentEmbed-inputBoxShare-icon {\n  position: relative;\n  width: 18px;\n  height: 18px;\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxNjViODFjYS00ZjQ1LTRiYTYtYTc5OC00MGI1Njk5M2Y2NmQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTYxNzE0NkZGNUEzMTFFNTlFRTRFRTI2NDJDQjUzRTAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTYxNzE0NkVGNUEzMTFFNTlFRTRFRTI2NDJDQjUzRTAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTY0N2ZkM2YtMTVlMC00NWQxLTkzMjAtZTA2NzJmYmUwZTc5IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MjQ3Y2Y0NDAtMWQwYi0xMTc5LTg5MWUtZDRhOWFiZTMzMzMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+B3++1wAAAfhJREFUeNrsmD9IQlEUxi2N6A8ERRBBQVJrDU3RVENDQW0t4lLUGlLSCxoaIqOtqcGoBiEKp0DIISiKGgqKaspwkciphkKiP76+B5/wkPd8vud96uCBH+f69Nz7eb333HuskmXZIUmSo1ysWuNZN9gBCfAHZA3ugTMr7lzns/lwkenEldXpGDgADQZf5Ffj2Qd4z3MinBy7hgxqCeoBh6Ae7INlEDcx26MG77eAGTDFsTRNLUiimCCYFbgsGtn3HNuZ2TwBN2BVT9AI/bpAMUNgD3Ty9SnYAkfgCzTlEtROHxckZhGscePcAh84MwpyGew4q7YB/GxvggWdjZBTkCjzk28wDUJmgkULUtZMgLnFy11bcGK0anVgmzkmYEWMaEHzwA0ewYrIo8NqrvGxrSzgn1IL8oBmJrpoIR2JWtRe+qDJuE/wwMwtTJAyMwO8GYRNxioxvaJ/smH2cw3e7LgPmbV++ku7LmhmLTPld+UiqIP+yWK8co8aF7mo2+gTFuPDzO61ogRdgVaQLODIEZqHJuyuOsquDKoIqgiyKihdQh1pLUGv9O4iCumiT2oJiqrqqWLZEv2xliClYk2xjA6p1Ns1MyHW+il1tazO1DEwyWrBQ+y2FMeM6e2yCOgDu+DFpoWeZt+7HCtidJY98y+TSh5S7F+AAQD/s2zbaL07eAAAAABJRU5ErkJggg==) no-repeat;\n  background-size: 100% 100%;\n  margin-left: 26px;\n}\n\n.commentEmbed-footer .commentEmbed-inputBox-warp .commentEmbed-inputBoxShare-icon:after {\n  content: '';\n  display: block;\n  position: absolute;\n  top: -10px;\n  left: -10px;\n  right: -20px;\n  bottom: -10px;\n}\n\n.font-size-0 .commentEmbed-content .commentEmbed-msg {\n  font-size: 0.16rem;\n}\n\n.font-size-1 .commentEmbed-content .commentEmbed-msg {\n  font-size: 0.18rem;\n}\n\n.font-size-2 .commentEmbed-content .commentEmbed-msg {\n  font-size: 0.2rem;\n}\n\n.font-size-3 .commentEmbed-content .commentEmbed-msg {\n  font-size: 0.22rem;\n}\n";
    str += ".cmt-over:before, .cmt-op-lists .cmt-share:before, .cmt-op-lists .cmt-copy:before, .cmt-list .cmt-uinfo .cmt-img:before, .cmt-op-lists:before {\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0;\n}\n\n.cmt-list .cmt-bar:last-child:after, .cmt-sublists:after {\n  -webkit-transform-origin: 0 100%;\n  transform-origin: 0 100%;\n}\n\n.cmt-over, .cmt-op-lists .cmt-share, .cmt-op-lists .cmt-copy, .cmt-list .cmt-bar:last-child, .cmt-sublists, .cmt-list .cmt-uinfo .cmt-img, .cmt-op-lists {\n  position: relative;\n  overflow: hidden;\n}\n\n@media (-webkit-device-pixel-ratio: 1.5) {\n  .cmt-over:before, .cmt-op-lists .cmt-share:before, .cmt-op-lists .cmt-copy:before, .cmt-list .cmt-bar:last-child:after, .cmt-sublists:after, .cmt-list .cmt-uinfo .cmt-img:before, .cmt-op-lists:before {\n    width: 150%;\n    height: 150%;\n    -webkit-transform: scale(0.66667);\n    transform: scale(0.66667);\n  }\n}\n\n@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5), (min-resolution: 144dpi), (min-resolution: 1.5dppx) {\n  .cmt-over:before, .cmt-op-lists .cmt-share:before, .cmt-op-lists .cmt-copy:before, .cmt-list .cmt-bar:last-child:after, .cmt-sublists:after, .cmt-list .cmt-uinfo .cmt-img:before, .cmt-op-lists:before {\n    width: 200%;\n    height: 200%;\n    -webkit-transform: scale(0.5);\n    transform: scale(0.5);\n  }\n}\n\n@media (-webkit-device-pixel-ratio: 3) {\n  .cmt-over:before, .cmt-op-lists .cmt-share:before, .cmt-op-lists .cmt-copy:before, .cmt-list .cmt-bar:last-child:after, .cmt-sublists:after, .cmt-list .cmt-uinfo .cmt-img:before, .cmt-op-lists:before {\n    width: 300%;\n    height: 300%;\n    -webkit-transform: scale(0.33333);\n    transform: scale(0.33333);\n  }\n}\n\n.cmt-over:before, .cmt-op-lists .cmt-share:before, .cmt-op-lists .cmt-copy:before {\n  content: '';\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  height: 1px;\n  pointer-events: none;\n}\n\n.cmt-list .cmt-bar:last-child:after, .cmt-sublists:after {\n  content: '';\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  height: 1px;\n  pointer-events: none;\n}\n\n.cmt-list .cmt-uinfo .cmt-img:before, .cmt-op-lists:before {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 0;\n  pointer-events: none;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.cmt-head {\n  background-color: #fff;\n}\n\n.cmt-head.cmt-android {\n  height: 0.4rem;\n}\n\n.cmt-head.cmt-sticky .cmt-head-box {\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: inherit;\n  z-index: 100;\n}\n\n.cmt-head-box {\n  height: 0.39rem;\n  margin: 0 0.17rem;\n  border-bottom: 1px solid #eaeaea;\n  font-size: 0.16rem;\n  background-color: #fff;\n}\n\n.cmt-head-box .cmt-head-title {\n  display: inline-block;\n  padding: 0.12rem 0 0.11rem 0;\n  border-bottom: 1px solid #3c76ff;\n  font-size: 0.16rem;\n  line-height: 0.16rem;\n  white-space: nowrap;\n  color: #999;\n}\n\n.cmt-empty {\n  min-height: 2.6rem;\n  width: 100%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  box-orient: vertical;\n  -webkit-box-pack: center;\n  box-pack: center;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n  -webkit-justify-content: center;\n  justify-content: center;\n  background-color: #fff;\n}\n\n.cmt-empty .cmt-empty-logo {\n  width: 0.62rem;\n  height: 0.51rem;\n  margin: auto;\n  margin-bottom: 0.23rem;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALoAAACZCAMAAACv6NBbAAAAZlBMVEUAAADR0dHNzc329vbOzs7Nzc3Nzc3MzMzb29vNzc3R0dHMzMzNzc3Nzc3Nzc3V1dXNzc3Nzc3MzMzNzc3Ozs7Nzc3Pz8/Nzc3MzMzNzc3Nzc3Pz8/Nzc3Nzc3Nzc3Ozs7Nzc3MzMyVwCjbAAAAIXRSTlMAIc0CWPnr5geyFtiawTsNdrelaTPGRPLWj54o3oJgTUJ8OP4MAAAC/ElEQVR42u2c226jQAyGPQwQAiRNQw6Qntbv/5IrZXBDwtCNJYTsrr+bNpIvPo0czzgXPwxxzT7JMxRJlif7xkEUnx5RPJvUw4hThSpoT3BPUaMa6gIGlAkqIikH5kqahWi/3YvBmW9227IAcRTldrcZnDsp1khcHAjG3UTrfrbQ5+oAwjlU5HqdM54+vr6AeF5eqd09AKRkLrDFxxTkngLAse8WBWd+Pfe+SY4ADgPi+5w4YMBB088WUEM/ZxrYh39ET8U7qE/2kISbCBQR7qYE8uvfHShid1XOIWwWW1DENuwegFdKUEQZnHt1FdcRUdypgypM/QlM3dRZmLqpszB1U2dh6qbOwtRNnYWpmzoLUzd1FqZu6ixM3dRZmLqpszD1/1Pdp+tVtlqnHnjV3PL51V2CgcQxq3nl86u7HIncMat55XOr+wRvJJ5ZzSufWT3FISmzmlc+s/oah6yZ1bzymdVXOGTFrOaVz6ye4ZCMWc0rt1P/Bb2ueMIonuuKb1PNbxjNL0dBmPoTmLqpszB1U2dh6qbOwtRNnYWpmzoLUzd1FqZu6ixM3dRZmLqpszB1U2dh6qbOwtRv/JYcAZXpDYozMxQnlSjOh1GcytNQfJkaLsG40ZxApTj3S3Pamm81ZtxVXney4DDPsRY9I93lJqo/RfPf2aXnroAJyssZl6YqOYmxHcRxFS5OUrJyes8QZZvj4tSPHXBq8UcgRprh0lQnGOHTDVd9h0tzTD0QTyeBwwhf43JQEjgPUo9dbML3lLi6a+k4UhBLVP2wwkAuea2NqX/RPfT+BoKJqDcZfeNl/woyUvcd9qwFPnd+Ui/WZN55kM2Denkk8wakc6/+9k6vmi8Qz536HxotK/Er1YP6J42WVvQ+FVH/wJ6NghV8qF7syXwvfCg+qr9syPwDlBB0b6tc9glaCMLfq9z5BGroz5qGouj3VkydSGS/t2Lqin6XjKvX0t9bI3X5S+gEqGAJnUDDEjpBrmAJnaBTsIROUHR53gl8b/0FGqYVJ9oCIR4AAAAASUVORK5CYII=);\n  background-size: 100% 100%;\n}\n\n.cmt-empty .cmt-empty-text {\n  font-size: 0.16rem;\n  line-height: 0.16rem;\n  color: #666;\n  text-align: center;\n}\n\n.cmt-empty-full {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  z-index: 10;\n  background-color: transparent;\n}\n\n.cmt-load {\n  display: none;\n  padding: 0.12rem 0;\n  line-height: 16px;\n  text-align: center;\n}\n\n.cmt-load i {\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAMAAAANf8AYAAAAhFBMVEUAAAA8dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv88dv/L0JOnAAAAK3RSTlMAB9sD+A59tYB3QeuUH/Hu1Mlgz2kmXFUS5qdYN/StjN6qOTEwGL0bGkzAzQVAAgAAAdtJREFUSMeM0OtugkAUReE9wwAqcqfgrd6jTdb7v19jqo0R0Pl+nuRkJ0t9Zhat6mVGtqxX0czoI9PGjmcubt+/LSYJfclkoTFBk3NTzKvNNVR43VTzgpu8CTToqwTYR6mepdEeoPzSgC4DbBv051sLZJ16poCLzHCYyAFTvdgB9qwxZwvs+itxqHFh/Lq0Bg5G75gD0D0V+4aL0XvmAtl/vaAEG+qT0EL5yNqAO+mzk4Pm/p9DJB8R5OGjmTXyYey9nUlgLT9rSIykDmwgP4H96x3f9nxNIZaMg1S+UnBGMyjkr4CZJjCXvzlMtIVK/irYqoaj/B2hVgI/8neFpRyEGjJyhUyAhqx+Sy0bFASBIAqXVq6mpIagokWIkH33v19FMEarzlbvAsPMvL/WTBIKmJuTAN4wPWd2n/MGOFnfvkI1f7ciANpwbd9t6T+DB6SR9Z9FHqx3LVD3HzxQ+JbU4tYj31ReRylwbN55LfpR0iIuRT9OOi1jYJ/7olMnP+gyIOvED1bGxXfyCjaxB+Y12snftk9iwKEcfdSKkZkcDN38WtDcyHwrFzREhZI/GnaScwqUPFWg5bbo4Zt+cOl/6CGBr/ed/tF3eqXvqL3q//5mX8lITzRTPfEOIVVJDVO8FrQAAAAASUVORK5CYII=);\n  -webkit-animation: cmtload 0.5s linear infinite;\n  animation: cmtload 0.5s linear infinite;\n  background-size: 100% 100%;\n}\n\n.cmt-load span {\n  vertical-align: top;\n  display: inline-block;\n  margin-left: 0.08rem;\n  font-size: 0.12rem;\n  color: #666;\n}\n\n.cmt-over {\n  display: none;\n  margin: 0 0.17rem;\n  text-align: center;\n  font-size: 0.13rem;\n  line-height: 0.46rem;\n  color: #999;\n}\n\n.cmt-over:before {\n  height: 1px;\n  background-color: #e0e0e0;\n}\n\n.cmt-layer {\n  display: none;\n  position: fixed;\n  z-index: 100;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n}\n\n.cmt-list {\n  position: relative;\n  margin: 0 0.17rem;\n}\n\n.cmt-list .cmt-uinfo {\n  z-index: 1;\n  position: absolute;\n  left: 0;\n  top: 0;\n  margin-top: 0.12rem;\n  padding-left: 0.43rem;\n  height: 0.35rem;\n  max-width: 60%;\n}\n\n.cmt-list .cmt-uinfo .cmt-img {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 0.35rem;\n  height: 0.35rem;\n  display: block;\n  border-radius: 100% 100%;\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: 50% 50%;\n}\n\n.cmt-list .cmt-uinfo .cmt-img:before {\n  border: 1px solid #eaeaea;\n  border-radius: 100% 100%;\n}\n\n.cmt-list .cmt-uinfo .cmt-name {\n  color: #405b95;\n  font-size: 0.16rem;\n  line-height: 0.35rem;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n.cmt-list .cmt-uinfo .cmt-vip {\n  padding-left: 0.21rem;\n  background-position: 0.08rem center;\n}\n\n.cmt-list .cmt-fav {\n  z-index: 1;\n  position: absolute;\n  top: 0.12rem;\n  right: 0.34rem;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  box-orient: horizontal;\n  line-height: 0.13rem;\n  font-size: 0.13rem;\n}\n\n.cmt-list .cmt-fav:active {\n  opacity: 0.6;\n}\n\n.cmt-list .cmt-fav:before {\n  content: '';\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  -webkit-transform: scale(1.4, 1.3);\n  transform: scale(1.4, 1.3);\n}\n\n.cmt-list .cmt-fav .cmt-fav-icon {\n  padding: 0.11rem 0.04rem;\n  width: 0.13rem;\n  height: 0.13rem;\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAMAAAC7faEHAAAAilBMVEUAAAAzMzMzMzNPT08zMzMzMzM0NDQ0NDQzMzMzMzMzMzMzMzM0NDQ0NDQ0NDQ1NTU1NTU6Ojo0NDQzMzMzMzMzMzMzMzM1NTU2NjY3Nzc7Ozs0NDQ0NDQzMzM0NDQzMzM5OTkzMzMzMzMzMzMzMzMzMzMzMzM1NTU0NDQ0NDQ0NDQzMzMzMzMzMzOnMqjfAAAALXRSTlMA+fwFiOusefDh135vZEg5LhD35rmiliIeGAro3slZKAndzcGxnYtPQfbTjHNRHJaIAAABPklEQVQ4y43T15KCMBhA4R9CU7AgUu2ubct5/9dbAs4462rIuWGG+UIIIfKq3ckfBXMZahcBOJMhl0MHh54Y0Xc2sxSYNAV8mV0JI5EZ+GY3h2O7GK2NTeGj02Oz8yDv9MbI1BoSkQQCo4vBqUUK8Exs4kLRXjew/TONlwH4FyVtsyWwbkRSB3Bdx/GPYdq/9b3v8hpqxaHSA3jk39obGU8FdTdNsKDLAaJ2p4FQqZB7y6k8tT3AKNVOtcOB1SafVPK/egU/2kkb8P4T6A1yh10FkY3bw8LGlTC2cVs427gApuIMutTBVxYugUIs3Bhm2rlmd9OrtXABhBaucnFrC3eBkwy7JoLrw6l3LoGVGnb7DDwZdh5Qim7R/c/NS7dPgKX0rjsfMW+b9m6NuVj6YoP5HOczuafiEUDmKTH1C+DQRu4Ckhe+AAAAAElFTkSuQmCC) center center no-repeat;\n  background-size: 0.13rem 0.13rem;\n  opacity: 1;\n  -webkit-transform: translateY(-1px);\n  transform: translateY(-1px);\n}\n\n.cmt-list .cmt-fav .cmt-fav-num {\n  line-height: 0.35rem;\n  color: #333;\n}\n\n.cmt-list .cmt-fav .cmt-fav-num span {\n  font-size: 0.12rem;\n}\n\n.cmt-list .cmt-fav-act .cmt-fav-icon {\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAMAAAC7xnO3AAAAw1BMVEUAAAD/dHX/dXb/dXb/dHX/dHX/dXb/dHX/fX3/dHb/dHb/dHX/dHX/dHX/d3f/dHX/dXb/dXb/dHX/dnf/dXb/eHj/dnf/enr/gIH/dnf/dHX/dHX/dHX/dHT/dHX/dnf/dXX/dnf/dnf/dHX/dHb/dHX/dHX/dHX/dXX/d3j/d3j/dnj/fHz/dHX/dnf/dHb/fn7/fX7/fH3/b3D/a2z/fX7/bW3/f4D/enn/hof/np//dXX/q6v/kJD/e3r/dHX/cnO8y1RTAAAAP3RSTlMA7irrsvy19gTxwJrq31Lj28eIRSUbFw0J5tPLp5eTj31qLO3Xzbutn5RLFbJ2b2BAPDb07suxpYBya1g+MR9qgbe+AAABiklEQVRIx53V15KCMBSA4aNrpChFZEGqYO9tew3v/1QLuoxhd9Tk/He5+IYJOZnAtZxUNbxxtOuBYPWpRPOIMr8Xg26LnsrIVIwuNFpG5kJyTs9pCwHoNChTX0AOVFY2ZX65G7NSXfLLro+WI1ZOXH6pa5V9CszRtl2RwF9CGJit+KE8o6x84ZeHoCIFJuFVYqW05oZ7n7IZH7zQbpCKDOq8MzuVaCUj6setWRi2Ev3aVV2mHfo3Um5YU62vC5ermzRr9FrZ07tcHp1utfK2x9G0RoTeKHtMTtTtnybUtIuVSjl6eDvK9PcjyqBYNXlk5n1CXvk77uql5KDPxd1pIyRV9gCgYCSxAKCGkXTyTzY4pYmWHlpqaKliJYmxUtKx0nSQkkQyUipdQMrARUppLSOlYQNOklBGSmUBSNnpIaW0AaQ0v5GSxICTmXfAyhUg5VDHyk4PKZUNIKXPvLxDEUksODcSkYHNyKiUg9vS1IGpPiac74rU6UIlO/bbeTOnWIS1Cw2NSXrPqB9uxrzvqAyAEQAAAABJRU5ErkJggg==);\n  -webkit-transition: -webkit-transform 0s, opacity 0s;\n  transition: transform 0s, opacity 0s;\n  -webkit-animation: cmtfav 0.5s;\n  animation: cmtfav 0.5s;\n  -webkit-transform: translateY(-1px);\n  transform: translateY(-1px);\n}\n\n.cmt-list .cmt-fav-act .cmt-fav-num {\n  color: #f43531;\n}\n\n.cmt-list .cmt-fav-active .cmt-fav-icon {\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAMAAAC7xnO3AAAAw1BMVEUAAAD/dHX/dXb/dXb/dHX/dHX/dXb/dHX/fX3/dHb/dHb/dHX/dHX/dHX/d3f/dHX/dXb/dXb/dHX/dnf/dXb/eHj/dnf/enr/gIH/dnf/dHX/dHX/dHX/dHT/dHX/dnf/dXX/dnf/dnf/dHX/dHb/dHX/dHX/dHX/dXX/d3j/d3j/dnj/fHz/dHX/dnf/dHb/fn7/fX7/fH3/b3D/a2z/fX7/bW3/f4D/enn/hof/np//dXX/q6v/kJD/e3r/dHX/cnO8y1RTAAAAP3RSTlMA7irrsvy19gTxwJrq31Lj28eIRSUbFw0J5tPLp5eTj31qLO3Xzbutn5RLFbJ2b2BAPDb07suxpYBya1g+MR9qgbe+AAABiklEQVRIx53V15KCMBSA4aNrpChFZEGqYO9tew3v/1QLuoxhd9Tk/He5+IYJOZnAtZxUNbxxtOuBYPWpRPOIMr8Xg26LnsrIVIwuNFpG5kJyTs9pCwHoNChTX0AOVFY2ZX65G7NSXfLLro+WI1ZOXH6pa5V9CszRtl2RwF9CGJit+KE8o6x84ZeHoCIFJuFVYqW05oZ7n7IZH7zQbpCKDOq8MzuVaCUj6setWRi2Ev3aVV2mHfo3Um5YU62vC5ermzRr9FrZ07tcHp1utfK2x9G0RoTeKHtMTtTtnybUtIuVSjl6eDvK9PcjyqBYNXlk5n1CXvk77uql5KDPxd1pIyRV9gCgYCSxAKCGkXTyTzY4pYmWHlpqaKliJYmxUtKx0nSQkkQyUipdQMrARUppLSOlYQNOklBGSmUBSNnpIaW0AaQ0v5GSxICTmXfAyhUg5VDHyk4PKZUNIKXPvLxDEUksODcSkYHNyKiUg9vS1IGpPiac74rU6UIlO/bbeTOnWIS1Cw2NSXrPqB9uxrzvqAyAEQAAAABJRU5ErkJggg==);\n}\n\n.cmt-list .cmt-fav-active .cmt-fav-num {\n  color: #f43531;\n}\n\n.cmt-list .cmt-menu {\n  z-index: 1;\n  position: absolute;\n  right: 0;\n  top: 0.12rem;\n  padding: 0.11rem;\n  width: 0.13rem;\n  height: 0.13rem;\n  transform: translateX(0.11rem);\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnBAMAAAB+jUwGAAAAD1BMVEUAAAAzMzM1NTVVVVUzMzNw0DyuAAAABHRSTlMA5ogGBMV9/gAAADlJREFUKM9jGAX0AMyKQgYg2khQGcFlcnFRAPFUXJyAJJTL6OIiAOKJuDgCSTAXqyBW7dgtGgVUBQCDDQn3HCsgsAAAAABJRU5ErkJggg==) center center no-repeat;\n  background-size: 0.13rem 0.13rem;\n}\n\n.cmt-list .cmt-menu:active {\n  opacity: 0.6;\n}\n\n.cmt-list .cmt-text {\n  position: relative;\n  padding-top: 0.52333rem;\n  padding-left: 0.43rem;\n  line-height: 1.3;\n  color: #333;\n}\n\n.cmt-list .cmt-bar {\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  box-orient: horizontal;\n}\n\n.cmt-list .cmt-bar .cmt-time {\n  padding: 0.09333rem 0.06rem 0.09333rem 0.43rem;\n  line-height: 0.13rem;\n  font-size: 0.13rem;\n  color: #999;\n  white-space: nowrap;\n}\n\n.cmt-list .cmt-bar .cmt-point {\n  padding: 0.09333rem 0;\n  width: 0.02rem;\n  line-height: 0.13rem;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGAgMAAACdogfbAAAADFBMVEWZmZmampqqqqqZmZmKbH8QAAAAA3RSTlPmiAZNIN+6AAAAFklEQVQI12OYkMBQf4HB/gAQARlALgA5zAZ9rghEQAAAAABJRU5ErkJggg==);\n  background-size: 0.02rem 0.02rem;\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n}\n\n.cmt-list .cmt-bar .cmt-point:last-child {\n  display: none;\n}\n\n.cmt-list .cmt-bar .cmt-reply {\n  padding: 0.09333rem 0.06rem;\n  line-height: 0.13rem;\n  font-size: 0.13rem;\n  color: #999;\n  white-space: nowrap;\n}\n\n.cmt-list .cmt-bar .cmt-bar-item {\n  position: relative;\n  padding: 0.09333rem 0.06rem;\n  line-height: 0.13rem;\n  font-size: 0.13rem;\n  color: #999;\n  white-space: nowrap;\n}\n\n.cmt-list .cmt-bar .cmt-bar-item:active {\n  opacity: 0.6;\n}\n\n.cmt-list .cmt-bar .cmt-bar-item:before {\n  content: '';\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  -webkit-transform: scale(1.5, 1.2);\n  transform: scale(1.5, 1.2);\n}\n\n.cmt-list .cmt-bar:last-child {\n  padding-bottom: 0.04rem;\n}\n\n.cmt-list .cmt-bar:last-child:after {\n  height: 1px;\n  background-color: #e0e0e0;\n}\n\n.cmt-list .cmt-relname {\n  color: #405b95;\n}\n\n.cmt-list .cmt-author {\n  color: #999;\n}\n\n.cmt-list .cmt-vip {\n  padding-left: 0.17rem;\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAMAAAANxBKoAAAAn1BMVEUAAAD/wED/0Hv/wED/wED/wED/wUL/wUP/yk7/wEH/wEH/wED/wED/wED/wEH/xEH/wUb/wkb/0Fj/wEH/wEH/wEH/wEH/wEH/wUH/wUH/wEL/wEP/wkL/xkf/xkv/wED/wED/wED/wED/wED/wED/wEH/wEL/wUH/wEL/wED/wED/wED/wEH/wEH/wUD/wkP/xUb/wEH/v0P/wUH/v0BevKcvAAAANHRSTlMA/APE9dNENQr58ejkrXYmIRoG3qGcioB7ZlQ/MBIO7s3AtLKUj2ljUdnWpoZwVysWuVxK3Lex7gAAAY5JREFUSMeNlWlvwjAMQF1KSylnC4y7XCvXDtjW///bplixCXNc7X2BJE+qUj8EdCvLBmpYotKDXkUMdTm/GCHNoM/2WbdfUJibZxBTVV4F5jwEgCQg+6DJja05bt/M94jsrmb3nUdPKmLtlwdtc3jJcXFiO/bbOzxcAnJj+8Mrz/FsQndokj32yVlqjjqF+yQkAomd3sJ59ZYgl/ICT/bAnCuiJeR1x+w3nSgytk/Cnsjrc4avf+UYt7cNcREqwSUZ4XVWYrJI6k3vXaRuGYBLC4MbJc92wRkuntKL/D3gtnjoTBkwZ7gX6W3WMhxf4iHufINgVRF33jvi+svVRIbxIz0auSQku087B14yMsM3u/Hpjlx2abm66QUt8DLkxBNcj3FRgkKHE+f0eOSSA9lzTq/6AY2Zm3hJF9aIOXFKb3PX7YLsZiOP6Fenc+XEp/ixgzrGZE8xvfZAVzkiZiYEmSET5UJQMpQj1zPkl15P+ZC7Rb3Kjco/Ny1DoqdLMsM0+4+9t/ZRV2SGYZ3zC79Qf15Xh1DbAAAAAElFTkSuQmCC) 0.04rem center no-repeat;\n  background-size: 0.11rem 0.11rem;\n  white-space: nowrap;\n}\n\n.cmt-sublists {\n  padding: 0 0 0.16rem 0.43rem;\n}\n\n.cmt-sublists:after {\n  height: 1px;\n  background-color: #e0e0e0;\n}\n\n.cmt-sublists .cmt-sublists-box {\n  padding: 0.05rem 0;\n  background-color: #f8f8f8;\n}\n\n.cmt-sublists .cmt-sublist {\n  padding: 0.03rem 0.12rem;\n  position: relative;\n}\n\n.cmt-sublists .cmt-submore {\n  padding: 0.05rem 0.12rem 0.07rem;\n  color: #999;\n  font-size: 0.13rem;\n  line-height: 0.13rem;\n  height: 0.13rem;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  box-orient: horizontal;\n}\n\n.cmt-sublists .cmt-submore .cmt-submore-text {\n  line-height: 0.13rem;\n  padding-right: 0.08rem;\n}\n\n.cmt-sublists .cmt-submore .cmt-submore-icon {\n  width: 0.05rem;\n  height: 0.13rem;\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAV1BMVEUAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkABlXAAAAAHHRSTlMABA/RjIZhE/fLxbWto1tUDO2oe2ndv56TkH9CAEV52wAAAGRJREFUGNONzEkOgCAQRFFEVBxQcB7q/udUNtABjNbu/XSaCSkyRiaBjYYCgKJhD8MBYKRBpEIXPv0OLQ1nGKZUUMR6AQxhA6B05JbzK2t/HLMKmD/sf5JbDsztAiQh06vxjHcDEKEKhwUY/ZoAAAAASUVORK5CYII=) no-repeat;\n  background-size: 0.05rem 0.09rem;\n  background-position: center center;\n}\n\n.cmt-op-lists {\n  display: none;\n  position: absolute;\n  top: 0.5rem;\n  right: 0;\n  z-index: 999;\n  width: 1.45rem;\n  height: auto;\n  background: #fff;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);\n}\n\n.cmt-op-lists.cmt-op-t3 {\n  top: -1.35rem;\n}\n\n.cmt-op-lists.cmt-op-t2 {\n  top: -0.89rem;\n}\n\n.cmt-op-lists.cmt-op-t1 {\n  top: -0.43rem;\n}\n\n.cmt-op-lists:before {\n  pointer-events: none;\n  z-index: 99;\n}\n\n.cmt-op-lists:before {\n  border: 1px solid #d6d6d6;\n}\n\n.cmt-op-lists .cmt-op-list {\n  position: relative;\n  background-color: #fff;\n  height: 0.46rem;\n  line-height: 0.46rem;\n  padding-left: 0.43rem;\n  font-size: 0.16rem;\n  color: #666;\n  background-position: 0.13rem 50%;\n  background-size: 0.16rem 0.16rem;\n  background-repeat: no-repeat;\n}\n\n.cmt-op-lists .cmt-op-list:active {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n\n.cmt-op-lists .cmt-report {\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAdVBMVEUAAABnZ2dnZ2dubm5ubm5mZmZmZmZmZmZnZ2dsbGxnZ2dnZ2dmZmZmZmZmZmZmZmZmZmZoaGhmZmZnZ2dmZmZmZmZnZ2dpaWlnZ2dmZmZnZ2dmZmZmZmZnZ2dnZ2doaGhnZ2dmZmZnZ2dnZ2dqampsbGxmZmYiLoOaAAAAJnRSTlMAmkIOCvHX5qcchyfg9e76wE2ykcmBZznqu3E3eVdJLdCiW1IdGt3BKZYAAAGNSURBVEjH3ZNJYqMwEEWFQEJMxgTjKbGd8d3/iC11jN0KKGoW2eQvq+qpVJOYKu36Td009abvUhFXUSpuUmURi982eGq234ZnD1jpQb5n2bscNFYPWST+Wd4N8vl7IgFKz52VQBKK3wFPX41PwC4AbGz6qdV+czMfX0HzMTV/NFDNAgOYObuBQdx13CfXeR7gbQ54g8O1BX29FTXUn0XpQOoKtHC6aBsrjkD7tzcK/N2RiVZut0DdlqAUottfWw14D69xlpujvC1KYT35BJArfGAP+jIWvj59BSoXnzymd+C47/0f+4DLKieOMCABKRYAievDEkDD4yLAzeQHgfiXuv4SLzo7jzlTA+t4W19Qp8/DrIE+PrgDkNiDf22hHUR8NSoN6Modci1natv5y2eVJbhTeq3Hi4ust9VJ8TJtq39AviM9Z0Eg5PiVQNnyj9oyCig8qSlQmHz0hjKMyk1h41eMCtZw16oQhiUARuRwFv+pDvJQC4K5fh5wNXSLajAskvHmENeqGCcd1TjpPyYVYAxxpr1YAAAAAElFTkSuQmCC);\n}\n\n.cmt-op-lists .cmt-del {\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAaVBMVEUAAABnZ2dnZ2doaGhmZmZoaGhmZmZnZ2dmZmZnZ2dnZ2dtbW1nZ2dmZmZnZ2dnZ2dnZ2dnZ2dmZmZmZmZmZmZoaGhpaWlnZ2dnZ2dmZmZnZ2dmZmZnZ2doaGhtbW1nZ2dmZmZmZmZmZmYQwilFAAAAInRSTlMAatWAwECqlZbGYA3v6sx0Ufj034tlMicgsKOEWhYV0JsZR7xUlAAAAM1JREFUSMft1Dduw0AURdFHUWlmmMSsaPvuf5FuCAEMGpOADUMAT/Wa2/ziayCLGMsreSVMKeR1ZoqR1/16HCtbvRVng4Wsk2Exo4jFImXJZqEk03uwcWzkd47jVD0BbOS3hfC3o/Bw75Yrr25eZOHSzRLSeVEI227u4bBGa7RGa/RPUX0i6OaN025epK/mOdv2D95yIT8ziirAySsfRRmQyucGVOp5QHeoF+oIaNR3BLjY3TT7CbDXgCv4SfzQUGPw+6g1ITARr+RJqqdvgYJLF5IGOMwAAAAASUVORK5CYII=);\n}\n\n.cmt-op-lists .cmt-share {\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAe1BMVEUAAAB4eHh4eHiQkJB4eHh4eHh4eHh4eHh3d3d5eXl4eHh3d3d4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh9fX2NjY14eHh6enp6enp6enp3d3d5eXl5eXl4eHh3d3d4eHh8fHx3d3d3d3d4eHh3d3eAgIB4eHh3d3efU8GvAAAAKHRSTlMA4/sCwNuCZe9In31h9MpV6LaldXAXB9g5MCKtUEQ9mJMQz4vEaRwkhtO9uAAAAahJREFUSMfFleliojAURkMCClR22Vzq1nbO+z/hCMjUDBAzf6bnj4LnS3LvFRU/wW6zCt16070tM+cZ/zZjF1d66u5qjY6c6Pvxk3Q97OD9QXJH1y832bnutvlSk63fmARaB3DWl4k7+pEeOETgF5VY9D9dLVAA2UUs+2uhBTbAWRl9LdBG8CmMvhYoHbiZfT2QQ7Z0nlXv64EW0ovZ1wPZ/Z7Z1wMN1GrZ34i/AydITP4k4BBVFr4I8caS90u+fPJFWbRDnxdOFAz+lBy+5u4nC75wkbM9UkErZqlJxT/hc7UT3z+2/WtEbBfIHj8CHo5d4IozLdp8dndsa2njVxCOAz3YBI7wNhTfJS04w3EYUIpvUYRySB9aCIHFFOD0/S2zmITbnehBDMkr/wCxetrNq170tIb378v9y0ad9Kfslw+Fyd9CtNOeLok8GAqQyGCyhCwW15ewnZkjYTVbbwic55fxEjUZcOItbR74QBwoTQ9iwH9MbP4/1M+TUvVymeQ+d7KdWKL5oEc6cexIetxGmAhOKU+k4VG8QjWr3K2jyHPzVaPE/+c3zaM1UI7L6xkAAAAASUVORK5CYII=);\n}\n\n.cmt-op-lists .cmt-share:before {\n  height: 1px;\n  background-color: #e0e0e0;\n}\n\n.cmt-op-lists .cmt-copy {\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAFVBMVEUAAABnZ2dmZmZmZmZmZmZnZ2dmZmYItOGYAAAABnRSTlMAh+b5S/MTWAjAAAAAdElEQVQ4y2MAAUa1NDSQJACWEEvDAIlgCYQGhBawRFoKAxpwS4NIJKBLsFFTAqsfQBJY/QCSwOoHkARWP0AkMC0eLBKMZhAfJAugSbDC/BaAU8eoP4aWP9ywSoDTLy6JRBwSSQJUyn94Mz/WrIazgMFbJAEAyfWgi53avOQAAAAASUVORK5CYII=);\n}\n\n.cmt-op-lists .cmt-copy:before {\n  height: 1px;\n  background-color: #e0e0e0;\n}\n\n.cmt-text {\n  font-size: 0.18rem;\n}\n\n.cmt-sublist {\n  font-size: 0.16rem;\n}\n\n.cmt-txt {\n  position: relative;\n  overflow: hidden;\n  line-height: 1.3;\n  word-break: break-all;\n  text-align: justify;\n}\n\n.cmt-txt.cmt-zip {\n  height: auto;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  word-wrap: break-word;\n  text-align: left;\n}\n\n.cmt-readmore {\n  display: none;\n  position: absolute;\n  right: 0;\n  top: 0;\n  padding: 0.09333rem 0.04rem;\n  padding-right: 0.14rem;\n  line-height: 0.13rem;\n  font-size: 0.13rem;\n  color: #999;\n  white-space: nowrap;\n}\n\n.cmt-readmore:after {\n  position: absolute;\n  content: '';\n  top: 0;\n  right: 0;\n  width: 0.1rem;\n  height: 100%;\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAaVBMVEUAAACYmJiXl5eYmJiXl5eYmJicnJyhoaG2traYmJiYmJiYmJiYmJiZmZmYmJiXl5eampqXl5eYmJiXl5eYmJiYmJiXl5eZmZmampqXl5ecnJyZmZmhoaGfn5+Xl5eXl5eYmJiZmZmXl5fUbqL1AAAAInRSTlMAwvDg1m8eEQf7+OapjIF2L+XSyq2SW1RCOygZDQi2h2hQLkV+6gAAAJVJREFUKM/lkFcWwiAQRdM7qcbErnf/i1RJOBiHFej9YYYHU573v8Rh7bpWXazPDhqp1hDq4Absv9U7sBTNrlDMW/WRw26NzwME7ad6KMC/mOwUQplY9RhAlIp881pUy9ZevellmYBqmdSHfBbmAOodVHpPgQJePo04XDLfpgYYpWaaYuyQpBFYOyRJadZ30/ZD4v0GT9JdDRLplEP7AAAAAElFTkSuQmCC) center center no-repeat;\n  background-size: 0.1rem 0.1rem;\n}\n\n.font-size-0 .cmt-text {\n  font-size: 0.16rem;\n}\n\n.font-size-0 .cmt-sublist {\n  font-size: 0.14rem;\n}\n\n.font-size-0 .cmt-sublist .cmt-vip {\n  padding-left: 0.15667rem;\n  background-size: 0.09667rem 0.09667rem;\n}\n\n.font-size-1 .cmt-text {\n  font-size: 0.18rem;\n}\n\n.font-size-1 .cmt-text .cmt-vip {\n  padding-left: 0.18333rem;\n  background-size: 0.12333rem 0.12333rem;\n}\n\n.font-size-1 .cmt-sublist {\n  font-size: 0.16rem;\n}\n\n.font-size-2 .cmt-text {\n  font-size: 0.2rem;\n}\n\n.font-size-2 .cmt-text .cmt-vip {\n  padding-left: 0.19667rem;\n  background-size: 0.13667rem 0.13667rem;\n}\n\n.font-size-2 .cmt-sublist {\n  font-size: 0.18rem;\n}\n\n.font-size-2 .cmt-sublist .cmt-vip {\n  padding-left: 0.18333rem;\n  background-size: 0.12333rem 0.12333rem;\n}\n\n.font-size-3 .cmt-text {\n  font-size: 0.22rem;\n}\n\n.font-size-3 .cmt-text .cmt-vip {\n  padding-left: 0.21333rem;\n  background-size: 0.15333rem 0.15333rem;\n}\n\n.font-size-3 .cmt-sublist {\n  font-size: 0.2rem;\n}\n\n.font-size-3 .cmt-sublist .cmt-vip {\n  padding-left: 0.19667rem;\n  background-size: 0.13667rem 0.13667rem;\n}\n\n.cmt-hide {\n  display: none;\n}\n\n.cmt-show {\n  display: block;\n}\n\n.cmt-detail .cmt-fav {\n  right: 0;\n}\n\n@-webkit-keyframes cmtfav {\n  0% {\n    -webkit-transform: scale(1) translateY(-1px);\n  }\n  30% {\n    -webkit-transform: scale(2) translateY(-1px);\n  }\n  100% {\n    -webkit-transform: scale(1) translateY(-1px);\n  }\n}\n\n@keyframes cmtfav {\n  0% {\n    -webkit-transform: scale(1) translateY(-1px);\n  }\n  30% {\n    -webkit-transform: scale(2) translateY(-1px);\n  }\n  100% {\n    -webkit-transform: scale(1) translateY(-1px);\n  }\n}\n\n@-webkit-keyframes cmtload {\n  0% {\n    -webkit-transform: rotate(0);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n  }\n}\n\n@keyframes cmtload {\n  0% {\n    transform: rotate(0);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n";
    return str;
};

});;
BoxJS.define('BoxJS:bdbox/comment/bottomBar', function(require, exports, module, $){
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');
var O2O = require('BoxJS:bdbox/client/o2o');
// hybrid需要配置$ h5不需要
// var $ = require('../base');
var _container;
var _maginTop;
var _canAction;
var commentUrl;
var commentToolbarData;
var commentIconToolbarData;
var isShowComment = false;
var hasScrollListener = false;
var scrollTimer;
var gotoTimer;
var scrollLock = false;
var actionCb = null;
function stopScroll(){
    scrollLock = false;
    gotoTimer && clearInterval(gotoTimer);
    window.removeEventListener('touchstart', stopScroll);
}
module.exports = {
    addCommentShowEvent: function(){
        if(!_canAction || !commentToolbarData){
            return;
        }
        var me = this;
        isShowComment = false;
        this.isShowCommentBar();
        setTimeout(function(){me.isShowCommentBar()}, 1000);//@Todo保底方案。防止页面刷新定位不跳转。
        if(!hasScrollListener){
            hasScrollListener = true;
            window.addEventListener('scroll', function(){
                scrollTimer && clearTimeout(scrollTimer);
                scrollTimer = setTimeout(function (){
                    me.isShowCommentBar();
                }, 300);
            });
            BoxJS && BoxJS.on && BoxJS.on('globalSettingChange', function () {
                setTimeout(function(){me.isShowCommentBar()}, 100);
            });
        }
    },
    isShowCommentBar: function(){
        if(!_canAction || !commentToolbarData){
            return;
        }
        var me = this;
        if(_container.getBoundingClientRect().top < window.innerHeight - 80){//@Todo 考虑横屏，无法把高度缓存，后续优化
            // 判断评论展示打点
            if(!isShowComment){
                isShowComment = true;
                actionCb && actionCb('cmt-act-show', null);
                //评论icon数据暂定从在内存获取。
                // me.getBottom(function(data){
                //     commentIconToolbarData = data;
                // });
                commentToolbarData && me.setBottom(commentToolbarData);
            }
        }else{
            if(isShowComment){
                isShowComment = false;
                actionCb && actionCb('cmt-act-hide', null);
                if(commentIconToolbarData){
                    for(var i in commentIconToolbarData.toolids){
                        if(commentIconToolbarData.toolids[i].id == 1){
                            commentIconToolbarData.toolids[i].animate = 1;
                            break;
                        }
                    }
                    me.setBottom(commentIconToolbarData);
                }
            }
        }
    },
    scrollToComment:function(){
        if(!_canAction || !commentToolbarData){
            return;
        }
        if (scrollLock) {
            return;
        }
        scrollLock = true;
        var disY = 0;
        var toY = _container.offsetTop - _maginTop;
        var lastScreenHeight = document.body.scrollHeight - window.innerHeight;
        if(toY > lastScreenHeight){
            toY = lastScreenHeight;
        }
        // 200ms内每次匀速移动距离
        // var distance = (toY - document.body.scrollTop) / (200 / 16);
        // distance =  distance > 0 ? Math.max(distance, 1) : Math.min(distance, -1);
        // var distanceCompare = Math.abs(distance);

        window.addEventListener('touchstart', stopScroll);
        gotoTimer = setInterval(function(){
            disY = toY - document.body.scrollTop;
            if (Math.abs(disY) > 2){
                document.body.scrollTop += Math.floor(disY / 2);
            }else{
                stopScroll();
                document.body.scrollTop = toY;
            }
        }, 16);
    },
    cmrCb: function(res){
        if(!_canAction || !commentToolbarData){
            return;
        }
        if(res && res.type == 1){
            this.scrollToComment();
        }
        if(commentIconToolbarData && $.isArray(commentIconToolbarData.toolids)){
            for(var i in commentIconToolbarData.toolids){
                if(commentIconToolbarData.toolids[i].id == 1 && commentIconToolbarData.toolids[i].data){
                    if(res.type == 1 || res.type == 2){
                        commentIconToolbarData.toolids[i].data.num++;
                    }else if(res.type == 3){
                        commentIconToolbarData.toolids[i].data.num--;
                    }
                    commentIconToolbarData.toolids[i].data.num = '' + Math.max(commentIconToolbarData.toolids[i].data.num, 0);
                    return;
                }
            }
        }
    },
    init: function (opts) {
        commentToolbarData = null;
        commentIconToolbarData = null;
        var me = this;
        _container = opts.container;
        _canAction = opts.canAction;
        _maginTop = opts.maginTop || 0;
        actionCb = opts.actionCb;
        var res = opts.res;
        if (_container && (version_compare(getVersion(), '7.7') >= 0  || $.$isLiteBox())) {
            if (res.hasComment == '1') {
                commentIconToolbarData = {
                    "toolids": [
                        {
                            "id": 1,
                            "eventName": "comment",
                            "data": {
                                "num": String(res.total_count) || '0'
                            }
                        }
                    ]
                };
                me.setBottom(commentIconToolbarData);//@Todo8.2.5之前拿不到是否有评论ICON，全部都设置。
                _canAction && me.getBottom(function(data){
                    if(data && $.isArray(data.toolids)){
                        for(var i in data.toolids){
                            if(data.toolids[i].id == 1){
                                commentToolbarData = {
                                    "toolids": [{
                                        id: "4",
                                        eventName: "commentResult",
                                        visible: 1,
                                        animate: 1,
                                        data: {
                                            topic_id: res.id
                                        }
                                    }]
                                };
                                if (res.toolbar_placeholder) {
                                    commentToolbarData.toolids[0].data.input_content = res.toolbar_placeholder;
                                }
                                if (res.commentBox_placeholder) {
                                    commentToolbarData.toolids[0].data.placeholder = res.commentBox_placeholder;
                                }
                                setTimeout(function(){me.addCommentShowEvent();},100);//保证之前设置icon数据完成
                                break;
                            }
                        }
                    }
                });
            }
            if (!commentUrl) {
                BoxJS && BoxJS.on && BoxJS.on('comment', function () {
                    if(_canAction && commentToolbarData){
                        me.scrollToComment();
                        return;
                    }
                    if ($.$isAndroid()) {
                        O2O(commentUrl, {
                            component: 'com.baidu.searchbox/.home.feed.FeedCommentActivity',
                            'S.menumode': '2',
                            min_v: '16789504'
                        });
                    }
                    else {
                        O2O(commentUrl, {
                            newbrowser: '1',
                            sfrom: 'feedLandingComment',
                            'toolbaricons': JSON.stringify({
                                "toolids": ['4']
                            }),
                            menumode: '2'
                        });
                    }
                });
            }
            // 防止多次调起评论落地页
            commentUrl = res.createUrl || res.url;
        }
    },
    setBottom: function (data) {
        if (version_compare(getVersion(), '7.7') >= 0 || $.$isLiteBox()) {
            if ($.$isAndroid()) {
                androidInvoke("Bdbox_android_utils", "setToolBarIcons",
                    [JSON.stringify(data)]);
            }
            else {
                iosInvoke("utils", {
                    "action": "setToolBarIcons",
                    "params": JSON.stringify(data),
                    "minver": "7.7"
                }, "");
            }
        }
    },
    getBottom: function(callback){
        var callName = '__box_utils_getToolBarIcons_' + $.getId();
        window[callName] = function(data) {
            if (!data) {
                return;
            }
            if (typeof data === 'string') {
                callback(JSON.parse(data));
            } else {
                callback(data);
            }
        };
        if ($.$isIOS() && (version_compare(getVersion(), '8.2.3') >= 0 || $.$isLiteBox())) {
            iosInvoke("utils", {
                "action": "getToolBarIcons",
                "minver": "8.2.3"
            }, callName);
        }
        else if ($.$isAndroid() && (version_compare(getVersion(), '8.3') >= 0 || $.$isLiteBox())) {
            androidInvoke("Bdbox_android_utils", "getToolBarIcons",
                [callName]);
        }
    }
};

});;
BoxJS.define('BoxJS:bdbox/comment/syncCommentNum', function(require, exports, module, $){
/* eslint-disable */
var invoke = require('BoxJS:bdbox/invoke/newInvoke');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');

var _nid;
var _totalNum = 0;

function add() {
    _totalNum++;
    set();
}

function remove() {
    _totalNum--;
    set();
}

function set() {
    if (!_nid) {
        return;
    }
    _totalNum = Math.max(_totalNum, 0);
    if (($.isBox && version_compare(getVersion(), '8.5') >= 0) || $.$isLiteBox()) {
        var data = JSON.stringify({
            type: 'comment',
            action: 'save',
            nid: _nid,
            count: String(_totalNum)
        });
        invoke('v5/feed/linkage', { params: encodeURIComponent(data) });
    }
}

function init(nid, totalNum) {
    _nid = nid;
    _totalNum = totalNum || 0;
    set();
}

module.exports = {
    init: init,
    add: add,
    remove: remove
};

});;
BoxJS.define('BoxJS:bdbox/comment/commentEmbed', function(require, exports, module, $){
/* eslint-disable */
/**
 * @file
 * Created by yupeng on 15/9/16.
 * http://agroup.baidu.com/box/md/article/67240
 * @param {Object} option
 * @@ source:接入的来源，必填，如：话题是topic
 * @@ id:接入评论的id，必填
 * @@ comTitle:评论落地页页面<title>comTitle</title>, 默认值：新闻评论
 * @@ type:评论的类型，0：新闻评论，1：明星评论，2：最热评论，默认值：0
 * @@ listNum:显示评论条数，默认值：3
 * @@ listTitle:入口列表模块标题文本。为空则不显示列表标题，后端优先可配
 * @@ inputBox:入口是否显示吸底评论输入框 默认：false
 * @@ shareConfig:吸底评论输入框分享按钮点击调起分享的配置参数对象，参考手百分享参数。PS：手百内才展示分享按钮。如果此参数为空，手百内也不展示分享按钮。
 * @@ logCb:提供点击回调，供各个业务线自己打点统计。
 * @@ cmtCb:获取评论数据的回调。
 * @@ sfrom:页面来源字段，用于O2O打开落地页时长统计，各个业务提供唯一值，赞IOS。
 * @@ backHome:框外分享回流，默认：false //@Todo 分享回流，打开框。目前使用于feed需求回流到评论落地页以外的其他页面，因此通过logCb通知业务点击，业务层做相应的回流逻辑。建议统一回流到当前评论落地页。
 *
 * ps:样式可以使用 sass下的 commentSDK.scss
 */
// hybrid需要配置$ h5不需要
// var $ = require('../base');
var clone = require('BoxJS:bdbox/clone');
var loadJS = require('BoxJS:bdbox/io/loadJS');
var O2O = require('BoxJS:bdbox/client/o2o');
// var share = require('../client/share');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');
var pblog = require('BoxJS:bdbox/monitor/pblog');
var delegate = require('BoxJS:bdbox/event/delegate');
var jsonToQuery = require('BoxJS:bdbox/utils/jsonToQuery');
var androidInvokeApp = require('BoxJS:bdbox/android/invokeApp');
var iosInvokeApp = require('BoxJS:bdbox/ios/invokeApp');
var bottomBar = require('BoxJS:bdbox/comment/bottomBar');
var defaultStyle = require('BoxJS:bdbox/comment/commentStyle');
var timingLs = require('BoxJS:bdbox/comment/timingLs');
var favLsClass = require('BoxJS:bdbox/comment/favLs');
var duration = require('BoxJS:bdbox/comment/duration');
var invoke = require('BoxJS:bdbox/invoke/newInvoke');
var syncCommentNum = require('BoxJS:bdbox/comment/syncCommentNum');
var timer = null;
var showLog = true;
var getinfoData = {};
//配置环境
var ORIGIN = 'https://ext.baidu.com';
var TEST_ORGIN = 'http://cp01-comment.epc.baidu.com:8260';
var GET_INFO_ORIGIN = 'https://mbd.baidu.com/po';
var TEST_GET_INFO_ORGIN = 'http://cp01-comment.epc.baidu.com:8270';
var TEST_LIST = [
    'cp01-feed04.epc.baidu.com:8240',//图文H5测试环境
    'cp01-video-huangping-01.epc.baidu.com:8210',//视频测试环境
    'cp01-tengen.epc.baidu.com:8230'//明星动态H5测试环境
];
if(TEST_LIST.indexOf(location.host) >= 0){
    ORIGIN = TEST_ORGIN;
    GET_INFO_ORIGIN = TEST_GET_INFO_ORGIN;
}
var API = {
    getInfo: GET_INFO_ORIGIN + '/api/comment/getInfo.jsonp',
    fav: ORIGIN + '/api/comment/v1/comment/updown',
    delReply: ORIGIN + '/api/comment/v1/comment/delreply',
    report: ORIGIN + '/api/comment/v1/page/report',
    getList: ORIGIN + '/api/comment/v1/comment/getlist',
    detail: ORIGIN + '/api/comment/v1/page/detail'
};
//ABTest实验
function getABTestInfo(cb){
    if($.$isBox() && version_compare(getVersion(), '8.2.5') >= 0){
        var callName = '__boxjs_utils_getABTestInfo_' + $.getId();
        window[callName] = function(data) {
            try {
                if ($.$isIOS()) {
                    cb(JSON.parse(data).data);
                } else {
                    cb(data.data);
                }
            }catch (e) {cb();}
        };
        if ($.$isIOS()) {
            iosInvokeApp("utils", { action: 'getABTestInfo' }, callName);
        } else {
            androidInvokeApp('Bdbox_android_utils', 'getABTestInfo', [callName]);
        }
    }else{
        cb();
    }
}

module.exports = function(options) {
    var _options = options,
        _backHome = ($.$isBox() || $.$isLiteBox()) ? false : _options.backHome,
        _source = options.source,
        _id = options.id,
        _listNum = options.listNum || 3,
        _type = options.type || 0,
        _serverTime = null,
        _container = null,
        _desc = _options.desc || '新闻评论',
        _comTitle = _options.comTitle,
        _listTitle = _options.listTitle,
        _landingPageURL = '',
        _createURL = '',
        _commentNum = 0,
        _shareConfig = options.shareConfig,
        _logCb = _options.logCb,
        _cmtCb = _options.cmtCb,
        _endCb = _options.endCb,
        _sfrom = _options.sfrom || 'feedLandingComment';
    var sid = options.sid || '';
    var cuid = options.cuid || '';
    var nid = options.nid || '';
    var snycId = options.snycId || nid;

    var ORDER = 9;//默认排序
    var favLs = null; // 点赞数据
    var favData = null;
    var cacheF1Class = null; // 一级评论
    var cacheData = null; // ls缓存层
    var cacheLastTime  = null;
    var hasCacheF1 = false;
    var cmtMenu = null; // menu的dom元素，不为null时表示激活态
    var fontLevel = ''; // 全局字号调整level

    if (!!options.defaultCss) {
        setDefaultCss();
    }

    if (!_source || !_id) {
        throw new Error('缺少source或id参数');
        return;
    }
    // 行为统计函数
    var hasShowInView = false;
    var _durationData = {key:'comment', options: {num:0}};
    var actionCb = function(typeName, data){
        if(typeName == 'cmt-act-show'){
            if(!hasShowInView){
                hasShowInView = true;
                pblog('event',['comment', 'scroll', 'sdk_show_infload', 17]);
                _durationData.options.num = _container.querySelectorAll('.cmt-list').length;
            }
            duration({action: 'appear', data: _durationData});
        }else if(typeName == 'cmt-act-hide'){
            duration({action: 'disappear', data: _durationData})
        }
        var logData = clone(data || {});
        logData._source = _source;
        pblog('event',['comment-sdk', typeName, logData, 17]);
        options.actionCb && options.actionCb(typeName, data);
    };

    // 无限下拉相关参数start
    var infconf = {
        appid: 101,
        sid: sid,
        cuid: cuid,
        isInf: 1,
        start: 0,
        num: 20,
        use_uk: 1,
        use_list: 1,
        order: ORDER
    };

    var isLight = /light/.test(window.navigator.userAgent);
    var isInf = options.isInf || false;
    var cmrCb = options.cmrCb;
    var maginTop = options.maginTop;

    var needloadmore = true;
    var infDom = null;
    var userinfo = {};
    var infStore = {
        parentId: 0,
        dlock: false,
        inflock: false
    };
    isInf = isInf && isLight && (
        ($.$isIOS() && (version_compare(getVersion(), '8.2.3') >= 0))
        || ($.$isAndroid() && (version_compare(getVersion(), '8.3') >= 0))
        || $.$isLiteBox()
    );

    // isInf = true;
    // 无限下拉相关参数end

    _container = document.getElementById(options.container);

    //智能排序实验
    getABTestInfo(function(ab){
        if(ab && ab.value && ab.value.comment_smart_order){
            if(ab.value.comment_smart_order != '0'){
                if(ab.value.comment_smart_order == 2){
                    infconf.order = 10;
                }else if(ab.value.comment_smart_order == 6){
                    infconf.order = 11;
                }
            }
        }
        getData();
    });

    /**
     * 获取评论数据
     */
    function getData() {
        var data = {
            ver: '3.1',
            desc: encodeURIComponent(_desc),
            reserved: _type,
            pn: 0,
            rn: _listNum,
            tid: _id,
            comType: _source,
            nid: nid,
            callback: '?',
            rnValid: options.rnValid || 0
        };
        if (isInf) {
            data.isInf = 1;
        }
        if (_comTitle) {
            data.comTitle = encodeURIComponent(_comTitle);
        }
        if (sid) {
            data.sid = sid;
        }
        loadJS({
            url: API.getInfo,
            data: data,
            success: function(res) {
                //hasComment是是否展示评论入口的展示策略
                if (res.errno == 0 && res.data && res.data.hasComment == '1') {
                    getinfoData = res.data;
                    _serverTime = res.time;
                    _landingPageURL = res.data.url;
                    _createURL = res.data.createUrl;
                    _commentNum = res.data.total_count;
                    if (res.data.showComment === 0) {
                        _cmtCb && _cmtCb(res.data);
                        bottomBar.init({
                            container:_container,
                            res: res.data,
                            maginTop: maginTop,
                            actionCb: actionCb
                        });
                        _container.style.display = 'none';
                    }
                    else {
                        if (isInf) {
                            initInfLoad(res.data);
                        }
                        else {
                            _cmtCb && _cmtCb(res.data);
                            bottomBar.init({
                                container:_container,
                                res: res.data,
                                maginTop: maginTop,
                                actionCb: actionCb
                            });
                            initList(res.data);
                            _endCb && _endCb();
                        }
                    }
                    initInputBox();
                } else {
                    _container.style.display = 'none';
                }
            },
            error: function(res) {
                console.log('error:' + res);
            }
        });
    }
    /**
     * 创建回复框复层
     */
    function initInputBox() {
        if (!_options.inputBox || version_compare(getVersion(), '7.7') >= 0 || $.isLiteBox) {
            return;
        }
        var commentFooter = createDivByClass('commentEmbed-footer');
        var inputBox = createDivByClass('commentEmbed-inputBox-warp');
        //添加回复 input
        var input = createDivByClass('commentEmbed-inputBox-input');
        input.innerHTML = '我来说两句...';
        input.addEventListener('click', function() {
            log('input');
            gotoLandingPage(true);
        });
        inputBox.appendChild(input);
        //添加回复 icon
        var icon = createDivByClass('commentEmbed-inputBox-icon');
        icon.addEventListener('click', function() {
            log('icon');
            gotoLandingPage(false);
        });
        //添加回复总量角标
        if (_commentNum && _commentNum != '0') {
            var num = createDivByClass('commentEmbed-inputBox-icon-num');
            num.innerHTML = '<p>' + formatCommentNum(_commentNum) + '</p>';
            icon.appendChild(num);
        }
        inputBox.appendChild(icon);
        //添加分享
        if (_shareConfig && ($.$isBox() || $.$isLiteBox())) {
            var shareBtn = createDivByClass('commentEmbed-inputBoxShare-icon');
            inputBox.appendChild(shareBtn);
            shareBtn.addEventListener('click', function(e) {
                log('shareBtn');
                e.stopImmediatePropagation();
                // share(_shareConfig);
                shareFn(_shareConfig);
            });
        }

        commentFooter.appendChild(inputBox);
        document.body.appendChild(commentFooter);
    }
    /**
     * 初始化列表
     */
    function initList(data) {
        var listData = data.reply_list;
        var commentEmbed = createDivByClass('commentEmbed');
        commentEmbed.setAttribute('ontouchstart', '');
        //创建标题
        if (data.module_title) {
            _listTitle = data.module_title;
        }
        if (_listTitle && _listTitle != '') {
            var listTitleElm = createDivByClass('commentEmbed-title');
            listTitleElm.innerHTML = '<span class="title-text">'  + _listTitle + '</span>';
            commentEmbed.appendChild(listTitleElm);
        }
        var len = listData.length;
        if (len > 0) {
            var list = createDivByClass('list');
            var ListHtmlstr = '';
            for (var i = 0; i < len; i++) {
                ListHtmlstr += ''
                    + '<div class="commentEmbed-layer">'
                    + createListItem(listData[i])
                    + '</div>';
            }
            list.innerHTML = ListHtmlstr;
            commentEmbed.appendChild(list);
        }

        //创建列表,如果没数据就显示抢沙发。
        if (len > 0) {
            if (_backHome) {
                var backHomeBtn = createDivByClass('commentEmbed-backHomeBtn');
                backHomeBtn.innerHTML = '<p>打开手机百度,查看全部评论</p>';
                commentEmbed.appendChild(backHomeBtn);
            } else {
                //创建查看全部按钮
                var moreBtn = createDivByClass('commentEmbed-more');
                moreBtn.innerHTML = '查看全部评论';
                commentEmbed.appendChild(moreBtn);
            }
        } else {
            var nolist = createDivByClass('commentEmbed-nolist');
            nolist.innerHTML = data.module_content || '还没有人评论，快来抢沙发~';
            commentEmbed.appendChild(nolist);
        }

        _container.appendChild(commentEmbed);
        commentEmbed.addEventListener('click', function (e) {
            if (e.target.className === 'commentEmbed-more') {
                actionCb && actionCb('cmt-morebtn');
                pblog('event',['comment', 'click', 'sdk_moreBtn', 17]);
            }
            else if (e.target.className === 'commentEmbed-nolist') {
                actionCb && actionCb('cmt-empty');
            }
            else if (e.target.className === 'commentEmbed-layer') {
                actionCb && actionCb('cmt-item');
            }
            log('list');
            pblog('event',['comment', 'click', 'sdk_list', 17]);
            gotoLandingPage(false);
        }, false);
        showLog && window.addEventListener('scroll', checkShowInView, false);
        showLog && setTimeout(checkShowInView, 100);
    }
    /**
     * 回调打点
     */
    function log(eventName) {
        if (_logCb && $.isFunction(_logCb)) {
            _logCb('commentEmbed_' + eventName);
        }
    }
    /**
     * 展现统计
     */
    function checkShowInView() {
        if (!showLog) {
            return;
        }
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            var offset = _container.getBoundingClientRect();
            if (offset.height === 0) {
                showLog = false;
                return;
            }
            var height = window.innerHeight;
            if (offset.top > 0 && offset.top < height) {
                actionCb && actionCb('cmt-show');
                pblog('event',['comment', 'scroll', 'sdk_show', 17]);
                window.removeEventListener('scroll', checkShowInView, false);
                showLog = false;
            }
        }, 150);
    }
    /**
     * 添砖落地页
     */
    var isLock; //防止爆点@Todo 最好可以在调起回调中处理
    function gotoLandingPage(isCreate) {
        if (isLock) {
            return;
        }
        isLock = true;
        setTimeout(function() {
            isLock = false;
        }, 500);
        var url = isCreate ? _createURL : _landingPageURL;
        setTimeout(function() {
            if (!$.$isBox() && !$.$isLiteBox()) {
                if (_backHome) {
                    //@Todo 分享回流，打开框。建议回流到分享落地页。目前需求比较乱不打开评论落地页，因此通过log通知业务，业务层做相应的回流逻辑。
                } else {
                    window.location.href = url;
                }
            } else {
                isLock = false;
                //ios需要传newbrowser参数，用于 O2O新窗口打开，如果低版本传了也不影响，赞一个。
                if ($.isIOS) {
                    if (version_compare(getVersion(), '7.7') >= 0 || $.$isLiteBox()) {
                        O2O(url, {
                            'newbrowser': '1',
                            'sfrom': _sfrom,
                            'toolbaricons': JSON.stringify({
                                'toolids': ['4']
                            }),
                            'menumode': '2'
                        });
                    } else {
                        O2O(url, {
                            'newbrowser': '1',
                            'sfrom': _sfrom
                        });
                    }

                } else {
                    //android需要统计feed评论O2O打开时长，需要传component参数和版本信息，参数不能向下兼容。
                    if(version_compare(getVersion(), '7.2.5') >= 0 || $.$isLiteBox()) {
                        O2O(url, {
                            'S.menumode': '2',
                            'component': 'com.baidu.searchbox/.home.feed.FeedCommentActivity',
                            'min_v': '16789504'
                        });

                    } else {
                        O2O(url);
                    }
                }
            }
        }, 50);
    }
    /**
     * 创建制定 className的 div元素
     */
    function createDivByClass(className) {
        var div = document.createElement('div');
        div.setAttribute('class', className);
        return div;
    }
    /**
     * 创建单条评论
     */
    function createListItem(data) {
        var headIcon = data.avatar ? data.avatar : 'https://gss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/9b6747696e61e6958fe6958f1f64.jpg';
        var uname = data.uname ? data.uname : '匿名用户';
        var authorHtml = '';
        if (data._bjh_is_author) {
            data.uname = data._bjh_uname;
            authorHtml = '<span class="cmt-author">[作者]</span>';
        }
        var vipHtml = '';
        if (data._star && data._star.uname) {
            data.uname = data._star.uname;
            headIcon = data._star.avatar;
            vipHtml = '<span class="cmt-vip"></span>';
        }
        var htmlTxt = '\
            <div class="commentEmbed-listItem">\
                <div class="headIcon" style="background-image:url(' + headIcon + ');"></div>\
                <div class="commentEmbed-content">\
                    <div class="commentEmbed-name">' + data.uname + vipHtml + authorHtml + '<div class="commentEmbed-favWord">赞</div><div class="commentEmbed-fav">'+data.like_count+'</div></div>\
                    <div class="commentEmbed-time">' + timeFormat(data.time) + '</div>\
                    <div class="commentEmbed-msg">' + data.reply_content.content + '</div>\
                </div>\
            </div>';
        return htmlTxt;
    }
    /**
     * 设置默认样式
     */
    function setDefaultCss() {
        if (document.getElementById('mbdcmtStyle') !== null) {
            return;
        }
        var style = document.createElement("style");
        style.id = 'mbdcmtStyle';
        style.type = 'text/css';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(style);
        style.innerHTML = defaultStyle();
    }
    /**
     * 格式化评论总数
     * @param  {Int} num 评论总数
     * 超过1万时，以万为单位，保留1位小数
     * 超过1亿时，以亿为单位，保留1位小数
     */
    function formatCommentNum(num) {
        num = parseInt(num, 10);
        if (num < 100000000) {
            num = num >= 10000 ? Math.floor(num / 1000) / 10 + '万' : num;
        } else {
            num = Math.floor(num / 10000000) / 10 + '亿';
        }

        return num;
    }
    /* 时间格式化 */
    function timeFormat(time) {
        if (!time) {
            return '刚刚';
        }
        var now = _serverTime * 1e3;
        var timeDate = new Date(parseInt(time, 10) * 1e3);
        var dif = now - parseInt(time) * 1e3,
            _min = 60 * 1e3,
            _hour = _min * 60,
            day = _hour * 24;

        var yearCompare = (new Date()).getFullYear();
        var year = timeDate.getFullYear();
        var month = timeDate.getMonth() + 1;
        var date = timeDate.getDate();
        var hours = timeDate.getHours();
        var minutes = timeDate.getMinutes();

        if (yearCompare !== year) {
            time = year + '-' + (month > 9 ? month : '0' + month)
                + '-' + (date > 9 ? date : '0' + date);
        } else if (dif >= day) {
            time = (month > 9 ? month : '0' + month)
                + '-' + (date > 9 ? date : '0' + date)
                + ' ' + (hours > 9 ? hours : '0' + hours)
                + ':' + (minutes > 9 ? minutes : '0' + minutes);
        } else if (dif > _hour) {
            time = parseInt(dif / _hour) + '小时前';
        } else if (dif > _min) {
            time = parseInt(dif / _min) + '分钟前';
        } else {
            time = '刚刚';
        }

        return time;
    }


    // 查找包含className的最近祖先，不存在返回null
    function closest(dom, className) {
        while(dom !== document) {
            if (!dom.classList.contains(className)) {
                dom = dom.parentNode;
            }
            else {
                return dom;
            }
        }
        return null;
    }
    // 格式化字符实体
    function encodeHtml(source) {
        return String(source)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/ /g, '&nbsp;');
    }

    // ===渲染函数start===
    function getRelationHtml(renameHtml, unameHtml) {
        if (!unameHtml) {
            unameHtml = '';
        }
        var str = '<span class="cmt-relation">'
            + unameHtml
            + (renameHtml ? '回复' + renameHtml : '')
            + '：</span>';
        return str;
    }
    function getTextHtml(text, preData, isZip) {
        var LINE = 5;
        var lineClass = isZip ? ' cmt-zip' : '';
        var lineAttr = ' style="-webkit-line-clamp:' + LINE  + '"';
        return '<div class="cmt-txt cmt-scan' + lineClass + '"' + lineAttr + '>'
            + preData
            + '<span class="cmt-t">' + encodeHtml(text) + '</span>'
            + '</div>';
    }
    function getChildHtml(item, useZip) {
        var uname = item.uname;
        var unameHtml = '';
        if (item._bjh_uname) {
            uname = item._bjh_uname;
            unameHtml += '<span class="cmt-author">[作者]</span>';
        }
        if (item._star && item._star.uname) {
            uname = item._star.uname;
            unameHtml = '<span class="cmt-vip"></span>' + unameHtml;
        }
        unameHtml = '<span class="cmt-relname">' + uname + '</span>' + unameHtml;

        var rename = item.reply_to_uname || '';
        var renameHtml = '';
        if (rename) {
            if (item._bjh_replyed_uname) {
                rename = item._bjh_replyed_uname;
                renameHtml += '<span class="cmt-author">[作者]</span>';
            }
            if (item._star && item._star.replyed_uname) {
                rename = item._star.replyed_uname;
                renameHtml = '<span class="cmt-vip"></span>' + renameHtml;
            }
            renameHtml = '<span class="cmt-relname">' + rename + '</span>' + renameHtml;
        }
        var relationHtml = getRelationHtml(renameHtml, unameHtml);

        return '<div class="cmt-sublist cmt-data">'
            + getTextHtml(item.content, relationHtml, useZip)
            + '</div>';
    }
    function getChildrenHtml(replyList, num, useZip) {
        num = num || replyList.length;
        var LENGTH = 2;
        var tmpl = '<div class="cmt-sublists"><div class="cmt-sublists-box">';

        var len = Math.min(replyList.length, num);
        for (var i = 0; i < len; i++) {
            tmpl += getChildHtml(replyList[i], useZip);
            if (i === LENGTH - 1) {
                break;
            }
        }
        if (num > LENGTH) {
            tmpl += ''
                + '<div class="cmt-submore">'
                +     '<div class="cmt-submore-text">查看全部'
                +         '<span class="cmt-submore-num">' + num + '</span>'
                +     '条评论</div>'
                +     '<div class="cmt-submore-icon"></div>'
                + '</div>';
        }

        return tmpl + '</div></div>';
    }
    function renderCmtListItem(item) {
        var tmp = '';

        // 评论回复前缀处理
        var relationHtml = ''; // 用户关系相关HTML
        var renameHtml = ''; // 用户名相关HTML
        var rename = item.reply_to_uname || '';
        if (rename) {
            if (item._bjh_replyed_uname) {
                rename = item._bjh_replyed_uname;
                renameHtml += '<span class="cmt-author">[作者]</span>';
            }
            if (item._star && item._star.replyed_uname) {
                rename = item._star.replyed_uname;
                renameHtml = '<span class="cmt-vip"></span>' + renameHtml;
            }
            renameHtml = '<span class="cmt-relname">' + rename + '</span>' + renameHtml;
            relationHtml = getRelationHtml(renameHtml);
        }

        // 判断是否百家号作者、明星及替换uname
        var authorHtml = '';
        if (item._bjh_uname) {
            item.uname = item._bjh_uname;
            authorHtml = '<span class="cmt-author">[作者]</span>';
        }
        var vipHtml = '';
        if (item._star && item._star.uname) {
            item.uname = item._star.uname;
            vipHtml = '<span class="cmt-vip"></span>';
        }
        // 用户信息
        var avatar = item.avatar || 'https://gss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/9b6747696e61e6958fe6958f1f64.jpg';
        if (item._star && item._star.avatar) {
            avatar = item._star.avatar;
        }
        var uinfoHtml = '<div class="cmt-uinfo">'
            + '<div class="cmt-img" style="background-image:url(' + avatar + ');"></div>'
            + '<div class="cmt-name">' + item.uname + vipHtml + authorHtml + '</div>'
            + '</div>';

        // 点赞
        var favClass = '';
        // 判断点赞状态 active不触发动画
        if (favData && favData[item.reply_id] !== undefined) {
            favClass = ' cmt-fav-active';
            if (favClass && +item.like_count === 0) {
                item.like_count = 1;
            }
        }

        var favHtml = '<div class="cmt-fav' + favClass + '">'
            + '<div class="cmt-fav-icon"></div>'
            + '<div class="cmt-fav-num">' + ((item.like_count > 0) ? item.like_count : '<span>赞</span>') + '</div>'
            + '</div>';

        // 用户操作
        var opHtml = '<div class="cmt-menu"></div>';

        // 二级评论模块
        var subreplyHtml = '';
        var replyList = item.reply_list;
        // 评论详情不带多层回复
        if (replyList && replyList.length > 0) {
            subreplyHtml = getChildrenHtml(replyList, item.reply_count, true);
        }

        // 用户信息
        var timeHtml = '<div class="cmt-time">' + timeFormat(item.create_time) + '</div>';
        var replyHtml = item.reply_id ? '<div class="cmt-reply">回复</div>' : '';

        // 属性信息
        var attr = 'data-uk="' + item.uk + '" '
            + 'data-tid="' + item.thread_id + '" '
            + 'data-rid="' + item.reply_id + '" '
            + 'data-uname="' + item.uname + '" ';
        if (item._star && item._star.mr_id) {
            // 明星标志用于作个人主页调起区分
            attr += 'data-mrid="' + item._star.mr_id + '" ';
        }

        if ('cachenum' in item) {
            attr += 'data-cachenum="' + item.cachenum + '"';
        }

        tmp = '<div class="cmt-list" ' + attr + '>'
            + uinfoHtml
            + favHtml
            + opHtml
            + '<div class="cmt-text">' + getTextHtml(item.content, relationHtml) + '</div>'
            + '<div class="cmt-bar">'
            +     '<div class="cmt-readmore">查看全部</div>'
            +     timeHtml
            +     '<div class="cmt-point"></div>'
            +     replyHtml
            + '</div>'
            + subreplyHtml
            + '</div>';

        return tmp;
    }
    function renderCmtList(lists) {
        var i = 0;
        var len = lists.length;
        var tpl = [];
        for (i = 0; i < len; i++) {
            tpl.push(renderCmtListItem(lists[i]));
        }
        return tpl.join('');
    }
    // ===渲染函数end===

    // 构建缓存单元并存储
    function cacheBuildItem(data, isClose) {
        if (!cacheF1Class || data.parent_id) {
            return;
        }
        var item = {
            create_time: Math.floor(Date.now() / 1000),
            content: data.content,
            reply_id: data.reply_id,
            reply_to_uname: data.reply_to_uname || '',
            parent_id: data.parent_id || 0,
            uname: data.uname,
            thread_id: infconf.thread_id
        }
        if (data._bjh_uname) {
            item._bjh_uname = data._bjh_uname;
        }
        if (data._bjh_replyed_uname) {
            item._bjh_replyed_uname = data._bjh_replyed_uname;
        }
        if (data._star) {
            item._star = data._star;
        }
        var obj = cacheF1Class.add(item);
        if (obj) {
            data.cachenum = obj.index;
        }
    }
    // 缓存一级评论整合进列表
    function cacheRebuildList() {
        if (!cacheData) {
            return;
        }
        var newCacheList = [];
        var index = cacheData.length - 1;
        while (index >= 0) {
            cacheData[index].data.uk = userinfo.uk;
            cacheData[index].data.avatar = userinfo.avatar;
            cacheData[index].data.like_count = 0;
            cacheData[index].data.cachenum = cacheData[index].index;
            newCacheList.push(cacheData[index].data);
            index--;
        }
        if (newCacheList.length > 0) {
            renderInfList(newCacheList, true);
        }
        hasCacheF1 = false;
    }
    // 删除一级列表中同名数据
    function cacheFilter(list) {
        var cacheDataNum = cacheData ? cacheData.length : 0;
        if (!cacheDataNum) {
            return 0;
        }
        var i = 0;
        var len = list.length;
        for (i = 0; i < len; i++) {
            var item = list[i];
            var dom = document.querySelector('[data-rid="' + item.reply_id + '"]');
            if (dom) {
                var cachenum = dom.getAttribute('data-cachenum');
                list[i].cachenum = cachenum;
                dom.parentNode.removeChild(dom);
                cacheDataNum--;
            }
        }
        return cacheDataNum;
    }
    // 处理缓存更新
    function cacheUpdateItem(type, num) {
        if (type === 1) {
            cacheF1Class.remove(num);
        }
        return;
    }

    // 设置文字折叠，infDom.lists非空
    function setInfClamp() {
        var line = 6.4;
        var lists = infDom.lists.lastChild;
        var pHeight = null;
        var cHeight = null;
        var page = null;
        page = lists.querySelectorAll('.cmt-text > .cmt-scan');
        var length = page.length;
        for (var i = 0; i < length; i++) {
            var node = page[i];
            if (!cHeight) {
                cHeight =  parseFloat(window.getComputedStyle(node).lineHeight) * line;
            }
            if (cHeight < node.clientHeight) {
                node.classList.add('cmt-zip');
                var dom = closest(node, 'cmt-list');
                dom = dom.querySelector('.cmt-readmore');
                dom.classList.add('cmt-show');
            }
            node.classList.remove('cmt-scan');
        }
        // page = lists.querySelectorAll('.cmt-sublist > .cmt-scan');
        // length = page.length;
        // for (var i = 0; i < length; i++) {
        //     var node = page[i];
        //     if (!pHeight) {
        //         pHeight =  parseFloat(window.getComputedStyle(node).lineHeight) * line;
        //     }
        //     if (pHeight < node.clientHeight) {
        //         node.classList.add('cmt-zip');
        //     }
        //     node.classList.remove('cmt-scan');
        // }
    }
    // 加载错误处理
    function errorLoad(res) {
        if (infconf.start !== 0) {
            if (res && res.errno) {
                // 后端返回请求能拿到且存在错误，终止获取列表
                console.log('getList error ' + res.errno);
                infDom.load.style.display = 'none';
                if (infDom.querySelector('.cmt-list')) {
                    infDom.nomore.style.display = 'block';
                }
                else {
                    needloadmore = false;
                    infDom.empty.setAttribute('style', '');
                }
            }
            return;
        }
        else {
            // 首屏加载失败 暂定隐藏评论
            needloadmore = false;
            _container.style.display = 'none';
        }
    }
    // 空列表处理，分为空评与空列表两种情形
    function emptyInfList() {
        if (infconf.start === 0) {
            infDom.empty && (infDom.empty.setAttribute('style', ''));
            needloadmore = false;
            actionCb && actionCb('cmt-act-fs', {state:'empty'});
        }
        else {
            needloadmore = false;
            infDom.load.style.display = 'none';
            infDom.nomore.style.display = 'block';
        }
    }
    // 列表渲染
    function renderInfList(list, isCache) {
        var tpl = [];
        tpl.push(renderCmtList(list));
        var page = createDivByClass('cmt-page');
        page.innerHTML = tpl.join('');
        infDom.lists.appendChild(page);
        setInfClamp();
        if(infconf.start === 0){
            actionCb && actionCb('cmt-act-fs');
        }
        if (!isCache) {
            infconf.start += infconf.num;
        }
        return;
    }
    // 无限下拉获取列表
    function getInfLoadData(initdata) {
        if (infStore.inflock) {
            return;
        }
        infStore.inflock = true;
        loadJS({
            url: API.getList, //正式环境
            data: infconf,
            success: function(res) {
                infStore.inflock = false;
                if ('0' === res.errno) {
                    // 配置参考时间
                    _serverTime = res.timestamp;
                    //@Todo重构下面逻辑
                    // 如果有缓存，即便length为0，也不进入空列表
                    if (res.ret.list.length === 0 && !hasCacheF1) {
                        // 首次加载数据已拿到，通知落地页配置底bar，显示头部
                        if (infconf.start === 0) {
                            _cmtCb && _cmtCb(initdata);
                            syncCommentNum.init(snycId, parseInt(initdata.total_count));
                            bottomBar.init({
                                container:_container,
                                res: initdata,
                                maginTop: maginTop,
                                canAction: true,
                                actionCb: actionCb
                            });
                            // if(infconf.order == ORDER){
                            //     infDom.head.style.display = 'block';
                            // }else{
                               infDom.lists.style.paddingTop = '0.04rem';
                            // }
                        }
                        emptyInfList();
                        return;
                    }
                    if (infconf.start === 0) {
                        cacheRebuildList();
                    }
                    var filternum = cacheFilter(res.ret.list);
                    // 首次加载数据已拿到，通知落地页配置底bar，显示头部
                    if (infconf.start === 0) {
                        initdata.total_count = +initdata.total_count + filternum;
                        _cmtCb && _cmtCb(initdata);
                        //初始化同步评论数。
                        syncCommentNum.init(snycId, parseInt(initdata.total_count));
                        bottomBar.init({
                            container:_container,
                            res: initdata,
                            maginTop: maginTop,
                            canAction: true,
                            actionCb: actionCb
                        });
                        // if(infconf.order == ORDER){
                        //     infDom.head.style.display = 'block';
                        // }else{
                           infDom.lists.style.paddingTop = '0.04rem';
                        // }
                    }
                    if (res.ret.list.length !== 0) {
                        renderInfList(res.ret.list);
                    }
                    if (res.ret.is_over) {
                        actionCb && actionCb('cmt-show-nomore');
                        needloadmore = false;
                        infDom.load.style.display = 'none';
                        infDom.nomore.style.display = 'block';
                    }
                    else {
                        needloadmore = true;
                        infDom.load.style.display = 'block';
                        infDom.nomore.style.display = 'none';
                    }
                    _endCb && _endCb();
                }
                else {
                    errorLoad(res);
                }
            },
            error: function(res) {
                infStore.inflock = false;
                console.log('error:' + res);
                errorLoad(res);
            }
        });
    }

    // toast
    function toast(msg) {
        if ($.$isAndroid()) {
            if (($.$isBox() && version_compare(getVersion(), '4.0') >= 0) || $.$isLiteBox()) {
                androidInvokeApp('Bdbox_android_utils', 'toast', [msg]);
            } else {
                alert(msg);
            }
        } else {
            if (($.$isBox() && version_compare(getVersion(), '6.0') >= 0) || $.$isLiteBox()) {
                iosInvokeApp('utils', {
                    action: 'toast',
                    string: msg,
                    minver: '6.0.0.0'
                });
            } else {
                alert(msg);
            }
        }
    }
    // 全局字体调整
    function getFontSize() {
        var fontsizeCallBack = '__boxjs_cmt_fontsizeCb';
        window[fontsizeCallBack] = function (data) {
            // ios返回string，android返回object
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data && data.errno === '1') {
                fontLevel = data.data.fontsize || 'font-size-1';
            }
        }
        if (version_compare(getVersion(), '8.1') >= 0  || $.$isLiteBox()) {
            if ($.$isAndroid()) {
                androidInvokeApp(
                    'Bdbox_android_utils',
                    'getGlobalSettings',
                    [fontsizeCallBack]
                );
            }
            else {
                iosInvokeApp(
                    'utils',
                    {
                        'action': 'getGlobalSettings',
                        'minver': '8.1.0.0'
                    },
                    fontsizeCallBack
                );
            }

        }
    }
    // 调明星主页
    function invokeStarInfo(mr_id, from) {
        if (!mr_id || (!$.$isBox() && !$.isLiteBox)) {
            return;
        }

        var context = encodeURIComponent(JSON.stringify({
            mr_id: mr_id,
            from: from
        }));
        var webUrl = 'https://mbd.baidu.com';
        var url = webUrl + '/webpage?type=celebrity&action=home&context=' + context;
        var slog = encodeURIComponent(JSON.stringify({
            from: 'comment',
            type: 'time',
            page: 'star_homepage',
            source: 'comment',
            ext: ''
        }));

        if (version_compare(getVersion(), '8.4') >= 0 && !$.$isLiteBox()) {
            // 8.4双端统一协议调起Hybrid
            var style = encodeURIComponent(JSON.stringify({
                toolbaricons: {
                    toolids: ['3']
                },
                menumode: '2' // 菜单添加收藏功能，改为2
                // menumode: '3'
            }));
            invoke('v1/easybrowse/hybrid', {
                upgrade: 1,
                type: 'hybrid',
                tplpath: 'profile',
                tpl_id: 'profile.html',
                context: context,
                style: style,
                newbrowser: 1,
                slog: slog
            });
        }
        else {
            // iOS8.0、安卓7.7起统一底部返回，低版本顶部返回
            var params = {};
            if ($.$isIOS()) {
                params.menumode = 2; // 菜单添加收藏功能，改为2
                // params.menumode = 3;
                params.toolbaricons = JSON.stringify({toolids: ['3']});
                params.newbrowser = 1;
                params.forbidautorotate = 1;
                params.slog = slog;
            }
            if ($.$isAndroid()) {
                params.component = 'com.baidu.searchbox/.xsearch.UserSubscribeCenterActivity';
                params['S.menumode'] = 2; // 菜单添加收藏功能，改为2
                // params['S.menumode'] = 3;
                params['S.toolbaricons'] = JSON.stringify({toolids: ['3']});
                params['S.slog'] = slog;
            }
            O2O(url, params);
        }
    }
    // 用户个人资料调起
    function invokeUserInfo(uk) {
        if (uk && uk !== '') {
            var opts = {
                uk: uk,
                src: 'comment'
            };
            if (($.$isBox() && version_compare(getVersion(), '7.0') >= 0) || $.$isLiteBox()) {
                if ($.$isAndroid()) {
                    androidInvokeApp('Bdbox_android_account', 'profile', [JSON.stringify(opts)]);
                }
                else {
                    iosInvokeApp('account', {
                        'action': 'profile',
                        'params': JSON.stringify(opts),
                        'minver': '7.0.0.0'
                    }, '');
                }
            }
        }
    }
    // 回复调起
    function inputFn(data) {
        var opt;
        if (data) {
            opt = {
                parent_id: data.comrepid,
                type: 1
            };
            pblog('event',['comment', 'click', 'sdk_showCommentBox', 17]);
            infStore.parentId = data.parentId;

            if (version_compare(getVersion(), '8.2') >= 0 || $.$isLiteBox()) {
                opt.rename = data.rename;
            }
        }
        else {
            opt = {type: 0};
            if (getinfoData.commentBox_placeholder) {
                opt.placeholder = getinfoData.commentBox_placeholder;
            }
            pblog('event', ['comment', 'click', 'sdk_emptyCommentBox', 17]);
            infStore.parentId = 0;
        }
        if ($.$isAndroid()) {
            androidInvokeApp(
                'Bdbox_android_comment',
                'showCommentBox',
                [JSON.stringify(opt), 'openRn']
            );
        }
        else {
            iosInvokeApp('comment', {
                action: 'showCommentBox',
                params: JSON.stringify(opt),
                minver: '8.0.0.0'
            }, 'openRn');
        }
    }
    function shareFn(data) {
        if ($.$isAndroid()) {
            androidInvokeApp(
                'Bdbox_android_utils',
                'callShare',
                [JSON.stringify(data), 'android_share_scuucess', 'android_share_fail']
            );
        } else {
            iosInvokeApp('callShare', {
                options: encodeURIComponent(JSON.stringify(data))
            }, function (data) {});
        }
    }
    function copyFn(data) {
        if ($.$isAndroid()) {
            if (version_compare(getVersion(), '8.0') >= 0 || $.$isLiteBox()) {
                androidInvokeApp('Bdbox_android_utils', 'copy', [data, 'copyRn']);
            }
        }
        else {
            if (version_compare(getVersion(), '5.4') >= 0 || $.$isLiteBox()) {
                iosInvokeApp('copy', {
                    'text': data,
                    'minver': '5.4.0.0'
                }, 'copyRn');
            }
        }
    }
    function delFn(comrepid, dom) {
        if (+comrepid === 0) {
            toast('删除成功');
            removeItem(dom);
            return;
        }
        if (infStore.dlock) {
            return;
        }
        infStore.dlock = true;
        var data = {
            thread_id: infconf.thread_id,
            appid: infconf.appid,
            sid: infconf.sid,
            cuid: infconf.cuid,
            isInf: infconf.isInf,
            reply_id: comrepid,
            callback: '?'
        };
        loadJS({
            url: API.delReply, //正式环境
            data: data,
            success: function(json) {
                infStore.dlock = false;
                if (json.errno === '0') {
                    toast('删除成功');
                    removeItem(dom);
                } else {
                    toast('删除失败，请稍后再试');
                }
            },
            error: function(res) {
                infStore.dlock = false;
                toast('删除失败，请稍后再试');
            }
        });
    }
    function getMenu(opt) {
        var ul = document.createElement('ul');
        var menuClass = 'cmt-op-lists cmt-show';
        if (opt.reverse) {
            menuClass += ' ' + 'cmt-op-t' + opt.length; // cmt-op-t3|2|1
        }
        ul.className = menuClass;

        var tmpl = '';
        if (opt.isSelf) {
            tmpl += '<li class="cmt-del cmt-op-list">删除</li>';
        }
        else {
            tmpl += '<li class="cmt-report cmt-op-list">举报</li>';
        }
        if (opt.hasShare) {
            tmpl += '<li class="cmt-share cmt-op-list">分享</li>';
        }
        if (opt.hasCopy) {
            tmpl += '<li class="cmt-copy cmt-op-list">复制</li>';
        }
        ul.innerHTML = tmpl;
        cmtMenu = ul;
        return cmtMenu;
    }

    function changeFavState(dom, isFav){
        var child = dom.querySelector('.cmt-fav-num');
        var num = (child.innerHTML == '<span>赞</span>') ? 0 : +child.innerHTML;
        if(isFav){
            actionCb && actionCb('cmt-click-fav', {state:0});
            child.innerHTML = num + 1;
            dom.classList.add('cmt-fav-act');
            dom.classList.add('cmt-fav-active');
        }else{
            actionCb && actionCb('cmt-click-fav', {state:1});
            toast('您已赞过');
        }
    }

    function addFav(dom) {
        var comrepid = +dom.getAttribute('data-rid');
        dom = dom.querySelector('.cmt-fav');
        //召回只能自己切换点赞，不记录。
        if(!comrepid){
            changeFavState(dom, !dom.classList.contains('cmt-fav-active'))
            return;
        }
        var favState = favLs.fav(comrepid);
        changeFavState(dom, !favState.hadFav);
        if(favState.hadFav){
            return;
        }
        var data = {
            thread_id: infconf.thread_id,
            appid: infconf.appid,
            sid: infconf.sid,
            cuid: infconf.cuid,
            isInf: infconf.isInf,
            callback: '?',
            reply_id: comrepid,
            type: 1
        };

        loadJS({
            url: API.fav,
            data: data,
            success: function (res) {
            },
            error: function (res) {
            }
        });
    }
    function removeItem(dom) {
        if (dom.classList.contains('commentsdk-relist')) {
            // 二级评论删除
            var parent = dom.parentNode;
            if (parent.querySelector('.commentsdk-remore')) {
                if (dom.classList.contains('cmt-new')) {
                    parent.removeChild(dom);
                }
                else {
                    var total = parent.querySelector('.cmt-total');
                    var num = +total.innerHTML;
                    total.innerHTML = num - 1;
                    parent.removeChild(dom);
                }
            }
            else {
                // 不存在查看更多
                if (parent.childNodes.length <= 1) {
                    parent.parentNode.removeChild(parent);
                }
                else {
                    parent.removeChild(dom);
                }
            }
        }
        else {
            // 一级评论删除
            var parent = closest(dom, 'cmt-list');
            parent.parentNode.removeChild(parent);
        }
        // 样式调整
        if (!infDom.lists.querySelector('.cmt-list')) {
            infDom.nomore.style.display = 'none';
            infDom.empty.setAttribute('style', '');
        }
        else {
            if (infDom.load.style.display === 'block') {
                var rect = infDom.load.getBoundingClientRect();
                if (window.innerHeight - rect.top > 0) {
                    getInfLoadData();
                }
            }
        }
        actionCb && actionCb('cmt-act-delComment');
        cmrCb && cmrCb({type: 3});
        syncCommentNum.remove();
        bottomBar.cmrCb({type: 3});
    }
    function hideMenu() {
        if (cmtMenu) {
            cmtMenu.parentNode.removeChild(cmtMenu);
            cmtMenu = null;
        }
    }
    // 事件绑定
    function bindInfEvent() {
        document.body.addEventListener('touchstart', function(e){
            if(!e.target.classList.contains('cmt-menu') && !e.target.classList.contains('cmt-op-list')){
                hideMenu();
            }
        }, false);

        document.body.addEventListener('touchmove', hideMenu, false);
        // 无限下拉事件
        needloadmore && window.addEventListener('scroll', handleMore, false);
        // 调用户个人资料页
        delegate.on(infDom.lists, '.cmt-uinfo', 'click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var dom = closest(e.target, 'cmt-list');
            var uk = dom.getAttribute('data-uk');
            var mr_id = dom.getAttribute('data-mrid');
            if (!mr_id) {
                actionCb && actionCb('cmt-click-uinfo');
                invokeUserInfo(uk);
            }
            else {
                actionCb && actionCb('cmt-click-uinfo', {type:'mr'});
                invokeStarInfo(mr_id, 'comment');
            }

        });
        // 折叠展开处理
        delegate.on(infDom.lists, '.cmt-readmore', 'click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            actionCb && actionCb('cmt-click-unzip');
            var target = closest(e.target, 'cmt-list');
            if (target) {
                var txt = target.querySelector('.cmt-txt');
                txt.classList.add('cmt-unziped');
                txt.classList.remove('cmt-zip');
                e.target.classList.remove('cmt-show');
            }
        });
        // 回复必须要在查看更多前，这样才会先设置infState
        delegate.on(infDom.lists, '.cmt-reply', 'click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            actionCb && actionCb('cmt-click-reply');
            var dom = closest(e.target, 'cmt-list');
            var comrepid = +dom.getAttribute('data-rid');
            var rename = dom.getAttribute('data-uname');
            var parentId = comrepid;
            if (!comrepid) {
                console.log('recall');
                return;
            }
            inputFn({
                comrepid: comrepid,
                rename: rename,
                parentId: parentId
            });
        });
        // 点赞
        delegate.on(infDom.lists, '.cmt-fav', 'click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var dom = closest(e.target, 'cmt-list');
            addFav(dom);
        })
        // 互动事件不加锁，因为最后会干掉自身
        delegate.on(infDom.lists, '.cmt-share', 'click', function (e) {
            e.preventDefault();
            actionCb && actionCb('cmt-click-share');
            var dom = closest(e.target, 'cmt-list');
            var comrepid = dom.getAttribute('data-rid');
            var name = dom.getAttribute('data-uname');
            var scontent = _desc;
            var stitle = dom.querySelector('.cmt-text .cmt-t').innerText;
            if (stitle.length > 80) {
                stitle = stitle.slice(0, 80) + '...';
            }
            stitle = name + '的评论：' + stitle;

            var sendData = {
                thread_id: infconf.thread_id,
                reply_id: comrepid,
                appid: infconf.appid,
                isBdboxShare: 1
            };
            var slink = API.detail + '?' + jsonToQuery(sendData);

            var shareObj = {
                mediaType: 'all',
                title: stitle,
                content: scontent,
                linkUrl: slink,
                source: 'comment'
            };

            // 尝试获取全局分享变量下的icon与image
            if (window.BoxShareData && window.BoxShareData.options) {
                var options = window.BoxShareData.options;
                if (options.imageUrl) {
                    shareObj.iconUrl = options.imageUrl;
                }
                if (options.iconUrl) {
                    shareObj.iconUrl = options.iconUrl;
                }
            }

            shareFn(shareObj);
        });
        delegate.on(infDom.lists, '.cmt-copy', 'click', function (e) {
            e.preventDefault();
            actionCb && actionCb('cmt-click-copy');
            var dom = closest(e.target, 'cmt-list');
            var text = dom.querySelector('.cmt-text .cmt-t').innerText;
            copyFn(text);
        });
        delegate.on(infDom.lists, '.cmt-report', 'click', function (e) {
            e.preventDefault();
            var dom = closest(e.target, 'cmt-list');
            actionCb && actionCb('cmt-click-report');

            var comrepid = dom.getAttribute('data-rid');
            var reportData = {
                reply_id: comrepid,
                thread_id: infconf.thread_id,
                appid: infconf.appid
            };
            var slink = API.report + '?' + jsonToQuery(reportData);
            if ($.$isAndroid()) {
                O2O(slink, {
                    component: 'com.baidu.searchbox/.LightBrowserActivityExt2'
                });
            }
            else {
                O2O(slink, {newbrowser: '1'});
            }
        });
        delegate.on(infDom.lists, '.cmt-del', 'click', function (e) {
            e.preventDefault();
            actionCb && actionCb('cmt-click-del');
            var dom = closest(e.target, 'cmt-list');
            var comrepid = dom.getAttribute('data-rid');
            // 看是否在缓存
            var delcache = dom.getAttribute('data-cachenum');
            if (delcache != null) {
                cacheUpdateItem(1, delcache);
            }
            delFn(comrepid, dom);
        });
        //关闭弹出菜单
        delegate.on(infDom.lists, '.cmt-op-lists', 'click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            hideMenu();
        });
        // 菜单
        delegate.on(infDom.lists, '.cmt-menu', 'click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            actionCb && actionCb('cmt-click-menu');
            var menu = closest(e.target, 'cmt-menu');
            var list = closest(menu, 'cmt-list');
            // 判断是否为关闭菜单
            var ul = list.querySelector('.cmt-op-lists');
            if (ul) {
                hideMenu();
                return;
            }

            hideMenu();

            var opt = {
                length: 3,
                hasShare: true,
                hasCopy: true,
                isSelf: false,
                reverse: false
            };
            var compareT = 152;

            // 召回评论
            if (+list.getAttribute('data-rid') === 0) {
                opt.length--;
                opt.hasShare = false;
                compareT -= 46;
            }
            // 是否用户自身评论
            var uk = list.getAttribute('data-uk');
            if (userinfo.uk === uk) {
                opt.isSelf = true;
            }

            // 是否反转置上方
            var bottom = menu.getBoundingClientRect().bottom;
            if (window.innerHeight - bottom < compareT) {
                opt.reverse = true;
            }

            list.insertBefore(getMenu(opt), list.firstChild);

        });
        // 查看详情页
        delegate.on(infDom.lists, '.cmt-list', 'click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var comrepid = this.getAttribute('data-rid');
            var sendData = {
                thread_id: infconf.thread_id,
                reply_id: comrepid,
                appid: infconf.appid,
                from: 'sdk',
                sfrom: _source
            };
            var slink = API.detail + '?' + jsonToQuery(sendData);
            if ($.$isAndroid()) {
                O2O(slink, {
                    'S.menumode': '2',
                    'component': 'com.baidu.searchbox/.home.feed.FeedCommentActivity',
                    'min_v': '16789504'
                });
            }
            else {
                O2O(slink, {
                    newbrowser: '1',
                    toolbaricons: JSON.stringify({
                        'toolids': ['4']
                    }),
                    menumode: '2'
                });
            }
        });
        //点击空评论
        delegate.on(infDom.empty, '.cmt-empty', 'click', function(e) {
            e.preventDefault();
            actionCb && actionCb('cmt-click-empty');
            inputFn();
        });
    }
    function handleMore() {
        if (!needloadmore) {
            return;
        }
        // 后续改成可配
        var bottomTop = 50;
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            var dh = document.documentElement.scrollHeight;
            var wh = window.innerHeight;
            var st = window.scrollY;
            if (wh + st + bottomTop + 20 > dh) {
                pblog('event',['comment', 'scroll', 'sdk_loadmore', 17]);
                getInfLoadData();
            }
        }, 100);
    }
    // 无限下拉初始化
    function initInfLoad(data) {
        infDom = {};
        userinfo = data.userinfo || {};
        infconf.thread_id = data.id;
        //infconf.thread_id = 1077000000173374;
        // infconf.thread_id = 1022000000000000;
        infconf.callback = '?';

        // 获取全局设置字体大小
        getFontSize();

        // 分别对一级评论与二级评论缓存类初始化
        if (userinfo.uk) {
            cacheF1Class = timingLs(userinfo.uk + infconf.thread_id);
            cacheData = cacheF1Class.get();
            // 判断缓存是否存在
            hasCacheF1 = false;
            if (cacheData) {
                hasCacheF1 = true;
            }
        }

        // 点赞缓存检查，超出清理
        favLs = favLsClass(infconf.thread_id);
        favData = favLs.getData();

        var fragment = createDivByClass('commentsdk');

        infDom.head = createDivByClass('cmt-head');
        infDom.head.style.display = 'none';
        infDom.head.innerHTML = ''
            + '<div class="cmt-head-box">'
            +     '<div class="cmt-head-title">最新评论</div>'
            + '</div>';

        infDom.lists = createDivByClass('cmt-lists');

        infDom.load = createDivByClass('cmt-load');
        infDom.load.innerHTML = '<i></i><span>正在加载</span>';
        infDom.nomore = createDivByClass('cmt-over');
        infDom.nomore.innerHTML = '没有更多啦';

        fragment.appendChild(infDom.head);
        fragment.appendChild(infDom.lists);
        fragment.appendChild(infDom.load);
        fragment.appendChild(infDom.nomore);

        _container.appendChild(fragment);
        infDom.empty = createDivByClass('cmt-empty');
        infDom.empty.style.display = 'none';
        infDom.empty.innerHTML = ''
            + '<div class="cmt-empty-box">'
            +     '<div class="cmt-empty-logo"></div>'
            +     '<div class="cmt-empty-text">还没有人评论，快来抢沙发~</div>';
            + '</div>';
        _container.appendChild(infDom.empty);
        getInfLoadData(data);
        bindInfEvent();
    }

    // 回显评论，infDom非空
    function addComment(data) {
        var flag = !data.parent_id;
        var repid = data.reply_id;

        if (infDom.empty.style.display !== 'none') {
            infDom.empty.style.display = 'none';
            infDom.nomore.style.display = 'block';
        }

        data.uk = data.uk || userinfo.uk;
        data.uname = data.uname || userinfo.displayname;
        data.avatar = data.avatar || userinfo.avatar;
        actionCb && actionCb('cmt-act-addComment',{state:flag?1:2});
        if (flag) {
            // 一级评论
            data.like_count = 0;
            data.thread_id = infconf.thread_id;
            data.reply_list = '';
            var tpl = renderCmtListItem(data);
            var page = createDivByClass('cmt-page');
            page.innerHTML = tpl;
            infDom.lists.insertBefore(page, infDom.lists.firstChild);
            cmrCb && cmrCb({type: 1});
            bottomBar.cmrCb({type: 1});
        }
        else {
            var preId = '.cmt-list[data-rid="' + data.parent_id + '"]';
            var cmtList = infDom.lists.querySelector(preId);
            if (!cmtList) {
                return;
            }

            var sublist = cmtList.querySelector('.cmt-sublists-box');
            if (!sublist) {
                cmtList.appendChild(parseDom(getChildrenHtml([data], 1, false))[0]);
            }
            else {
                sublist.insertBefore(parseDom(getChildHtml(data, false))[0], sublist.firstChild);
            }
            cmrCb && cmrCb({type: 2});
            bottomBar.cmrCb({type: 2});
        }
        syncCommentNum.add();
        return;
    }
    //string to dom
    function parseDom(arg) {
        var objE = document.createElement("div");
        objE.innerHTML = arg;
        return objE.childNodes;
    };
    // 字体调整时调整折叠评论
    function adjustFont(data) {
        if (_container.style.display === 'none') {
            return;
        }
        if (infDom && (infDom.empty.style.display !== 'none')) {
            return;
        }

        var newFontSize = '';
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }
        var newFontSize = '';
        if (data && data.errno === '1') {
            newFontSize = data.data.fontsize;
        }
        else {
            return;
        }
        if (newFontSize === fontLevel) {
            // 左滑导致触发评论字号调整
            return;
        }
        fontLevel = newFontSize;

        // 展开所有折叠态、不能用DOMHTML
        var dom = infDom.lists.querySelectorAll('.cmt-text > .cmt-zip');
        var length = dom.length;
        for (var i = 0; i < length; i++) {
            closest(dom[i], 'cmt-list').querySelector('.cmt-readmore').classList.remove('cmt-show');
            dom[i].classList.remove('cmt-zip');
        }
        // 重新计算是否折叠
        setTimeout(function () {
            var line = 6.4;
            var lists =infDom.lists;
            var pHeight = null;
            var cHeight = null;
            var page = null;
            page = lists.querySelectorAll('.cmt-text > .cmt-txt');
            var length = page.length;
            for (var i = 0; i < length; i++) {
                var node = page[i];
                if (!node.classList.contains('cmt-unziped')) {
                    if (!cHeight) {
                        cHeight =  parseFloat(window.getComputedStyle(node).lineHeight) * line;
                    }
                    if (cHeight < node.clientHeight) {
                        node.classList.add('cmt-zip');
                        closest(node, 'cmt-list').querySelector('.cmt-readmore').classList.add('cmt-show');
                    }
                }
            }
            // page = lists.querySelectorAll('.cmt-sublist > .cmt-txt');
            // var length = page.length;
            // for (var i = 0; i < length; i++) {
            //     var node = page[i];
            //     if (node.classList.contains('cmt-unziped')) {
            //         return;
            //     }
            //     if (!pHeight) {
            //         pHeight =  parseFloat(window.getComputedStyle(node).lineHeight) * line;
            //     }
            //     if (!node.classList.contains('open')) {
            //         if (pHeight < node.clientHeight) {
            //             node.classList.add('cmt-zip');
            //         }
            //     }
            // }
        }, 10);
    }
    window.copyRn = function (data) {
        if ($.$isAndroid()) {
            if (data === 0) {
                toast('已复制到剪贴板');
            }
            else {
                toast('复制失败，请重试！');
            }
        }
        else {
            // ios success会自动提示
            if (data && data.error !== 0) {
                toast('复制失败，请重试！');
            }
        }
    };
    window.BoxJS && window.BoxJS.ready(function () {
        BoxJS.on('commentResult', function (data) {
            hideMenu();
            // @fixme 修正用户评论包含换行时无法解析json问题
            data = data.replace(/\n/g, '\\n');
            data = JSON.parse(data);
            // 若为百家号作者替换百家号作者用户名
            if (data._bjh_is_author) {
                data.uname = data._bjh_uname;
            }

            // 若在NA端完成登录，重置用户信息
            if (!userinfo.displayname) {
                userinfo.uk = data.uk;
                userinfo.displayname = data.uname;
                userinfo.avatar = data.avatar;
                cacheF1Class = timingLs(userinfo.uk + infconf.thread_id);
                cacheData = cacheF1Class.get();
            }
            // 若被召回
            if (data.recall == 1) {
                data.uname = data.uname || userinfo.displayname;
                // level=0表示发表评论，否则为回复评论
                if (!!data.level) {
                    data.parent_id = infStore.parentId || 0;
                }
            }
            else if (data.recall == 2) {
                return;
            }
            actionCb && actionCb('cmt-reply', data);
            cacheBuildItem(data);
            if (_container.style.display !== 'none') {
                addComment(data);
            }
        });
        BoxJS.on('globalSettingChange', adjustFont);
    })

    function destroy() {
        duration({action: 'disappear', data: _durationData || {key:'comment'}});
        if(window.BoxJS && window.BoxJS.off){
            window.BoxJS.off('commentResult');
            window.BoxJS.off('globalSettingChange', adjustFont);
        }
        if (isInf) {
            window.removeEventListener('scroll', handleMore, false);
        }
        else {
            window.removeEventListener('scroll', checkShowInView, false);
        }
        // 清空dom
        _container.innerHTML = '';
    }

    return {
        destroy: destroy
    };
};

});;
module.exports = require('BoxJS:bdbox/comment/commentEmbed');

});;
            BoxJS.define('BoxJS:ui/subscribe/index', function(require, exports, module, $){
/* eslint-disable */
BoxJS.define('BoxJS:bdbox/subscribe/isub', function(require, exports, module, $){
/* eslint-disable */
/**
 *
 * @file 通用关注组件 Subscribe 组件不依赖zepto，百度域名非必须
 *
 * @param id            {string} id 组件标识
 * @param opts          {object} 组件配置，包含类型，文案，扩展配置等。如{type:'stock',isaladin:0/1}
 * @param ops.type      {string}  资源类型
 * @param ops.isaladin  {boolean}  是否是阿拉丁
 *
 * @author Created by youliang on 16/10/1.
 */
/* global Bdbox */
/* eslint-disable fecs-camelcase */
var $Box = $;
var versionCompare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');
var o2o = require('BoxJS:bdbox/client/o2o');

var iosCMD = require('BoxJS:bdbox/ios/open');
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var toast = require('BoxJS:bdbox/client/toast');
var boxLogin = require('BoxJS:bdbox/client/login');
var multilog = require('BoxJS:bdbox/monitor/multilog');
var loadjs = require('BoxJS:bdbox/io/loadJS');
var toQuery = require('BoxJS:bdbox/utils/jsonToQuery');
var toJSON = require('BoxJS:bdbox/utils/queryToJson');

var host;
var extHost;

// 关注业务
var subLog = multilog(18);

var isub = function (id, ops) {
    this.id = id;
    this.toastBool = null;
    this.toastTransition = null;
    this.needUI = (ops && ops.needUI) || true;
    if (this.needUI) {
        this.createDom();
    }
    this.ops = ops || {};
    this.ua = this.getUa();
    this.isNew = $Box.$isBox() && versionCompare(getVersion(), '7.7.0') >= 0;
    this.ops.sfrom = this.ua;
    !this.ops.noPv && subLog.pv('__subscribeComponentsPv__', this.ops);
    if (location.port && !ops.onLine) {
        host = '';
        extHost = '';
    } else {
        host = 'https://mbd.baidu.com';
        extHost = 'https://ext.baidu.com';
    }
};
var subProto = isub.prototype;

subProto.createDom = function () {
    // 提示toast dom
    var id = this.id;
    var tTips = document.createElement('div');
    tTips.className = 'subscribe-toast subscribe-toast-tips';
    tTips.id = 'toast-text-' + id;
    var dtc = document.createElement('div');
    dtc.className = 'subscribe-tips-context';
    dtc.innerText = '关注失败，请稍候重试';
    tTips.appendChild(dtc);
    this.$toastOne = tTips;
    // 跳转toast dom
    var tClick = document.createElement('div');
    tClick.className = 'subscribe-toast subscribe-toast-click';
    tClick.id = 'toast-click-' + id;
    var scc = document.createElement('div');
    scc.className = 'subscribe-click-container';
    scc.innerHTML = '<div class="subscribe-click-context">关注成功，请到“'
        + '<span class="subscribe-click-text2">首页-关注</span>”查看'
        + '</div>'
        + '<div class="subscribe-click-button" ontouchstart="">去查看</div>';
    tClick.appendChild(scc);

    this.$toastTwo = tClick;
    // 弹窗dom
    var dialog = document.createElement('div');
    dialog.className = 'clear-dialog isub-dialog dialog-hidden';
    dialog.innerHTML = '<div class="dialog-opacity"></div>'
        + '<div class="dialog-body isub-dialog dialog-hidden">'
        + '<p class="dialog-title">提示</p>'
        + '<div class="dialog-content">确定不再关注此订阅号吗？</div>'
        + '<div class="dialog-btn">'
        + '<div class="dialog-btn-con"><a class="dialog-btn-cancel" href="javascript:;">仍然关注</a></div>'
        + '<div class="dialog-btn-con"><a class="dialog-btn-confrim" href="javascript:;">不再关注</a></div>'
        + '</div></div>';
    this.$dialog = dialog;
    if (!document.getElementById('subcribe_style')) {
        /* eslint-disable max-len */
        var cssText = '.subscribe{box-sizing:border-box;-webkit-box-sizing:border-box}.subscribe-toast-tips{box-sizing:border-box;-webkit-box-sizing:border-box;position:fixed;top:50%;margin-top:-25px;height:50px;width:100%;text-align:center;z-index:200;transition:opacity .3s;-webkit-transition:opacity .3s;opacity:0}.subscribe-toast-tips.subscribe-active{opacity:1}.subscribe-tips-context{box-sizing:border-box;-webkit-box-sizing:border-box;display:inline-block;width:auto;margin:0 auto;height:50px;min-width:100px;padding:0 17px;font:18px/50px Arial,Helvetica,sans-serif;color:#fff;background-color:rgba(0,0,0,0.7);border-radius:2px}@media screen and (max-width:320px){.subscribe-tips-context{font:16px/50px Arial,Helvetica,sans-serif}}.subscribe-toast-click{box-sizing:border-box;-webkit-box-sizing:border-box;position:fixed;bottom:36px;margin-top:-25px;height:50px;width:100%;z-index:200;text-align:center;transition:opacity .3s;-webkit-transition:opacity .3s;opacity:0}.subscribe-toast-click.subscribe-active{opacity:1}.subscribe-click-container{box-sizing:border-box;-webkit-box-sizing:border-box;display:inline-block;width:92%;margin:0 auto;height:50px;min-width:100px;padding:0 17px;background-color:rgba(0,0,0,0.7);border-radius:2px;color:#fff}@media screen and (max-width:320px){.subscribe-click-container{padding:0 10px}}.subscribe-click-context{display:inline-block;vertical-align:top;float:left;box-sizing:border-box;-webkit-box-sizing:border-box;font:16px/50px Arial,Helvetica,sans-serif;width:76%;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}@media screen and (max-width:320px){.subscribe-click-context{font:14px/50px Arial,Helvetica,sans-serif}}.subscribe-click-button{float:right;box-sizing:border-box;-webkit-box-sizing:border-box;display:inline-block;vertical-align:top;margin-top:11px;width:20%;height:28px;border-radius:2px;font:14px/28px Arial,Helvetica,sans-serif;background-color:#3c76ff;text-align:center}@media screen and (max-width:320px){.subscribe-click-button{width:60px;font:12px/28px Arial,Helvetica,sans-serif}}.subscribe-click-button:active{background-color:#3970f2}.clear-dialog{display:block;height:100%;width:100%;position:fixed;top:0;left:0;z-index:400}.clear-dialog.dialog-hidden{left:-1999px}.clear-dialog .dialog-opacity{width:100%;height:100%;background:#000;opacity:.6;z-index:400}.clear-dialog .dialog-body{box-sizing:border-box;width:84%;padding:5.6% 4.63% 4.63%;background:#fff;position:fixed;z-index:500;left:8%;top:50%;border-radius:2px;margin-top:-98px}.clear-dialog .dialog-body.dialog-hidden{left:-1999px}.clear-dialog .dialog-body .dialog-title{width:100%;margin:0;text-align:center;font-size:20px;line-height:20px;color:#333}.clear-dialog .dialog-body .dialog-content{width:100%;padding:31px 12px;display:-webkit-box;display:box;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;box-pack:center;text-align:left;box-sizing:border-box;-webkit-box-sizing:border-box;font-size:16px;line-height:24px;color:#666}@media screen and (max-width:320px){.clear-dialog .dialog-body .dialog-content{padding:28px 10px;font-size:14px;line-height:22px}}.clear-dialog .dialog-body .dialog-btn{width:100%;overflow:hidden}.clear-dialog .dialog-body .dialog-btn .dialog-btn-con{float:left;width:50%;overflow:hidden}.clear-dialog .dialog-body .dialog-btn .dialog-btn-con .dialog-btn-cancel,.clear-dialog .dialog-body .dialog-btn .dialog-btn-con .dialog-btn-confrim{width:93%;height:50px;border:1px solid #ccc;border-radius:2px;display:-webkit-box;display:box;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;box-pack:center;font-size:18px;color:#333;background:#fff;text-decoration:none}.clear-dialog .dialog-body .dialog-btn .dialog-btn-con .dialog-btn-cancel:active,.clear-dialog .dialog-body .dialog-btn .dialog-btn-con .dialog-btn-confrim:active{background:#f4f4f4}.clear-dialog .dialog-body .dialog-btn .dialog-btn-con .dialog-btn-cancel{float:left}.clear-dialog .dialog-body .dialog-btn .dialog-btn-con .dialog-btn-confrim{float:right}';
        var tStyle = document.createElement('style');
        tStyle.id = 'subcribe_style';
        tStyle.rel = 'stylesheet';
        tStyle.type = 'text/css';
        tStyle.innerHTML = cssText;
        document.head.appendChild(tStyle);
    }
};

subProto.relateAPI = function (data, callback, failCallback) {
    if (!data || typeof data !== 'object') {
        /* eslint-disable fecs-camelcase */
        if (!data.type || !data.sfrom || !data.third_id || !data.sort_index) {
            throw new Error('missing params');
        } else if (callback && typeof callback !== 'function') {
            throw new Error('callback must be a function');
        } else {
            throw new Error('params error');
        }
    }
    /* eslint-disable fecs-camelcase */
    var thirdID = $Box.isArray(data.third_id) ? data.third_id.join(',') : data.third_id;
    var isNew = this.isNew;


    var sortData = {
        type: data.type,
        sfrom: data.sfrom,
        third_id: thirdID,
        store: isNew ? 'uid_cuid' : 'uid'
    };

    var sortAPI = extHost + '/api/subscribe/v1/relation/get?callback=?&' + toQuery(sortData);
    var sortCallback = function (sdata) {
        callback && callback(sdata);
    };
    var sortFailCallback = function (err) {
        failCallback && failCallback(err);
    };
    loadjs({
        url: sortAPI,
        success: sortCallback,
        error: sortFailCallback
    });
};

subProto.toast = function (config) {
    /**
     *
     * @param config            {object}    配置参数
     * @param config.type       {string}    toast类型 click可点击，tips仅提示
     * @param config.text       {string}    配置文案
     * @param config.url        {string}    toast跳转地址 当type=click时的跳转url，默认跳 手百我的关注
     * @param config.callback   {function}  回调函数callback
     *
     * @update 11.1改动:满足toast-tips,文案定制
     */
    if (!this.isPlainObject(config) || this.isEmptyObject(config)) {
        throw new Error('params error,config is not a json');
    }
    var type = config.type || null;
    var callback = config.callback || null;
    var url = config.url || null;
    var ctext = config.text || null;
    var self = this;
    var isNew = this.isNew;
    if (!type || typeof type !== 'string') {
        throw new Error('params error');
    }
    var $body = document.body;

    var $toast = $body.querySelectorAll('.subscribe-toast');
    if (this.toastBool) {
        clearTimeout(this.toastBool);
        clearTimeout(this.toastTransition);
    }
    if ($toast.length) {
        for (var i = 0; i < $toast.length; i++) {
            $toast[i].parentNode.removeChild($toast[i]);
            self.removeClass($toast[i], 'subscribe-active');
        }
    }
    switch (type) {
        case 'tips':
            subLog.event('subComponents', 'interface', {
                isaladin: this.ops.isaladin ? '1' : '0',
                ua: this.ua,
                pos: 'tips',
                source: this.ops.type ? this.ops.type : 'others'
            });
            $body.appendChild(self.$toastOne);
            var $toastOne = document.querySelector('#toast-text-' + self.id);
            this.toastTransition = setTimeout(function () {
                if (ctext) {
                    $toastOne.querySelector('.subscribe-tips-context').innerText = ctext;
                }
                $toastOne.className = 'subscribe-toast subscribe-toast-tips subscribe-active';
            }, 10);
            this.toastBool = setTimeout(function () {
                try {
                    self.$toastOne.parentNode.removeChild(self.$toastOne);
                } catch (e) {
                    return;
                }
                ;
            }, 3000);
            break;
        case 'click':
            if ($Box.isLiteBox) {
                return this.toast({
                    type:'tips',
                    text:'关注成功，请到“首页-关注”查看'
                })
            }
            subLog.event('subComponents', 'interface', {
                isaladin: this.ops.isaladin ? '1' : '0',
                ua: this.ua,
                pos: 'click',
                source: this.ops.type ? this.ops.type : 'others'
            });
            var versionText = isNew ? '关注' : '我的关注';
            var text = $Box.$isBox() ? versionText : '首页-关注';
            self.$toastTwo.querySelector('.subscribe-click-text2').innerText = text;
            $body.appendChild(self.$toastTwo);
            if (!isNew && $Box.$isBox()) {
                self.$toastTwo.style.bottom = '100px';
                self.$toastTwo.querySelector('.subscribe-click-button').style.display = 'none';
            } else if ($Box.isLiteBox) {
                self.$toastTwo.querySelector('.subscribe-click-button').style.display = 'none';
            }
            this.toastTransition = setTimeout(function () {
                self.addClass(self.$toastTwo, 'subscribe-active');
            }, 10);

            this.toastBool = setTimeout(function () {
                try {
                    self.$toastTwo.parentNode.removeChild(self.$toastTwo);
                } catch (e) {
                    return;
                }
                ;
            }, 3000);
            var $toMe = document.querySelector('#toast-click-' + self.id + ' .subscribe-click-button');
            $toMe.onclick = null;
            setTimeout(function () {
                $toMe.onclick = function (e) {
                    self.$toastTwo.parentNode.removeChild(self.$toastTwo);
                    if (typeof callback === 'function') {
                        callback && callback();
                    } else {
                        self.toLandingPage(url);
                    }
                };
            }, 10);
            break;
    }
    return this;

};
subProto.toLandingPage = function (url, isToast) {
    /*
     * 框内cmd打开，框外location跳转
     * 无url则跳转我的关注，7.6以下以及框外执行location跳转
     */
    subLog.event('subComponents', 'interface', {
        isaladin: this.ops.isaladin ? '1' : '0',
        ua: this.ua,
        pos: 'toLanding',
        from: isToast ? 'button' : 'toast',
        source: this.ops.type ? this.ops.type : 'others'
    });
    if (url) {
        var params = $Box.$isIOS() ? {
            newbrowser: 1
        } : {};
        $Box.$isBox() ? o2o(url, params) : window.location.href = url;

    } else if ($Box.$isBox() && versionCompare(getVersion(), '7.6.0') >= 0) {
        if ($Box.isIOS) {
            var cmd = {
                mode: 2,
                /* eslint-disable max-len url */
                url: 'baiduboxapp://apppage?action=openPage&params=%7b%22pageid%22%3a%22mysubscription%22%2c%22url%22%3a%22https%3a%2f%2fmbd.baidu.com%2fwebpage%3faction%3dicard%26type%3dsubscribe%22%2c%22titile%22%3a%22%22%7d',
                minver: '7.6.0'
            };
            iosCMD(cmd.url, function (isTimeout) {
                if (isTimeout) {
                    toast('网络出错，请稍候重新连接');
                }
            });
        } else if ($Box.$isAndroid()) {
            var cmd = {
                mode: '7',
                commands: [{
                    mode: '6',
                    intent: 'intent:#Intent;S.rn_search_box_key=6;S.rn_bundle_id=box.rnplugin.myattention;S.rn_component_name=MyAttention;end',
                    class: 'com.baidu.searchbox.reactnative.RNSearchBoxMainActivity',
                    /* eslint-disable fecs-camelcase */
                    min_v: '25167488'
                }, {
                    mode: '0',
                    intent: 'intent:#Intent;S.user_sub_center_load_url=/webpage?action=icard&type=subscribe;B.launch_center=true;B.user_sub_center_search_enable=false;B.create_menu_key=false;end',
                    class: 'com.baidu.searchbox.xsearch.UserSubscribeCenterActivity',
                    /* eslint-disable fecs-camelcase */
                    dyna_url_key: 'user_sub_center_load_url',
                    /* eslint-disable fecs-camelcase */
                    http_style: true,
                    /* eslint-disable fecs-camelcase */
                    min_v: '24381184'
                }],
                min_v: '24381184'
            };
            androidInvoke('Bdbox_android_utils', 'command', [JSON.stringify(cmd)]);
        }

    } else {
        var suburl = host + '/webpage?action=icard&type=subscribe';
        var urlJSON = toJSON(window.location.href);
        if (urlJSON.channel && urlJSON.channel === 'wise_home') {
            suburl += '&channel=wise_home';
        }
        window.location.href = suburl;
    }
};
subProto.subscribe = function (data, callback, failCallback) {
    var self = this;
    var isNew = this.isNew;
    if (!data || typeof data !== 'object') {
        if (!data.type || !data.op_type || !data.third_id) {
            throw new Error('missing params');
        } else if (callback && typeof callback !== 'function') {
            throw new Error('callback must be a function');
        } else {
            throw new Error('params error');
        }
    }
    subLog.event('subComponents', 'interface', {
        isaladin: this.ops.isaladin ? '1' : '0',
        ua: this.ua,
        type: data.op_type,
        pos: 'subscribe',
        source: this.ops.type ? this.ops.type : 'others'
    });
    var loginAPI = extHost + '/api/subscribe/v1/relation/status?callback=?';
    var receiveData = {
        type: data.type,
        /* eslint-disable fecs-camelcase */
        op_type: data.op_type ? data.op_type : 'add',
        /* eslint-disable fecs-camelcase */
        third_id: data.third_id,
        sfrom: data.sfrom ? data.sfrom : 'sbox',
        source: data.source ? data.source : 'mysub_h5',
        store: (isNew || $Box.isLiteBox) ? 'uid_cuid' : 'uid',
        sid: data.sid ? data.sid : ''
    };
    if (data.ext && this.isPlainObject(data.ext)) {
        receiveData.ext = encodeURIComponent(JSON.stringify(data.ext));
    }
    var receiveAPI = extHost + '/api/subscribe/v1/relation/receive?callback=?&'
        + toQuery(receiveData);
    var loginCallback = function (login) {
        var suc = login.errno;
        var isLogin = login.data.isLogin;
        if (suc === 0) {
            if (!isLogin && !$Box.$isBox() && !$Box.isLiteBox) {
                failcb && failcb();
                window.location.href = 'http://wappass.baidu.com/passport/login?u=' + encodeURIComponent(window.location.href);
            } else if (!isLogin && $Box.$isBox() && !isNew) {
                // 版本小于8.0
                failcb && failcb();
                self.toLogin();
            } else {
                // server todo 简化接口流程
                loadjs({
                    url: receiveAPI,
                    success: receiveCallback,
                    error: failcb
                });
            }
        } else {
            failcb();
        }
    };
    var receiveCallback = function (sdata) {
        var suc = sdata.errno;
        if (suc === 0) {
            subLog.event('subComponents', 'interface', {
                isaladin: self.ops.isaladin ? '1' : '0',
                ua: self.ua,
                status: 'success',
                type: data.op_type,
                pos: 'subscribe',
                source: self.ops.type ? self.ops.type : 'others'
            });
            callback && callback(sdata);
        } else {
            failcb();
        }
    };
    var failcb = function () {
        if (failCallback) {
            failCallback();
        } else {
            self.toast({
                type: 'tips'
            });
        }

    };
    loadjs({
        url: loginAPI,
        success: loginCallback,
        error: failcb
    });
};
subProto.toLogin = function () {
    /**
     * 调起登录
     */
    subLog.event('subComponents', 'interface', {
        isaladin: this.ops.isaladin ? '1' : '0',
        ua: this.ua,
        pos: 'toLogin',
        source: this.ops.type ? this.ops.type : 'others'
    });
    if (!$Box.$isBox()) {
        window.location.href = 'http://wappass.baidu.com/passport/login?u=' + encodeURIComponent(window.location.href);
    } else if ($Box.$isBox()) {
        var instance = {
            target: '',
            params: {
                subpro: 'webpage_card',
                tpl: 'webpage_card'
            },
            callbackName: '',
            callback: function (res) {
                if (!res) {
                    location.reload(1);
                }
            },
            doLogin: function () {
                this.callbackName && delete window[this.callbackName];
                this.callbackName = '_LOGIN_CALLBACK_' + $Box.getId();
                window[this.callbackName] = this.callback;
                this.params.callback = 'window.' + this.callbackName;
                boxLogin(this.params);
            }
        };
        instance.doLogin();
    }
};
subProto.showDialog = function (text, data, callback, failCallback) {
    subLog.event('subComponents', 'interface', {
        isaladin: this.ops.isaladin ? '1' : '0',
        ua: this.ua,
        pos: 'showDialog',
        source: this.ops.type ? this.ops.type : 'others'
    });
    var self = this;
    var sText = '取消对【' + text + '】的关注后，将不再收到其更新的内容';
    this.$dialog.querySelector('.dialog-content').innerText = sText;
    document.body.appendChild(this.$dialog);
    // compute
    var $diaBtnLeft = this.$dialog.querySelector('.dialog-btn-cancel');
    var $diaBtnRight = this.$dialog.querySelector('.dialog-btn-confrim');
    var widbtn = $diaBtnLeft.offsetWidth;
    $diaBtnLeft.style.height = $diaBtnRight.style.height = widbtn * 0.314 + 'px';
    var $dom = this.$dialog.querySelector('.isub-dialog');
    this.removeClass(this.$dialog, 'dialog-hidden');
    this.removeClass($dom, 'dialog-hidden');

    // handler
    $diaBtnLeft.onclick = null;
    $diaBtnLeft.onclick = function () {
        subLog.event('subComponents', 'interface', {
            isaladin: self.ops.isaladin ? '1' : '0',
            ua: self.ua,
            pos: 'hideDialog',
            source: self.ops.type ? self.ops.type : 'others'
        });
        self.$dialog.parentNode.removeChild(self.$dialog);
    };
    $diaBtnRight.onclick = null;
    $diaBtnRight.onclick = function () {
        self.$dialog.parentNode.removeChild(self.$dialog);
        self.subscribe(data, callback, failCallback);
    };
};
subProto.getUa = function () {
    var ua = navigator.userAgent.toLowerCase();
    /* eslint-disable fecs-camelcase */
    /* eslint-disable fecs-camelcase _browsers*/
    var browsers = null;
    switch (!0) {
        case $Box.$isBox():
            browsers = 'bdbox';
            break;
        case /micromessenger/i.test(ua):
            browsers = 'wechat';
            break;
        case /baidubrowser/i.test(ua):
            browsers = 'baidubrowser';
            break;
        case /ucbrowser/i.test(ua):
            browsers = 'ucbrowser';
            break;
        default:
            browsers = 'others';
            break;
    }
    return browsers;
};

// classfunc
subProto.hasClass = function (obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};

subProto.addClass = function (obj, cls) {
    if (!this.hasClass(obj, cls)) {
        obj.className = this.trim(obj.className) + ' ' + cls;
    }
};

subProto.removeClass = function (obj, cls) {
    if (this.hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
};
subProto.trim = function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
};
subProto.isEmptyObject = function (obj) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
};
subProto.isPlainObject = function (obj) {
    var isjson = typeof(obj) === 'object'
        && Object.prototype.toString.call(obj).toLowerCase() === '[object object]'
        && !obj.length;
    return isjson;
};
module.exports = isub;

});;
BoxJS.define('BoxJS:bdbox/client/login', function(require, exports, module, $){
/* eslint-disable */

/**
 * 登录；
 * @memberOf Bdbox.client
 * @name login
 *
 */
var getVersion = require('BoxJS:bdbox/utils/getVersion');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var A_NAMESPACE = 'Bdbox_android_account';
var ios_invokeApp = require('BoxJS:bdbox/ios/invokeApp');
var android_invokeApp = require('BoxJS:bdbox/android/invokeApp');
var getLiteVersion = require('BoxJS:bdbox/utils/getLiteVersion');
var invokeLiteApp = require('BoxJS:bdbox/android/invokeLiteApp');

var self = function (options) {
    var defalutOpt = {
            callback: '',
            url: location.href,
            tpl: '',
            login_type: '',
            third_login: '0' /* 第三方登录6.5新增，支持1，不支持0 */
        };
    var attr;

    for (attr in defalutOpt) {
        if (!options.hasOwnProperty(attr)) {
            options[attr] = defalutOpt[attr];
        }
    }

    /* 5.5版本支持js调起native登录 */
    if (version_compare(getVersion(), '5.5') >= 0) {
        if ($.$isIOS()) {
            options.func = options.callback;
            delete options.callback;
            options = JSON.stringify(options);
            ios_invokeApp('account', {
                'action': 'logindialog',
                'params': encodeURIComponent(options),
                'minver': '5.5.0.0'
            });
        } else {
            android_invokeApp(A_NAMESPACE, 'loginDialog', [JSON.stringify(options), options.callback]);
        }
    }
    else if (version_compare(getLiteVersion(), 2.0) >= 0) {
        /* lite版兼容登录sdk，直接调起 */
        invokeLiteApp(A_NAMESPACE, 'loginDialog', [JSON.stringify(options), options.callback]);
    }
    else {
        /* 5.5以下版本跳转至baidu passport web页登录 不支持回调 */
        /* 添加支持短信登录 */
        var passurl = 'http://wappass.baidu.com/?adapter=1&regLink=1';
        if (options.login_type === 'sms') {
            passurl += '&sms=1';
        }
        if (options.subpro) {
            passurl += '&subpro=' + options.subpro;
        }
        if (options.tpl != '') {
            passurl += '&tpl=' + options.tpl;
        }
        window.location.href = passurl + '&u=' + encodeURIComponent(options.url);
    }
}
module.exports = self;

});;
module.exports = require('BoxJS:bdbox/subscribe/isub');
});;

            BoxJS.define('BoxJS:invoke/display/imageView', function(require, exports, module, $){
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');
/**
 * 落地页图片查看器
 * @param  {Array}    options  参数，详情http://invoker.baidu.com/invokers?id=547c3f49d2e36c6e22c23811
 * @param  {Function} callback 回调
 *
 * callback参数示例：
 * {
 *     errno: 1,
 *     errmsg: 'success',
 *     data: {}
 * }
 */
module.exports = function(params) {
    if (params && $.isObject(params.data)) {
        if ($.isIOS) {
            iosInvoke("utils", {
                action: 'image',
                params: encodeURIComponent(JSON.stringify(params.data))
            }, '');
        } else {
            var api = 'image';
            if(version_compare(getVersion(), '7.4') >= 0 || $.isLiteBox){
                api = 'lightImage';
            }
            androidInvoke('Bdbox_android_utils', api, [JSON.stringify(params.data), '']);
        }
    } else{
        console.log('参数不正确');
    }
};

});;
            BoxJS.define('BoxJS:invoke/display/toolBar', function(require, exports, module, $){
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');

function setData(data) {
    if (version_compare(getVersion(), '7.7') >= 0 || $.isLiteBox) {
        if ($.isAndroid) {
            androidInvoke("Bdbox_android_utils", "setToolBarIcons", [JSON.stringify(data)]);
        } else {
            iosInvoke("utils", {
                "action": "setToolBarIcons",
                "params": encodeURIComponent(JSON.stringify(data)),
                "minver": "7.7"
            }, "");
        }
    } else {
        console.log('版本不支持');
    }
}

function getData(callback, fail) {
    var callName = '__boxjs_utils_getToolBarIcons_' + $.getId();
    window[callName] = function(data) {
        var result;
        try {
            result = $.isString(data) ? JSON.parse(data) : data;
        } catch (e) {
            params.fail && params.fail('display.getToolBarIcons parse fail', data);
            return;
        }
        callback(result);
    };
    if ($.isAndroid && (version_compare(getVersion(), '8.3') >= 0 || $.isLiteBox)) {
        androidInvoke("Bdbox_android_utils", "getToolBarIcons", [callName]);
    } else if ($.isIOS && (version_compare(getVersion(), '8.2.3') >= 0 || $.isLiteBox)) {
        iosInvoke("utils", {
            "action": "getToolBarIcons",
            "minver": "8.2.3"
        }, callName);
    } else {
        params.fail && params.fail('版本不支持');
        console.log('版本不支持');
    }
}

module.exports = function(params) {
    switch (params.action) {
        case 'set':
            setData(params.data);
            break;
        case 'get':
            getData(params.success, params.fail);
            break;
    }
};

});;
            BoxJS.define('BoxJS:invoke/display/showCommentBox', function(require, exports, module, $){
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');
module.exports = function(params) {
    if (($.isBox && version_compare(getVersion(), '8.0') >= 0) || $.isLiteBox) {
        if (params && $.isObject(params.data)) {
            if(version_compare(getVersion(), '8.2') < 0 || $.isLiteBox){
                delete params.data.rename;
            }
            if(version_compare(getVersion(), '8.5') < 0 || $.isLiteBox){
                delete params.data.placeholder;
            }
            if ($.isAndroid) {
                androidInvoke('Bdbox_android_comment', 'showCommentBox', [JSON.stringify(params.data), '']);
            } else {
                iosInvoke('comment', {
                    'action': 'showCommentBox',
                    'params': encodeURIComponent(JSON.stringify(params.data)),
                    'minver': '8.0.0.0'
                }, '');
            }
        } else {
            console.log('参数不正确');
        }
    } else {
        console.log('display.showCommentBox 环境不正确');
    }
};

});;
            BoxJS.define('BoxJS:invoke/display/updateFavorInfo', function(require, exports, module, $){
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');
module.exports = function(params) {
    if(params && $.isObject(params.data)){
       if ($.isAndroid && (version_compare(getVersion(), '7.7') >= 0 || $.isLiteBox)) {
            androidInvoke('Bdbox_android_utils', 'updateCollectionStatus', [JSON.stringify(params.data)]);
        } else if ($.isIOS && (version_compare(getVersion(), '8.1') >= 0 || $.isLiteBox)) {
            iosInvoke("Common", {
                "action": "updateFavorInfo",
                "params": encodeURIComponent(JSON.stringify(params.data)),
                "minver": "8.1"
            }, "");
        }else{
            console.log('版本不支持');
        }
    }else{
        console.log('参数不正确');
    }
}

});;

            BoxJS.define('BoxJS:invoke/event/onFontChange', function(require, exports, module, $){
/**
 * @file onFontChange
 * @author wanghongliang02
 * 17/1/11
 */
/* eslint-disable */
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');

module.exports = function (params) {
    if ($.isObject(params) && $.isFunction(params.success)) {
        if (version_compare(getVersion(), '8.1') >= 0 || $.isLiteBox) {
            BoxJS.ready(function () {
                BoxJS.on('globalSettingChange', function (setting) {
                    var data;
                    try {
                        if (typeof setting === 'string') {
                            data = JSON.parse(setting);
                        }
                        else {
                            data = setting;
                        }
                    }
                    catch (e) {
                        data = {
                            errno: '0'
                        }
                    }

                    if (data.errno === '1') {
                        params.success(data.data.fontsize);
                    }
                    else {
                        params.success();
                    }
                })
            });
        }
    }
};
});;

            BoxJS.define('BoxJS:invoke/feed/getSessionClick', function(require, exports, module, $){
/* eslint-disable */
var invoke = require('BoxJS:bdbox/invoke/newInvoke');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');

module.exports = function(params) {
    if (($.isBox && version_compare(getVersion(), '8.4') >= 0) || $.isLiteBox) {
        function callback(data) {
            var result;
            try {
                result = $.isString(data) ? JSON.parse(data) : data;
            } catch (e) {
                params.fail && params.fail('feed.getSessionClick parse fail', data);
                return;
            }
            if (result && result.status == 0) {
                params.success && params.success(result.params);
            } else {
                params.fail && params.fail('feed.getSessionClick fail', result);
            }
        };
        //@todo 升级这块代码有点鸡肋，后续整理
        var data = {};
        if (params.upgrade !== undefined) {
            data.upgrade = params.upgrade;
        }
        invoke('v5/feed/session_click', data, callback);
    } else {
        params.fail && params.fail('手百8.4以上支持');
        console.log('手百8.4以上支持');
    }
};

});;
            BoxJS.define('BoxJS:invoke/feed/getPos', function(require, exports, module, $){
/**
 * @file getPos
 * @author wanghongliang02
 * 17/3/22
 */
/* eslint-disable */

var invoke = require('BoxJS:bdbox/invoke/newInvoke');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');

module.exports = function(params) {
    if (($.isBox && version_compare(getVersion(), '8.4') >= 0) || $.isLiteBox) {
        function callback(data) {
            var result;
            try {
                result = $.isString(data) ? JSON.parse(data) : data;
            } catch (e) {
                params.fail && params.fail('feed.getpos parse fail', data);
                return;
            }

            if (result && result.status == '0') {
                params.success && params.success(result.params.pos);
            } else {
                params.fail && params.fail('feed.getpos fail', result);
            }
        }
        //@todo 升级这块代码有点鸡肋，后续整理
        var data = {

        };
        if (params.upgrade !== undefined) {
            data.upgrade = params.upgrade;
        }
        if (params.data.nid !== undefined) {
            data.nid = params.data.nid;
        }
        var boxParams = JSON.stringify(data);
        if ($.isIOS) {
            boxParams = encodeURIComponent(boxParams);
        }
        invoke('v5/feed/getpos', {
            params: boxParams
        }, callback);
    } else {
        params.fail && params.fail('手百8.4以上支持');
        console.log('手百8.4以上支持');
    }
};


});;
            BoxJS.define('BoxJS:invoke/feed/linkage', function(require, exports, module, $){
/**
 * @file linkage
 * @author wanghongliang02
 * 17/3/22
 */
/* eslint-disable */

var invoke = require('BoxJS:bdbox/invoke/newInvoke');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');

module.exports = function (params) {
    if (($.isBox && version_compare(getVersion(), '8.4') >= 0) || $.isLiteBox) {
        function callback(data) {
            var result;
            try {
                result = $.isString(data) ? JSON.parse(data) : data;
            }
            catch (e) {
                params.fail && params.fail('feed.linkage parse fail', data);
                return;
            }
            params.success && params.success(result);
        }

        var data = params.data || {};
        var boxParams = JSON.stringify(data);
        if ($.isIOS) {
            boxParams = encodeURIComponent(boxParams);
        }
        invoke('v5/feed/linkage', {params: boxParams}, callback);
    }
    else {
        params.fail && params.fail('手百8.4以上支持');
        console.log('手百8.4以上支持');
    }
};


});;
            BoxJS.define('BoxJS:invoke/feed/pro', function(require, exports, module, $){
/**
 * @file pro
 * @author wanghongliang02
 * 17/3/22
 */
/* eslint-disable */

var linkage = require('BoxJS:invoke/feed/linkage');


module.exports = function (params) {
    if ($.isObject(params) && $.isFunction(params.success)) {
        var data = {
            upgrade: 1,
            type: 'pro'
        };
        data.action = params.data.action;
        data.nid = params.data.nid;
        if (params.data.status) {
            data.status = params.data.status;
        }
        if (params.data.count) {
            data.count = params.data.count;
        }

        var linkageData = {
            data: data
        };
        if (params.success) {
            linkageData.success = params.success;
        }
        linkage(linkageData);
    }
    else {
        console.log('error: 参数不正确');
    }

};


});;
            BoxJS.define('BoxJS:invoke/feed/report', function(require, exports, module, $){
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');

module.exports = function(params) {
    if (params && $.isObject(params.data)) {
        if(($.isBox && version_compare(getVersion(), '8.3') >= 0) || $.isLiteBox){
            if ($.isIOS) {
                iosInvoke('feed', {
                    action: 'report',
                    params: encodeURIComponent(JSON.stringify(params.data))
                }, '');
            } else {
                androidInvoke('Bdbox_android_utils', 'report', [JSON.stringify(params.data)]);
            }
            params.success && params.success();
        }else {
            params.fail && params.fail('版本不支持');
        }
    } else {
        console.log('参数错误');
    }

};


});;

            BoxJS.define('BoxJS:invoke/net/cache', function(require, exports, module, $){
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
/**
 * 存储数据
 * @param {String}   key      命名规则：
 * @param {String}   value    存储值
 * @param {Function} callback 回调
 *
 * callback参数示例：
 * {
 *     errno: 1,
 *     errmsg: 'success',
 * }
 */
function saveHandler(key, value, callback) {
    var params = {
        action: 'save',
        key: key,
        data: value
    };
    if ($.isBox) {
        var callName = '__boxjs_net_cache_save_' + $.getId();
        window[callName] = function(data) {};
        if ($.isIOS) {
            //IOS需要把数据转码，不然返回的JSON 数据会解析不了。
            // params.data = encodeURIComponent(params.data);
            params.data = escape(params.data);
            // window.localStorage.setItem('save', params.data);
            iosInvoke("net", {
                action: "cache",
                params: encodeURIComponent(JSON.stringify(params))
            }, callName);
        } else {
            androidInvoke('Bdbox_android_net', 'cache', [JSON.stringify(params), callName]);
        }
    }
}
/**
 * 读取存储数据
 * @param {String}   key      命名规则：
 * @param {*}        value    存储值
 * @param {Function} callback 回调
 *
 * callback参数示例：
 * {
 *     errno: 1,
 *     errmsg: 'success',
 *     data:存储值
 * }
 */
function readHandler(key, callback) {
    if (callback && $.isFunction(callback)) {
        var params = {
            action: 'read',
            key: key
        };
        if ($.isBox) {
            var callName = '__boxjs_net_cache_read_' + $.getId();
            window[callName] = function(data) {
                if ($.isIOS) {
                    // window.localStorage.setItem('read',data);
                    // callback(decodeURIComponent(JSON.parse(data).data));
                    callback(unescape(JSON.parse(data).data));
                } else {
                    callback(data.data);
                }
            };
            if ($.isIOS) {
                iosInvoke("net", {
                    action: "cache",
                    params: encodeURIComponent(JSON.stringify(params))
                }, callName);
            } else {
                androidInvoke('Bdbox_android_net', 'cache', [JSON.stringify(params), callName]);
            }
        }
    } else {
        console.log('error: callback is null or type is not function');
    }
}
/**
 * 删除存储数据
 * @param {String}   key      命名规则：
 * @param {Function} callback 回调
 *
 * callback参数示例：
 * {
 *     errno: 1,
 *     errmsg: 'success',
 * }
 */
function deleteHandler(key, callback) {
    var params = {
        action: 'delete',
        key: key
    };
    if ($.isBox) {
        var callName = '__boxjs_net_cache_delete_' + $.getId();
        window[callName] = function(data) {};
        if ($.isIOS) {
            iosInvoke("net", {
                action: "cache",
                params: encodeURIComponent(JSON.stringify(params))
            }, callName);
        } else {
            androidInvoke('Bdbox_android_net', 'cache', [JSON.stringify(params), callName]);
        }
    }
}

module.exports = function(params){
    switch(params.action){
        case 'save':
            saveHandler(params.data.key, params.data.value, params.success);
        break;
        case 'read':
            readHandler(params.data.key, params.success);
        break;
        case 'delete':
            deleteHandler(params.data.key, params.success);
        break;
    }
};
});;
            BoxJS.define('BoxJS:invoke/net/httpRequest', function(require, exports, module, $){
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');

/**
 * http请求
 * @param  {Object} params 参数
 * @param  {Function} success 回调函数
 *
 * params参数示例：
 * {
 *     url: '', //请求地址,必填。
 *     method: 'get', //请求类型get/post，默认get。
 *     data: {}, //post请求参数，method=post 时必填。
 *     cache: 1, //告知客户端是否缓存返回数据，0不缓存/1缓存，默认1。
 *     expires: '', //缓存时长，时间戳。
 *     refresh: 0, //是否强制刷新，是否使用本地缓存，0不使用/1使用，默认0。
 *     pu: 0, //是否携带公共参数，0不携带/1携带，默认0。
 *     header: {} //请求头部信息，要追加到 HTTP 请求的 HTTP 请求标头中。
 * }
 * success参数是字符串示例：
 * {
 *     errno: 1,
 *     errmsg: 'success',
 *     data: ‘’ //返回参数，字符串
 * }
 */
module.exports = function(params) {
    if (params && $.isObject(params.data)) {
        var data = {
            url: '',
            method: 'get',
            data: {},
            cache: 1,
            expires: '',
            refresh: 0,
            pu: 0,
            header: {}
        };
        for (var item in params.data){
            data[item] = params.data[item];
        }
        if (!(params.fail && $.isFunction(params.fail))) {
            params.fail = function () {};
        }
        if (params.success && $.isFunction(params.success)) {

            var callName = '__boxjs_net_httpRequest_' + $.getId();
            window[callName] = function(data) {
                var successData;
                if ($.isIOS) {
                    successData = JSON.parse(data);
                    if (version_compare(getVersion(), '8.2.3') >= 0 || $.isLiteBox) {
                        // todo 处理errorno
                        if (successData.errno != 1) {
                            params.fail(successData.errno);
                            return;
                        }
                    }
                    params.success(decodeURIComponent(successData.data));
                } else {
                    successData = data;
                    if (version_compare(getVersion(), '8.2') >= 0 || $.isLiteBox) {
                        // todo 处理errorno
                        if (successData.errno != 1) {
                            params.fail(successData.errno);
                            return;
                        }
                    }
                    params.success(successData.data);
                }

            };

            if ($.isIOS) {
                iosInvoke('net', {
                    action: 'request',
                    params: encodeURIComponent(JSON.stringify(data))
                }, callName);
            } else {
                androidInvoke('Bdbox_android_net', 'request', [JSON.stringify(data), callName]);
            }
        } else {
            console.log('error: success is null or type is not function');
        }
    } else {
        console.log('error: params is null or type is not Object');
        return;
    }
};

});;
            BoxJS.define('BoxJS:invoke/net/imageCache', function(require, exports, module, $){
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
/**
 * 让客户端缓存图片列表，每一张图片缓存成功后都回调一次。
 * @param  {Array}    imgList  需要缓存的图片列表
 * @param  {Function} callback 回调函数
 * @callback参数示例：
 * {
 *     errno: 1,
 *     errmsg: 'success',
 *     data: {
 *          url: ,图片源url地址
 *          localurl:图片缓存到本地的路径
 *     }
 * }
 */
module.exports = function(params) {
    if (params && params.data && $.isArray(params.data.imgList)) {
        if (params.success && $.isFunction(params.success)) {

            var callName = '__boxjs_net_imageCache_' + $.getId();
            window[callName] = function(data) {
                if ($.isIOS) {
                    params.success(JSON.parse(data));
                } else {
                    if(data && data.data && !data.data.localurl){
                        //errno 0失败，1成功。android 失败errno也是1，为了兼容。
                        data.errno = 0;
                    }
                    params.success(data);
                }
            };
            if ($.isIOS) {
                iosInvoke("net", {
                    action: 'imageCache',
                    params: encodeURIComponent(JSON.stringify({ list: params.data.imgList }))
                }, callName);
            } else {
                androidInvoke('Bdbox_android_net', 'imageCache', [JSON.stringify({ list: params.data.imgList }), callName]);
            }

        } else {
            console.log('error: params.success is null or type is not function');
        }
    } else {
        console.log('error: params.imgList is null or type is not Array');
        return;
    }
}

});;
            BoxJS.define('BoxJS:invoke/net/noNet', function(require, exports, module, $){
/* eslint-disable */
/**
 * 没有网络,出大wifi
 */
var andInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');


module.exports = function (params) {
    if ($.isObject(params) && $.isFunction(params.success)) {
        if ($.isBox || $.isLiteBox) {
            if ($.isAndroid) {
                if (version_compare(getVersion(), '8.2') >= 0 || $.isLiteBox) {
                    andInvoke('Bdbox_android_net', 'showNetWorkErrorView', []);
                    return;
                }
            } else if ($.isIOS) {
                if (version_compare(getVersion(), '8.2.3') >= 0 || $.isLiteBox) {
                    iosInvoke('net', {
                        'action': 'showNetWorkErrorView'
                    }, '');
                    return;
                }
            }
        }
        params.success();
    }

};


});;

            BoxJS.define('BoxJS:invoke/log/duration', function(require, exports, module, $){
/* eslint-disable */
var invoke = require('BoxJS:bdbox/invoke/newInvoke');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');

/**
 * 展现时长统计
 * @param  {Object} data 上报数据，具体参数参考：
 */
module.exports = function(params) {
    if (($.isBox && version_compare(getVersion(), '8.3') >= 0) || $.isLiteBox) {
        var data = { key: params.data.key };
        if (params.data.options) {
            data.options = params.data.options;
        }
        switch (params.action) {
            case 'appear':
                invoke('v4/ubc/duration/appear', {
                    params: encodeURIComponent(JSON.stringify(data))
                });
                break;
            case 'disappear':
                invoke('v4/ubc/duration/disappear', {
                    params: encodeURIComponent(JSON.stringify(data))
                });
                break;
        }
    }
};

});;
            BoxJS.define('BoxJS:invoke/log/getSpeedLogData', function(require, exports, module, $){
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');
/**
 * 获取速度优化端上打点信息
 * @param  {Object} data 上报数据，具体参数参考：
 */
var callbackId = '010103';
module.exports = function(params) {
    if (params && $.isFunction(params.success)) {
        var callName = '__boxjs_log_getSpeedLogData_' + $.getId();
        window[callName] = function(data) {
            if ($.isIOS) {
                params.success(JSON.parse(data)[callbackId]);
            } else {
                params.success(data[callbackId]);
            }
        };

        if ($.isIOS) {
            iosInvoke('feed', {
                action: 'getSpeedLogData'
            }, callName);
        } else {
            androidInvoke('Bdbox_android_feed', 'getSpeedLogData', [callName]);
        }
    } else {
        console.log('参数不正确');
    }
};

});;
            BoxJS.define('BoxJS:invoke/log/performanceFlowEvent', function(require, exports, module, $){
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');
/**
 * 性能统一上报
 * @param  {Object} data 上报数据，具体参数参考：
 * http://invoker.baidu.com/invokers?id=584f6f455a6289a04a43fa7a
 */
module.exports = function(params) {
    if (params && $.isObject(params.data)) {
        if(version_compare(getVersion(), '8.2') >= 0 || $.isLiteBox){
            if (params && $.isObject(params)) {
                if ($.isIOS) {
                    iosInvoke("utils", {
                        action: 'onPerformanceFlowEvent',
                        params: encodeURIComponent(JSON.stringify(params.data)),
                        minver: "8.2.0.0"
                    }, '');
                } else if ($.isAndroid) {
                    params.min_v = '16789504';
                    androidInvoke('Bdbox_android_utils', 'onPerformanceFlowEvent', [JSON.stringify(params.data)]);
                }
            } else {
                console.log('error: params is null or type is not Object');
                return;
            }
        }
    } else{
        console.log('参数不正确');
    }
};

});;
            BoxJS.define('BoxJS:invoke/log/reliableLog', function(require, exports, module, $){
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');
/**
 * 可靠性统一打点
 * @param  {Object} data 上报数据 字段
 * data.description    {String} 错误描述
 * data.message    {String} 错误数据
 *
 */
module.exports = function(params) {
    if(version_compare(getVersion(), '8.2') >= 0 || $.isLiteBox){
        if (params && $.isObject(params.data)) {
            if ($.isIOS) {
                iosInvoke("utils", {
                    action: 'onReliableLog',
                    params: encodeURIComponent(JSON.stringify(params.data)),
                    minver: "8.2.0.0"
                }, '');
            } else if ($.isAndroid) {
                params.min_v = '16789504';
                androidInvoke('Bdbox_android_utils', 'onReliableLog', [JSON.stringify(params.data)]);
            }
        } else {
            console.log('参数不正确');
            return;
        }
    }else{
        console.log('版本不正确');
    }
};

});;
            BoxJS.define('BoxJS:invoke/log/pblog', function(require, exports, module, $){
/**
 * @file pblog
 * @author wanghongliang02
 * 17/1/3
 */
/* eslint-disable */
var pblog = require('BoxJS:bdbox/monitor/pblog');
module.exports = function (params) {
    if (params && params.data) {
        pblog(params.data.type, params.data.args || []);
    }
};

});;
            BoxJS.define('BoxJS:invoke/log/ubcReport', function(require, exports, module, $){
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');
/**
 * UBC上报统计
 * @param  {Object} params 上报数据，具体参数参考：
 * http://invoker.baidu.com/invokers?id=56fa3bd329c7a9e44394f913
 */
module.exports = function(params) {
    if (params && $.isObject(params.data)) {
        if ($.isIOS) {
            iosInvoke("utils", {
                action: 'ubcReport',
                params: encodeURIComponent(JSON.stringify(params.data)),
                minver: "7.3.0.0"
            }, '');
        } else if ($.isAndroid) {
            params.min_v = '16789504';
            androidInvoke('Bdbox_android_utils', 'ubcEvent', [JSON.stringify(params.data)]);
        }
    } else {
        console.log('参数不正确');
        return;
    }
};

});;

            BoxJS.define('BoxJS:invoke/utils/getABTestInfo', function(require, exports, module, $){
/**
 * @file getABTestSidList
 * @author wanghongliang02
 * 17/1/3
 */
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
module.exports = function(params) {
    if ($.isObject(params) && $.isFunction(params.success)) {
        if ($.isBox) {
            var callName = '__boxjs_utils_getABTestInfo_' + $.getId();
            window[callName] = function(data) {
                try {
                    if ($.isIOS) {
                        params.success(JSON.parse(data).data);
                    } else {
                        params.success(data.data);
                    }
                }
                catch (e) {
                    if (params.fail && $.isFunction(params.fail)) {
                        params.fail();
                    }
                    else {
                        params.success();
                    }
                }
            };

            if ($.isIOS) {
                iosInvoke("utils", {
                    action: 'getABTestInfo'
                }, callName);
            } else {
                androidInvoke('Bdbox_android_utils', 'getABTestInfo', [callName]);
            }
        }else{
            params.success && params.success('');
        }
    } else {
        console.log('error: callback is null or type is not function');
    }
};

});;
            BoxJS.define('BoxJS:invoke/utils/getABTestSidList', function(require, exports, module, $){
/**
 * @file getABTestSidList
 * @author wanghongliang02
 * 17/1/3
 */
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
module.exports = function(params) {
    if ($.isObject(params) && $.isFunction(params.success)) {
        if ($.isBox) {
            var callName = '__boxjs_utils_getABTestSidList_' + $.getId();
            window[callName] = function(data) {
                var sidData;
                var sid = '';
                try {
                    if ($.isIOS) {
                        sidData = JSON.parse(data).data;
                    } else {
                        sidData = data.data;
                    }
                    if (sidData && sidData.length > 0) {
                        var sidList = [];
                        for (var i in sidData) {
                            sidList.push(sidData[i][0] + '_' + sidData[i][1]);
                        }
                        sid = sidList.join('-');
                    }
                    params.success(sid);
                }
                catch (e) {
                    if (params.fail && $.isFunction(params.fail)) {
                        params.fail(sid);
                    }
                    else {
                        params.success(sid);
                    }
                }
            };

            if ($.isIOS) {
                iosInvoke("utils", {
                    action: 'getABTestSidList'
                }, callName);
            } else {
                androidInvoke('Bdbox_android_utils', 'getABTestSidList', [callName]);
            }
        }
        else {
            params.success('');
        }

    } else {
        console.log('error: callback is null or type is not function');
    }
};

});;
            BoxJS.define('BoxJS:invoke/utils/getCuid', function(require, exports, module, $){
/**
 * @file getCuid
 * @author wanghongliang02
 * 17/1/3
 */
/* eslint-disable */
var getCuid = require('BoxJS:bdbox/client/getCuid');
module.exports = function (params) {
    if ($.isObject(params) && $.isFunction(params.success)) {
        getCuid(params.success);
    }
};


});;
            BoxJS.define('BoxJS:invoke/utils/getDeviceInfo', function(require, exports, module, $){
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
/**
 * 获取设备信息
 * @param  {Array}    keys     获取属性列表
 * @param  {Function} params.success 回调
 *
 * params.success参数示例：
 * {
 *     errno: 1,
 *     errmsg: 'success',
 *     data: {
 *         netInfo: {
 *             connected: 1
 *             },
 *         screenInfo: {
 *             width: 320,
 *             height: 640,
 *             density: 1,
 *             dpi: 120
 *         }
 *     }
 * }
 */
module.exports = function(params) {
    if (params && $.isObject(params.data) && $.isArray(params.data.keys) && $.isFunction(params.success)) {
        var callName = '__boxjs_utils_getDeviceInfo_' + $.getId();
        window[callName] = function(data) {
            if ($.isIOS) {
                params.success(JSON.parse(data));
            } else {
                params.success(data);
            }
        };

        if ($.isIOS) {
            iosInvoke("utils", {
                action: 'getDeviceInfo',
                params: encodeURIComponent(JSON.stringify({ keys: params.data.keys }))
            }, callName);
        } else {
            androidInvoke('Bdbox_android_utils', 'getDeviceInfo', [JSON.stringify({ keys: params.data.keys }), callName]);
        }
    } else {
        console.log('error: 参数不正确');
    }
}

});;
            BoxJS.define('BoxJS:invoke/utils/getLocation', function(require, exports, module, $){
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');

var wifiKys = ['1_0', 'Wifi'];
module.exports = function(params) {
    if ($.isObject(params) && $.isFunction(params.success)) {
        var callName = '__boxjs_utils_location_' + $.getId();
        window[callName] = function(data) {
            data = JSON.parse(data);
            if ($.isIOS){
                callbackData = data.coords;
            } else {
                callbackData = data;
            }
            params.success(callbackData);
        };

        if ($.isIOS) {
            iosInvoke('utils', {
                action: 'getCurrentLocation',
                params: JSON.stringify({ coor_type: 'gcj02' }),
                minver: '6.0.0.0'
            }, callName);
        } else {
            androidInvoke('Bdbox_android_utils', 'location', [JSON.stringify({ coor_type: 'gcj02' }), callName]);
        }
    } else {
        console.log('error: getLocation参数不正确');
    }
};
});;
            BoxJS.define('BoxJS:invoke/utils/getNetwork', function(require, exports, module, $){
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
var getDeviceInfo = require('BoxJS:invoke/utils/getDeviceInfo');

var wifiKys = ['1_0', 'Wifi'];
module.exports = function(params) {
    if ($.isObject(params) && $.isFunction(params.success)) {
        getDeviceInfo({
            data:{keys:['netInfo']},
            success: function (data){
                var str = 'unkown';
                if(data && data.errno == 1){
                    try{
                        if(~wifiKys.indexOf(data.data.netInfo.network)){
                            str = 'wifi';
                        }
                    }catch(e){}
                }
                params.success(str);
            }
        });
    } else {
        console.log('error: 参数不正确');
    }

};
});;
            BoxJS.define('BoxJS:invoke/utils/hideLoading', function(require, exports, module, $){
/* eslint-disable */
/**
 * 完成进度条
 * @memberOf Bdbox.client
 * @name progress
 * @author wangyongqing01
 * @version $Id: progress.js 286585 2016-03-15 11:57:15Z wangyongqing01 $
 */
var andInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
var version_compare = require('BoxJS:bdbox/utils/version_compare');
var getVersion = require('BoxJS:bdbox/utils/getVersion');

module.exports = function () {
    if($.isBox || $.isLiteBox){
        if ($.isAndroid) {
            andInvoke('bd_searchbox_interface', 'progressCompleted', []);
            // android 8.2+,android端增加了一个前端结束loading的逻辑,针对hybrid
            if (version_compare(getVersion(), '8.2') >= 0) {
                andInvoke('Bdbox_android_net', 'hideLoadingView', []);
            }
        } else if ($.isIOS) {
            iosInvoke('speedProgressCompleted', {
                'minver': '5.1.0.0'
            }, '');
        }
    }
}

});;
            BoxJS.define('BoxJS:invoke/utils/login', function(require, exports, module, $){
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
module.exports = function (params) {
	var defalutOpt = {
            url: location.href,
            tpl: '',
            login_type: '',
            third_login: '0' /*第三方登录6.5新增，支持1，不支持0*/
        },
        attr;

    for (attr in defalutOpt) {
        if (!params.data.hasOwnProperty(attr)) {
            params.data[attr] = defalutOpt[attr];
        }
    }
	var callName = '__boxjs_utils_login_' + $.getId();
    window[callName] = function(data) {
        if ($.isIOS) {
            params.success();
        } else {
            params.success(data.data);
        }
    };
	if ($.isIOS) {
        iosInvoke("account", {
            "action": "logindialog",
            "params": encodeURIComponent(JSON.stringify(params.data)),
            "minver": "5.5.0.0"
        }, callName);

    } else {
        androidInvoke('Bdbox_android_account', 'loginDialog', [JSON.stringify(params.data), callName]);
    }
};
});;
            BoxJS.define('BoxJS:invoke/utils/getGlobalSettings', function(require, exports, module, $){
/**
 * @file getGloabalSettings
 * @author wanghongliang02
 * 17/1/11
 */
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');

function getGlobalSettings(params) {
    if ($.isObject(params) && $.isFunction(params.success)) {
        var callName = '';
        if ($.isBox || $.isLiteBox) {
            // callName = '__box_utils_webStorage_get_';
            callName = '__box_utils_webStorage_get_global_' + $.getId();
            window[callName] = function(data) {
                if ($.isIOS) {
                    params.success(JSON.parse(data));
                } else {
                    params.success(data);
                }
            };
            if ($.isIOS) {
                iosInvoke('utils', {
                    action: 'getGlobalSettings'
                }, callName);
            } else {
                androidInvoke('Bdbox_android_utils', 'getGlobalSettings', callName);
            }
        }
    } else {
        console.log('error: callback is null or type is not function');
    }
}

module.exports = getGlobalSettings;

});;
            BoxJS.define('BoxJS:invoke/utils/toast', function(require, exports, module, $){
/**
 * @file toast
 * @author wanghongliang02
 * 17/1/12
 */
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');
module.exports = function (params) {
    if (params && params.data && params.data.str) {
        var str = params.data.str;

        if ($.isIOS) {
            iosInvoke("utils", {
                "action": "toast",
                "string": encodeURIComponent(str),
                "minver": "6.0.0.0"
            }, '');
        } else {
            androidInvoke('Bdbox_android_utils', 'toast', [str]);
        }
    }
};
});;
            BoxJS.define('BoxJS:invoke/utils/command', function(require, exports, module, $){
/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
function schemaIOS(schemaURL) {
    var $node = document.createElement('iframe');
    $node.style.display = 'none';
    $node.src = schemaURL;
    var body = document.body || document.getElementsByTagName('body')[0];
    body.appendChild($node);
    // 销毁 iframe
    setTimeout(function() {
        body.removeChild($node);
        $node = null;
    }, 0);
}
module.exports = function(params) {
    if (params && $.isObject(params.data)) {
        if ($.isBox || $.isLiteBox) {
            if ($.isIOS) {
                schemaIOS(params.data.cmd);
            } else {
                androidInvoke('Bdbox_android_utils', 'command', [params.data.cmd]);
            }
        }
    }else{
        console.log('参数错误');
    }
};

});;
            BoxJS.define('BoxJS:invoke/utils/o2o', function(require, exports, module, $){
/* eslint-disable */
var o2o = require('BoxJS:bdbox/client/o2o');
module.exports = function(params) {
    if (params && $.isObject(params.data) && params.data.url) {
        o2o(params.data.url, params.data.params);
    }else{
        console.log('参数错误');
    }
};

});;

            BoxJS.define('BoxJS:invoke/hybrid/getContext', function(require, exports, module, $){
/**
 * @file getContext
 * @author wanghongliang02
 * 17/1/4
 */
/* eslint-disable */

var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');

module.exports = function(params) {
    if ($.isObject(params) && $.isFunction(params.success)) {
        var callName = '__boxjs_hybrid_getContextInfo_' + $.getId();
        window[callName] = function(data) {
            if ($.isIOS) {
                params.success(JSON.parse(data).data);
            } else {
                params.success(data.data);
            }
        };

        if ($.isIOS) {
            iosInvoke('feed', {
                action: 'getContextInfo'
            }, callName);
        } else {
            androidInvoke('Bdbox_android_feed', 'getContextInfo', [callName]);
        }
    } else {
        console.log('error: callback is null or type is not function');
    }

};


});;

            BoxJS.define('BoxJS:invoke/video/invokePlayer', function(require, exports, module, $){
/**
 * @file invokePlayer
 * @author wangjianyu
 * 17/1/6
 */

/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');

module.exports = function(params) {
    if (params && $.isObject(params.data)) {
        if ($.isIOS) {
            iosInvoke(
                'video',
                {
                    action: 'invokePlayer',
                    params: encodeURIComponent(JSON.stringify(params.data)),
                    minver: '7.3.0.0'
                },
                ''
            );
        } else {
            androidInvoke(
                'Bdbox_android_capi_video',
                'invokePlayer',
                [JSON.stringify(params.data)]
            );
        }
    } else {
        console.log('error: 参数不正确');
    }
}

});;
            BoxJS.define('BoxJS:invoke/video/pauseVideo', function(require, exports, module, $){
/**
 * @file pauseVideo
 * @author wangjianyu
 * 17/1/6
 */

/* eslint-disable */
var androidInvoke = require('BoxJS:bdbox/android/invokeApp');
var iosInvoke = require('BoxJS:bdbox/ios/invokeApp');

module.exports = function(params) {
    if ($.isIOS) {
        iosInvoke(
            'video',
            {
                action: 'pauseVideo',
                minver: '7.3.0.0'
            },
            ''
        );
    } else {
        androidInvoke(
            'Bdbox_android_capi_video',
            'pauseVideo'
        );
    }
}

});;
            //@Todo 想对外保持同一个接口，暂时关闭
            // injectReady.ready(function(){
            configReady.complete();
            opt.success && opt.success({ errno: 0 });
            // });
        } else {
            fn({ errno: 1, msg: '找不到' + opt.id + '定义' });
            console.log('找不到' + opt.id + '定义');
        }
    }
    /**
     * 端能力
     * @param  {[type]} id     [description]
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
$.invoke = function(id, params) {
    var args = Array.prototype.slice.call(arguments);
    var id = args.shift().replace(/\./g, '/');
    configReady.ready(function() {
        var module = require(DEFAULT_NS + 'invoke/' + id);
        module(params);
    });
};
/**
 * UI组件
 * @param  {[type]}   id [description]
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
$.ui = function(id, fn) {
    var ids = [];
    ids = ids.concat(id);
    for (var i = 0; i < ids.length; i++) {
        ids[i] = 'ui/' + ids[i] + '/index';
    }
    $.use(ids, fn);
};

$.use = function(id, fn) {
    var ids = [];
    ids = ids.concat(id);
    configReady.ready(function() {
        var fnArgs = [];
        for (var i = 0; i < ids.length; i++) {
            fnArgs.push(require(DEFAULT_NS + ids[i].replace(/\./g, '/')));
        }
        fn.apply(this, fnArgs);
    });
};

}();
