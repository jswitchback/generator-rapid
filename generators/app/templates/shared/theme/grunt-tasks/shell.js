module.exports = {
  // http://patternlab.io/docs/command-line.html
  patternlab: {
    // To generate only the patterns:
    // php core/builder.php --generate --patternsonly
    // php core/builder.php -g -p
    command: 'php .docs/patternlab/core/console --generate'
  },
  patternlab_serve: {
    command: 'php .docs/patternlab/core/console --server'
  },
  drush_clear_cache: {
    command: 'drush cc all'
  }
};
