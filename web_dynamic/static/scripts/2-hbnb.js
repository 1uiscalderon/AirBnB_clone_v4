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
    
    $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    },
    );
});