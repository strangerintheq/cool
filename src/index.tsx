import * as React from "preact";
import {render} from "preact/compat";
import {Color, createCoolStore, Palette} from "./CoolStore";
import {App} from "./App";

const w = "#ffffff" as Color;
const store = createCoolStore({
    palette: [w, w, w, w, w]
})

store.subscribe((state) => {
    history.replaceState({}, document.title, document.location.origin +
        "?" + state.palette.map(x => x.substring(1)).join("-"))
});

try {
    const palette = document.location.href.split("?")[1]
        .split("-").map(x => "#" + x) as Palette;

    store.getState().setPalette(palette);
} catch (e) {
    store.getState().randomizeNotLocked();
}

render(<App store={store}/>, document.body);
