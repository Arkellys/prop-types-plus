import { isFunction, isNil, NotRequirableError, wrapValidator } from "../helpers";


/**
 * @callback RequiredIfCondition
 * @param {object} props - Props of the component to validate
 * @returns {boolean} Whether the prop is required
 */

/**
 * Provides a validator to test whether a prop is required.
 * @param {Function} type - Prop type validator
 * @param {RequiredIfCondition} condition - Function checking whether the prop is required
 * @param {string} [errorMessage] - Custom error message to return when the prop is required
 * @returns {Function} Validator
 */

export default function requiredIf(type, condition, errorMessage) {
	if (!isFunction(condition)) throw new TypeError("Argument `condition `of `requiredIf` must be a function.");

	const validator = (props, propName, componentName, ...rest) => {
		const { [propName]: propValue } = props;

		if (isNil(propValue)) {
			if (!condition(props)) return null;

			errorMessage ??= `The prop \`${propName}\` supplied to \`${componentName}\` is required.`;
			return new Error(errorMessage);
		}

		const typeError = type(props, propName, componentName, ...rest);
		if (typeError) return typeError;

		return null;
	};

	validator.isRequired = () => NotRequirableError("requiredIf");

	return wrapValidator(validator, "requiredIf", type);
};