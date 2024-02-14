import { expect } from "chai";

import { stringOfShape } from "../src";
import validate, { PROP_NAME } from "./_validate";


describe("stringOfShape", () => {
	it("throws an error when the input is not a regex", () => {
		expect(() => stringOfShape()).to.throw(TypeError);
		expect(() => stringOfShape(null)).to.throw(TypeError);
		expect(() => stringOfShape({})).to.throw(TypeError);
		expect(() => stringOfShape("")).to.throw(TypeError);
		expect(() => stringOfShape(8015)).to.throw(TypeError);
	});

	it("doesn't throw an error when the input is a regex", () => {
		expect(() => stringOfShape(/foo/)).not.to.throw(TypeError);
		expect(() => stringOfShape(new RegExp("foo"))).not.to.throw(TypeError);
	});

	it("fails when the prop is nil and required", () => {
		const validator = stringOfShape(/foo/).isRequired;

		const result = validate(validator, { [PROP_NAME]: undefined });

		expect(result).to.be.instanceOf(TypeError);
	});

	it("fails when the prop is not a string", () => {
		const validator = stringOfShape(/foo/);

		const result = validate(validator, { [PROP_NAME]: 8015 });

		expect(result).to.be.instanceOf(Error);
	});

	it("fails when the prop doesn't have the expected shape", () => {
		const validator = stringOfShape(/^foo?.+/);

		const resultOne = validate(validator, { [PROP_NAME]: "noop" });
		const resultTwo = validate(validator, { [PROP_NAME]: "barfoo" });
		const resultThree = validate(validator, { [PROP_NAME]: "fo" });

		expect(resultOne).to.be.instanceOf(Error);
		expect(resultTwo).to.be.instanceOf(Error);
		expect(resultThree).to.be.instanceOf(Error);
	});

	it("passes when the prop is nil and not required", () => {
		const validator = stringOfShape(/foo/);

		const result = validate(validator, { [PROP_NAME]: undefined });

		expect(result).to.equal(null);
	});

	it("passes when the prop has the expected shape", () => {
		const validator = stringOfShape(/^foo?.+/);

		const resultOne = validate(validator, { [PROP_NAME]: "foobar" });
		const resultTwo = validate(validator, { [PROP_NAME]: "foo" });

		expect(resultOne).to.equal(null);
		expect(resultTwo).to.equal(null);
	});
});