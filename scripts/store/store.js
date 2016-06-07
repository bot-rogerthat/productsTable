class Store {
    constructor() {
        this.id = 0;
        this.products = [];
    }

    findProduct(id) {
        return this.products.find(function (element) {
            if (element.id === parseInt(id)) {
                return element;
            }
        });
    }

    add(target) {
        target.id = this.id;
        this.products.push(target);
        this.id++;
    }

    remove(id) {
        var index = this.products.indexOf(this.findProduct(id));
        if (index > -1) {
            this.products.splice(index, 1);
        }
    }

    filter(inputVal) {
        var regExp = new RegExp(inputVal, 'i');
        var result = [];
        this.products.forEach(function (elem) {
            if (regExp.test(elem.name)) {
                result.push(elem);
            }
        });
        return result;
    }
}
