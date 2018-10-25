var table1 = new Array();
var categoryList = new Array();

$(function () {

    LoadCategoryInfo();
    LoadProductInfo();

    $('#btnSubmit').click(function () {
        if (Validate()) {
            var data1 = new Object();
            data1.CategoryId = $('#ddlCategory').val();
            data1.ProductName = $('#txtProductName').val();
            data1.ProductPrice = $('#txtProductPrice').val();
            data1.ProductDescription = $('#txtProductDescription').val();

            if ($('#txtProductId').val() === '') {
                data1.ProductId = -1;

                $.ajax({
                    type: "POST",
                    url: '/api/Products',
                    data: JSON.stringify(data1),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var result = data;

                        if (result.ProductId > 0) {
                            $('#txtProductId').val(result.ProductId);
                            $("#btnSubmit").attr("disabled", true);

                            alert("Data submit successfully");

                            //Empty input fields after submitting.
                            ClearAll();
                        }
                        else {
                            alert("Internal server error..");
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

            else {

                data1.ProductId = $('#txtProductId').val();

                $.ajax({
                    type: "PUT",
                    url: '/api/Products/' + data1.ProductId,
                    data: JSON.stringify(data1),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var result = data;

                        if (result.ProductId > 0) {
                            $('#txtProductId').val(result.ProductId);
                            $("#btnSubmit").attr("disabled", true);

                            alert("Data update successfully");

                            ClearAll();
                        }
                        else {
                            alert("Internal server error..");
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
        }
    });
});

function LoadCategoryInfo() {

    $.ajax({
        url: '/api/Products/GetCategories',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            categoryList = data;
            if (categoryList.length > 0) {

                $("#ddlCategoryOuter").html("");

                // Categories are loaded in dropdown
                $('#ddlCategoryOuter').html("<select id='ddlCategory' class='form-control'></select> <br />");
                var html = '<option value="-1">Select a Category</option>';
                for (var i = 0; i < categoryList.length; i++) {
                    html += "<option value=" + categoryList[i].CategoryId + ">" + categoryList[i].CategoryName + "</option>";
                }
                $('#ddlCategory').html(html);
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

function LoadProductInfo() {

    $.ajax({
        url: '/api/Products/GetProductsList',
        type: 'GET',
        success: function (data) {
            var result = data;
            if (result.length > 0) {
                BindProductInfo(result);
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

function BindProductInfo(list) {

    table1 = "<table class='table table-striped' id='tblProduct'>" +
        "<thead>" +
        "<tr>" +
        "<th>ID</th>" +
        "<th>Category</th>" +
        "<th>Name</th>" +
        "<th>Price</th>" +
        "<th>Description</th>" +
        "<th>Option</th>" +
        "</tr>" +
        "</thead>";

    $('#productInfo').html(table1)

    for (var i = 0; i < list.length; i++) {
        $("#tblProduct").append('<tr>' +
            '<td>' + list[i].ProductId + '</td>' +
            '<td style="display:none">' + list[i].CategoryId + '</td>' +
            '<td>' + list[i].CategoryName + '</td>' +
            '<td>' + list[i].ProductName + '</td>' +
            '<td>' + list[i].ProductPrice + '</td>' +
            '<td>' + list[i].ProductDescription + '</td>' +
            '<td>' + '<button type="button" class="btn btn-success" onclick="EditProductInfo(' + list[i].ProductId + ')" style="margin: 10px;">Edit</button>&nbsp;' +
            '<button type = "button" class= "btn btn-danger" onclick = "DeleteProductInfo(' + list[i].ProductId + ')"> Delete</button>' +
            '</td>' +
            '</tr>');
    }
}

function EditProductInfo(selectedId) {

    $.ajax({
        url: '/api/Products/' + selectedId,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var result = data;
            $('#txtProductId').val(result[0].ProductId);
            $('#txtProductName').val(result[0].ProductName);
            $('#txtProductPrice').val(result[0].ProductPrice);
            $('#txtProductDescription').val(result[0].ProductDescription);

            EditCategories(result[0].CategoryId);
            $("#btnSave").removeAttr("disabled");
        },
        failure: function (data) {
            alert(data.responseText);
        }, //End of AJAX failure function  
        error: function (data) {
            alert(data.responseText);
        } //End of AJAX error function
    });
}

function EditCategories(id) {

    $("#ddlCategoryOuter").html("");
    $('#ddlCategoryOuter').html("<select id='ddlCategory' class='form-control'></select> <br />");
    var html = '<option value="-1">Select a Category</option>';
    for (var i = 0; i < categoryList.length; i++) {
        if (categoryList[i].CategoryId === id) {
            html += "<option value=" + categoryList[i].CategoryId + " selected='selected'>" + categoryList[i].CategoryName + "</option>";
        } else {
            html += "<option value=" + categoryList[i].CategoryId + ">" + categoryList[i].CategoryName + "</option>";
        }
    }
    $('#ddlCategory').html(html);
}

function DeleteProductInfo(id) {
    $.ajax({
        url: '/api/Products/' + id,
        type: 'DELETE',
        success: function (data) {
            alert("Data remove successfully");
            ClearAll();
        },
        failure: function (data) {
            alert(data.responseText);
        }, //End of AJAX failure function  
        error: function (data) {
            alert(data.responseText);
        } //End of AJAX error function
    });
}


function Validate() {

    if ($('#txtProductName').val() === '') {
        alert("Name is required.", "Incomplete");
        return false;
    }
    if ($('#txtProductPrice').val() === '') {
        alert("Price is required.", "Incomplete");
        return false;
    }

    return true;
}

function ClearAll() {

    $("#btnSubmit").removeAttr("disabled");
    $('#txtProductId').val('');
    $('#txtProductName').val('');
    $('#txtProductPrice').val('');
    $('#txtProductDescription').val('');

    categoryList = [];
    table1 = [];
    LoadCategoryInfo();
    LoadProductInfo();
}