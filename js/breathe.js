( function( $ ) {
	$( document ).ready( function() {
		// Only do this once
		if ( $( 'body' ).hasClass( 'breathe-js-loaded' ) ) {
			return;
		}
		$( 'body' ).addClass( 'breathe-js-loaded' );

		$( '#secondary-toggle, #primary-modal' ).on( 'click', animateModals );
		$( 'body' ).on( 'closemodals', function( event ) {
			// only toggle (close) modals if modals are open
			if ( $( 'body' ).hasClass( 'responsive-show' ) ) {
				animateModals( event );
			}
		} );

		function animateModals( event ) {
			event.preventDefault();

			var $body = $( 'body' ),
			    $menu = $( '#secondary' ),
				transitionEnd = 'transitionend webkitTransitionEnd otransitionend MSTransitionEnd';

			// Start the animation when the toggle menu link is clicked
			$body.addClass( 'animating' );

			// Determine direction of animation
			if ( $body.hasClass( 'responsive-show' ) ) {
				$body.addClass( 'right' );
			} else {
				$body.addClass( 'left' );
			}

			// Set classes once animation is finished
			$menu.on( transitionEnd, function() {
				$body
					.removeClass( 'animating left right' )
					.toggleClass( 'responsive-show' );
				$menu.off( transitionEnd );
			} );
		}

		function moveWidgetsOutOfSidebar( ) {
			// if there is a .widget_o2-filter-widget on the screen
			// put a placeholder right after it in the sidebar so we can find it later
			// and then move the widget to the top of #content

			var filterWidget = $( '.widget_o2-filter-widget' ).first();

			if ( ( filterWidget.length ) && ( filterWidget.parents( '#secondary' ).length ) ) {
				filterWidget.after( "<div id='o2-filter-widget-placeholder'></div>" );
				filterWidget.find( '.widget-title' ).hide();
				filterWidget.prependTo( '#content' );
			}
		}

		function moveWidgetsIntoSidebar() {
			// if there is a .widget_o2-filter-widget and a placeholder on the screen
			// move the widget after the placeholder and then remove the placeholder

			var filterWidget = $( '.widget_o2-filter-widget' ).first();

			if ( ( filterWidget.length ) && ( 0 === filterWidget.parents( '#secondary' ).length ) ) {
				var filterWidgetPlaceholder = $( '#o2-filter-widget-placeholder' ).first();
				if ( filterWidgetPlaceholder.length ) {
					filterWidget.insertAfter( '#o2-filter-widget-placeholder' );
					filterWidget.find( '.widget-title' ).show();
					filterWidgetPlaceholder.remove();
				}
			}
		}

		function moveNavIntoSidebar() {
			var $menu = $( 'nav#site-navigation' );
			if ( ( $menu.length ) && ( $menu.parents( 'header#masthead' ).length ) ) {
				$menu.prependTo( '#secondary-content' );
				$menu.wrap( '<aside class="widget" id="o2-responsive-nav"></aside>' );
			}
		}

		function moveNavOutOfSidebar() {
			var $menu = $( 'nav#site-navigation' );
			if ( ( $menu.length ) && ( 0 === $menu.parents( 'header#masthead' ).length ) ) {
				$( 'nav#site-navigation' ).appendTo( 'header#masthead' );
				$( '#o2-responsive-nav' ).remove();
			}
		}

		if ( 'undefined' != typeof enquire ) {
			// "Tablet" max-width also defined in inc/scss/partials/ui/_responsive.scss
			enquire.register("screen and (max-width:876px)", {
				match: function() {
					moveNavIntoSidebar();
				},

				unmatch: function() {
					moveNavOutOfSidebar();
				}
			} );

			// "Phone" max-width also defined in inc/scss/partials/ui/_responsive.scss
			enquire.register("screen and (max-width:640px)", {
				match: function() {
					moveWidgetsOutOfSidebar();
				},

				unmatch: function() {
					moveWidgetsIntoSidebar();
				}
			} );

		}
	} );
} )( jQuery );
