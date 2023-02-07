/**
 * Converts number to decimals.
 * 
 * @param src Number to convert.
 * @param decimals Number of decimals.
 */
export function toDecimals(src: number | string | bigint, decimals: number = 9): bigint {
    let decimalsInOne = 10n ** BigInt(decimals);
    if (typeof src === 'bigint') {
        return src * decimalsInOne;
    } else if (typeof src === 'number') {
        return BigInt(src) * decimalsInOne;
    } else {
        // Check sign
        let neg = false;
        while (src.startsWith('-')) {
            neg = !neg;
            src = src.slice(1);
        }

        // Split string
        if (src === '.') {
            throw Error('Invalid number');
        }
        let parts = src.split('.');
        if (parts.length > 2) {
            throw Error('Invalid number');
        }

        // Prepare parts
        let whole = parts[0];
        let frac = parts[1];
        if (!whole) {
            whole = '0';
        }
        if (!frac) {
            frac = '0';
        }
        if (frac.length > decimals) {
            throw Error('Invalid number');
        }
        while (frac.length < decimals) {
            frac += '0';
        }

        // Convert
        let r = BigInt(whole) * decimalsInOne + BigInt(frac);
        if (neg) {
            r = -r;
        }
        return r;
    }
}

/**
 * Converts decimals to number.
 * 
 * @param src Number decimals to convert.
 * @param decimals Number of decimals.
 */
export function fromDecimals(src: bigint | number | string, decimals: number = 9) {
    let decimalsInOne = 10n ** BigInt(decimals);

    let v = BigInt(src);
    let neg = false;
    if (v < 0) {
        neg = true;
        v = -v;
    }

    // Convert fraction
    let frac = v % decimalsInOne;
    let facStr = frac.toString();
    while (facStr.length < decimals) {
        facStr = '0' + facStr;
    }
    facStr = facStr.match(/^([0-9]*[1-9]|0)(0*)/)![1];

    // Convert whole
    let whole = v / decimalsInOne;
    let wholeStr = whole.toString();

    // Value
    let value = `${wholeStr}${facStr === '0' ? '' : `.${facStr}`}`;
    if (neg) {
        value = '-' + value;
    }

    return value;
}