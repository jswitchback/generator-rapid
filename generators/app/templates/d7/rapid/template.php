<?php
/**
 *
 * Contains functions to alter Drupal's markup for the Rapid theme.
 *
 * IMPORTANT WARNING: DO NOT MODIFY THIS FILE.
 *
 * The base Rapid theme is designed to be easily extended by its sub-themes. You
 * shouldn't modify this or any of the CSS or PHP files in the root rapid/ folder.
 *
 */

// Auto-rebuild the theme registry during theme development.
if (theme_get_setting('rapid_rebuild_registry') && !defined('MAINTENANCE_MODE')) {
  // Rebuild .info data.
  system_rebuild_theme_data();
  // Rebuild theme registry.
  drupal_theme_rebuild();
}


/**
 * Implements HOOK_theme().
 */
function rapid_theme(&$existing, $type, $theme, $path) {
  include_once './' . drupal_get_path('theme', 'rapid') . '/rapid-internals/template.theme-registry.inc';
  return _rapid_theme($existing, $type, $theme, $path);
}

/**
 * Return a themed breadcrumb trail.
 *
 * @param $variables
 *   - title: An optional string to be used as a navigational heading to give
 *     context for breadcrumb links to screen-reader users.
 *   - title_attributes_array: Array of HTML attributes for the title. It is
 *     flattened into a string within the theme function.
 *   - breadcrumb: An array containing the breadcrumb links.
 * @return
 *   A string containing the breadcrumb output.
 */
function rapid_breadcrumb($variables) {
  $breadcrumb = $variables['breadcrumb'];
  $output = '';

  // Determine if we are to display the breadcrumb.
  $show_breadcrumb = theme_get_setting('rapid_breadcrumb');
  if ($show_breadcrumb == 'yes' || $show_breadcrumb == 'admin' && arg(0) == 'admin') {

    // Optionally get rid of the homepage link.
    $show_breadcrumb_home = theme_get_setting('rapid_breadcrumb_home');
    if (!$show_breadcrumb_home) {
      array_shift($breadcrumb);
    }

    // Return the breadcrumb with separators.
    if (!empty($breadcrumb)) {
      $breadcrumb_separator = filter_xss_admin(theme_get_setting('rapid_breadcrumb_separator'));
      $trailing_separator = $title = '';
      if (theme_get_setting('rapid_breadcrumb_title')) {
        $item = menu_get_item();
        if (!empty($item['tab_parent'])) {
          // If we are on a non-default tab, use the tab's title.
          $breadcrumb[] = check_plain($item['title']);
        }
        else {
          $breadcrumb[] = drupal_get_title();
        }
      }
      elseif (theme_get_setting('rapid_breadcrumb_trailing')) {
        $trailing_separator = $breadcrumb_separator;
      }

      // Provide a navigational heading to give context for breadcrumb links to
      // screen-reader users.
      if (empty($variables['title'])) {
        $variables['title'] = t('You are here');
      }
      // Unless overridden by a preprocess function, make the heading invisible.
      if (!isset($variables['title_attributes_array']['class'])) {
        $variables['title_attributes_array']['class'][] = 'element-invisible';
      }

      // Build the breadcrumb trail.
      $output = '<nav class="breadcrumb" role="navigation">';
      $output .= '<h2' . drupal_attributes($variables['title_attributes_array']) . '>' . $variables['title'] . '</h2>';
      $output .= '<ol><li>' . implode($breadcrumb_separator . '</li><li>', $breadcrumb) . $trailing_separator . '</li></ol>';
      $output .= '</nav>';
    }
  }

  return $output;
}

/**
 * Override or insert variables into the html template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered. This is usually "html", but can
 *   also be "maintenance_page" since rapid_preprocess_maintenance_page() calls
 *   this function to have consistent variables.
 */
