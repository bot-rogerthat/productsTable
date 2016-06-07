class ProductForm {
    constructor(selector, overlay, callButton, submitButton, closeButton, submitFunc) {
        this.selector = selector;
        this.overlay = overlay;
        this.callButton = callButton;
        this.submitButton = submitButton;
        this.closeButton = closeButton;
        this.submitFunc = submitFunc;
    }

    init(...fields) {
        var that = this;
        this.submitButton.on('click', this.submitFunc);
        this.callButton.on('click', function () {
            fields.forEach(function (field) {
                field.val('');
            });
            that.show();
        });
        this.overlay.on('click', function () {
            that.close();
        });
        this.closeButton.on('click', function () {
            that.close();
        });
    }

    validateField(field, ...validators) {
        field.focusout(function () {
            for (var i = 0; i < validators.length; i++) {
                if (!validators[i].isValid()) {
                    break;
                }
            }
        });
    }

    formatField(field, focusFormat, focusoutFormat) {
        field.focus(function () {
            field.val(focusFormat(field.val()));
        });
        field.focusout(function () {
            field.val(focusoutFormat(field.val()));
        });
    }

    fill(map) {
        map.forEach(function (value, key) {
            key.val(value);
        });
    }

    show() {
        window.event.preventDefault();
        var owner = this.selector;
        this.overlay.fadeIn(200, function () {
            owner.css('display', 'block').animate({opacity: 1, top: '50%'}, 100);
        });
    }

    close() {
        var overlay = this.overlay;
        this.selector.animate({opacity: 0, top: '45%'}, 100, function () {
            $(this).css('display', 'none');
            overlay.fadeOut(100);
        });
    }
}
