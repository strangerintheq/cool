import * as React from "preact/compat";
import {Color, CoolStore} from "./CoolStore";
import {StoreApi, UseBoundStore} from "zustand";
import {useEffect} from "preact/compat";
import {ImageButton} from "./ImageButton";
import {getLuminance, hex2rgb} from "./colorFunctions";

export function Coolor({index, store}: {
    index: number,
    store: UseBoundStore<StoreApi<CoolStore>>
}) {

    const palette = store(x => x.palette);
    const lock = store(x => x.lock);
    const isLocked = store(x => x.isLocked)[index];
    const randomizeSingle = store(x => x.randomizeSingle);
    const shades = store(x => x.shades);
    const dark = getLuminance(...hex2rgb(palette[index])) > 0.5

    return <div style={{
        transition: `200ms`,
        backgroundColor: palette[index],
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }}>
        <ImageButton
            dark={dark}
            src={'src/icons/shuffle.svg'}
            onClick={() => randomizeSingle(index)}
        />
        <ImageButton
            dark={dark}
            src={'src/icons/adjustments.svg'}
            onClick={() => shades(index)}
        />
        <ImageButton
            dark={dark}
            src={'src/icons/palette.svg'}
        />
        <ImageButton
            dark={dark}
            src={isLocked ? 'src/icons/lock.svg' : 'src/icons/unlock.svg'}
            onClick={() => lock(index)}
        />
    </div>
}
