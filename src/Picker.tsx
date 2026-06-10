import {CoolStoreType} from "./CoolStore";
import * as React from "preact/compat";
import {useState} from "preact/compat";
import {hex2rgb, rgb2hsl} from "./colorFunctions";

function Slider({value, onChange}) {
    return <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <input type="range" value={value*100} step={0.1} min={0} max={100} onChange={onChange}/>
    </div>;
}

export function Picker({index, store}: {
    index: number;
    store: CoolStoreType;
}) {
    const color = store(x=> x.palette)[index];

    const [hsl, setHsl] = useState(rgb2hsl(...hex2rgb(color)))

    function move(e) {
        let x = e.offsetX / e.target.clientWidth;
        let y = e.offsetY / e.target.clientHeight;
        setHsl([y,x, hsl[2]]);
    }

    return <div style={{
        display: 'grid',
        gridTemplateRows: "30px 30px 30px 1fr",
        backgroundColor: `hsl(${hsl[0]*360}, ${hsl[1]*100}%, ${hsl[2]*100}%)`
    }}>
        <Slider value={hsl[0]} onChange={(e) => setHsl([e.target.value / 100, hsl[1], hsl[2]])}/>
        <Slider value={hsl[1]} onChange={(e) => setHsl([hsl[0], e.target.value/100, hsl[2]])}/>
        <Slider value={hsl[2]} onChange={(e) => setHsl([hsl[0], hsl[1], e.target.value/100])}/>
        <div onMouseMove={move}/>
    </div>
}