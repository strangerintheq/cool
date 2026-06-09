import * as React from "preact/compat";
import {CoolStoreType} from "./CoolStore";
import {useMemo, useState} from "preact/compat";

export function Design({store}:{store: CoolStoreType}) {
    const palette = store(x => x.palette)
    const [seed, setSeed] = useState(0)
    const rnd = useMemo(() => {
        return [...Array(25)].map(() => [Math.random() * 20, Math.random() * 20]);
    },[seed]);
    return <svg viewBox={"-10 -10 120 120"} onClick={() => setSeed(Date.now())}>
        {rnd.map(([rx,ry], i) => {
            let x = i%5
            let y = (i/5)|0
            return <rect ry={ry} rx={rx} x={x*20} y={y*20} width={20} height={20} fill={palette[i%palette.length]}/>
        })}
    </svg>
}