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
        console.log(data)
        if (data.status == 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});
