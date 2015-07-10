<?php
	/*-----------------------------------------------------------------------------------*/
	/* This template will be called by all other template files to begin
	/* rendering the page and display the header/nav
	/*-----------------------------------------------------------------------------------*/
?>
<!DOCTYPE html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>
	<?php bloginfo('name'); // show the blog name, from settings ?> |
	<?php is_front_page() ? bloginfo('description') : wp_title(''); // if we're on the home page, show the description, from the site's settings - otherwise, show the title of the post or page ?>
</title>

<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<?php // We are loading our theme directory style.css by queuing scripts in our functions.php file,
	// so if you want to load other stylesheets,
	// I would load them with an @import call in your style.css
?>

<script src="<?php echo get_template_directory_uri(); ?>/js/modernizr.js" type="text/javascript"></script>
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/jquery.mask.min.js"></script>
<script>
		$(document).ready(function(){
			$('.cpf').mask('000.000.000-00', {reverse: true});
			$('.phone_with_ddd').mask('(00) 00000-0000');
			$('.telefone').mask('(00) 0000-0000');
		});
	</script>

	<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>


<?php wp_head();
// This fxn allows plugins, and Wordpress itself, to insert themselves/scripts/css/files
// (right here) into the head of your website.
// Removing this fxn call will disable all kinds of plugins and Wordpress default insertions.
// Move it if you like, but I would keep it around.
?>

<!--[if lt IE 9]><link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/ie.css"><![endif]-->


<body
	<?php body_class();
	// This will display a class specific to whatever is being loaded by Wordpress
	// i.e. on a home page, it will return [class="home"]
	// on a single post, it will return [class="single postid-{ID}"]
	// and the list goes on. Look it up if you want more.
	?>
>

<div class="wrap" id="wrap">

<header id="masthead" class="site-header" role="banner">

	<div class="container">

		<!-- Logos -->
		<div id="brand" class="brands">
			<!-- Logo Hapvida -->
			<div class="logo-hapvida">
				<a href="<?php echo esc_url( home_url( '/' ) ); // Link to the home page ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); // Title it with the blog name ?>" rel="home">
					<img src="<?php echo get_template_directory_uri(); ?>/img/logo-hapvida.png" alt="Hapvida Saúde" style="width: 125px;">
				</a>
			</div>

			<!-- Logo SL91 -->
			<div class="logo-sl91">
				<p>
					REPRESENTANTE<br>
					AUTORIZADO
				</p>
				<img src="<?php echo get_template_directory_uri(); ?>/img/logo-sl91.png" alt="Representante autorizado - SL91 Conceito em vendas" style="width: 102px;">
			</div>

		</div>

		<!-- Seletor de cidade -->
		<div class="city-selector">
			<span class="city-selected">
				Fortaleza/ Salvador
			</span>
			<a class="city-selection" id="city-selector" href="http://planosdesaudedefortaleza.com.br">
				Alterar localidade
			</a>
		</div>

		<!-- Call to Action -->
		<div class="header-cta">
			<p>
				SOLICITE AGORA<br>
				<span>SEU PLANO DE SAÚDE</span>
			</p>
			<a class="btn btn--large icon-phone" href="tel:8532439000" title="SOLICITE AGORA SEU PLANO DE SAÚDE">
				3243.3000
			</a>
		</div>

	</div>
	<?php if ( !function_exists('dynamic_sidebar')
|| !dynamic_sidebar('head-column') ) : ?>
 
<?php endif; ?>

	<!-- Menu -->
	<nav role="navigation" class="nav nav--main" id="nav-main">
		<!-- Ícone do menu mobile -->
		<div class="icon-menu" id="menu-button">
			<div class="icon-menu-top"></div>
			<div class="icon-menu-middle"></div>
			<div class="icon-menu-bottom"></div>
		</div>

		<div class="nav-wrap">
			<div class="container">
				<?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); // Display the user-defined menu in Appearance > Menus ?>
			</div>
		</div>
	</nav>



</header><!-- #masthead .site-header -->

<div class="content-wrap container"><!-- start the page containter -->
