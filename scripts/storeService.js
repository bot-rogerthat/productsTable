var storeService = (function () {
    function search(inputVal) {
        var table = $('.productsTable');
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
                if (found == true) {
                    $(row).show();
                } else {
                    $(row).hide();
                }
            }
        });
    }

    function formatDollar(value) {
        var sign = value < 0 ? '-' : '',
            i = parseInt(n = Math.abs(+value || 0).toFixed(2)) + '',
            j = (j = i.length) > 3 ? j % 3 : 0;
        return '$' + sign + (j ? i.substr(0, j) + ',' : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + ',') +
            (2 ? '.' + Math.abs(n - i).toFixed(2).slice(2) : '');
    }

    function formatNumber(value) {
        return value.replace(/[^\d*.?]/g, '');
    }

    function formatDollarAfter(value) {
        var sign = value < 0 ? '-' : '',
            i = parseInt(n = Math.abs(+value || 0).toFixed(2)) + '',
            j = (j = i.length) > 3 ? j % 3 : 0;
        return sign + (j ? i.substr(0, j) + ',' : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + ',') +
            (2 ? '.' + Math.abs(n - i).toFixed(2).slice(2) : '') + ' $';
    }

    return {
        search: search,
        formatDollar: formatDollar,
        formatNumber: formatNumber,
        formatDollarAfter: formatDollarAfter
    };
})();
