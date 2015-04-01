<?php
/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * A QUICK OVERVIEW OF DRUPAL THEMING
 *
 *   The default HTML for all of Drupal's markup is specified by its modules.
 *   For example, the comment.module provides the default HTML markup and CSS
 *   styling that is wrapped around each comment. Fortunately, each piece of
 *   markup can optionally be overridden by the theme.
 *
 *   Drupal deals with each chunk of content using a "theme hook". The raw
 *   content is placed in PHP variables and passed through the theme hook, which
 *   can either be a template file (which you should already be familiary with)
 *   or a theme function. For example, the "comment" theme hook is implemented
 *   with a comment.tpl.php template file, but the "breadcrumb" theme hooks is
 *   implemented with a theme_breadcrumb() theme function. Regardless if the
 *   theme hook uses a template file or theme function, the template or function
 *   does the same kind of work; it takes the PHP variables passed to it and
 *   wraps the raw content with the desired HTML markup.
 *
 *   Most theme hooks are implemented with template files. Theme hooks that use
 *   theme functions do so for performance reasons - theme_field() is faster
 *   than a field.tpl.php - or for legacy reasons - theme_breadcrumb() has "been
 *   that way forever."
 *
 *   The variables used by theme functions or template files come from a handful
 *   of sources:
 *   - the contents of other theme hooks that have already been rendered into
 *     HTML. For example, the HTML from theme_breadcrumb() is put into the
 *     $breadcrumb variable of the page.tpl.php template file.
 *   - raw data provided directly by a module (often pulled from a database)
 *   - a "render element" provided directly by a module. A render element is a
 *     nested PHP array which contains both content and meta data with hints on
 *     how the content should be rendered. If a variable in a template file is a
 *     render element, it needs to be rendered with the render() function and
 *     then printed using:
 *       <?php print render($variable); ?>
 *
 * ABOUT THE TEMPLATE.PHP FILE
 *
 *   The template.php file is one of the most useful files when creating or
 *   modifying Drupal themes. With this file you can do three things:
 *   - Modify any theme hooks variables or add your own variables, using
 *     preprocess or process functions.
 *   - Override any theme function. That is, replace a module's default theme
 *     function with one you write.
 *   - Call hook_*_alter() functions which allow you to alter various parts of
 *     Drupal's internals, including the render elements in forms. The most
 *     useful of which include hook_form_alter(), hook_form_FORM_ID_alter(),
 *     and hook_page_alter(). See api.drupal.org for more information about
 *     _alter functions.
 *
 * OVERRIDING THEME FUNCTIONS
 *
 *   If a theme hook uses a theme function, Drupal will use the default theme
 *   function unless your theme overrides it. To override a theme function, you
 *   have to first find the theme function that generates the output. (The
 *   api.drupal.org website is a good place to find which file contains which
 *   function.) Then you can copy the original function in its entirety and
 *   paste it in this template.php file, changing the prefix from theme_ to
 *   <%= themeMachineName %>_. For example:
 *
 *     original, found in modules/field/field.module: theme_field()
 *     theme override, found in template.php: <%= themeMachineName %>_field()
 *
 *   where <%= themeMachineName %> is the name of your sub-theme. For example, the
 *   rapid_classic theme would define a rapid_classic_field() function.
 *
 *   Note that base themes can also override theme functions. And those
 *   overrides will be used by sub-themes unless the sub-theme chooses to
 *   override again.
 *
 *   Rapid core only overrides one theme function. If you wish to override it, you
 *   should first look at how Rapid core implements this function:
 *     theme_breadcrumbs()      in rapid/template.php
 *
 *   For more information, please visit the Theme Developer's Guide on
 *   Drupal.org: http://drupal.org/node/173880
 *
 * CREATE OR MODIFY VARIABLES FOR YOUR THEME
 *
 *   Each tpl.php template file has several variables which hold various pieces
 *   of content. You can modify those variables (or add new ones) before they
 *   are used in the template files by using preprocess functions.
 *
 *   This makes THEME_preprocess_HOOK() functions the most powerful functions
 *   available to themers.
 *
 *   It works by having one preprocess function for each template file or its
 *   derivatives (called theme hook suggestions). For example:
 *     THEME_preprocess_page    alters the variables for page.tpl.php
 *     THEME_preprocess_node    alters the variables for node.tpl.php or
 *                              for node--forum.tpl.php
 *     THEME_preprocess_comment alters the variables for comment.tpl.php
 *     THEME_preprocess_block   alters the variables for block.tpl.php
 *
 *   For more information on preprocess functions and theme hook suggestions,
 *   please visit the Theme Developer's Guide on Drupal.org:
 *   http://drupal.org/node/223440 and http://drupal.org/node/1089656
 */


