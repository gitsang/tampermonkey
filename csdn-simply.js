// ==UserScript==

// ==Script==
// @name            CSDN Simplify
// @icon            https://g.csdnimg.cn/static/logo/favicon32.ico
// @description     Simplify CSDN
// @description     简化 CSDN，去除广告，横向尽可能占满屏幕，增加评论框高度

// ==Config==
// @match           *://*.csdn.net/*
// @match           *://*.51cto.com/*
// @connect         www.csdn.net

// ==Require==

// ==Author==
// @author          Gitsang
// @version         1.0.0
// @namespace       https://github.com/gitsang

// ==/UserScript==

var version = "1.0.0";

(function () {
  document.body.contentEditable = true;

  var style = document.createElement("style");
  style.type = "text/css";

  // AD block
  var adStyle = document.createTextNode(
    "#dmp_ad_58, #mys-wrapper, #google-center-div, .recommendAdBox, #recommendAdBox, #kp_box_479{display: none!important;}",
  );
  style.appendChild(adStyle);

  // left aside
  var asideStyle = document.createTextNode(
    ".blog_container_aside {display: none!important;}",
  );
  style.appendChild(asideStyle);

  // side bar
  var sideBarStyle = document.createTextNode(
    ".csdn-common-logo-advert, .csdn-side-toolbar{display: none!important;}",
  );
  style.appendChild(sideBarStyle);

  // top bar
  var topBarStyle = document.createTextNode(
    ".toolbar-advert .toolbar-btn-vip, [title=马上开始系统学习]{display: none!important;}",
  );
  style.appendChild(topBarStyle);

  // footer block
  var footerStyle = document.createTextNode(
    ".blog-footer-bottom, .template-box, .recommend-tit-mod, .second-recommend-box, .more-toolbox-new{display: none!important;}",
  );
  style.appendChild(footerStyle);

  // recommand style
  var recommandStyle = document.createTextNode(
    ".recommend-box, .insert-baidu-box{display: none!important;}",
  );
  style.appendChild(recommandStyle);

  // comment style
  var commentStyle = document.createTextNode(
    ".comment-box .comment-edit-box form .comment-content.open{height: 300px!important;}",
  );
  style.appendChild(commentStyle);

  // main width
  var mainStyle = document.createTextNode("main{width: 100%!important;");
  style.appendChild(mainStyle);

  var head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
})();
