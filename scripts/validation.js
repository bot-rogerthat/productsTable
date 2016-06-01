var validationModule = (function () {
    function checkName() {
        var nameLength = $('#name').val().length;
        var pattern = new RegExp(/^[\s]*$/g);
        if (nameLength < 1 || nameLength >= 15) {
            $('#nameErrorMessage').html('Should be between 1-15 characters');
            $('#name').addClass('error');
            $('#nameErrorMessage').show();
            return true;
        }
        if (pattern.test($('#name').val())) {
            $('#nameErrorMessage').html('Should not consist of spaces');
            $('#name').addClass('error');
            $('#nameErrorMessage').show();
            return true;
        }
        $('#name').removeClass();
        $('#nameErrorMessage').hide();
        return false;
    }

    function checkEmail() {
        var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
        if (pattern.test($('#email').val())) {
            $('#emailErrorMessage').hide();
            $('#email').removeClass();
            return false;
        } else {
            $('#emailErrorMessage').html('Invalid email address');
            $('#email').addClass('error');
            $('#emailErrorMessage').show();
            return true;
        }
    }

    function checkCount() {
        if ($('#count').val() >= 0) {
            $('#count').removeClass();
            return false;
        } else {
            $('#count').addClass('error');
            return true;
        }
    }

    function checkPrice() {
        if ($('#price').val() !== undefined && $('#price').val().length > 0) {
            $('#price').removeClass();
            return false;
        } else {
            $('#price').addClass('error');
            return true;
        }
    }

    function focusErrorField(errorName, errorEmail, errorCount, errorPrice) {
        if (errorName) {
            $('#name').select();
            return;
        }
        if (errorEmail) {
            $('#email').select();
            return;
        }
        if (errorCount) {
            $('#count').select();
            return;
        }
        if (errorPrice) {
            $('#price').select();
            return;
        }
    }

    return {
        checkName: checkName,
        checkEmail: checkEmail,
        checkCount: checkCount,
        checkPrice: checkPrice,
        focusErrorField: focusErrorField
    };
})();
