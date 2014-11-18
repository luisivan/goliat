function RenderSubjectLinks() {

	$('.jumbotron a').each(function(i, el) {
		$(el).attr('href', 'videos/'+encodeURIComponent($('h1.center').text())+'/'+encodeURIComponent($(el).text()))
	})
}