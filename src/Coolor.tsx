import * as React from "preact/compat";
import {CoolStoreType} from "./CoolStore";
import {ImageButton} from "./ImageButton";
import {getLuminance, hex2rgb} from "./colorFunctions";
import {css} from "./Css";
import {colornames} from 'color-name-list';
import nearestColor from 'nearest-color';
import {useEffect, useMemo, useRef} from "preact/compat";

css(`<style>
    div.coolor:hover svg.button {
        opacity: 1;
    }
    div.coolor svg.button {
        opacity: 0;
    }
</style>`)

const colorMap = colornames.reduce((o, color) => {
    o[color.name] = color.hex;
    return o;
}, {});

// Configure matcher
const getColorName = nearestColor.from(colorMap);

export function Coolor({index, store}: {
    index: number,
    store: CoolStoreType
}) {

    const ref = useRef();
    const palette = store(x => x.palette);
    const deleteColor = store(x => x.deleteColor);
    const lock = store(x => x.lock);
    const isLocked = store(x => x.isLocked)[index];
    const randomizeSingle = store(x => x.randomizeSingle);
    const shades = store(x => x.shades);
    const dark = getLuminance(...hex2rgb(palette[index])) > 0.5;
    const name = useMemo(() => getColorName(palette[index]), [palette, index]);
    const color = dark ? "#000000" : "#ffffff";
    const sortingIndex = store(x => x.sortingIndex);
    const offset = store(x => x.sort)[index]
    const setSort = store(x => x.setSort);
    const applySort = store(x => x.applySort);
    const setSortingIndex = store(x => x.setSortingIndex);

    function startMove(e) {
        function move(e1) {
            setSortingIndex(index)
            const node = ref.current as HTMLDivElement;
            const width = node.clientWidth;
            const n = palette.length;
            let dx = e1.clientX - e.clientX;
            dx = Math.min(dx, width * (n - index - 1));
            dx = Math.max(dx, -width * (index));
            // node.style.transition = `0s`;
            node.style.zIndex = "100";
            setSort(palette.map((_, i) => {
                if (i === index)
                    return dx;
                if (i > index && dx > (i - index - 0.5) * width)
                    return -width;
                else if (i < index && dx < -(index - i - 0.5) * width)
                    return width;
                return 0
            }))
        }

        function up() {
            removeEventListener("pointerup", up)
            removeEventListener("pointermove", move)
            const node = ref.current as HTMLDivElement;
            node.style.zIndex = "0"
            // node.style.transition = `200ms`;
            applySort(node.clientWidth)
        }

        addEventListener("pointerup", up);
        addEventListener("pointermove", move);
    }

    return <div ref={ref} className={"coolor"} style={{
        transform: `translate(${offset}px)`,
        transition: sortingIndex !== -1 && sortingIndex!==index ? `200ms` : '0ms',
        backgroundColor: palette[index],
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        zIndex: 0
    }}>
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
        <ImageButton
            color={color}
            src={'src/icons/left-right-arrow.svg'}
            onPointerDown={startMove}
        />
        <ImageButton
            color={color}
            src={'src/icons/palette.svg'}
        />
        <ImageButton
            color={color}
            src={isLocked ? 'src/icons/lock.svg' : 'src/icons/unlock.svg'}
            onClick={() => lock(index)}
        />
        <div style={{fontFamily: "monospace", userSelect: 'none', marginTop: 40, color}}
             onClick={() => {
                 //@ts-ignore
                 const eyeDropper = new EyeDropper();
                 eyeDropper.open()
                     .then(result => {
                         console.log("Выбранный цвет:", result.sRGBHex);
                     })
                     .catch(e => {
                         console.log("Пользователь отменил выбор или произошла ошибка");
                     });
             }}
        >
            {name.name}
            {/*({name.distance.toFixed(1)})*/}
        </div>
    </div>
}
