import {create, StoreApi, UseBoundStore} from "zustand";
import {hex2rgb, hsl2rgb, rgb2hex, rgb2hsl} from "./colorFunctions";

export type CoolStoreType = UseBoundStore<StoreApi<CoolStore>>;

export type Color = `#${string}`

export type Palette = Color[];

export type CoolStoreInitialData = {
    palette: Palette;
}

export type CoolStore = CoolStoreInitialData & {
    isLocked: boolean[];
    isShades: boolean[];
    sort: number[];
    sortingIndex: number;
    setPalette(palette: Palette);
    lock(index: number);
    deleteColor(index: number);
    shades(index: number);
    randomizeNotLocked();
    randomizeSingle(index: number);
    setColor(index:number, color:Color);
    setSort(sort: number[]);
    applySort(width: number);
    setSortingIndex(index: number);
    insert(index: number);
}

type Mode = 'isLocked' | 'isShades';

export function createCoolStore({palette}: CoolStoreInitialData): CoolStoreType {
    return create<CoolStore>((
        set,
        get
    ) => {

        function setColor(index: number, color: Color) {
            const palette = [...get().palette];
            palette[index] = color;
            set({palette, isShades: palette.map(x => false)});
        }

        return {

            palette,
            isLocked: palette.map(() => false),
            isShades: palette.map(() => false),
            sort: palette.map(() => 0),
            sortingIndex: -1,

            setPalette(palette: Palette) {
                set({palette, isShades: palette.map(x => false)});
            },

            lock(index: number) {
                const isLocked = [...get().isLocked];
                isLocked[index] = !isLocked[index];
                set({isLocked});
            },

            shades(index: number) {
                set({isShades: get().palette.map((_, i) => i === index)});
            },

            randomizeNotLocked() {
                const {palette, isLocked} = get();
                set({
                    palette: generatePalette(palette, isLocked),
                    isShades: palette.map(x => false)
                });
            },

            randomizeSingle(index: number) {
                setColor(index, randomColor());
            },

            deleteColor(index: number) {
                const palette = [...get().palette];
                palette.splice(index, 1)
                set({palette})
            },

            setSort(sort: number[]) {
                set({sort, isShades: get().palette.map(x => false)});
            },

            applySort(width: number) {
                const {sort, palette, isLocked} = get();
                const tmp = palette
                    .map((x: Color, i: number) => [x, isLocked[i]])
                    .sort((a: [Color, boolean], b: [Color, boolean]) => {
                        let ia = palette.indexOf(a[0] as Color);
                        let ib = palette.indexOf(b[0] as Color)
                        return (ia*width+sort[ia]) - (ib*width+sort[ib])
                    }) as [Color, boolean][];
                set({
                    palette: tmp.map(x => x[0]),
                    isLocked: tmp.map(x => x[1]),
                    sort: palette.map(x => 0),
                    sortingIndex: -1,
                })
            },

            setSortingIndex(sortingIndex: number){
                set({sortingIndex})
            },

            insert(index: number) {
                const palette = [...get().palette];
                const [ar, ag, ab] = hex2rgb(palette[index]);
                const [br, bg, bb] = hex2rgb(palette[index + 1]);
                const r = ar / 2 + br / 2;
                const g = ag / 2 + bg / 2;
                const b = ab / 2 + bb / 2;
                const newColor = rgb2hex(r, g, b);
                palette.splice(index + 1, 0, newColor)
                set({palette})
            },

            setColor

        };
    });
}

function randomColor(): Color {
    return `#${[...Array(6)].map(x => ((Math.random() * 16) | 0).toString(16)).join("")}`;
}

function generatePalette(palette: Color[], isLocked: boolean[]): Palette {
    return palette.map((color, index) => isLocked[index] ? color : randomColor());
}

function lerpAngleDeg(start, end, t) {
    // 1. Находим разницу между углами
    let difference = (end - start) % 360;

    // 2. Нормализуем остаток в диапазон от -360 до 360
    let shortestPath = ((2 * difference) % 360) - difference;

    // 3. Считаем результат и приводим строго к диапазону [0, 360)
    let result = start + shortestPath * t;
    return (result % 360 + 360) % 360;
}