function rapid_preprocess_html(&$variables, $hook) {
  // Add variables and paths needed for HTML5 and responsive support.
  $variables['base_path'] = base_path();
  $variables['path_to_theme'] = drupal_get_path('theme', 'rapid');
  // Get settings for HTML5 and responsive support. array_filter() removes
  // items from the array that have been disabled.
  $html5_respond_meta = array_filter((array) theme_get_setting('rapid_html5_respond_meta'));
  $variables['add_respond_js']          = in_array('respond', $html5_respond_meta);
  $variables['add_html5_shim']          = in_array('html5', $html5_respond_meta);
  $variables['add_enquire']             = in_array('enquire', $html5_respond_meta);
  $variables['default_mobile_metatags'] = in_array('meta', $html5_respond_meta);
  $variables['add_to_top'] = theme_get_setting('rapid_to_top');
  $variables['add_update_browser_script'] = theme_get_setting('rapid_add_update_browser_script');

  // Add CSS/JS based on theme settings
  if ($variables['add_to_top']) {
    drupal_add_js(libraries_get_path('jquery-smooth-scroll') . '/jquery.smooth-scroll.min.js',  array('type' => 'file','weight' => 1045,'group' => JS_LIBRARY));
    drupal_add_js(drupal_get_path('theme', 'rapid') . '/js/to-top-button.js',  array('type' => 'file','weight' => 1046,'group' => JS_LIBRARY));
  }

  if (!empty($variables['page']['dev_region']) && $variables['is_admin']) {
    $variables['classes_array'][] = 'has-dev-region';
    drupal_add_js(drupal_get_path('theme', 'rapid') . '/js/dev-region.js', array('type' => 'file'));
    drupal_add_css(drupal_get_path('theme','rapid') . '/css/dev-region.css');
  }

  $variables['conditional_scripts'] = array();

  if ($variables['add_html5_shim']) {

    $variables['conditional_scripts']['html5shiv'] = array(
      '#type' => 'markup',
      '#weight' => 10000,
      '#prefix' => '<!--[if lt IE 9]>',
      '#suffix' => '</script><![endif]-->',
      '#markup' => '<script type="text/javascript" src="' . libraries_get_path('html5shiv') . '/dist/html5shiv.min.js' . '"></script>',
    );

  }

  if ($variables['add_respond_js']) {

    $variables['conditional_scripts']['respond'] = array(
      '#type' => 'markup',
      '#weight' => 10001,
      '#prefix' => '<!--[if lt IE 9]>',
      '#suffix' => '</script><![endif]-->',
      '#markup' => '<script type="text/javascript" src="' . libraries_get_path('respond') . '/dest/respond.min.js' . '"></script>',
    );

  }

  if ($variables['add_enquire']) {

    $variables['conditional_scripts']['mediaMatch'] = array(
      '#type' => 'markup',
      '#weight' => 10002,
      '#prefix' => '<!--[if lte IE 9]>',
      '#suffix' => '</script><![endif]-->',
      '#markup' => '<script type="text/javascript" src="' . libraries_get_path('media-match') . '/media.match.min.js' . '"></script>',
    );

    drupal_add_js(libraries_get_path('enquire') . '/dist/enquire.min.js',  array('type' => 'file','weight' => 1040,'group' => JS_LIBRARY));

  }

  if ($variables['add_update_browser_script']) {
    drupal_add_js ('var $buoop = {c:2}; function $buo_f(){ var e = document.createElement("script"); e.src = "//browser-update.org/update.js"; document.body.appendChild(e);};try {document.addEventListener("DOMContentLoaded", $buo_f,false)}catch(e){window.attachEvent("onload", $buo_f)}',array('type' => 'inline','scope' => 'footer','weight' => 5));
  }

  // Attributes for html element.
  $variables['html_attributes_array'] = array(
    'lang' => $variables['language']->language,
    'dir' => $variables['language']->dir,
  );

  // Send X-UA-Compatible HTTP header to force IE to use the most recent
  // rendering engine or use Chrome's frame rendering engine if available.
  // This also prevents the IE compatibility mode button to appear when using
  // conditional classes on the html tag.
  if (is_null(drupal_get_http_header('X-UA-Compatible'))) {
    drupal_add_http_header('X-UA-Compatible', 'IE=edge,chrome=1');
  }

  $variables['skip_link_anchor'] = check_plain(theme_get_setting('rapid_skip_link_anchor'));
  $variables['skip_link_text']   = check_plain(theme_get_setting('rapid_skip_link_text'));

  // Return early, so the maintenance page does not call any of the code below.
  if ($hook != 'html') {
    return;
  }

  // Serialize RDF Namespaces into an RDFa 1.1 prefix attribute.
  if ($variables['rdf_namespaces']) {
    $prefixes = array();
    foreach (explode("\n  ", ltrim($variables['rdf_namespaces'])) as $namespace) {
      // Remove xlmns: and ending quote and fix prefix formatting.
      $prefixes[] = str_replace('="', ': ', substr($namespace, 6, -1));
    }
    $variables['rdf_namespaces'] = ' prefix="' . implode(' ', $prefixes) . '"';
  }

  // Classes for body element. Allows advanced theming based on context
  // (home page, node of certain type, etc.)
  if (!$variables['is_front']) {
    // Add unique class for each page.
    $path = drupal_get_path_alias($_GET['q']);
    // Add unique class for each website section.
    list($section, ) = explode('/', $path, 2);
    $arg = explode('/', $_GET['q']);
    if ($arg[0] == 'node' && isset($arg[1])) {
      if ($arg[1] == 'add') {
        $section = 'node-add';
      }
      elseif (isset($arg[2]) && is_numeric($arg[1]) && ($arg[2] == 'edit' || $arg[2] == 'delete')) {
        $section = 'node-' . $arg[2];
      }
    }
    $variables['classes_array'][] = drupal_html_class('section-' . $section);
  }
  if (theme_get_setting('rapid_wireframes')) {
    $variables['classes_array'][] = 'with-wireframes'; // Optionally add the wireframes style.
  }
  // Store the menu item since it has some useful information.
  $variables['menu_item'] = menu_get_item();
  if ($variables['menu_item']) {
    switch ($variables['menu_item']['page_callback']) {
      case 'views_page':
        // Is this a Views page?
        $variables['classes_array'][] = 'page-views';
        break;
      case 'page_manager_blog':
      case 'page_manager_blog_user':
      case 'page_manager_contact_site':
      case 'page_manager_contact_user':
      case 'page_manager_node_add':
      case 'page_manager_node_edit':
      case 'page_manager_node_view_page':
      case 'page_manager_page_execute':
      case 'page_manager_poll':
      case 'page_manager_search_page':
      case 'page_manager_term_view_page':
      case 'page_manager_user_edit_page':
      case 'page_manager_user_view_page':
        // Is this a Panels page?
        $variables['classes_array'][] = 'page-panels';
        break;
    }
  }
}

