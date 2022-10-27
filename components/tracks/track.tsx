import React from "react"
import Accordion from "../Accordion"
import TagsDetails from "./tagDetails"


interface props {
    data: { trackedHours: any[], date: string },
    home?: undefined | boolean,
    context?: any
}

const Track = ({ data, home = false, context }: props) => {

    const percentage = Math.floor(data.trackedHours.length / 24 * 100)
    const [isDiscriptionToggled, toggleDiscription] = React.useState(home)

    console


    return (
        <section className='border-b border-gray-100'>

            {home && (
                <div style={{ width: "100%" }} className="p-8 bg-purple-100">
                    <h2 className="text-sm capitalize py-1">Tracked Percentage</h2>
                    <div className="flex items-center">
                        <div className="w-full bg-white rounded-full h-1">
                            <div className="bg-blue-600 h-1 rounded-full" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <span className='text-xs ml-2 text-gray-500 '>{percentage}%</span>
                    </div>
                </div>
            )}

            {!home && (
                <header
                    className='flex items-center justify-between h-16 px-5'
                    onClick={() => toggleDiscription(!isDiscriptionToggled)}
                    style={{ background: isDiscriptionToggled ? 'rgba(0, 0, 255, 0.040)' : 'none' }}>

                    <div className='flex items-end'>
                        <h2 className='text-3xl'>{data.date[0] + data.date[1]}</h2>
                        <h3 className='text-xs ml-1 text-purple-500'>{data.date[3] + data.date[4]}M</h3>
                        <h4 className='text-xs ml-1 text-gray-500'>{data.date[6] + data.date[7] + data.date[8] + data.date[9]}Y</h4>
                    </div>

                    <div style={{ width: "100px" }} className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <span className='text-xs ml-2 text-gray-500'>{percentage}%</span>
                    </div>

                </header>
            )}

            {isDiscriptionToggled && (
                <>
                    <main className='flex flex-col pl-9 pr-5'>
                        <ol className="relative border-l border-gray-200 ">
                            {data.trackedHours.map((ele: any, index: number) => <Component key={index} ele={ele} />)}
                        </ol>
                    </main>
                    <Accordion>
                        <header className="px-8 py-3 uppercase font-medium bg-gray-100 tracking-wide text-sm">+ Tags Usage</header>
                        <main className="px-8 py-2 bg-gray-50">
                            <TagsDetails trackedHours={data.trackedHours} />
                        </main>
                    </Accordion>

                </>
            )}
        </section >
    )
}


export default Track

const Component: (props: { ele: any }) => JSX.Element = ({ ele }) => {

    const [state, setState] = React.useState(false)
    function opposeState() { setState(prev => !prev) }

    const T = ele.tag === 'sleeping'

    const classes = {
        child: "flex items-end",
        child__hour: "text-2xl font-medium text-gray-900",
        activity: "mb-4  text-xs font-normal text-gray-400 ",
        wrapper: T ? "my-5 ml-4 bg-green-100 p-1.5 rounded" : "my-5 ml-4",
        child__tag: T ? " ml-2 mb-1 text-xs font-normal tracking-wider text-green-500" : " ml-2 mb-1 text-xs font-normal tracking-wider text-purple-500",
        listStyle: T ? "absolute w-3 h-3 bg-green-500 rounded-full mt-1.5 -left-1.5 border border-white" : "absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white",
    }

    return (
        <>
            <li onClick={opposeState} className={classes.wrapper}>
                <div className={classes.listStyle}></div>
                <div className={classes.child}>
                    <h3 className={classes.child__hour}>{ele.hour}</h3>
                    <time className={classes.child__tag}>#{ele.tag}</time>
                </div>
                <p className={classes.activity}>{ele.activity}</p>





            </li>
            {state &&
                <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }} className=' z-50  bg-black flex items-center justify-center h-full w-full fixed top-0 left-0 bg-opacity-30 p-10 '>

                    <div className="flex flex-col bg-white p-5 rounded-sm">

                        <div className="flex">
                            <h3 className="flex-1 p-5">{ele.hour}</h3>
                            {/* <time className="flex-1 p-5">#{ele.tag}</time> */}


                        </div>


                        <button onClick={opposeState}>close</button>

                    </div>



                </motion.div>}
        </>
    )
}


import { motion } from "framer-motion"

import { Consumer } from "../../pages/tracks"