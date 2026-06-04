import {create, StoreApi, UseBoundStore} from "zustand";

export type Color = `#${string}`

export type Palette = Color[];

export type CoolStoreInitialData = {
    palette: Palette;
}

export type CoolStore = CoolStoreInitialData & {
    isLocked: boolean[];
    isShades: boolean[];
    setPalette(palette: Palette);
    lock(index: number);
    shades(index: number);
    randomizeNotLocked();
    randomizeSingle(index: number);
}

type Mode = 'isLocked' | 'isShades';

export function createCoolStore({palette}: CoolStoreInitialData) : UseBoundStore<StoreApi<CoolStore>>{
    return create<CoolStore>((
        set,
        get
    ) => {

        function mode(index: number, mode: Mode) {
            const isMode = [...get()[mode]];
            isMode[index] = !isMode[index];
            set({[mode]:isMode});
        }

        return {

            palette,
            isLocked: palette.map(() => false),
            isShades: palette.map(() => false),

            setPalette(palette: Palette) {
                set({palette});
            },

            lock(index: number) {
                mode(index, "isLocked");
            },

            shades(index: number) {
                mode(index, "isShades");
            },

            randomizeNotLocked() {
                const {palette, isLocked} = get();
                set({palette: generatePalette(palette, isLocked)});
            },

            randomizeSingle(index: number) {
                const palette = [...get().palette];
                palette[index] = randomColor()
                set({palette});
            }

        };
    });
}

function randomColor(): Color {
    return `#${[...Array(6)].map(x => ((Math.random()*16)|0).toString(16)).join("")}`;
}

function generatePalette(palette: Color[], isLocked: boolean[]): Palette {
    return palette.map((color, index) => isLocked[index] ? color : randomColor());
}

