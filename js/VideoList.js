function RenderVideoList(course, subject) {

	$('h1.center').text(subject+' - '+course)

	var lostemas = Subjects[course][subject]

	var temasTmpl = Handlebars.compile($('#temas-template').html())
	$('#accordion').html(temasTmpl({temas: lostemas}))

	var spreadsheet = 'https://docs.google.com/spreadsheet/ccc?key=0AnL3gPgElyMKdEdVT1pKR0thR1J5X0RLWHVxR1JaTGc#gid=0',
		template = Handlebars.compile($('#video-template').html())

	for (var i=0; i<lostemas.length; i++) {
		var tema = lostemas[i]

		$('#collapse'+i+' ul.thumbnails').sheetrock({
		  url: spreadsheet,
		  sql: "select D,E,F,H,G where I=0 and E='"+course+"' and F='"+subject+"' and G='"+tema+"'",
		  //chunkSize: 5,
		  headersOff: true,
		  rowHandler: template,
		  callback: function () {
		  	$('a.thumbnail').each(function(i, el) {
		  		var url = $(el).data('link')

		  		$(el).attr('href', 'video/'+Providers.getId(url))

		  		Providers.getThumb(url, function(thumb) {
				  	$(el).find('img').attr('src', thumb)
		  		})
		  	})
		  }
		})
	}
}
