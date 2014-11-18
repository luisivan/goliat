function RenderSearch(search) {

  var spreadsheet = 'https://docs.google.com/spreadsheet/ccc?key=0AnL3gPgElyMKdEdVT1pKR0thR1J5X0RLWHVxR1JaTGc#gid=0',
      template = Handlebars.compile($('#video-template').html())

  $('ul.thumbnails').sheetrock({
    url: spreadsheet,
    //sql: "select C,D,E,F,H,G where I=0 and H like '"+search+"'",
    sql: 'select D,E,F,G,H where H contains "'+search+'"',
    headersOff: true,
    rowHandler: template,
    userCallback: function () {
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

function BindSearch() {
  $('#search').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which)
    if (keycode == '13') {
      page('/buscar/'+$('#search').val())
    }
  })
}

BindSearch()