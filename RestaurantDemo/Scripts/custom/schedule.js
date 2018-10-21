
function findSchedule() {

    var id = $('#ddlDay').val();

    $.ajax({
        url: '/api/Schedule/' + id,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var result = data;
            $('#txtOpeningHour').val(result[0].OpeningTime);
            $('#txtClosingHour').val(result[0].ClosingTime);
        },
        failure: function (data) {
            alert(data.responseText);
        }, //End of AJAX failure function  
        error: function (data) {
            alert(data.responseText);
        } //End of AJAX error function
    });
}

function checkSchedule() {

    var id = $('#ddlDayCheck').val();
    var time = $('#ddlTime').val();

    $.ajax({
        url: '/api/Schedule/CheckSchedule?id='+id+'&time='+time,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var result = data;
            $('#txtIsOpen').val('');
            var isOpen = "No";
            if (result == null) {               
                $('#txtIsOpen').val(isOpen);
            } else {
                isOpen = "Yes";
                $('#txtIsOpen').val(isOpen);
            }
        },
        failure: function (data) {
            alert(data.responseText);
        }, //End of AJAX failure function  
        error: function (data) {
            alert(data.responseText);
        } //End of AJAX error function
    });
}