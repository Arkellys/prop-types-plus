import PropTypes from "prop-types";

import { arrayToObject, isNil, RequiredError, wrapValidator } from "../helpers/index.js";


/**
 * @typedef {object} Requirable
 * @property {unknown} isRequired - Whether the validator is required
 */

/**
 * Provides a validator to test the shape of an array.
 * @param {Array} shape - Required array shape
 * @returns {Function & Requirable} Validator
 */

export default function arrayOfShape(shape) {
	if (!Array.isArray(shape)) throw new TypeError("Argument of `arrayOfShape` must be an array.");

	const validator = (props, propName, componentName, ...rest) => {
		const { [propName]: propValue } = props;

		if (isNil(propValue)) return null;

		const arrayTypeError = PropTypes.array(props, propName, componentName, ...rest);
		if (arrayTypeError) return arrayTypeError;

		if (propValue.length > shape.length) {
			return new Error(
				`Invalid prop \`${propName}\` supplied to \`${componentName}\`. ` +
				`Expected \`${shape.length}\` element(s) but received \`${propValue.length}\`.`
			);
		}

		let error = null;
		const propValueObj = arrayToObject(propValue);
		const [location, propFullName, secret] = rest;

		shape.some((type, index) => {
			const propName = `${propFullName}[${index}]`;
			error = type(propValueObj, index, componentName, location, propName, secret);

			return !isNil(error);
		});

		if (error) return error;
		return null;
	};

	validator.isRequired = (props, propName, ...rest) => {
		const { [propName]: propValue } = props;

		if (isNil(propValue)) return RequiredError(propName, propValue, ...rest);
		return validator(props, propName, ...rest);
	};

	return wrapValidator(validator, "arrayOfShape", shape);
};