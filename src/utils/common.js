import { v4 as uuidv4 } from "uuid";
export const isJSON = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

// Function to generate a unique ID and check its existence in the list
export const generateUniqueIDAndCheckExistence = (list) => {
  let newID;

  // Generate a unique ID
  do {
    newID = uuidv4();
  } while (list.some((item) => item.id === newID));

  return newID;
};
