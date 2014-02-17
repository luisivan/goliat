$('.jumbotron a').each(function(i, el) {
	$(el).attr('href', 'lista.html#'+encodeURIComponent($('h1.center').text())+'#'+encodeURIComponent($(el).text()))
})