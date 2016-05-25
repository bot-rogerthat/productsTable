$(document).ready(function () {

    initActions();

    //Создание продуктов и изменение таблицы
    var store = new Store();
    var prod = null;

    $("#add").click(createOrEditProduct);

    function createOrEditProduct() {
        var errorName = validationModule.checkName();
        var errorEmail = validationModule.checkEmail();
        var errorCount = validationModule.checkCount();
        var errorPrice = validationModule.checkPrice();
        if (!errorName && !errorEmail && !errorCount && !errorPrice) {
            var name = $("#name").val();
            var email = $("#email").val();
            var count = $("#count").val();
            var price = $("#price").val();
            if (prod == null) {
                var newProduct = new Product(store.id, name, email, count, price);
                store.add(newProduct);
                addTableRow(newProduct);
            } else {
                editTable(prod.id);
            }
            viewModule.closeModalForm();
        } else {
            validationModule.focusErrorField(errorName, errorEmail, errorCount, errorPrice);
        }
    }

    function addTableRow(product) {
        var $editButton = '<input type="button" value="Edit" class="editProduct">';
        var $deleteButton = '<input type="button" value="Delete" class="deleteProduct">';
        $("#productsTable tr:last")
            .after('<tr id="' + product.id + '"><td>' + '<a href="#' + product.id + '">' + 
                product.name + '</a>' +
                '<div class="productCount">' + product.count + '</div>' +
                '</td><td>' + 
                storeService.formatDollarAfter(storeService.formatNumber(product.price)) + 
                '</td><td class="trButtons">' +
                $editButton + $deleteButton + '</td></tr>');

            initRowButtonsAction();

        $('a[href="#' + product.id + '"]').click(function (e) {
            e.preventDefault();
            viewModule.openModalForm();
            var foundProduct = store.findProduct(parseInt(product.id));
            $("#name").val(foundProduct.name);
            $("#email").val(foundProduct.email);
            $("#count").val(foundProduct.count);
            $("#price").val(foundProduct.price);
            prod = foundProduct;
        });
    }

    function editTable(id) {
        $('#' + id).find("a").eq(0).html($("#name").val());
        $('#' + id).find("td").eq(1)
            .html(storeService.formatDollarAfter(storeService.formatNumber($("#price").val())));
        $('#' + id).find(".productCount").eq(0).html($("#count").val());
        prod.name = $("#name").val();
        prod.email = $("#email").val();
        prod.count = $("#count").val();
        prod.price = $("#price").val();
        prod = null;
    }


    function initRowButtonsAction() {
        $('.deleteProduct').on('click', deleteProduct);
        $('.editProduct').on('click', editProduct);

        function deleteProduct() {
                    var id = $(this).parent().parent().attr("id");
                    $('.deleteItem').html("");
                    $('.deleteItem').append('delete item "' + $(this).parent().parent().find('a').html() + '" ?');
                    viewModule.openDeleteForm();
                    $('#yes').on('click', function () {
                        $("#" + id).remove();
                        store.remove(id);
                        viewModule.closeDeleteForm();
                    });
                    $('#no, #overlay').on('click', viewModule.closeDeleteForm);
        }

        function editProduct() {
                var id = $(this).parent().parent().attr('id');
                viewModule.openModalForm();
                var foundProduct = store.findProduct(parseInt(id));
                $("#name").val(foundProduct.name);
                $("#email").val(foundProduct.email);
                $("#count").val(foundProduct.count);
                $("#price").val(foundProduct.price);
                prod = foundProduct;
        }
    }

    function initActions(){
        //Кнопка создания товара, открытие/закрытие модального окна
        $('#addNewButton').on("click", viewModule.openModalForm);
        $('#modalClose, #overlay').on("click", viewModule.closeModalForm);

        $("#nameErrorMessage").hide();
        $("#emailErrorMessage").hide();

        //Фокус для полей
        $("#name").focusout(validationModule.checkName);
        $("#email").focusout(validationModule.checkEmail);
        $("#price").focusout(validationModule.checkPrice);

        //Поиск
        $('#searchButton').on("click", function () {
            storeService.search($("#search").val());
        });

        //Сортировка
        $('th').click(storeService.sortTable);

        //Форматирование price - focusout
        $("#price").focusout(function () {
            var num = $("#price").val();
            $("#price").val(storeService.formatDollar(num));
        });
        //Форматирование price - focusin
        $("#price").focus(function () {
            var num = $("#price").val();
            $("#price").val(storeService.formatNumber(num));
        });
    }
});
