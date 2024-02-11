/* eslint-disable jsdoc/match-description, jsdoc/require-param */

/**
 * Helper function taken from Airbnb's custom prop-type library.
 * @see {@link https://github.com/airbnb/prop-types | airbnb-prop-types}
 */

export default function wrapValidator(validator, typeName, typeChecker = null) {
	return Object.assign(validator.bind(), {
		typeName,
		typeChecker,
		isRequired: Object.assign(validator.isRequired.bind(), {
			typeName,
			typeChecker,
			typeRequired: true
		})
	});
}