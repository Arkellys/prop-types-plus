import { expect } from "chai";
import { string } from "prop-types";

import { requiredIf } from "../src";
import validate, { PROP_NAME } from "./_validate";


describe("requiredIf", () => {
	it("throws an error when the input condition is not a function", () => {
		expect(() => requiredIf(string)).to.throw(TypeError);
		expect(() => requiredIf(string, null)).to.throw(TypeError);
		expect(() => requiredIf(string, {})).to.throw(TypeError);
		expect(() => requiredIf(string, "")).to.throw(TypeError);
		expect(() => requiredIf(string, 8015)).to.throw(TypeError);
	});

	it("doesn't throw an error when the input condition is a function", () => {
		expect(() => requiredIf(string, Function.prototype)).not.to.throw(TypeError);
	});

	it("fails when the validator is required", () => {
		const validator = requiredIf(string, Function.prototype).isRequired;

		const result = validate(validator);

		expect(result).to.be.instanceOf(TypeError);
	});

	it("fails when the prop is not of the expected type", () => {
		const validator = requiredIf(string, Function.prototype);

		const result = validate(validator, { [PROP_NAME]: 8015 });

		expect(result).to.be.instanceOf(Error);
	});

	it("fails with a custom message when condition is not satisfied", () => {
		const customMessage = "Test error message";
		const anotherPropName = "foo";
		const validator = requiredIf(string, (props) => props[anotherPropName], customMessage);

		const result = validate(validator, { [anotherPropName]: true });

		expect(result)
			.to.be.instanceOf(Error)
			.with.property("message", customMessage);
	});

	it("fails with a default message when condition is not satisfied", () => {
		const anotherPropName = "foo";
		const validator = requiredIf(string, (props) => props[anotherPropName]);

		const result = validate(validator, { [anotherPropName]: true });

		expect(result)
			.to.be.instanceOf(Error)
			.with.property("message")
			.that.match(new RegExp(`${PROP_NAME}.+is required`));
	});

	it("passes when the prop is not nil and of the expected type", () => {
		const validator = requiredIf(string, Function.prototype);

		const result = validate(validator, { [PROP_NAME]: "str" });

		expect(result).to.equal(null);
	});

	it("passes when the condition is satisfied", () => {
		const anotherPropName = "foo";
		const validator = requiredIf(string, (props) => props[anotherPropName]);

		const resultRequired = validate(validator, { [PROP_NAME]: "str", [anotherPropName]: true });
		const resultNotRequired = validate(validator, { [anotherPropName]: false });

		expect(resultRequired).to.equal(null);
		expect(resultNotRequired).to.equal(null);
	});
});