export function css(cssText) {
    let style = document.createElement("style")
    style.innerHTML = cssText
    document.head.appendChild(style)
}