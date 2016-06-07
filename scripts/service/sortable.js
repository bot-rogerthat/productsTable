var sortable = (function () {
    function sort(table) {
        table.addClass('sortable');
        table.find('th').on('click', function () {
            $(this).parent().find('th').removeClass();
            var table = $(this).parents('table').eq(0);
            var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
            this.asc = !this.asc;
            if (this.asc == false) {
                $(this).removeClass();
                $(this).addClass('ascend');
            } else {
                $(this).removeClass();
                $(this).addClass('descend');
            }
            if (!this.asc) {
                rows = rows.reverse();
            }
            for (var i = 0; i < rows.length; i++) {
                table.append(rows[i]);
            }
        });
    }

    function comparer(index) {
        return function (a, b) {
            var valA = getCellValue(a, index),
                valB = getCellValue(b, index);
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
        }
    }

    function getCellValue(row, index) {
        return $(row).children('td').eq(index).html()
    }

    return {
        sort: sort
    }
})();

