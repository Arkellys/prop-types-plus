import { bool, number, shape, string } from "prop-types";
import { expect } from "chai";

import { arrayOfShape } from "../src/validators";
import validate, { PROP_NAME } from "./_validate";


describe("arrayOfShape", () => {
	it("throws an error when the input is not an array", () => {
		expect(() => arrayOfShape(undefined)).to.throw(TypeError);
		expect(() => arrayOfShape(null)).to.throw(TypeError);
		expect(() => arrayOfShape({})).to.throw(TypeError);
		expect(() => arrayOfShape("")).to.throw(TypeError);
		expect(() => arrayOfShape(8015)).to.throw(TypeError);
	});

	it("doesn't throw an error when the input is an array", () => {
		expect(() => arrayOfShape([])).not.to.throw(TypeError);
	});

	it("fails when the prop is nil and required", () => {
		const validator = arrayOfShape([]).isRequired;

		const result = validate(validator, { [PROP_NAME]: undefined });

		expect(result).to.be.instanceOf(TypeError);
	});

	it("fails when the prop is not an array", () => {
		const validator = arrayOfShape([]);

		const result = validate(validator, { [PROP_NAME]: "str" });

		expect(result).to.be.instanceOf(Error);
	});

	it("fails when the prop is longer than the expected shape", () => {
		const validator = arrayOfShape([string]);

		const result = validate(validator, { [PROP_NAME]: ["str", "str"] });

		expect(result).to.be.instanceOf(Error);
	});

	it("fails when the prop doesn't have the expected shape", () => {
		const validator = arrayOfShape([string, number.isRequired, shape({ bool })]);

		const resultOne = validate(validator, { [PROP_NAME]: [] });
		const resultTwo = validate(validator, { [PROP_NAME]: ["str", 8015, "str"] });
		const resultThree = validate(validator, { [PROP_NAME]: ["str", "str", "str"] });

		expect(resultOne)
			.to.be.instanceOf(Error)
			.with.property("message")
			.that.include(`${PROP_NAME}[1]`);
		expect(resultTwo)
			.to.be.instanceOf(Error)
			.with.property("message")
			.that.include(`${PROP_NAME}[2]`);
		expect(resultThree)
			.to.be.instanceOf(Error)
			.with.property("message")
			.that.include(`${PROP_NAME}[1]`);
	});

	it("passes when the prop is nil and not required", () => {
		const validator = arrayOfShape([]);

		const result = validate(validator, { [PROP_NAME]: undefined });

		expect(result).to.equal(null);
	});

	it("passes when the prop has the expected shape", () => {
		const validator = arrayOfShape([string, number.isRequired, shape({ bool })]);

		const resultOne = validate(validator, { [PROP_NAME]: [undefined, 8015] });
		const resultTwo = validate(validator, { [PROP_NAME]: ["str", 8015, { bool: true }] });

		expect(resultOne).to.equal(null);
		expect(resultTwo).to.equal(null);
	});
});