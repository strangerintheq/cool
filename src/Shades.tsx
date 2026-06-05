import * as React from "preact/compat";
import {CoolStoreType} from "./CoolStore";
import {hex2rgb, hsl2rgb, isGray, isSameColor, rgb2hex, rgb2hsl} from "./colorFunctions";
import {css} from "./Css";

css(`<style>
    .shade {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .shade div, 
    .shade.current:hover .current {
        display: none;
    }
    .shade.current .current, 
    .shade:hover .code {
        display: unset;
    }
</style>`)

export function Shades({index, store, count = 24}: {
    index: number;
    count?: number;
    store: CoolStoreType;
}) {
    const color = store(x => x.palette)[index]
    const setColor = store(x => x.setColor)
    const cells = [...Array(count)].map((_, i) => i);
    return <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: cells.map(() => '1fr').join(" ")
    }}>
        {cells.map(i => {
            const backgroundColor = calcShade(color, i / (count - 1));
            return <div
                className={`shade ${isSameColor(backgroundColor, color) ? "current" : ""}`}
                style={{backgroundColor}}
                onClick={() => setColor(index, backgroundColor)}
            >
                <div className={"current"}>---</div>
                <div className={"code"}>{backgroundColor.substring(1)}</div>
            </div>;
        })}
    </div>
}

function calcShade(color, i) {
    const rgb = hex2rgb(color);
    if (isGray(...rgb))
        return rgb2hex(1-i, 1-i, 1-i);
    const [h,s,l] = rgb2hsl(...rgb);
    return rgb2hex(...hsl2rgb(h, s,1-i));
}