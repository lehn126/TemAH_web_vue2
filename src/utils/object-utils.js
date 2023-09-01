function getFieldValue(data, fieldName, defaultValue) {
  const defValue = defaultValue === undefined ? null : defaultValue;
  if (data === undefined || data == null) {
    return defValue;
  }
  if (Object.hasOwn(data, fieldName)) {
    return data[fieldName];
  }
  return defValue;
}

export default getFieldValue;
