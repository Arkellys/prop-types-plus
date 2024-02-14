import _mockValidator from "./validators/_mockValidator";
import arrayOfShapeValidator from "./validators/arrayOfShape";
import requiredIfValidator from "./validators/requiredIf";
import stringOfShapeValidator from "./validators/stringOfShape";
import unnecessaryWhenValidator from "./validators/unnecessaryWhen";


const isProd = process.env.NODE_ENV === "production";


export const arrayOfShape = isProd ? _mockValidator : arrayOfShapeValidator;
export const requiredIf = isProd ? _mockValidator : requiredIfValidator;
export const stringOfShape = isProd ? _mockValidator : stringOfShapeValidator;
export const unnecessaryWhen = isProd ? _mockValidator : unnecessaryWhenValidator;