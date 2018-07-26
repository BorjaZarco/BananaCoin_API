module.exports = function (data) {
    const errors = [];
    if (data.id) errors.push("Parámetro id inválido");
    if (data.value || typeof data.value != 'string') errors.push("Debe introducir un value de tipo string");
    if (data.status || typeof data.status != 'string') errors.push("Debe introducir un status de tipo string");
    return errors;
  }