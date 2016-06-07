class Row {
    constructor(...cells) {
        this.cells = cells;
        this.row = $('<tr>');
    }

    fill(id) {
        var newRow = this.row.attr('id', id);
        this.cells.forEach(function (cell) {
            newRow.append(cell.td);
        });
    }

    get tr() {
        return this.row;
    }

}