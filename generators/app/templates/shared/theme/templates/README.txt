TEMPLATES
---------

********* READ ME ***********
The Rapid theme overrides a handful of Drupal's templates. In order to override those templates, you should copy them from the rapid/templates folder to your sub-theme's templates folder.
*****************************

Drupal 7 contains the following template files which you can override and modify
by copying them to your sub-theme.


As always, when adding a new template file to your sub-theme, you will need to
rebuild the "theme registry" in order for Drupal to see it. For more info, see: https://drupal.org/node/173880#theme-registry


//////////////////////////////
// Rapid templates
//////////////////////////////


Located in rapid/templates:

  html.tpl.php
  ---
  page.tpl.php
  ---
  maintenance-page.tpl.php
  ---
  node.tpl.php
  ---
  region.tpl.php
  region--footer.tpl.php
  region--sidebar.tpl.php
  region--no-wrapper.tpl.php
  ---
  block.tpl.php
  block--nav.tpl.php
  block--no-wrapper.tpl.php
  ---
  comment-wrapper.tpl.php
  comment.tpl.php
  ---
  user-picture.tpl.php
  ---
  pane-header.tpl.php
  pane-messages.tpl.php
  pane-navigation.tpl.php
  panels-pane.tpl.php
  ---
  views-view.tpl.php



//////////////////////////////
// Drupal Core templates
//////////////////////////////


Located in /modules/aggregator:
  aggregator-feed-source.tpl.php
  aggregator-item.tpl.php
  aggregator-summary-item.tpl.php
  aggregator-summary-items.tpl.php
  aggregator-wrapper.tpl.php

Located in /modules/block:
  block.tpl.php  (overridden by Rapid)
  block-admin-display-form.tpl.php

Located in /modules/book:
  book-all-books-block.tpl.php
  book-export-html.tpl.php
  book-navigation.tpl.php
  book-node-export-html.tpl.php

Located in /modules/comment:
  comment-wrapper.tpl.php  (overridden by Rapid)
  comment.tpl.php  (overridden by Rapid)

Located in /modules/field/theme:
  field.tpl.php  (not used; core uses theme_field() instead)

Located in /modules/forum:
  forum-icon.tpl.php
  forum-list.tpl.php
  forum-submitted.tpl.php
  forum-topic-list.tpl.php
  forums.tpl.php

Located in /modules/node:
  node.tpl.php  (overridden by Rapid)

Located in /modules/overlay:
  overlay.tpl.php

Located in /modules/poll:
  poll-bar--block.tpl.php
  poll-bar.tpl.php
  poll-results--block.tpl.php
  poll-results.tpl.php
  poll-vote.tpl.php

Located in /modules/profile:
  profile-block.tpl.php
  profile-listing.tpl.php
  profile-wrapper.tpl.php

Located in /modules/search:
  search-block-form.tpl.php
  search-result.tpl.php
  search-results.tpl.php

Located in /modules/system:
  html.tpl.php  (overridden by Rapid)
  maintenance-page.tpl.php  (overridden by Rapid)
  page.tpl.php  (overridden by Rapid)
  region.tpl.php  (overridden by Rapid)

Located in /modules/taxonomy:
  taxonomy-term.tpl.php

Located in /modules/toolbar:
  toolbar.tpl.php

Located in /modules/user:
  user-picture.tpl.php  (overridden by Rapid)
  user-profile-category.tpl.php
  user-profile-item.tpl.php
  user-profile.tpl.php
