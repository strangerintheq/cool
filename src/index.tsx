import * as React from "preact";
import {render} from "preact/compat";
import {Cool} from "./Cool";
import {createCoolStore, Palette} from "./CoolStore";

const palette = "#31393c-#2176ff-#33a1fd-#fdca40-#f79824".split("-") as Palette;
const store = createCoolStore({palette})

render(<Cool store={store}/>, document.body);