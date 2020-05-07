module.exports = {
  theme: "craftdocs",
  plugins: [
    ["@vuepress/google-analytics", { ga: "UA-39036834-9" }],
    [
      "vuepress-plugin-medium-zoom",
      {
        selector: ".theme-default-content img",
        delay: 1000,
        options: {
          margin: 24,
          background: "#f1f5fd",
          scrollOffset: 0
        }
      }
    ]
  ],
  base: "/v3/",
  shouldPrefetch: () => false,
  head: [
    ['link', {rel: 'icon', href: 'https://docs.craftcms.com/siteicons/favicon-16x16.png'}],
    ['link', {rel: 'apple-touch-icon', sizes: '180x180', href: 'https://docs.craftcms.com/siteicons/apple-touch-icon.png'}],
    ['link', {rel: 'icon', type: 'image/png', sizes: '32x32', href: 'https://docs.craftcms.com/siteicons/favicon-32x32.png'}],
    ['link', {rel: 'icon', type: 'image/png', sizes: '16x16', href: 'https://docs.craftcms.com/siteicons/favicon-16x16.png'}],
    ['link', {rel: 'mask-icon', href: 'https://docs.craftcms.com/siteicons/safari-pinned-tab.svg', color: '#e5422b'}],
    ['meta', {name: 'msapplication-TileColor', content: '#f1f5fd'}],
    ['meta', {name: 'msapplication-config', content: 'https://docs.craftcms.com/browserconfig.xml'}],
    ['meta', {name: 'theme-color', content: '#f1f5fd'}],
  ],
  locales: {
    "/": {
      lang: "en-US",
      title: "Craft 3 Documentation"
    },
    "/ja/": {
      lang: "ja",
      title: "Craft 3 ドキュメント"
    }
  },
  themeConfig: {
    logo: "/icon.svg",
    docsRepo: "craftcms/docs",
    docsDir: "",
    docsBranch: "v3",
    editLinks: true,
    searchMaxSuggestions: 10,
    locales: {
      "/": require("./config-en"),
      "/ja/": require("./config-ja")
    },
    nav: [
      { text: "Tutorial", link: "https://docs.craftcms.com/tutorial/" },
      {
        text: "Craft CMS",
        items: [
          {
            text: "Craft 2 Documentation",
            link: "https://docs.craftcms.com/v2/"
          },
          {
            text: "Craft 2 Class Reference",
            link: "https://docs.craftcms.com/api/v2/"
          },
          { text: "Craft 3 Documentation", link: "/" },
          {
            text: "Craft 3 Class Reference",
            link: "https://docs.craftcms.com/api/v3/"
          }
        ]
      },
      {
        text: "Craft Commerce",
        items: [
          {
            text: "Commerce 1 Documentation",
            link: "https://docs.craftcms.com/commerce/v1/"
          },
          {
            text: "Commerce 2 Documentation",
            link: "https://docs.craftcms.com/commerce/v2/"
          },
          {
            text: "Commerce 2 Class Reference",
            link: "https://docs.craftcms.com/commerce/api/v2/"
          },
          {
            text: "Commerce 3 Documentation",
            link: "https://docs.craftcms.com/commerce/v3/"
          },
          {
            text: "Commerce 3 Class Reference",
            link: "https://docs.craftcms.com/commerce/api/v3/"
          }
        ]
      },
      { text: "Craftnet API", link: "https://docs.api.craftcms.com/" }
    ],
    codeLanguages: {
      twig: "Twig",
      php: "PHP",
      csv: "CSV",
      json: "JSON",
      xml: "XML"
    }
  },
  markdown: {
    anchor: {
      level: [2, 3, 4]
    },
    toc: {
      format(content) {
        return content.replace(/[_`]/g, "");
      }
    },
    extendMarkdown(md) {
      md.use(replaceApiLinks)
        .use(require("vuepress-theme-craftdocs/markup"))
        .use(require("markdown-it-deflist"))
        .use(require("markdown-it-imsize"));
    }
  }
};

function replaceApiLinks(md) {
  let re = {
    api: /^(?:api:)?\\?(([\w\\]+)(?:::\$?(\w+)(\(\))?)?(?:#([\w\-]+))?)$/,
    config: /^config:(.+)/,
  };

  let normalizeLink = md.normalizeLink;
  md.normalizeLink = url => {
    url = normalizeLink(url);
    let m = decodeURIComponent(url).match(re.api);
    if (m) {
      let className = m[2];
      let subject = m[3];
      let isMethod = typeof m[4] !== "undefined";
      let hash = m[5];

      if (className.match(/^craft\\/) || className.match(/^Craft/)) {
        let url =
          "https://docs.craftcms.com/api/v3/" +
          className.replace(/\\/g, "-").toLowerCase() +
          ".html";
        if (subject) {
          hash = "";
          if (isMethod) {
            hash = "method-";
          }
          hash += subject.replace(/_/g, "-").toLowerCase();
        }
        return url + (hash ? `#${hash}` : "");
      }

      if (className.match(/^yii\\/) || className.match(/^Yii/)) {
        let url =
          "https://www.yiiframework.com/doc/api/2.0/" +
          className.replace(/\\/g, "-").toLowerCase();
        if (subject) {
          hash = (isMethod ? `${subject}()` : `\$${subject}`) + "-detail";
        }
        return url + (hash ? `#${hash}` : "");
      }
    }

    m = url.match(re.config);
    if (m) {
      return "/config/config-settings.md#" + m[1].toLowerCase();
    }

    return url;
  };

  let normalizeLinkText = md.normalizeLinkText;
  md.normalizeLinkText = url => {
    url = normalizeLink(url);
    var m;
    if (m = decodeURIComponent(url).match(re.api)) {
      return m[1];
    }
    if (m = url.match(re.config)) {
      return m[1];
    }
    return url;
  }
}
