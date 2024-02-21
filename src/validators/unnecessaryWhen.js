import { isFunction, isNil, NotRequirableError, wrapValidator } from "../helpers/index.js";


/**
 * @callback UnnecessaryWhenCondition
 * @param {object} props - Props of the component to validate
 * @returns {boolean} Whether the prop is unnecessary
 */

/**
 * Provides a validator to test whether a prop is unnecessary.
 * @param {any} type - Prop type validator
 * @param {UnnecessaryWhenCondition} condition - Function checking whether the prop is unnecessary
 * @param {string} [errorMessage] - Custom error message to return when the prop is unnecessary
 * @returns {import("prop-types").Validator<any>} Validator
 */

export default function unnecessaryWhen(type, condition, errorMessage) {
	if (!isFunction(condition)) throw new TypeError("Argument `condition `of `unnecessaryWhen` must be a function.");

	const validator = (props, propName, componentName, ...rest) => {
		const { [propName]: propValue } = props;

		if (isNil(propValue)) return null;

		if (condition(props)) {
			errorMessage ??= `The prop \`${propName}\` supplied to \`${componentName}\` is unnecessary.`;
			return new Error(errorMessage);
		}

		const typeError = type(props, propName, componentName, ...rest);
		if (typeError) return typeError;

		return null;
	};

	validator.isRequired = () => NotRequirableError("unnecessaryWhen");

	return wrapValidator(validator, "unnecessaryWhen", type);
};