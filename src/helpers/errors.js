export const RequiredError = (propName, propValue, componentName) => (
	new TypeError(
		`The prop \`${propName}\` is marked as required in ` +
		`\`${componentName}\`, but its value is \`${propValue}\`.`
	)
);

export const NotRequirableError = (validator) => (
	new TypeError(`The validator \`${validator}\` cannot be required.`)
);