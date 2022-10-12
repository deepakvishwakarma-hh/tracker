import React from "react"

import { __publishTag } from "../../lib/firebase"


const CreateTab = () => {

    const initial = { name: "", message: "" }

    const [input, setInput] = React.useState(initial)
    const [isPending, setPending] = React.useState(false)

    function onInputChange(event: any) {
        const { name, value } = event.target
        setInput(prev => { return { ...prev, [name]: value } })
    }


    async function onPublish() {
        if (input.name == "" || input.message == "") return alert('Please input something!');
        setPending(true)
        __publishTag(input, () => { setPending(false) })

        setInput(initial)
    }

    return (
        <>
            <div className="flex m-1">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    #
                </span>
                <input onChange={onInputChange} name="name" type="text" id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="tag name" value={input.name as any} />
            </div>

            <textarea onChange={onInputChange} name='message' rows={4} className="mt-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..." value={input.message as any} ></textarea>

            <div className="flex flex-col mt-2">
                <button style={{ cursor: isPending ? 'wait' : 'pointer' }} onClick={onPublish} className='w-full p-2  tracking-wide text-sm  mx-1  bg-black text-white rounded'>{isPending ? 'Publishing...' : 'Publish'}</button>
            </div>
        </>
    )
}



export default CreateTab