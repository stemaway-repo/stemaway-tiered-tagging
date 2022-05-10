export function undasherize(string) {
  return string
    .replace("-", " ")
    .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
}

export function isDefined(value) {
  return value !== null && value !== undefined;
}

export function arrayNotEmpty(array) {
  return array?.length;
}

export function definedAndNotEmpty(value) {
  return isDefined(value) && arrayNotEmpty(value);
}
