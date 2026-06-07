import React = require("preact/compat");
import {ImageButton} from "./ImageButton";
import {Color, CoolStoreType} from "./CoolStore";
import {RefObject} from "preact";
import {SortButton} from "./SortButton";

export function Buttons({index, store, color, refObj}: {
    index: number;
    store: CoolStoreType;
    color: Color;
    refObj: RefObject<HTMLDivElement>
}) {
    const isLocked = store(x => x.isLocked);
    const deleteColor = store(x => x.deleteColor);
    const lock = store(x => x.lock);
    const randomizeSingle = store(x => x.randomizeSingle);
    const shades = store(x => x.shades);

    return <>
        <ImageButton
            color={color}
            src={'src/icons/trash.svg'}
            onClick={() => deleteColor(index)}
        />
        <ImageButton
            color={color}
            src={'src/icons/shuffle.svg'}
            onClick={() => randomizeSingle(index)}
        />
        <ImageButton
            color={color}
            src={'src/icons/adjustments.svg'}
            onClick={() => shades(index)}
        />
        <SortButton
            refObj={refObj}
            color={color}
            store={store}
            index={index}
        />
        <ImageButton
            color={color}
            src={'src/icons/palette.svg'}
        />
        <ImageButton
            color={color}
            src={isLocked[index] ? 'src/icons/lock.svg' : 'src/icons/unlock.svg'}
            onClick={() => lock(index)}
        />
    </>
}