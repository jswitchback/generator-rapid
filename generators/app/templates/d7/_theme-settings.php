<?php
/**
 * Implements hook_form_system_theme_settings_alter().
 *
 * @param $form
 *   Nested array of form elements that comprise the form.
 * @param $form_state
 *   A keyed array containing the current state of the form.
 */
function <%= themeMachineName %>_form_system_theme_settings_alter(&$form, &$form_state, $form_id = NULL)  {
  // Work-around for a core bug affecting admin themes. See issue #943212.
  if (isset($form_id)) {
    return;
  }

  // Create the form using Forms API: http://api.drupal.org/api/7

  /* -- Delete this line if you want to use this setting
  $form['<%= themeMachineName %>_example'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('<%= themeMachineName %> sample setting'),
    '#default_value' => theme_get_setting('<%= themeMachineName %>_example'),
    '#description'   => t("This option doesn't do anything; it's just an example."),
  );
  // */

  $form['themedev']['responsive_settings']['<%= themeMachineName %>_compass_grid'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Include CSS3 grid via Compass mixin. Toggle with the ') . '<code>g</code>' . t(' key.'),
    '#description'   => t('Note: Sub-pixel rounding can lead to several pixels of variation between browsers. Viewable by admin users only. Adjust grid in the grid.scss file.'),
    '#default_value' => theme_get_setting('<%= themeMachineName %>_compass_grid'),
  );
  $form['themedev']['<%= themeMachineName %>_app_icons'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Include mobile icons.'),
    '#description'   => t('Adds meta tags for Apple, Android and Microsoft app icons. See the html.tpl.php to change icon paths.'),
    '#default_value' => theme_get_setting('<%= themeMachineName %>_app_icons'),
  );
  $form['themedev']['<%= themeMachineName %>_ms_tile_color'] = array(
    '#type'          => 'textfield',
    '#field_prefix'  => '#',
    '#title' => t('Meta tag color used for Windows background tile'),
    '#default_value' => theme_get_setting('<%= themeMachineName %>_ms_tile_color'),
    '#size'          => 6,
    '#maxlength'     => 6,
  );

  // Remove some of the base theme's settings.
  /* -- Delete this line if you want to turn off this setting.
  unset($form['themedev']['rapid_wireframes']); // We don't need to toggle wireframes on this site.
  // */

  // We are editing the $form in place, so we don't need to return anything.
}