/**
  * Adding js via Drupal libraries for better control over where they are aggregated (SYSTEM, LIBRARIES or THEME)
 *  Implements hook_library().
 */
// function <%= themeMachineName %>_library() {

//   $libraries['LIBRARYNAME'] = array(
//     'title' => 'Title',
//     'website' => 'github.com_usually',
//     'version' => '1.0',
//     'js' => array(
//       drupal_get_path('theme', '<%= themeMachineName %>') . 'path/to/file/FILENAME.js' => array(
//         'type' => 'file',
//         'weight' => 1002,
//         'group' => JS_LIBRARY), // This weight and group will run just after core.
//     ),
//   );

//   return $libraries;
// }


/**
 * Override or insert variables into the html template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered. This is usually "html", but can
 *   also be "maintenance_page" since <%= themeMachineName %>_preprocess_maintenance_page() calls
 *   this function to have consistent variables.
 */
function <%= themeMachineName %>_preprocess_html(&$variables, $hook) {
  $variables['compass_grid'] = theme_get_setting('<%= themeMachineName %>_compass_grid');
  $variables['add_to_top'] = theme_get_setting('<%= themeMachineName %>_to_top');
  $variables['path_to_theme'] = drupal_get_path('theme', '<%= themeMachineName %>'); // Reset path used in parent theme's html.tpl.php to our theme path. Used in linking app icons

  // Add CSS/JS based on theme settings
  if ($variables['add_to_top']) {
    drupal_add_css(drupal_get_path('theme','<%= themeMachineName %>') . '/css/conditional/to-top-button-menu.css');
  }

  // Add body class, css and js when offcanvas sidebar has block content.
  if (!empty($variables['page']['page_sidebar'])) {
    $variables['classes_array'][] = 'has-page-sidebar';
    drupal_add_js(drupal_get_path('theme', '<%= themeMachineName %>') . '/build/js/conditional/page-sidebar.js', array('type' => 'file','weight' => 1050,'group' => JS_LIBRARY));
    drupal_add_css(drupal_get_path('theme','<%= themeMachineName %>') . '/build/css/conditional/page-sidebar.css');
  }

  if ($variables['compass_grid'] && $variables['is_admin'] ) {
      $variables['attributes_array']['data-development-grid'][] = 'hide';
      drupal_add_js(drupal_get_path('theme', '<%= themeMachineName %>') . '/build/js/conditional/layout-debug-grid.js', array('group' => JS_THEME, 'every_page' => TRUE));
      drupal_add_css(drupal_get_path('theme', '<%= themeMachineName %>') . '/build/css/conditional/layout-debug-grid.css', array('group' => CSS_THEME, 'every_page' => TRUE));
  }

  // Node edit form styles when this theme is used on admin pages.
  if ($variables['is_admin'] ) {
      drupal_add_css(drupal_get_path('theme', '<%= themeMachineName %>') . '/build/css/admin.css', array('group' => CSS_THEME, 'every_page' => TRUE));
  }

  // Fixes page titles for login, register & password.
  switch (current_path()) {
    case 'user':
      $variables['head_title_array']['title'] = t('Login');
      $head_title = $variables['head_title_array'];
      $variables['head_title'] = implode(' | ', $head_title);
      break;
    case 'user/register':
      $variables['head_title_array']['title'] = t('Create new account');
      $head_title = $variables['head_title_array'];
      $variables['head_title'] = implode(' | ', $head_title);
      break;
    case 'user/password':
      $variables['head_title_array']['title'] = t('Request new password');
      $head_title = $variables['head_title_array'];
      $variables['head_title'] = implode(' | ', $head_title);
      break;

    default:
      break;
  }

  // Add library from above library hook.
  // drupal_add_library('<%= themeMachineName %>', 'LIBRARYNAME');

}


