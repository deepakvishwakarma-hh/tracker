const COLOR_NAMES = [
    "DeepSkyBlue",
    "Aqua",
    "DarkOrange",
    "DarkGray",
    "DarkCyan",
    "DarkGreen",
    "DarkKhaki",
    "DarkBlue",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrchid",
    "DarkRed",
    "Blue",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "DarkGoldenRod",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "Green",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Ivory",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
];

const TagsDetails = ({ trackedHours }: any) => {
    function getTagDetails() {
        let T: any = {}
        for (let index = 0; index < trackedHours.length; index++) {
            const element = trackedHours[index];
            if (Object.keys(T).includes(element.tag)) {
                T[element.tag] = T[element.tag] + 1;
            } else {
                T[element.tag] = 1
            }
        }

        for (let index = 0; index < Object.keys(T).length; index++) {
            T[Object.keys(T)[index]] = T[Object.keys(T)[index]] / trackedHours.length * 100
        }

        return T
    }




    const usedTagDetails = getTagDetails()
    return (
        <footer >
            <div className=" flex mb-2  w-full bg-gray-200 rounded-full border border-gray-300 overflow-hidden h-2 dark:bg-gray-700">
                {Object.keys(usedTagDetails).map((tag: any, index: number) => {
                    return (
                        <div key={index} className=" h-2" style={{ width: `${usedTagDetails[tag]}%`, background: COLOR_NAMES[index] }}></div>
                    )
                })}
            </div>

            <div className='flex flex-wrap'>
                {Object.keys(usedTagDetails).map((tag: any, index: number) => {
                    return (
                        <div key={index} className="text-sm capitalize flex m-1 items-center" >
                            <div className='pr-2 text-xl text-center' >
                                <div className='w-3 h-3 rounded-full' style={{ background: COLOR_NAMES[index] }}>
                                </div>
                            </div>
                            <h5 className='font-bold pr-2 text-xs'>{tag}</h5>
                            <h5 className='text-gray-300 text-xs'>{parseFloat(usedTagDetails[tag]).toFixed(2)} %</h5>
                        </div>
                    )
                })}
            </div>
        </footer>
    )
}
export default TagsDetails