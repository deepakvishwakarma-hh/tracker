const TrackForm = ({ onInputChange, state, setTagPopupToggled }: any) => {


    return (
        <div className='fixed top-0 left-0 md:bg-gray-200  bg-white flex items-center justify-center w-full h-full bg-opacity-50'>

            <div className="flex flex-col md:flex-row">

                <div className="flex m-1">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        🕐
                    </span>
                    <input onChange={onInputChange} name="hour" type="number" id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="hour" />
                </div>

                <div className="flex m-1">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        🚀
                    </span>
                    <input onChange={onInputChange} name="activity" type="text" id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="what was you doing" />

                </div>


                <div className="flex m-1">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        🏷️
                    </span>
                    <select name="tag" onChange={onInputChange} id="small" className="block px-5 md:px-10 w-full text-sm text-gray-900 bg-gray-50 rounded-none  border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected value="default">Choose tag</option>
                        {state.map((tag: any, index: number) => <option key={index} value={tag.name}>{tag.name}</option>)}
                    </select>

                    <button onClick={() => { setTagPopupToggled(true) }} className='flex-1 w-full bg-black rounded-none rounded-r-lg px-4 text-sm text-white capitalize'>edit</button>

                </div>
            </div>

        </div>
    )
}

export default TrackForm