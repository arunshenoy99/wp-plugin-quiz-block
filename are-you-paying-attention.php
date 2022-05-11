<?php

/*
    Plugin Name: Are You Paying Attention Quiz
    Description: Give your readers a multiple choice question.
    Version: 1.0
    Author: Arun
    Author Uri: https://github.com/arunshenoy99
*/

if (! defined('ABSPATH')) exit; // Exit if accessed directly i.e load the url of this php file in the browser

class AreYouPayingAttention {

    function __construct() {
        add_action('init', array($this, 'adminAssets'));
        // We use the below action to load the index.js when the save function returns hardcoded html
        // add_action('enqueue_block_editor_assets', array($this, 'adminAssets'));
    }

    function adminAssets() {
        // We use dynamic blocks this way. Here the save(),function in js will return null and we can make changes to
        // theHTML without passing deprecated. In the DB only the attributes will be stored in the comment and the actual html will not be stored which
        // is also the reason why we do not get the invalid block type error.
        wp_register_script('ournewblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element'));
        register_block_type('ourplugin/are-you-paying-attention', array(
            'editor_script' => 'ournewblocktype',
            'render_callback' => array($this, 'theHTML')
        ));
        // We use the below enqueue when we are loading the javascript file in which the save returns hardcoded html.
        // wp_enqueue_script('ournewblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element'));
    }

    function theHTML($attributes) {
        // Here we are using the output buffer, ob_start says store whatever comes next in the output buffer.
        // ob_get_clean returns all the html that was stored in the output buffer.
        ob_start(); ?>
        <h3>Today the sky is <?php echo esc_html($attributes['skyColor']); ?> and the grass is <?php echo esc_html($attributes['grassColor']); ?>.</h3>
    <?php return ob_get_clean(); }

}

$areYouPayingAttention = new AreYouPayingAttention();

?>