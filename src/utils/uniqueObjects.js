import _ from "lodash";

export function getUniqueObjects(ObjectArray, key = "id") {
  let uniqueIds = new Set();
  const list = [
    ...new Set(
      ObjectArray.filter((obj) => {
        if (!uniqueIds.has(_.get(obj, key))) {
          uniqueIds.add(_.get(obj, key));
          return obj;
        }
      })
    ),
  ];

  return list;
}
