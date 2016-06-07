class Cell {
    constructor(value) {
        this.newCell = $('<td>');
        this.newCell.append(value);
    }

    get td() {
        return this.newCell;
    }
}