/**
 * Override or insert variables into the page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
function <%= themeMachineName %>_preprocess_page(&$variables) {
  /**
  * Removes the tabs from user login, register & password. Also fixes page titles
  * Links added back in a hook_form_alter below.
  */
  switch (current_path()) {
    case 'user':
      $variables['title'] = t('Login');
      unset($variables['tabs']['#primary']);
      break;
    case 'user/register':
      $variables['title'] = t('Create new account');
      unset($variables['tabs']['#primary']);
      break;
    case 'user/password':
      $variables['title'] = t('Request new password');
      unset($variables['tabs']['#primary']);
      break;

    default:
      break;
  }
}

/**
 * Override or insert variables into the maintenance page template.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 */
function <%= themeMachineName %>_preprocess_maintenance_page(&$variables) {
  // When a variable is manipulated or added in preprocess_html or
  // preprocess_page, that same work is probably needed for the maintenance page
  // as well, so we can just re-use those functions to do that work here.
  // <%= themeMachineName %>_preprocess_html($vars);
  // <%= themeMachineName %>_preprocess_page($vars);
  // This preprocessor will also be used if the db is inactive. To ensure your
  // theme is used, add the following line to your settings.php file:
  // $conf['maintenance_theme'] = '<%= themeMachineName %>';
  // Also, check $vars['db_is_active'] before doing any db queries.
}


/**
 * Preprocess variables for region.tpl.php
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("region" in this case.)
 */
function <%= themeMachineName %>_preprocess_region(&$variables, $hook) {
  // if ($variables['region'] == 'header') {
  //    $variables['theme_hook_suggestions'][] = 'region__no_wrapper';
  //  }
}


/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
function <%= themeMachineName %>_preprocess_node(&$variables, $hook) {
    // Add a suggestion based on type & view_mode.
    $variables['theme_hook_suggestions'][] = 'node__' . $variables['view_mode'];
    $variables['theme_hook_suggestions'][] = 'node__' . $variables['type'] . '__' . $variables['view_mode'];

    $variables['submitted'] =  t('by !username on !datetime',
          array(
          '!username' => '<span class="author">'. $variables['name'] . '</span>',
          '!datetime' => '<span class="list-date"><time>' . format_date($variables['created'], 'custom', 'F t, Y') . '</span>',
    ));
}

/**
 * Override or insert variables into the entity template.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 */
/* -- Delete this line if you want to use this function
function <%= themeMachineName %>_preprocess_entity(&$vars) {
}
// */

/**
 * Override or insert variables into the taxonomy term templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
function <%= themeMachineName %>_preprocess_taxonomy_term(&$variables) {
  // Add a suggestion based on view_mode.
  $variables['theme_hook_suggestions'][] = 'term__' . $variables['view_mode'];
  $variables['theme_hook_suggestions'][] = 'term__' . $variables['vocabulary_machine_name'] . '__' . $variables['view_mode'];

}

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
function <%= themeMachineName %>_preprocess_block(&$variables, $hook) {

  // Change theme templates, add classes and/or replace IDs
  // Output block id's with devel
  // dpm ($variables);
  // dpm ($variables['block_html_id']);
  // switch ($variables['block_html_id']) {
  //    // case 'block-block-7':
  //    // case 'block-8':
  //    // case 'block-9':
  //    //     $variables['classes_array'][] = 'new-class';
  //    //     $variables['block_html_id'] = 'replace-id';
  //    //     $variables['theme_hook_suggestions'][] = 'block__new_template';
  //    //     $variables['title_attributes_array']['class'][] = 'element-invisible'; // Visually title
  //    //     break;
  //     break;
  // }

}


/**
 * Add some template suggestions
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 */
function <%= themeMachineName %>_preprocess_panels_pane(&$variables) {
  $subtype = $variables['pane']->subtype;
  $layout = $variables['display']->layout;
  $variables['theme_hook_suggestions'][] = 'panels_pane__' . $layout;
  $variables['theme_hook_suggestions'][] = 'panels_pane__' . $subtype;
  $variables['theme_hook_suggestions'][] = 'panels_pane__' . $layout . '__' . $subtype;
}

