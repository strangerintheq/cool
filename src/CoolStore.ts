import {create, StoreApi, UseBoundStore} from "zustand";
import {hex2rgb, hsl2rgb, rgb2hex, rgb2hsl} from "./colorFunctions";
import {generateNeon, generatePastel} from "./generate-logic/aesthetic-moods-generator.js";
import {generateSpaceDisplacement, generateTealOrange} from "./generate-logic/cinema-space-generator";
import {generateDesignSystemScale} from "./generate-logic/design-system-generator.js";
import {generateClassicGeometric, generateSplitComplementary} from "./generate-logic/geo-harmony-generator.js";
import {generateControlledChaos, generateGoldenRatio} from "./generate-logic/math-chaos-generator.js";

export type CoolStoreType = UseBoundStore<StoreApi<CoolStore>>;

export type Color = `#${string}`

export type Palette = Color[];

export type CoolStoreInitialData = {
    palette?: Palette;
}

export type DesignType = '25'

export type CoolStore = CoolStoreInitialData & {
    isLocked: boolean[];
    shadesIndex: number;
    pickerIndex: number;
    sortingIndex: number;
    sort: number[];
    design: DesignType;
    setPalette(palette: Palette);
    setSortingIndex(index: number);
    toggleLockIndex(index: number);
    setShadesIndex(index: number);
    setPickerIndex(index: number);
    deleteColor(index: number);
    randomizeNotLocked();
    randomizeSingle(index: number);
    setColor(index: number, color: Color);
    setSort(sort: number[]);
    applySort(width: number);
    insert(index: number);
    setDesign(design: DesignType);
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
            set({palette, shadesIndex: -1, sortingIndex: -1});
        }

        return {

            palette: palette,
            isLocked: palette.map(() => false),
            sort: palette.map(() => 0),
            shadesIndex: -1,
            sortingIndex: -1,
            pickerIndex: -1,
            design: null,

            setPalette(palette: Palette) {
                set({palette, shadesIndex: -1, pickerIndex: -1});
            },

            toggleLockIndex(index: number) {
                const isLocked = [...get().isLocked];
                isLocked[index] = !isLocked[index];
                set({isLocked});
            },

            setShadesIndex(shadesIndex: number) {
                set({shadesIndex});
            },

            setSortingIndex(sortingIndex: number) {
                set({sortingIndex})
            },

            setPickerIndex(pickerIndex: number) {
                set({pickerIndex})
            },

            randomizeNotLocked() {
                const {palette, isLocked} = get();
                set({
                    palette: generatePalette(palette, isLocked),
                    shadesIndex: -1,
                    pickerIndex: -1
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
                set({sort, shadesIndex: -1, pickerIndex: -1});
            },

            applySort(width: number) {
                const {sort, palette, isLocked} = get();
                const tmp = palette
                    .map((x: Color, i: number) => [x, isLocked[i]])
                    .sort((a: [Color, boolean], b: [Color, boolean]) => {
                        const ia = palette.indexOf(a[0] as Color);
                        const ib = palette.indexOf(b[0] as Color);
                        return (ia * width + sort[ia]) - (ib * width + sort[ib])
                    }) as [Color, boolean][];
                set({
                    palette: tmp.map(x => x[0]),
                    isLocked: tmp.map(x => x[1]),
                    sort: palette.map(x => 0),
                    sortingIndex: -1,
                })
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

            setDesign(design: DesignType) {
              set({design})
            },

            setColor

        };
    });
}

function randomColor(): Color {
    return `#${[...Array(6)].map(x => ((Math.random() * 16) | 0).toString(16)).join("")}`;
}

function pick<T>(arr: T[]):T {
    return arr[Math.floor(Math.random()*arr.length)]
}

function generatePalette(palette: Color[], isLocked: boolean[]): Palette {
    let baseHex = randomColor();
    let newVar = pick([
        (baseHex) => generatePastel(baseHex, palette.length),
        (baseHex) => generateNeon(baseHex, palette.length),
        (baseHex) => generateSpaceDisplacement(baseHex, palette.length),
        (baseHex) => generateDesignSystemScale(baseHex, palette.length),
        (baseHex) => generateClassicGeometric(baseHex, 'analogous', palette.length),
        (baseHex) => generateClassicGeometric(baseHex, 'mono', palette.length),
        (baseHex) => generateClassicGeometric(baseHex, 'complementary', palette.length),
        (baseHex) => generateClassicGeometric(baseHex, 'tetradic', palette.length),
        (baseHex) => generateClassicGeometric(baseHex, 'triadic', palette.length),
        (baseHex) => generateSplitComplementary(baseHex, palette.length),
        (baseHex) => generateControlledChaos(baseHex, palette.length),
        (baseHex) => generateGoldenRatio(baseHex, palette.length),
    ])(baseHex) as Palette;
    if (Math.random() > 0.5)
        return newVar.reverse()
    return palette.map((color, index) => isLocked[index] ? color : newVar[index])

    // return palette;
}

