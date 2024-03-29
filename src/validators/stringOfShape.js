import PropTypes from "prop-types";

import { isNil, RequiredError, wrapValidator } from "../helpers/index.js";


/**
 * Provides a validator to test the shape of a string.
 * @param {RegExp} regex - Regex to test the string shape
 * @returns {import("prop-types").Requireable<any>} Validator
 */

export default function stringOfShape(regex) {
	if (!(regex instanceof RegExp)) throw new TypeError("Argument of `stringOfShape` must be a regex.");

	const validator = (props, propName, componentName, ...rest) => {
		const { [propName]: propValue } = props;

		if (isNil(propValue)) return null;

		const stringTypeError = PropTypes.string(props, propName, componentName, ...rest);
		if (stringTypeError) return stringTypeError;

		if (!regex.test(propValue)) {
			return new Error(
				`Invalid prop \`${propName}\` supplied to \`${componentName}\`. ` +
				`\`${propValue}\` is not a valid shape.`
			);
		}

		return null;
	};

	validator.isRequired = (props, propName, ...rest) => {
		const { [propName]: propValue } = props;

		if (isNil(propValue)) return RequiredError(propName, propValue, ...rest);
		return validator(props, propName, ...rest);
	};

	return wrapValidator(validator, "stringOfShape", regex);
};