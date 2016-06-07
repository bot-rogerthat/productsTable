class Table {
    constructor(selector) {
        this.selector = selector;
    }

    addRow(row) {
        this.selector.find('tr').filter(':last').after(row.tr);
    }

    deleteRow(row) {
        row.remove();
    }

    updateRow(value, row) {
        value.replaceWith(row.tr);
    }
}