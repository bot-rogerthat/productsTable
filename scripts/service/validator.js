class Validator {
    constructor(field, errSelector, errMsg, rule) {
        this.field = field;
        this.errSelector = errSelector;
        this.errMsg = errMsg;
        this.rule = rule;
    }

    highlightErrMsg() {
        this.field.addClass('error');
        if (this.errSelector !== null) {
            this.errSelector.html(this.errMsg);
            this.errSelector.show();
        }
    }

    isValid() {
        if (this.errSelector !== null) {
            this.errSelector.hide();
        }
        this.field.removeClass('error');
        if (this.rule()) {
            return true;
        } else {
            this.highlightErrMsg();
            return false;
        }
    }
}
