# prop-types-plus

Another library of custom PropType validators. It is greatly inspired by [`airbnb/prop-types`](https://github.com/airbnb/prop-types), which probably already offers the same custom types and more. I just wanted to create my own. 🙃

---

## Installation

```shell
yarn add prop-types-plus
```

## Validators

> [!NOTE]
> Since PropTypes are only useful for developement, when `NODE_ENV` is set to `production` mock functions are exported instead of the real validators.

### `arrayOfShape`

Validates the type of the entries in an array in the given order.

#### Signature

```js
arrayOfShape(shape: PropTypes[])
```

#### Usage

```js
import { string, number } from "prop-type";
import { arrayOfShape } from "prop-types-plus";

const propTypes = {
  foo: arrayOfShape([string, number.isRequired]),
  fooRequired: arrayOfShape([string, number.isRequired]).isRequired
};
```

### `requiredIf`

Tests whether a prop is required based on a given condition.

#### Signature

```js
requiredIf(
  type: PropTypes,
  condition: (props: object) => boolean,
  errorMessage?: string
)
```

#### Usage

```js
import { string } from "prop-type";
import { requiredIf } from "prop-types-plus";

const propTypes = {
  foo: requiredIf(
    string,
    (props) => props.bar
    "The prop `foo` is required when there is `bar`."
  )
};
```

### `stringOfShape`

Tests whether a string matches the given regex.

#### Signature

```js
stringOfShape(regex: RegExp)
```

#### Usage

```js
import { stringOfShape } from "prop-types-plus";

const propTypes = {
  foo: stringOfShape(/^#.+/),
  fooRequired: stringOfShape(/^#.+/).isRequired
};
```

### `unnecessaryWhen`

Tests whether a prop is unnecessary based on a given condition.

#### Signature

```js
unnecessaryWhen(
  type: PropTypes,
  condition: (props: object) => boolean,
  errorMessage?: string
)
```

#### Usage

```js
import { string } from "prop-type";
import { unnecessaryWhen } from "prop-types-plus";

const propTypes = {
  foo: unnecessaryWhen(
    string,
    (props) => props.bar
    "The prop `foo` is unnecessary when there is `bar`."
  )
};
```
