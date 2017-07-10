var videoList = [
    {
        id: '8704195909973021667',
        poster: 'http://pic.rmb.bdstatic.com/mda-hc3ysacvgnsg4zqj.jpg',
        src: 'https://ss0.bdstatic.com/-b1Caiqa0d9Bmcmop9aC2jh9h2w8e4_h7sED0YQ_t9iCPK/mda-hc3ysacvgnsg4zqj/hd/mda-hc3ysacvgnsg4zqj.mp4?playlist=%5B%22hd%22%5D&auth_key=1497689669-0-0-c671c9a25146624bdb0a40668b8a9a88&bcevod_channel=searchbox_feed'
    },
    {
        id: '12653024706116713870',
        poster: 'https://ss0.bdstatic.com/9bA1vGfa2gU2pMbfm9GUKT-w/timg?searchbox_feed&quality=100&wh_rate=0&size=b800_1000&ref=http%3A%2F%2Fwww.baidu.com&sec=0&di=2f36eb2d343c14ee4e203aed8b20835d&src=http%3A%2F%2Fb.bdstatic.com%2Fsearchbox%2Ffile%2Fstar%2F20170620%2F1497925866194925.png',
        src: 'https://vd1.bdstatic.com/mda-hfvebxr9fw53wuyc/mda-hfvebxr9fw53wuyc.mp4?playlist=%5B%22hd%22%5D&auth_key=1497938875-0-0-5bc7b21f76077c65825e93ec17034a40&bcevod_channel=searchbox_feed'
    },
    {
        id: '11324487133180799594',
        poster: 'http://vd1.bdstatic.com/mda-hdewiv13quzsqyj7/mda-hdewiv13quzsqyj7.jpg',
        src: 'https://vd1.bdstatic.com/mda-hdewiv13quzsqyj7/hd/mda-hdewiv13quzsqyj7.mp4?playlist=%5B%22hd%22%2C%22sc%22%5D&auth_key=1497689426-0-0-5cfd8fcfa3e62a37e94e6b6def4fa28d&bcevod_channel=searchbox_feed'
    },
    {
        id: '4605177881513504166',
        poster: 'https://ss0.bdstatic.com/9bA1vGfa2gU2pMbfm9GUKT-w/timg?searchbox_feed&quality=100&wh_rate=0&size=b800_1000&ref=http%3A%2F%2Fwww.baidu.com&sec=0&di=99c1eb35b8f27fe5e6faf64c15caa07e&src=http%3A%2F%2Fbos.nj.bpc.baidu.com%2Fv1%2Fmediaspot%2Fd2b9b132a3daeb032103a7afdb9b5555.jpeg',
        src: 'https://vd1.bdstatic.com/mda-hffgtxaifywk5eaj/mda-hffgtxaifywk5eaj.mp4?auth_key=1497689535-0-0-7ff9fa11c651afd0de7ad9db5ec7a9c1&bcevod_channel=searchbox_feed'
    },
    {
        id: '14400512106424409164',
        poster: 'https://ss0.bdstatic.com/9bA1vGfa2gU2pMbfm9GUKT-w/timg?searchbox_feed&quality=100&wh_rate=0&size=b800_1000&ref=http%3A%2F%2Fwww.baidu.com&sec=0&di=f2e129e8e88ea6a765b544482013f97c&src=http%3A%2F%2Fbos.nj.bpc.baidu.com%2Fv1%2Fmediaspot%2F280e1ee579cd2d56517b729ed3fa7719.jpeg',
        src: 'https://vd1.bdstatic.com/mda-heymq7qgar7r6yhh/hd/mda-heymq7qgar7r6yhh.mp4?playlist=%5B%22hd%22%5D&auth_key=1497689582-0-0-7d4e2588574c13060ce5c31f788223ff&bcevod_channel=searchbox_feed'
    },
    {
        id: '14725699043277195038',
        poster: 'https://ss0.bdstatic.com/9bA1vGfa2gU2pMbfm9GUKT-w/timg?searchbox_feed&quality=100&wh_rate=0&size=b800_1000&ref=http%3A%2F%2Fwww.baidu.com&sec=0&di=a44d1255959cf4b95f42973e58e1d929&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2Fe8228351fc28b9cf3fc303bb655f6373.jpg',
        src: 'https://vd1.bdstatic.com/mda-hdvwmku1dxxic1g1/hd/mda-hdvwmku1dxxic1g1.mp4?playlist=%5B%22hd%22%2C%22sc%22%5D&auth_key=1497689626-0-0-45f57860787dfb5415c8245ebff66588&bcevod_channel=searchbox_feed'
    }
];

$(document).ready(function() {

    $('.c-album-item').click(function(e) {
        e.preventDefault();

        if ($(this).find('.album-current').hasClass('hide')) {

            $('.album-current').each(function() {

                if ($(this).hasClass('show')) {
                    $('.album-current').removeClass('show').addClass('hide');
                }
            });

            $(this).find('.album-current').removeClass('hide').addClass('show');

            var index = $(this).data('num') - 1;
            var videoData = videoList[index % 5];

            $('video')[0].src = videoData.src;
            $('video')[0].poster = videoData.poster;

            postMessage.post({
                actionType: 'shareUrl',
                actionParams: videoData.id
            });
        }
    });

    $('.c-tab-item').click(function(e) {
        e.preventDefault();

        var index = $(this).index();

        if ($('.m-album-num').eq(index).hasClass('hide')) {

            $('.c-tab-item').removeClass('selected');
            $(this).addClass('selected');

            $('.m-album-num').removeClass('hide');
            $('.m-album-num').addClass('hide');
            $('.m-album-num').eq(index).removeClass('hide');

            var height = '';

            if ($('.m-album-num').eq(index).children().length > 5) {

                height = $('body').height();
            }
            else {
                height = $('body').height();
            }

            postMessage.post({
                actionType: 'wrapCss',
                actionParams: {'height': height}
            });
        }
    });
});
