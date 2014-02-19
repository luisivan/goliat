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
	  chunkSize: 5,
	  headersOff: true,
	  rowHandler: template,
	  userCallback: function () {
	  	$('a.thumbnail').each(function(i, el) {
	  		console.log('najaua')
	  		var video_id = $(el).data('link').split('v=')[1].split('&')[0]

			$(el).attr('href', 'video.html#'+video_id)
		  	$(el).find('img').attr('src', 'http://img.youtube.com/vi/'+video_id+'/mqdefault.jpg')
	  	})
	  }
	})
}