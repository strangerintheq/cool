import * as React from "preact/compat";
import {CoolStoreType} from "./CoolStore";
import {getLuminance, hex2rgb} from "./colorFunctions";
import {css} from "./Css";
import { useMemo, useRef} from "preact/compat";
import {getColorName} from "./getColorName";
import {Insert} from "./Insert";
import {Buttons} from "./Buttons";

css(`<style>
    div.coolor:hover {
        z-index: 1;
    }
    div.coolor {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 100px 1fr 100px;
    }
    div.coolor div.center-part {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    div.coolor div.center-part div.buttons,
    div.coolor div.bottom-part {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    div.coolor.sorting svg.button,
    div.coolor.sorting:hover svg.button {
        opacity: 0;
    }
    div.coolor.sorting:hover svg.button.sort {
        opacity: 1;
        background-color: #fff4;
    }
    div.coolor:hover svg.button {
        opacity: 1;
    }
    div.coolor svg.button {
        opacity: 0;
    }
</style>`)

export function Coolor({index, store}: {
    index: number,
    store: CoolStoreType
}) {
    const ref = useRef();
    const palette = store(x => x.palette);
    const sortingIndex = store(x => x.sortingIndex);
    const offset = store(x => x.sort)[index]
    const color = useMemo(() => getLuminance(...hex2rgb(palette[index])) > 0.5 ? "#000000" : "#ffffff", [palette, index]);
    const name = useMemo(() => getColorName(palette[index]), [palette, index]);
    const className = `coolor ${sortingIndex !== -1 ? "sorting": ""}`;
    const style = {
        transform: `translate(${offset}px)`,
        transition: sortingIndex !== -1 && sortingIndex!==index ? `200ms` : '0ms',
        backgroundColor: palette[index],
    };
    return <div ref={ref} className={className} style={style}>
        <div className={"top-part"}/>
        <div className={"center-part"}>
            {index === 0 ? <div/> : <Insert className={"left"} index={index} store={store}/>}
            <div className={"buttons"}>
                <Buttons color={color} store={store} index={index} refObj={ref}/>
            </div>
            {index === palette.length - 1 ? <div/> : <Insert className={"right"} index={index} store={store}/>}
        </div>
        <div className={"bottom-part"}>
            <div style={{fontFamily: "monospace", color}}>
                {palette[index]}
            </div>
            <div style={{fontFamily: "monospace", userSelect: 'none',  color}}>
                {name.name}
            </div>
        </div>
    </div>
}
