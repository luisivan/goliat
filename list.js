$('.jumbotron a').each(function(i, el) {
	$(el).attr('href', 'lista.html#'+$('h1.center').text()+'#'+$(el).text())
})