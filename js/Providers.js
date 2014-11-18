var Providers = {
	youtube: {},
	vimeo: {} 
}

Providers.getId = function(url) {
	if (url.indexOf('youtube.com') !== -1)
		return 'Y'+url.split('v=')[1].split('&')[0]
	else
		return 'V'+url.split('/').pop()
}

Providers.getEmbedUrl = function(id) {
	if (id.indexOf('Y') == 0)
		return 'http://www.youtube.com/embed/'+id.slice(1)
	else
		return 'http://player.vimeo.com/video/'+id.slice(1)
}

Providers.getThumb = function(url, cb) {
	if (url.indexOf('youtube.com') !== -1)
		Providers.youtube.getThumb(url, cb)
	else
		Providers.vimeo.getThumb(url, cb)
}

Providers.youtube.getThumb = function(url, cb) {
	var video_id = url.split('v=')[1].split('&')[0]

	if ($(window).width() > 640)
		cb('http://img.youtube.com/vi/'+video_id+'/mqdefault.jpg')
	else
		cb('http://img.youtube.com/vi/'+video_id+'/default.jpg')
}

Providers.vimeo.getThumb = function(url, cb) {
	var video_id = url.split('/').pop()

	$.ajax({
        type:'GET',
        url: 'http://vimeo.com/api/v2/video/' + video_id + '.json',
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function(data){
        	var thumbnail_src
        	if ($(window).width() > 640)
            	thumbnail_src = data[0].thumbnail_medium
            else
            	thumbnail_src = data[0].thumbnail_small
            cb(thumbnail_src)
        }
    })
}