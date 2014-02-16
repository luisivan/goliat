var id = window.location.hash.replace('#', '')
$('#video').attr('src', 'http://www.youtube.com/embed/'+id)

var spreadsheet = 'https://docs.google.com/spreadsheet/ccc?key=0AnL3gPgElyMKdEdVT1pKR0thR1J5X0RLWHVxR1JaTGc#gid=0',
	template = Handlebars.compile($('#title-template').html())


$('.col-md-3').sheetrock({
  url: spreadsheet,
  sql: "select H where D contains '"+id+"'",
  chunkSize: 5,
  headersOff: true,
  rowHandler: template
})