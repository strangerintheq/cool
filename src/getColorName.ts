import nearestColor from 'nearest-color';
import {colornames} from "color-name-list";

export const getColorName = nearestColor.from(colornames.reduce((o, color) => {
    o[color.name] = color.hex;
    return o;
}, {}));
