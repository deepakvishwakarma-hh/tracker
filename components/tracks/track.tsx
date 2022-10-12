import React from "react"
import Accordion from "../Accordion"
import TagsDetails from "./tagDetails"


interface props {
    data: { trackedHours: any[], date: string },
    home?: undefined | boolean
}

const Component = ({ data, home = false }: props) => {

    const percentage = Math.floor(data.trackedHours.length / 24 * 100)
    const [isDiscriptionToggled, toggleDiscription] = React.useState(home)

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
                            {data.trackedHours.map((ele: any, index: number) => {
                                if (ele.tag === 'sleeping') {
                                    return (<li key={index} className="my-5 ml-4 bg-green-100 p-1.5 rounded">
                                        <div className={`absolute w-3 h-3 bg-green-500 rounded-full mt-1.5 -left-1.5 border border-white`}></div>
                                        <div className='flex items-end '>
                                            <h3 className="text-2xl font-medium text-gray-900">{ele.hour}</h3>
                                            <time className=" ml-2 mb-1 text-xs font-normal tracking-wider text-green-500">#{ele.tag}</time>
                                        </div>
                                        <p className="mb-4  text-xs font-normal text-gray-400 ">{ele.activity}</p>
                                    </li>)
                                }
                                return (<li key={index} className="my-5 ml-4">
                                    <div className={`absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white`}></div>
                                    <div className='flex items-end '>
                                        <h3 className="text-2xl font-medium text-gray-900">{ele.hour}</h3>
                                        <time className=" ml-2 mb-1 text-xs font-normal tracking-wider text-purple-500">#{ele.tag}</time>
                                    </div>
                                    <p className="mb-4  text-xs font-normal text-gray-400 ">{ele.activity}</p>
                                </li>)
                            }
                            )}
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


export default Component




