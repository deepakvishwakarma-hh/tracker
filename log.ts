const Style: any = {
    base: [
        "color: #fff",
        "background-color: #444",
        "padding: 2px 4px",
        "border-radius: 2px"
    ],
    warning: [
        "color: #eee",
        "background-color: red"
    ],
    success: 'color: white; background: green; font-size: 12px'
}

const log = (style: 'base' | 'warning' | 'success', text: any) => {
    console.log(`-------------------${style}---------------------`)
    console.log(`%c${JSON.stringify(text)}`, Style[style]);
}




export default log