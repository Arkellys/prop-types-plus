import secret from "prop-types/lib/ReactPropTypesSecret.js";


export const PROP_NAME = "tester";

export default function validate(validator, props = {}) {
	return validator(props, PROP_NAME, "Tester", "", PROP_NAME, secret);
};