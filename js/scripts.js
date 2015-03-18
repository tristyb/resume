/*
 * OneWeb v3.0
 * Author: Seth Warburton
 * Copyright: Seth Warburton - (C) 2013 - All rights reserved
 * Licenses: GNU/GPL v3 or later http://www.gnu.org/licenses/gpl-3.0.html
 *           DBAD License http://philsturgeon.co.uk/code/dbad-license
 * Date: 30 April 2013
 */

// Append some styling hooks related to device capabilities to html and body elements
// Got js?
jQuery("html").removeClass("no-js").addClass("js-enabled");

jQuery(document).ready(function(){

	// Touch? Screen type?
	jQuery().deviceHooks();

// Scroll to top
    jQuery(function () {
    var scrollDiv = document.createElement("a");
    jQuery(scrollDiv).attr("class", "to-top").appendTo("body").attr("title", "Click here to head back to the top").text("^");
jQuery(".to-top").fadeOut();
    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() !== 0) {
          jQuery(".to-top").fadeIn();
        } else {
          jQuery(".to-top").fadeOut();
        }
      });
      jQuery(".to-top").click(function () {
        jQuery("body,html").animate({
          scrollTop: 0
        },
       800);
      });
    });

 });
