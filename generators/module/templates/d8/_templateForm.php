<?php

/**
 * @file
 * Contains \Drupal\<%= moduleName %>\Form\<%= moduleClassName %>.
 */

// Return form renderable array. Similar to Drupal 7 drupal_get_form()
// $form = \Drupal::formBuilder()->getForm('Drupal\<%= moduleName %>\Form\<%= moduleClassName %>');
// $form = \Drupal::formBuilder()->getForm('Drupal\MODULENAME\Form\FORMCLASSNAME');

namespace Drupal\<%= moduleName %>\Form;

use Drupal\Core\Form\FormBase;

class <%= moduleClassName %> extends FormBase {

  /**
   * {@inheritdoc}.
   */
  public function getFormId() {
    return '<%= moduleName %>_form';
  }

  /**
   * {@inheritdoc}.
   */
  public function buildForm(array $form, array &$form_state) {

    $form['email'] = array(
      '#type' => 'email',
      '#title' => $this->t('Your .com email address.')
    );
    $form['show'] = array(
      '#type' => 'submit',
      '#value' => $this->t('Submit'),
    );

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, array &$form_state) {

    if (strpos($form_state['values']['email'], '.com') === FALSE ) {
      $this->setFormError('email', $form_state, $this->t('This is not a .com email address.'));
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, array &$form_state) {

    drupal_set_message($this->t('Your email address is @email', array('@email' => $form_state['values']['email'])));
  }

}
