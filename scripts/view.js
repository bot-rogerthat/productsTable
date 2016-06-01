var viewModule = (function () {
    function openProductForm() {
        event.preventDefault();
        $(':input', '#productForm')
            .not(':button')
            .val('')
            .removeAttr('checked')
            .removeClass()
            .removeAttr('selected');
        $(".errorForm").hide();
        $('#overlay').fadeIn(200, function () {
            $('#productForm').css('display', 'block').animate({opacity: 1, top: '50%'}, 100);
        });
    }

    function closeProductForm() {
        $('#productForm').animate({opacity: 0, top: '45%'}, 100, function () {
            $(this).css('display', 'none');
            $('#overlay').fadeOut(100);
        });
    }

    function openDeleteForm() {
        event.preventDefault();
        $('#overlay').fadeIn(200, function () {
            $('#deleteForm').css('display', 'block').animate({opacity: 1, top: '50%'}, 100);
        });
    }

    function closeDeleteForm() {

        $('#deleteForm').animate({opacity: 0, top: '45%'}, 100, function () {
            $(this).css('display', 'none');
            $('#overlay').fadeOut(100);
        });
    }

    return {
        openProductForm: openProductForm,
        closeProductForm: closeProductForm,
        openDeleteForm: openDeleteForm,
        closeDeleteForm: closeDeleteForm
    };
})();
