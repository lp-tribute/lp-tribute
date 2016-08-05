var jsonUrl = 'https://api.myjson.com/bins/32ou3';

$(document).ready(function() {

  var path = document.getElementById('path');
  var length = path.getTotalLength();
  console.log(length);

  $("#path").bind('oanimationend animationend webkitAnimationEnd', function() {
    $('#welcome_h1').addClass('animated fadeInUp');
  });

  if ($('.json_table').children().length < 1)
  // Load JSON from external server
    $.getJSON(jsonUrl, function(data) {
    // Save JSON Object to variable
    if (data !== null) {
      music_db = data;
      createTable(data);
    } else {
      alert('Failed to load remote JSON!');
    }
  });

});

function createTable(data) {
  var albums = "";

  $.each(data.alben, function(key, value) {
    var tracks = "";
    var trackcount = value.tracks.length;

    // Go trought each song
    $.each(value.tracks, function(key, value1) {

      // If tracks arent empty, start new table row
      if (tracks !== "")
        tracks += "<tr>";

      tracks += '<td>0' + (key + 1) + " : " + value1.titel_track + " > " + value1.laenge + "</td></tr>";
    });

    if (albums !== "")
      albums += "<tr>";

    albums += '<td rowspan="' + trackcount + '"><img class="album_cover" src="' + value.cover + '"/><b>' + value.titel_album + "</b><br>Genre: " + value.genre + "<br>Jahr: " + value.jahr + "</td>" + tracks;
  });

  $('.json_table').append("<table id=\"table_json\"><tr><th>Alben</th><th>Titel</th></tr>" + albums + "</table>");

}
