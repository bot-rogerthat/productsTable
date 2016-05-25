class Store {
    constructor() {
        this.id = 0;
        this.products = [];
    }

    findProduct(id) {
        var i = this.products.length;
        while (i--) {
            if (this.products[i].id === parseInt(id)) {
                return this.products[i];
            }
        }
    }

    add(target){
        this.products.push(target);
        this.id++;
    }

    remove(id){
        var index = this.products.indexOf(this.findProduct(id));
        if (index > -1) {
            this.products.splice(index, 1);
        }
    }
}
