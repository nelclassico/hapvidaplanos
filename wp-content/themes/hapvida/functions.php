<?php
	/*-----------------------------------------------------------------------------------*/
	/* This file will be referenced every time a template/page loads on your Wordpress site
	/* This is the place to define custom fxns and specialty code
	/*-----------------------------------------------------------------------------------*/

// Define the version so we can easily replace it throughout the theme
define( 'NAKED_VERSION', 1.0 );


/*-----------------------------------------------------------------------------------*/
/* Add Rss feed support to Head section
/*-----------------------------------------------------------------------------------*/
add_theme_support( 'automatic-feed-links' );

/*-----------------------------------------------------------------------------------*/
/* Add support for featured images
/*-----------------------------------------------------------------------------------*/
add_theme_support( 'post-thumbnails', array( 'post' ) );
set_post_thumbnail_size( 793, 360, true ); // Normal post thumbnails
add_image_size( 'category-thumbnail', 180, 180, true ); // Permalink thumbnail size



/*-----------------------------------------------------------------------------------*/
/* Register main menu for Wordpress use
/*-----------------------------------------------------------------------------------*/
register_nav_menus(
	array(
		'primary'	=>	__( 'Primary Menu', 'naked' ), // Register the Primary menu
		// Copy and paste the line above right here if you want to make another menu,
		// just change the 'primary' to another name
	)
);

/*-----------------------------------------------------------------------------------*/
/* Activate sidebar for Wordpress use
/*-----------------------------------------------------------------------------------*/
function naked_register_sidebars() {
	// Barra lateral
	register_sidebar(array(				// Start a series of sidebars to register
		'id' => 'sidebar', 					// Make an ID
		'name' => 'Sidebar',				// Name it
		'description' => 'Take it on the side...', // Dumb description for the admin side
		'before_widget' => '<div>',	// What to display before each widget
		'after_widget' => '</div>',	// What to display following each widget
		'before_title' => '<h3 class="side-title">',	// What to display before each widget's title
		'after_title' => '</h3>',		// What to display following each widget's title
		'empty_title'=> '',					// What to display in the case of no title defined for a widget
		// Copy and paste the lines above right here if you want to make another sidebar,
		// just change the values of id and name to another word/name
	));

	// Rodapé 1
	register_sidebar(array(				// Start a series of sidebars to register
		'id' => 'footer-one', 					// Make an ID
		'name' => 'Rodapé 1',				// Name it
		'description' => 'Rodape#1', // Dumb description for the admin side
		'before_widget' => '<div>',	// What to display before each widget
		'after_widget' => '</div>',	// What to display following each widget
		'before_title' => '<h4 class="footer-title">',	// What to display before each widget's title
		'after_title' => '</h4>',		// What to display following each widget's title
		'empty_title'=> '',					// What to display in the case of no title defined for a widget
		// Copy and paste the lines above right here if you want to make another sidebar,
		// just change the values of id and name to another word/name
	));

	// Rodapé 2
	register_sidebar(array(				// Start a series of sidebars to register
		'id' => 'footer-two', 					// Make an ID
		'name' => 'Rodapé 2',				// Name it
		'description' => 'Rodape#2', // Dumb description for the admin side
		'before_widget' => '<div>',	// What to display before each widget
		'after_widget' => '</div>',	// What to display following each widget
		'before_title' => '<h4 class="footer-title">',	// What to display before each widget's title
		'after_title' => '</h4>',		// What to display following each widget's title
		'empty_title'=> '',					// What to display in the case of no title defined for a widget
		// Copy and paste the lines above right here if you want to make another sidebar,
		// just change the values of id and name to another word/name
	));

	// Rodapé 3
	register_sidebar(array(				// Start a series of sidebars to register
		'id' => 'footer-three', 					// Make an ID
		'name' => 'Rodapé 3',				// Name it
		'description' => 'Rodape#3', // Dumb description for the admin side
		'before_widget' => '<div>',	// What to display before each widget
		'after_widget' => '</div>',	// What to display following each widget
		'before_title' => '<h4 class="footer-title">',	// What to display before each widget's title
		'after_title' => '</h4>',		// What to display following each widget's title
		'empty_title'=> '',					// What to display in the case of no title defined for a widget
		// Copy and paste the lines above right here if you want to make another sidebar,
		// just change the values of id and name to another word/name
	));
  
	// Abaixo do rodapé
	register_sidebar(array(				// Start a series of sidebars to register
		'id' => 'footer-util', 					// Make an ID
		'name' => 'Abaixo do rodapé',				// Name it
		'description' => 'Abaixo do rodapé', // Dumb description for the admin side
		'before_widget' => '',	// What to display before each widget
		'after_widget' => '',	// What to display following each widget
		'before_title' => '',	// What to display before each widget's title
		'after_title' => '',		// What to display following each widget's title
		'empty_title'=> '',					// What to display in the case of no title defined for a widget
		// Copy and paste the lines above right here if you want to make another sidebar,
		// just change the values of id and name to another word/name
	));
}
// adding sidebars to Wordpress (these are created in functions.php)
add_action( 'widgets_init', 'naked_register_sidebars' );

