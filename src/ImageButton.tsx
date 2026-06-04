import * as React from "preact/compat";
import {useEffect, useRef} from "preact/compat";
import {css} from "./Css";

const div = document.createElement('div`')

css(`
    svg.button {
        stroke-width: 1;
        cursor: pointer;
        transition: 200ms;
    }
    svg.button:hover {
        transform: scale(1.1);
        stroke-width: 1.5;
    }
`)

export function ImageButton({src, onClick, dark}:{
    src: string;
    onClick?;
    dark:boolean
}) {
    const color = dark ? "#000000" : "#ffffff"
    const ref = useRef();
    useEffect(() => {
        fetch(src).then(r => r.text()).then(r => {
            div.innerHTML = r;
            //@ts-ignore
            ref.current.innerHTML = div.querySelector("svg").innerHTML;
        })
    });
    return <svg
        className={"button"}
        onClick={onClick}
        width={32}
        height={32}
        viewBox={"0 0 24 24"}
        fill={'none'}
        stroke={color}
        ref={ref}
    />;
}