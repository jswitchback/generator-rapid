module.exports = {
  dist: {
    crawl: false,
    dest : 'vendor/modernizr/modernizr-custom.js',
    customTests: [],
    devFile: false,
    "tests": [
      'svg',
      'touchevents',
      'cssanimations',
      'backgroundsize',
      'bgsizecover',
      'flexbox'
    ],
    options: [
      'html5shiv',
      'setClasses'
    ],
    uglify: true
  }
};

