import React from 'react'
import CreateTab from './crateNewTab'
import CustomizeTab from "./customizeTab"
const TagsCustomization = ({ onClose, store }: { onClose: () => void, store: any }) => {

    const [tab, setTab] = React.useState<'create new' | 'customize'>('create new')


    const activeTabButtonStyle = { borderBottom: "2px blue solid", color: "blue" }

    function changeTab(event: any) {
        setTab(event.target.innerHTML.toLowerCase())
        console.log(tab)
    }


    return (
        <div className='fixed top-0 left-0 md:bg-gray-200 bg-white flex items-center justify-center w-full h-screen bg-opacity-50'>


            <div className=' w-96 bg-white  p-10 pt-5 rounded md:shadow-lg'>

                <h1 className='text-xl text-center font-medium py-4'>Tags Customization</h1>

                <div className="text-sm mb-5 font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px  justify-center">
                        <li className="mr-2">
                            <a onClick={changeTab} style={tab === "create new" ? activeTabButtonStyle : {}} className={"inline-block px-4 py-2 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 "}>Create New</a>
                        </li>
                        <li className="mr-2">
                            <a onClick={changeTab} style={tab === "customize" ? activeTabButtonStyle : {}} className="inline-block px-4 py-2 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 " >Customize</a>
                        </li>

                    </ul>
                </div>

                <div style={{ height: '300px' }}>

                    {tab == 'create new' ? <CreateTab /> : <CustomizeTab store={store} />}

                    <button onClick={onClose} className='mt-2 w-full p-1.5 tracking-wide text-sm    border-2 border-gray-500 text-gray-800 font-medium  rounded '>Close</button>

                </div>


            </div>


        </div>
    )
}
export default TagsCustomization