module.exports = {
  src_image_icons: '<%= package.paths.images_source %>/app-icons/app-icon.png',
  apple_prefix: 'apple-touch-icon-precomposed-',
  apple_dest: '<%= package.paths.images_dest %>/app-icons/apple',
  android_prefix: 'android-icon-',
  android_dest: '<%= package.paths.images_dest %>/app-icons/android',
  windows_prefix: 'ms-application-icon-',
  windows_dest: '<%= package.paths.images_dest %>/app-icons/windows',
  firefox_prefix: 'firefox-icon-',
  firefox_dest: '<%= package.paths.images_dest %>/app-icons/firefox',
  src_image_favicon: '<%= package.paths.images_source %>/app-icons/favicon.png',
  favicon_prefix: 'favicon-',
  favicon_dest: '<%= package.paths.images_dest %>/app-icons/favicon',


  resize_2x: {
    options: {
      width: '50%',
      quality: 1,
      overwrite: true
    },
    files: [{
      expand: true,
      cwd: '<%= package.paths.images_source %>/resize/2x',
      src: ['{,*/}*.{gif,jpeg,jpg,png}'],
      dest: '<%= package.paths.images_dest %>',
      rename: function(dest, src) {
        var extension = src.substr(src.lastIndexOf('.')+1),
            name = src.replace('.' + extension, '');
        return dest + '/' + name + '<%= package.task_config.suffix_1x %>' + '.' + extension;
      },
    }]
  },
  resize_3x_to_1x: {
    options: {
      width: '33.33333333%',
      quality: 1,
      overwrite: true
    },
    files: [{
      expand: true,
      cwd: '<%= package.paths.images_source %>/resize/3x',
      src: ['{,*/}*.{gif,jpeg,jpg,png}'],
      dest: '<%= package.paths.images_dest %>',
      rename: function(dest, src) {
        var extension = src.substr(src.lastIndexOf('.')+1),
            name = src.replace('.' + extension, '');
        return dest + '/' + name + '<%= package.task_config.suffix_1x %>' + '.' + extension;
      },
    }]
  },
  resize_3x_to_2x: {
    options: {
      width: '66.66666666%',
      quality: 1,
      overwrite: true
    },
    files: [{
      expand: true,
      cwd: '<%= package.paths.images_source %>/resize/3x',
      src: ['{,*/}*.{gif,jpeg,jpg,png}'],
      dest: '<%= package.paths.images_dest %>',
      rename: function(dest, src) {
        var extension = src.substr(src.lastIndexOf('.')+1),
            name = src.replace('.' + extension, '');
        return dest + '/' + name + '<%= package.task_config.suffix_2x %>' + '.' + extension;
      },
    }]
  },

  /**** APPLE ****/
  //
  // apple_29: {
  //   options: {
  //     width: 29,
  //   },
  //   files: {
  //     '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>29.png' : '<%= image_resize.src_image_icons %>'
  //   }
  // },

  // apple_29_2x: {
  //   options: {
  //     width: 58,
  //   },
  //   files: {
  //     '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>29@2x.png' : '<%= image_resize.src_image_icons %>'
  //   }
  // },

  // apple_40: {
  //   options: {
  //     width: 40,
  //   },
  //   files: {
  //     '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>40.png' : '<%= image_resize.src_image_icons %>'
  //   }
  // },

  // apple_40_2x: {
  //   options: {
  //     width: 80,
  //   },
  //   files: {
  //     '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>40@2x.png' : '<%= image_resize.src_image_icons %>'
  //   }
  // },

  // apple_50: {
  //   options: {
  //     width: 50,
  //   },
  //   files: {
  //     '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>50.png' : '<%= image_resize.src_image_icons %>'
  //   }
  // },

  // apple_50_2x: {
  //   options: {
  //     width: 100,
  //   },
  //   files: {
  //     '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>50@2x.png' : '<%= image_resize.src_image_icons %>'
  //   }
  // },

  // apple_60: {
  //     options: {
  //       width: '60'
  //     },
  //     files: {
  //       '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>60.png' : '<%= image_resize.src_image_icons %>'
  //     }
  // },

  // apple_57: {
  //   options: {
  //     width: 57,
  //   },
  //   files: {
  //     '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>57.png' : '<%= image_resize.src_image_icons %>'
  //   }
  // },

  // apple_57_2x: {
  //   options: {
  //     width: 114,
  //   },
  //   files: {
  //     '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>57@2x.png' : '<%= image_resize.src_image_icons %>'
  //   }
  // },

  // iPad Pro (@2x) - 167
  apple_167: {
      options: {
        width: 167,
      },
      files: {
        '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>167@2x.png' : '<%= image_resize.src_image_icons %>'
      }
  },

  // iPad 2 & Mini (@1x) - 76
  apple_76: {
      options: {
          width: 76,
      },
      files: {
        '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>76.png' : '<%= image_resize.src_image_icons %>'
      }
  },

  // iPad & mini (@2x) - 152
  apple_152: {
      options: {
        width: 152,
      },
      files: {
        '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>152.png' : '<%= image_resize.src_image_icons %>'
      }
  },

  // iPhone 4s, 5, 6s (@2x) - 120
  apple_120: {
      options: {
        width: 120,
      },
      files: {
        '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>120.png' : '<%= image_resize.src_image_icons %>'
      }
  },

  // iPhone 6s Plus, 6 (@3x) - 180
  apple_180: {
      options: {
        width: 180,
      },
      files: {
        '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>180.png' : '<%= image_resize.src_image_icons %>'
      }
  },

  // apple_72: {
  //   options: {
  //     width: 72,
  //   },
  //   files: {
  //     '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>72.png' : '<%= image_resize.src_image_icons %>'
  //   }
  // },

  // apple_72_2x: {
  //   options: {
  //     width: 144,
  //   },
  //   files: {
  //    '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>72@2x.png' : '<%= image_resize.src_image_icons %>'
  //   }
  // },

  // apple_76_2x: {
  //   options: {
  //     width: 152,
  //   },
  //   files: {
  //     '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>76@2x.png' : '<%= image_resize.src_image_icons %>'
  //   }
  // },

  apple_512: {
    options: {
      width: 512,
    },
    files: {
      '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>itunes512.png' : '<%= image_resize.src_image_icons %>'
    }
  },

  apple_512_2x: {
    options: {
      width: 1024,
    },
    files: {
      '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>itunes@2x.png' : '<%= image_resize.src_image_icons %>'
    }
  },

  /**** ANDROID ****/

  android_128: {
    options: {
      width: 128,
    },
    files: {
      '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>128.png' : '<%= image_resize.src_image_icons %>'
    }
  },

  android_192: {
    options: {
      width: 192,
    },
    files: {
      '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>192.png' : '<%= image_resize.src_image_icons %>'
    }
  },

  // android_36: {
  //   options: {
  //     width: 36,
  //   },
  //   files: {
  //     '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>36.png' : '<%= image_resize.src_image_icons %>'
  //   }
  // },

  // android_48: {
  //   options: {
  //     width: 48,
  //   },
  //   files: {
  //     '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>48.png' : '<%= image_resize.src_image_icons %>'
  //   }
  // },

  // android_48_2x: {
  //   options: {
  //     width: 96,
  //   },
  //   files: {
  //     '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>48@2x.png' : '<%= image_resize.src_image_icons %>'
  //   }
  // },

  // android_72: {
  //   options: {
  //     width: 72,
  //   },
  //   files: {
  //     '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>72.png' : '<%= image_resize.src_image_icons %>'
  //   }
  // },

  // android_72_2x: {
  //   options: {
  //     width: 144,
  //   },
  //   files: {
  //     '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>72@2x.png' : '<%= image_resize.src_image_icons %>'
  //   }
  // },

  // android_128_2x: {
  //   options: {
  //     width: 256,
  //   },
  //   files: {
  //     '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>128@2x.png' : '<%= image_resize.src_image_icons %>'
  //   }
  // },


  // android_192_2x: {
  //   options: {
  //     width: 384,
  //   },
  //   files: {
  //     '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>192@2x.png' : '<%= image_resize.src_image_icons %>'
  //   }
  // },

  // android_196: {
  //   options: {
  //     width: 196,
  //   },
  //   files: {
  //     '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>196.png' : '<%= image_resize.src_image_icons %>'
  //   }
  // },

  /**** WINDOWS ****/

  windows_144: {
    options: {
      width: 144,
    },
    files: {
      '<%= image_resize.windows_dest %>/<%= image_resize.windows_prefix %>144.png' : '<%= image_resize.src_image_icons %>'
    }
  },

  /**** FAVICON ****/

  // favicon_16: {
  //   options: {
  //     width: 16,
  //   },
  //   files: {
  //     '<%= image_resize.favicon_dest %>/<%= image_resize.favicon_prefix %>16.png' : '<%= image_resize.src_image_favicon %>'
  //   }
  // },

  favicon_32: {
    options: {
      width: 32,
    },
    files: {
      '<%= image_resize.favicon_dest %>/<%= image_resize.favicon_prefix %>32.png' : '<%= image_resize.src_image_favicon %>'
    }
  },

  // favicon_48: {
  //   options: {
  //     width: 48,
  //   },
  //   files: {
  //     '<%= image_resize.favicon_dest %>/<%= image_resize.favicon_prefix %>48.png' : '<%= image_resize.src_image_favicon %>'
  //   }
  // },

  favicon_64: {
    options: {
      width: 64,
    },
    files: {
      '<%= image_resize.favicon_dest %>/<%= image_resize.favicon_prefix %>64.png' : '<%= image_resize.src_image_favicon %>'
    }
  }
};
