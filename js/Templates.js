var Templates = {}

Templates.render = function(name, vars, cb) {
	$.get('views/' + name + '.hbs', function(hbs) {
		var fillTemplate = Handlebars.compile(hbs),
			html = fillTemplate(vars)

		$('.jumbotron .container').html(html)
		$('#help').hide()
		cb && cb.call(this)
	}.bind(this))
}