/*-----------------------------------------------------------------------------------*/
/* Enqueue Styles and Scripts
/*-----------------------------------------------------------------------------------*/

function naked_scripts()  {

	// get the theme directory style.css and link to it in the header
	wp_enqueue_style( 'naked-style', get_template_directory_uri() . '/style.css', '10000', 'all' );

	// add theme scripts
	wp_enqueue_script( 'naked', get_template_directory_uri() . '/js/app.js', array(), NAKED_VERSION, true );

}
add_action( 'wp_enqueue_scripts', 'naked_scripts' ); // Register this fxn and allow Wordpress to call it automatcally in the header


$args = array(
	'flex-width'    => false, //Largura do cabeçalho flexivel
	'width'         => 350, //Largura do cabeçalho
	'flex-height'   => false, //Altura do cabeçalho flexivel
	'height'        => 190, //Altura do cabeçalho
	'default-text-color'     => '', //Cor do texto no cabeçalho
	'header-text'   => false, //Permitir texto no cabeçalho
	'default-image' => get_template_directory_uri() . '/images/header.png', //Imagem default do cabeçalho
);
add_theme_support( 'custom-header', $args );

// The function to group all the widget areas //
function create_widgets_init() {
// The custom widget //
register_sidebars( 1,
array(
'name' => 'Head column',
'id' => 'head-column',
'description' => __('The header widget area, used for placing your custom widgets.'),
'before_widget' => '<div id="%1$s" class="widget %2$s">',
'after_widget' => '</div>',
'before_title' => '<h3 class="widgettitle">',
'after_title' => '</h3>')
);
}
 
// ACTIVATE THE WIDGET(S) //
add_action( 'widgets_init', 'create_widgets_init' );

if ( function_exists('register_sidebar') )
	register_sidebar(array(
	'name' => 'sidebar',
	'before_widget' => '<div class="sidebar-box">',
	'after_widget' => '</div>',
	'before_title' => '<h2>',
	'after_title' => '</h2>',
));


//MASCARAS
add_action('wp_enqueue_scripts', 'wpmidia_enqueue_masked_input');
function wpmidia_enqueue_masked_input(){
 
     wp_enqueue_script('masked-input', get_template_directory_uri().'/js/jquery.maskedinput.min.js', array('jquery'));
 
}

add_action('header-fortaleza', 'wpmidia_activate_masked_input');

function wpmidia_activate_masked_input(){
   
?>

         <script type="text/javascript">

                jQuery( function($){

                     $(".data").mask("99/99/9999");
                     $(".tel").mask("(99) 9999-9999");
                     $(".cel").mask("(99) 99999-9999");
                     $(".cpf").mask("999.999.999-99");
                     $(".cnpj").mask("99.999.999/9999-99");

                });

         </script>

<?php 
  }

// Função para adicionar nosso script
function javascript_do_ajax() {
    
    // Define a variável ajaxurl
    $script  = '<script>';
    $script .= 'var ajaxurl = "' . admin_url('admin-ajax.php') . '";';
    $script .= '</script>';
    echo $script;
		    
    // Nosso ajax (js/nosso-ajax.js)
    wp_enqueue_script(
        'nosso-ajax', 
        get_template_directory_uri() . '/js/nosso-ajax.js', 
        array('jquery'), 
        '0.0.1',
        true
    );
    
}
// Adiciona no rodapé
add_action( 'wp_footer', 'javascript_do_ajax' );

