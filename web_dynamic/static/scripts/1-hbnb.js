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
});
