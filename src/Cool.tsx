import * as React from "preact";
import {CoolStoreType} from "./CoolStore";
import {Coolor} from "./Coolor";
import {useEffect} from "preact/compat";
import {Shades} from "./Shades";

export function Cool({store}:{store: CoolStoreType}) {
    const palette = store(x => x.palette)
    const isShades = store(x => x.isShades)
    const randomizeNotLocked = store(x => x.randomizeNotLocked)
    useEffect(() => {
        const keydown = e => e.code === "Space" && randomizeNotLocked();
        addEventListener("keydown", keydown);
        return () => removeEventListener("keydown", keydown);
    });
    return <div style={{
        height: '100%',
        display: 'grid',
        gridTemplateRows: '1fr',
        gridTemplateColumns: palette.map(x => '1fr').join(" ")
    }}>
        {palette.map((_, index) => {
            return isShades[index] ?
                <Shades index={index} store={store}/> :
                <Coolor index={index} store={store}/>;
        })}
    </div>
}