const style = document.createElement("div")
export function css(cssText) {
    style.innerHTML = cssText
    document.head.appendChild(style.querySelector("style"))
}