/**
 * Implements hook_preprocess_field().
 */
// function <%= themeMachineName %>_preprocess_field(&$variables) {
// }


/**
 * Alter forms.
 *
 */
function <%= themeMachineName %>_form_alter(&$form, &$form_state, $form_id) {
  if ($form_id == 'search_block_form') {
    // HTML5 placeholder attribute
    $form['search_block_form']['#attributes']['placeholder'] = t('Search');
  }

}

/**
* Implements hook_form_FORM_ID_alter()
*
**/
function <%= themeMachineName %>_form_user_login_alter(&$form, &$form_state, $form_id) {

  $form['name']['#attributes']['placeholder'] = t( 'jdoe, jdoe@example.com...' );
  $form['pass']['#attributes']['placeholder'] = t( 'Password' );

  // Add links previously in tabs
  $password_link = array(
    '#theme' => 'link',
    '#text' => 'Request new password',
    '#path' => 'user/password',
    '#options' => array(
      'attributes' => array('class' => array('btn-password'), 'title' => t('Get a new password')),
        //REQUIRED:
        'html' => FALSE,
     ),
  );

  $form['actions'][] = $password_link;

  if (user_register_access()) {

    $register_link = array(
      '#theme' => 'link',
      '#text' => 'Create new account',
      '#path' => 'user/register',
      '#options' => array(
        'attributes' => array('class' => array('btn-register'), 'title' => t('Create a new user account')),
          //REQUIRED:
          'html' => FALSE,
       ),
    );

    $form['actions'][] = $register_link;
  }
}

/**
 * Override or insert css on the site.
 *
 * @param $css
 *   An array of all CSS items being requested on the page.
 */
/* -- Delete this line if you want to use this function
function <%= themeMachineName %>_css_alter(&$css) {
  // if (isset($css[drupal_get_path('system', 'lang_dropdown') .'/msdropdown/dd_after.css'])) {
  //   $css[drupal_get_path('module', 'lang_dropdown') .'/msdropdown/dd_after.css']['data'] = drupal_get_path('theme', 'custom') . '/css/custom-dd_after.css';
  // }
  // // Remove defaults.css file.
  // unset($css[drupal_get_path('module', 'lang_dropdown') . '/msdropdown/dd_after.css']);
}
// */


/**
 * Override or insert javascript on the site.
 *
 * @param $js
 *   An array of all JavaScript being presented on the page.
 */
/* -- Delete this line if you want to use this function
function <%= themeMachineName %>_js_alter(&$js) {
}
// */

/**
 * Implements hook_modernizr_load_alter().
 *
 * @return
 *   An array to be output as yepnope testObjects.
 */
/* -- Delete this line if you want to use this function
function <%= themeMachineName %>_modernizr_load_alter(&$load) {
}

/**
 * Override or insert variables into the comment template.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 */
/* -- Delete this line if you want to use this function
function <%= themeMachineName %>_preprocess_comment(&$vars) {
  $comment = $vars['comment'];
}
// */

/**
 * Override or insert variables into the views template.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 */
/* -- Delete this line if you want to use this function
function <%= themeMachineName %>_preprocess_views_view(&$vars) {
  $view = $vars['view'];
}
// */
