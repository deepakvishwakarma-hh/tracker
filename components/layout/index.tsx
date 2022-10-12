import React from "react"
import { motion, AnimatePresence } from "framer-motion"

import { useRouter } from "next/router"

const Layout = ({ children }: any) => {
    const router = useRouter()
    const [isMenuVisible, setMenuVisiblity] = React.useState(false)
    return (
        <>
            <AnimatePresence>
                {
                    isMenuVisible && <motion.div
                        exit={{ top: -100 }}
                        initial={{ top: -100 }}
                        animate={{ top: 60, transition: { duration: .3 } }}
                        className="fixed left-0 w-full py-2 z-30  bg-white shadow-md" >
                        <div className="flex flex-col">
                            <button onClick={() => router.push('/')} style={{ color: router.pathname == "/" ? 'blue' : 'black' }} className="flex-1 py-3 text-xs text-center text-gray-500 focus:outline-none">Home</button>
                            {['tracks'].map((ele: string) => <button onClick={() => router.push(ele)} style={{ color: router.pathname.includes(ele) ? 'blue' : 'black' }} key={ele} className="flex-1 py-3 text-xs text-center text-gray-500 capitalize focus:outline-none">{ele}</button>)}
                        </div>
                    </motion.div>
                }
            </AnimatePresence>

            <header style={{ height: "60px" }} className={`w-full z-50 0 fixed top-0 left-0 flex bg-white items-center ${!isMenuVisible && 'shadow-sm'} pl-5 justify-between`}>

                <h1 className="font-mono font-bold text-lg">Tracker </h1>

                <nav className="flex  h-full bg-gray-50">

                    <button onClick={() => setMenuVisiblity(!isMenuVisible)} className="h-full px-5 focus:outline-none" >

                        {!isMenuVisible
                            ? (<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                            </svg>)
                            : (<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>)}

                    </button>
                </nav>
            </header>
            <main>
                <div id="blank-space-for-floating-header" style={{ height: "60px" }} className="bg-red-100"> blank space for floating header</div>
                <div>{children}</div>
            </main>
            <footer className="p-5 ">
                <p className="text-gray-500 text-xs">Develped by Deepak vishwakarma , HH</p>
            </footer>

        </>

    )
}

export default Layout