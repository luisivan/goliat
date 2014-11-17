var curso = decodeURIComponent(window.location.hash.split('#')[1]),
	subject = decodeURIComponent(window.location.hash.split('#')[2])

$('h1.center').text(subject+' - '+curso)

var lostemas = temas[curso][subject]

var temasTmpl = Handlebars.compile($('#temas-template').html())
$('#accordion').html(temasTmpl({temas: lostemas}))

var spreadsheet = 'https://docs.google.com/spreadsheet/ccc?key=0AnL3gPgElyMKdEdVT1pKR0thR1J5X0RLWHVxR1JaTGc#gid=0',
	template = Handlebars.compile($('#video-template').html())

for (var i=0; i<lostemas.length; i++) {
	var tema = lostemas[i]

	$('#collapse'+i+' ul.thumbnails').sheetrock({
	  url: spreadsheet,
	  sql: "select C,D,E,F,H,G where I=0 and E='"+curso+"' and F='"+subject+"' and G='"+tema+"'",
	  //chunkSize: 5,
	  headersOff: true,
	  rowHandler: template,
	  userCallback: function () {
	  	$('a.thumbnail').each(function(i, el) {
	  		var url = $(el).data('link')

	  		$(el).attr('href', 'video.html#'+Providers.getId(url))

	  		Providers.getThumb(url, function(thumb) {
	  			console.log(thumb)
			  	$(el).find('img').attr('src', thumb)
	  		})
	  	})
	  }
	})
}
