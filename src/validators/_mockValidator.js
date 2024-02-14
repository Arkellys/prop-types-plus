// We don't check `PropTypes` in production
const validator = () => null;
validator.isRequired = validator;

export default function mockValidator() { return validator; }