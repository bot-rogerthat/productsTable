$(document).ready(function () {

    initActions();

    //Создание продуктов и изменение таблицы
    var store = new Store();

    $('#add').on('click', createOrEditProduct);

    function createOrEditProduct() {
        var errorName = validationModule.checkName();
        var errorEmail = validationModule.checkEmail();
        var errorCount = validationModule.checkCount();
        var errorPrice = validationModule.checkPrice();
        if (!errorName && !errorEmail && !errorCount && !errorPrice) {
            var name = $('#name').val();
            var email = $('#email').val();
            var count = $('#count').val();
            var price = $('#price').val();
            if ($('.itemIdForEdit').html() === '') {
                var newProduct = new Product(store.id, name, email, count, price);
                store.add(newProduct);
                addTableRow(newProduct);
            } else {
                var modifiedProduct = store.findProduct($('.itemIdForEdit').html());
                editTable(modifiedProduct);
            }
            viewModule.closeProductForm();
        } else {
            validationModule.focusErrorField(errorName, errorEmail, errorCount, errorPrice);
        }
    }

    function addTableRow(product) {
        var $editButton = $('<button/>').addClass('editProduct').html('Edit');
        var $deleteButton = $('<button/>').addClass('deleteProduct').html('Delete');

        $('.productsTable tr:last')
            .after('<tr id="' + product.id + '"><td>' + '<a href="#' + product.id + '">' +
                product.name + '</a>' +
                '<div class="productCount">' + product.count + '</div>' +
                '</td><td>' +
                storeService.formatDollarAfter(storeService.formatNumber(product.price)) +
                '</td><td class="trButtons">' +
                $editButton[0].outerHTML + $deleteButton[0].outerHTML + '</td></tr>');

        initRowActions(product);
    }

    function editTable(modifiedProduct) {
        $('#' + modifiedProduct.id).find('a').eq(0).html($("#name").val());
        $('#' + modifiedProduct.id).find('td').eq(1).html(storeService.formatDollarAfter(storeService.formatNumber($('#price').val())));
        $('#' + modifiedProduct.id).find('.productCount').eq(0).html($('#count').val());
        modifiedProduct.name = $('#name').val();
        modifiedProduct.email = $('#email').val();
        modifiedProduct.count = $('#count').val();
        modifiedProduct.price = $('#price').val();
        $('.itemIdForEdit').html('');
    }

    function initRowActions(product) {
        $('.editProduct').on('click', editProduct);
        $('.deleteProduct').on('click', deleteProduct);
        $('a[href="#' + product.id + '"]').on('click', editProduct);
    }

    function deleteProduct() {
        var id = $(this).parent().parent().attr('id');
        $('.deleteItem').html('');
        $('.deleteItem').append('delete item "' + $(this).parent().parent().find('a').html() + '" ?');
        $('.itemIdForDelete').html('');
        $('.itemIdForDelete').append(id);
        viewModule.openDeleteForm();
    }

    function editProduct() {
        var id = $(this).parent().parent().attr('id');
        viewModule.openProductForm();
        var foundProduct = store.findProduct(id);
        $('#name').val(foundProduct.name);
        $('#email').val(foundProduct.email);
        $('#count').val(foundProduct.count);
        $('#price').val(foundProduct.price);
        $('.itemIdForEdit').html('');
        $('.itemIdForEdit').append(id);
    }

    function initActions() {
        //Кнопка создания товара, открытие/закрытие модального окна
        $('.addNewButton').on('click', viewModule.openProductForm);
        $('#productFormClose, #overlay').on('click', viewModule.closeProductForm);

        $("#nameErrorMessage").hide();
        $("#emailErrorMessage").hide();

        //Фокус для полей
        $('#name').focusout(validationModule.checkName);
        $('#email').focusout(validationModule.checkEmail);
        $('#price').focusout(validationModule.checkPrice);

        //Поиск
        $('.searchButton').on('click', function () {
            storeService.search($(".searchLine").val());
        });

        //Сортировка
        sortable.sort($('.productsTable'));

        //Форматирование price - focusout
        $('#price').focusout(function () {
            var num = $('#price').val();
            $('#price').val(storeService.formatDollar(num));
        });

        //Форматирование price - focusin
        $('#price').focus(function () {
            var num = $("#price").val();
            $("#price").val(storeService.formatNumber(num));
        });

        //Подтверждение удаления продукта
        $('#yes').on('click', function () {
            var id = $(".itemIdForDelete").html();
            $("#" + id).remove();
            store.remove(id);
            viewModule.closeDeleteForm();
        });

        //Отмена удаления продукта
        $('#no, #overlay').on('click', viewModule.closeDeleteForm);
    }
});
