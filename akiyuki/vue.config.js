const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["quasar"],

  outputDir: "../docs",

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },

  chainWebpack: (config) => {
    config.plugin("define").tap((args) => {
      // const env = args[0];
      // env["process.env"].FIREBASE_API_KEY = JSON.stringify(
      //   process.env.VUE_APP_FIREBASE_API_KEY
      // );
      // env["process.env"].FIREBASE_AUTH_DOMAIN = JSON.stringify(
      //   process.env.VUE_APP_FIREBASE_AUTH_DOMAIN
      // );
      // env["process.env"].FIREBASE_PROJECT_ID = JSON.stringify(
      //   process.env.VUE_APP_FIREBASE_PROJECT_ID
      // );
      // env["process.env"].FIREBASE_STORAGE_BUCKET = JSON.stringify(
      //   process.env.VUE_APP_FIREBASE_STORAGE_BUCKET
      // );
      // env["process.env"].FIREBASE_MESSAGING_SENDER_ID = JSON.stringify(
      //   process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
      // );
      // env["process.env"].FIREBASE_APP_ID = JSON.stringify(
      //   process.env.VUE_APP_FIREBASE_APP_ID
      // );
      // env["process.env"].FIREBASE_MEASUREMENT_ID = JSON.stringify(
      //   process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
      // );
      return args;
    });
  },
});
