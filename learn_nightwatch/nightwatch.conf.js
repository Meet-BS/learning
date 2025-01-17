module.exports = {
  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'features/*.feature',
      auto_start_session: true,
    },
  },
  src_folders: ['step_definitions'],
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
      },
      webdriver: {
        start_process: true,
        server_path: require('chromedriver').path,
      },
    },
  },
};
