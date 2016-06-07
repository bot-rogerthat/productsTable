class DeleteDlg {
    constructor(selector, overlay, yesButton, noButton, acceptFunc) {
        this.selector = selector;
        this.overlay = overlay;
        this.yesButton = yesButton;
        this.noButton = noButton;
        this.acceptFunc = acceptFunc;
    }

    init(text) {
        var that = this;
        this.yesButton.on('click', this.acceptFunc);
        this.noButton.on('click', function () {
            that.close();
        });
        this.overlay.on('click', function () {
            that.close();
        });
        $('.msgQuestion').html(text);
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
