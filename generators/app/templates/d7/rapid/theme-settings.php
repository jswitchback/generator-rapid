<?php
/**
 * Implements hook_form_system_theme_settings_alter() function.
 *
 * @param $form
 *   Nested array of form elements that comprise the form.
 * @param $form_state
 *   A keyed array containing the current state of the form.
 */
function rapid_form_system_theme_settings_alter(&$form, $form_state, $form_id = NULL) {
  // Work-around for a core bug affecting admin themes. See issue #943212.
  if (isset($form_id)) {
    return;
  }

  // Create the form using Forms API
  $form['breadcrumb'] = array(
    '#type'          => 'fieldset',
    '#title'         => t('Breadcrumb settings'),
  );
  $form['breadcrumb']['rapid_breadcrumb'] = array(
    '#type'          => 'select',
    '#title'         => t('Display breadcrumb'),
    '#default_value' => theme_get_setting('rapid_breadcrumb'),
    '#options'       => array(
                          'yes'   => t('Yes'),
                          'admin' => t('Only in admin section'),
                          'no'    => t('No'),
                        ),
  );
  $form['breadcrumb']['breadcrumb_options'] = array(
    '#type' => 'container',
    '#states' => array(
      'invisible' => array(
        ':input[name="rapid_breadcrumb"]' => array('value' => 'no'),
      ),
    ),
  );
  $form['breadcrumb']['breadcrumb_options']['rapid_breadcrumb_separator'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Breadcrumb separator'),
    '#description'   => t('Text only. Don’t forget to include spaces.'),
    '#default_value' => theme_get_setting('rapid_breadcrumb_separator'),
    '#size'          => 5,
    '#maxlength'     => 10,
  );
  $form['breadcrumb']['breadcrumb_options']['rapid_breadcrumb_home'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Show home page link in breadcrumb'),
    '#default_value' => theme_get_setting('rapid_breadcrumb_home'),
  );
  $form['breadcrumb']['breadcrumb_options']['rapid_breadcrumb_trailing'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Append a separator to the end of the breadcrumb'),
    '#default_value' => theme_get_setting('rapid_breadcrumb_trailing'),
    '#description'   => t('Useful when the breadcrumb is placed just before the title.'),
    '#states' => array(
      'disabled' => array(
        ':input[name="rapid_breadcrumb_title"]' => array('checked' => TRUE),
      ),
    ),
  );
  $form['breadcrumb']['breadcrumb_options']['rapid_breadcrumb_title'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Append the content title to the end of the breadcrumb'),
    '#default_value' => theme_get_setting('rapid_breadcrumb_title'),
    '#description'   => t('Useful when the breadcrumb is not placed just before the title.'),
  );
  $form['support'] = array(
    '#type'          => 'fieldset',
    '#title'         => t('Accessibility and support settings'),
  );
  $form['support']['rapid_skip_link_anchor'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Anchor ID for the “skip link”'),
    '#default_value' => theme_get_setting('rapid_skip_link_anchor'),
    '#field_prefix'  => '#',
    '#description'   => t('Specify the HTML ID of the element that the accessible-but-hidden “skip link” should link to. Note: that element should have the <code>tabindex="-1"</code> attribute to prevent an accessibility bug in webkit browsers. (<a href="!link">Read more about skip links</a>.)', array('!link' => 'https://drupal.org/node/467976')),
  );
  $form['support']['rapid_skip_link_text'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Text for the “skip link”'),
    '#default_value' => theme_get_setting('rapid_skip_link_text'),
    '#description'   => t('For example: <em>Jump to navigation</em>, <em>Skip to content</em>'),
  );
  $form['support']['rapid_html5_respond_meta'] = array(
    '#type'          => 'checkboxes',
    '#title'         => t('Add HTML5 and responsive scripts and meta tags to every page.'),
    '#default_value' => theme_get_setting('rapid_html5_respond_meta'),
    '#options'       => array(
                          'respond' => t('Add Respond.js javaScript to add basic CSS3 media query support to IE 6-8.'),
                          'html5' => t('Add HTML5 shim JavaScript to add support to IE 6-8.'),
                          'meta' => t('Add meta tags to support responsive design on mobile devices.'),
                          'enquire' => t('Add Enquire javaScript library for responding to CSS media queries. Included Media Match polyfill for IE9 and below.'),
                        ),
    '#description'   => t('IE 6-8 require a JavaScript polyfill solution to add basic support of HTML5 and CSS3 media queries. If you prefer to use another polyfill solution, such as <a href="!link">Modernizr</a>, you can disable these options. Respond.js only works if <a href="@url">Aggregate CSS</a> is enabled. Mobile devices require a few meta tags for responsive designs.', array('!link' => 'http://www.modernizr.com/', '@url' => url('admin/config/development/performance'))),
  );
  $form['support']['rapid_conditional_classes_html'] = array(
    '#type' => 'checkbox',
    '#title' => t('Add conditional classes for Internet Explorer'),
    '#description' => t('Adds conditional classes (for Internet Explorer) to the &lt;html&gt;.'),
    '#default_value' => theme_get_setting('rapid_conditional_classes_html'),
  );
  $form['support']['rapid_add_update_browser_script'] = array(
    '#type' => 'checkbox',
    '#title' => t('Add update browser script to warn user of their unsupported browser.'),
    '#description' => t('Details can be found at <a href="!link">https://browser-update.org</a>.', array('!link' => '')),
    '#default_value' => theme_get_setting('rapid_add_update_browser_script'),
  );
  $form['themedev'] = array(
    '#type'          => 'fieldset',
    '#title'         => t('Theme development settings'),
  );
  $form['themedev']['rapid_rebuild_registry'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Rebuild theme registry on every page.'),
    '#default_value' => theme_get_setting('rapid_rebuild_registry'),
    '#description'   => t('During theme development, it can be very useful to continuously <a href="!link">rebuild the theme registry</a>. WARNING: this is a huge performance penalty and must be turned off on production websites.', array('!link' => 'https://drupal.org/node/173880#theme-registry')),
  );
  $form['themedev']['rapid_wireframes'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Add wireframes around main layout elements'),
    '#default_value' => theme_get_setting('rapid_wireframes'),
    '#description'   => t('<a href="!link">Wireframes</a> are useful when prototyping a website.', array('!link' => 'http://www.boxesandarrows.com/view/html_wireframes_and_prototypes_all_gain_and_no_pain')),
  );
  // Custom option for toggling the main content blog on the front page.
  $form['themedev']['rapid_toggle_front_page_content'] = array(
    '#type' => 'checkbox',
    '#title' => t('Front page content'),
    '#description' => t('Allow the main content block to be rendered on the front page.'),
    '#default_value' => theme_get_setting('rapid_toggle_front_page_content'),
  );
 $form['rapid_settings'] = array(
    '#type'          => 'fieldset',
    '#title'         => t('Additionally custom theme settings'),
  );
  $form['rapid_settings']['rapid_to_top'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Add scroll to top button.'),
    '#description'   => t('Includes jQuery Smooth Scroll.'),
    '#default_value' => theme_get_setting('rapid_to_top'),
  );

}
