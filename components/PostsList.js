import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, ImageBackground, RefreshControl, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import TouchableComponent from '../components/TouchableComponent';
import MyText from './MyText';
import CustomColors from '../constants/CustomColors';
import * as Enumerable from 'linq-es2015';
import SponsorsList from '../components/SponsorsList';
import { useSelector, useDispatch } from 'react-redux';
var DomParser = require('react-native-html-parser').DOMParser;
import * as PostsActions from '../store/actions/posts';
import { decodeString } from '../helpers/apiUtils';
const htmlString = `<!DOCTYPE html>
<html lang="en-US">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<title>About Us | Robban Assafina - MENA Maritime Shipping, Ships &amp; Marine Technology Magazine - مجلّة ربّان السفينة</title>
<style type="text/css">			.heateorSssInstagramBackground{background:radial-gradient(circle at 30% 107%,#fdf497 0,#fdf497 5%,#fd5949 45%,#d6249f 60%,#285aeb 90%)}
											.heateor_sss_horizontal_sharing .heateorSssSharing,.heateor_sss_standard_follow_icons_container .heateorSssSharing{
							color: #fff;
						border-width: 0px;
			border-style: solid;
			border-color: transparent;
		}
				.heateor_sss_horizontal_sharing .heateorSssTCBackground{
			color:#666;
		}
				.heateor_sss_horizontal_sharing .heateorSssSharing:hover,.heateor_sss_standard_follow_icons_container .heateorSssSharing:hover{
						border-color: transparent;
		}
		.heateor_sss_vertical_sharing .heateorSssSharing,.heateor_sss_floating_follow_icons_container .heateorSssSharing{
							color: #fff;
						border-width: 0px;
			border-style: solid;
			border-color: transparent;
		}
				.heateor_sss_vertical_sharing .heateorSssTCBackground{
			color:#666;
		}
				.heateor_sss_vertical_sharing .heateorSssSharing:hover,.heateor_sss_floating_follow_icons_container .heateorSssSharing:hover{
						border-color: transparent;
		}
		
		@media screen and (max-width:783px) {.heateor_sss_vertical_sharing{display:none!important}}@media screen and (max-width:783px) {.heateor_sss_floating_follow_icons_container{display:none!important}}div.heateor_sss_mobile_footer{display:none;}@media screen and (max-width:783px){i.heateorSssTCBackground{background-color:white!important}div.heateor_sss_bottom_sharing{width:100%!important;left:0!important;}div.heateor_sss_bottom_sharing li{width:20% !important;}div.heateor_sss_bottom_sharing .heateorSssSharing{width: 100% !important;}div.heateor_sss_bottom_sharing div.heateorSssTotalShareCount{font-size:1em!important;line-height:28px!important}div.heateor_sss_bottom_sharing div.heateorSssTotalShareText{font-size:.7em!important;line-height:0px!important}div.heateor_sss_mobile_footer{display:block;height:40px;}.heateor_sss_bottom_sharing{padding:0!important;display:block!important;width: auto!important;bottom:-2px!important;top: auto!important;}.heateor_sss_bottom_sharing .heateor_sss_square_count{line-height: inherit;}.heateor_sss_bottom_sharing .heateorSssSharingArrow{display:none;}.heateor_sss_bottom_sharing .heateorSssTCBackground{margin-right: 1.1em !important}}</style>
<!-- This site is optimized with the Yoast SEO plugin v13.3 - https://yoast.com/wordpress/plugins/seo/ -->
<meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
<link rel="canonical" href="https://assafinaonline.com/about-us/" />
<meta property="og:locale" content="en_US" />
<meta property="og:type" content="article" />
<meta property="og:title" content="About Us | Robban Assafina - MENA Maritime Shipping, Ships &amp; Marine Technology Magazine - مجلّة ربّان السفينة" />
<meta property="og:description" content="ShareRobban Assafina is a bimonthly Middle Eastern Arabic/English Magazine Specialized in Maritime Shipping, Ships, Offshore and Marine Technology. Published in Lebanon by Oceanic Spark Sarl, with a specialized crew of Maritime Experts, Masters &amp; Engineers, who focus directly on shipbuilding, ships, ports, yachts, and everything related to the world of Marine Navigation, Communication and Machineries...." />
<meta property="og:url" content="https://assafinaonline.com/about-us/" />
<meta property="og:site_name" content="Robban Assafina - MENA Maritime Shipping, Ships &amp; Marine Technology Magazine - مجلّة ربّان السفينة" />
<meta property="article:publisher" content="https://www.facebook.com/Robban.Assafina.Magazine/" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:description" content="ShareRobban Assafina is a bimonthly Middle Eastern Arabic/English Magazine Specialized in Maritime Shipping, Ships, Offshore and Marine Technology. Published in Lebanon by Oceanic Spark Sarl, with a specialized crew of Maritime Experts, Masters &amp; Engineers, who focus directly on shipbuilding, ships, ports, yachts, and everything related to the world of Marine Navigation, Communication and Machineries...." />
<meta name="twitter:title" content="About Us | Robban Assafina - MENA Maritime Shipping, Ships &amp; Marine Technology Magazine - مجلّة ربّان السفينة" />
<meta name="twitter:site" content="@robbanassafina" />
<meta name="twitter:creator" content="@robbanassafina" />
<script type='application/ld+json' class='yoast-schema-graph yoast-schema-graph--main'>{"@context":"https://schema.org","@graph":[{"@type":"WebSite","@id":"https://assafinaonline.com/#website","url":"https://assafinaonline.com/","name":"Robban Assafina - MENA Maritime Shipping, Ships &amp; Marine Technology Magazine - \u0645\u062c\u0644\u0651\u0629 \u0631\u0628\u0651\u0627\u0646 \u0627\u0644\u0633\u0641\u064a\u0646\u0629","inLanguage":"en-US","description":"Robban Assafina","potentialAction":[{"@type":"SearchAction","target":"https://assafinaonline.com/?s={search_term_string}","query-input":"required name=search_term_string"}]},{"@type":"WebPage","@id":"https://assafinaonline.com/about-us/#webpage","url":"https://assafinaonline.com/about-us/","name":"About Us | Robban Assafina - MENA Maritime Shipping, Ships &amp; Marine Technology Magazine - \u0645\u062c\u0644\u0651\u0629 \u0631\u0628\u0651\u0627\u0646 \u0627\u0644\u0633\u0641\u064a\u0646\u0629","isPartOf":{"@id":"https://assafinaonline.com/#website"},"inLanguage":"en-US","datePublished":"2019-12-29T16:14:36+00:00","dateModified":"2019-12-29T16:21:04+00:00","potentialAction":[{"@type":"ReadAction","target":["https://assafinaonline.com/about-us/"]}]}]}</script>
<!-- / Yoast SEO plugin. -->

<link rel='dns-prefetch' href='//use.fontawesome.com' />
<link rel='dns-prefetch' href='//fonts.googleapis.com' />
<link rel='dns-prefetch' href='//s.w.org' />
<link rel="alternate" type="application/rss+xml" title="Robban Assafina - MENA Maritime Shipping, Ships &amp; Marine Technology Magazine - مجلّة ربّان السفينة &raquo; Feed" href="https://assafinaonline.com/feed/" />
<link rel="alternate" type="application/rss+xml" title="Robban Assafina - MENA Maritime Shipping, Ships &amp; Marine Technology Magazine - مجلّة ربّان السفينة &raquo; Comments Feed" href="https://assafinaonline.com/comments/feed/" />
<link rel="alternate" type="text/calendar" title="Robban Assafina - MENA Maritime Shipping, Ships &amp; Marine Technology Magazine - مجلّة ربّان السفينة &raquo; iCal Feed" href="https://assafinaonline.com/events/?ical=1" />
		<script type="text/javascript">
			window._wpemojiSettings = {"baseUrl":"https:\/\/s.w.org\/images\/core\/emoji\/12.0.0-1\/72x72\/","ext":".png","svgUrl":"https:\/\/s.w.org\/images\/core\/emoji\/12.0.0-1\/svg\/","svgExt":".svg","source":{"concatemoji":"https:\/\/assafinaonline.com\/wp-includes\/js\/wp-emoji-release.min.js?ver=5.2.7"}};
			!function(a,b,c){function d(a,b){var c=String.fromCharCode;l.clearRect(0,0,k.width,k.height),l.fillText(c.apply(this,a),0,0);var d=k.toDataURL();l.clearRect(0,0,k.width,k.height),l.fillText(c.apply(this,b),0,0);var e=k.toDataURL();return d===e}function e(a){var b;if(!l||!l.fillText)return!1;switch(l.textBaseline="top",l.font="600 32px Arial",a){case"flag":return!(b=d([55356,56826,55356,56819],[55356,56826,8203,55356,56819]))&&(b=d([55356,57332,56128,56423,56128,56418,56128,56421,56128,56430,56128,56423,56128,56447],[55356,57332,8203,56128,56423,8203,56128,56418,8203,56128,56421,8203,56128,56430,8203,56128,56423,8203,56128,56447]),!b);case"emoji":return b=d([55357,56424,55356,57342,8205,55358,56605,8205,55357,56424,55356,57340],[55357,56424,55356,57342,8203,55358,56605,8203,55357,56424,55356,57340]),!b}return!1}function f(a){var c=b.createElement("script");c.src=a,c.defer=c.type="text/javascript",b.getElementsByTagName("head")[0].appendChild(c)}var g,h,i,j,k=b.createElement("canvas"),l=k.getContext&&k.getContext("2d");for(j=Array("flag","emoji"),c.supports={everything:!0,everythingExceptFlag:!0},i=0;i<j.length;i++)c.supports[j[i]]=e(j[i]),c.supports.everything=c.supports.everything&&c.supports[j[i]],"flag"!==j[i]&&(c.supports.everythingExceptFlag=c.supports.everythingExceptFlag&&c.supports[j[i]]);c.supports.everythingExceptFlag=c.supports.everythingExceptFlag&&!c.supports.flag,c.DOMReady=!1,c.readyCallback=function(){c.DOMReady=!0},c.supports.everything||(h=function(){c.readyCallback()},b.addEventListener?(b.addEventListener("DOMContentLoaded",h,!1),a.addEventListener("load",h,!1)):(a.attachEvent("onload",h),b.attachEvent("onreadystatechange",function(){"complete"===b.readyState&&c.readyCallback()})),g=c.source||{},g.concatemoji?f(g.concatemoji):g.wpemoji&&g.twemoji&&(f(g.twemoji),f(g.wpemoji)))}(window,document,window._wpemojiSettings);
		</script>
		<style type="text/css">
img.wp-smiley,
img.emoji {
	display: inline !important;
	border: none !important;
	box-shadow: none !important;
	height: 1em !important;
	width: 1em !important;
	margin: 0 .07em !important;
	vertical-align: -0.1em !important;
	background: none !important;
	padding: 0 !important;
}
</style>
	<link rel='stylesheet' id='wp_bannerize_pro_slugwp-bannerize-admin-barmincss-css'  href='https://assafinaonline.com/wp-content/plugins/wp-bannerize-pro/public/css/wp-bannerize-admin-bar.min.css?ver=1.4.0' type='text/css' media='all' />
<link rel='stylesheet' id='wp_bannerize_pro_slugwp-bannerizemincss-css'  href='https://assafinaonline.com/wp-content/plugins/wp-bannerize-pro/public/css/wp-bannerize.min.css?ver=1.4.0' type='text/css' media='all' />
<link rel='stylesheet' id='tribe-common-skeleton-style-css'  href='https://assafinaonline.com/wp-content/plugins/the-events-calendar/common/src/resources/css/common-skeleton.min.css?ver=4.10.2' type='text/css' media='all' />
<link rel='stylesheet' id='tribe-tooltip-css'  href='https://assafinaonline.com/wp-content/plugins/the-events-calendar/common/src/resources/css/tooltip.min.css?ver=4.10.2' type='text/css' media='all' />
<link rel='stylesheet' id='wp-block-library-css'  href='https://assafinaonline.com/wp-includes/css/dist/block-library/style.min.css?ver=5.2.7' type='text/css' media='all' />
<link rel='stylesheet' id='wp-block-library-theme-css'  href='https://assafinaonline.com/wp-includes/css/dist/block-library/theme.min.css?ver=5.2.7' type='text/css' media='all' />
<link rel='stylesheet' id='apsc-frontend-css-css'  href='https://assafinaonline.com/wp-content/plugins/accesspress-social-counter/css/frontend.css?ver=1.8.4' type='text/css' media='all' />
<link rel='stylesheet' id='dashicons-css'  href='https://assafinaonline.com/wp-includes/css/dashicons.min.css?ver=5.2.7' type='text/css' media='all' />
<link rel='stylesheet' id='post-views-counter-frontend-css'  href='https://assafinaonline.com/wp-content/plugins/post-views-counter/css/frontend.css?ver=1.3.1' type='text/css' media='all' />
<link rel='stylesheet' id='user-registration-general-css'  href='https://assafinaonline.com/wp-content/plugins/user-registration/assets/css/user-registration.css?ver=1.7.5' type='text/css' media='all' />
<link rel='stylesheet' id='user-registration-smallscreen-css'  href='https://assafinaonline.com/wp-content/plugins/user-registration/assets/css/user-registration-smallscreen.css?ver=1.7.5' type='text/css' media='only screen and (max-width: 768px)' />
<link rel='stylesheet' id='user-registration-my-account-layout-css'  href='https://assafinaonline.com/wp-content/plugins/user-registration/assets/css/my-account-layout.css?ver=1.7.5' type='text/css' media='all' />
<link rel='stylesheet' id='ekit-hf-style-css'  href='https://assafinaonline.com/wp-content/plugins/ekit-headerfooter/assets/css/ekit-headerfooter.css?ver=1.4.5' type='text/css' media='all' />
<link rel='stylesheet' id='elementor-icons-css'  href='https://assafinaonline.com/wp-content/plugins/elementor/assets/lib/eicons/css/elementor-icons.min.css?ver=5.4.0' type='text/css' media='all' />
<link rel='stylesheet' id='elementor-animations-css'  href='https://assafinaonline.com/wp-content/plugins/elementor/assets/lib/animations/animations.min.css?ver=2.7.5' type='text/css' media='all' />
<link rel='stylesheet' id='elementor-frontend-css'  href='https://assafinaonline.com/wp-content/plugins/elementor/assets/css/frontend.min.css?ver=2.7.5' type='text/css' media='all' />
<link rel='stylesheet' id='elementor-global-css'  href='https://assafinaonline.com/wp-content/uploads/elementor/css/global.css?ver=1574673749' type='text/css' media='all' />
<link rel='stylesheet' id='elementor-post-4707-css'  href='https://assafinaonline.com/wp-content/uploads/elementor/css/post-4707.css?ver=1586625415' type='text/css' media='all' />
<link rel='stylesheet' id='elementor-post-4128-css'  href='https://assafinaonline.com/wp-content/uploads/elementor/css/post-4128.css?ver=1586019321' type='text/css' media='all' />
<link rel='stylesheet' id='parent-style-css'  href='https://assafinaonline.com/wp-content/themes/vinkmag/style.css?ver=5.2.7' type='text/css' media='all' />
<link rel='stylesheet' id='child-style-css'  href='https://assafinaonline.com/wp-content/themes/vinkmag-child/style.css?ver=5.2.7' type='text/css' media='all' />
<link rel='stylesheet' id='wpbdp_font_awesome-css'  href='https://use.fontawesome.com/releases/v5.6.3/css/all.css?ver=5.2.7' type='text/css' media='all' />
<link rel='stylesheet' id='wpbdp-widgets-css'  href='https://assafinaonline.com/wp-content/plugins/business-directory-plugin/assets/css/widgets.min.css?ver=5.5.13.1' type='text/css' media='all' />
<link rel='stylesheet' id='heateor_sss_frontend_css-css'  href='https://assafinaonline.com/wp-content/plugins/sassy-social-share/public/css/sassy-social-share-public.css?ver=3.3.8' type='text/css' media='all' />
<link rel='stylesheet' id='heateor_sss_sharing_default_svg-css'  href='https://assafinaonline.com/wp-content/plugins/sassy-social-share/admin/css/sassy-social-share-svg.css?ver=3.3.8' type='text/css' media='all' />
<link rel='stylesheet' id='popup-maker-site-css'  href='//assafinaonline.com/wp-content/uploads/pum/pum-site-styles.css?generated=1594754907&#038;ver=1.8.14' type='text/css' media='all' />
<link rel='stylesheet' id='vinkmag-fonts-css'  href='https://fonts.googleapis.com/css?family=Arimo%3A400%2C400i%2C700%2C700i%7CHeebo%3A400%2C500%2C700%2C800%2C900%7CMerriweather%3A400%2C400i%2C700%2C700i%2C900%2C900i&#038;ver=1.6.1' type='text/css' media='all' />
<link rel='stylesheet' id='bootstrap-css'  href='https://assafinaonline.com/wp-content/themes/vinkmag/assets/css/bootstrap.min.css?ver=1.6.1' type='text/css' media='all' />
<link rel='stylesheet' id='font-awesome-css'  href='https://assafinaonline.com/wp-content/plugins/elementor/assets/lib/font-awesome/css/font-awesome.min.css?ver=4.7.0' type='text/css' media='all' />
<link rel='stylesheet' id='animate-css'  href='https://assafinaonline.com/wp-content/themes/vinkmag/assets/css/animate.css?ver=1.6.1' type='text/css' media='all' />
<link rel='stylesheet' id='icofonts-css'  href='https://assafinaonline.com/wp-content/themes/vinkmag/assets/css/icofonts.css?ver=1.6.1' type='text/css' media='all' />
<link rel='stylesheet' id='owlcarousel-css'  href='https://assafinaonline.com/wp-content/themes/vinkmag/assets/css/owlcarousel.min.css?ver=1.6.1' type='text/css' media='all' />
<link rel='stylesheet' id='slick-css'  href='https://assafinaonline.com/wp-content/themes/vinkmag/assets/css/slick.css?ver=1.6.1' type='text/css' media='all' />
<link rel='stylesheet' id='mCustomScrollbar-css'  href='https://assafinaonline.com/wp-content/themes/vinkmag/assets/css/jquery.mCustomScrollbar.css?ver=1.6.1' type='text/css' media='all' />
<link rel='stylesheet' id='magnific-popup-css'  href='https://assafinaonline.com/wp-content/themes/vinkmag/assets/css/magnific-popup.css?ver=1.6.1' type='text/css' media='all' />
<link rel='stylesheet' id='vinkmag-style-css'  href='https://assafinaonline.com/wp-content/themes/vinkmag/assets/css/style.css?ver=1.6.1' type='text/css' media='all' />
<style id='vinkmag-style-inline-css' type='text/css'>

        body{ font-family:"Arimo"; }
        h1,h2,h3,h4,h5 { 
            font-family:"Heebo";font-style: normal;font-weight:400; 
        }

        .nav-menu li a,.post-cat,.post-list-item .nav-tabs li a,.ts-social-list li b,
        .widgets.ts-social-list-item ul li a b,.footer-social li a,.ts-cat-title span,
        .view-link-btn span { 
            font-family:"Heebo";
        }
        .body-inner-content{
          background-color:#f0f1f4;
          background-image: url();
          background-repeat: no-repeat;
          background-position: top center;
          background-size: cover;
        }

        /* primary background color*/
        .top-bar .top-social li.ts-date,
        .view-link-btn,
        .logo,
        .navbar-style1.navbar-container .navbar .nav-item a.active, 
        .navbar-style1.navbar-container .navbar .nav-item a:hover, 
        .navbar-style1.navbar-container .navbar .nav-item a:focus,
        .navbar-style1.navbar-container .nav-search-button,
        .ts-title .title-before,
        .owl-dots .owl-dot span,
        #breaking_slider .owl-nav .owl-prev:hover, #breaking_slider .owl-nav .owl-next:hover,
        .navbar-container.navbar-style5 .nav-item a.active:before, 
        .navbar-container.navbar-style5 .nav-item a:hover:before,
         .navbar-container.navbar-style5 .nav-item a:focus:before,
        .ts-newslatter .newsletter-form .ts-submit-btn .btn:hover,
        .top-bar .ts-date-item,
        .header-middle.v2,
        .video-slider .post-video .ts-play-btn,
        .top-social li.ts-subscribe,
        .ts-title.title-bg .title-text,
        .ts-title.title-bg .title-after,
        .ts-widget-newsletter,
        .ts-widget-newsletter .newsletter-form .btn:hover,
        .header-standerd,
        .navbar-container.navbar-style2,
        .navbar-container.navbar-style2 .navbar,
        .navbar-style2.navbar-container .nav-search-button,
        .navbar-container.navbar-style3.navbar-dark .nav-item a.active, .navbar-container.navbar-style3.navbar-dark .nav-item a:hover,
        .navbar-container.navbar-style3.navbar-dark .nav-item a:focus,
        .navbar-standerd.navbar-darks .navbar-style5 .xs-navbar .main-menu > li:hover > a, .navbar-standerd.navbar-darks .navbar-style5 .xs-navbar .main-menu > li.active > a,
        .navbar-standerd.navbar-darks .navbar-style5 .xs-navbar .main-menu > li:before,
        .single-post-wrapper .post-meta-info li.share-post a i,
        .widget-title:before,
        .tagcloud a:hover,
         blockquote cite:after,
        .error-page .error-body a,
        .accordion-post-style .card .btn,
        .navbar-container.navbar-style1 .navbar-nav > .current-menu-parent,
        .widgets-newsletter-form .btn.btn-primary,
        .pagination li.active a, .pagination li:hover a,
        .blog-navbar .navbar-container .navbar .main-menu .nav-item > a.active,
        .blog-navbar .navbar-container.navbar-style5 .main-menu > li.current-menu-item > a:before,
        .blog-navbar .navbar-container .navbar .main-menu .nav-item > a:hover,
        .btn.btn-primary,
        .navbar-standerd.nav-bg-white .navbar-style5 .navbar .main-menu .nav-item > a.active,
        .navbar-standerd.nav-bg-white .navbar-style5 .navbar .main-menu > .nav-item > a:hover,
        .post-content-loading a:hover,
        .instagram-area .follow-btn-area .btn:hover,
        .post-list-item .nav-tabs li a::before,
        .ts-search-form .vinkmag-serach:before,
        .xs-review-overview-list.custom-rat .xs-overview-percentage .data-rat .xs-percentange .percentange_check,
        .view-review-list .xs-review-rattting.xs-percentange .percentange_check,
        .public-xs-review-box .xs-save-button button,
        .featured-tab-item .featured-tab-post > li a.active .post-content,
        .featured-tab-item .featured-tab-post > li a.active:before,
        .woocommerce ul.products li.product .button,.woocommerce ul.products li.product .added_to_cart,
        .post-meta-info .share-post,
        .navbar-standerd.navbar-darks .navbar-style5 .ekit-menu-simple>li.current-menu-parent>a,
         .navbar-standerd.navbar-darks .navbar-style5 .ekit-menu-simple>li.current-menu-item>a,
        .navbar-standerd.navbar-darks .navbar-style5 .ekit-menu-simple>li>a:before,
        .woocommerce nav.woocommerce-pagination ul li a:focus, .woocommerce nav.woocommerce-pagination ul li a:hover, .woocommerce nav.woocommerce-pagination ul li span.current,
        .woocommerce #respond input#submit.alt, .woocommerce a.button.alt, .woocommerce button.button.alt, .woocommerce input.button.alt,.sponsor-web-link a:hover i, .woocommerce .widget_price_filter .ui-slider .ui-slider-range, .woocommerce span.onsale{
            background-color: #363367;
        }

        /* primary color*/
        .breaking-title,
        .ts-top-nav li a:hover,
        .post-title a:hover,
        .owl-next,
        .owl-prev,
        .watch-post .post-list-box .post-title:hover,
        a:hover,
        .single-post a,
        .navbar-container .navbar .nav-item .dropdown-menu .dropdown-item.active, .navbar-container .navbar .nav-item .dropdown-menu .dropdown-item:hover, .navbar-container .navbar .nav-item .dropdown-menu .dropdown-item:focus,
        .ts-overlay-style .overlay-post-content .post-meta-info li.active,
        .navbar-container.navbar-style5 .nav-item a.active, .navbar-container.navbar-style5 .nav-item a:hover, .navbar-container.navbar-style5 .nav-item a:focus,
        .post-meta-info li.active, .post-video .post-video-content .post-meta-info li.active, .navbar-container.navbar-style3 .nav-item a.active, .navbar-container.navbar-style3 .nav-item a:hover, .navbar-container.navbar-style3 .nav-item a:focus, .post-navigation .post-previous:hover span, .post-navigation .post-next:hover span, .breadcrumb li, 
         .woocommerce ul.products li.product .price, .woocommerce ul.products li.product .woocommerce-loop-product__title,
         .single-post a,
         .navbar-container .navbar .main-menu .nav-item .dropdown-menu > li > .dropdown-item:hover{
           color: #363367;
        }

        /* primary dark color*/
        .top-bar.v2,
        .ts-widget-newsletter .newsletter-form .btn,.navbar-container.navbar-style2 .nav-item a.active, .navbar-container.navbar-style2 .nav-item a:hover,
         .navbar-container.navbar-style2 .nav-item a:focus,.widgets-newsletter-form .btn.btn-primary:hover, 
         .woocommerce ul.products li.product .added_to_cart:hover, .woocommerce #respond input#submit.alt:hover, .woocommerce a.button.alt:hover, .woocommerce button.button.alt:hover, .woocommerce input.button.alt:hover,.woocommerce .widget_price_filter .ui-slider .ui-slider-handle{
           background-color: #363367;
        }
        .woocommerce ul.products li.product .woocommerce-loop-product__title:hover{
                   color: #363367;

        }
        .menu-toggler{
            background-color: #363367 !important;

        }
        /* border color*/
        .tagcloud a:hover{
           border-color:#363367;
        }


        /*--------------- title color----------------*/
        .post-title,
        .post-title a,
        .entry-title,
        .entry-title a,
        .elementor-widget-wp-widget-archives ul li a,
        .recent-posts-widget ul li .post-info,
        .ts-title,
        .widget-title,
        body.single-post .post-title a,
        .post-navigation a span,
        h1, h2, h3, h4, h5, h6,{
            color: #101010;
        }

        /*--------------- for dark theme ----------------*/
    
        .dark-themes .ts-grid-box, .dark-themes .archive .category-layout-1 .ts-grid-box.ts-grid-content,
         .dark-themes.archive .category-layout-2 .ts-grid-box.ts-grid-content, 
         .dark-themes.archive .category-layout-3 .ts-grid-box.ts-grid-content, 
         .dark-themes .vinkmag-masonary-grid .card-columns .card, .dark-themes .post-list-item,
          .dark-themes .breadcrumb, .dark-themes .post-content-box .post-content, 
        .dark-themes .featured-tab-item .featured-tab-post .post-content,
        .dark-themes .ts-breaking-news,
        .dark-themes .navbar-style1.navbar-container .navbar,
        .dark-themes .ts-tranding-post .slider-indicators .post-content,
        .dark-themes .ts-newslatter,
        .dark-themes .ts-footer-social-list,
        .dark-themes .top-bar,
        .dark-themes .input-group-append,
        .dark-themes .ts-grid-item-2.ts-grid-content,
        .dark-themes .navbar-standerd.navbar-darks .navbar-style5 .xs-navbar{
            background: #1f1f1f;
        }
        .dark-themes .post-title, .dark-themes .post-title a,
        .dark-themes .entry-title, .dark-themes .entry-title a,
        .dark-themes .elementor-widget-wp-widget-archives ul li a, 
        .dark-themes .recent-posts-widget ul li .post-info, .dark-themes .ts-title, 
        .dark-themes .widget-title, .dark-themes h1, .dark-themes h2, .dark-themes h3,
        .dark-themes h4, .dark-themes h5, .dark-themes h6,
        .dark-themes .post-list-item .nav-tabs li a.active,
        .dark-themes body.single-post .post-title a,
        .dark-themes .post-navigation a span,
        .dark-themes .recent-posts-widget ul li .post-info .entry-title a{
            color: #ffffff;
        }
        .dark-themes .single-post-wrapper p, .dark-themes body,
         .dark-themes p, .dark-themes span, 
         .dark-themes .widgets ul li a,
          .dark-themes .apsc-theme-2 .apsc-each-profile a .apsc-inner-block .apsc-count,
           .dark-themes .entry-content ul li, .dark-themes .post-meta-info li.author a,
            .dark-themes .breadcrumb li a, .dark-themes .post-content p, 
        .dark-themes .tagcloud strong,
        .dark-themes .post-meta-info li,
        .dark-themes .ts-breaking-news p a{
            color: #1f1f1f;
        }
       
    
        
</style>
<link rel='stylesheet' id='vinkmag-blog-css'  href='https://assafinaonline.com/wp-content/themes/vinkmag/assets/css/blog.css?ver=1.6.1' type='text/css' media='all' />
<link rel='stylesheet' id='vinkmag-responsive-css'  href='https://assafinaonline.com/wp-content/themes/vinkmag/assets/css/responsive.css?ver=1.6.1' type='text/css' media='all' />
<link rel='stylesheet' id='vinkmag-gutenberg-custom-css'  href='https://assafinaonline.com/wp-content/themes/vinkmag/assets/css/gutenberg-custom.css?ver=1.6.1' type='text/css' media='all' />
<link rel='stylesheet' id='smartmenus-ekit-css'  href='https://assafinaonline.com/wp-content/plugins/ekit-headerfooter/elements/widgets/nav-menu/assets/css/smartmenus.css?ver=1.0' type='text/css' media='all' />
<link rel='stylesheet' id='line-awesome-css'  href='https://assafinaonline.com/wp-content/plugins/ekit-megamenu/assets/css/line-awesome.min.css?ver=2.4.3' type='text/css' media='all' />
<link rel='stylesheet' id='smartmenus-css'  href='https://assafinaonline.com/wp-content/plugins/ekit-megamenu/assets/css/smartmenus.css?ver=2.4.3' type='text/css' media='all' />
<style id='smartmenus-inline-css' type='text/css'>
/* Switch to desktop layout
	-----------------------------------------------
	   These transform the menu tree from
	   collapsible to desktop (navbar + dropdowns)
	-----------------------------------------------*//* start... (it's not recommended editing these rules) */.navbar.xs-navbar ul > li > ul .elementor-widget-container a{background-color:transparent !important;line-height:2.5 !important;padding-top:0;padding-bottom:0;}.ekit-megamenu-holder{background:#fff;background:linear-gradient(0deg, rgba(255, 255, 255, 100) 0%, rgba(255, 255, 255, 100) 100%);border-bottom-right-radius:0px;border-bottom-left-radius:0px;border-top-right-radius:0px;border-top-left-radius:0px;}.ekit-megamenu-holder .nav-controler{margin-top:20px;margin-bottom:20px;}.ekit-megamenu-holder .nav-controler .navbar-toggler{background-color:#333;color:#fff;cursor:pointer;float:right;height:30px;width:40px;padding:5px;}.ekit-megamenu-holder .nav-controler .site-title{margin-top:0;margin-bottom:0;}.ekit-megamenu-holder .nav-controler .navbar-toggler-icon{height:1px;width:100%;position:relative;background-color:#fff;display:block;}.ekit-megamenu-holder .nav-controler .navbar-toggler-icon::before,.ekit-megamenu-holder .nav-controler .navbar-toggler-icon::after{position:absolute;content:"";left:0;height:100%;width:100%;background-color:inherit;}.ekit-megamenu-holder .nav-controler .navbar-toggler-icon::before{top:6px;}.ekit-megamenu-holder .nav-controler .navbar-toggler-icon::after{top:-6px;}.ekit-megamenu-holder .clearfix::after{display:block;clear:both;content:"";}.ekit-megamenu-holder .nav-identity-panel{display:none;}.ekit-megamenu-holder .no-scroller{overflow:hidden;}.ekit-megamenu-holder .ekit-menu-simple{position:static;}.ekit-megamenu-holder .ekit-menu-simple li:hover > a{background:#fff;background:linear-gradient(0deg, #fff 0%, #fff 100%);color:#1e73be !important;}.ekit-megamenu-holder .ekit-menu-simple > li > a{color:#000 !important;}.ekit-megamenu-holder .ekit-menu-simple > li > a:hover,.ekit-megamenu-holder .ekit-menu-simple > li > a:focus,.ekit-megamenu-holder .ekit-menu-simple > li > a:active{color:#1e73be !important;}.ekit-megamenu-holder .ekit-menu-simple a{font-family:Arial, sans-serif;font-size:15px;text-decoration:none;text-transform:capitalize;}.ekit-megamenu-holder .ekit-menu-simple a:hover,.ekit-megamenu-holder .ekit-menu-simple a:focus,.ekit-megamenu-holder .ekit-menu-simple a:active{background:#fff;background:linear-gradient(0deg, #fff 0%, #fff 100%);}.ekit-megamenu-holder .ekit-menu-simple a.current{background:#555;color:#fff;}.ekit-megamenu-holder .ekit-menu-simple a.disabled{color:#ccc;}.ekit-megamenu-holder .ekit-menu-simple a .sub-arrow{position:absolute;top:50%;transform:translateY(-50%);right:5px;overflow:hidden;font-size:15px;color:inherit;text-align:center;text-shadow:none;background:transparent;}.ekit-megamenu-holder .ekit-menu-simple a .sub-arrow::before{content:'+';}.ekit-megamenu-holder .ekit-menu-simple a.highlighted .sub-arrow::before{content:'-';}.ekit-megamenu-holder .ekit-menu-simple a .ekit-menu-badge{position:absolute;top:5px;right:5px;background-color:#bbb;color:#fff;font-size:16px;padding:4px 8px 3px;border-radius:3px;font-size:8px;line-height:1;z-index:10;}.ekit-megamenu-holder .ekit-menu-simple a .ekit-menu-badge > .ekit-menu-badge-arrow{position:absolute;bottom:-12px;left:50%;transform:translateX(-50%);border-left:solid transparent;border-right:solid transparent;border-top:solid #bbb;border-bottom:solid transparent;border-width:6px;}.ekit-megamenu-holder .ekit-menu-simple a > .ekit-menu-icon{padding-right:5px;}.ekit-megamenu-holder .ekit-menu-simple .ekit-menu-megamenu-container{background:#fff;background:linear-gradient(90deg, rgba(255, 255, 255, 100) 0%, rgba(255, 255, 255, 100) 100%);border-top:1px solid #dadada;border-left:1px solid #dadada;border-right:1px solid #dadada;border-bottom:1px solid #dadada;}.ekit-megamenu-holder .ekit-menu-simple .ekit-has-submenu{border-radius:0px 0px 0px 0px;background:#fff;background:linear-gradient(60deg, rgba(255, 255, 255, 6) 0%, rgba(255, 255, 255, 6) 100%);border-top:1px solid #dadada;border-left:1px solid #dadada;border-right:1px solid #dadada;border-bottom:1px solid #dadada;}.ekit-megamenu-holder .ekit-menu-simple .ekit-has-submenu > li{min-width:250px;}.ekit-megamenu-holder .ekit-menu-simple .ekit-has-submenu > li > a{color:#000;transition:all 0.4s ease;}.ekit-megamenu-holder .ekit-menu-simple .ekit-has-submenu > li > a:hover{color:#1e73be;background:#fff;background:linear-gradient(90deg, rgba(255, 255, 255, 50) 0%, rgba(255, 255, 255, 50) 100%);}.ekit-megamenu-holder .ekit-menu-simple .ekit-has-submenu > li > a > .sub-arrow{left:inherit;right:8px;}.ekit-megamenu-holder .ekit-menu-simple li{border-top:1px solid rgba(0, 0, 0, 0.05);}.ekit-megamenu-holder .ekit-menu-simple > li:first-child{border-top:0;}.ekit-megamenu-holder .ekit-menu-simple ul{z-index:100;}.ekit-megamenu-holder .ekit-menu-simple ul a,.ekit-megamenu-holder .ekit-menu-simple ul a:hover,.ekit-megamenu-holder .ekit-menu-simple ul a:focus,.ekit-megamenu-holder .ekit-menu-simple ul a:active{font-size:14px;}.ekit-megamenu-holder .ekit-menu-simple .mega-menu{margin-left:0 !important;right:0 !important;width:auto !important;max-width:none !important;}.ekit-megamenu-holder .ekit-menu-simple .ekit-menu-has-megamenu{position:static;}.menu-toggler{display:none;padding:0.25rem 0.75rem;font-size:1.25rem;line-height:1;background-color:transparent;border:1px solid rgba(0, 0, 0, .1);border-radius:0.25rem;float:right;position:relative;z-index:10;cursor:pointer;}.menu-toggler .menu-toggler-icon{display:inline-block;width:1.5em;height:1.5em;vertical-align:middle;background-repeat:no-repeat;background-position:center center;background-size:100% 100%;background-image:url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");}@media (max-width:991px){.admin-bar .ekit-megamenu-holder{padding-bottom:46px;padding-top:46px;}.admin-bar .nav-identity-panel{top:32px;}.menu-toggler{display:block;}.ekit-menu-overlay{position:fixed;z-index:5;top:0;left:-110%;height:100%;width:100%;background-color:rgba(51, 51, 51, .5);transition:all 0.4s ease;opacity:1;visibility:visible;transition:all 600ms cubic-bezier(0.6, 0.1, 0.68, 0.53) 400ms;}.ekit-menu-overlay.active{left:0%;transition:all 600ms cubic-bezier(0.22, 0.61, 0.24, 1) 0ms;}.ekit-megamenu-holder{max-width:320px;width:100%;position:fixed;top:0;left:0;z-index:9999;height:100%;box-shadow:0px 10px 10px rgba(0, 0, 0, .05);overflow-y:auto;overflow-x:hidden;transform:translateX(-320px);padding:20px;transition:all 600ms cubic-bezier(0.6, 0.1, 0.68, 0.53) 0ms;}.ekit-megamenu-holder.active{transform:translateX(0px);transition:all 600ms cubic-bezier(0.22, 0.61, 0.24, 1) 400ms;}.ekit-megamenu-holder > .header-brand{display:none;}.ekit-megamenu-holder .nav-identity-panel{display:block;position:absolute;width:100%;top:0;left:0;padding:20px;}.ekit-megamenu-holder .nav-identity-panel .site-title{margin:0px;padding-top:0px;padding-bottom:0px;}.ekit-megamenu-holder .nav-identity-panel .header-brand{float:left;}.ekit-megamenu-holder .nav-identity-panel .nav-logo{display:block;}.ekit-megamenu-holder .nav-identity-panel .nav-logo > img{max-width:200px;max-height:70px;}.ekit-megamenu-holder .menu-close{background-color:rgba(255, 255, 255, 0);border:0px;color:#333;cursor:pointer;float:right;margin:4px 0;}.ekit-megamenu-holder .ekit-menu li{position:static;}.ekit-megamenu-holder .ekit-menu-badge{position:static !important;float:right;margin-right:15px;}.ekit-megamenu-holder .ekit-menu-badge .ekit-menu-badge-arrow{display:none;}.ekit-megamenu-holder #main-menu{padding-top:90px !important;}.ekit-megamenu-holder .navbar .navbar-toggler{display:block;}.ekit-megamenu-holder .ekit-menu-simple li a{padding:10px;color:#000;}.ekit-megamenu-holder .ekit-menu-simple .ekit-menu-megamenu-container{background:#fff;background:linear-gradient(0deg, rgba(255, 255, 255, 100) 0%, rgba(255, 255, 255, 100) 100%);border-top:0px solid #d93;border-left:0px solid #d93;border-right:0px solid #d93;border-bottom:0px solid #d93;}.ekit-megamenu-holder .ekit-menu-simple .ekit-has-submenu{background:#fff;background:linear-gradient(0deg, rgba(255, 255, 255, 100) 0%, rgba(255, 255, 255, 100) 100%);border-top:0px solid #d33;border-left:0px solid #d33;border-right:0px solid #d33;border-bottom:0px solid #d33;}.ekit-megamenu-holder .ekit-menu-simple .ekit-has-submenu > li > a{background:#f4f4f4;background:linear-gradient(0deg, rgba(244, 244, 244, 100) 0%, rgba(244, 244, 244, 100) 100%);}.ekit-megamenu-holder .ekit-menu-simple li:hover > a,.ekit-megamenu-holder .ekit-menu-simple li:active > a,.ekit-megamenu-holder .ekit-menu-simple li:focus > a,.ekit-megamenu-holder .ekit-menu-simple .ekit-has-submenu > li > a:hover,.ekit-megamenu-holder .ekit-menu-simple .ekit-has-submenu > li > a:active,.ekit-megamenu-holder .ekit-menu-simple .ekit-has-submenu > li > a:focus{color:#0d3a4f;background:#dbdbdb;background:linear-gradient(90deg, rgba(219, 219, 219, 100) 0%, rgba(219, 219, 219, 100) 100%);}.ekit-megamenu-holder .ekit-menu-simple .menu-item > ul{display:none;}}@media (min-width:992px){.ekit-megamenu-holder{width:100%;}.ekit-megamenu-holder > .header-brand{line-height:76px;height:80px;}.ekit-megamenu-holder > .header-brand .site-title{margin-top:0px;margin-bottom:0px;margin-right:0;padding-top:0px;padding-bottom:0px;}.ekit-megamenu-holder > .header-brand img{max-width:200px;max-height:70px;}.ekit-megamenu-holder > .header-brand .nav-logo{display:block;}.ekit-megamenu-holder .header-brand{float:right;margin-left:20px;display:block;}.ekit-megamenu-holder .ekit-menu-simple{text-align:left;float:left;}.ekit-megamenu-holder .ekit-menu-simple .menu-item > ul{position:absolute;width:12em;display:none;}.ekit-megamenu-holder .ekit-menu-simple > li{display:inline-block;}.ekit-megamenu-holder .ekit-menu-simple.ekit-menu-rtl li{float:right;}.ekit-megamenu-holder .ekit-menu-simple ul li,.ekit-megamenu-holder .ekit-menu-simple.ekit-menu-rtl ul li,.ekit-megamenu-holder .ekit-menu-simple.ekit-menu-vertical li{float:none;}.ekit-megamenu-holder .ekit-menu-simple a{white-space:nowrap;}.ekit-megamenu-holder .ekit-menu-simple ul a,.ekit-megamenu-holder .ekit-menu-simple.ekit-menu-vertical a{white-space:normal;}.ekit-megamenu-holder .ekit-menu-simple .ekit-menu-nowrap > li > a,.ekit-megamenu-holder .ekit-menu-simple .ekit-menu-nowrap > li > :not(ul) a{white-space:nowrap;/* ...end */}.ekit-megamenu-holder .ekit-menu-simple{height:80px;}.ekit-megamenu-holder .ekit-menu-simple li{height:100%;}.ekit-megamenu-holder .ekit-menu-simple li > a{line-height:80px;}.ekit-megamenu-holder .ekit-menu-simple a{padding:0px 15px;color:#000;height:100%;}.ekit-megamenu-holder .ekit-menu-simple a:hover,.ekit-megamenu-holder .ekit-menu-simple a:focus,.ekit-megamenu-holder .ekit-menu-simple a:active,.ekit-megamenu-holder .ekit-menu-simple a.highlighted{color:#1e73be;}.ekit-megamenu-holder .ekit-menu-simple a.current{background:#555;color:#fff;}.ekit-megamenu-holder .ekit-menu-simple a.disabled{background:#fff;color:#ccc;}.ekit-megamenu-holder .ekit-menu-simple a.has-submenu{padding-right:27px;}.ekit-megamenu-holder .ekit-menu-simple a.highlighted .sub-arrow::before{content:'+';}.ekit-megamenu-holder .ekit-menu-simple > li{border-top:0;}.ekit-megamenu-holder .ekit-menu-simple ul a.has-submenu{padding-right:15px;}.ekit-megamenu-holder .ekit-menu-simple ul a .sub-arrow{left:3px;right:auto;}.ekit-megamenu-holder .ekit-menu-simple ul > li{border-left:0;border-top:1px solid #eee;}.ekit-megamenu-holder .ekit-menu-simple ul > li:first-child{border-top:0;}.ekit-megamenu-holder .ekit-menu-simple .scroll-up,.ekit-megamenu-holder .ekit-menu-simple .scroll-down{position:absolute;display:none;visibility:hidden;overflow:hidden;background:#fff;height:20px;}.ekit-megamenu-holder .ekit-menu-simple .scroll-up-arrow,.ekit-megamenu-holder .ekit-menu-simple .scroll-down-arrow{position:absolute;top:-2px;left:50%;margin-left:-8px;width:0;height:0;overflow:hidden;border-width:8px;border-style:dashed dashed solid dashed;border-color:transparent transparent #555 transparent;}.ekit-megamenu-holder .ekit-menu-simple .scroll-down-arrow{top:6px;border-style:solid dashed dashed dashed;border-color:#555 transparent transparent transparent;}.ekit-megamenu-holder .ekit-menu-simple.ekit-menu-rtl a.has-submenu{padding-right:15px;padding-left:27px;}.ekit-megamenu-holder .ekit-menu-simple.ekit-menu-rtl a .sub-arrow{left:15px;right:auto;}.ekit-megamenu-holder .ekit-menu-simple.ekit-menu-rtl.ekit-menu-vertical a.has-submenu{padding:80px - 15px *  / 2 15px;}.ekit-megamenu-holder .ekit-menu-simple.ekit-menu-rtl.ekit-menu-vertical a .sub-arrow{left:auto;right:3px;}.ekit-megamenu-holder .ekit-menu-simple.ekit-menu-rtl > li:first-child{border-left:1px solid #eee;}.ekit-megamenu-holder .ekit-menu-simple.ekit-menu-rtl > li:last-child{border-left:0;}.ekit-megamenu-holder .ekit-menu-simple.ekit-menu-rtl ul a.has-submenu{padding:80px - 15px *  / 2 15px;}.ekit-megamenu-holder .ekit-menu-simple.ekit-menu-rtl ul a .sub-arrow{left:auto;right:3px;}.ekit-megamenu-holder .ekit-menu-simple.ekit-menu-vertical a .sub-arrow{left:3px;right:auto;}.ekit-megamenu-holder .ekit-menu-simple.ekit-menu-vertical li{border-left:0;border-top:1px solid #eee;}.ekit-megamenu-holder .ekit-menu-simple.ekit-menu-vertical > li:first-child{border-top:0;}.ekit-megamenu-holder .ekit-menu-megamenu-container{box-shadow:0px 10px 30px 0px rgba(23, 104, 221, .2);}.ekit-megamenu-holder .ekit-has-submenu{box-shadow:0px 10px 30px 0px rgba(45, 45, 45, .2);}.ekit-megamenu-holder .ekit-has-submenu > li > a{padding-top:15px;padding-left:10px;padding-bottom:15px;padding-right:10px;line-height:normal;}.ekit-megamenu-holder #main-menu .hide-animation{animation:hide-animation 300ms cubic-bezier(0.22, 0.61, 0.24, 1);}.ekit-megamenu-holder #main-menu .show-animation{animation:show-animation 300ms cubic-bezier(0.22, 0.61, 0.24, 1);}.ekit-megamenu-holder .navbar .navbar-toggler{display:none;}.rtl .ekit-megamenu-holder .navbar-container .ekit-menu-simple a .sub-arrow{right:auto;left:5px;}.rtl .ekit-megamenu-holder .navbar-container .ekit-menu-simple a.has-submenu{padding-left:27px;}.rtl .ekit-megamenu-holder .navbar-container .ekit-menu-simple .ekit-has-submenu > li > a{text-align:right;}.rtl .ekit-megamenu-holder .ekit-menu,.rtl .ekit-megamenu-holder .ekit-menu ul,.rtl .ekit-megamenu-holder .ekit-menu li{direction:rtl;}}.post--tab{display:flex;}.post--tab .tabHeader{flex:0 0 15%;}.post--tab .tabHeader .tab__list{list-style:none;padding-left:0px;}.post--tab .tabHeader .tab__list > .tab__list__item{font-size:14px;color:#232323;border:none;padding:14px 16px 14px 30px;cursor:pointer;background-color:#fff;transition:all 0.5s ease;display:block;}.post--tab .tabHeader .tab__list > .tab__list__item.active,.post--tab .tabHeader .tab__list > .tab__list__item:hover{color:#d72924;background-color:#f0f1f4;}.post--tab .tabContent{flex:0 0 85%;}.ekit--tab__post__details{border-left:1px solid #f0f1f4;border-left:1px solid #f0f1f4;}.ekit--tab__post__details .tabItem{display:none;animation:hide-fadeout 600ms ease-out;}.ekit--tab__post__details .tabItem.active{display:block;animation:show-fadein 600ms ease-in;}.ekit--tab__post__details .tab__post__single--item{border-top:0px;width:33.33333%;padding-left:15px;padding-right:15px;display:inline-block;float:left;}.ekit--tab__post__details .tab__post__single--item.ekit___column-2{width:50%;}.ekit--tab__post__details .tab__post__single--item.ekit___column-4{width:25%;}.ekit--tab__post__details .tab__post__single--item:hover .tab__post--header > img{transform:scale(1.2);}.ekit--tab__post__details .tab__post--header{position:relative;overflow:hidden;display:block;margin-bottom:20px;padding-left:0;padding-right:0;}.ekit--tab__post__details .tab__post--header > img{transition:all 0.4s ease-in-out;}.ekit--tab__post__details .tab__post--header .tab__post--icon{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);z-index:5;}.ekit--tab__post__details .tab__post--header .tab__post--icon > span{color:#fff;font-size:48px;}.ekit--tab__post__details .tab__post--title{font-size:15px;font-weight:500;color:#232323;}.ekit--tab__post__details .tab__post--title > a{color:inherit;line-height:inherit;padding-left:0;padding-right:0;}.clearfix::after{display:block;content:"";clear:both;}.post--lists{list-style:none;padding-left:0px;}.post--lists > li{border:none !important;}.post--lists > li > a{padding:8px 16px;line-height:normal;transition:all 0.4s ease;}.post--lists.vertical--list > li{float:left;margin-right:16px;}.post--lists.vertical--list > li > a{padding-left:0;padding-right:0;}@keyframes show-fadein{0%{opacity:0;}100%{opacity:1;}}@keyframes hide-fadeout{/* show animation */0%{opacity:1;}100%{opacity:0;}}@keyframes show-animation{/* hide animation */0%{transform:translateY(20px);opacity:0;}100%{transform:translateY(0px);}}@keyframes hide-animation{0%{transform:translateY(0px);}100%{transform:translateY(20px);opacity:0;}}
</style>
<link rel='stylesheet' id='ekit-menu-style-css'  href='https://assafinaonline.com/wp-content/plugins/ekit-megamenu/assets/css/frontend-style.css?ver=2.4.3' type='text/css' media='all' />
<link rel='stylesheet' id='default-styles-css'  href='https://assafinaonline.com/wp-content/plugins/business-directory-plugin/themes/default/assets/styles.css?ver=4.0.4' type='text/css' media='all' />
<link rel='stylesheet' id='google-fonts-1-css'  href='https://fonts.googleapis.com/css?family=Heebo%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7CArimo%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7CRoboto%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic&#038;ver=5.2.7' type='text/css' media='all' />
<link rel='stylesheet' id='elementor-icons-shared-0-css'  href='https://assafinaonline.com/wp-content/plugins/elementor/assets/lib/font-awesome/css/fontawesome.min.css?ver=5.9.0' type='text/css' media='all' />
<link rel='stylesheet' id='elementor-icons-fa-brands-css'  href='https://assafinaonline.com/wp-content/plugins/elementor/assets/lib/font-awesome/css/brands.min.css?ver=5.9.0' type='text/css' media='all' />
<script type='text/javascript' src='https://assafinaonline.com/wp-includes/js/jquery/jquery.js?ver=1.12.4-wp'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-includes/js/jquery/jquery-migrate.min.js?ver=1.4.1'></script>
<link rel='https://api.w.org/' href='https://assafinaonline.com/wp-json/' />
<link rel="EditURI" type="application/rsd+xml" title="RSD" href="https://assafinaonline.com/xmlrpc.php?rsd" />
<link rel="wlwmanifest" type="application/wlwmanifest+xml" href="https://assafinaonline.com/wp-includes/wlwmanifest.xml" /> 
<meta name="generator" content="WordPress 5.2.7" />
<link rel='shortlink' href='https://assafinaonline.com/?p=101995' />
<link rel="alternate" type="application/json+oembed" href="https://assafinaonline.com/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fassafinaonline.com%2Fabout-us%2F" />
<link rel="alternate" type="text/xml+oembed" href="https://assafinaonline.com/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fassafinaonline.com%2Fabout-us%2F&#038;format=xml" />
<link rel="stylesheet" id="carousel-slider-css" href="https://assafinaonline.com/wp-content/plugins/carousel-slider/assets/css/style.css?ver=1.9.2" type="text/css" media="all">

<script>
jQuery(document).ready(function () {
   // hide the archive image
 if(window.location.pathname.includes('/archives/')){
   jQuery('.entry-thumbnail.post-media.post-image.post-featured-image').hide();
   jQuery('.single-post-wrapper').addClass('archive-post-wrapper');
}

if(window.location.pathname.includes('/category/archives/')){
var $images = jQuery('.ts-grid-box .ts-post-thumb img');
for(var i=0; i<$images.length; i++){
$images[i].src = $images[i].src.replace('-455x300','');
}


}
});

</script>


<script async src="https://www.googletagmanager.com/gtag/js?id=UA-41404890-1"></script>
<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'UA-41404890-1');
</script>


<script data-ad-client="ca-pub-6120438438801314" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<meta name="tec-api-version" content="v1"><meta name="tec-api-origin" content="https://assafinaonline.com"><link rel="https://theeventscalendar.com/" href="https://assafinaonline.com/wp-json/tribe/events/v1/" />      <script>
        window.ajaxurl = "https://assafinaonline.com/wp-admin/admin-ajax.php"
        window.WPBannerize = {
    "General": {
        "impressions_enabled": true,
        "clicks_enabled": true
    },
    "Layout": {
        "top": 0,
        "right": 0,
        "bottom": 0,
        "left": 0
    }
};
      </script>
        <link rel="icon" href="https://assafinaonline.com/wp-content/uploads/favicon-1.ico" sizes="32x32" />
<link rel="icon" href="https://assafinaonline.com/wp-content/uploads/favicon-1.ico" sizes="192x192" />
<link rel="apple-touch-icon-precomposed" href="https://assafinaonline.com/wp-content/uploads/favicon-1.ico" />
<meta name="msapplication-TileImage" content="https://assafinaonline.com/wp-content/uploads/favicon-1.ico" />
		<style type="text/css" id="wp-custom-css">
			.navbar-container .navbar .nav-item a,
.post-cat,
.post-list-item .nav-tabs li a,
.ts-social-list li b,
.widgets.ts-social-list-item ul li a b,
.footer-social li a,
.ts-cat-title span,
.view-link-btn span,
.post-navigation a span,
.post-tab-list .post-tag a,
.footer-standard .elementor-widget-wp-widget-recent-posts ul li a{
  font-family: "Heebo", sans-serif;
}

.vinkmag-breaking-slider .owl-nav{
	right: -34px;
}
.ts-breaking-news p{
	max-height: 25px;
	overflow: hidden;
}

#xs-review-box, form#xs_review_form_public_data, #comments{
	display: none;
}

body{
	background: #f0f1f4 !important;
}

a.view-all-link{
	font-size: 12px;
	margin-right: 5px;
	color: #363367;
}

/*#top-search-button{
	display: none;
}*/

#top-search-button i.icon.icon-search{
	vertical-align: middle;
}

#top-breaking-news{
	max-width: 939px !important;
}

.top-ads-container{
	max-height: 93px !important;
	overflow: hidden !important;
}
.top-ads-container img{
	height: 93px;
	/*max-width: none !important;
	width: 100% !important;*/
}

#top-bottom-menu li.menu-item{
	font-size: 12px;
}

#sidebar-right > #wp-bannerize-widget-2{
	padding: 10px;
}

#sidebar-right > #wp-bannerize-widget-2 > #wp-bannerize-widget-2, #sidebar-right > #wp-bannerize-widget-3 > #wp-bannerize-widget-3{
	padding: 0px;
	box-shadow: none;
}

#sidebar-right > #wp-bannerize-widget-3{
	padding: 10px 0px;
	max-width: 173px;
	margin:10px auto 10px auto !important;
}

#sidebar-right #custom_html-2{
	padding: 0px !important;
	margin: auto !important;
	max-width: 173px;
}

#sidebar-right > #wp-bannerize-widget-4{
    max-width: 173px;
    margin: auto;
    padding: 0px;
    border: 1px solid #f6c501;
}

#sidebar-right > #wp-bannerize-widget-4 #wp-bannerize-widget-4{
	padding: 0px;
}

#sidebar-right .wp_bannerize_container,
#home-side-ads .wp_bannerize_container
{ display: inline}

#sidebar-right .wp_bannerize_banner_box.wp_bannerize_category_side-ads,
#home-side-ads .wp_bannerize_banner_box.wp_bannerize_category_side-ads
{
	width: calc(50% - 10px);
	display: inline-block;
	margin-left: 5px;
	margin-bottom: 5px;
	max-width: 150px;
}

#old-home-side-ads{
	display:none;
}

#facebook_page_plugin_widget-2, #custom_html-2{
	padding: 10px;
}

#tribe-events-content-wrapper, #tribe-events-content{
	margin: 10px auto;
  background: #fff;
  padding: 10px;
  max-width: 1120px;
}

#home-video-section .ts-post-thumb{
    margin-bottom: 0px !important;
    max-height: 195px !important;
    overflow: hidden !important;
}

div.ao-flipbook{
 background-color: #292835;	
}



.post-title, .rp4wp-related-post-content{
	text-align: start !important;
	unicode-bidi: plaintext !important;
}

.post-title *{
	text-align: start !important;
	unicode-bidi: plaintext !important;
}

.post-title > a{
	display:block !important;
}

p{
	text-align: start !important;
	unicode-bidi: plaintext !important;
}

div.breaking-post-content p{
	unicode-bidi: unset !important
}


#post-102052 .nf-field-container{
	float:left;
	width: 46%;
	margin-right: 4%;
	clear: right;
}

#post-102052 .nf-error-msg{
	clear: both;
}

#post-102052 .submit-container
{
	clear: both !important;
}

#post-102052 .recaptcha{
	clear: both;
}


.t_bank_container, .t_cheque_container, .t_western_container{
	display: none;
}

.twitter-timeline-container{
	height: 550px !important;
	overflow-y: scroll !important;
}


#footer-newsletter-form .ts-widget-newsletter{
	background:none !important;
	padding: 0px !important;
}

#footer-newsletter-form .newsletter-introtext{
 display: none !important;	
}

#footer-newsletter-form input[type="email"] {
	  width: 60%;
    float: left;
    background: transparent;
    margin-right: 4%;
		color: #fff;
	  font-size: 15px;
}

#footer-newsletter-form input[type="submit"] {
	  float: left;
    max-width: 36%;
    background: #363367;
	  padding: 11px 27px !important;
}

#footer-newsletter-form .mc4wp-response p {
	color: #fff;
	clear: both;
}

@media only screen and (max-width: 991px){
#top-navigation-container{
	display: none !important;
}
}

.tribe-events-single #tribe-events-footer, .tribe-events-single .tribe-events-back{
	display: none;
}

/* PAGE - CONTACT US */
.ram-crew,
.editors-contributors,
.rep-offices {
	margin-top: 15px;
}
.ram-crew .member,
.editors-contributors .member,
.rep-offices .office {
	border: 1px solid #ebeef1;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ebeef1;
    -webkit-box-shadow: 0 0 4px #ebeef1;
    -moz-box-shadow: 0 0 4px #ebeef1;
}
.ram-crew .member div,
.editors-contributors .member div,
.rep-offices .office div {
    margin-bottom: 5px;
}
.ram-crew .member div:last-child,
.editors-contributors .member div:last-child,
.rep-offices .office div:last-child {
    border-bottom: 0 none;
    margin-bottom: 0;
    padding-bottom: 0;
}
.ram-crew .member .name {
	border-bottom: 1px solid #ebeef1;
    color: #0c1c3c;
    font-size: 14px;
    font-weight: 700;
    padding-bottom: 5px;
}
.editors-contributors .member .name {
	border-bottom: 1px solid #ebeef1;
    color: #777;
    font-size: 14px;
    padding-bottom: 5px;
    font-weight: 500;
}
.ram-crew .member .title,
.editors-contributors .member .title {
	font-size: 14px;
    font-style: italic;
}
.ram-crew .member i,
.editors-contributors .member i,
.rep-offices .office i {
    font-size: 13px;
    color: #0c1c3c;
    margin-right: 3px;
    font-weight: 500;
}
.rep-offices .office .zone {
    font-size: 16px;
    font-weight: 700;
    color: #0c1c3c;
}


/* Maritime Directory */

.wpbdp-main-box .submit-btn input[type="submit"], .wpbdp-with-button-styles .wpbdp-main-links-small .button, .wpbdp-with-button-styles .wpbdp-main-links-medium .wpbdp-main-links .button{
	background: #666;
	color: #fff;
	border:none;
	cursor: pointer;
}



.tribe-events-page-title > a {
	display: none;
}

#most-popular .ts-post-thumb{
	max-height: 146px !important;
	overflow: hidden !important;
}


.featured-post .item
{
	background-size: contain;
	background-repeat: no-repeat;
	background-color:#c2c4cc;
}

.home-dark-widget .featured-post .item {
	background-color: #121524 !important;
}


#top-news-slider .overlay-post-content{
	width: 100%;
}

#top-news-slider .post-title{
	font-size: 25px;
	line-height: 24px
}

.ts-title.title-bg .title-text{
	font-size: 15px;
	font-weight: normal;
}

#wpbdp-listings-list .wpbdp-field-long_business_description {
	display: none;
}

#wpbdp-listings-list .wpbdp-field-long_business_description, 
#wpbdp-listings-list .wpbdp-field-short_business_description {
	display: none;
}


#wpbdp-listings-list .wpbdp-listing-excerpt{
	padding: 10px;
	border-bottom: dotted 1px #ddd;
    float: left;
    width: 50%;
    min-height: 530px;
    overflow: hidden;
    margin-bottom: 10px;
}

#wpbdp-listings-list .wpbdp-listing .listing-thumbnail{
	width: 100%;
	float: none;
	text-align:center;
}

#wpbdp-listings-list .wpbdp-listing .listing-details{
	margin-left: 0px !important;
	width: 100%;
}

#wpbdp-categories ul{
	list-style: none !important;
}

#wpbdp-categories
.wpbdp-categories .cat-item
{
	text-align: center;
	margin: 0 1% 20px;
	width: 48%;
	-webkit-box-shadow: 0 0 3px 0 #cccccc;
box-shadow: 0 0 3px 0 #cccccc;
	padding: 6px 0px;
}

#wpbdp-listings-list .listing-title a{
	font-size: 20px !important;
}

#home-news-section .tabs-item{
	border: 1px solid #121524;
}


#home-videos-grid .boxInner_grid{
	max-height: 120px;
}

#home-videos-grid {
	overflow: hidden;
	max-height: 415px;
	overflow-y: auto;
}

#home-videos-grid .box_grid{
	width: 100% !important;
	padding-bottom: 38% !important;
	max-height: 150px !important;
	visibility: hidden;
	background: #454141;
	border-bottom : 1px solid #fff;
}

#home-videos-grid .wrap_grid{
	margin: 0px !important;
}

#home-videos-grid .titleBox {
	font-family: "Heebo", sans-serif !important;
	font-size: 14px !important;
	color: #fff !important;
	width: calc(100% - 136px);
	float: left;
	position: relative;
	background: none;
	max-height: unset !important;
	margin-top: 6px;
	text-align: start !important;
	unicode-bidi: plaintext !important;
}

#home-videos-grid .boxInner_grid img{
	max-height: 100% !important;
	float: left;
	clear:none; 
	position: relative;
	width: 135px;
	margin-top: 6px;
}

#home-videos-grid .playbtnCss{
	background-image: none !important;
}

#home-videos-grid .playbtnCss::before {
    content: '\f144';
    font-family: 'Fontawesome';
    color: #ff0000;
    font-size: 40px;
    position: absolute;
    left: 5px;
    bottom: 10px;
	  background:#fff;
		border-radius: 100%;
	
}


@media only screen and (min-width: 768px){
	.entry-content > *, .entry .entry-summary > *
{
	margin:0px;
}
	.heateor_sss_sharing_container.heateor_sss_horizontal_sharing{		
 margin-bottom: 20px;		
	}
}

.entry-thumbnail.post-media.post-image.post-featured-image{
	text-align: center;
}


.archive-post-wrapper .entry-content{
	margin-bottom: 100px;
	position: relative;
}

.archive-post-wrapper .heateor_sss_sharing_container.heateor_sss_horizontal_sharing
{
	position: absolute;
	bottom: -100px;
}

.archive-post-wrapper .post-meta-info{
	margin-bottom: 0px !important;
}

.archive-post-wrapper .clearfix.mb-30{
	margin: 0px !important;
}


.default-content .read-more-btn{
	background: #363367 !important;
}

#home-maritime-host .post-content p, #home-opinion .post-content p{
	display:none !important;
}

#home-martime-host .post-title.md{
	line-height: 20px !important;
}

#home-opinion .post-title.md{
	font-size: 16px !important;
}

#home-opinion{
	border-bottom: 1px solid #ccc;
}


a.tribe-events-ical.tribe-events-button{
	display: none !important;
}


body.events-category-training-courses .tribe-event-date-start, body.events-category-training-courses .tribe-event-date-end{
    background: #d6d6d6;
    padding: 5px;
    border-radius: 6px;
	  color: #000;
}


.mobile-sideads-placeholder{
	display: none;
}


#golden-sponsor-col{
	max-width: 193.8px;
	margin: auto;
}

@media only screen and (max-width: 768px){
	
ul.ekit-has-submenu{
	width: auto !important;
	display: block !important;
}
	
	#home-side-ads{
		display: none;
	}
	
.mobile-sideads-placeholder{
	width: calc(100% - 0px) !important;
	padding: 10px !important;
	background: #fff !important;
	margin-bottom: 20px;
	display: block !important;
}

#mobile-sideads-1{
	margin-bottom: 42px !important;
}

.mobile-sideads-placeholder > div{
	width: 50%;
	float: left;
	text-align: center;
	height: 160px;
}

	.ts-breaking-news .breaking-news-content p, .breaking-news-content .owl-stage-outer{
		max-height: none !important;
	}
	
	.ts-breaking-news .breaking-news-content{
		width: 95% !important;
	}
	
}

#breaking-news-container .owl-nav{
	display: initial !important;
}

#breaking-news-container .owl-nav.disabled button{
	background: #ccc;
}

.post-views{
	display: none !important;
}

.rp4wp-related-post-image img{
	max-height: 108px;
	width: auto;
}

.rp4wp-related-post-image{
	width: 26%;
}

.rp4wp-related-posts ul>li{
	padding: 15px 0px !important;
	border-bottom: 1px solid #ccc;
}

h2.breaking-title{
 min-width: 136px;	
}

.breaking-news-content .owl-stage-outer{
	max-width: 672.8px;
	max-height: 26px;
}

/*
#home-news-section .tabs-item .post-list-box .nav-link {
	border-bottom: 1px solid #121524;
}
*/
/*
.single-post-ad{
	display: none;
}

#golden-sponsor-col>div{
    max-width: 219px !important;
    margin: 10px auto !important;
    padding: inherit !important;
	}*/		</style>
		</head>
<body class="page-template-default page page-id-101995 tribe-no-js ekit-hf-header ekit-hf-footer ekit-hf-template-vinkmag ekit-hf-stylesheet-vinkmag-child body-inner-content box-shadow-enebled sidebar-active light wpbdp-with-button-styles elementor-default">
	<div id="preloader" class="hidden">
		<div class="spinner">
			<div class="double-bounce1"></div>
			<div class="double-bounce2"></div>
		</div>
		<div class="preloader-cancel-btn-wraper">
			<a href="" class="btn btn-primary preloader-cancel-btn">
				Cancel Preloader			</a>
		</div>
	</div>
	
			<header id="ekit-header">
					<div data-elementor-type="wp-post" data-elementor-id="4707" class="elementor elementor-4707" data-elementor-settings="[]">
			<div class="elementor-inner">
				<div class="elementor-section-wrap">
							<nav class="elementor-element elementor-element-b425bbb elementor-section-stretched elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section elementor-top-section" data-id="b425bbb" data-element_type="section" id="top-navigation-container" data-settings="{&quot;stretch_section&quot;:&quot;section-stretched&quot;,&quot;background_background&quot;:&quot;classic&quot;}">
						<div class="elementor-container elementor-column-gap-default">
				<div class="elementor-row">
				<div class="elementor-element elementor-element-324c6dd elementor-column elementor-col-33 elementor-top-column" data-id="324c6dd" data-element_type="column">
			<div class="elementor-column-wrap  elementor-element-populated">
					<div class="elementor-widget-wrap">
				<div class="elementor-element elementor-element-98ffa3d elementor-widget elementor-widget-ekit-nav-menu" data-id="98ffa3d" data-element_type="widget" id="assafina-top-menu" data-widget_type="ekit-nav-menu.default">
				<div class="elementor-widget-container">
			<div id="ekit-megamenu-top-menu" class="ekit-menu-container ekit-menu-po-left"><ul id="main-menu" class="ekit-menu ekit-menu-simple ekit-menu-init"><li id="menu-item-101997" class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-101995 current_page_item menu-item-101997 nav-item active"><a href="https://assafinaonline.com/about-us/" class="ekit-menu-nav-link active">About Us</a></li>
<li id="menu-item-101974" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-101974 nav-item"><a href="https://assafinaonline.com/category/archives/" class="ekit-menu-nav-link">Archive</a></li>
<li id="menu-item-102202" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-102202 nav-item"><a href="https://assafinaonline.com/files/media-plan-2020.pdf" class="ekit-menu-nav-link">Media Plan</a></li>
<li id="menu-item-102081" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-102081 nav-item"><a href="https://assafinaonline.com/subscription-form/" class="ekit-menu-nav-link">Subscribe Here</a></li>
<li id="menu-item-102009" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-102009 nav-item"><a href="https://assafinaonline.com/media-plan/" class="ekit-menu-nav-link">Advertise With Us</a></li>
<li id="menu-item-14902" class="popmake-102102 menu-item menu-item-type-custom menu-item-object-custom menu-item-14902 nav-item"><a href="#" class="ekit-menu-nav-link">Join Our Newsletter</a></li>
<li id="menu-item-14903" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14903 nav-item"><a href="/my-account" class="ekit-menu-nav-link">Login</a></li>
</ul>
        <div class="nav-identity-panel">
            <button class="menu-close" type="button">X</button>
        </div>
        </div>		</div>
				</div>
						</div>
			</div>
		</div>
				<div class="elementor-element elementor-element-07ab9f8 elementor-column elementor-col-33 elementor-top-column" data-id="07ab9f8" data-element_type="column">
			<div class="elementor-column-wrap  elementor-element-populated">
					<div class="elementor-widget-wrap">
				<div class="elementor-element elementor-element-2cab84f elementor-shape-circle elementor-widget elementor-widget-social-icons" data-id="2cab84f" data-element_type="widget" data-widget_type="social-icons.default">
				<div class="elementor-widget-container">
					<div class="elementor-social-icons-wrapper">
							<a href="https://www.facebook.com/Robban.Assafina.Magazine/" class="elementor-icon elementor-social-icon elementor-social-icon-facebook-f elementor-repeater-item-8fdb0ad" target="_blank">
					<span class="elementor-screen-only">Facebook-f</span>
					<i class="fab fa-facebook-f"></i>				</a>
							<a href="https://twitter.com/robbanassafina" class="elementor-icon elementor-social-icon elementor-social-icon-twitter elementor-repeater-item-a788e00" target="_blank">
					<span class="elementor-screen-only">Twitter</span>
					<i class="fab fa-twitter"></i>				</a>
							<a href="https://www.linkedin.com/company/robban-assafina-magazine/" class="elementor-icon elementor-social-icon elementor-social-icon-linkedin elementor-repeater-item-09e8927" target="_blank">
					<span class="elementor-screen-only">Linkedin</span>
					<i class="fab fa-linkedin"></i>				</a>
							<a href="https://www.instagram.com/robbanassafina/" class="elementor-icon elementor-social-icon elementor-social-icon-instagram elementor-repeater-item-98e848f" target="_blank">
					<span class="elementor-screen-only">Instagram</span>
					<i class="fab fa-instagram"></i>				</a>
							<a href="https://www.youtube.com/channel/UC56c0oRrWdxUIgUbL7qRNKA" class="elementor-icon elementor-social-icon elementor-social-icon-youtube elementor-repeater-item-2f01641" target="_blank">
					<span class="elementor-screen-only">Youtube</span>
					<i class="fab fa-youtube"></i>				</a>
					</div>
				</div>
				</div>
						</div>
			</div>
		</div>
				<div class="elementor-element elementor-element-6f29f2b elementor-column elementor-col-33 elementor-top-column" data-id="6f29f2b" data-element_type="column">
			<div class="elementor-column-wrap  elementor-element-populated">
					<div class="elementor-widget-wrap">
				<div class="elementor-element elementor-element-0efe11a elementor-widget elementor-widget-vinazine-date" data-id="0efe11a" data-element_type="widget" data-widget_type="vinazine-date.default">
				<div class="elementor-widget-container">
			        <div class="vinkmag-date">
            <div class="ts-date-item">
                    <i class="fa fa-clock-o"></i>
                July 16, 2020            </div>
        </div>

    		</div>
				</div>
						</div>
			</div>
		</div>
						</div>
			</div>
		</nav>
				<section class="elementor-element elementor-element-fb0360f elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section elementor-top-section" data-id="fb0360f" data-element_type="section">
						<div class="elementor-container elementor-column-gap-default">
				<div class="elementor-row">
				<div class="elementor-element elementor-element-b5a7a60 elementor-column elementor-col-50 elementor-top-column" data-id="b5a7a60" data-element_type="column">
			<div class="elementor-column-wrap  elementor-element-populated">
					<div class="elementor-widget-wrap">
				<div class="elementor-element elementor-element-a71c8cb top-ads-container elementor-widget elementor-widget-wp-widget-wp-bannerize-widget" data-id="a71c8cb" data-element_type="widget" data-widget_type="wp-widget-wp-bannerize-widget.default">
				<div class="elementor-widget-container">
			      <div class="wp_bannerize_container wp_bannerize_layout_vertical">      <div class="wp_bannerize_banner_box wp_bannerize_category_top-banner-1"
           style=""
           data-title="Musasino Co Ltd"
           data-mime_type="image-gif"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="115118"
           id="wpbanner-115118">
          <a href="https://www.musasino.biz/product/lax" target="_blank" ><img border="0" width="550" height="93" src="https://assafinaonline.com/wp-content/uploads/MUSASINO-BANNER.gif" alt="Musasino Co Ltd" title="Musasino Co Ltd" /></a>      </div>
        </div>		</div>
				</div>
						</div>
			</div>
		</div>
				<div class="elementor-element elementor-element-4d6edf5 elementor-column elementor-col-50 elementor-top-column" data-id="4d6edf5" data-element_type="column">
			<div class="elementor-column-wrap  elementor-element-populated">
					<div class="elementor-widget-wrap">
				<div class="elementor-element elementor-element-71b37b8 top-ads-container elementor-widget elementor-widget-wp-widget-wp-bannerize-widget" data-id="71b37b8" data-element_type="widget" data-widget_type="wp-widget-wp-bannerize-widget.default">
				<div class="elementor-widget-container">
			      <div class="wp_bannerize_container wp_bannerize_layout_horizontal"></div>		</div>
				</div>
						</div>
			</div>
		</div>
						</div>
			</div>
		</section>
				<section class="elementor-element elementor-element-dda70da elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section elementor-top-section" data-id="dda70da" data-element_type="section">
						<div class="elementor-container elementor-column-gap-default">
				<div class="elementor-row">
				<div class="elementor-element elementor-element-9e698c9 elementor-column elementor-col-100 elementor-top-column" data-id="9e698c9" data-element_type="column">
			<div class="elementor-column-wrap  elementor-element-populated">
					<div class="elementor-widget-wrap">
				<div class="elementor-element elementor-element-4fe20e7 top-ads-container elementor-widget elementor-widget-wp-widget-wp-bannerize-widget" data-id="4fe20e7" data-element_type="widget" data-widget_type="wp-widget-wp-bannerize-widget.default">
				<div class="elementor-widget-container">
			      <div class="wp_bannerize_container wp_bannerize_layout_horizontal"></div>		</div>
				</div>
						</div>
			</div>
		</div>
						</div>
			</div>
		</section>
				<div class="elementor-element elementor-element-db713a0 elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section elementor-top-section" data-id="db713a0" data-element_type="section">
						<div class="elementor-container elementor-column-gap-default">
				<div class="elementor-row">
				<div class="elementor-element elementor-element-7c5e902 elementor-column elementor-col-50 elementor-top-column" data-id="7c5e902" data-element_type="column" id="top-breaking-news">
			<div class="elementor-column-wrap  elementor-element-populated">
					<div class="elementor-widget-wrap">
				<div class="elementor-element elementor-element-827d71b elementor-widget elementor-widget-vinazine-breaking-slider-post" data-id="827d71b" data-element_type="widget" id="breaking-news-container" data-widget_type="vinazine-breaking-slider-post.default">
				<div class="elementor-widget-container">
			      			<div class="ts-breaking-news media breaking-sliders-item">
					<h2 class="breaking-title">
						<i class="fa fa-bolt"></i> Breaking News :</h2>
					<div class="breaking-news-content owl-carousel media-body vinkmag-breaking-slider">
														<div class="breaking-post-content">
									<p>
										<a href="https://assafinaonline.com/uncategorized/%d8%b1%d9%88%d9%8a%d8%aa%d8%b1%d8%b2-%d9%86%d9%82%d9%84%d8%a7-%d8%b9%d9%86-%d9%85%d8%b5%d8%a7%d8%af%d8%b1-%d8%a5%d9%8a%d8%b1%d8%a7%d9%86%d9%8a%d8%a9-%d8%a7%d9%86%d8%af%d9%84%d8%a7%d8%b9-%d8%ad%d8%b1-2/">رويترز نقلا عن مصادر إيرانية: اندلاع حريق في ميناء بوشهر بجنوب إيران واشتعال النيران في ثلاث سفن على الأقل</a>
									</p>
								</div>
											</div>
				</div>

    		</div>
				</div>
				<section class="elementor-element elementor-element-3819586 elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section elementor-inner-section" data-id="3819586" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
						<div class="elementor-container elementor-column-gap-default">
				<div class="elementor-row">
				<div class="elementor-element elementor-element-01bb54c elementor-column elementor-col-66 elementor-inner-column" data-id="01bb54c" data-element_type="column">
			<div class="elementor-column-wrap  elementor-element-populated">
					<div class="elementor-widget-wrap">
				<div class="elementor-element elementor-element-28c9a5f elementor-widget elementor-widget-ekit-nav-menu" data-id="28c9a5f" data-element_type="widget" data-widget_type="ekit-nav-menu.default">
				<div class="elementor-widget-container">
			<div id="ekit-megamenu-assafina-main-menu" class="ekit-menu-container ekit-menu-po-left"><ul id="main-menu" class="ekit-menu ekit-menu-simple ekit-menu-init"><li id="menu-item-14873" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-14873 nav-item"><a href="https://assafinaonline.com/" class="ekit-menu-nav-link">Home</a></li>
<li id="menu-item-14872" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-14872 nav-item ekit-menu-dropdown"><a href="https://assafinaonline.com/category/maritime-news/" class="ekit-menu-nav-link ekit-menu-dropdown-toggle">Maritime News</a>
<ul class="ekit-has-submenu">
	<li id="menu-item-14883" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-14883 nav-item"><a href="https://assafinaonline.com/category/maritime-news/assafina-news/shipping/" class=" dropdown-item">Shipping</a>	<li id="menu-item-14885" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-14885 nav-item"><a href="https://assafinaonline.com/category/maritime-news/assafina-news/ports-2/" class=" dropdown-item">Ports</a>	<li id="menu-item-14876" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-14876 nav-item"><a href="https://assafinaonline.com/category/maritime-news/assafina-news/shipbuilding-2/" class=" dropdown-item">Shipbuilding</a>	<li id="menu-item-14886" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-14886 nav-item"><a href="https://assafinaonline.com/category/maritime-news/assafina-news/offshore-2/" class=" dropdown-item">Offshore</a>	<li id="menu-item-14887" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-14887 nav-item"><a href="https://assafinaonline.com/category/maritime-news/assafina-news/classification/" class=" dropdown-item">Classification Societies</a>	<li id="menu-item-14888" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-14888 nav-item"><a href="https://assafinaonline.com/category/maritime-news/assafina-news/insurance/" class=" dropdown-item">Insurance</a></ul>
</li>
<li id="menu-item-14891" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-14891 nav-item ekit-menu-dropdown"><a href="#" class="ekit-menu-nav-link ekit-menu-dropdown-toggle">Assafina Insight</a>
<ul class="ekit-has-submenu">
	<li id="menu-item-102166" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-102166 nav-item"><a href="https://assafinaonline.com/category/edition-story/" class=" dropdown-item">Edition Story</a>	<li id="menu-item-102167" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-102167 nav-item"><a href="https://assafinaonline.com/category/maritime-studies/" class=" dropdown-item">Maritime Studies</a>	<li id="menu-item-102168" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-102168 nav-item"><a href="https://assafinaonline.com/category/writers-contributors/" class=" dropdown-item">Writers &#038; Contributors</a>	<li id="menu-item-102169" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-102169 nav-item"><a href="https://assafinaonline.com/category/assafina-case/" class=" dropdown-item">Assafina Case</a>	<li id="menu-item-102172" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-102172 nav-item"><a href="https://assafinaonline.com/maritime-app/" class=" dropdown-item">Maritime App</a></ul>
</li>
<li id="menu-item-102108" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-102108 nav-item"><a href="/events/category/training-courses/" class="ekit-menu-nav-link">Training Courses</a></li>
<li id="menu-item-14897" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14897 nav-item"><a href="/events/category/events/" class="ekit-menu-nav-link">Events</a></li>
<li id="menu-item-102173" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-102173 nav-item"><a href="https://assafinaonline.com/maritime-directory/" class="ekit-menu-nav-link">Maritime Directory</a></li>
<li id="menu-item-102128" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-102128 nav-item"><a href="https://assafinaonline.com/contact-us/" class="ekit-menu-nav-link">Contact Us</a></li>
</ul>
        <div class="nav-identity-panel">
            <button class="menu-close" type="button">X</button>
        </div>
        </div>		</div>
				</div>
						</div>
			</div>
		</div>
				<div class="elementor-element elementor-element-3fd4697 elementor-column elementor-col-33 elementor-inner-column" data-id="3fd4697" data-element_type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
			<div class="elementor-column-wrap  elementor-element-populated">
					<div class="elementor-widget-wrap">
				<div class="elementor-element elementor-element-9fff1db elementor-widget elementor-widget-vinazine-nav-search" data-id="9fff1db" data-element_type="widget" id="top-search-button" data-widget_type="vinazine-nav-search.default">
				<div class="elementor-widget-container">
			        <div class="header-search-icon">
           
            <a href="#modal-popup-2" class="navsearch-button nav-search-button xs-modal-popup"><i class="icon icon-search"></i></a>
        </div>
 

            	<!-- xs modal -->
<div class="zoom-anim-dialog mfp-hide modal-searchPanel ts-search-form" id="modal-popup-2">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="xs-search-panel">
                  
	<form  method="get" action="https://assafinaonline.com/" class="vinkmag-serach">
		<div class="input-group">
			<input class="form-control text-center" type="search" name="s" placeholder="Type and hit ENTER" value="">
			<div class="input-group-append">
				<span class="nav-search-close-button header-search-btn-toggle d-none" tabindex="0">✕</span>
			</div>
		</div>
	</form>
	            </div>
        </div>
    </div>
</div><!-- End xs modal --><!-- end language switcher strart -->
    		</div>
				</div>
						</div>
			</div>
		</div>
						</div>
			</div>
		</section>
						</div>
			</div>
		</div>
				<div class="elementor-element elementor-element-34642d7 elementor-column elementor-col-50 elementor-top-column" data-id="34642d7" data-element_type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
			<div class="elementor-column-wrap  elementor-element-populated">
					<div class="elementor-widget-wrap">
				<div class="elementor-element elementor-element-85aa2e2 elementor-widget elementor-widget-vinazine-logo" data-id="85aa2e2" data-element_type="widget" data-widget_type="vinazine-logo.default">
				<div class="elementor-widget-container">
			    <div class="vinkmag-widget-logo">
        <a href="https://assafinaonline.com/">
            <img src="//assafinaonline.com/new/wp-content/uploads/logo-2.png" alt="Robban Assafina &#8211; MENA Maritime Shipping, Ships &amp; Marine Technology Magazine &#8211; مجلّة ربّان السفينة">
        </a>
    </div>

    		</div>
				</div>
						</div>
			</div>
		</div>
						</div>
			</div>
		</div>
						</div>
			</div>
		</div>
				</header>

	
   
<!-- single post start -->
<div id="content">
    <div class="container">
        <div class="row">
            <div class="col-lg-9">
                <div class="single-post-wrapper">
                    <ol class="breadcrumb"><li><a href="https://assafinaonline.com">Home</a></li> <li>About Us</li></ol>                    <div class="ts-grid-box vinkmag-single content-wrapper">
                        <div class="entry-header">
 

    <h1 class="post-title lg">About Us</h1>
        </div>                        <div class="post-content-area">
                                                        <article id="post-101995" class=" post-details post-101995 page type-page status-publish hentry">
	<div class="post-body clearfix">
		<!-- Article content -->
		<div class="entry-content clearfix">
			<div class='heateorSssClear'></div><div  class='heateor_sss_sharing_container heateor_sss_horizontal_sharing' heateor-sss-data-href='https://assafinaonline.com/about-us/'><div class='heateor_sss_sharing_title' style="font-weight:bold" >Share</div><ul class="heateor_sss_sharing_ul"><li class="heateorSssSharingRound"><i style="width:35px;height:35px;border-radius:999px;" alt="Facebook" Title="Facebook" class="heateorSssSharing heateorSssFacebookBackground" onclick='heateorSssPopup("https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fassafinaonline.com%2Fabout-us%2F")'><ss style="display:block;border-radius:999px;" class="heateorSssSharingSvg heateorSssFacebookSvg"></ss></i></li><li class="heateorSssSharingRound"><i style="width:35px;height:35px;border-radius:999px;" alt="Twitter" Title="Twitter" class="heateorSssSharing heateorSssTwitterBackground" onclick='heateorSssPopup("http://twitter.com/intent/tweet?text=About%20Us&url=https%3A%2F%2Fassafinaonline.com%2Fabout-us%2F")'><ss style="display:block;border-radius:999px;" class="heateorSssSharingSvg heateorSssTwitterSvg"></ss></i></li><li class="heateorSssSharingRound"><i style="width:35px;height:35px;border-radius:999px;" alt="Linkedin" Title="Linkedin" class="heateorSssSharing heateorSssLinkedinBackground" onclick='heateorSssPopup("http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fassafinaonline.com%2Fabout-us%2F&title=About%20Us")'><ss style="display:block;border-radius:999px;" class="heateorSssSharingSvg heateorSssLinkedinSvg"></ss></i></li><li class="heateorSssSharingRound"><i style="width:35px;height:35px;border-radius:999px;" alt="Whatsapp" Title="Whatsapp" class="heateorSssSharing heateorSssWhatsappBackground"><a  href="https://web.whatsapp.com/send?text=About%20Us https%3A%2F%2Fassafinaonline.com%2Fabout-us%2F" rel="nofollow noopener" target="_blank"><ss style="display:block" class="heateorSssSharingSvg heateorSssWhatsappSvg"></ss></a></i></li><li class="heateorSssSharingRound"><i style="width:35px;height:35px;border-radius:999px;" title="More" alt="More" class="heateorSssSharing heateorSssMoreBackground" onclick="heateorSssMoreSharingPopup(this, 'https://assafinaonline.com/about-us/', 'About%20Us', '' )" ><ss style="display:block" class="heateorSssSharingSvg heateorSssMoreSvg"></ss></i></li></ul><div class="heateorSssClear"></div></div><div class='heateorSssClear'></div>
<p>Robban Assafina is a bimonthly Middle Eastern Arabic/English Magazine Specialized in Maritime Shipping, Ships, Offshore and Marine Technology. Published in Lebanon by Oceanic Spark Sarl, with a specialized crew of Maritime Experts, Masters &amp; Engineers, who focus directly on shipbuilding, ships, ports, yachts, and everything related to the world of Marine Navigation, Communication and Machineries.</p>



<h3>Our Objectives</h3>



<p style="text-align:left">While keeping a keen eye on Maritime Navigation, Communication, Shipbuilding, Ports, Machinery&#8217;s, Marine Insurance, and Yachts, Robban Assafina targets the Shipping Industry from all fronts through direct contact with Ship owners, Managers, Operators, Shipbuilders, Maritime Corporations and Agencies as well as Manufacturers, Marine Services and Insurance Firms, Flag State Maritime Administrations all the way down to the common Seafarers.</p>



<hr class="wp-block-separator is-style-wide"/>



<h3 style="text-align:right">من نحن</h3>



<p style="text-align:right; direction: rtl;">من عالم البحار الحاضر والغائب في آن معا، إنطلقت مجلة &#8220;ربان السفينة&#8221; لتبحر بشكل دوري كل شهرين في قطاع النقل البحري الذي يعد من أهم الصناعات الدولية في العالم، إذ يغطّي أكثر من 90 في المائة من التجارة العالمية ما يجعل من التجارة البحرية شريان الحياة للإقتصاد العالمي</p>



<p style="text-align:right">&#8220;ربان السفينة&#8221; هي المجلة المتخصصة الأولى في العالم العربي بقطاع النقل البحري والسفن والتكنولوجيا البحرية والتي تصدر باللغة العربية والإنكليزية، معتمدة في ذلك على طاقم متخصّص من الخبراء والربابنة والمهندسين البحريين، ليلقوا الضوء على صناعة النقل البحري والسفن واليخوت، والمرافئ، وكل ما هو متعلق بهذا العالم من أجهزة ملاحية وإتصالات بحرية</p>



<p style="text-align:right">تواكب &#8220;ربان السفينة&#8221; عن قرب كل جديد في معدات سلامة الأرواح ومكافحة الحرائق، وتستفهم عن كل المستجدات الخاصة بالمحركات البحرية وأحواض بناء السفن، وكذلك أوضاع التأمين والشحن البحري. ومن خلال زياراتها الميدانية للموانئ، وعلى متن السفن البحرية، نتوجه مباشرة الى المعلومة الدقيقة من مصادرها الموثوقة وخبرائها، الذين قضوا سنوات طويلة في هذا العالم الواسع</p>



<p style="text-align:right">تتواجد &#8220;ربان السفينة&#8221; في المكتبات العربية وترسو في المؤتمرات والمعارض البحرية الإقليمية والدولية لمتابعة تطورات الأسواق والقطاعات والصناعات البحرية، بهدف مواكبة ما هو جديد فيها من تكنولوجيا وعمليات تجارية وصفقات</p>



<p style="text-align:right">&#8220;ربان السفينة&#8221; هي الناقل والمسوّق الرئيسي لمختلف صناعات ومنتوجات وشؤون قطاع النقل البحري العربي والدولي، وبلغة الضاد تستحدث صلة وصل بين مختلف قطاعات هذا المجال لتحقيق منافسة لقطاع النقل البحري العالمي، عبر الإستفادة من الموقع الاستراتيجي للعالم العربي</p>
<div class='heateor_sss_sharing_container heateor_sss_vertical_sharing heateor_sss_bottom_sharing' style='width:44px;left: -10px;top: 100px;-webkit-box-shadow:none;box-shadow:none;' heateor-sss-data-href='https://assafinaonline.com/about-us/'><ul class="heateor_sss_sharing_ul"><li class=""><i style="width:40px;height:40px;margin:0;" alt="Facebook" Title="Facebook" class="heateorSssSharing heateorSssFacebookBackground" onclick='heateorSssPopup("https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fassafinaonline.com%2Fabout-us%2F")'><ss style="display:block;" class="heateorSssSharingSvg heateorSssFacebookSvg"></ss></i></li><li class=""><i style="width:40px;height:40px;margin:0;" alt="Twitter" Title="Twitter" class="heateorSssSharing heateorSssTwitterBackground" onclick='heateorSssPopup("http://twitter.com/intent/tweet?text=About%20Us&url=https%3A%2F%2Fassafinaonline.com%2Fabout-us%2F")'><ss style="display:block;" class="heateorSssSharingSvg heateorSssTwitterSvg"></ss></i></li><li class=""><i style="width:40px;height:40px;margin:0;" alt="Linkedin" Title="Linkedin" class="heateorSssSharing heateorSssLinkedinBackground" onclick='heateorSssPopup("http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fassafinaonline.com%2Fabout-us%2F&title=About%20Us")'><ss style="display:block;" class="heateorSssSharingSvg heateorSssLinkedinSvg"></ss></i></li><li class=""><i style="width:40px;height:40px;margin:0;" alt="Whatsapp" Title="Whatsapp" class="heateorSssSharing heateorSssWhatsappBackground"><a  href="https://web.whatsapp.com/send?text=About%20Us https%3A%2F%2Fassafinaonline.com%2Fabout-us%2F" rel="nofollow noopener" target="_blank"><ss style="display:block" class="heateorSssSharingSvg heateorSssWhatsappSvg"></ss></a></i></li><li class=""><i style="width:40px;height:40px;margin:0;" title="More" alt="More" class="heateorSssSharing heateorSssMoreBackground" onclick="heateorSssMoreSharingPopup(this, 'https://assafinaonline.com/about-us/', 'About%20Us', '' )" ><ss style="display:block" class="heateorSssSharingSvg heateorSssMoreSvg"></ss></i></li></ul><div class="heateorSssClear"></div></div>		</div> <!-- end entry-content -->
    </div> <!-- end post-body -->
</article>                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="col-lg-3">
                <!--TODO!-->
<div id="sidebar-right" class="right-sidebar">
    <div id="custom_html-2" class="widget_text widgets ts-grid-box widget_custom_html"><div class="textwidget custom-html-widget"><div id="golden-sponsor-sidebar" style="
    background-image: linear-gradient(180deg, #ffe860 0%, #f6c501 100%);
    background-color: transparent;
    text-align: center;
    font-weight: bold;
    color: #fff;
    padding: 6px 0px;">
 <h2 style="font-size: 19px; margin: 0px;">Golden Sponsors</h2>
</div></div></div><div id="wp-bannerize-widget-4" class="widgets ts-grid-box widget_wp-bannerize-widget"><div id="wp-bannerize-widget-4" class="widgets ts-grid-box widget_wp-bannerize-widget">      <div class="wp_bannerize_container wp_bannerize_layout_vertical">      <div class="wp_bannerize_banner_box wp_bannerize_category_golden-sponsor-1"
           style=""
           data-title="Qterminals"
           data-mime_type="image-jpeg"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="104052"
           id="wpbanner-104052">
          <a href="http://qterminals.com" target="_blank" ><img border="0" width="158" height="150" src="https://assafinaonline.com/wp-content/uploads/qterminals-banner-2020.jpg" alt="Qterminals" title="Qterminals" /></a>      </div>
        </div></div></div><div id="wp-bannerize-widget-3" class="widgets ts-grid-box widget_wp-bannerize-widget"><div id="wp-bannerize-widget-3" class="widgets ts-grid-box widget_wp-bannerize-widget">      <div class="wp_bannerize_container wp_bannerize_layout_vertical">      <div class="wp_bannerize_banner_box wp_bannerize_category_golden-sponsor-2"
           style=""
           data-title="ClassNK"
           data-mime_type="image-gif"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="101902"
           id="wpbanner-101902">
          <a href="http://www.classnk.or.jp/hp/en/index.html" target="_blank" ><img border="0" width="158" height="261" src="https://assafinaonline.com//wp-content/uploads/golden-sponsor-2.gif" alt="ClassNK" title="ClassNK" /></a>      </div>
        </div></div></div><div id="wp-bannerize-widget-2" class="widgets ts-grid-box widget_wp-bannerize-widget"><div id="wp-bannerize-widget-2" class="widgets ts-grid-box widget_wp-bannerize-widget">      <div class="wp_bannerize_container wp_bannerize_layout_vertical">      <div class="wp_bannerize_banner_box wp_bannerize_category_side-ads"
           style=""
           data-title="19-Marcap"
           data-mime_type="image-jpeg"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="101872"
           id="wpbanner-101872">
          <a href="https://www.marcap.ae/" target="_blank" ><img border="0" width="165" height="146" src="https://assafinaonline.com//wp-content/uploads/10-marcap.jpg" alt="19-Marcap" title="19-Marcap" /></a>      </div>
              <div class="wp_bannerize_banner_box wp_bannerize_category_side-ads"
           style=""
           data-title="18-Rozmarine For Safety"
           data-mime_type="image-jpeg"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="101875"
           id="wpbanner-101875">
          <a href="http://www.rozmarine.net/" target="_blank" ><img border="0" width="165" height="150" src="https://assafinaonline.com//wp-content/uploads/Rozmarine-For-Safety-Banner.jpg" alt="18-Rozmarine For Safety" title="18-Rozmarine For Safety" /></a>      </div>
              <div class="wp_bannerize_banner_box wp_bannerize_category_side-ads"
           style=""
           data-title="10-Shipyard Famagusta Cyprus"
           data-mime_type="image-jpeg"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="101878"
           id="wpbanner-101878">
          <a href="http://www.shipyardcyprus.com/index.html" target="_blank" ><img border="0" width="165" height="150" src="https://assafinaonline.com//wp-content/uploads/12-shipyard-famagusta.jpg" alt="10-Shipyard Famagusta Cyprus" title="10-Shipyard Famagusta Cyprus" /></a>      </div>
              <div class="wp_bannerize_banner_box wp_bannerize_category_side-ads"
           style=""
           data-title="17-Pacific Light Shipping"
           data-mime_type="image-jpeg"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="101881"
           id="wpbanner-101881">
          <a href="https://pacificlightshipping.com/" target="_blank" ><img border="0" width="165" height="128" src="https://assafinaonline.com//wp-content/uploads/04-pacific-light-shipping.jpg" alt="17-Pacific Light Shipping" title="17-Pacific Light Shipping" /></a>      </div>
              <div class="wp_bannerize_banner_box wp_bannerize_category_side-ads"
           style=""
           data-title="4-IRS Class"
           data-mime_type="image-gif"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="104055"
           id="wpbanner-104055">
          <a href="http://irclass.org" target="_blank" ><img border="0" width="165" height="150" src="https://assafinaonline.com/wp-content/uploads/IRS-Banner-for-Check_2-secs.gif" alt="4-IRS Class" title="4-IRS Class" /></a>      </div>
              <div class="wp_bannerize_banner_box wp_bannerize_category_side-ads"
           style=""
           data-title="9-Cygnus Instruments Ltd"
           data-mime_type="image-gif"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="104058"
           id="wpbanner-104058">
          <a href="https://bit.ly/3g2xQR2" target="_blank" ><img border="0" width="165" height="150" src="https://assafinaonline.com/wp-content/uploads/Cygnus-ROBBAN-ASAAFINA-eNews-banner-June20.gif" alt="9-Cygnus Instruments Ltd" title="9-Cygnus Instruments Ltd" /></a>      </div>
              <div class="wp_bannerize_banner_box wp_bannerize_category_side-ads"
           style=""
           data-title="11-Turbo CADIZ"
           data-mime_type="image-jpeg"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="104062"
           id="wpbanner-104062">
          <a href="http://turbocadiz.com" target="_blank" ><img border="0" width="165" height="150" src="https://assafinaonline.com/wp-content/uploads/Turbo-CADIZ-banner.jpg" alt="11-Turbo CADIZ" title="11-Turbo CADIZ" /></a>      </div>
              <div class="wp_bannerize_banner_box wp_bannerize_category_side-ads"
           style=""
           data-title="2-Kuwait Port Authority"
           data-mime_type="image-jpeg"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="104674"
           id="wpbanner-104674">
          <a href="http://www.kpa.gov.kw" target="_blank" ><img border="0" width="165" height="150" src="https://assafinaonline.com/wp-content/uploads/kpa-banner.jpg" alt="2-Kuwait Port Authority" title="2-Kuwait Port Authority" /></a>      </div>
              <div class="wp_bannerize_banner_box wp_bannerize_category_side-ads"
           style=""
           data-title="3-UZMAR"
           data-mime_type="image-gif"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="101828"
           id="wpbanner-101828">
          <a href="http://uzmar.com/" target="_blank" ><img border="0" width="165" height="150" src="https://assafinaonline.com//wp-content/uploads/2019/11/ad-2.gif" alt="3-UZMAR" title="3-UZMAR" /></a>      </div>
              <div class="wp_bannerize_banner_box wp_bannerize_category_side-ads"
           style=""
           data-title="2-HEISCO"
           data-mime_type="image-gif"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="101835"
           id="wpbanner-101835">
          <a href="https://www.heisco.com/" target="_blank" ><img border="0" width="165" height="150" src="https://assafinaonline.com//wp-content/uploads/Heisco-Banner.gif" alt="2-HEISCO" title="2-HEISCO" /></a>      </div>
              <div class="wp_bannerize_banner_box wp_bannerize_category_side-ads"
           style=""
           data-title="6-AAST"
           data-mime_type="image-jpeg"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="101838"
           id="wpbanner-101838">
          <a href="http://www.aast.edu/en/index.php" target="_blank" ><img border="0" width="165" height="150" src="https://assafinaonline.com//wp-content/uploads/AAST-Banner.jpg" alt="6-AAST" title="6-AAST" /></a>      </div>
              <div class="wp_bannerize_banner_box wp_bannerize_category_side-ads"
           style=""
           data-title="7-medmarine"
           data-mime_type="image-gif"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="101844"
           id="wpbanner-101844">
          <a href="https://www.medmarine.com.tr/" target="_blank" ><img border="0" width="165" height="150" src="https://assafinaonline.com//wp-content/uploads/med-marine-banner.gif" alt="7-medmarine" title="7-medmarine" /></a>      </div>
              <div class="wp_bannerize_banner_box wp_bannerize_category_side-ads"
           style=""
           data-title="5-MAWANI"
           data-mime_type="image-gif"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="101850"
           id="wpbanner-101850">
          <a href="https://www.ports.gov.sa/" target="_blank" ><img border="0" width="165" height="150" src="https://assafinaonline.com//wp-content/uploads/Saudi-Ports-Authority-Banner.gif" alt="5-MAWANI" title="5-MAWANI" /></a>      </div>
              <div class="wp_bannerize_banner_box wp_bannerize_category_side-ads"
           style=""
           data-title="13-MEMC"
           data-mime_type="image-gif"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="101856"
           id="wpbanner-101856">
          <a href="http://www.memaritime.me/" target="_blank" ><img border="0" width="165" height="150" src="https://assafinaonline.com//wp-content/uploads/memc-banner.gif" alt="13-MEMC" title="13-MEMC" /></a>      </div>
              <div class="wp_bannerize_banner_box wp_bannerize_category_side-ads"
           style=""
           data-title="12-BTR Marine"
           data-mime_type="image-gif"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="101862"
           id="wpbanner-101862">
          <a href="http://www.btrship.com/" target="_blank" ><img border="0" width="165" height="150" src="https://assafinaonline.com//wp-content/uploads/BTR-Marine-1.gif" alt="12-BTR Marine" title="12-BTR Marine" /></a>      </div>
              <div class="wp_bannerize_banner_box wp_bannerize_category_side-ads"
           style=""
           data-title="14-Consulate General of Panama"
           data-mime_type="image-jpeg"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="101866"
           id="wpbanner-101866">
          <a href="http://www.segumar.com/" target="_blank" ><img border="0" width="165" height="150" src="https://assafinaonline.com//wp-content/uploads/banner-Consulate-Newsletter.jpg" alt="14-Consulate General of Panama" title="14-Consulate General of Panama" /></a>      </div>
              <div class="wp_bannerize_banner_box wp_bannerize_category_side-ads"
           style=""
           data-title="16-Yassin Marine Services"
           data-mime_type="image-gif"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="104780"
           id="wpbanner-104780">
          <a href="http://www.yassinmarine.com/" target="_blank" ><img border="0" width="165" height="150" src="https://assafinaonline.com/wp-content/uploads/yassin-marine-banner.gif" alt="16-Yassin Marine Services" title="16-Yassin Marine Services" /></a>      </div>
              <div class="wp_bannerize_banner_box wp_bannerize_category_side-ads"
           style=""
           data-title="8- Abu Dhabi Maritime Academy"
           data-mime_type="image-gif"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="117529"
           id="wpbanner-117529">
          <a href="https://www.admacademy.ae/contact-us/" target="_blank" ><img border="0" width="165" height="150" src="https://assafinaonline.com/wp-content/uploads/Maritime-Academy-Courses-banner.gif" alt="8- Abu Dhabi Maritime Academy" title="8- Abu Dhabi Maritime Academy" /></a>      </div>
              <div class="wp_bannerize_banner_box wp_bannerize_category_side-ads"
           style=""
           data-title="15-IMCO"
           data-mime_type="image-gif"
           data-impressions_enabled="true"           data-clicks_enabled="true"           data-banner_id="101869"
           id="wpbanner-101869">
          <a href="https://imco.edu.om/ar/" target="_blank" ><img border="0" width="165" height="150" src="https://assafinaonline.com//wp-content/uploads/IMCO-Banner.gif" alt="15-IMCO" title="15-IMCO" /></a>      </div>
        </div></div></div><div id="vinkmag_latest_post_tab_widget-3" class="widgets ts-grid-box vinkmag_latest_post_tab_widget">		 
	  
		 <div class="post-list-item widgets grid-no-shadow">
			 <ul class="nav nav-tabs" role="tablist">
				 <li role="presentation">
					 <a class="active" href="#home" aria-controls="home" role="tab" data-toggle="tab">
						 <i class="fa fa-clock-o"></i>
						 FAVORITES					 </a>
				 </li>
				 <li role="presentation">
					 <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">
						 <i class="fa fa-heart"></i>
						 RECENT					 </a>
				 </li>
			 </ul>
			 <div class="tab-content">
				 <div role="tabpanel" class="tab-pane active ts-grid-box post-tab-list" id="home">
				 					 						 <div class="post-content media">    
							 <img 
								 class="d-flex sidebar-img" 
								 src="https://assafinaonline.com/wp-content/uploads/الشيخ-سعيد-بن-أحمد-بن-خليفة-آل-مكتوم-455x300.jpg" 
								 alt="دبي تسمح بمعاودة تغيير طواقم السفن في الموانئ والمياه الإقليمية">
							 <div class="media-body">
								 <span class="post-tag">
								 								 <a 
									 href="https://assafinaonline.com/category/top-news/"
									 style="color:#d72924"
									 >
									 Top News | آخر الأخبار								 </a>
								 </span>
								 <h4 class="post-title">
								 <a href="https://assafinaonline.com/top-news/%d8%af%d8%a8%d9%8a-%d8%aa%d8%b3%d9%85%d8%ad-%d8%a8%d9%85%d8%b9%d8%a7%d9%88%d8%af%d8%a9-%d8%aa%d8%ba%d9%8a%d9%8a%d8%b1-%d8%b7%d9%88%d8%a7%d9%82%d9%85-%d8%a7%d9%84%d8%b3%d9%81%d9%86-%d9%81%d9%8a-%d8%a7/">دبي تسمح بمعاودة تغيير طواقم السفن في الموانئ والمياه الإقليمية</a>
								 </h4>
							 </div>
						 </div>
					 						 <div class="post-content media">    
							 <img 
								 class="d-flex sidebar-img" 
								 src="https://assafinaonline.com/wp-content/uploads/العقبة-الاقتصادية-455x300.jpg" 
								 alt="إنشاء أول محطة ل &#8221; تخزين النفط &#8221; في العقبة..  وهذه تفاصيل المشروع والكلفة الإجمالية">
							 <div class="media-body">
								 <span class="post-tag">
								 								 <a 
									 href="https://assafinaonline.com/category/top-news/"
									 style="color:#d72924"
									 >
									 Top News | آخر الأخبار								 </a>
								 </span>
								 <h4 class="post-title">
								 <a href="https://assafinaonline.com/top-news/%d8%a5%d9%86%d8%b4%d8%a7%d8%a1-%d8%a3%d9%88%d9%84-%d9%85%d8%ad%d8%b7%d8%a9-%d9%84-%d8%aa%d8%ae%d8%b2%d9%8a%d9%86-%d8%a7%d9%84%d9%86%d9%81%d8%b7-%d9%81%d9%8a-%d8%a7%d9%84%d8%b9%d9%82%d8%a8%d8%a9/">إنشاء أول محطة ل &#8221; تخزين النفط &#8221; في العقبة.. وهذه تفاصيل المشروع والكلفة الإجمالية</a>
								 </h4>
							 </div>
						 </div>
					 						 <div class="post-content media">    
							 <img 
								 class="d-flex sidebar-img" 
								 src="https://assafinaonline.com/wp-content/uploads/e32ad76a-4806-45ea-b680-b36711333960-455x300.jpg" 
								 alt="اللجنة التنظيمية لمؤتمر العقبة تعلن أسماء المتحدثين في &#8220;مؤتمر العقبة 2021&#8221;">
							 <div class="media-body">
								 <span class="post-tag">
								 								 <a 
									 href="https://assafinaonline.com/category/top-news/"
									 style="color:#d72924"
									 >
									 Top News | آخر الأخبار								 </a>
								 </span>
								 <h4 class="post-title">
								 <a href="https://assafinaonline.com/top-news/%d8%a7%d9%84%d9%84%d8%ac%d9%86%d8%a9-%d8%a7%d9%84%d8%aa%d9%86%d8%b8%d9%8a%d9%85%d9%8a%d8%a9-%d9%84%d9%85%d8%a4%d8%aa%d9%85%d8%b1-%d8%a7%d9%84%d8%b9%d9%82%d8%a8%d8%a9-%d8%aa%d8%b9%d9%84%d9%86-%d8%a3/">اللجنة التنظيمية لمؤتمر العقبة تعلن أسماء المتحدثين في &#8220;مؤتمر العقبة 2021&#8221;</a>
								 </h4>
							 </div>
						 </div>
					 						 <div class="post-content media">    
							 <img 
								 class="d-flex sidebar-img" 
								 src="https://assafinaonline.com/wp-content/uploads/1460599319-e1594800333400-455x300.jpg" 
								 alt="Allianz: Asian waters accounted for a third of large vessels lost at sea in 2019">
							 <div class="media-body">
								 <span class="post-tag">
								 								 <a 
									 href="https://assafinaonline.com/category/top-news/"
									 style="color:#d72924"
									 >
									 Top News | آخر الأخبار								 </a>
								 </span>
								 <h4 class="post-title">
								 <a href="https://assafinaonline.com/top-news/allianz-asian-waters-accounted-for-a-third-of-large-vessels-lost-at-sea-in-2019/">Allianz: Asian waters accounted for a third of large vessels lost at sea in 2019</a>
								 </h4>
							 </div>
						 </div>
					 				 				 </div>
				 <div role="tabpanel" class="tab-pane ts-grid-box post-tab-list" id="profile">
					 						 							 <div class="post-content media">    
								 <img 
									 class="d-flex sidebar-img" 
									 src="https://assafinaonline.com/wp-content/uploads/old/src/43c2e8c4d48073eb22e222e2cff9b841-455x300.jpg" 
									 alt="تطوير ميناء أبو زنيمة لزيادة الغاطس لاستيعاب سفن بحمولة 50 ألف طن">
								 <div class="media-body">
									 <span class="post-tag">
									 									 <a 
										 href="https://assafinaonline.com/category/maritime-news/assafina-news/ports-2/"
										 style="color:#d72924"
										 >
										 Ports									 </a>
									 </span>
									 <h4 class="post-title">
										 <a href="https://assafinaonline.com/maritime-news/assafina-news/ports-2/%d8%aa%d8%b7%d9%88%d9%8a%d8%b1-%d9%85%d9%8a%d9%86%d8%a7%d8%a1-%d8%a3%d8%a8%d9%88-%d8%b2%d9%86%d9%8a%d9%85%d8%a9-%d9%84%d8%b2%d9%8a%d8%a7%d8%af%d8%a9-%d8%a7%d9%84%d8%ba%d8%a7%d8%b7%d8%b3-%d9%84%d8%a7/">تطوير ميناء أبو زنيمة لزيادة الغاطس لاستيعاب سفن بحمولة 50 ألف طن</a>
									 </h4>
								 </div>
							 </div>
						 							 <div class="post-content media">    
								 <img 
									 class="d-flex sidebar-img" 
									 src="https://assafinaonline.com/wp-content/uploads/old/src/b8ad2a4882e58cef218eb180e093f292-455x300.jpg" 
									 alt="أقسام صناعة السفن بالمدارس المصرية.. سفينة نوح التي ستنقذ مصر">
								 <div class="media-body">
									 <span class="post-tag">
									 									 <a 
										 href="https://assafinaonline.com/category/maritime-news/assafina-news/shipbuilding-2/"
										 style="color:#d72924"
										 >
										 Shipbuilding									 </a>
									 </span>
									 <h4 class="post-title">
										 <a href="https://assafinaonline.com/maritime-news/assafina-news/shipbuilding-2/%d8%a3%d9%82%d8%b3%d8%a7%d9%85-%d8%b5%d9%86%d8%a7%d8%b9%d8%a9-%d8%a7%d9%84%d8%b3%d9%81%d9%86-%d8%a8%d8%a7%d9%84%d9%85%d8%af%d8%a7%d8%b1%d8%b3-%d8%a7%d9%84%d9%85%d8%b5%d8%b1%d9%8a%d8%a9-%d8%b3%d9%81/">أقسام صناعة السفن بالمدارس المصرية.. سفينة نوح التي ستنقذ مصر</a>
									 </h4>
								 </div>
							 </div>
						 							 <div class="post-content media">    
								 <img 
									 class="d-flex sidebar-img" 
									 src="https://assafinaonline.com/wp-content/uploads/old/src/d355a82ab2bf1a6ec3cdd7cab61806c0-455x300.jpg" 
									 alt="القطاع اللوجستي دعامة اقتصادية مهمة.. والتعاون مع الشركاء أثمر إنجازات في التسهيل التجاري">
								 <div class="media-body">
									 <span class="post-tag">
									 									 <a 
										 href="https://assafinaonline.com/category/maritime-news/assafina-news/shipping/"
										 style="color:#d72924"
										 >
										 Shipping									 </a>
									 </span>
									 <h4 class="post-title">
										 <a href="https://assafinaonline.com/maritime-news/assafina-news/shipping/%d8%a7%d9%84%d9%82%d8%b7%d8%a7%d8%b9-%d8%a7%d9%84%d9%84%d9%88%d8%ac%d8%b3%d8%aa%d9%8a-%d8%af%d8%b9%d8%a7%d9%85%d8%a9-%d8%a7%d9%82%d8%aa%d8%b5%d8%a7%d8%af%d9%8a%d8%a9-%d9%85%d9%87%d9%85%d8%a9-%d9%88/">القطاع اللوجستي دعامة اقتصادية مهمة.. والتعاون مع الشركاء أثمر إنجازات في التسهيل التجاري</a>
									 </h4>
								 </div>
							 </div>
						 							 <div class="post-content media">    
								 <img 
									 class="d-flex sidebar-img" 
									 src="https://assafinaonline.com/wp-content/uploads/old/src/8fe0f450908588531383a46b6a9f9dfa-455x300.jpg" 
									 alt="«موانئ» تطلق 4 قنوات لخدمة المستفيدين">
								 <div class="media-body">
									 <span class="post-tag">
									 									 <a 
										 href="https://assafinaonline.com/category/maritime-news/assafina-news/ports-2/"
										 style="color:#d72924"
										 >
										 Ports									 </a>
									 </span>
									 <h4 class="post-title">
										 <a href="https://assafinaonline.com/maritime-news/assafina-news/ports-2/%d9%85%d9%88%d8%a7%d9%86%d8%a6-%d8%aa%d8%b7%d9%84%d9%82-4-%d9%82%d9%86%d9%88%d8%a7%d8%aa-%d9%84%d8%ae%d8%af%d9%85%d8%a9-%d8%a7%d9%84%d9%85%d8%b3%d8%aa%d9%81%d9%8a%d8%af%d9%8a%d9%86/">«موانئ» تطلق 4 قنوات لخدمة المستفيدين</a>
									 </h4>
								 </div>
							 </div>
						 					 				 </div>
			 </div>
		 </div>
	</div></div>

            </div>
        </div>
    </div>
</div>

    		<footer id="ekit-footer">
			<div class='footer-width-fixer'>		<div data-elementor-type="wp-post" data-elementor-id="4128" class="elementor elementor-4128" data-elementor-settings="[]">
			<div class="elementor-inner">
				<div class="elementor-section-wrap">
							<section class="elementor-element elementor-element-efc9163 footer-standard elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section elementor-top-section" data-id="efc9163" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
						<div class="elementor-container elementor-column-gap-default">
				<div class="elementor-row">
				<div class="elementor-element elementor-element-098937a elementor-column elementor-col-33 elementor-top-column" data-id="098937a" data-element_type="column">
			<div class="elementor-column-wrap  elementor-element-populated">
					<div class="elementor-widget-wrap">
				<div class="elementor-element elementor-element-eed6ee1 elementor-widget elementor-widget-wp-widget-vinkmag_latest_news_widget" data-id="eed6ee1" data-element_type="widget" data-widget_type="wp-widget-vinkmag_latest_news_widget.default">
				<div class="elementor-widget-container">
			<h5>Popular Posts</h5>		<div class="recent-posts-widget">
			<ul class="list-unstyled clearfix">
									<li class="media">
													<div class="posts-thumb d-flex mr-3">
								<a href="https://assafinaonline.com/top-news/%d8%af%d8%a8%d9%8a-%d8%aa%d8%b3%d9%85%d8%ad-%d8%a8%d9%85%d8%b9%d8%a7%d9%88%d8%af%d8%a9-%d8%aa%d8%ba%d9%8a%d9%8a%d8%b1-%d8%b7%d9%88%d8%a7%d9%82%d9%85-%d8%a7%d9%84%d8%b3%d9%81%d9%86-%d9%81%d9%8a-%d8%a7/" rel="bookmark" title="دبي تسمح بمعاودة تغيير طواقم السفن في الموانئ والمياه الإقليمية"><img width="150" height="150" src="https://assafinaonline.com/wp-content/uploads/الشيخ-سعيد-بن-أحمد-بن-خليفة-آل-مكتوم-150x150.jpg" class="attachment-thumbnail size-thumbnail wp-post-image" alt="الشيخ سعيد بن أحمد بن خليفة آل مكتوم" srcset="https://assafinaonline.com/wp-content/uploads/الشيخ-سعيد-بن-أحمد-بن-خليفة-آل-مكتوم-150x150.jpg 150w, https://assafinaonline.com/wp-content/uploads/الشيخ-سعيد-بن-أحمد-بن-خليفة-آل-مكتوم-400x398.jpg 400w, https://assafinaonline.com/wp-content/uploads/الشيخ-سعيد-بن-أحمد-بن-خليفة-آل-مكتوم-50x50.jpg 50w" sizes="(max-width: 150px) 100vw, 150px" /></a>
							</div>
							<div class="post-info media-body">
								<h4 class="entry-title mt-0 mb-1"><a href="https://assafinaonline.com/top-news/%d8%af%d8%a8%d9%8a-%d8%aa%d8%b3%d9%85%d8%ad-%d8%a8%d9%85%d8%b9%d8%a7%d9%88%d8%af%d8%a9-%d8%aa%d8%ba%d9%8a%d9%8a%d8%b1-%d8%b7%d9%88%d8%a7%d9%82%d9%85-%d8%a7%d9%84%d8%b3%d9%81%d9%86-%d9%81%d9%8a-%d8%a7/" rel="bookmark" title="دبي تسمح بمعاودة تغيير طواقم السفن في الموانئ والمياه الإقليمية">دبي تسمح بمعاودة تغيير طواقم السفن في الموانئ والمياه الإقليمية</a></h4>
								<p class="post-meta"><time class="post-date" datetime="2020-07-16T11:39:02+00:00">July 16, 2020</time></p>
							</div>
												<div class="clearfix"></div>
					</li>

									<li class="media">
													<div class="posts-thumb d-flex mr-3">
								<a href="https://assafinaonline.com/top-news/%d8%a5%d9%86%d8%b4%d8%a7%d8%a1-%d8%a3%d9%88%d9%84-%d9%85%d8%ad%d8%b7%d8%a9-%d9%84-%d8%aa%d8%ae%d8%b2%d9%8a%d9%86-%d8%a7%d9%84%d9%86%d9%81%d8%b7-%d9%81%d9%8a-%d8%a7%d9%84%d8%b9%d9%82%d8%a8%d8%a9/" rel="bookmark" title="إنشاء أول محطة ل &#8221; تخزين النفط &#8221; في العقبة..  وهذه تفاصيل المشروع والكلفة الإجمالية"><img width="150" height="150" src="https://assafinaonline.com/wp-content/uploads/العقبة-الاقتصادية-150x150.jpg" class="attachment-thumbnail size-thumbnail wp-post-image" alt="العقبة الاقتصادية" srcset="https://assafinaonline.com/wp-content/uploads/العقبة-الاقتصادية-150x150.jpg 150w, https://assafinaonline.com/wp-content/uploads/العقبة-الاقتصادية-50x50.jpg 50w" sizes="(max-width: 150px) 100vw, 150px" /></a>
							</div>
							<div class="post-info media-body">
								<h4 class="entry-title mt-0 mb-1"><a href="https://assafinaonline.com/top-news/%d8%a5%d9%86%d8%b4%d8%a7%d8%a1-%d8%a3%d9%88%d9%84-%d9%85%d8%ad%d8%b7%d8%a9-%d9%84-%d8%aa%d8%ae%d8%b2%d9%8a%d9%86-%d8%a7%d9%84%d9%86%d9%81%d8%b7-%d9%81%d9%8a-%d8%a7%d9%84%d8%b9%d9%82%d8%a8%d8%a9/" rel="bookmark" title="إنشاء أول محطة ل &#8221; تخزين النفط &#8221; في العقبة..  وهذه تفاصيل المشروع والكلفة الإجمالية">إنشاء أول محطة ل &#8221; تخزين النفط &#8221; في العقبة..  وهذه تفاصيل المشروع والكلفة الإجمالية</a></h4>
								<p class="post-meta"><time class="post-date" datetime="2020-07-16T10:27:35+00:00">July 16, 2020</time></p>
							</div>
												<div class="clearfix"></div>
					</li>

									<li class="media">
													<div class="posts-thumb d-flex mr-3">
								<a href="https://assafinaonline.com/top-news/%d8%a7%d9%84%d9%84%d8%ac%d9%86%d8%a9-%d8%a7%d9%84%d8%aa%d9%86%d8%b8%d9%8a%d9%85%d9%8a%d8%a9-%d9%84%d9%85%d8%a4%d8%aa%d9%85%d8%b1-%d8%a7%d9%84%d8%b9%d9%82%d8%a8%d8%a9-%d8%aa%d8%b9%d9%84%d9%86-%d8%a3/" rel="bookmark" title="اللجنة التنظيمية لمؤتمر العقبة تعلن أسماء المتحدثين في &#8220;مؤتمر العقبة 2021&#8221;"><img width="150" height="150" src="https://assafinaonline.com/wp-content/uploads/e32ad76a-4806-45ea-b680-b36711333960-150x150.jpg" class="attachment-thumbnail size-thumbnail wp-post-image" alt="مؤتمر العقبة الثامن للتأمين" srcset="https://assafinaonline.com/wp-content/uploads/e32ad76a-4806-45ea-b680-b36711333960-150x150.jpg 150w, https://assafinaonline.com/wp-content/uploads/e32ad76a-4806-45ea-b680-b36711333960-50x50.jpg 50w" sizes="(max-width: 150px) 100vw, 150px" /></a>
							</div>
							<div class="post-info media-body">
								<h4 class="entry-title mt-0 mb-1"><a href="https://assafinaonline.com/top-news/%d8%a7%d9%84%d9%84%d8%ac%d9%86%d8%a9-%d8%a7%d9%84%d8%aa%d9%86%d8%b8%d9%8a%d9%85%d9%8a%d8%a9-%d9%84%d9%85%d8%a4%d8%aa%d9%85%d8%b1-%d8%a7%d9%84%d8%b9%d9%82%d8%a8%d8%a9-%d8%aa%d8%b9%d9%84%d9%86-%d8%a3/" rel="bookmark" title="اللجنة التنظيمية لمؤتمر العقبة تعلن أسماء المتحدثين في &#8220;مؤتمر العقبة 2021&#8221;">اللجنة التنظيمية لمؤتمر العقبة تعلن أسماء المتحدثين في &#8220;مؤتمر العقبة 2021&#8221;</a></h4>
								<p class="post-meta"><time class="post-date" datetime="2020-07-16T08:39:20+00:00">July 16, 2020</time></p>
							</div>
												<div class="clearfix"></div>
					</li>

									<li class="media">
													<div class="posts-thumb d-flex mr-3">
								<a href="https://assafinaonline.com/top-news/allianz-asian-waters-accounted-for-a-third-of-large-vessels-lost-at-sea-in-2019/" rel="bookmark" title="Allianz: Asian waters accounted for a third of large vessels lost at sea in 2019"><img width="150" height="150" src="https://assafinaonline.com/wp-content/uploads/1460599319-e1594800333400-150x150.jpg" class="attachment-thumbnail size-thumbnail wp-post-image" alt="Allianz" srcset="https://assafinaonline.com/wp-content/uploads/1460599319-e1594800333400-150x150.jpg 150w, https://assafinaonline.com/wp-content/uploads/1460599319-e1594800333400-50x50.jpg 50w" sizes="(max-width: 150px) 100vw, 150px" /></a>
							</div>
							<div class="post-info media-body">
								<h4 class="entry-title mt-0 mb-1"><a href="https://assafinaonline.com/top-news/allianz-asian-waters-accounted-for-a-third-of-large-vessels-lost-at-sea-in-2019/" rel="bookmark" title="Allianz: Asian waters accounted for a third of large vessels lost at sea in 2019">Allianz: Asian waters accounted for a third of large vessels lost at sea in 2019</a></h4>
								<p class="post-meta"><time class="post-date" datetime="2020-07-15T20:31:23+00:00">July 15, 2020</time></p>
							</div>
												<div class="clearfix"></div>
					</li>

									<li class="media">
													<div class="posts-thumb d-flex mr-3">
								<a href="https://assafinaonline.com/top-news/singapore-2020s-international-shipping-center/" rel="bookmark" title="Singapore: 2020&#8217;s International Shipping Center"><img width="150" height="150" src="https://assafinaonline.com/wp-content/uploads/Singapore-Marina-Bay-Sands-1199x640-150x150.jpg" class="attachment-thumbnail size-thumbnail wp-post-image" alt="Singapore" srcset="https://assafinaonline.com/wp-content/uploads/Singapore-Marina-Bay-Sands-1199x640-150x150.jpg 150w, https://assafinaonline.com/wp-content/uploads/Singapore-Marina-Bay-Sands-1199x640-50x50.jpg 50w" sizes="(max-width: 150px) 100vw, 150px" /></a>
							</div>
							<div class="post-info media-body">
								<h4 class="entry-title mt-0 mb-1"><a href="https://assafinaonline.com/top-news/singapore-2020s-international-shipping-center/" rel="bookmark" title="Singapore: 2020&#8217;s International Shipping Center">Singapore: 2020&#8217;s International Shipping Center</a></h4>
								<p class="post-meta"><time class="post-date" datetime="2020-07-15T13:52:11+00:00">July 15, 2020</time></p>
							</div>
												<div class="clearfix"></div>
					</li>

											</ul>
		</div>
				</div>
				</div>
						</div>
			</div>
		</div>
				<div class="elementor-element elementor-element-7e7a393 elementor-column elementor-col-33 elementor-top-column" data-id="7e7a393" data-element_type="column">
			<div class="elementor-column-wrap  elementor-element-populated">
					<div class="elementor-widget-wrap">
				<div class="elementor-element elementor-element-3e69ed5 elementor-widget elementor-widget-wp-widget-tag_cloud" data-id="3e69ed5" data-element_type="widget" data-widget_type="wp-widget-tag_cloud.default">
				<div class="elementor-widget-container">
			<h5>Categories</h5><div class="tagcloud"><a href="https://assafinaonline.com/category/archives/2009/" class="tag-cloud-link tag-link-244 tag-link-position-1" style="font-size: 11.091482649842pt;" aria-label="2009 (4 items)">2009</a>
<a href="https://assafinaonline.com/category/archives/2010/" class="tag-cloud-link tag-link-245 tag-link-position-2" style="font-size: 11.753943217666pt;" aria-label="2010 (6 items)">2010</a>
<a href="https://assafinaonline.com/category/archives/2011/" class="tag-cloud-link tag-link-246 tag-link-position-3" style="font-size: 11.753943217666pt;" aria-label="2011 (6 items)">2011</a>
<a href="https://assafinaonline.com/category/archives/2012/" class="tag-cloud-link tag-link-247 tag-link-position-4" style="font-size: 11.753943217666pt;" aria-label="2012 (6 items)">2012</a>
<a href="https://assafinaonline.com/category/archives/2013/" class="tag-cloud-link tag-link-248 tag-link-position-5" style="font-size: 11.753943217666pt;" aria-label="2013 (6 items)">2013</a>
<a href="https://assafinaonline.com/category/archives/2014/" class="tag-cloud-link tag-link-249 tag-link-position-6" style="font-size: 11.753943217666pt;" aria-label="2014 (6 items)">2014</a>
<a href="https://assafinaonline.com/category/archives/2015/" class="tag-cloud-link tag-link-250 tag-link-position-7" style="font-size: 11.753943217666pt;" aria-label="2015 (6 items)">2015</a>
<a href="https://assafinaonline.com/category/archives/2016/" class="tag-cloud-link tag-link-251 tag-link-position-8" style="font-size: 11.753943217666pt;" aria-label="2016 (6 items)">2016</a>
<a href="https://assafinaonline.com/category/archives/2017/" class="tag-cloud-link tag-link-252 tag-link-position-9" style="font-size: 11.753943217666pt;" aria-label="2017 (6 items)">2017</a>
<a href="https://assafinaonline.com/category/archives/2018/" class="tag-cloud-link tag-link-253 tag-link-position-10" style="font-size: 11.753943217666pt;" aria-label="2018 (6 items)">2018</a>
<a href="https://assafinaonline.com/category/archives/2019/" class="tag-cloud-link tag-link-254 tag-link-position-11" style="font-size: 11.753943217666pt;" aria-label="2019 (6 items)">2019</a>
<a href="https://assafinaonline.com/category/archives/2020/" class="tag-cloud-link tag-link-255 tag-link-position-12" style="font-size: 10.649842271293pt;" aria-label="2020 (3 items)">2020</a>
<a href="https://assafinaonline.com/category/archives/" class="tag-cloud-link tag-link-202 tag-link-position-13" style="font-size: 8pt;" aria-label="Archives (0 items)">Archives</a>
<a href="https://assafinaonline.com/category/assafina-case/" class="tag-cloud-link tag-link-215 tag-link-position-14" style="font-size: 11.444794952681pt;" aria-label="Assafina Case (5 items)">Assafina Case</a>
<a href="https://assafinaonline.com/category/maritime-news/assafina-news/" class="tag-cloud-link tag-link-166 tag-link-position-15" style="font-size: 22pt;" aria-label="Assafina News | أخبار السفينة (1,476 items)">Assafina News | أخبار السفينة</a>
<a href="https://assafinaonline.com/category/maritime-news/assafina-news/classification/" class="tag-cloud-link tag-link-188 tag-link-position-16" style="font-size: 15.287066246057pt;" aria-label="Classification Societies (44 items)">Classification Societies</a>
<a href="https://assafinaonline.com/category/magazine-archives/edition-host/" class="tag-cloud-link tag-link-194 tag-link-position-17" style="font-size: 11.091482649842pt;" aria-label="Edition Host (4 items)">Edition Host</a>
<a href="https://assafinaonline.com/category/edition-story/" class="tag-cloud-link tag-link-89 tag-link-position-18" style="font-size: 11.091482649842pt;" aria-label="Edition Story (4 items)">Edition Story</a>
<a href="https://assafinaonline.com/category/exhibitions-conferences/" class="tag-cloud-link tag-link-167 tag-link-position-19" style="font-size: 16.656151419558pt;" aria-label="Exhibitions &amp; Conferences (91 items)">Exhibitions &amp; Conferences</a>
<a href="https://assafinaonline.com/category/from-imo/" class="tag-cloud-link tag-link-170 tag-link-position-20" style="font-size: 15.375394321767pt;" aria-label="From IMO (46 items)">From IMO</a>
<a href="https://assafinaonline.com/category/maritime-news/assafina-news/insurance/" class="tag-cloud-link tag-link-189 tag-link-position-21" style="font-size: 13.078864353312pt;" aria-label="Insurance (13 items)">Insurance</a>
<a href="https://assafinaonline.com/category/magazine-archives/issue-character/" class="tag-cloud-link tag-link-180 tag-link-position-22" style="font-size: 9.3249211356467pt;" aria-label="Issue Character (1 item)">Issue Character</a>
<a href="https://assafinaonline.com/category/issue-editorial/" class="tag-cloud-link tag-link-179 tag-link-position-23" style="font-size: 12.195583596215pt;" aria-label="Issue Editorial | كلمة العدد (8 items)">Issue Editorial | كلمة العدد</a>
<a href="https://assafinaonline.com/category/magazine-archives/" class="tag-cloud-link tag-link-150 tag-link-position-24" style="font-size: 19.350157728707pt;" aria-label="Magazine Archives (369 items)">Magazine Archives</a>
<a href="https://assafinaonline.com/category/maritime-host/" class="tag-cloud-link tag-link-196 tag-link-position-25" style="font-size: 13.299684542587pt;" aria-label="Maritime Host (15 items)">Maritime Host</a>
<a href="https://assafinaonline.com/category/maritime-news/" class="tag-cloud-link tag-link-81 tag-link-position-26" style="font-size: 8pt;" aria-label="Maritime News (0 items)">Maritime News</a>
<a href="https://assafinaonline.com/category/maritime-studies/" class="tag-cloud-link tag-link-214 tag-link-position-27" style="font-size: 11.091482649842pt;" aria-label="Maritime Studies (4 items)">Maritime Studies</a>
<a href="https://assafinaonline.com/category/maritime-news/assafina-news/offshore-2/" class="tag-cloud-link tag-link-190 tag-link-position-28" style="font-size: 16.523659305994pt;" aria-label="Offshore (85 items)">Offshore</a>
<a href="https://assafinaonline.com/category/opinion/" class="tag-cloud-link tag-link-216 tag-link-position-29" style="font-size: 11.091482649842pt;" aria-label="Opinion (4 items)">Opinion</a>
<a href="https://assafinaonline.com/category/maritime-news/assafina-news/ports-2/" class="tag-cloud-link tag-link-182 tag-link-position-30" style="font-size: 19.659305993691pt;" aria-label="Ports (436 items)">Ports</a>
<a href="https://assafinaonline.com/category/robban-assafina/" class="tag-cloud-link tag-link-149 tag-link-position-31" style="font-size: 9.3249211356467pt;" aria-label="Robban Assafina (1 item)">Robban Assafina</a>
<a href="https://assafinaonline.com/category/maritime-news/assafina-news/shipbuilding-2/" class="tag-cloud-link tag-link-184 tag-link-position-32" style="font-size: 16.523659305994pt;" aria-label="Shipbuilding (85 items)">Shipbuilding</a>
<a href="https://assafinaonline.com/category/maritime-news/assafina-news/shipping/" class="tag-cloud-link tag-link-183 tag-link-position-33" style="font-size: 20.984227129338pt;" aria-label="Shipping (867 items)">Shipping</a>
<a href="https://assafinaonline.com/category/magazine-archives/special-interview/" class="tag-cloud-link tag-link-198 tag-link-position-34" style="font-size: 9.3249211356467pt;" aria-label="Special Interview (1 item)">Special Interview</a>
<a href="https://assafinaonline.com/category/technical-bay/" class="tag-cloud-link tag-link-169 tag-link-position-35" style="font-size: 16.700315457413pt;" aria-label="Technical Bay (92 items)">Technical Bay</a>
<a href="https://assafinaonline.com/category/top-news/" class="tag-cloud-link tag-link-165 tag-link-position-36" style="font-size: 12.593059936909pt;" aria-label="Top News | آخر الأخبار (10 items)">Top News | آخر الأخبار</a>
<a href="https://assafinaonline.com/category/uncategorized/" class="tag-cloud-link tag-link-1 tag-link-position-37" style="font-size: 13.564668769716pt;" aria-label="Uncategorized (17 items)">Uncategorized</a></div>
		</div>
				</div>
						</div>
			</div>
		</div>
				<div class="elementor-element elementor-element-0718728 elementor-column elementor-col-33 elementor-top-column" data-id="0718728" data-element_type="column">
			<div class="elementor-column-wrap  elementor-element-populated">
					<div class="elementor-widget-wrap">
				<div class="elementor-element elementor-element-9fd0634 elementor-widget elementor-widget-wp-widget-recent-posts" data-id="9fd0634" data-element_type="widget" data-widget_type="wp-widget-recent-posts.default">
				<div class="elementor-widget-container">
							<h5>Recent Posts</h5>		<ul>
											<li>
					<a href="https://assafinaonline.com/top-news/%d8%af%d8%a8%d9%8a-%d8%aa%d8%b3%d9%85%d8%ad-%d8%a8%d9%85%d8%b9%d8%a7%d9%88%d8%af%d8%a9-%d8%aa%d8%ba%d9%8a%d9%8a%d8%b1-%d8%b7%d9%88%d8%a7%d9%82%d9%85-%d8%a7%d9%84%d8%b3%d9%81%d9%86-%d9%81%d9%8a-%d8%a7/">دبي تسمح بمعاودة تغيير طواقم السفن في الموانئ والمياه الإقليمية</a>
											<span class="post-date">July 16, 2020</span>
									</li>
											<li>
					<a href="https://assafinaonline.com/top-news/%d8%a5%d9%86%d8%b4%d8%a7%d8%a1-%d8%a3%d9%88%d9%84-%d9%85%d8%ad%d8%b7%d8%a9-%d9%84-%d8%aa%d8%ae%d8%b2%d9%8a%d9%86-%d8%a7%d9%84%d9%86%d9%81%d8%b7-%d9%81%d9%8a-%d8%a7%d9%84%d8%b9%d9%82%d8%a8%d8%a9/">إنشاء أول محطة ل &#8221; تخزين النفط &#8221; في العقبة..  وهذه تفاصيل المشروع والكلفة الإجمالية</a>
											<span class="post-date">July 16, 2020</span>
									</li>
											<li>
					<a href="https://assafinaonline.com/top-news/%d8%a7%d9%84%d9%84%d8%ac%d9%86%d8%a9-%d8%a7%d9%84%d8%aa%d9%86%d8%b8%d9%8a%d9%85%d9%8a%d8%a9-%d9%84%d9%85%d8%a4%d8%aa%d9%85%d8%b1-%d8%a7%d9%84%d8%b9%d9%82%d8%a8%d8%a9-%d8%aa%d8%b9%d9%84%d9%86-%d8%a3/">اللجنة التنظيمية لمؤتمر العقبة تعلن أسماء المتحدثين في &#8220;مؤتمر العقبة 2021&#8221;</a>
											<span class="post-date">July 16, 2020</span>
									</li>
											<li>
					<a href="https://assafinaonline.com/top-news/allianz-asian-waters-accounted-for-a-third-of-large-vessels-lost-at-sea-in-2019/">Allianz: Asian waters accounted for a third of large vessels lost at sea in 2019</a>
											<span class="post-date">July 15, 2020</span>
									</li>
											<li>
					<a href="https://assafinaonline.com/top-news/singapore-2020s-international-shipping-center/">Singapore: 2020&#8217;s International Shipping Center</a>
											<span class="post-date">July 15, 2020</span>
									</li>
					</ul>
				</div>
				</div>
						</div>
			</div>
		</div>
						</div>
			</div>
		</section>
				<section class="elementor-element elementor-element-94554d0 elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section elementor-top-section" data-id="94554d0" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
						<div class="elementor-container elementor-column-gap-default">
				<div class="elementor-row">
				<div class="elementor-element elementor-element-52318ca elementor-column elementor-col-100 elementor-top-column" data-id="52318ca" data-element_type="column">
			<div class="elementor-column-wrap  elementor-element-populated">
					<div class="elementor-widget-wrap">
				<div class="elementor-element elementor-element-241397c elementor-widget elementor-widget-divider" data-id="241397c" data-element_type="widget" data-widget_type="divider.default">
				<div class="elementor-widget-container">
					<div class="elementor-divider">
			<span class="elementor-divider-separator">
						</span>
		</div>
				</div>
				</div>
				<section class="elementor-element elementor-element-b242978 elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section elementor-inner-section" data-id="b242978" data-element_type="section">
						<div class="elementor-container elementor-column-gap-default">
				<div class="elementor-row">
				<div class="elementor-element elementor-element-1660090 elementor-column elementor-col-33 elementor-inner-column" data-id="1660090" data-element_type="column">
			<div class="elementor-column-wrap  elementor-element-populated">
					<div class="elementor-widget-wrap">
				<div class="elementor-element elementor-element-29e49f1 elementor-widget elementor-widget-image" data-id="29e49f1" data-element_type="widget" data-widget_type="image.default">
				<div class="elementor-widget-container">
					<div class="elementor-image">
											<a href="https://assafinaonline.com" data-elementor-open-lightbox="">
							<img src="https://assafinaonline.com/wp-content/uploads/elementor/thumbs/assafina-logo-footer-omxge5cz4qkx0a05h65iam5effjupg6bj9680g5ai6.png" title="assafina-logo-footer" alt="assafina-logo-footer" />								</a>
											</div>
				</div>
				</div>
						</div>
			</div>
		</div>
				<div class="elementor-element elementor-element-ba7cff0 elementor-column elementor-col-33 elementor-inner-column" data-id="ba7cff0" data-element_type="column">
			<div class="elementor-column-wrap  elementor-element-populated">
					<div class="elementor-widget-wrap">
				<div class="elementor-element elementor-element-6b546ff elementor-widget elementor-widget-shortcode" data-id="6b546ff" data-element_type="widget" id="footer-newsletter-form" data-widget_type="shortcode.default">
				<div class="elementor-widget-container">
					<div class="elementor-shortcode"><script>(function() {
	if (!window.mc4wp) {
		window.mc4wp = {
			listeners: [],
			forms    : {
				on: function (event, callback) {
					window.mc4wp.listeners.push({
						event   : event,
						callback: callback
					});
				}
			}
		}
	}
})();
</script><!-- Mailchimp for WordPress v4.7 - https://wordpress.org/plugins/mailchimp-for-wp/ --><form id="mc4wp-form-2" class="mc4wp-form mc4wp-form-2580" method="post" data-id="2580" data-name="Newsletter Form" ><div class="mc4wp-form-fields"><div class="ts-widget-newsletter">
  <div class="newsletter-introtext">
    <h4>Newsletter</h4>
    <p>Subscribe to get the latest Maritime News in your inbox!</p>
  </div>

  <div class="newsletter-form">
      <div class="form-group">
	<input type="email" class="form-control" name="EMAIL" placeholder="Your email address" required />
	<input class="btn btn-primary" type="submit" value="Subscribe" />
      </div>
  </div>
</div></div><label style="display: none !important;">Leave this field empty if you're human: <input type="text" name="_mc4wp_honeypot" value="" tabindex="-1" autocomplete="off" /></label><input type="hidden" name="_mc4wp_timestamp" value="1594922122" /><input type="hidden" name="_mc4wp_form_id" value="2580" /><input type="hidden" name="_mc4wp_form_element_id" value="mc4wp-form-2" /><div class="mc4wp-response"></div></form><!-- / Mailchimp for WordPress Plugin --></div>
				</div>
				</div>
						</div>
			</div>
		</div>
				<div class="elementor-element elementor-element-e1dfd86 elementor-column elementor-col-33 elementor-inner-column" data-id="e1dfd86" data-element_type="column">
			<div class="elementor-column-wrap  elementor-element-populated">
					<div class="elementor-widget-wrap">
				<div class="elementor-element elementor-element-ce40948 elementor-shape-circle xs-center md-center elementor-widget elementor-widget-social-icons" data-id="ce40948" data-element_type="widget" data-widget_type="social-icons.default">
				<div class="elementor-widget-container">
					<div class="elementor-social-icons-wrapper">
							<a href="https://www.facebook.com/Robban.Assafina.Magazine/" class="elementor-icon elementor-social-icon elementor-social-icon-facebook-f elementor-repeater-item-4d1c805" target="_blank">
					<span class="elementor-screen-only">Facebook-f</span>
					<i class="fab fa-facebook-f"></i>				</a>
							<a href="https://twitter.com/robbanassafina" class="elementor-icon elementor-social-icon elementor-social-icon-twitter elementor-repeater-item-74fe826" target="_blank">
					<span class="elementor-screen-only">Twitter</span>
					<i class="fab fa-twitter"></i>				</a>
							<a href="https://www.linkedin.com/company/robban-assafina-magazine/" class="elementor-icon elementor-social-icon elementor-social-icon-linkedin elementor-repeater-item-a6de0db" target="_blank">
					<span class="elementor-screen-only">Linkedin</span>
					<i class="fab fa-linkedin"></i>				</a>
							<a href="https://www.instagram.com/robbanassafina/" class="elementor-icon elementor-social-icon elementor-social-icon-instagram elementor-repeater-item-720e45e" target="_blank">
					<span class="elementor-screen-only">Instagram</span>
					<i class="fab fa-instagram"></i>				</a>
							<a href="https://www.youtube.com/channel/UC56c0oRrWdxUIgUbL7qRNKA" class="elementor-icon elementor-social-icon elementor-social-icon-youtube elementor-repeater-item-7c1ad58" target="_blank">
					<span class="elementor-screen-only">Youtube</span>
					<i class="fab fa-youtube"></i>				</a>
					</div>
				</div>
				</div>
						</div>
			</div>
		</div>
						</div>
			</div>
		</section>
						</div>
			</div>
		</div>
						</div>
			</div>
		</section>
				<section class="elementor-element elementor-element-6b0953f copyright-sec elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section elementor-top-section" data-id="6b0953f" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
						<div class="elementor-container elementor-column-gap-default">
				<div class="elementor-row">
				<div class="elementor-element elementor-element-980cfb5 elementor-column elementor-col-50 elementor-top-column" data-id="980cfb5" data-element_type="column">
			<div class="elementor-column-wrap  elementor-element-populated">
					<div class="elementor-widget-wrap">
				<div class="elementor-element elementor-element-72ce310  xs-center elementor-widget elementor-widget-text-editor" data-id="72ce310" data-element_type="widget" data-widget_type="text-editor.default">
				<div class="elementor-widget-container">
					<div class="elementor-text-editor elementor-clearfix"><p>© 2009-2020, Robban Assafina Magazine. All rights reserved</p></div>
				</div>
				</div>
						</div>
			</div>
		</div>
				<div class="elementor-element elementor-element-8bc6a8c elementor-column elementor-col-50 elementor-top-column" data-id="8bc6a8c" data-element_type="column">
			<div class="elementor-column-wrap  elementor-element-populated">
					<div class="elementor-widget-wrap">
				<div class="elementor-element elementor-element-d0d69e5 text-right xs-center elementor-widget elementor-widget-wp-widget-nav_menu" data-id="d0d69e5" data-element_type="widget" id="top-bottom-menu" data-widget_type="wp-widget-nav_menu.default">
				<div class="elementor-widget-container">
			<div class="menu-top-menu-container"><ul id="menu-top-menu" class="menu"><li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-101995 current_page_item menu-item-101997"><a href="https://assafinaonline.com/about-us/" aria-current="page">About Us</a></li>
<li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-101974"><a href="https://assafinaonline.com/category/archives/">Archive</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-102202"><a href="https://assafinaonline.com/files/media-plan-2020.pdf">Media Plan</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-102081"><a href="https://assafinaonline.com/subscription-form/">Subscribe Here</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-102009"><a href="https://assafinaonline.com/media-plan/">Advertise With Us</a></li>
<li class="popmake-102102 menu-item menu-item-type-custom menu-item-object-custom menu-item-14902"><a href="#">Join Our Newsletter</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14903"><a href="/my-account">Login</a></li>
</ul></div>		</div>
				</div>
						</div>
			</div>
		</div>
						</div>
			</div>
		</section>
						</div>
			</div>
		</div>
		</div>		</footer>
	    <script>
    jQuery(document).ready(function () {
        jQuery('#post-102052').on('click', function () {
            jQuery('.payment_terms_select select').off('change');
            jQuery('.payment_terms_select select').on('change', function () {
                jQuery('.t_cheque_container').addClass('hidden');
                jQuery('.t_bank_container').addClass('hidden');
                jQuery('.t_western_container').addClass('hidden');
                jQuery('.t_cash_container').addClass('hidden');
                switch (jQuery(this).val()) {
                    case "cheque":
                        jQuery('.t_cheque_container').removeClass('hidden');
                        jQuery('.t_cheque_container').show();
                        break;
                    case "bank deposit":
                        jQuery('.t_bank_container').removeClass('hidden');
                        jQuery('.t_bank_container').show();
                        break;
                    case "western union":
                        jQuery('.t_western_container').removeClass('hidden');
                        jQuery('.t_western_container').show();
                        break;
                    case "cash":
                        jQuery('.t_cash_container').removeClass('hidden');
                        jQuery('.t_cash_container').show();
                        break;
                }
            })
        })
    });

jQuery(window).load(function () { 
        console.log('loaded');
        console.log('breaking news found!');
      if(jQuery('#breaking-news-container .owl-next')[0]){
        setInterval(function () { jQuery('#breaking-news-container .owl-next')[0].click(); }, 8000);
       }
    });

jQuery(document).ready(function () {
  jQuery('#home-videos-grid .box_grid').css('visibility','visible');

jQuery(jQuery('#home-news-section .tab-content.ts-tabs-content >.tab-pane')[0]).find('.col-lg-5').append('<a class="view-all-link float-right" target="_blank" href="/category/shipping">View All</a>');
jQuery(jQuery('#home-news-section .tab-content.ts-tabs-content >.tab-pane')[1]).find('.col-lg-5').append('<a class="view-all-link float-right" target="_blank" href="/category/ports-2">View All</a>');
jQuery(jQuery('#home-news-section .tab-content.ts-tabs-content >.tab-pane')[2]).find('.col-lg-5').append('<a class="view-all-link float-right" target="_blank" href="/category/shipbuilding-2">View All</a>');
jQuery(jQuery('#home-news-section .tab-content.ts-tabs-content >.tab-pane')[3]).find('.col-lg-5').append('<a class="view-all-link float-right" target="_blank" href="/category/offshore-2">View All</a>');
jQuery(jQuery('#home-news-section .tab-content.ts-tabs-content >.tab-pane')[4]).find('.col-lg-5').append('<a class="view-all-link float-right" target="_blank" href="/category/classification">View All</a>');
jQuery(jQuery('#home-news-section .tab-content.ts-tabs-content >.tab-pane')[5]).find('.col-lg-5').append('<a class="view-all-link float-right" target="_blank" href="/category/insurance">View All</a>');




// Reorder side ads
var container = jQuery('#home-side-ads .wp_bannerize_container.wp_bannerize_layout_vertical, #wp-bannerize-widget-2 .wp_bannerize_container.wp_bannerize_layout_vertical');
var oContent = container.children().sort(function(a,b)
{ 
var altA = jQuery(a).find('img')[0].alt;
altA = altA.split('-')[0];
var altB = jQuery(b).find('img')[0].alt;
altB = altB.split('-')[0];
return (!isNaN(altA) ? parseInt(altA) : altA) > (!isNaN(altB) ? parseInt(altB) : altB) ? 1: -1;
});

oContent.filter(function(f){
var img = jQuery(oContent[f]).find('img')[0];
img.title =  img.title.split('-')[img.title.split('-').length - 1];
})
container.html(oContent);


//Handle sideads in mobile view
if(window.$width<=768 && container.children()){
var containerC = container.clone();
var adsLength = containerC.children().length;
var adsLimit = parseInt(adsLength / 2) - (parseInt(adsLength / 2) % 2);
jQuery('#mobile-sideads-1').html(containerC.children().slice(0, adsLimit));

jQuery('#mobile-sideads-2').html(containerC.children().slice(0, adsLength));

}


// Mess up with Training courses page
var $tcc= jQuery('body.events-category-training-courses');
if($tcc[0]){
$tcc.find('.label-tribe-bar-date').html('Courses from');
$tcc.find('.tribe-bar-submit input')[0].value='Find Courses';
//jQuery('.tribe-events-nav-next.tribe-events-nav-right').html('Next Courses');

//var sd = jQuery('<span>Start Date: </span>');
//$tcc.find('.tribe-event-date-start').html(sd.html() + $tcc.find('.tribe-event-date-start').html());

//var ed = jQuery('<span>End Date: </span>');
//$tcc.find('.tribe-event-date-end').html(ed.html() + $tcc.find('.tribe-event-date-end').html());
}

});    
</script>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<script type="text/javascript" src="https://assafinaonline.com/wp-content/plugins/carousel-slider/assets/lib/owl-carousel/owl.carousel.min.js?ver=2.3.4"></script>
<script type="text/javascript" src="https://assafinaonline.com/wp-content/plugins/carousel-slider/assets/lib/magnific-popup/jquery.magnific-popup.min.js?ver=1.1.0"></script>
<script type="text/javascript" src="https://assafinaonline.com/wp-content/plugins/carousel-slider/assets/js/script.min.js?ver=1.9.2"></script>
<div id="pum-102102" class="pum pum-overlay pum-theme-102023 pum-theme-default-theme popmake-overlay click_open" data-popmake="{&quot;id&quot;:102102,&quot;slug&quot;:&quot;newsletter-form&quot;,&quot;theme_id&quot;:102023,&quot;cookies&quot;:[],&quot;triggers&quot;:[{&quot;type&quot;:&quot;click_open&quot;,&quot;settings&quot;:{&quot;extra_selectors&quot;:&quot;&quot;,&quot;cookie_name&quot;:null}}],&quot;mobile_disabled&quot;:null,&quot;tablet_disabled&quot;:null,&quot;meta&quot;:{&quot;display&quot;:{&quot;stackable&quot;:false,&quot;overlay_disabled&quot;:false,&quot;scrollable_content&quot;:false,&quot;disable_reposition&quot;:false,&quot;size&quot;:&quot;medium&quot;,&quot;responsive_min_width&quot;:&quot;0%&quot;,&quot;responsive_min_width_unit&quot;:false,&quot;responsive_max_width&quot;:&quot;100%&quot;,&quot;responsive_max_width_unit&quot;:false,&quot;custom_width&quot;:&quot;640px&quot;,&quot;custom_width_unit&quot;:false,&quot;custom_height&quot;:&quot;380px&quot;,&quot;custom_height_unit&quot;:false,&quot;custom_height_auto&quot;:false,&quot;location&quot;:&quot;center top&quot;,&quot;position_from_trigger&quot;:false,&quot;position_top&quot;:&quot;100&quot;,&quot;position_left&quot;:&quot;0&quot;,&quot;position_bottom&quot;:&quot;0&quot;,&quot;position_right&quot;:&quot;0&quot;,&quot;position_fixed&quot;:false,&quot;animation_type&quot;:&quot;fade&quot;,&quot;animation_speed&quot;:&quot;350&quot;,&quot;animation_origin&quot;:&quot;center top&quot;,&quot;overlay_zindex&quot;:false,&quot;zindex&quot;:&quot;1999999999&quot;},&quot;close&quot;:{&quot;text&quot;:&quot;&quot;,&quot;button_delay&quot;:&quot;0&quot;,&quot;overlay_click&quot;:false,&quot;esc_press&quot;:false,&quot;f4_press&quot;:false},&quot;click_open&quot;:[]}}" role="dialog" aria-hidden="true" >

	<div id="popmake-102102" class="pum-container popmake theme-102023 pum-responsive pum-responsive-medium responsive size-medium">

				

				

		

				<div class="pum-content popmake-content">
			<script>(function() {
	if (!window.mc4wp) {
		window.mc4wp = {
			listeners: [],
			forms    : {
				on: function (event, callback) {
					window.mc4wp.listeners.push({
						event   : event,
						callback: callback
					});
				}
			}
		}
	}
})();
</script><!-- Mailchimp for WordPress v4.7 - https://wordpress.org/plugins/mailchimp-for-wp/ --><form id="mc4wp-form-1" class="mc4wp-form mc4wp-form-2580" method="post" data-id="2580" data-name="Newsletter Form" ><div class="mc4wp-form-fields"><div class="ts-widget-newsletter">
  <div class="newsletter-introtext">
    <h4>Newsletter</h4>
    <p>Subscribe to get the latest Maritime News in your inbox!</p>
  </div>

  <div class="newsletter-form">
      <div class="form-group">
	<input type="email" class="form-control" name="EMAIL" placeholder="Your email address" required />
	<input class="btn btn-primary" type="submit" value="Subscribe" />
      </div>
  </div>
</div></div><label style="display: none !important;">Leave this field empty if you're human: <input type="text" name="_mc4wp_honeypot" value="" tabindex="-1" autocomplete="off" /></label><input type="hidden" name="_mc4wp_timestamp" value="1594922109" /><input type="hidden" name="_mc4wp_form_id" value="2580" /><input type="hidden" name="_mc4wp_form_element_id" value="mc4wp-form-1" /><div class="mc4wp-response"></div></form><!-- / Mailchimp for WordPress Plugin -->
		</div>


				

				            <button type="button" class="pum-close popmake-close" aria-label="Close">
			CLOSE            </button>
		
	</div>

</div>
		<script>
		( function ( body ) {
			'use strict';
			body.className = body.className.replace( /\btribe-no-js\b/, 'tribe-js' );
		} )( document.body );
		</script>
		      <script>

        jQuery(function($) {
          "use strict"

          // Add a custom event on document in order to init again the impressions and clicks.
          $(document).on("wpbannerize.init.impressions", _initImpressions)
          $(document).on("wpbannerize.init.clicks", _initClicks)

          function _initImpressions()
          {
            // impressions
            if(!window.WPBannerize.General.impressions_enabled) {
              return
            }

            window.WPBannerizeImpressions = []

            $("div[data-impressions_enabled=\"true\"]").each(
              function(i, e) {
                var banner_id, $this = $(e)

                if($this.is(":visible")) {
                  banner_id = $this.data("banner_id")

                  if(banner_id > 0) {

                    console.log("push", banner_id)

                    WPBannerizeImpressions.push(banner_id)
                    $this.data("impressions_enabled", false)
                  }
                }
              }
            )

            if(window.WPBannerizeImpressions.length > 0) {

              console.log("post", WPBannerizeImpressions)

              $.post(ajaxurl,
                {
                  action    : "wp_bannerize_add_impressions",
                  banner_id : WPBannerizeImpressions,
                  referrer  : document.location.href
                },
                function(data) {

                }
              )
            }
          }

          function _initClicks()
          {
            // clicks
            if(!window.WPBannerize.General.clicks_enabled) {
              return
            }

            $("div[data-clicks_enabled=\"true\"]").each(
              function(i, e) {
                if($(e).is(":visible")) {
                  var banner_id = $(e).data("banner_id")

                  // Remove all previous
                  $(e).find("a").off("click")

                  // Attach my event
                  $(e).find("a").on("click",
                    function() {
                      // Ajax
                      $.post(ajaxurl,
                        {
                          action    : "wp_bannerize_add_clicks",
                          banner_id : banner_id,
                          referrer  : document.location.href
                        },
                        function(data) {
                          //
                        }
                      )
                    })
                }
              })
          }

          _initImpressions()
          _initClicks()

        })
      </script>
        <script> /* <![CDATA[ */var tribe_l10n_datatables = {"aria":{"sort_ascending":": activate to sort column ascending","sort_descending":": activate to sort column descending"},"length_menu":"Show _MENU_ entries","empty_table":"No data available in table","info":"Showing _START_ to _END_ of _TOTAL_ entries","info_empty":"Showing 0 to 0 of 0 entries","info_filtered":"(filtered from _MAX_ total entries)","zero_records":"No matching records found","search":"Search:","all_selected_text":"All items on this page were selected. ","select_all_link":"Select all pages","clear_selection":"Clear Selection.","pagination":{"all":"All","next":"Next","previous":"Previous"},"select":{"rows":{"0":"","_":": Selected %d rows","1":": Selected 1 row"}},"datepicker":{"dayNames":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"dayNamesShort":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"dayNamesMin":["S","M","T","W","T","F","S"],"monthNames":["January","February","March","April","May","June","July","August","September","October","November","December"],"monthNamesShort":["January","February","March","April","May","June","July","August","September","October","November","December"],"monthNamesMin":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"nextText":"Next","prevText":"Prev","currentText":"Today","closeText":"Done","today":"Today","clear":"Clear"}};/* ]]> */ </script><script>(function() {function addEventListener(element,event,handler) {
	if(element.addEventListener) {
		element.addEventListener(event,handler, false);
	} else if(element.attachEvent){
		element.attachEvent('on'+event,handler);
	}
}function maybePrefixUrlField() {
	if(this.value.trim() !== '' && this.value.indexOf('http') !== 0) {
		this.value = "http://" + this.value;
	}
}

var urlFields = document.querySelectorAll('.mc4wp-form input[type="url"]');
if( urlFields && urlFields.length > 0 ) {
	for( var j=0; j < urlFields.length; j++ ) {
		addEventListener(urlFields[j],'blur',maybePrefixUrlField);
	}
}/* test if browser supports date fields */
var testInput = document.createElement('input');
testInput.setAttribute('type', 'date');
if( testInput.type !== 'date') {

	/* add placeholder & pattern to all date fields */
	var dateFields = document.querySelectorAll('.mc4wp-form input[type="date"]');
	for(var i=0; i<dateFields.length; i++) {
		if(!dateFields[i].placeholder) {
			dateFields[i].placeholder = 'YYYY-MM-DD';
		}
		if(!dateFields[i].pattern) {
			dateFields[i].pattern = '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])';
		}
	}
}

})();</script><link rel='stylesheet' id='wp-bannerize-widget-css'  href='https://assafinaonline.com/wp-content/plugins/wp-bannerize-pro/public/css/wp-bannerize-widget.css?ver=5.2.7' type='text/css' media='all' />
<script type='text/javascript' src='https://assafinaonline.com/wp-content/plugins/ekit-headerfooter/elements/widgets/nav-menu/assets/js/jquery.easing.js?ver=5.2.7'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/plugins/ekit-headerfooter/elements/widgets/nav-menu/assets/js/jquery.smartmenus.min.js?ver=5.2.7'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/plugins/ekit-headerfooter/elements/widgets/nav-menu/assets/js/menu-script.js?ver=5.2.7'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/plugins/ekit-megamenu/assets/js/frontend-script.js?ver=5.2.7'></script>
<script type='text/javascript'>
function heateorSssLoadEvent(e) {var t=window.onload;if (typeof window.onload!="function") {window.onload=e}else{window.onload=function() {t();e()}}};	var heateorSssSharingAjaxUrl = 'https://assafinaonline.com/wp-admin/admin-ajax.php', heateorSssCloseIconPath = 'https://assafinaonline.com/wp-content/plugins/sassy-social-share/public/../images/close.png', heateorSssPluginIconPath = 'https://assafinaonline.com/wp-content/plugins/sassy-social-share/public/../images/logo.png', heateorSssHorizontalSharingCountEnable = 0, heateorSssVerticalSharingCountEnable = 0, heateorSssSharingOffset = -10; var heateorSssMobileStickySharingEnabled = 1;var heateorSssCopyLinkMessage = "Link copied.";var heateorSssUrlCountFetched = [], heateorSssSharesText = 'Shares', heateorSssShareText = 'Share';function heateorSssPopup(e) {window.open(e,"popUpWindow","height=400,width=600,left=400,top=100,resizable,scrollbars,toolbar=0,personalbar=0,menubar=no,location=no,directories=no,status")};var heateorSssWhatsappShareAPI = "web";
</script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/plugins/sassy-social-share/public/js/sassy-social-share-public.js?ver=3.3.8'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-includes/js/jquery/ui/core.min.js?ver=1.11.4'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-includes/js/jquery/ui/position.min.js?ver=1.11.4'></script>
<script type='text/javascript'>
/* <![CDATA[ */
var pum_vars = {"version":"1.8.14","ajaxurl":"https:\/\/assafinaonline.com\/wp-admin\/admin-ajax.php","restapi":"https:\/\/assafinaonline.com\/wp-json\/pum\/v1","rest_nonce":null,"default_theme":"102023","debug_mode":"","disable_tracking":"","home_url":"\/","message_position":"top","core_sub_forms_enabled":"1","popups":[]};
var ajaxurl = "https:\/\/assafinaonline.com\/wp-admin\/admin-ajax.php";
var pum_debug_vars = {"debug_mode_enabled":"Popup Maker: Debug Mode Enabled","debug_started_at":"Debug started at:","debug_more_info":"For more information on how to use this information visit https:\/\/docs.wppopupmaker.com\/?utm_medium=js-debug-info&utm_campaign=ContextualHelp&utm_source=browser-console&utm_content=more-info","global_info":"Global Information","localized_vars":"Localized variables","popups_initializing":"Popups Initializing","popups_initialized":"Popups Initialized","single_popup_label":"Popup: #","theme_id":"Theme ID: ","label_method_call":"Method Call:","label_method_args":"Method Arguments:","label_popup_settings":"Settings","label_triggers":"Triggers","label_cookies":"Cookies","label_delay":"Delay:","label_conditions":"Conditions","label_cookie":"Cookie:","label_settings":"Settings:","label_selector":"Selector:","label_mobile_disabled":"Mobile Disabled:","label_tablet_disabled":"Tablet Disabled:","label_event":"Event: %s","triggers":{"click_open":"Click Open","auto_open":"Time Delay \/ Auto Open"},"cookies":{"on_popup_close":"On Popup Close","on_popup_open":"On Popup Open","pum_sub_form_success":"Subscription Form: Successful","pum_sub_form_already_subscribed":"Subscription Form: Already Subscribed","manual":"Manual JavaScript","ninja_form_success":"Ninja Form Success"}};
var pum_sub_vars = {"ajaxurl":"https:\/\/assafinaonline.com\/wp-admin\/admin-ajax.php","message_position":"top"};
var pum_popups = {"pum-102102":{"disable_on_mobile":false,"disable_on_tablet":false,"custom_height_auto":false,"scrollable_content":false,"position_from_trigger":false,"position_fixed":false,"overlay_disabled":false,"stackable":false,"disable_reposition":false,"close_on_overlay_click":false,"close_on_esc_press":false,"close_on_f4_press":false,"disable_form_reopen":false,"disable_accessibility":false,"theme_id":"102023","size":"medium","responsive_min_width":"0%","responsive_max_width":"100%","custom_width":"640px","custom_height":"380px","animation_type":"fade","animation_speed":"350","animation_origin":"center top","location":"center top","position_top":"100","position_bottom":"0","position_left":"0","position_right":"0","zindex":"1999999999","close_button_delay":"0","triggers":[],"cookies":[],"theme_slug":"default-theme","id":102102,"slug":"newsletter-form"}};
/* ]]> */
</script>
<script type='text/javascript' src='//assafinaonline.com/wp-content/uploads/pum/pum-site-scripts.js?defer&#038;generated=1594754907&#038;ver=1.8.14'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/themes/vinkmag/assets/js/popper.min.js?ver=1.6.1'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/themes/vinkmag/assets/js/bootstrap.min.js?ver=1.6.1'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/plugins/carousel-slider/assets/lib/magnific-popup/jquery.magnific-popup.min.js?ver=1.1.0'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/plugins/carousel-slider/assets/lib/owl-carousel/owl.carousel.min.js?ver=2.3.4'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/themes/vinkmag/assets/js/slick.min.js?ver=1.6.1'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/themes/vinkmag/assets/js/echo.min.js?ver=1.6.1'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/themes/vinkmag/assets/js/instafeed.min.js?ver=1.6.1'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/themes/vinkmag/assets/js/jquery.mCustomScrollbar.concat.min.js?ver=1.6.1'></script>
<script type='text/javascript'>
/* <![CDATA[ */
var vinkmag_ajax = {"ajax_url":"https:\/\/assafinaonline.com\/wp-admin\/admin-ajax.php"};
/* ]]> */
</script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/themes/vinkmag/assets/js/script.js?ver=1.6.1'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-includes/js/wp-embed.min.js?ver=5.2.7'></script>
<script type='text/javascript'>
/* <![CDATA[ */
var mc4wp_forms_config = [];
/* ]]> */
</script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/plugins/mailchimp-for-wp/assets/js/forms-api.min.js?ver=4.7'></script>
<!--[if lte IE 9]>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/plugins/mailchimp-for-wp/assets/js/third-party/placeholders.min.js?ver=4.7'></script>
<![endif]-->
<script type='text/javascript' src='https://assafinaonline.com/wp-content/plugins/elementor/assets/js/frontend-modules.min.js?ver=2.7.5'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/plugins/elementor/assets/lib/dialog/dialog.min.js?ver=4.7.3'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/plugins/elementor/assets/lib/waypoints/waypoints.min.js?ver=4.0.2'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/plugins/elementor/assets/lib/swiper/swiper.min.js?ver=4.4.6'></script>
<script type='text/javascript'>
var elementorFrontendConfig = {"environmentMode":{"edit":false,"wpPreview":false},"is_rtl":false,"breakpoints":{"xs":0,"sm":480,"md":768,"lg":1025,"xl":1440,"xxl":1600},"version":"2.7.5","urls":{"assets":"https:\/\/assafinaonline.com\/wp-content\/plugins\/elementor\/assets\/"},"settings":{"page":[],"general":{"elementor_global_image_lightbox":"yes","elementor_enable_lightbox_in_editor":"yes"}},"post":{"id":101995,"title":"About Us","excerpt":""}};
</script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/plugins/elementor/assets/js/frontend.min.js?ver=2.7.5'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/plugins/ekit-megamenu/app/elements/widgets/assets/js/jQuery.tab.js?ver=1.0.1'></script>
<script type='text/javascript' src='https://assafinaonline.com/wp-content/themes/vinkmag/assets/js/elementor.js?ver=1.6.1'></script>
<style type="text/css"></style>    <div id="back-to-top" class="back-to-top" style="">
        <button class="btn btn-primary" title="Back to Top">
            <i class="fa fa-angle-up"></i>
        </button>
        </div>
    </body>
</html>`;


