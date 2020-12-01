type Options = {
    unit: number;
    min: number;
};
const defaultOptions = { unit: 75, min: 3 };
const regEx = /(\d+)px/g;
/**
 * Replace all css rules with rem and em to be px
 * Intended to be used when you have no control over the document
 * Takes baseFontSize: number, which is the base font size - TODO: default this to 16
 *
 * @api public
 */
export function jssPxToRem(options = {} as Options) {
    const { unit, min } = { ...defaultOptions, ...options };
    function onProcessStyle(style, rule) {
        if (rule.type !== 'style') {
            return style;
        }

        for (const key in style) {
            let val = style[key];
            if (typeof val !== 'string') {
                continue;
            }

            const match = val.match(regEx);
            if (!match) {
                continue;
            }

            for (const item of match) {
                const item_val = Number(item.slice(0, -2));
                if (min && item_val <= min) {
                    continue;
                }
                const new_val = parseFloat((item_val / unit).toFixed(4));
                val = val.replace(item, new_val + 'rem');
            }
            style[key] = val;
        }

        return style;
    }

    function onChangeValue(value, prop) {
        if (typeof value !== 'string') {
            return value;
        }

        const match = value.match(regEx);
        if (!match) {
            return value;
        }

        for (const item of match) {
            const item_val = Number(item.slice(0, -2));
            const new_val = item_val / unit;
            if (min && new_val <= min) {
                continue;
            }
            value = value.replace(item, new_val + 'rem');
        }
        return value;
    }

    return {
        onProcessStyle,
        onChangeValue,
    };
}
