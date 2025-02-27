<?php

/**
 * Plugin Name: zoom-slideshow
 * Plugin URI: http://screen4.com/zoom-slideshow
 * Description: Zoom Slideshow
 * Version: 1.0.0
 * Author: Justin Wyllie
 * Author URI: http://justinwylliephotography.com
 * Developer: Justin Wyllie
 * Developer URI: http://justinwylliephotography.com
 * Text Domain: zoom-slideshow
 * Domain Path: /languages
 *
 *
 * License: GNU General Public License v3.0
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 */
 


function add_extension_zoom_slideshow() {
    
    $script_asset_path = dirname( __FILE__ ) . '/build/zoom-slideshow.asset.php';
    $script_asset      = file_exists( $script_asset_path )
		? require( $script_asset_path )
		: array( 'dependencies' => array(), 'version' => filemtime( dirname( __FILE__ ) . '/build/zoom-slideshow.js' ) );

    $script_asset['dependencies'][] = "wp-blocks";
    wp_enqueue_script('zoom-slideshow', '/wp-content/plugins/zoom-slideshow/build/zoom-slideshow.js', $script_asset['dependencies'],
    $script_asset['version']);

    register_block_type('screen4/zoom-slideshow', [
        'editor_script' => 'zoom-slideshow',
    ]);
 
};
add_action( 'admin_enqueue_scripts', 'add_extension_zoom_slideshow' );


function add_zoom_slideshow_scripts() {
   
    wp_enqueue_script('zoom-slideshow-js', '/wp-content/plugins/zoom-slideshow//scripts/zoom.js', array('jquery'),
    wp_get_theme()->get('Version'));

    wp_enqueue_style( 'zoom-slideshow-css', '/wp-content/plugins/zoom-slideshow/css/styles.css',    array(), wp_get_theme()->get('Version'));


 
};
add_action( 'wp_enqueue_scripts', 'add_zoom_slideshow_scripts' );

function zoom_slideshow_block_styles() {

    $plugin_css = dirname( __FILE__ ) . '/zoom-slideshow.css';
    $plugin_url = plugins_url('zoom-slideshow.css', __FILE__);
    wp_register_style(
        'zoom-slideshow-style',
        $plugin_url,
        array(),
        filemtime( $plugin_css )
    );
    
    wp_enqueue_style( 'zoom-slideshow-style' );
 
 }
 add_action( 'enqueue_block_assets', 'zoom_slideshow_block_styles' );




?>