/**
 * Override or insert variables into the html templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("html" in this case.)
 */
function rapid_process_html(&$variables, $hook) {
  // Flatten out html_attributes.
  $variables['html_attributes'] = drupal_attributes($variables['html_attributes_array']);
}

/**
 * Override or insert variables in the html_tag theme function.
 */
function rapid_process_html_tag(&$variables) {
  $tag = &$variables['element'];

  if ($tag['#tag'] == 'style' || $tag['#tag'] == 'script') {
    // Remove redundant type attribute and CDATA comments.
    unset($tag['#attributes']['type'], $tag['#value_prefix'], $tag['#value_suffix']);

    // Remove media="all" but leave others unaffected.
    if (isset($tag['#attributes']['media']) && $tag['#attributes']['media'] === 'all') {
      unset($tag['#attributes']['media']);
    }
  }
}

/**
 * Implement hook_html_head_alter().
 */
function rapid_html_head_alter(&$head) {
  // Simplify the meta tag for character encoding.
  if (isset($head['system_meta_content_type']['#attributes']['content'])) {
    $head['system_meta_content_type']['#attributes'] = array('charset' => str_replace('text/html; charset=', '', $head['system_meta_content_type']['#attributes']['content']));
  }
}

/**
 * Override or insert variables into the page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
function rapid_preprocess_page(&$variables, $hook) {
  $variables['add_to_top'] = theme_get_setting('rapid_to_top');

  // Find the title of the menu used by the secondary links.
  $secondary_links = variable_get('menu_secondary_links_source', 'user-menu');
  if ($secondary_links) {
    $menus = function_exists('menu_get_menus') ? menu_get_menus() : menu_list_system_menus();
    $variables['secondary_menu_heading'] = $menus[$secondary_links];
  }
  else {
    $variables['secondary_menu_heading'] = '';
  }

}


/**
 * Implements hook_page_alter().
 *
 * Look for the last block in the region. This is impossible to determine from
 * within a preprocess_block function.
 *
 * @param $page
 *   Nested array of renderable elements that make up the page.
 */
function rapid_page_alter(&$page) {
  // Look in each visible region for blocks.
  foreach (system_region_list($GLOBALS['theme'], REGIONS_VISIBLE) as $region => $name) {
    if (!empty($page[$region])) {
      // Find the last block in the region.
      $blocks = array_reverse(element_children($page[$region]));
      while ($blocks && !isset($page[$region][$blocks[0]]['#block'])) {
        array_shift($blocks);
      }
      if ($blocks) {
        $page[$region][$blocks[0]]['#block']->last_in_region = TRUE;
      }
    }
  }
}


/**
 * Override or insert variables into the maintenance page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("maintenance_page" in this case.)
 */
function rapid_preprocess_maintenance_page(&$variables, $hook) {
  rapid_preprocess_html($variables, $hook);
  // There's nothing maintenance-related in rapid_preprocess_page(). Yet.
  //rapid_preprocess_page($variables, $hook);
}

/**
 * Override or insert variables into the maintenance page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("maintenance_page" in this case.)
 */
function rapid_process_maintenance_page(&$variables, $hook) {
  rapid_process_html($variables, $hook);
  // Ensure default regions get a variable. Theme authors often forget to remove
  // a deleted region's variable in maintenance-page.tpl.
  foreach (array('header', 'navigation', 'highlighted', 'help', 'content', 'sidebar_first', 'sidebar_second', 'footer', 'bottom') as $region) {
    if (!isset($variables[$region])) {
      $variables[$region] = '';
    }
  }
}

/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
function rapid_preprocess_node(&$variables, $hook) {
  // Add $unpublished variable.
  $variables['unpublished'] = (!$variables['status']) ? TRUE : FALSE;

  // Add pubdate to submitted variable.
  $variables['pubdate'] = '<time pubdate datetime="' . format_date($variables['node']->created, 'custom', 'c') . '">' . $variables['date'] . '</time>';
  if ($variables['display_submitted']) {
    $variables['submitted'] = t('Submitted by !username on !datetime', array('!username' => $variables['name'], '!datetime' => $variables['pubdate']));
  }

  // Add a class for the view mode.
  if (!$variables['teaser']) {
    $variables['classes_array'][] = 'view-mode-' . $variables['view_mode'];
  }

  // Add a class to show node is authored by current user.
  if ($variables['uid'] && $variables['uid'] == $GLOBALS['user']->uid) {
    $variables['classes_array'][] = 'node-by-viewer';
  }

  $variables['title_attributes_array']['class'][] = 'node__title';
}

