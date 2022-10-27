import React from "react";
import { motion } from "framer-motion"


class Popup extends React.Component<any, any> {
    render() {
        return (
            <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }} className=' z-50  bg-white flex items-center justify-center h-full w-full fixed top-0 left-0 '></motion.div>
        )
    }

}