//= require_tree .
//= require "jquery"

var defaultXScale = 1;
var defaultYScale = 0.2;
var increments = [0.3, 0.2, 0.1, 0.05];

function getYRatio(s) {
	// transform: size(1, 0.5) becomes "matrix(1, 0, 0, 0.5, 0, 0)"
	number = s.split("(")[1].split(",")[3].split(" ")[1]
	return parseFloat(number);
}

function reMarginAllSections() {
	var numSections = $("#content").find("section").length;
	var nextMargin = 0;
	$("#content").find("section").each(function (i) {
		$(this).css("margin-top", nextMargin);
		var sectionHeight = $(this).outerHeight();
		console.log("sectionHeight = " + sectionHeight);
		var transformValue = $(this).css('transform');
		// if transform is set
		if (transformValue != null) {
			// not the last element, so edit margin-top
			if (i < (numSections - 1)) {
				var factor = 1 - getYRatio(transformValue);
				var topMargin = Math.ceil(sectionHeight * factor) * -1;
				// set margin for next loop
				nextMargin = topMargin;
			}
			// last element, so edit margin-bottom
			else {
				console.log("last element");
			}
		}
	});
}

function scaleSection(section, x, y) {
	$(section).css("transform", "scale(" + x + ", " + y + ")");
}

function scaleDownAllSections(x, y) {
	x = typeof x !== 'undefined' ? x : 1;
	y = typeof y !== 'undefined' ? y : defaultYScale;
	$("#content").find("section").each(function (i) {
		$(this).css("transform", "scale(" + x + ", " + y + ")");
	});
	reMarginAllSections();
}

scaleDownAllSections(defaultXScale, defaultYScale);

$("section").click(function() {
	if ($(this).hasClass("open")) {
		scaleSection(this, defaultXScale, defaultYScale);
		scaleSection($(this).prev(), defaultXScale, defaultYScale);
		$(this).removeClass("open");
	}
	else {
		scaleSection(this, 1, 1);
		scaleSection($(this).prev(), 
			defaultXScale, defaultYScale + increments[0]);
		$(this).addClass("open");
	}
	
	reMarginAllSections();
});