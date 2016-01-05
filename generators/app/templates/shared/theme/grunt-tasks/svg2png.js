module.exports = {
  all: {
      // specify files in array format with multiple src-dest mapping
      files: [
          // rasterize all SVG files in "build/sprite" and its subdirectories to "build/sprite"
          { cwd: '<%= package.paths.images_dest %>/sprites/css/', src: ['*.svg'], dest: '<%= package.paths.images_dest %>/sprites/css/' }
      ]
  }
};
