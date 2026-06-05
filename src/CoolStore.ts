import {create, StoreApi, UseBoundStore} from "zustand";

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
    setPalette(palette: Palette);
    lock(index: number);
    deleteColor(index: number);
    shades(index: number);
    randomizeNotLocked();
    randomizeSingle(index: number);
    setColor(index:number, color:Color);
    setSort(sort: number[]);
    applySort(width: number);
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

            setPalette(palette: Palette) {
                set({palette});
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
                set({palette: generatePalette(palette, isLocked)});
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
                set({sort});
            },

            applySort(width: number) {
                let {sort, palette} = get();
                palette = [...palette]

                palette.sort((a, b) => {
                    let ia = palette.indexOf(a);
                    let ib = palette.indexOf(b)
                    return (ia*width+sort[ia]) - (ib*width+sort[ib])
                })
                set({palette, sort: palette.map(_ => 0)})
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

