module.exports = {
  all: {
    options: {
        optimizationLevel: 3
    },
    files: [{
        expand: true,
        cwd: '<%= package.paths.images_source %>/',
        src: ['*.{png,jpg}', 'sprites/*.{png,jpg,gif}'],
        dest: '<%= package.paths.images_dest %>/'
    }]
  },
  copy_resize_source_2x_images: {
    files: [{
      expand: true,
      cwd: '<%= package.paths.images_source %>/resize/2x',
      src: ['{,*/}*.{jpeg,jpg,png}'],
      dest: '<%= package.paths.images_dest %>',
      rename: function(dest, src) {
        var extension = src.substr(src.lastIndexOf('.')+1),
            name = src.replace('.' + extension, '');
        return dest + '/' + name + '<%= package.task_config.suffix_2x %>' + '.' + extension;
      }
    }]
  },
  copy_resize_source_3x_images: {
    files: [{
      expand: true,
      cwd: '<%= package.paths.images_source %>/resize/3x',
      src: ['{,*/}*.{jpeg,jpg,png}'],
      dest: '<%= package.paths.images_dest %>',
      rename: function(dest, src) {
        var extension = src.substr(src.lastIndexOf('.')+1),
            name = src.replace('.' + extension, '');
        return dest + '/' + name + '<%= package.task_config.suffix_3x %>' + '.' + extension;
      }
    }]
  },
};