/**
 * Override or insert variables into the comment templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("comment" in this case.)
 */
function rapid_preprocess_comment(&$variables, $hook) {
  // If comment subjects are disabled, don't display them.
  if (variable_get('comment_subject_field_' . $variables['node']->type, 1) == 0) {
    $variables['title'] = '';
  }

  // Add pubdate to submitted variable.
  $variables['pubdate'] = '<time pubdate datetime="' . format_date($variables['comment']->created, 'custom', 'c') . '">' . $variables['created'] . '</time>';
  $variables['submitted'] = t('!username replied on !datetime', array('!username' => $variables['author'], '!datetime' => $variables['pubdate']));

  // Zebra striping.
  if ($variables['id'] == 1) {
    $variables['classes_array'][] = 'first';
  }
  if ($variables['id'] == $variables['node']->comment_count) {
    $variables['classes_array'][] = 'last';
  }
  $variables['classes_array'][] = $variables['zebra'];

  $variables['title_attributes_array']['class'][] = 'comment__title';
}

/**
 * Preprocess variables for region.tpl.php
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("region" in this case.)
 */
function rapid_preprocess_region(&$variables, $hook) {
  $region = $variables['region'];
  $classes = $variables['classes_array'];

  // Sidebar regions get some extra classes and a common template suggestion.
  if (strpos($region, 'sidebar_') === 0) {
    $variables['classes_array'][] = 'sidebar';
    // Allow a region-specific template to override rapid's region--sidebar.
    array_unshift($variables['theme_hook_suggestions'], 'region__sidebar');
  }
  // Use a template with no wrapper for the content region.
  elseif ($region == 'content') {
    // Allow a region-specific template to override rapid's region--no-wrapper.
    array_unshift($variables['theme_hook_suggestions'], 'region__no_wrapper');
  }
  // Add a SMACSS-style class for header region.
  elseif ($region == 'header') {
    // array_unshift($variables['classes_array'], 'header__region');
    $variables['theme_hook_suggestions'][] = 'region__no_wrapper';
  }
}

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
function rapid_preprocess_block(&$variables, $hook) {
  // Classes describing the position of the block within the region.
  if ($variables['block_id'] == 1) {
    $variables['classes_array'][] = 'first';
  }
  // The last_in_region property is set in rapid_page_alter().
  if (isset($variables['block']->last_in_region)) {
    $variables['classes_array'][] = 'last';
  }
  $variables['classes_array'][] = $variables['block_zebra'];

  $variables['title_attributes_array']['class'][] = 'block__title';

  // Add template suggestions to appropriate blocks.
  switch ($variables['block']->module) {
    case 'system':
      switch ($variables['block']->delta) {
        case 'main':
          // Use a template with no wrapper for the page's main content.
          $variables['theme_hook_suggestions'][] = 'block__no_wrapper';
          break;
        case 'help':
        case 'powered-by':
          break;
        default:
          // Any other "system" block is a menu block and should use block--nav.tpl.php
          $variables['theme_hook_suggestions'][] = 'block__nav';
          break;
      }
      break;

    case 'menu':
    case 'menu_block':
      $variables['theme_hook_suggestions'][] = 'block__nav';
      break;
  }

  // Add Aria Roles via attributes.
  switch ($variables['block']->module) {
    case 'system':
      switch ($variables['block']->delta) {
        case 'main':
          // Note: the "main" role goes in the page.tpl, not here.
          break;
        case 'help':
        case 'powered-by':
          $variables['attributes_array']['role'] = 'complementary';
          break;
        default:
          // Any other "system" block is a menu block.
          $variables['attributes_array']['role'] = 'navigation';
          break;
      }
      break;
    case 'menu':
    case 'menu_block':
    case 'blog':
    case 'book':
    case 'comment':
    case 'forum':
    case 'shortcut':
    case 'statistics':
      $variables['attributes_array']['role'] = 'navigation';
      break;
    case 'search':
      $variables['attributes_array']['role'] = 'search';
      break;
    case 'help':
    case 'aggregator':
    case 'locale':
    case 'poll':
    case 'profile':
      $variables['attributes_array']['role'] = 'complementary';
      break;
    case 'node':
      switch ($variables['block']->delta) {
        case 'syndicate':
          $variables['attributes_array']['role'] = 'complementary';
          break;
        case 'recent':
          $variables['attributes_array']['role'] = 'navigation';
          break;
      }
      break;
    case 'user':
      switch ($variables['block']->delta) {
        case 'login':
          $variables['attributes_array']['role'] = 'form';
          break;
        case 'new':
        case 'online':
          $variables['attributes_array']['role'] = 'complementary';
          break;
      }
      break;
  }

  // Add BEM style classes to blocks.
  if (!empty($variables['block_html_id'])) {
    $variables['classes_array'][] = preg_replace('/^block-/', 'block__', $variables['block_html_id']);
  }

}

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
function rapid_process_block(&$variables, $hook) {
  // Drupal 7 should use a $title variable instead of $block->subject.
  $variables['title'] = isset($variables['block']->subject) ? $variables['block']->subject : '';
}


