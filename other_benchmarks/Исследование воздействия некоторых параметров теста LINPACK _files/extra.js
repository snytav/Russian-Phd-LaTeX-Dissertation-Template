(function(d){

    var pageData = {
        url: window.location.href,
        ref: d.referrer,
        title: d.title
    };

    (function(f,k,q){function m(c,h,b){c.addEventListener?c.addEventListener(h,b,!1):c.attachEvent("on"+h,b)}function l(c){if(!n){c=c||0;var h=k.getElementsByTagName("body");if(h&&h[0]){var h=h[0],b=k.createElement("img");b.src="//"+q+"/widgets/v1/notify?rnd\x3d"+Math.random()+"\x26t\x3d"+c;c=b.style;c.display="block";c.position="absolute";c.top="0";c.left="-100px";c.width="1px";c.height="1px";c.border="none";h.appendChild(b);n=!0}}}function r(){var c=setInterval(function(){f.console&&f.console.firebug&&
(l(1),clearInterval(c))},2E3)}function p(){var c=f.outerHeight-f.innerHeight;m(f,"resize",function(h){100<f.outerHeight-f.innerHeight-c&&l(2)})}function s(){m(k,"keydown",function(c){c=c||f.event;var h;c.keyCode?h=c.keyCode:c.which&&(h=c.which);123===h&&l(4)})}function t(){var c=function(){function c(e){function g(a){return(a=e.match(a))&&1<a.length&&a[1]||""}var f=g(/(ipod|iphone|ipad)/i).toLowerCase(),h=!/like android/i.test(e)&&/android/i.test(e),d=g(/version\/(\d+(\.\d+)?)/i),k=/tablet/i.test(e),
l=!k&&/[^-]mobi/i.test(e),a;/opera|opr/i.test(e)?a={name:"Opera",opera:b,version:d||g(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)}:/windows phone/i.test(e)?a={name:"Windows Phone",windowsphone:b,msie:b,version:g(/iemobile\/(\d+(\.\d+)?)/i)}:/msie|trident/i.test(e)?a={name:"Internet Explorer",msie:b,version:g(/(?:msie |rv:)(\d+(\.\d+)?)/i)}:/chrome|crios|crmo/i.test(e)?a={name:"Chrome",chrome:b,version:g(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:f?(a={name:"iphone"==f?"iPhone":"ipad"==f?"iPad":"iPod"},d&&
(a.version=d)):/sailfish/i.test(e)?a={name:"Sailfish",sailfish:b,version:g(/sailfish\s?browser\/(\d+(\.\d+)?)/i)}:/seamonkey\//i.test(e)?a={name:"SeaMonkey",seamonkey:b,version:g(/seamonkey\/(\d+(\.\d+)?)/i)}:/firefox|iceweasel/i.test(e)?(a={name:"Firefox",firefox:b,version:g(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)},/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(e)&&(a.firefoxos=b)):/silk/i.test(e)?a={name:"Amazon Silk",silk:b,version:g(/silk\/(\d+(\.\d+)?)/i)}:h?a={name:"Android",version:d}:/phantom/i.test(e)?
a={name:"PhantomJS",phantom:b,version:g(/phantomjs\/(\d+(\.\d+)?)/i)}:/blackberry|\bbb\d+/i.test(e)||/rim\stablet/i.test(e)?a={name:"BlackBerry",blackberry:b,version:d||g(/blackberry[\d]+\/(\d+(\.\d+)?)/i)}:/(web|hpw)os/i.test(e)?(a={name:"WebOS",webos:b,version:d||g(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)},/touchpad\//i.test(e)&&(a.touchpad=b)):/bada/i.test(e)?a={name:"Bada",bada:b,version:g(/dolfin\/(\d+(\.\d+)?)/i)}:/tizen/i.test(e)?a={name:"Tizen",tizen:b,version:g(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i)||
d}:/safari/i.test(e)?a={name:"Safari",safari:b,version:d}:a={};/(apple)?webkit/i.test(e)?(a.name=a.name||"Webkit",a.webkit=b,!a.version&&d&&(a.version=d)):!a.opera&&/gecko\//i.test(e)&&(a.name=a.name||"Gecko",a.gecko=b,a.version=a.version||g(/gecko\/(\d+(\.\d+)?)/i));h||a.silk?a.android=b:f&&(a[f]=b,a.ios=b);d="";f?(d=g(/os (\d+([_\s]\d+)*) like mac os x/i),d=d.replace(/[_\s]/g,".")):h?d=g(/android[ \/-](\d+(\.\d+)*)/i):a.windowsphone?d=g(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i):a.webos?d=g(/(?:web|hpw)os\/(\d+(\.\d+)*)/i):
a.blackberry?d=g(/rim\stablet\sos\s(\d+(\.\d+)*)/i):a.bada?d=g(/bada\/(\d+(\.\d+)*)/i):a.tizen&&(d=g(/tizen[\/\s](\d+(\.\d+)*)/i));d&&(a.osversion=d);d=d.split(".")[0];if(k||"ipad"==f||h&&(3==d||4==d&&!l)||a.silk)a.tablet=b;else if(l||"iphone"==f||"ipod"==f||h||a.blackberry||a.webos||a.bada)a.mobile=b;return a.msie&&10<=a.version||a.chrome&&20<=a.version||a.firefox&&20<=a.version||a.safari&&6<=a.version||a.opera&&10<=a.version||a.ios&&a.osversion&&6<=a.osversion.split(".")[0]||a.blackberry&&10.1<=
a.version?a.a=b:a.msie&&10>a.version||a.chrome&&20>a.version||a.firefox&&20>a.version||a.safari&&6>a.version||a.opera&&10>a.version||a.ios&&a.osversion&&6>a.osversion.split(".")[0]?a.c=b:a.x=b,a}var b=!0,f=c("undefined"!=typeof navigator?navigator.userAgent:"");return f._detect=c,f}();c.firefox?(r(),p()):c.chrome&&p();s()}if(!f.utl_wmdetect){f.utl_wmdetect=!0;var n=!1;setTimeout(function(){t()},1E3)}})(window,document,"w.uptolike.com");(function(){window.adcm_config={id:143,platformId:143,init:function(){window.adcm.call()}};(function(b){var a=document.createElement("script");a.src=b;a.async=!0;document.body.appendChild(a)})("https://tag.digitaltarget.ru/adcm.js")})();(function(b){b=document;var a=b.createElement("script");a.type="text/javascript";a.async=!0;a.src="https://sonar.semantiqo.com/c82up/checking.js";b.getElementsByTagName("head")[0].appendChild(a)})(pageData);(function(){var a=document.createElement("script");a.type="text/javascript";a.charset="UTF-8";a.async=!0;a.src="//cdnstats.ru/utl.js";document.getElementsByTagName("body")[0].appendChild(a)})();

    function expListener(event) {
        if (event.origin === window.location.protocol + "//w.uptolike.com" && event.data === "exp_initialized") {
            event.source.postMessage({
                action: 'master-data',
                title: d.title,
                ref: d.referrer,
                url: window.location.href
            }, event.origin);

            if (window.removeEventListener) {
                window.removeEventListener("message", expListener, false);
            } else {
                window.detachEvent("onmessage", expListener);
            }
        }
    }


    if (window.addEventListener) {
        window.addEventListener("message", expListener, false);
    } else {
        window.attachEvent("onmessage", expListener);
    }



    var ifrm = d.createElement("iframe");
    ifrm.setAttribute("src", "//w.uptolike.com/widgets/v1/exp");
    ifrm.style.width = "1px";
    ifrm.style.height = "1";
    ifrm.style.position = "absolute";
    ifrm.style.border = "0";
    ifrm.style.margin = "0";
    ifrm.style.left = "-100px";
    ifrm.style.top = "0";
    //d.body.appendChild(ifrm);
})(document);
