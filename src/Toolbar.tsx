import {CoolStoreType} from "./CoolStore";
import * as React from "preact/compat";
import {ImageButton} from "./ImageButton";
import { getPalette } from 'colorthief';

//@ts-ignore
import undoIcon from "./icons/undo.svg?raw"
//@ts-ignore
import redoIcon from "./icons/redo.svg?raw"
//@ts-ignore
import shuffleIcon from "./icons/shuffle.svg?raw"
//@ts-ignore
import photoIcon from "./icons/photo.svg?raw"
//@ts-ignore
import collageIcon from "./icons/collage.svg?raw"
import {rgb2hex} from "./colorFunctions";

export function Toolbar({store}: { store: CoolStoreType }) {
    const undo = store(x => x.undo)
    const redo = store(x => x.redo)
    const randomizeNotLocked = store(x => x.randomizeNotLocked)
    const setPalette = store(x => x.setPalette)
    const setDesign = store(x => x.setDesign)
    const design = store(x => x.design)
    function fromImage() {
        triggerImageUpload(setPalette)
    }
    return <div>
        <ImageButton src={undoIcon} color={"#000000"} onClick={undo}/>
        <ImageButton src={redoIcon} color={"#000000"} onClick={redo}/>
        <ImageButton src={shuffleIcon} color={"#000000"} onClick={randomizeNotLocked}/>
        <ImageButton src={photoIcon} color={"#000000"} onClick={fromImage}/>
        <ImageButton src={collageIcon} color={"#000000"} onClick={() => {
            setDesign(design ? null : '25')
        }}/>
    </div>;
}

function triggerImageUpload(setPalette) {
    const imagePreview = document.createElement('img');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    fileInput.addEventListener('change', async (event) => {
        //@ts-ignore
        const file = event.target.files[0];
        const objectURL = URL.createObjectURL(file);
            imagePreview.src = objectURL;
            imagePreview.onload = async () => {
                imagePreview.style.display = 'block';
                try {
                    let p = await getPalette(imagePreview, {colorCount: 5, ignoreWhite: true, quality : 1})
                    setPalette(p.map(c => c.hex()))
                } catch (error) {
                    console.error('Error uploading image:', error);
                } finally {
                    fileInput.remove();
                    URL.revokeObjectURL(objectURL)
                }
            }
    });
    fileInput.click();
}