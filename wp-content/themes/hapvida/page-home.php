<?php
/**
 * 	Template Name: Sidebar/Home Page
 *
 *	This page template has a sidebar built into it,
 * 	and can be used as a home page, in which case the title will not show up.
 *
*/?>



<?php get_header(); // This fxn gets the header.php file and renders it ?>

	<div id="primary" class="row-fluid">
		<div id="content" role="main" class="span8">
			<?php if ( have_posts() ) :
			// Do we have any posts/pages in the databse that match our query?
			?>

				<?php while ( have_posts() ) : the_post();
				// If we have a page to show, start a loop that will display it
				?>

					<article class="post">

						<?php if (!is_front_page()) : // Only if this page is NOT being used as a home page, display the title ?>
							<h1 class='title'>
								<?php the_title(); // Display the page title ?>
							</h1>
						<?php endif; ?>

						<div class="the-content">
							<?php the_content();
							// This call the main content of the page, the stuff in the main text box while composing.
							// This will wrap everything in paragraph tags
							?>

							<?php wp_link_pages(); // This will display pagination links, if applicable to the page ?>
						</div><!-- the-content -->

					</article>

				<?php endwhile; // OK, let's stop the page loop once we've displayed it ?>

			<?php else : // Well, if there are no posts to display and loop through, let's apologize to the reader (also your 404 error) ?>

				<article class="post error">
					<h1 class="404">Nothing has been posted like that yet</h1>
				</article>

			<?php endif; // OK, I think that takes care of both scenarios (having a page or not having a page to show) ?>
		</div><!-- #content .site-content -->
		
	</div><!-- #primary .content-area -->
<?php get_footer(); // This fxn gets the footer.php file and renders it ?>
<div class="selector-overlay" id="select-city">
  <div class="selector-content">
    <img src="http://hapvidaplanosdesaude.com.br/wp-content/themes/hapvida/img/logo-hapvida.png"  alt="Hapvida Saúde" style="width: 125px;">
    
    <div class="selector-titles">
      <h3>BEM VINDO AO HAPVIDA!</h3>
      <h4>ESCOLHA SUA CIDADE</h4>
    </div>
    
    <ul class="selector-cities">
      <li><a href="http://hapvidaplanosdesaude.com.br/fortaleza">Fortaleza</a></li>
      <li><a href="http://hapvidaplanosdesaude.com.br/salvador">Salvador</a></li>
    </ul>
    
    <div class="selector-client">
      <h3>JÁ É CLIENTE HAPVIDA?</h3>
      <p><a href="http://www.hapvida.com.br/">CLIQUE AQUI.</a></p>
    </div>
  </div>
</div>