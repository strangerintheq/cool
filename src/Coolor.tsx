import * as React from "preact/compat";
import {CoolStoreType} from "./CoolStore";
import {ImageButton} from "./ImageButton";
import {getLuminance, hex2rgb} from "./colorFunctions";
import {css} from "./Css";
import { colornames } from 'color-name-list';
import  nearestColor  from 'nearest-color';

css(`
    div.coolor:hover svg.button {
        opacity: 1;
    }
    div.coolor svg.button {
        opacity: 0;
    }
`)

const colorMap = colornames.reduce((o, color) => {
    o[color.name] = color.hex;
    return o;
}, {});

// Configure matcher
const getColorName = nearestColor.from(colorMap);

export function Coolor({index, store}: {
    index: number,
    store: CoolStoreType
}) {

    const palette = store(x => x.palette);
    const lock = store(x => x.lock);
    const isLocked = store(x => x.isLocked)[index];
    const randomizeSingle = store(x => x.randomizeSingle);
    const shades = store(x => x.shades);
    const dark = getLuminance(...hex2rgb(palette[index])) > 0.5;
    const name = getColorName(palette[index]);
    const color = dark ? "#000000" : "#ffffff"
    return <div className={"coolor"} style={{
        // transition: `200ms`,
        backgroundColor: palette[index],
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }}>
        <ImageButton
            color={color}
            src={'src/icons/shuffle.svg'}
            onClick={() => randomizeSingle(index)}
        />
        <ImageButton
            color={color}
            src={'src/icons/adjustments.svg'}
            onClick={() => shades(index)}
        />
        <ImageButton
            color={color}
            src={'src/icons/palette.svg'}
        />
        <ImageButton
            color={color}
            src={isLocked ? 'src/icons/lock.svg' : 'src/icons/unlock.svg'}
            onClick={() => lock(index)}
        />
        <div style={{fontFamily: "monospace", userSelect: 'none', marginTop: 40, color}}>
            {name.name}
            {/*({name.distance.toFixed(1)})*/}
        </div>
    </div>
}
