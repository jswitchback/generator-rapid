Documentation on using Grunt to build & watch.

-------------------------------------------
* Computer setup
-------------------------------------------


1. Install Node.js (http://nodejs.org/)
	 Use the install package on the website or via command line: http://howtonode.org/how-to-install-nodejs

2. Install Grunt.js
	 Run command:
	 npm install -g grunt-cli
   This installs Grunt Command Line Interface (Grunt CLI) allowing you to execute grunt on the command line.

3. Install ImageMagick (image manipulation)
	 (Prerequisite: install Homebrew (http://brew.sh/)
	 brew install ImageMagick

	 *Error on install...
	 Error: The `brew link` step did not complete successfully
	 The formula built, but is not symlinked into /usr/local
	 Could not symlink include/libltdl
	 /usr/local/include is not writable.

	 Solution: cd /usr/local/include
	 and open permissions on the folder...
	 sudo chmod -R 777 .

	 Run these commands to esure proper linking
	 brew link imagemagick
	 brew link jpeg
	 brew link libtool
	 brew link libpng
	 brew link freetype
	 ( Possibly needed: brew install ghostscript. Later, running grunt build:images:web to test it's working. )

4. Install svg-sprite globally for svg spriting (https://github.com/jkphl/svg-sprite)
	 Run command:
	 npm install svg-sprite -g



-------------------------------------------
* Project Setup
-------------------------------------------


1. Go to the terminal and navigate to your folder ($ cd FOLDER/LOCATION/CONTAINING/GRUNTFILE.JS)

2. Run commands:

	bundle istall or Drush bundle
	* This will install project specific gems from the Gemfile.lock file

 	npm install
 	* This will install all necessary packages inside package.json into a node_modules folder



-------------------------------------------
* Adding Grunt packages
-------------------------------------------


Typically found on github but here for reference. Type the following command to install a package. The package.json file will automatically be updated.
example: npm install grunt-contrib-concat --save-dev



-------------------------------------------------
* Get started compiling (command line reference)
-------------------------------------------------

// TASK QUICK REFERENCE


BUILD  **********

	build.dev
	build.prod
	build.css
		build.css.dev
		build.css.prod
	build.js
		build.js.dev
		build.js.prod
	build.images
		build.images.web
		build.images.apple
		build.images.android
		build.images.windows
		build.images.firefox
		build.images.favicon
		build.images.itunes



LINT (code checking) **********

	lint.js



MINIFY  **********

	minify.js
	minify.images



WATCH  **********

	watch
		watch.css
		watch.js
		watch.sass
		watch.image

