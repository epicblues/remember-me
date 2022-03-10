import { plainToInstance } from "class-transformer";

export const removeSuffixAndConvertToClassInstance = <T>(
  obj: any,
  className: new (...args: any[]) => T
) => {
  Object.keys(obj).forEach((key) => {
    const filteredKey = key.match(/(?<=_).+$/)!;
    obj[filteredKey[0]] = obj[key];
    delete obj[key];
  });

  return plainToInstance(className, obj);
};
