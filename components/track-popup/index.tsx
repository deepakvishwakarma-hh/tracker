import React from 'react'
import { motion } from "framer-motion"
import TagsCustomization from '../tag-custmization'
import { __storeHourTrack } from '../../lib/firebase';

const Popup = ({ store }: any) => {

    function showHourSelections() {
        const hours = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
        if (store.tracks.length !== 0) {
            const trackedHours = store?.tracks[0].trackedHours.map((track: any) => track.hour) ?? [];
            const forHoursSelection = hours.filter(h => !trackedHours.includes(h))
            return forHoursSelection
        }
        return hours
    }

    const initialInputValues = { hour: showHourSelections()[0], activity: "", tag: "" }
    const [inputs, setInputs] = React.useState(initialInputValues)
    const [isTagPopupToggled, setTagPopupToggled] = React.useState(false)


    function onInputChange(event: any) {
        const { name, value } = event.target
        setInputs(prev => { return { ...prev, [name]: value.trim() } })
    }

    function isEmpty(obj: any) {
        return Object.keys(inputs).some((key) => obj[key] === '')
    }

    async function onStore() {
        if (isEmpty(inputs)) return alert('please fill everything!');
        __storeHourTrack(inputs, () => {
            alert('track published.')
        })
    }


    return (
        <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }} className=' z-50  bg-white flex items-center justify-center h-full w-full fixed top-0 left-0 '>
            <div id="updtor" className='p-10'>
                <h1 className='text-center text-2xl font-light py-2'>📌</h1>

                <div className="flex flex-col">
                    <p className='text-xs text-gray-400'>When you were.</p>
                    <div className="flex my-1">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-200">
                            🕐
                        </span>

                        <select value={inputs.hour} name="hour" onChange={onInputChange} id="small" className="block px-5 md:px-10 w-full text-sm text-gray-900 bg-gray-50 rounded-none rounded-r-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500">
                            {showHourSelections().reverse().map((hour: string) => <option key={hour} value={hour}>{hour}</option>)}
                        </select>
                    </div>
                    <p className='text-xs text-gray-400'>What were you doing.</p>

                    <div className="flex my-1">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-200">
                            🚀
                        </span>
                        <textarea rows={5} onChange={onInputChange} name="activity" id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-200 p-2.5 " placeholder="what was you doing" ></textarea>

                    </div>
                    <p className='text-xs text-gray-400'>Tags must be an accordion to your activity.</p>

                    <div className="flex my-1">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-200">
                            🏷️
                        </span>
                        <select name="tag" onChange={onInputChange} id="small" className="block px-5 md:px-10 w-full text-sm text-gray-900 bg-gray-50 rounded-none  border border-gray-200 focus:ring-blue-500 focus:border-blue-500">
                            <option selected value="default">Choose tag</option>
                            {store?.tags?.map((tag: any, index: number) => <option key={index} value={tag.name}>{tag.name}</option>)}
                        </select>

                        <button onClick={() => { setTagPopupToggled(true) }} className='flex-1 w-full bg-gray-500 rounded-none rounded-r-lg px-4 text-xs text-white capitalize'>Customize</button>

                    </div>
                </div>

                <button onClick={onStore} className='w-full block mt-2 bg-black rounded md:mx-2 py-3 text-white px-5 text-xs'>Store</button>

                <div className='flex '>
                    {isTagPopupToggled && <TagsCustomization onClose={() => { setTagPopupToggled(false) }} store={store} />}
                </div>

            </div>
        </motion.div>

    )
}





export default Popup