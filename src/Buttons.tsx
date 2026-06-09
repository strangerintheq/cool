import React = require("preact/compat");
import {ImageButton} from "./ImageButton";
import {Color, CoolStoreType} from "./CoolStore";
import {RefObject} from "preact";
import {SortButton} from "./SortButton";

//@ts-ignore
import lockIcon from "./icons/lock.svg?raw"
//@ts-ignore
import unlockIcon from "./icons/unlock.svg?raw"
//@ts-ignore
import paletteIcon from "./icons/palette.svg?raw"
//@ts-ignore
import trashIcon from "./icons/trash.svg?raw"
//@ts-ignore
import shuffleIcon from "./icons/shuffle.svg?raw"
//@ts-ignore
import adjustmentsIcon from "./icons/adjustments.svg?raw"

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
            src={trashIcon}
            onClick={() => deleteColor(index)}
        />
        <ImageButton
            disabled={isLocked[index]}
            color={color}
            src={shuffleIcon}
            onClick={() => randomizeSingle(index)}
        />
        <ImageButton
            disabled={isLocked[index]}
            color={color}
            src={adjustmentsIcon}
            onClick={() => setShadesIndex(index)}
        />
        <ImageButton
            disabled={isLocked[index]}
            color={color}
            src={paletteIcon}
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
            src={isLocked[index] ? lockIcon : unlockIcon}
            onClick={() => toggleLockIndex(index)}
        />
    </>
}