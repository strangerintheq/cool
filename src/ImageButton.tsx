import * as React from "preact/compat";
import {useEffect, useRef} from "preact/compat";
import {css} from "./Css";
import {Color} from "./CoolStore";

const div = document.createElement('div`')

css(`<style>
    svg.button {
        stroke-width: 1;
        cursor: pointer;
        /*transition: 200ms;*/
        border-radius: 6px;
    }
    svg.button:hover {
        /*transform: scale(1.1);*/
        /*stroke-width: 1.5;*/
        background-color: #fff4;
    }
</style>`)

export function ImageButton({className, src, onClick, color, size = 32, pad = 3, onPointerDown}:{
    src: string;
    onClick?;
    onPointerDown?;
    color: Color;
    size?: number;
    pad?: number;
    className?:string;
}) {

    const ref = useRef();
    useEffect(() => {
        fetch(src).then(r => r.text()).then(r => {
            div.innerHTML = r;
            //@ts-ignore
            ref.current.innerHTML = div.querySelector("svg").innerHTML;
        })
    }, [src]);
    return <svg
        onPointerDown={onPointerDown}
        className={"button " + className}
        onClick={onClick}
        width={size}
        height={size}
        viewBox={[0-pad,0-pad,24+pad*2,24+pad*2].join(" ")}
        fill={'none'}
        stroke={color}
        ref={ref}
    />;
}