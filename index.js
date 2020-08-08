console.clear();

// 스토어 js
var storeWithExpiration = {
    set: function (key, val, exp) {
        store.set(key, {
            val: val,
            exp: exp,
            time: new Date().getTime()
        });
    },
    get: function (key) {
        var info = store.get(key);
        if (!info) {
            return null;
        }
        if (new Date().getTime() - info.time > info.exp) {
            return null;
        }
        return info.val;
    }
};

// 공유자원 시작
var $html = $('html');
// 공유자원 끝

// 이벤트 슬라이더 시작
function EventSlider__init() {
    $('.event-slider-box > .slider-1').slick({
        dots: true,
        arrows: false,
        customPaging: function (slider, i) {
            return $(slider.$slides[i]).find('.page').html();
        }
    });
}

EventSlider__init();
// 이벤트 슬라이더 끝

// 배너 슬라이더 시작
function BannerSlider__init() {
    $('.banner-slider-box > .slider-1').slick({
        dots: true,
        arrows: false
    });
}

BannerSlider__init();
// 배너 슬라이더 끝

// 사이드바 시작

// 사이드바 보이게 하기
function SideBar__show() {
    $html.addClass('side-bar-actived');
}
// 사이드바 끄기
function SideBar__hide() {
    $html.removeClass('side-bar-actived');
}

// 사이드바 초기화
function SideBar__init() {
    $('.btn-toggle-side-bar').click(SideBar__show);
    $('.btn-hide-side-bar, .side-bar-bg').click(SideBar__hide);

    $('.side-bar > .body > ul > li').click(function () {
        var $this = $(this);
        var $ul = $this.find(' > ul');
        $ul.slideToggle();

        // 나의 형제들을 모두 모으고, 그 녀석들에게 이야기 한다. `너의 자식인 ul을 안보이게 해!`
        $this.siblings().find(' > ul').slideUp();
    });

    // 부모에 걸린 이벤트가 실행되지 않게 하기 위한 코등
    $('.side-bar > .body > ul > li > ul').click(function (e) {
        e.stopPropagation();
    });

    // 이렇게 해야 slideToggle 할때, flex와 none을 오간다.
    $('.side-bar > .body > ul > li > ul').css('display', 'flex');
    $('.side-bar > .body > ul > li > ul').slideToggle(0);
}

SideBar__init();
// 사이드바 끝

// 빠른상담바 시작 
function FastInquiryBar__init() {
    $('.fast-inquiry-bar > .head > .btn-toggle').click(function () {
        var has = $('html').hasClass('fast-inquiry-bar-actived');
        if (has) {
            FastInquiryBar__hide();
        } else {
            FastInquiryBar__show();
        }
    });
}

function FastInquiryBar__show() {
    $('html').addClass('fast-inquiry-bar-actived');
}

function FastInquiryBar__hide() {
    $('html').removeClass('fast-inquiry-bar-actived');
}

FastInquiryBar__init();
// 빠른상담바 끝

// 팝업1 시작
var Popup1__preventShow = storeWithExpiration.get('Popup1__preventShow');

function Popup1__show() {
    if (Popup1__preventShow) {
        return;
    }
    $html.addClass('popup-1-actived');
}

function Popup1__hide() {
    $html.removeClass('popup-1-actived');
}

function Popup1__hideForAWhile() {
    Popup1__hide();
    var duration = 60 * 60 * 24;
    storeWithExpiration.set('Popup1__preventShow', true, duration * 1000);
}

function Popup1__init() {
    $('.popup-1 > .box > .footer > .btn-close').click(Popup1__hide);
    $('.popup-1 > .box > .footer > .btn-close-for-a-while').click(Popup1__hideForAWhile);
}

Popup1__init();
Popup1__show();
// 팝업1 끝
