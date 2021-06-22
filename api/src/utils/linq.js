"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDateInRange = exports.getDateShortString = exports.groupBy = void 0;
const groupBy = (list, getKey) => list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group])
        previous[group] = [];
    previous[group].push(currentItem);
    return previous;
}, {});
exports.groupBy = groupBy;
const checkDateInRange = (from, to, check) => {
    var fDate, lDate, cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(check);
    if ((cDate <= lDate && cDate >= fDate)) {
        return true;
    }
    return false;
};
exports.checkDateInRange = checkDateInRange;
const getDateShortString = (date) => new Date(parseInt(date)).toLocaleString().split(',')[0];
exports.getDateShortString = getDateShortString;
