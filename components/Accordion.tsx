// Building Accordian 

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Accordian = ({ children }: any) => {

    console.log(children)

    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div className="mb-1">
            <AnimatePresence>
                <motion.div
                    key="question"
                    onClick={() => setIsOpen(!isOpen)}>
                    <motion.div>
                        {children[0]}
                    </motion.div>
                </motion.div>

                {isOpen && (
                    <motion.div
                        key="answer"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 0.5,
                            },
                        }}
                        exit={{ opacity: 0 }}>
                        {children[1]}
                    </motion.div>
                )
                }
            </AnimatePresence >
        </motion.div >
    );
};

export default Accordian