//
var doc = new DomParser().parseFromString(htmlString, 'text/html');
var goldenSponsorDOM = doc.getElementById('wp-bannerize-widget-4').getElementsByTagName('a');
var goldenSponsor2DOM = doc.getElementById('wp-bannerize-widget-3').getElementsByTagName('a');
var sponsorsDOM = doc.getElementById('wp-bannerize-widget-2').getElementsByTagName('a');
var imagesList = [];
var sponsorsLimit = 4;
var sponsorsPostsOffset = 3;
const setSponsors = () => {
	imagesList = [];
	imagesList = getSponsorsImages(sponsorsDOM, 'standard');
	imagesList = [...imagesList, ...getSponsorsImages(goldenSponsorDOM, 'golden-1')];
	imagesList = [...imagesList, ...getSponsorsImages(goldenSponsor2DOM, 'golden-2')];
	//try {
	imagesList = Enumerable.asEnumerable(imagesList).OrderBy((image) => {
		let title = image.title.split('-')[0];
		return !isNaN(title) ? parseInt(title) : title
	}).ThenBy((image) => {
		let title = image.title.split('-')[1];
		return title ? title : null;
	}).ToArray();
	//}
	// catch{
	//     //console.log('Article does not contain a pdf link');
	//     return (<View><Text>No sponsors!</Text></View>);
	// }
}

