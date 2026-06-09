import * as React from "preact/compat";
import {Cool} from "./Cool";
import {CoolStoreType} from "./CoolStore";
import {Toolbar} from "./Toolbar";
import {Design} from "./Design";

export function App({store}:{store: CoolStoreType}) {
    const design = store(x => x.design);
    const main = <Cool store={store}/>
    return <div style={{
        display: 'grid',
        height: '100%',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '30px 1fr'
    }}>
        <Toolbar store={store} />
        {
            design ? <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr'
            }}>
                {main}
                <Design store={store}/>
            </div>: main
        }
    </div>
}