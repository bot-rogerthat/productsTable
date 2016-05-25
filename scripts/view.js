var viewModule = (function(){
    function openModalForm(){
        $(':input', '#modalForm')
            .not(':button')
            .val('')
            .removeAttr('checked')
            .removeClass()
            .removeAttr('selected');
        $(".errorForm").hide();
        event.preventDefault();
        $('#overlay').fadeIn(400, function () {
                $('#modalForm').css('display', 'block').animate({opacity: 1, top: '50%'}, 200);
            });
        }

    function closeModalForm() {
        $('#modalForm').animate({opacity: 0, top: '45%'}, 200, function () {
            $(this).css('display', 'none');
            $('#overlay').fadeOut(400);
            });
    }

    function openDeleteForm(argument) {
        $('#overlay').fadeIn(400, function () {
            $('#deleteForm').css('display', 'block').animate({opacity: 1, top: '50%'}, 200);
            });
    }

    function closeDeleteForm() {
        $('#deleteForm').animate({opacity: 0, top: '45%'}, 200, function () {
            $(this).css('display', 'none');
            $('#overlay').fadeOut(400);
        });
    }

    return {
            openModalForm: openModalForm,
            closeModalForm: closeModalForm,
            openDeleteForm: openDeleteForm,
            closeDeleteForm: closeDeleteForm
        };
})();
