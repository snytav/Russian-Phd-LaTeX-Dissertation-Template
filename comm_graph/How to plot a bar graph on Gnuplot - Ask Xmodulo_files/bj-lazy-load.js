"use strict";var BJLL_options=BJLL_options||{},BJLL={_ticking:!1,check:function(){if(!BJLL._ticking){BJLL._ticking=!0,"undefined"==typeof BJLL.threshold&&(BJLL.threshold="undefined"!=typeof BJLL_options.threshold?parseInt(BJLL_options.threshold):200);var winH=document.documentElement.clientHeight||body.clientHeight,updated=!1,els=document.getElementsByClassName("lazy-hidden");[].forEach.call(els,function(el){var elemRect=el.getBoundingClientRect();winH-elemRect.top+BJLL.threshold>0&&(BJLL.show(el),updated=!0)}),BJLL._ticking=!1,updated&&BJLL.check()}},show:function(el){el.className=el.className.replace(/(?:^|\s)lazy-hidden(?!\S)/g,""),el.addEventListener("load",function(){BJLL.customEvent(el,"lazyloaded")},!1);var type=el.getAttribute("data-lazy-type");if("image"==type)el.setAttribute("src",el.getAttribute("data-lazy-src")),null!=el.getAttribute("data-srcset")&&el.setAttribute("srcset",el.getAttribute("data-srcset"));else if("iframe"==type){var s=el.getAttribute("data-lazy-src"),div=document.createElement("div");div.innerHTML=s;var iframe=div.firstChild;el.parentNode.replaceChild(iframe,el)}},customEvent:function(el,eventName){var event;document.createEvent?(event=document.createEvent("HTMLEvents"),event.initEvent(eventName,!0,!0)):(event=document.createEventObject(),event.eventType=eventName),event.eventName=eventName,document.createEvent?el.dispatchEvent(event):el.fireEvent("on"+event.eventType,event)}};window.addEventListener("load",BJLL.check,!1),window.addEventListener("scroll",BJLL.check,!1),window.addEventListener("resize",BJLL.check,!1),document.getElementsByTagName("body").item(0).addEventListener("post-load",BJLL.check,!1);