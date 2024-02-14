import _mockValidator from "./validators/_mockValidator.js";
import arrayOfShapeValidator from "./validators/arrayOfShape.js";
import requiredIfValidator from "./validators/requiredIf.js";
import stringOfShapeValidator from "./validators/stringOfShape.js";
import unnecessaryWhenValidator from "./validators/unnecessaryWhen.js";


const isProd = process.env.NODE_ENV === "production";


export const arrayOfShape = isProd ? _mockValidator : arrayOfShapeValidator;
export const requiredIf = isProd ? _mockValidator : requiredIfValidator;
export const stringOfShape = isProd ? _mockValidator : stringOfShapeValidator;
export const unnecessaryWhen = isProd ? _mockValidator : unnecessaryWhenValidator;