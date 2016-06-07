var formatting = (function () {
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
        formatDollar: formatDollar,
        formatNumber: formatNumber,
        formatDollarAfter: formatDollarAfter
    }
})();
