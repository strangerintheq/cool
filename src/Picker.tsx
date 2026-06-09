import {CoolStoreType} from "./CoolStore";
import * as React from "preact/compat";

export function Picker({index, store}: {
    index: number;
    store: CoolStoreType;
}) {
    const color = store(x=> x.palette)[index];

    function move(e) {
        let x = e.offsetX / e.target.clientWidth;
        let y = e.offsetY / e.target.clientHeight;
        e.target.style.backgroundColor = `hsl(${y*360}, ${x*100}%, 50%)`
    }

    return <div onMouseMove={move}></div>
}