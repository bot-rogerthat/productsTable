var storeService = (function(){
    function search(inputVal) {
        var table = $('#productsTable');
        table.find('tr').each(function (index, row) {
            var allCells = $(row).find('td');
            if (allCells.length > 0) {
                var found = false;
                allCells.each(function (index, td) {
                    var regExp = new RegExp(inputVal, 'i');
                    if (regExp.test($(td).text())) {
                        found = true;
                        return false;
                    }
                });
                if (found == true)$(row).show(); else $(row).hide();
            }
        });
    }

    function sortTable(){
        $('th').removeClass();
            var table = $(this).parents('table').eq(0)
            var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
            this.asc = !this.asc
            if (this.asc == false) {
                $(this).removeClass();
                $(this).addClass('ascend');
            } else {
                $(this).removeClass();
                $(this).addClass('descend');
            }
            if (!this.asc) {
                rows = rows.reverse()
            }
            for (var i = 0; i < rows.length; i++) {
                table.append(rows[i])
            }
    }

    function comparer(index) {
        return function (a, b) {
            var valA = getCellValue(a, index),
                valB = getCellValue(b, index)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
        }
    }
        function getCellValue(row, index) {
        return $(row).children('td').eq(index).html()
    }

    function formatDollar(value) {
            var sign = value < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+value || 0).toFixed(2)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
            return "$" + sign + (j ? i.substr(0, j) + "," : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ",") +
                (2 ? "." + Math.abs(n - i).toFixed(2).slice(2) : "");
        };
    
    function formatNumber(value) {
        return value.replace(/[^\d*.?]/g, "");
    };
    
    function formatDollarAfter(value) {
        var sign = value < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+value || 0).toFixed(2)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return sign + (j ? i.substr(0, j) + "," : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ",") +
            (2 ? "." + Math.abs(n - i).toFixed(2).slice(2) : "") + " $";
    };
    
    return {
            search: search,
            sortTable: sortTable,
            formatDollar: formatDollar,
            formatNumber: formatNumber,
            formatDollarAfter: formatDollarAfter
        };
})();
