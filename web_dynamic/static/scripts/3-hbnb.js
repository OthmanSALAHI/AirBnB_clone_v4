$(document).ready(() => {
    const checkedAmenities = {};
    $(document).on('change', "input[type='checkbox']", function () {
        if (this.checked) {
            checkedAmenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete checkedAmenities[$(this).data('id')];
        }
        const check = Object.values(checkedAmenities);
        if (check.length > 0) {
            $('div.amenities > h4').text(check.join(', '));
        } else {
            $('div.amenities > h4').html('&nbsp;');
        }
    });
    $.get('http://localhost:5001/api/v1/status', function (data) {
        console.log(data);
        if (data.status == 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
    $.ajax({
        url: 'http://localhost:5001/api/v1/places_search',
        type: 'POST',
        data: '{}',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                const place = data[i];
                html_inner = '<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>';
                $('.places ').append(html_inner);
            }
        }
    });
});
