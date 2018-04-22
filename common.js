/**
 * camelCaseToDash('userId') => "user-id"
 * camelCaseToDash('waitAMoment') => "wait-a-moment"
 * camelCaseToDash('TurboPascal') => "turbo-pascal"
 */
exports.camelCaseToDash = function(str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
}

/**
 * Make first letter to uppercase
 * toUpperCaseFirstLetter('gastons') => "Gastons"
 */
exports.toUpperCaseFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Make first letter to lowercase
 * toUpperCaseFirstLetter('Gastons') => "gastons"
 */
exports.toLowerCaseFirstLetter = function(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}