/**
 * Returns HTML for a field.
 *
 * This is Omega's implementation to display the value of a field.
 * Theme developers who are comfortable with overriding theme functions may do
 * so in order to customize this markup. This function can be overridden with
 * varying levels of specificity. For example, for a field named 'body'
 * displayed on the 'article' content type, any of the following functions will
 * override this default implementation. The first of these functions that
 * exists is used:
 * - THEMENAME_field__body__article()
 * - THEMENAME_field__article()
 * - THEMENAME_field__body()
 * - THEMENAME_field()
 *
 * @param $variables
 *   An associative array containing:
 *   - label_hidden: A boolean indicating to show or hide the field label.
 *   - title_attributes: A string containing the attributes for the title.
 *   - label: The label for the field.
 *   - content_attributes: A string containing the attributes for the content's
 *     div.
 *   - items: An array of field items.
 *   - item_attributes: An array of attributes for each item.
 *   - classes: A string containing the classes for the wrapping div.
 *   - attributes: A string containing the attributes for the wrapping div.
 *
 * @see template_preprocess_field()
 * @see template_process_field()
 * @see field.tpl.php
 *
 * @ingroup themeable
 */
function rapid_field($variables) {
  $output = '';

  // Render the label, if it's not hidden.
  if (!$variables['label_hidden']) {
    $output .= '<div class="field__label"' . $variables['title_attributes'] . '>' . $variables['label'] . ':&nbsp;</div>';
  }

  // Render the items.
  $output .= '<div class="field__items"' . $variables['content_attributes'] . '>';
  foreach ($variables['items'] as $delta => $item) {
    $classes = 'field__item ' . ($delta % 2 ? 'odd' : 'even');
    $output .= '<div class="' . $classes . '"' . $variables['item_attributes'][$delta] . '>' . drupal_render($item) . '</div>';
  }
  $output .= '</div>';

  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . '"' . $variables['attributes'] . '>' . $output . '</div>';

  return $output;
}


/**
 * Implements hook_preprocess_field().
 */
function rapid_preprocess_field(&$variables) {
  // Remove all of core's default classes.
  $variables['classes_array'] = array_diff($variables['classes_array'], array(
    // 'field',
    'field-name-' . $variables['field_name_css'],
    'field-type-' . $variables['field_type_css'],
    'field-label-' . $variables['element']['#label_display'],
  ));

  // Add our lean field class.
  if (strpos($variables['field_name_css'], 'field-') === 0) {
    $variables['classes_array'][] = $variables['field_name_css'];
  }
  else {
    $variables['classes_array'][] = 'field__' . $variables['field_name_css'];
  }
}


/**
 * Implements hook_form_alter().
 */
function rapid_form_alter(&$form, &$form_state, $form_id) {
  // Duplicate the form ID as a class so we can reduce specificity in our CSS.
  $form['#attributes']['class'][] = drupal_clean_css_identifier($form['#id']);
}


/**
 * Implements hook_form_BASE_FORM_ID_alter().
 *
 * Prevent user-facing field styling from screwing up node edit forms by
 * renaming the classes on the node edit form's field wrappers.
 */
function rapid_form_node_form_alter(&$form, &$form_state, $form_id) {
  // Remove if #1245218 is backported to D7 core.
  foreach (array_keys($form) as $item) {
    if (strpos($item, 'field_') === 0) {
      if (!empty($form[$item]['#attributes']['class'])) {
        foreach ($form[$item]['#attributes']['class'] as &$class) {
          // Core bug: the field-type-text-with-summary class is used as a JS hook.
          if ($class != 'field-type-text-with-summary' && strpos($class, 'field-type-') === 0 || strpos($class, 'field-name-') === 0) {
            // Make the class different from that used in theme_field().
            $class = 'form-' . $class;
          }
        }
      }
    }
  }
}


/**
 * Implements theme_form_element().
 *
 * Adding required class to form item wrapper.
 *
 */
