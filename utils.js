const $type = (target, type = '') => {
    const targetType = Object.prototype.toString.call(target)
        .substring(8)
        .replace(']', '')
        .toLowerCase();
    return type ? targetType === type.toLowerCase() : targetType;
};

module.exports = {
    $type
}
