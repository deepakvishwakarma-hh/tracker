import Accordian from "./Accordion"
import React from 'react'
import { __storeHourTrack } from "../lib/firebase"

const SleepingHour = ({ store }: any) => {

    const [sleepingHour, setSleepingHour] = React.useState({ from: "0", to: "0" })


    function onInputChangeForSleepingHour(event: any) {
        const { name, value } = event.target
        setSleepingHour(prev => { return { ...prev, [name]: value.trim() } })
    }

    function showHourSelections() {
        const hours = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
        if (store.tracks.length !== 0) {
            const trackedHours = store?.tracks[0].trackedHours.map((track: any) => track.hour) ?? [];
            const forHoursSelection = hours.filter(h => !trackedHours.includes(h))
            return forHoursSelection
        }
        return hours
    }


    async function onStore() {

        const Hours: number[] = [];
        const from = parseInt(sleepingHour.from),
            to = parseInt(sleepingHour.to)

        const order = from < to ? "INC" : to < from ? "DEC" : "EQL";

        if (order !== "EQL") {
            let K = Math.abs(from - to);
            let T = (order == "INC" ? from : to)
            do {
                Hours.push(K + T)
                K--
            }
            while (K != 0)
            Hours.push(T)

            console.log(Hours)

            Hours.forEach((hour) => __storeHourTrack({ hour: hour.toString(), activity: "Sleeping...", tag: "sleeping" }, () => {
                console.log('track published.')
            })
            )
        }

    }

    if (store.tracks.length == 0) { return null }


    return (
        <Accordian>
            <header className="px-8 py-3 uppercase font-medium bg-gray-100 tracking-wide text-sm rounded-md">+ Set Sleeping Time</header>
            <main className=' py-2 px-5 bg-gray-50'>

                <div className="flex">
                    <div className="flex flex-1 mr-1">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-200">
                            🌙
                        </span>

                        <select value={sleepingHour.from} name="from" onChange={onInputChangeForSleepingHour} id="small" className="block px-5 md:px-10 w-full text-sm text-gray-900 bg-gray-50 rounded-none rounded-r-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500">
                            <option value="0">from</option>
                            {showHourSelections().map((hour: string) => <option key={hour} value={hour}>{hour}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-1">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-200">
                            ☀️
                        </span>

                        <select value={sleepingHour.to} name="to" onChange={onInputChangeForSleepingHour} id="small" className="block px-5 md:px-10 w-full text-sm text-gray-900 bg-gray-50 rounded-none rounded-r-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500">
                            <option value="0">to</option>
                            {showHourSelections().map((hour: string) => <option key={hour} value={hour}>{hour}</option>)}
                        </select>
                    </div>


                </div>

                <button onClick={onStore} className='w-full block mt-2 bg-black rounded md:mx-2 py-3 text-white px-5 text-xs'>Store</button>


            </main>
        </Accordian>
    )
}

export default SleepingHour