function rapid_form_element($variables) {
  $element = &$variables['element'];

  // This function is invoked as theme wrapper, but the rendered form element
  // may not necessarily have been processed by form_builder().
  $element += array(
    '#title_display' => 'before',
  );

  // Add element #id for #type 'item'.
  if (isset($element['#markup']) && !empty($element['#id'])) {
    $attributes['id'] = $element['#id'];
  }
  // Add element's #type and #name as class to aid with JS/CSS selectors.
  $attributes['class'] = array('form-item');
  if (!empty($element['#type'])) {
    $attributes['class'][] = 'form-type-' . strtr($element['#type'], '_', '-');
  }
  if (!empty($element['#name'])) {
    $attributes['class'][] = 'form-item-' . strtr($element['#name'], array(' ' => '-', '_' => '-', '[' => '-', ']' => ''));
  }
  // Add a class for disabled elements to facilitate cross-browser styling.
  if (!empty($element['#attributes']['disabled'])) {
    $attributes['class'][] = 'form-disabled';
  }
  // ADDED TO CORE THEME FUNCTION
  if (isset($element['#required']) && $element['#required']) {
    $attributes['class'][] = 'form-item-required';
  }
  $output = '<div' . drupal_attributes($attributes) . '>' . "\n";

  // If #title is not set, we don't display any label or required marker.
  if (!isset($element['#title'])) {
    $element['#title_display'] = 'none';
  }
  $prefix = isset($element['#field_prefix']) ? '<span class="field-prefix">' . $element['#field_prefix'] . '</span> ' : '';
  $suffix = isset($element['#field_suffix']) ? ' <span class="field-suffix">' . $element['#field_suffix'] . '</span>' : '';

  switch ($element['#title_display']) {
    case 'before':
    case 'invisible':
      $output .= ' ' . theme('form_element_label', $variables);
      $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
      break;

    case 'after':
      $output .= ' ' . $prefix . $element['#children'] . $suffix;
      $output .= ' ' . theme('form_element_label', $variables) . "\n";
      break;

    case 'none':
    case 'attribute':
      // Output no label and no required marker, only the children.
      $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
      break;
  }

  if (!empty($element['#description'])) {
    $output .= '<div class="description">' . $element['#description'] . "</div>\n";
  }

  $output .= "</div>\n";

  return $output;
}



/**
 * Override or insert variables into the taxonomy term templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
function rapid_preprocess_taxonomy_term(&$variables) {
  // Add a class based on view_mode.
  $variables['classes_array'][] = 'term-' . drupal_html_class($variables['view_mode']);
  $variables['classes_array'][] = 'term-' .  drupal_html_class($variables['vocabulary_machine_name']) . '-' .  drupal_html_class($variables['view_mode']);

  $variables['title_attributes_array']['class'][] = 'term__title';
}


/**
 * Returns HTML for primary and secondary local tasks.
 *
 * @ingroup themeable
 */
