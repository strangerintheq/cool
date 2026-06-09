import * as React from "preact/compat";
import {ImageButton} from "./ImageButton";
import {Color, CoolStoreType} from "./CoolStore";
import {RefObject} from "preact";

//@ts-ignore
import lrArrow from "./icons/left-right-arrow.svg?raw"

export function SortButton({index, store, color, refObj}: {
    index: number;
    store: CoolStoreType;
    color: Color;
    refObj: RefObject<HTMLDivElement>
}) {
    const setSort = store(x => x.setSort);
    const applySort = store(x => x.applySort);
    const setSortingIndex = store(x => x.setSortingIndex);
    const palette = store(x => x.palette);

    function startMove(e) {
        function move(e1) {
            setSortingIndex(index)
            const node = refObj.current as HTMLDivElement;
            const width = node.clientWidth;
            const n = palette.length;
            let dx = e1.clientX - e.clientX;
            dx = Math.min(dx, width * (n - index - 1));
            dx = Math.max(dx, -width * (index));
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
            const node = refObj.current as HTMLDivElement;
            applySort(node.clientWidth)
        }

        addEventListener("pointerup", up);
        addEventListener("pointermove", move);
    }
    return <ImageButton
        className={"sort"}
        color={color}
        src={lrArrow}
        onPointerDown={startMove}
    />
}