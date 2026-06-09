import * as React from "preact/compat";
import {CoolStoreType} from "./CoolStore";

export function Design({store}:{store: CoolStoreType}) {
    const palette = store(x => x.palette)
    return <svg viewBox={"-10 -10 120 120"}>
        {[...Array(25)].map((_, i) => {
            let x = i%5
            let y = (i/5)|0
            return <rect ry={Math.random()*20} rx={Math.random()*20} x={x*20} y={y*20} width={20} height={20} fill={palette[i%palette.length]}/>
        })}
    </svg>
}