function rapid_menu_local_tasks(&$variables) {
  $output = '';

  // Add theme hook suggestions for tab type.
  foreach (array('primary', 'secondary') as $type) {
    if (!empty($variables[$type])) {
      foreach (array_keys($variables[$type]) as $key) {
        if (isset($variables[$type][$key]['#theme']) && ($variables[$type][$key]['#theme'] == 'menu_local_task' || is_array($variables[$type][$key]['#theme']) && in_array('menu_local_task', $variables[$type][$key]['#theme']))) {
          $variables[$type][$key]['#theme'] = array('menu_local_task__' . $type, 'menu_local_task');
        }
      }
    }
  }

  if (!empty($variables['primary'])) {
    $variables['primary']['#prefix'] = '<h2 class="element-invisible">' . t('Primary tabs') . '</h2>';
    $variables['primary']['#prefix'] .= '<ul class="tabs tabs__primary links__inline">';
    $variables['primary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['primary']);
  }
  if (!empty($variables['secondary'])) {
    $variables['secondary']['#prefix'] = '<h2 class="element-invisible">' . t('Secondary tabs') . '</h2>';
    $variables['secondary']['#prefix'] .= '<ul class="tabs tabs__secondary links__inline">';
    $variables['secondary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['secondary']);
  }

  return $output;
}

/**
 * Returns HTML for a single local task link.
 *
 * @ingroup themeable
 */
function rapid_menu_local_task($variables) {
  $type = $class = FALSE;

  $link = $variables['element']['#link'];
  $link_text = $link['title'];

  // Check for tab type set in rapid_menu_local_tasks().
  if (is_array($variables['element']['#theme'])) {
    $type = in_array('menu_local_task__secondary', $variables['element']['#theme']) ? 'tabs-secondary' : 'tabs-primary';
  }

  // Add SMACSS-style class names.
  if ($type) {
    $link['localized_options']['attributes']['class'][] = $type . '__tab-link';
    $class = $type . '__tab';
  }

  if (!empty($variables['element']['#active'])) {
    // Add text to indicate active tab for non-visual users.
    $active = ' <span class="element-invisible">' . t('(active tab)') . '</span>';

    // If the link does not contain HTML already, check_plain() it now.
    // After we set 'html'=TRUE the link will not be sanitized by l().
    if (empty($link['localized_options']['html'])) {
      $link['title'] = check_plain($link['title']);
    }
    $link['localized_options']['html'] = TRUE;
    $link_text = t('!local-task-title!active', array('!local-task-title' => $link['title'], '!active' => $active));

    if (!$type) {
      $class = 'active';
    }
    else {
      $link['localized_options']['attributes']['class'][] = 'is-active';
      $class .= ' is-active';
    }
  }

  return '<li' . ($class ? ' class="' . $class . '"' : '') . '>' . l($link_text, $link['href'], $link['localized_options']) . "</li>\n";
}

/**
 * Implements hook_preprocess_menu_link().
 */
function rapid_preprocess_menu_link(&$variables, $hook) {
  foreach ($variables['element']['#attributes']['class'] as $key => $class) {
    switch ($class) {
      // Menu module classes.
      case 'expanded':
      case 'collapsed':
      case 'leaf':
      case 'active':
      // Menu block module classes.
      case 'active-trail':
        array_unshift($variables['element']['#attributes']['class'], 'is-' . $class);
        break;
      case 'has-children':
        array_unshift($variables['element']['#attributes']['class'], 'is-parent');
        break;
    }
  }
  array_unshift($variables['element']['#attributes']['class'], 'menu__item');
  if (empty($variables['element']['#localized_options']['attributes']['class'])) {
    $variables['element']['#localized_options']['attributes']['class'] = array();
  }
  else {
    foreach ($variables['element']['#localized_options']['attributes']['class'] as $key => $class) {
      switch ($class) {
        case 'active':
        case 'active-trail':
          array_unshift($variables['element']['#localized_options']['attributes']['class'], 'is-' . $class);
          break;
      }
    }
  }
  array_unshift($variables['element']['#localized_options']['attributes']['class'], 'menu__link');
}

/**
 * Returns HTML for status and/or error messages, grouped by type.
 */
function rapid_status_messages($variables) {
  $display = $variables['display'];
  $output = '';

  $status_heading = array(
    'status' => t('Status message'),
    'error' => t('Error message'),
    'warning' => t('Warning message'),
  );
  foreach (drupal_get_messages($display) as $type => $messages) {
    $output .= "<div class=\"messages__$type messages $type\">\n";
    if (!empty($status_heading[$type])) {
      $output .= '<h2 class="element-invisible">' . $status_heading[$type] . "</h2>\n";
    }
    if (count($messages) > 1) {
      $output .= " <ul class=\"messages--list\">\n";
      foreach ($messages as $message) {
        $output .= '  <li class=\"messages--item\">' . $message . "</li>\n";
      }
      $output .= " </ul>\n";
    }
    else {
      $output .= $messages[0];
    }
    $output .= "</div>\n";
  }
  return $output;
}

/**
 * Returns HTML for a marker for new or updated content.
 */
function rapid_mark($variables) {
  $type = $variables['type'];

  if ($type == MARK_NEW) {
    return ' <mark class="new">' . t('new') . '</mark>';
  }
  elseif ($type == MARK_UPDATED) {
    return ' <mark class="updated">' . t('updated') . '</mark>';
  }
}

/**
 * Alters the default Panels render callback so it removes the panel separator.
 */
function rapid_panels_default_style_render_region($variables) {
  return implode('', $variables['panes']);
}

/**
 * Returns HTML for a query pager.
 *
 * Menu callbacks that display paged query results should call theme('pager') to
 * retrieve a pager control so that users can view other results. Format a list
 * of nearby pages with additional query results.
 *
 * @param $variables
 *   An associative array containing:
 *   - tags: An array of labels for the controls in the pager.
 *   - element: An optional integer to distinguish between multiple pagers on
 *     one page.
 *   - parameters: An associative array of query string parameters to append to
 *     the pager links.
 *   - quantity: The number of pages in the list.
 *
 * @ingroup themeable
 */
function rapid_pager($variables) {
  $tags = $variables['tags'];
  $element = $variables['element'];
  $parameters = $variables['parameters'];
  $quantity = $variables['quantity'];
  global $pager_page_array, $pager_total;

  // Calculate various markers within this pager piece:
  // Middle is used to "center" pages around the current page.
  $pager_middle = ceil($quantity / 2);
  // current is the page we are currently paged to
  $pager_current = $pager_page_array[$element] + 1;
  // first is the first page listed by this pager piece (re quantity)
  $pager_first = $pager_current - $pager_middle + 1;
  // last is the last page listed by this pager piece (re quantity)
  $pager_last = $pager_current + $quantity - $pager_middle;
  // max is the maximum page number
  $pager_max = $pager_total[$element];
  // End of marker calculations.

  // Prepare for generation loop.
  $i = $pager_first;
  if ($pager_last > $pager_max) {
    // Adjust "center" if at end of query.
    $i = $i + ($pager_max - $pager_last);
    $pager_last = $pager_max;
  }
  if ($i <= 0) {
    // Adjust "center" if at start of query.
    $pager_last = $pager_last + (1 - $i);
    $i = 1;
  }
  // End of generation loop preparation.

  $li_first = theme('pager_first', array('text' => (isset($tags[0]) ? $tags[0] : t('first')), 'element' => $element, 'parameters' => $parameters));
  $li_previous = theme('pager_previous', array('text' => (isset($tags[1]) ? $tags[1] : t('previous')), 'element' => $element, 'interval' => 1, 'parameters' => $parameters));
  $li_next = theme('pager_next', array('text' => (isset($tags[3]) ? $tags[3] : t('next')), 'element' => $element, 'interval' => 1, 'parameters' => $parameters));
  $li_last = theme('pager_last', array('text' => (isset($tags[4]) ? $tags[4] : t('last')), 'element' => $element, 'parameters' => $parameters));

  if ($pager_total[$element] > 1) {
    if ($li_first) {
      $items[] = array(
        'class' => array('pager__first'),
        'data' => $li_first,
      );
    }
    if ($li_previous) {
      $items[] = array(
        'class' => array('pager__previous'),
        'data' => $li_previous,
      );
    }

    // When there is more than one page, create the pager list.
    if ($i != $pager_max) {
      if ($i > 1) {
        $items[] = array(
          'class' => array('pager__ellipsis'),
          'data' => '…',
        );
      }
      // Now generate the actual pager piece.
      for (; $i <= $pager_last && $i <= $pager_max; $i++) {
        if ($i < $pager_current) {
          $items[] = array(
            'class' => array('pager__item'),
            'data' => theme('pager_previous', array('text' => $i, 'element' => $element, 'interval' => ($pager_current - $i), 'parameters' => $parameters)),
          );
        }
        if ($i == $pager_current) {
          $items[] = array(
            'class' => array('pager__current'),
            'data' => $i,
          );
        }
        if ($i > $pager_current) {
          $items[] = array(
            'class' => array('pager__item'),
            'data' => theme('pager_next', array('text' => $i, 'element' => $element, 'interval' => ($i - $pager_current), 'parameters' => $parameters)),
          );
        }
      }
      if ($i < $pager_max) {
        $items[] = array(
          'class' => array('pager__ellipsis'),
          'data' => '…',
        );
      }
    }
    // End generation.
    if ($li_next) {
      $items[] = array(
        'class' => array('pager__next'),
        'data' => $li_next,
      );
    }
    if ($li_last) {
      $items[] = array(
        'class' => array('pager__last'),
        'data' => $li_last,
      );
    }
    return '<h2 class="element-invisible">' . t('Pages') . '</h2>' . theme('item_list', array(
      'items' => $items,
      'attributes' => array('class' => array('pager')),
    ));
  }
}


/**
 * Returns HTML for a link to a specific query result page.
 *
 * @param $variables
 *   An associative array containing:
 *   - text: The link text. Also used to figure out the title attribute of the
 *     link, if it is not provided in $variables['attributes']['title']; in
 *     this case, $variables['text'] must be one of the standard pager link
 *     text strings that would be generated by the pager theme functions, such
 *     as a number or t('« first').
 *   - page_new: The first result to display on the linked page.
 *   - element: An optional integer to distinguish between multiple pagers on
 *     one page.
 *   - parameters: An associative array of query string parameters to append to
 *     the pager link.
 *   - attributes: An associative array of HTML attributes to apply to the
 *     pager link.
 *
 * @see theme_pager()
 *
 * @ingroup themeable
 */
function rapid_pager_link($variables) {
  $text = $variables['text'];
  $page_new = $variables['page_new'];
  $element = $variables['element'];
  $parameters = $variables['parameters'];
  $attributes = $variables['attributes'];

  $page = isset($_GET['page']) ? $_GET['page'] : '';
  if ($new_page = implode(',', pager_load_array($page_new[$element], $element, explode(',', $page)))) {
    $parameters['page'] = $new_page;
  }

  $query = array();
  if (count($parameters)) {
    $query = drupal_get_query_parameters($parameters, array());
  }
  if ($query_pager = pager_get_query_parameters()) {
    $query = array_merge($query, $query_pager);
  }

  // Set each pager link title
  if (!isset($attributes['title'])) {
    static $titles = NULL;
    if (!isset($titles)) {
      $titles = array(
        t('first') => t('Go to first page'),
        t('previous') => t('Go to previous page'),
        t('next') => t('Go to next page'),
        t('last') => t('Go to last page'),
      );
    }
    if (isset($titles[$text])) {
      $attributes['title'] = $titles[$text];
    }
    elseif (is_numeric($text)) {
      $attributes['title'] = t('Go to page @number', array('@number' => $text));
    }
  }

  // @todo l() cannot be used here, since it adds an 'active' class based on the
  //   path only (which is always the current path for pager links). Apparently,
  //   none of the pager links is active at any time - but it should still be
  //   possible to use l() here.
  // @see http://drupal.org/node/1410574
  $attributes['href'] = url($_GET['q'], array('query' => $query));
  return '<a' . drupal_attributes($attributes) . '>' . check_plain($text) . '</a>';
}

