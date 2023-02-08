# The Open DAO Utils

<!-- INSERT GENERATED DOCS START -->

### `toDecimals` (function)

Converts number to decimals.

**Parameters:**

- src (`string | number | bigint`) - Number to convert.
- decimals (`number`) - Number of decimals.

**returns:** bigint

### `fromDecimals` (function)

Converts decimals to number.

**Parameters:**

- src (`string | number | bigint`) - Number decimals to convert.
- decimals (`number`) - Number of decimals.

**returns:** string

### `loadConfigWithExpressions` (function)

Loads json config, replacing expressions with evaluated values:

- ENV{{ ENV_NAME }} => process.env.ENV_NAME
- More coming soon...

**Parameters:**

- configPath (`fs.PathOrFileDescriptor`) - Path to config file.
- errCallback (`(err: any) => void`) - Function to be called on error.

**returns:** any

<!-- INSERT GENERATED DOCS END -->
