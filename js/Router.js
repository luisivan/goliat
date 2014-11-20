var Router = {
	routes: {
		'/': 'landing',
		'/videos/bach1': 'bach1',
		'/videos/bach2': 'bach2',
		'/videos/:course/:subject': 'subject',
		'/video/:id': 'video',
		'/buscar/:query': 'search',
		'/enviar': 'send',
		'/thx': 'thx',
		'*': 'error'
	}
}

Router.init = function() {
	for (var route in Router.routes) {
		var controller = Router.routes[route]
		page(route, Router.methods[controller].bind(this))
	}
	page({hashbang: true})
}

Router.methods = {
	landing: function() {
		Templates.render('landing', null, function() {
			$('#help').show()
			resize()
		})
	},
	bach1: function() {
		Templates.render('bach1', null, RenderSubjectLinks)
	},
	bach2: function() {
		Templates.render('bach2', null, RenderSubjectLinks)
	},
	subject: function(req) {
		var course = decodeURIComponent(req.pathname.split('/')[2]),
			subject = decodeURIComponent(req.pathname.split('/')[3])

		console.log(course)
		console.log(subject)
		Templates.render('subject', {}, function() {
			RenderVideoList(course, subject)
		})
	},
	video: function(req) {
		var id = req.pathname.split('/')[2]
		Templates.render('video', {video: {src: Providers.getEmbedUrl(id)}}, function() {
			RenderVideo(id)
		})
	},
	search: function(req) {
		var query = req.pathname.split('/')[2]
		Templates.render('search', {query: query}, function() {
			RenderSearch(query)
		})
	},
	send: function() {
		Templates.render('send', null, function() {
			$('#help').show()
		})
	},
	thx: function() {
		Templates.render('thx', null, function() {
			$('#help').show()
		})
	},
	error: function() {}
}

Router.init()