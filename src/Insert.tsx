import * as React from "preact/compat";
import {css} from "./Css";
import {CoolStoreType} from "./CoolStore";

css(`<style>
    div.insert {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 0 1fr 0;
    }
    div.insert > div {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        display: flex;
    }
    div.insert-button {
        display: none;
        position: absolute;
        z-index: 1;
    }
    div.insert-button circle {
        cursor: pointer;
    }
    div.insert-button path {
        pointer-events: none;
    }
    div.insert.left:hover div.left div.insert-button, 
    div.insert.right:hover div.right div.insert-button{
        display: unset;
    }
</style>`)

export function Insert({className, index, store}: {
    className: string,
    index: number,
    store: CoolStoreType
}) {
    const insert = store(x => x.insert);
    return <div className={"insert " + className}>
        <div className={"left"}>
            <InsertBtn onClick={() => insert(index)}/>
        </div>
        <div/>
        <div className={"right"}>
            <InsertBtn onClick={() => insert(index + 1)}/>
        </div>
    </div>
}

function InsertBtn({onClick}) {
    return <div className={"insert-button"}>
        <svg viewBox={"-24 -24 48 48"} width={48}>
            <circle r={20} fill={"white"} onClick={onClick}/>
            <path
                d={"M -10 0 h 20 M 0 -10 v 20"}
                fill={"none"}
                stroke={"black"}
                strokeWidth={2}
                strokeLinecap={"round"}
            />
        </svg>
    </div>
}