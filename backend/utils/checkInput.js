const validKeys = (body, arrayKeys) => {
  return arrayKeys.every((v) => body.hasOwnProperty(v));
};

const validTypeOfValues = (body, typeOfValue) => {
  return Object.values(body)
    .map((v) => typeof v)
    .every((v) => typeOfValue === v);
};

const checkInput = (body, arrayKeys, typeOfValue) => {
  if ("object" === typeof body) {
    if (validKeys(body, arrayKeys) && validTypeOfValues(body, typeOfValue)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports = { checkInput };
