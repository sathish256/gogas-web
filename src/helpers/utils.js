export const validateObject = (obj, fields) => {
  return fields.every(field => !!obj && !!obj[field].trim());
};
