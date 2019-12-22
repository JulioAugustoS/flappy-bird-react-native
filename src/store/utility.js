export const updateObject = (oldObject, updateValues) => {
  return {
    ...oldObject,
    ...updateValues
  };
};