(function () {
  var currentScript = document.currentScript;
  var root = new URL("../", currentScript.src);
  var currentPath = decodeURIComponent(window.location.pathname).replace(/\/index\.html$/, "/");

  function url(path) {
    return new URL(path, root).href;
  }

  function isCurrent(path) {
    var target = decodeURIComponent(new URL(path, root).pathname).replace(/\/index\.html$/, "/");
    return currentPath === target;
  }

  function inSection(paths) {
    return paths.some(isCurrent);
  }

  function liClass(base, active) {
    return base + (active ? " current-menu-item current_page_item" : "");
  }

  function parentClass(base, active) {
    return base + (active ? " current-menu-ancestor current-menu-parent" : "");
  }

  function mainItem(id, text, href, active) {
    var aria = active ? ' aria-current="page"' : "";
    return '<li id="' + id + '" class="' + liClass("menu-item menu-item-type-post_type menu-item-object-page awb-menu__li awb-menu__main-li awb-menu__main-li_regular", active) + '" data-item-id="' + id.replace("menu-item-", "") + '">' +
      '<span class="awb-menu__main-background-default awb-menu__main-background-default_fade"></span>' +
      '<span class="awb-menu__main-background-active awb-menu__main-background-active_fade"></span>' +
      '<a href="' + href + '" class="awb-menu__main-a awb-menu__main-a_regular"' + aria + '><span class="menu-text">' + text + '</span></a>' +
      '</li>';
  }

  function subItem(id, text, href, active, title) {
    var aria = active ? ' aria-current="page"' : "";
    var titleAttr = title ? ' title="' + title + '"' : "";
    return '<li id="' + id + '" class="' + liClass("menu-item menu-item-type-post_type menu-item-object-page awb-menu__li awb-menu__sub-li", active) + '">' +
      '<a' + titleAttr + ' href="' + href + '" class="awb-menu__sub-a"' + aria + '><span>' + text + '</span></a>' +
      '</li>';
  }

  function injectHeaderStyles() {
    if (document.getElementById("fusion-builder-template-header-css")) {
      return;
    }

    var style = document.createElement("style");
    style.id = "fusion-builder-template-header-css";
    style.type = "text/css";
    style.textContent = [
      "#top_banner .fusion-countdown .fusion-digit > div {",
      "  color: white;",
      "}",
      "#main_banner .fusion-countdown-counter-wrapper {",
      "  margin-top: 0;",
      "  margin-bottom: 0;",
      "}",
      "@media only screen and (max-width: 800px) {",
      "}",
      ".awb-menu__main-a:hover,",
      ".awb-menu__main-a a:hover,",
      ".awb-menu__sub-a:hover,",
      ".awb-menu__sub-a a:hover {",
      "  text-weight: bold;",
      "}",
      "ul#menu-soga li a {",
      "  cursor: pointer;",
      "}",
      ".fusion-tb-header {",
      "  position: sticky;",
      "  top: 0;",
      "  z-index: 20051;",
      "  background: #fff;",
      "}",
      ".fusion-tb-header ul {",
      "  list-style: none;",
      "  margin: 0;",
      "  padding: 0;",
      "}",
      ".fusion-tb-header .avada-main-menu {",
      "  padding: 0 60px;",
      "  background: #fff;",
      "  box-shadow: 0 4px 16px rgba(35, 35, 35, 0.23);",
      "}",
      ".fusion-tb-header .fusion-builder-row {",
      "  display: flex;",
      "  align-items: center;",
      "  justify-content: space-between;",
      "  min-height: 48px;",
      "  width: 100% !important;",
      "  max-width: 100% !important;",
      "  margin: 0 !important;",
      "}",
      ".fusion-tb-header .fusion-builder-column-0 {",
      "  flex: 0 0 auto;",
      "  padding-left: 10px;",
      "}",
      ".fusion-tb-header .fusion-builder-column-1 {",
      "  flex: 1 1 auto;",
      "  padding-top: 8px;",
      "  padding-bottom: 8px;",
      "}",
      ".fusion-tb-header .fusion-column-wrapper {",
      "  display: flex;",
      "  align-items: center;",
      "}",
      ".fusion-tb-header .fusion-builder-column-1 .fusion-column-wrapper {",
      "  justify-content: flex-end;",
      "}",
      ".fusion-tb-header .fusion-image-element {",
      "  margin: 8px 0;",
      "  max-width: 73px;",
      "}",
      ".fusion-tb-header .fusion-imageframe img {",
      "  display: block;",
      "  width: 100%;",
      "  max-width: 73px;",
      "  height: auto;",
      "}",
      ".fusion-tb-header .awb-menu {",
      "  position: relative;",
      "  display: flex;",
      "  justify-content: flex-end;",
      "  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;",
      "  font-size: 15px;",
      "}",
      ".fusion-tb-header .awb-menu__main-ul {",
      "  display: flex;",
      "  align-items: center;",
      "  gap: 2px;",
      "}",
      ".fusion-tb-header .menu-item {",
      "  position: relative;",
      "}",
      ".fusion-tb-header .awb-menu__main-a,",
      ".fusion-tb-header .awb-menu__sub-a {",
      "  display: flex;",
      "  align-items: center;",
      "  justify-content: center;",
      "  color: var(--awb-color7, #232323);",
      "  text-decoration: none;",
      "  white-space: nowrap;",
      "}",
      ".fusion-tb-header .awb-menu__main-a {",
      "  min-height: 48px;",
      "  padding: 6px 0 6px 32px;",
      "}",
      ".fusion-tb-header .awb-menu__main-a:hover,",
      ".fusion-tb-header .awb-menu__sub-a:hover,",
      ".fusion-tb-header .current-menu-item > a,",
      ".fusion-tb-header .current_page_item > a,",
      ".fusion-tb-header .current-menu-parent > a,",
      ".fusion-tb-header .current-menu-ancestor > a {",
      "  color: var(--awb-color8, #000);",
      "}",
      ".fusion-tb-header .awb-menu__sub-ul {",
      "  position: absolute;",
      "  top: 100%;",
      "  left: 50%;",
      "  z-index: 20052;",
      "  display: none;",
      "  min-width: 220px;",
      "  transform: translateX(-50%);",
      "  background: var(--awb-color2, #f7f7f7);",
      "  box-shadow: 0 3px 16px rgba(35, 35, 35, 0.23);",
      "}",
      ".fusion-tb-header .menu-item:hover > .awb-menu__sub-ul,",
      ".fusion-tb-header .menu-item:focus-within > .awb-menu__sub-ul,",
      ".fusion-tb-header .menu-item.expanded > .awb-menu__sub-ul {",
      "  display: block;",
      "}",
      ".fusion-tb-header .awb-menu__sub-a {",
      "  min-height: 48px;",
      "  padding: 16px 32px;",
      "}",
      ".fusion-tb-header .awb-menu__sub-li .awb-menu__sub-ul_grand {",
      "  top: 0;",
      "  left: 100%;",
      "  transform: none;",
      "}",
      ".fusion-tb-header .awb-menu__open-nav-submenu-hover::after {",
      "  content: \"\";",
      "  display: inline-block;",
      "  margin-left: 8px;",
      "  border-left: 4px solid transparent;",
      "  border-right: 4px solid transparent;",
      "  border-top: 5px solid currentColor;",
      "}",
      ".fusion-tb-header .awb-menu__m-toggle,",
      ".fusion-tb-header .awb-menu__open-nav-submenu_mobile {",
      "  display: none;",
      "}",
      ".fusion-tb-header .screen-reader-text {",
      "  position: absolute;",
      "  width: 1px;",
      "  height: 1px;",
      "  overflow: hidden;",
      "  clip: rect(1px, 1px, 1px, 1px);",
      "}",
      "@media only screen and (max-width: 800px) {",
      "  .fusion-tb-header .avada-main-menu {",
      "    padding: 0 30px;",
      "  }",
      "  .fusion-tb-header .fusion-builder-row {",
      "    min-height: 48px;",
      "  }",
      "  .fusion-tb-header .awb-menu__m-toggle {",
      "    display: flex;",
      "    align-items: center;",
      "    justify-content: center;",
      "    width: 44px;",
      "    height: 44px;",
      "    margin-left: auto;",
      "    padding: 0;",
      "    color: var(--awb-color4, #444);",
      "    border: 0;",
      "    background: transparent;",
      "    font-size: 22px;",
      "  }",
      "  .fusion-tb-header .awb-menu__m-collapse-icon-open::before {",
      "    content: \"☰\";",
      "  }",
      "  .fusion-tb-header .awb-menu__m-collapse-icon-close::before {",
      "    content: \"×\";",
      "  }",
      "  .fusion-tb-header .awb-menu__m-collapse-icon-close {",
      "    display: none;",
      "  }",
      "  .fusion-tb-header .awb-menu.expanded .awb-menu__m-collapse-icon-open {",
      "    display: none;",
      "  }",
      "  .fusion-tb-header .awb-menu.expanded .awb-menu__m-collapse-icon-close {",
      "    display: inline;",
      "  }",
      "  .fusion-tb-header .awb-menu__main-ul {",
      "    position: absolute;",
      "    top: 48px;",
      "    right: 0;",
      "    left: auto;",
      "    display: none;",
      "    width: min(360px, calc(100vw - 60px));",
      "    max-height: calc(100vh - 56px);",
      "    overflow: auto;",
      "    background: var(--awb-color2, #f7f7f7);",
      "    box-shadow: 0 3px 16px rgba(35, 35, 35, 0.23);",
      "  }",
      "  .fusion-tb-header .awb-menu.expanded .awb-menu__main-ul {",
      "    display: block;",
      "  }",
      "  .fusion-tb-header .awb-menu__main-a,",
      "  .fusion-tb-header .awb-menu__sub-a {",
      "    justify-content: flex-start;",
      "    min-height: 44px;",
      "    padding: 13px 44px 13px 20px;",
      "    white-space: normal;",
      "  }",
      "  .fusion-tb-header .awb-menu__sub-ul,",
      "  .fusion-tb-header .awb-menu__sub-li .awb-menu__sub-ul_grand {",
      "    position: static;",
      "    display: none;",
      "    min-width: 0;",
      "    transform: none;",
      "    background: #fff;",
      "    box-shadow: none;",
      "  }",
      "  .fusion-tb-header .menu-item:hover > .awb-menu__sub-ul,",
      "  .fusion-tb-header .menu-item:focus-within > .awb-menu__sub-ul {",
      "    display: none;",
      "  }",
      "  .fusion-tb-header .menu-item.expanded > .awb-menu__sub-ul {",
      "    display: block;",
      "  }",
      "  .fusion-tb-header .awb-menu__open-nav-submenu_mobile {",
      "    position: absolute;",
      "    top: 0;",
      "    right: 0;",
      "    display: block;",
      "    width: 44px;",
      "    height: 44px;",
      "    border: 0;",
      "    background: transparent;",
      "  }",
      "  .fusion-tb-header .awb-menu__open-nav-submenu_mobile::before {",
      "    content: \"+\";",
      "    color: currentColor;",
      "    font-size: 20px;",
      "  }",
      "  .fusion-tb-header .menu-item.expanded > .awb-menu__open-nav-submenu_mobile::before {",
      "    content: \"−\";",
      "  }",
      "  .fusion-tb-header .awb-menu__open-nav-submenu-hover {",
      "    display: none;",
      "  }",
      "}"
    ].join("\n");
    document.head.appendChild(style);
  }

  function setupHeaderInteractions() {
    document.querySelectorAll(".fusion-tb-header .awb-menu").forEach(function (nav) {
      var toggle = nav.querySelector(".awb-menu__m-toggle");

      if (toggle && !toggle.dataset.siteHeaderBound) {
        toggle.dataset.siteHeaderBound = "true";
        toggle.addEventListener("click", function () {
          var isOpen = nav.classList.toggle("expanded");
          toggle.setAttribute("aria-expanded", String(isOpen));
        });
      }

      nav.querySelectorAll(".awb-menu__open-nav-submenu_mobile").forEach(function (button) {
        if (button.dataset.siteHeaderBound) {
          return;
        }

        button.dataset.siteHeaderBound = "true";
        button.addEventListener("click", function () {
          var item = button.closest(".menu-item-has-children");
          if (!item) {
            return;
          }

          var isOpen = item.classList.toggle("expanded");
          button.setAttribute("aria-expanded", String(isOpen));
        });
      });
    });
  }

  function normalizeStandaloneHeaderWidth(header) {
    var row = header.querySelector(".fusion-builder-row");

    if (!row) {
      return;
    }

    row.style.setProperty("width", "100%", "important");
    row.style.setProperty("max-width", "100%", "important");
    row.style.setProperty("margin-left", "0");
    row.style.setProperty("margin-right", "0");
  }

  var pages = {
    home: "index.html",
    aiot: "sogaaiot/index.html",
    news: "soganews/index.html",
    megaMax: "mega-max-15l-commercial-composter/index.html",
    // megaCommercial: "megacomercialcomposter/index.html",
    megaComposter: "megacomposter/index.html",
    megaVision: "megavision/index.html",
    playRemote: "playremote/index.html",
    tvsoga: "tvsoga/index.html",
    megaGreen: "megagreen/index.html",
    tvsogaApp: "tvsoga-app/index.html",
    megaComposterManual: "megacomposter/manual.html",
    megaVisionManual: "megavision/manual.html",
    fullProducts: "full-products-page-package/index.html",
  };

  var productPages = [
    pages.fullProducts,
    pages.megaMax,
    "mega-max-15%E5%85%AC%E5%8D%87%E5%95%86%E7%94%A8%E5%BB%9A%E9%A4%98%E6%A9%9F/index.html",
    // pages.megaCommercial,
    pages.megaComposter,
    pages.megaVision,
    pages.playRemote,
    pages.tvsoga
  ];
  var downloadPages = [pages.megaGreen, pages.tvsogaApp];
  var manualPages = [pages.megaComposter, pages.megaVision, pages.playRemote];
  var fullProductsActive = isCurrent(pages.fullProducts);
  var megaMaxActive = isCurrent(pages.megaMax) || isCurrent("mega-max-15%E5%85%AC%E5%8D%87%E5%95%86%E7%94%A8%E5%BB%9A%E9%A4%98%E6%A9%9F/index.html");
  var productActive = inSection(productPages);
  var downloadActive = inSection(downloadPages) || inSection(manualPages);

  var html = '' +
    '<div class="fusion-tb-header">' +
    '<div class="fusion-fullwidth fullwidth-box fusion-builder-row-1 fusion-flex-container has-pattern-background has-mask-background avada-main-menu hundred-percent-fullwidth non-hundred-percent-height-scrolling fusion-sticky-container fusion-custom-z-index" style="--link_hover_color: var(--awb-custom_color_6);--link_color: var(--awb-custom_color_1);--awb-border-sizes-top:0px;--awb-border-sizes-bottom:0px;--awb-border-sizes-left:0px;--awb-border-sizes-right:0px;--awb-border-color:var(--awb-color3);--awb-border-radius-top-left:0px;--awb-border-radius-top-right:0px;--awb-border-radius-bottom-right:0px;--awb-border-radius-bottom-left:0px;--awb-z-index:20051;--awb-padding-top:0px;--awb-padding-right:60px;--awb-padding-bottom:0px;--awb-padding-left:60px;--awb-padding-top-medium:0px;--awb-padding-right-medium:30px;--awb-padding-bottom-medium:0px;--awb-padding-left-medium:30px;--awb-margin-top:0px;--awb-margin-bottom:0px;--awb-min-height:48px;--awb-min-height-medium:48px;--awb-min-height-small:48px;--awb-background-color:#ffffff;--awb-background-color-medium:#ffffff;--awb-background-color-small:#ffffff;--awb-sticky-background-color:#ffffff !important;--awb-flex-wrap:wrap;--awb-flex-wrap-medium:wrap;--awb-flex-wrap-small:wrap;--awb-box-shadow:0px 4px 16px 0px rgba(35,35,35,0.23);" data-transition-offset="0" data-sticky-offset="0" data-scroll-offset="0" data-sticky-small-visibility="1" data-sticky-medium-visibility="1" data-sticky-large-visibility="1">' +
    '<div class="fusion-builder-row fusion-row fusion-flex-align-items-flex-start fusion-flex-justify-content-space-between fusion-flex-content-wrap" style="width:104% !important;max-width:104% !important;margin-left: calc(-4% / 2 );margin-right: calc(-4% / 2 );">' +
    '<div class="fusion-layout-column fusion_builder_column fusion-builder-column-0 fusion_builder_column_1_6 1_6 fusion-flex-column fusion-flex-align-self-center" style="--awb-padding-left:10px;--awb-padding-top-medium:0px;--awb-padding-right-medium:0px;--awb-padding-bottom-medium:0px;--awb-padding-left-medium:0px;--awb-padding-top-small:0px;--awb-padding-right-small:0px;--awb-padding-bottom-small:0px;--awb-padding-left-small:0px;--awb-bg-size:cover;--awb-width-large:16.666666666667%;--awb-margin-top-large:0px;--awb-spacing-right-large:11.52%;--awb-margin-bottom-large:0px;--awb-spacing-left-large:11.52%;--awb-width-medium:16.666666666667%;--awb-order-medium:0;--awb-margin-top-medium:0px;--awb-spacing-right-medium:11.52%;--awb-margin-bottom-medium:0px;--awb-spacing-left-medium:11.52%;--awb-width-small:16.666666666667%;--awb-order-small:0;--awb-margin-top-small:0px;--awb-spacing-right-small:11.52%;--awb-margin-bottom-small:0px;--awb-spacing-left-small:11.52%;" data-scroll-devices="small-visibility,medium-visibility,large-visibility">' +
    '<div class="fusion-column-wrapper fusion-column-has-shadow fusion-flex-justify-content-center fusion-content-layout-column"><div class="fusion-image-element" style="text-align:left;--awb-margin-top:8px;--awb-margin-bottom:8px;--awb-max-width:73px;"><span class="fusion-imageframe imageframe-none imageframe-1 hover-type-none"><a class="fusion-no-lightbox" href="' + url(pages.home) + '" target="_self" aria-label="SOGA 科技, 搜咖科技"><img decoding="async" width="145" height="40" alt="SOGA科技" src="' + url("assets/soga_s-5c22250c0a.png") + '" data-orig-src="' + url("assets/soga_s-5c22250c0a.png") + '" class="lazyload img-responsive wp-image-3162"></a></span></div></div>' +
    '</div>' +
    '<div class="fusion-layout-column fusion_builder_column fusion-builder-column-1 fusion_builder_column_5_6 5_6 fusion-flex-column" style="--awb-padding-top:8px;--awb-padding-bottom:8px;--awb-padding-top-medium:16px;--awb-padding-right-medium:0px;--awb-padding-bottom-medium:16px;--awb-padding-left-medium:0px;--awb-padding-top-small:16px;--awb-padding-bottom-small:16px;--awb-bg-size:cover;--awb-width-large:83.333333333333%;--awb-margin-top-large:0px;--awb-spacing-right-large:20px;--awb-margin-bottom-large:0px;--awb-spacing-left-large:20px;--awb-width-medium:60%;--awb-order-medium:0;--awb-margin-top-medium:0px;--awb-spacing-right-medium:20px;--awb-margin-bottom-medium:0px;--awb-spacing-left-medium:20px;--awb-width-small:60%;--awb-order-small:0;--awb-margin-top-small:0px;--awb-spacing-right-small:20px;--awb-margin-bottom-small:0px;--awb-spacing-left-small:20px;" data-scroll-devices="small-visibility,medium-visibility,large-visibility">' +
    '<div class="fusion-column-wrapper fusion-column-has-shadow fusion-flex-justify-content-flex-end fusion-content-layout-row fusion-flex-align-items-center">' +
    '<nav class="awb-menu awb-menu_row awb-menu_em-hover mobile-mode-collapse-to-button awb-menu_icons-top awb-menu_dc-no mobile-trigger-fullwidth-off awb-menu_mobile-toggle awb-menu_indent-center mobile-size-full-absolute loading mega-menu-loading awb-menu_desktop awb-menu_dropdown awb-menu_expand-center awb-menu_transition-fade" style="--awb-font-size:15px;--awb-text-transform:none;--awb-min-height:15px;--awb-gap:2px;--awb-align-items:center;--awb-justify-content:flex-end;--awb-items-padding-top:6px;--awb-items-padding-bottom:6px;--awb-items-padding-left:32px;--awb-border-color:rgba(247,247,247,0);--awb-color:var(--awb-color7);--awb-active-color:var(--awb-color8);--awb-active-bg:rgba(255,255,255,0);--awb-active-border-color:rgba(255,255,255,0);--awb-submenu-color:var(--awb-color7);--awb-submenu-bg:var(--awb-color2);--awb-submenu-sep-color:rgba(255,255,255,0.7);--awb-submenu-items-padding-top:16px;--awb-submenu-items-padding-right:32px;--awb-submenu-items-padding-bottom:16px;--awb-submenu-items-padding-left:32px;--awb-submenu-active-bg:var(--awb-color1);--awb-submenu-active-color:var(--awb-color8);--awb-submenu-space:8px;--awb-submenu-font-size:15px;--awb-submenu-text-transform:none;--awb-icons-size:14;--awb-icons-color:var(--awb-color7);--awb-icons-hover-color:var(--awb-color8);--awb-arrows-size-height:6px;--awb-arrows-size-width:26px;--awb-main-justify-content:flex-start;--awb-sub-justify-content:center;--awb-mobile-bg:var(--awb-color2);--awb-mobile-color:var(--awb-color8);--awb-mobile-active-bg:#ffffff;--awb-mobile-active-color:#000000;--awb-trigger-padding-top:15px;--awb-trigger-padding-right:0px;--awb-mobile-trigger-color:var(--awb-color4);--awb-mobile-font-size:15px;--awb-mobile-text-transform:none;--awb-mobile-line-height:1.2em;--awb-mobile-letter-spacing:-0.01em;--awb-thumbnail-size-width:64px;--awb-thumbnail-size-height:32px;--awb-mobile-justify:center;--awb-mobile-caret-left:auto;--awb-mobile-caret-right:0;--awb-box-shadow:0px 3px 16px 0px rgba(35,35,35,0.23);--awb-fusion-font-family-typography:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen-Sans, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif;--awb-fusion-font-style-typography:normal;--awb-fusion-font-weight-typography:400;--awb-fusion-font-family-submenu-typography:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen-Sans, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif;--awb-fusion-font-style-submenu-typography:normal;--awb-fusion-font-weight-submenu-typography:400;--awb-fusion-font-family-mobile-typography:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen-Sans, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif;--awb-fusion-font-style-mobile-typography:normal;--awb-fusion-font-weight-mobile-typography:400;" aria-label="SOGA" data-breakpoint="800" data-count="0" data-transition-type="fade" data-transition-time="300" data-expand="center">' +
    '<button type="button" class="awb-menu__m-toggle awb-menu__m-toggle_no-text" aria-expanded="false" aria-controls="menu-soga"><span class="awb-menu__m-toggle-inner"><span class="collapsed-nav-text"><span class="screen-reader-text">Toggle Navigation</span></span><span class="awb-menu__m-collapse-icon awb-menu__m-collapse-icon_no-text"><span class="awb-menu__m-collapse-icon-open awb-menu__m-collapse-icon-open_no-text fa-bars fas"></span><span class="awb-menu__m-collapse-icon-close awb-menu__m-collapse-icon-close_no-text fa-times fas"></span></span></span></button>' +
    '<ul id="menu-soga" class="fusion-menu awb-menu__main-ul awb-menu__main-ul_row">' +
    '<li id="menu-item-2552" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-home menu-item-has-children menu-item-2552 awb-menu__li awb-menu__main-li awb-menu__main-li_regular" data-item-id="2552"><span class="awb-menu__main-background-default awb-menu__main-background-default_fade"></span><span class="awb-menu__main-background-active awb-menu__main-background-active_fade"></span><a href="' + url(pages.home) + '" class="awb-menu__main-a awb-menu__main-a_regular"><span class="menu-text">關於</span><span class="awb-menu__open-nav-submenu-hover"></span></a><button type="button" aria-label="Open submenu of 關於" aria-expanded="false" class="awb-menu__open-nav-submenu_mobile awb-menu__open-nav-submenu_main"></button><ul class="awb-menu__sub-ul awb-menu__sub-ul_main">' +
    subItem("menu-item-2553", "公司簡介", url(pages.home + "#profile"), false) +
    subItem("menu-item-2554", "技術簡介", url(pages.home + "#tech"), false) +
    subItem("menu-item-4703", "SOGA AIoT", url(pages.home + "#aiot"), false) +
    subItem("menu-item-2556", "MEGA 廚餘機皇", url(pages.home + "#megacomposter"), false) +
    subItem("menu-item-2557", "tv.SOGA", url(pages.home + "#tvsoga"), false) +
    '</ul></li>' +
    mainItem("menu-item-6605", "解決方案", url(pages.aiot), isCurrent(pages.aiot)) +
    '<li id="menu-item-2430" class="' + parentClass("a1i0s0 menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-2430 awb-menu__li awb-menu__main-li awb-menu__main-li_regular", productActive) + '" data-classes="a1i0s0" data-item-id="2430"><span class="awb-menu__main-background-default awb-menu__main-background-default_fade"></span><span class="awb-menu__main-background-active awb-menu__main-background-active_fade"></span><a class="awb-menu__main-a awb-menu__main-a_regular"><span class="menu-text">商品</span><span class="awb-menu__open-nav-submenu-hover"></span></a><button type="button" aria-label="Open submenu of 商品" aria-expanded="false" class="awb-menu__open-nav-submenu_mobile awb-menu__open-nav-submenu_main"></button><ul class="awb-menu__sub-ul awb-menu__sub-ul_main">' +
    subItem("menu-item-7082", "MEGA 全系列產品", url(pages.fullProducts), fullProductsActive) +
    subItem("menu-item-7082", "MEGA MAX 15公升商用廚餘機", url(pages.megaMax), megaMaxActive) +
    // subItem("menu-item-5730", "MEGA 商用廚餘機", url(pages.megaCommercial), isCurrent(pages.megaCommercial)) +
    subItem("menu-item-7181", "MEGA PRO 5公升家用廚餘機", "https://shop.tvsoga.com/", false) +
    subItem("menu-item-2815", "MEGA 廚餘機皇", url(pages.megaComposter), isCurrent(pages.megaComposter)) +
    subItem("menu-item-5138", "MEGA VISION 天窗廚餘機", url(pages.megaVision), isCurrent(pages.megaVision)) +
    subItem("menu-item-3606", "Play! Remote 次世代智慧遙控器", url(pages.playRemote), isCurrent(pages.playRemote), "電視專用") +
    subItem("menu-item-3816", "tv.SOGA", url(pages.tvsoga), isCurrent(pages.tvsoga)) +
    '</ul></li>' +
    mainItem("menu-item-5792", "消息", url(pages.news), isCurrent(pages.news)) +
    '<li id="menu-item-2431" class="' + parentClass("a1i0s0 menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-2431 awb-menu__li awb-menu__main-li awb-menu__main-li_regular", downloadActive) + '" data-classes="a1i0s0" data-item-id="2431"><span class="awb-menu__main-background-default awb-menu__main-background-default_fade"></span><span class="awb-menu__main-background-active awb-menu__main-background-active_fade"></span><a class="awb-menu__main-a awb-menu__main-a_regular"><span class="menu-text">下載</span><span class="awb-menu__open-nav-submenu-hover"></span></a><button type="button" aria-label="Open submenu of 下載" aria-expanded="false" class="awb-menu__open-nav-submenu_mobile awb-menu__open-nav-submenu_main"></button><ul class="awb-menu__sub-ul awb-menu__sub-ul_main">' +
    subItem("menu-item-4432", "MEGA GREEN APP", url(pages.megaGreen), isCurrent(pages.megaGreen)) +
    subItem("menu-item-4399", "tv.SOGA APP", url(pages.tvsogaApp), isCurrent(pages.tvsogaApp)) +
    '<li id="menu-item-6764" class="' + parentClass("menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-6764 awb-menu__li awb-menu__sub-li", inSection(manualPages)) + '"><a href="#" class="awb-menu__sub-a"><span>使用手冊</span><span class="awb-menu__open-nav-submenu-hover"></span></a><button type="button" aria-label="Open submenu of 使用手冊" aria-expanded="false" class="awb-menu__open-nav-submenu_mobile awb-menu__open-nav-submenu_sub"></button><ul class="awb-menu__sub-ul awb-menu__sub-ul_grand">' +
    // subItem("menu-item-6766", "MEGA 商用廚餘機", url(pages.megaCommercial + "#manual"), isCurrent(pages.megaCommercial)) +
    subItem("menu-item-6772", "MEGA 廚餘機皇", url(pages.megaComposterManual), isCurrent(pages.megaComposter)) +
    subItem("menu-item-6765", "MEGA VISION 天窗廚餘機", url(pages.megaVisionManual), isCurrent(pages.megaVision)) +
    subItem("menu-item-6767", "Play! Remote 次世代智慧遙控器", "https://drive.google.com/file/d/1XyoMp2cGIX8GRIxrPNC7Cj92Ewv6a4Tl/view?usp=drive_link", isCurrent(pages.playRemote)) +
    '</ul></li></ul></li>' +
    '<li id="menu-item-2433" class="a1i0s0 menu-item menu-item-type-custom menu-item-object-custom menu-item-home menu-item-2433 awb-menu__li awb-menu__main-li awb-menu__main-li_regular" data-classes="a1i0s0" data-item-id="2433"><span class="awb-menu__main-background-default awb-menu__main-background-default_fade"></span><span class="awb-menu__main-background-active awb-menu__main-background-active_fade"></span><a href="' + url(pages.home + "#contactus") + '" class="awb-menu__main-a awb-menu__main-a_regular"><span class="menu-text">聯絡</span></a></li>' +
    '<li id="menu-item-4525" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-4525 awb-menu__li awb-menu__main-li awb-menu__main-li_regular" data-item-id="4525"><span class="awb-menu__main-background-default awb-menu__main-background-default_fade"></span><span class="awb-menu__main-background-active awb-menu__main-background-active_fade"></span><a target="_blank" rel="noopener noreferrer" href="https://mall.tvsoga.com/" class="awb-menu__main-a awb-menu__main-a_regular"><span class="menu-text">商城</span></a></li>' +
    '</ul></nav></div></div></div></div></div>';

  injectHeaderStyles();

  document.querySelectorAll("[data-site-header]").forEach(function (mount) {
    var isStandalone = mount.hasAttribute("data-site-header-standalone");
    var wrapper = document.createElement("div");

    wrapper.innerHTML = html;
    var header = wrapper.firstElementChild;

    if (isStandalone && header) {
      normalizeStandaloneHeaderWidth(header);
    }

    mount.outerHTML = header ? header.outerHTML : html;
  });

  setupHeaderInteractions();
})();
