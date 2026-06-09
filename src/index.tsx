import * as React from "preact";
import {render} from "preact/compat";
import {Cool} from "./Cool";
import {createCoolStore, Palette} from "./CoolStore";

const store = createCoolStore({
    palette: ["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"]
})
store.subscribe((state) => {
    history.replaceState({}, document.title, document.location.origin +
        "?" + state.palette.map(x => x.substring(1)).join("-"))
})
try {
    const palette = document.location.href.split("?")[1]
        .split("-").map(x => "#"+x) as Palette;
    store.getState().setPalette(palette)
} catch (e) {
    store.getState().randomizeNotLocked()
}


render(<Cool store={store}/>, document.body);