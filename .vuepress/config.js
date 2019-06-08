// .vuepress/config.js
module.exports = {
    title: "Kucukkanat's Nest",
    base: "/",
    themeConfig: {
        sidebar: [
            ["/", "Home"],
            ["posts/how-i-setup-my-pi.html", "Starting with RaspberryPi"],
            ["posts/gpg-signing.html", "Signing git commits with GPG"],
            ["posts/how-to-setup-gpg", "How to Setup GPG"],
            ["posts/node-core-modules-on-browser.html", "Native node modules on browser"],
        ],
    //   logo: '/assets/img/logo.png',
    },
    markdown: {
        linenumbers: true
    },
    ga: "UA-93689139-1"
  }