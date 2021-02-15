$(document).ready(function () {
  const dictResults = {};
  $('div.amenities .popover INPUT').change(function () {
    if ($(this).is(':checked')) {
      dictResults[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if (!$(this).is(':checked')) {
      delete dictResults[$(this).attr('data-name')];
    }
    const nameAmenities = Object.keys(dictResults);
    $('div.amenities h4').text(nameAmenities.join(', '));
  });

  $.get('http://localhost:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  }
  );
  $('button').click(function () {
    console.log(Object.keys(dictResults));
      $.ajax({
        type: 'POST',
        url: 'http://localhost:5001/api/v1/places_search/',
        data: JSON.stringify({amenities: Object.values(dictResults)}),
        contentType: 'application/json',
        success: function (response) {
          $('section.places').empty();
          for (const place of response) {
            $(`<article>
            <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
            </div>
            <div class="information">
            <div class="max_guest">${place.max_guest}Guest${place.max_guest !== 1 ? 's' : ''}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="description">${place.description}</div>
            </article>`).appendTo('section.places');
          }
        }
      });
  });
});