const getSponsorsImages = (dom, tag) => {
	let images = [];
	for (let i = 0; i < dom.length; i++) {
		let link = dom[i].getAttribute('href');
		let imageUrl = dom[i].getElementsByTagName('img')[0].getAttribute('src');
		let title = dom[i].getElementsByTagName('img')[0].getAttribute('title');
		images.push({ link: link, imageUrl: imageUrl, title: title, tag: tag });
	}
	return images;
}

setSponsors();
const getSponsors = (start, limit) => {
	// debugger;
	return Enumerable.asEnumerable(imagesList).Where(img => img.tag === 'standard').Skip(start).Take(limit).ToArray();
}

const getGoldenSponsors = () => {
	return Enumerable.asEnumerable(imagesList).Where(img => (img.tag === 'golden-1' || img.tag === 'golden-2')).OrderBy(img => img.tag).ToArray();
}


const CARD_HEIGHT = 240;
const PostsList = (props) => {
	const flatRef = useRef();
	//const search = { props };
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [isSearchMode, setSearchMode] = useState(props.search ? true : false);
	const [currentPage, setCurrentPage] = useState(1);
	//var currentPage = useRef(1);
	var availablePosts = useSelector(state => { return isSearchMode ? state.posts.filteredPosts : state.posts.posts });
	var categoryPosts = useSelector(state => state.posts.categoryPosts);
	var favoritePosts = useSelector(state => state.posts.favoritePosts);
	var stopSearchPagination = useSelector(state => state.posts.stopSearchPagination);
	var stopHomePagination = useSelector(state => state.posts.stopHomePagination);
	var stopCategoryPagination = useSelector(state => state.posts.stopCategoryPagination);
	var posts = !props.isFavorites ? availablePosts : favoritePosts;
	if (props.categoryId)
		posts = categoryPosts;

	const dispatch = useDispatch();

	useEffect(() => {
		if (props.scrollToTop && props.scrollToTop.length > 0) {
			flatRef.current.scrollToOffset({ animated: true, offset: 0 });
		}
	}, [props.scrollToTop]);



	useEffect(() => {
		const loadPosts = async () => {
			console.log(`search:${props.search}`);
			setIsLoading(true);
			setHasError(false);
			setCurrentPage(1);
			//currentPage = 1;
			//setSearchMode(props.search ? true : false);
			try {
				if (isSearchMode)
					await dispatch(PostsActions.searchPosts(props.search));
				else if (!props.isFavorites)
					await dispatch(PostsActions.fetchPosts(props.categoryId, currentPage));
				else await dispatch(PostsActions.fetchFavorites());
			} catch (error) {
				setHasError(true);
			}
			setIsLoading(false);
		}
		loadPosts();
	}, [dispatch, props.search, props.categoryId, props.isFavorites]);


	const endOfListHandler = useCallback(() => {
		//var stopPaginationIndicator = isSearchMode ? stopSearchPagination : stopHomePagination;
		//if (!isRefreshing && !stopPaginationIndicator) {
		console.log('set page');
		setCurrentPage(p => p + 1);
		//currentPage = currentPage + 1;
		//}
	}, [dispatch]);

	useEffect(() => {
		const paginate = async () => {
			var stopPaginationIndicator = isSearchMode ? stopSearchPagination : !props.categoryId ? stopHomePagination : stopCategoryPagination;
			if ((currentPage > 0 && posts && posts.length > 0) /*&& !isRefreshing*/ && !stopPaginationIndicator) {
				console.log('paginate:' + currentPage);
				setScrollerRefreshing(true);
				if (isSearchMode)
					await dispatch(PostsActions.searchPosts(props.search, currentPage));
				else
					await dispatch(PostsActions.fetchPosts(props.categoryId, currentPage));
				setScrollerRefreshing(false);
				setRefreshing(false);
			}
		}
		if (!props.isFavorites)
			paginate();
	}, [currentPage/*, props.search*/]);


	console.log(availablePosts.length);
	//var posts = Enumerable.asEnumerable(availablePosts).Where(p => !p.title.rendered.includes('Issue')).ToArray();


	const [isRefreshing, setRefreshing] = useState(false);
	const [isScrollerRefreshing, setScrollerRefreshing] = useState(false);
	const handleSponsorsDisplay = (loadedAt) => {
		let skip = ((loadedAt / sponsorsPostsOffset) * sponsorsLimit) - sponsorsLimit;
		if (skip <= imagesList.length) {
			//console.log(`loadedAt:${loadedAt}, skip:${skip}`);
			return (
				<View>
					{loadedAt == sponsorsPostsOffset ?
						<SponsorsList images={getGoldenSponsors()}></SponsorsList> : <View></View>
					}
					<View>
						<SponsorsList images={getSponsors(skip, sponsorsLimit)}></SponsorsList>
					</View>
				</View>
			)
		}
		return;
	}

	// const onRefresh = () => {
	// 	setRefreshing(true);
	// 	setTimeout(() => {
	// 		setRefreshing(false);
	// 	}, 1000)
	// };
	const onRefresh = useCallback(() => {
		if (!props.isFavorites) {
			if (currentPage && currentPage > 1)
				setRefreshing(true);
			setCurrentPage(1);
		}
	});

	const navigateToPost = (id, title, mediaUrl, post) => {
		//debugger;
		let routeName = props.navigation.getParam('categoryId') ? 'CategoryPost' : (props.isFavorites ? 'FavoritePost' : 'Post');
		if (props.search)
			routeName = "SearchPost";
		props.navigation.push(routeName, { id: id, title: title, mediaUrl: mediaUrl, post: post });
	};

	const getPostMediaUrl = useCallback((post) => {
		if (post && post['_embedded']['wp:featuredmedia'] && post['_embedded']['wp:featuredmedia'].length > 0) {
			var mediaUrl = post['_embedded']['wp:featuredmedia'][0].source_url;
			if (mediaUrl)
				return { uri: mediaUrl };
			return require(`../assets/placeholder.png`);
		}
		return require(`../assets/placeholder.png`);

	});

	const renderPost = (itemData) => {
		return (
			<View>
				<View style={styles.postContainer}>
					<TouchableComponent onPress={() => { navigateToPost(itemData.item.id, decodeString(itemData.item.title.rendered), getPostMediaUrl(itemData.item), itemData.item) }}>
						<View style={styles.imageContainer}>
							<ImageBackground style={styles.imageBackground} source={getPostMediaUrl(itemData.item)}>
								<View style={styles.imageBackgroundOverlay}>
									<View style={styles.textContainer}>
										<View style={styles.titleContainer}>
											<MyText numberOfLines={2} bold={true} style={styles.titleText}>{decodeString(itemData.item.title.rendered.trim())}</MyText>
										</View>
										{itemData.item.date ?
											(<View style={styles.dateContainer}>
												<FontAwesome name="clock-o" color='#fff' size={15} ></FontAwesome>
												<MyText bold={true} style={styles.dateText}>{new Date(itemData.item.date).toDateString()}</MyText>
											</View>) : ''}
									</View>
								</View>
							</ImageBackground>
						</View>
					</TouchableComponent>
				</View>
				{
					(props.showBetweenPostsSponsors && ((itemData.index + 1) % sponsorsPostsOffset == 0)) ?
						handleSponsorsDisplay(itemData.index + 1)
						: <View></View>
				}
				{
					((itemData.index == posts.length - 1) && isScrollerRefreshing) ?
						<View style={{ alignItems: 'center', padding: 5, marginVertical: 3 }}>
							{/* <MyText style={{ textAlign: 'center' }}>Loading more...</MyText> */}
							<ActivityIndicator size="large" color={CustomColors.primaryColor}></ActivityIndicator>
						</View>
						:
						<View></View>
				}

			</View>
		)
	};

	if (hasError) {
		return (
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<MyText style={{ color: CustomColors.error, fontSize: 17 }}>Oops something went wrong!</MyText>
			</View>
		)
	}

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<View>
					<ActivityIndicator size="large" color={CustomColors.primaryColor} ></ActivityIndicator>
				</View>
			</View>
		)
	}
	return (
		<View style={{ flex: 1 }}>
			{/* <View style={{ flex: 1 }}>
                <SponsorsList></SponsorsList>
            </View> */}
			<View style={{ flex: 1 }}>
				{
					posts && posts.length > 0 ?
						<FlatList
							ref={flatRef}
							//contentContainerStyle={{ flex: 1 }}
							//onEndReachedThreshold={8}
							onEndReached={(info) => { console.log(info); endOfListHandler(); }}
							data={posts}
							keyExtractor={(item) => item.id.toString()}
							renderItem={renderPost}
							refreshControl={
								<RefreshControl
									onRefresh={() => { console.log('refresh'); onRefresh(); }}
									refreshing={isRefreshing}>
								</RefreshControl>}
						>
						</FlatList>
						:
						<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
							<MyText bold={false} style={{ fontSize: 16, textAlign: 'center' }}> No results found</MyText>
						</View>
				}
			</View>
		</View>
	)
};

const styles = StyleSheet.create({
	postContainer: {
		flex: 1,
		height: CARD_HEIGHT,
		borderColor: CustomColors.grey,
		elevation: 3,
		margin: 10,
		borderRadius: 10,
		overflow: 'hidden',
		borderWidth: 1
	},
	imageContainer: {
		width: '100%'
	},
	imageBackground: {
		width: '100%',
		height: CARD_HEIGHT,
		justifyContent: 'flex-end'
	},
	imageBackgroundOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.30)',
		justifyContent: 'flex-end'
	},
	textContainer: {
		backgroundColor: 'rgba(0,0,0,0.6)'
	},
	dateContainer: {
		padding: 7,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	dateText: {
		color: '#fff',
		fontSize: 12,
		marginLeft: 5
	},
	titleContainer: {
		padding: 7
	},
	titleText: {
		color: '#fff',
		fontSize: 18
	}
});

export default PostsList;
