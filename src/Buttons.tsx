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
    const palette = store(x => x.palette);
    const isLocked = store(x => x.isLocked);
    const deleteColor = store(x => x.deleteColor);
    const toggleLockIndex = store(x => x.toggleLockIndex);
    const randomizeSingle = store(x => x.randomizeSingle);
    const setShadesIndex = store(x => x.setShadesIndex);
    const setPickerIndex = store(x => x.setPickerIndex);

    return <>
        <ImageButton
            disabled={isLocked[index] || palette.length < 3}
            color={color}
            src={'src/icons/trash.svg'}
            onClick={() => deleteColor(index)}
        />
        <ImageButton
            disabled={isLocked[index]}
            color={color}
            src={'src/icons/shuffle.svg'}
            onClick={() => randomizeSingle(index)}
        />
        <ImageButton
            disabled={isLocked[index]}
            color={color}
            src={'src/icons/adjustments.svg'}
            onClick={() => setShadesIndex(index)}
        />
        <ImageButton
            disabled={isLocked[index]}
            color={color}
            src={'src/icons/palette.svg'}
            onClick={() => setPickerIndex(index)}
        />
        <SortButton
            refObj={refObj}
            color={color}
            store={store}
            index={index}
        />
        <ImageButton
            color={color}
            src={isLocked[index] ? 'src/icons/lock.svg' : 'src/icons/unlock.svg'}
            onClick={() => toggleLockIndex(index)}
        />
    </>
}