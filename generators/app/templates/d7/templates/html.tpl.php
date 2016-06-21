<?php
/**
 * @file
 * subtheme theme's implementation to display the basic html structure of a single
 * Drupal page.
 *
 * Variables:
 * - $css: An array of CSS files for the current page.
 * - $language: (object) The language the site is being displayed in.
 *   $language->language contains its textual representation. $language->dir
 *   contains the language direction. It will either be 'ltr' or 'rtl'.
 * - $html_attributes: String of attributes for the html element. It can be
 *   manipulated through the variable $html_attributes_array from preprocess
 *   functions.
 * - $html_attributes_array: Array of html attribute values. It is flattened
 *   into a string within the variable $html_attributes.
 * - $rdf_namespaces: All the RDF namespace prefixes used in the HTML document.
 * - $grddl_profile: A GRDDL profile allowing agents to extract the RDF data.
 * - $head_title: A modified version of the page title, for use in the TITLE
 *   tag.
 * - $head_title_array: (array) An associative array containing the string parts
 *   that were used to generate the $head_title variable, already prepared to be
 *   output as TITLE tag. The key/value pairs may contain one or more of the
 *   following, depending on conditions:
 *   - title: The title of the current page, if any.
 *   - name: The name of the site.
 *   - slogan: The slogan of the site, if any, and if there is no title.
 * - $head: Markup for the HEAD section (including meta tags, keyword tags, and
 *   so on).
 * - $default_mobile_metatags: TRUE if default mobile metatags for responsive
 *   design should be displayed.
 * - $styles: Style tags necessary to import all CSS files for the page.
 * - $scripts: Script tags necessary to load the JavaScript files and settings
 *   for the page.
 * - $skip_link_anchor: The HTML ID of the element that the "skip link" should
 *   link to. Defaults to "main-menu".
 * - $skip_link_text: The text for the "skip link". Defaults to "Jump to
 *   Navigation".
 * - $page_top: Initial markup from any modules that have altered the
 *   page. This variable should always be output first, before all other dynamic
 *   content.
 * - $page: The rendered page content.
 * - $page_bottom: Final closing markup from any modules that have altered the
 *   page. This variable should always be output last, after all other dynamic
 *   content.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It should be placed within the <body> tag. When selecting through CSS
 *   it's recommended that you use the body tag, e.g., "body.front". It can be
 *   manipulated through the variable $classes_array from preprocess functions.
 *   The default values can contain one or more of the following:
 *   - front: Page is the home page.
 *   - not-front: Page is not the home page.
 *   - logged-in: The current viewer is logged in.
 *   - not-logged-in: The current viewer is not logged in.
 *   - node-type-[node type]: When viewing a single node, the type of that node.
 *     For example, if the node is a Blog entry, this would be "node-type-blog".
 *     Note that the machine name of the content type will often be in a short
 *     form of the human readable label.
 *   The following only apply with the default sidebar_first and sidebar_second
 *   block regions:
 *     - two-sidebars: When both sidebars have content.
 *     - no-sidebars: When no sidebar content exists.
 *     - one-sidebar and sidebar-first or sidebar-second: A combination of the
 *       two classes when only one of the two sidebars have content.
 *
 * @see template_preprocess()
 * @see template_preprocess_html()
 * @see subtheme_preprocess_html()
 * @see template_process()
 */
?><!DOCTYPE html>
<?php if (theme_get_setting('rapid_conditional_classes_html')): ?>
<!--[if (IE 7)&(!IEMobile)]><html class="ie-7 lt-ie9 no-js" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"><![endif]-->
<!--[if IE 8]><html class="ie-8 lt-ie9 no-js" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"><![endif]-->
<!--[if (IE 9)|(gt IEMobile 7)]><html class="ie9 no-js" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>><![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)]><!--><html class="no-js" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>><!--<![endif]-->
<?php else: ?>
  <html class="no-js" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>>
<?php endif; ?>
<head profile="<?php print $grddl_profile; ?>">
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>

  <?php if ($default_mobile_metatags): ?>
    <meta name="MobileOptimized" content="width">
    <meta name="HandheldFriendly" content="true">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php endif; ?>

  <?php if ($app_icons): ?>
    <meta name="application-name" content="<?php print $head_title_array['name']; ?>">
    <!-- Windows -->
    <meta name="msapplication-TileColor" content="#<?php print $ms_tile_color; ?>">
    <meta name="msapplication-TileImage" content="<?php print $GLOBALS['base_url'] . '/' . $path_to_theme; ?>/build/images/app-icons/windows/ms-application-icon-144.png">
    <!-- Apple -->
    <!-- iPad Pro (@2x) - 167 -->
    <link rel="apple-touch-icon-precomposed" sizes="167x167" href="<?php print $GLOBALS['base_url'] . '/' . $path_to_theme; ?>/build/images/app-icons/apple/apple-touch-icon-precomposed-167.png">
    <!-- iPad 2 & Mini (@1x) - 76 -->
    <link rel="apple-touch-icon-precomposed" sizes="76x76" href="<?php print $GLOBALS['base_url'] . '/' . $path_to_theme; ?>/build/images/app-icons/apple/apple-touch-icon-precomposed-72.png">
    <!-- iPad & mini (@2x) - 152 -->
    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="<?php print $GLOBALS['base_url'] . '/' . $path_to_theme; ?>/build/images/app-icons/apple/apple-touch-icon-precomposed-152.png">
    <!-- iPhone 4s, 5, 6s (@2x) - 120 -->
    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="<?php print $GLOBALS['base_url'] . '/' . $path_to_theme; ?>/build/images/app-icons/apple/apple-touch-icon-precomposed-120.png">
    <!-- iPhone 6s Plus, 6 (@3x) - 180 -->
    <link rel="apple-touch-icon-precomposed" sizes="180x180" href="<?php print $GLOBALS['base_url'] . '/' . $path_to_theme; ?>/build/images/app-icons/apple/apple-touch-icon-precomposed-180.png">
    <!-- Chrome / Android -->
    <link rel="icon" sizes="192x192" href="<?php print $GLOBALS['base_url'] . '/' . $path_to_theme; ?>/build/images/app-icons/android/android-icon-128.png">
    <link rel="icon" sizes="128x128" href="<?php print $GLOBALS['base_url'] . '/' . $path_to_theme; ?>/build/images/app-icons/android/android-icon-192.png">
  <?php endif; ?>

  <meta http-equiv="cleartype" content="on">

  <?php print $styles; ?>
  <?php print $scripts; ?>

</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
  <?php if ($skip_link_text && $skip_link_anchor): ?>
    <p id="skip-link">
      <a href="#<?php print $skip_link_anchor; ?>" class="element-invisible element-focusable"><?php print $skip_link_text; ?></a>
    </p>
  <?php endif; ?>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>
</body>
</html>
