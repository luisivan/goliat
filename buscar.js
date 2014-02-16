var search = window.location.hash.replace('#', '')

$('h1.center').text('Resultados de: '+search)

var spreadsheet = 'https://docs.google.com/spreadsheet/ccc?key=0AnL3gPgElyMKdEdVT1pKR0thR1J5X0RLWHVxR1JaTGc#gid=0',
	template = Handlebars.compile($('#video-template').html())


$('ul.thumbnails').sheetrock({
  url: spreadsheet,
  //sql: "select C,D,E,F,H,G where I=0 and H like '"+search+"'",
  sql: "select C,D,E,F,H,G where H contains '"+search+"'",
  chunkSize: 5,
  headersOff: true,
  rowHandler: template,
  userCallback: function () {
  	$('a.thumbnail').each(function(i, el) {
  		var video_id = $(el).data('link').split('v=')[1],
  			ampersandPosition = video_id.indexOf('&')
		if(ampersandPosition != -1)
		  video_id = video_id.substring(0, ampersandPosition)

		$(el).attr('href', 'video.html#'+video_id)
	  	$(el).find('img').attr('src', 'http://img.youtube.com/vi/'+video_id+'/mqdefault.jpg')
  	})
  }
})
