
<?php
/**
 * template Name: category-Fortaleza
 *
 */

get_header('teste'); // This fxn gets the header.php file and renders it ?>
       
	<div id="primary" class="row-fluid">
		<div id="content" role="main" class="span8">

			<?php if ( have_posts() ) :
			// Do we have any posts in the databse that match our query?
			// In the case of the home page, this will call for the most recent posts
			?>

				<?php while ( have_posts() ) : the_post();
				// If we have some posts to show, start a loop that will display each one the same way
				?>

					<article class="post grid">

						<picture class="category-thumb col-small-4 col-large-3">
							<a href="<?php the_permalink(); // Get the link to this post ?>" title="<?php the_title(); ?>">
								<?php the_post_thumbnail( 'category-thumbnail' ); ?>
							</a>
						</picture>

						<div class="col-small-4 col-large-9">
							<h1 class="title">
								<a href="<?php the_permalink(); // Get the link to this post ?>" title="<?php the_title(); ?>">
									<?php the_title(); // Show the title of the posts as a link ?>
								</a>
							</h1>

							<div class="post-meta">
								<?php the_time('dMY'); // Display the time published ?>
							</div><!--/post-meta -->

							<div class="the-content">

								<?php the_excerpt(); ?>

								<a href="<?php echo get_permalink(); ?>">Leia mais..</a>

								<?php wp_link_pages(); // This will display pagination links, if applicable to the post ?>
							</div><!-- the-content -->

							<div class="meta clearfix">
								<div class="tags"><?php echo get_the_tag_list( '| &nbsp;', '&nbsp;' ); // Display the tags this post has, as links separated by spaces and pipes ?></div>
							</div><!-- Meta -->
						</div>

					</article>

				<?php endwhile; // OK, let's stop the posts loop once we've exhausted our query/number of posts ?>

				<!-- pagintation -->
				<div id="pagination" class="clearfix">
					<div class="past-page"><?php previous_posts_link( 'Anterior' ); // Display a link to  newer posts, if there are any, with the text 'newer' ?></div>
					<div class="next-page"><?php next_posts_link( 'Próximo' ); // Display a link to  older posts, if there are any, with the text 'older' ?></div>
				</div><!-- pagination -->


			<?php else : // Well, if there are no posts to display and loop through, let's apologize to the reader (also your 404 error) ?>

				<article class="post error">
					<h1 class="404">Página não encontrada...</h1>
				</article>

			<?php endif; // OK, I think that takes care of both scenarios (having posts or not having any posts) ?>
		</div><!-- #content .site-content -->


			

				<article class="post error">
					<h1 class="404">Nothing posted yet</h1>
				</article>

			

		</div><!-- #content .site-content -->

		
	</div><!-- #primary .content-area -->
<?php get_footer(); // This fxn gets the footer.php file and renders it ?>
