module.exports = {sum, restar, mult, div};

function sum (a,b) {
    if (arguments.length != 2)
        throw new Error(`invalid number of arguments`);
    if (!(`number` === typeof a) || !(`number` === typeof b))
        return NaN;
    return a+b;
}
function restar (a, b) {
    if (arguments.length != 2)
        throw new Error(`invalid number of arguments`);
    if (!(`number` === typeof a) || !(`number` === typeof b))
        return NaN;
    return a-b;
}
function mult (a,b) {
    if (arguments.length != 2)
        throw new Error(`invalid number of arguments`);
    if (!(`number` === typeof a) || !(`number` === typeof b))
        return NaN;
    return a*b;
}
function div (a,b) {
    if (arguments.length != 2)
        throw new Error(`invalid number of arguments`);
    if (!(`number` === typeof a) || !(`number` === typeof b))
        return NaN;
    return a / b;
}
