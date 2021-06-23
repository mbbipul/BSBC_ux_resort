"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattArr = exports.checkDateInRange = exports.getDateShortString = exports.groupBy = void 0;
var groupBy = function (list, getKey) {
    return list.reduce(function (previous, currentItem) {
        var group = getKey(currentItem);
        if (!previous[group])
            previous[group] = [];
        previous[group].push(currentItem);
        return previous;
    }, {});
};
exports.groupBy = groupBy;
var checkDateInRange = function (from, to, check) {
    var D_1 = from.split("/");
    var D_2 = to.split("/");
    var D_3 = check.split("/");
    var d1 = new Date(parseInt(D_1[2]), parseInt(D_1[0]) - 1, parseInt(D_1[1]) + 1);
    var d2 = new Date(parseInt(D_2[2]), parseInt(D_2[0]) - 1, parseInt(D_2[1]) + 1);
    var d3 = new Date(parseInt(D_3[2]), parseInt(D_3[0]) - 1, parseInt(D_3[1]) + 1);
    // console.log({
    //     d1,d2,d3
    // });
    // console.log({
    //     from,to ,check
    // })
    if (d3 >= d1 && d3 <= d2) {
        // console.log(true);
        return true;
    }
    // console.log(false);
    return false;
};
exports.checkDateInRange = checkDateInRange;
var getDateShortString = function (date) { return new Date(parseInt(date)).toLocaleString().split(',')[0]; };
exports.getDateShortString = getDateShortString;
var flattArr = function (arr) { return arr.reduce(function (acc, cur) { return acc.concat(Array.isArray(cur) ? flattArr(cur) : cur); }, []); };
exports.flattArr = flattArr;
//# sourceMappingURL=linq.js.map