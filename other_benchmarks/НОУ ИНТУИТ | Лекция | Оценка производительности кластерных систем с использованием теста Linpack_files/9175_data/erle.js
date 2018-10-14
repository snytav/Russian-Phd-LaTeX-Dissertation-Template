
function httplize(s){return ((/^\/\//).test(s) ? ((location.protocol == 'https:')?'https:':'http:') : '') + s} 
var ar_q = '';
if(ar_q.indexOf("ad_google")!=-1){
	var ar_e = ar_q.indexOf("100=");ar_q = ar_q.slice(ar_e+4); ar_q=ar_q.split(';');
	var CgiHref =unescape(ar_q[0])+httplize('//ad.adriver.ru/cgi-bin/click.cgi?sid=176762&ad=548202&bid=4134674&bt=43&bn=3&pz=1&nid=0&ref=https:%2f%2fwww.intuit.ru%2fstudies%2fcourses%2f542%2f398%2flecture%2f9175%3fpage%3d6&custom=&xpid=DlcDs4ga9WXK05AnxitSVDdNA9Cw5ZhUZgQJ9_7C9qrbFnaTaUk52LX-AYhqwkhe0EkUk9qpsImczllY8AIp_QhDn9Q');
}else{
	var CgiHref = httplize('//ad.adriver.ru/cgi-bin/click.cgi?sid=176762&ad=548202&bid=4134674&bt=43&bn=3&pz=1&nid=0&ref=https:%2f%2fwww.intuit.ru%2fstudies%2fcourses%2f542%2f398%2flecture%2f9175%3fpage%3d6&custom=&xpid=DlcDs4ga9WXK05AnxitSVDdNA9Cw5ZhUZgQJ9_7C9qrbFnaTaUk52LX-AYhqwkhe0EkUk9qpsImczllY8AIp_QhDn9Q');
}
var ar_bt=43;
var ar_siteid = 176762;
var Mirror = httplize('//edp1.adriver.ru');
var bid = 4134674;
var sliceid = 1654671;
var ar_adid = 548202;
var ar_pz=1;
var ar_sz='%2fstudies%2fcourses%2f542%2f398%2flecture%2f9175%3fpage%3d6';
var ar_nid=0;
var ar_pass='';
var ar_bn=3;
var ar_geozoneid=40;
var Path = '/images/0004134/0004134674/';
var Comp0 = '0/script.js';
var Width = 1280;
var Height = 60;
var date = 'Sun, 14 Oct 2018 01:14:43 GMT';
var Uid = 87149043014;
var Target = '_blank';
var Alt = '';
var CompPath = Mirror + Path + '0/';
var RndNum4NoCash = 555867904;
var ar_ntype = 0;
var ar_tns = 0;
var ar_rhost='ad.adriver.ru';
var ar_exposure_price = 0;
var ar_xpid = 'DlcDs4ga9WXK05AnxitSVDdNA9Cw5ZhUZgQJ9_7C9qrbFnaTaUk52LX-AYhqwkhe0EkUk9qpsImczllY8AIp_QhDn9Q';
if (typeof(ar_tansw) != 'undefined') clearInterval(ar_tansw);
var ar_script = '<script src="' + Mirror + Path + Comp0 + '?555867904" type="text/javascript" charset="windows-1251"><\/script>';
function loadScript(req){try {var head = parent.document.getElementsByTagName('head')[0],s = parent.document.createElement('script');s.setAttribute('type', 'text/javascript');s.setAttribute('charset', 'windows-1251');s.setAttribute('src', req.split('rnd').join(Math.round(Math.random()*9999999)));s.onreadystatechange = function(){if(/loaded|complete/.test(this.readyState)){head.removeChild(s);s.onload = null;}};s.onload = function(){head.removeChild(s);};head.insertBefore(s, head.firstChild);}catch(e){}}
if (typeof(ar_bnum)=='undefined') {var ar_bnum = 1;}
var ad_id = 'ad_ph_' + ar_bnum;
if (typeof(window.parent.AdriverViewability)=="undefined"){window.parent.AdriverViewability = true;loadScript("//content.adriver.ru/banners/0002186/0002186173/0/AV.js")}
window.parent.adriverviewability = window.parent.adriverviewability || {};
window.parent.adriverviewability.v = window.parent.adriverviewability.v || [];
window.parent.adriverviewability.v.push (function (){window.parent.adriverviewability[ad_id] = new window.parent.AdriverViewability('//ad.adriver.ru/cgi-bin/event.cgi?xpid=DlcDs4ga9WXK05AnxitSVDdNA9Cw5ZhUZgQJ9_7C9qrbFnaTaUk52LX-AYhqwkhe0EkUk9qpsImczllY8AIp_QhDn9Q&bid=4134674&type=',0,ad_id);});
document.write(ar_script);
	  

(function (o) {
	var i, w = o.c || window, d = document, y = 31;
	function oL(){
		if (!w.postMessage || !w.addEventListener) {return;}
		if (w.document.readyState == 'complete') {return sL();}
		w.addEventListener('load', sL, false);
	}
	function sL(){try{i.contentWindow.postMessage('pgLd', '*');}catch(e){}}
	function mI(u, oL){
		var i = d.createElement('iframe'); i.setAttribute('src', o.hl(u)); i.onload = oL; with(i.style){width = height = '10px'; position = 'absolute'; top = left = '-10000px'} d.body.appendChild(i);
		return i;
	}
	function st(u, oL){
		if (d.body){return i = mI(u, oL)}
		if(y--){setTimeout(function(){st(u, oL)}, 100)}
	}
	st(o.hl('//content.adriver.ru/banners/0002186/0002186173/0/l6.html?548202&0&0&0&555867904&0&87149043014&40&5.44.169.193&javascript&' + (o.all || 0)), oL);
}({
	hl: function httplize(s){return ((/^\/\//).test(s) ? ((location.protocol == 'https:')?'https:':'http:') : '') + s},
        
        c: parent,
        
	
	all: 1
	
}));
