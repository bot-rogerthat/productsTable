$(document).ready(function () {

    var store = new Store();
    var table = new Table($('.productsTable'));

    sortable.sort(table.selector);

    var productForm = new ProductForm($('.productForm'), $('.overlay'), $('.addNewButton'), $('#add'), $('.productFormClose'), createOrEditProduct);
    productForm.init($('#name'), $('#email'), $('#count'), $('#price'));

    var nameLengthValidator = new Validator($('#name'), $('#nameErrorMessage'), 'Should be between 1-15 characters', function () {
        var nameLength = this.field.val().length;
        return !(nameLength < 1 || nameLength >= 15);
    });
    var nameSpaceValidator = new Validator($('#name'), $('#nameErrorMessage'), 'Should not consist of spaces', function () {
        var pattern = new RegExp(/^[\s]*$/g);
        return !pattern.test(this.field.val());
    });
    var emailValidator = new Validator($('#email'), $('#emailErrorMessage'), 'Invalid email address', function () {
        var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
        return pattern.test(this.field.val());
    });
    var countValidator = new Validator($('#count'), null, null, function () {
        return this.field.val() >= 0;
    });
    var priceValidator = new Validator($('#price'), null, null, function () {
        return (this.field.val() !== undefined && this.field.val().length > 0);
    });

    productForm.validateField($('#name'), nameLengthValidator, nameSpaceValidator);
    productForm.validateField($('#email'), emailValidator);
    productForm.validateField($('#count'), countValidator);
    productForm.validateField($('#price'), priceValidator);

    productForm.formatField($('#price'), formatting.formatNumber, formatting.formatDollar);

    var deleteDlg = new DeleteDlg($('.deleteForm'), $('.overlay'), $('#yes'), $('#no'), acceptFunc);
    deleteDlg.init('Are you sure?');

    $('.searchButton').on('click', function () {
            var result = store.filter($(".searchLine").val());
            if (result.length >= 0) {
                $('.productsTable tr:not(:first)').remove();
                result.forEach(function (elem) {
                    createRow(elem);
                });
            }
        });

    function acceptFunc() {
        var id = $(".itemIdForDelete").html();
        table.deleteRow($("#" + id));
        store.remove(id);
        deleteDlg.close();
    }

    function createOrEditProduct() {
        var errorNameLength = nameLengthValidator.isValid();
        var errorNameSpaces = nameSpaceValidator.isValid();
        var errorEmail = emailValidator.isValid();
        var errorCount = countValidator.isValid();
        var errorPrice = priceValidator.isValid();
        if (errorNameLength && errorNameSpaces && errorEmail && errorCount && errorPrice) {
            var name = $('#name').val();
            var email = $('#email').val();
            var count = $('#count').val();
            var price = $('#price').val();
            if ($('.itemIdForEdit').html() === '') {
                var newProduct = new Product(0, name, email, count, price);
                store.add(newProduct);
                createRow(newProduct);
            } else {
                var modifiedProduct = store.findProduct($('.itemIdForEdit').html());
                modifiedProduct.name = $('#name').val();
                modifiedProduct.email = $('#email').val();
                modifiedProduct.count = $('#count').val();
                modifiedProduct.price = $('#price').val();
                modifyRow(modifiedProduct);
                
            }
            productForm.close();
        } else {
            focusErrorField(errorNameLength, errorNameSpaces, errorEmail, errorCount, errorPrice);
        }
    }

    function focusErrorField(errorNameLength, errorNameSpace, errorEmail, errorCount, errorPrice) {
        if (!errorNameLength || !errorNameSpace) {
            $('#name').select();
            return;
        }
        if (!errorEmail) {
            $('#email').select();
            return;
        }
        if (!errorCount) {
            $('#count').select();
            return;
        }
        if (!errorPrice) {
            $('#price').select();
            return;
        }
    }

    function createRow(product) {
        var $editButton = $('<button/>').addClass('editProduct').html('Edit');
        var $deleteButton = $('<button/>').addClass('deleteProduct').html('Delete');

        var nameCell = new Cell($('<a/>').attr("href", "#" + product.id).html(product.name)
            .append($('<div/>').addClass('productCount').html(product.count)));
        var priceCell = new Cell(formatting.formatDollarAfter(formatting.formatNumber(product.price)));
        var buttonsCell = new Cell($editButton[0].outerHTML + $deleteButton[0].outerHTML);

        var row = new Row(nameCell, priceCell, buttonsCell);
        row.fill(product.id);
        table.addRow(row);
        addActions(product);
    }

    function modifyRow(product) {
        var $editButton = $('<button/>').addClass('editProduct').html('Edit');
        var $deleteButton = $('<button/>').addClass('deleteProduct').html('Delete');

        var nameCell = new Cell($('<a/>').attr("href", "#" + product.id).html($('#name').val())
            .append($('<div/>').addClass('productCount').html($('#count').val())));
        var priceCell = new Cell(formatting.formatDollarAfter(formatting.formatNumber($('#price').val())));
        var buttonsCell = new Cell($editButton[0].outerHTML + $deleteButton[0].outerHTML);

        var row = new Row(nameCell, priceCell, buttonsCell);
        row.fill(product.id);
        $('.itemIdForEdit').html('');
        table.updateRow($('#' + product.id), row);
        addActions(product);
    }

    function addActions(product) {
        $('.editProduct').on('click', editProduct);
        $('.deleteProduct').on('click', deleteProduct);
        $('a[href="#' + product.id + '"]').on('click', editProduct);
    }

    function editProduct() {
        var id = $(this).parent().parent().attr('id');
        var foundProduct = store.findProduct(id);
        var map = new Map();
        map.set($('#name'), foundProduct.name)
            .set($('#email'), foundProduct.email)
            .set($('#count'), foundProduct.count)
            .set($('#price'), foundProduct.price);
        productForm.fill(map);
        productForm.show();
        $('.itemIdForEdit').html('');
        $('.itemIdForEdit').append(id);
    }

    function deleteProduct() {
        var id = $(this).parent().parent().attr('id');
        $('.deleteItem').html('');
        $('.deleteItem').append('delete item "' + $(this).parent().parent().find('a').html() + '" ?');
        $('.itemIdForDelete').html('');
        $('.itemIdForDelete').append(id);
        deleteDlg.show();
    }
});
