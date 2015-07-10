<?php
	/*-----------------------------------------------------------------------------------*/
	/* This template will be called by all other template files to finish
	/* rendering the page and display the footer area/content
	/*-----------------------------------------------------------------------------------*/
?>

</div><!-- / end page container, begun in the header -->

<footer class="site-footer" role="contentinfo">
	<div class="site-info container">
		<div class="grid">
			<div class="col-large-4 col-small-4">
				<?php dynamic_sidebar( 'footer-one' ); ?>
			</div>
			<div class="col-large-4 col-small-4">
				<?php dynamic_sidebar( 'footer-two' ); ?>
			</div>
			<div class="col-large-4 col-small-4">
				<?php dynamic_sidebar( 'footer-three' ); ?>
			</div>
		</div>
	</div><!-- .site-info -->

	<div class="copyright">
		<p>SL91 - Todos os direitos reservados 2015.</p>
	</div>

</footer><!-- #colophon .site-footer -->

</div><!-- .wrap -->


<?php wp_footer();
// This fxn allows plugins to insert themselves/scripts/css/files (right here) into the footer of your website.
// Removing this fxn call will disable all kinds of plugins.
// Move it if you like, but keep it around.
?>

<?php
	// Detecta se a url atual é de desenvolvimento e insere o script do livereload
	$current_url = $_SERVER['REQUEST_URI'];
	$my_regex = preg_match("/[www]\b/", $current_url, $output_array);
	if(!$my_regex) {
		echo	'<script src="//localhost:35729/livereload.js"></script>';
	}
?>

<?php dynamic_sidebar( 'footer-util' );
  // Posição do widget para o modal de seleção
  // de cidade...
?>

</body>
</html>
