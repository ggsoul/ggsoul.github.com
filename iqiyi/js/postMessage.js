var videoInfo = {
    "id":"8704195909973021667",
    "commentVersion":"2017244180",
    "dtid":"",
    "title":"《加勒比海盗5》最新幕后精彩预告，杰克船长如何改变厄运",
    "poster":"http://pic.rmb.bdstatic.com/mda-hc3ysacvgnsg4zqj.jpg",
    "source_from":"trans",
    "locid":"http://www.internal.video.baidu.com/2f1c1c1c29d346b65cba8b6d95271166.html",
    "comment_id":"",
    "shareInfo":{
        "mediaType":"all",
        "title":"《加勒比海盗5》最新幕后精彩预告，杰克船长如何改变厄运","content":"好看的视频,打开看看吧！",
        "type":"url",
        "source":"baidumedia",
        "linkUrl":"https://sv.baidu.com/videoui/page/videoland?isBdboxShare=1&context=%7B%22nid%22%3A%22sv_8704195909973021667%22%7D&pd=share",
        "iconUrl":"http://pic.rmb.bdstatic.com/mda-hc3ysacvgnsg4zqj.jpg",
        "categoryInfo":{"nid":"sv_8704195909973021667"}
    }
};


var postMessage = {
    msgTimer: {},
    flag: "bdvideo",
    source: "aqiyi",

    init: function() {

        this.post({
            actionType: 'connect'
        }, true);

        this.bindEvent()
    },
    bindEvent: function() {
        var that = this;

        window.addEventListener("message", function(e) {
            var data = e.data || {};
            if (data.flag === that.flag) {

                if (data.actionType === 'connect') {
                    that.post({
                        actionType: ['wrapCss', 'shareUrl'],
                        actionParams: {
                            wrapCss: {'padding-top': '111%'},
                            shareUrl: videoInfo
                        }
                    });
                }

                window.clearTimeout(that.msgTimer[data.msgId]);
                delete that.msgTimer[data.msgId]
            }
        });
    },
    isSupportedPostMsg: function() {
        return window.parent && window.parent.postMessage
    },
    getMsgId: function() {
        return + new Date + "" + Math.round(Math.random() * 1000)
    },
    post: function(params, cycle) {
        if (!this.isSupportedPostMsg()) {
            return
        }
        var that = this;
        var msgId = this.getMsgId();
        params = params || {};
        params.flag = that.flag;
        params.source = that.source;
        params.msgId = msgId;

        window.parent.postMessage(params, "*");

        if (cycle) {
            this.msgTimer[msgId] = window.setInterval(function() {
                params.resend = params.resend ? params.resend++ : 1;
                window.parent.postMessage(params, "*")
            }, 1000);
        }
        else {
            this.msgTimer[msgId] = window.setTimeout(function() {
                params.resend = 1;
                window.parent.postMessage(params, "*")
            }, 1000);
        }

    }
};
postMessage.init();
