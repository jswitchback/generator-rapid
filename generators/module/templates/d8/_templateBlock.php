<?php
/**
 * Provides a '<%= moduleName %>' Block
 *
 * @Block(
 *   id = "<%= moduleName %>",
 *   admin_label = @Translation("BLOCK LABEL HERE"),
 * )
 */

// To create custom block
namespace Drupal\<%= moduleName %>\Plugin\Block;

// To add form elements to the block
use Drupal\Core\Block\BlockPluginInterface;
use Drupal\Core\Form\FormStateInterface;

// To create custom block
use Drupal\Core\Block\BlockBase;


// class definition if not adding form elements
// class <%=  moduleClassName %>Block extends BlockBase {

class <%=  moduleClassName %> extends BlockBase implements BlockPluginInterface {
  /**
   * {@inheritdoc}
   */
  public function build() {
   $config = $this->getConfiguration();

    if (!empty($config['name'])) {
      $name = $config['name'];
    }
    else {
      $name = $this->t('to no one');
    }
    return array(
      '#markup' => $this->t('Hello @name!', array (
          '@name' => $name,
        )
      ),
    );
  }


   // Add the form
  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);

    $config = $this->getConfiguration();

    $form['FORM_ELEMENT_NAME'] = array (
      '#type' => 'textfield',
      '#title' => $this->t('Who'),
      '#description' => $this->t('Who do you want to say hello to?'),
      '#default_value' => isset($config['name']) ? $config['name'] : ''
    );

    return $form;
  }

  // Add submit
  public function blockSubmit($form, FormStateInterface $form_state) {
    $this->setConfigurationValue('name', $form_state->getValue('FORM_ELEMENT_NAME'));
  }

}
