// .vuepress/config.js
module.exports = {
    title: "Kucukkanat's Nest",
    base: "/",
    themeConfig: {
        sidebar: [
            ["/", "Home"],
            ["linux/2019-03-02-how-i-setup-my-pi.html", "Starting with RaspberryPi"],
            ["linux/2019-03-20-gpg-signing.html", "Signing git commits with GPG"],
            ["javascript/2019-04-11-node-core-modules-on-browser.html", "Native node modules on browser"],
        ],
    //   logo: '/assets/img/logo.png',
    },
    markdown: {
        linenumbers: true
    }
  }