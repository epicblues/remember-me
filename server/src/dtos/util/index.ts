import { TransformFnParams } from "class-transformer";

export const trimString = ({ value }: TransformFnParams) =>
  String.prototype.trim.call(value);
