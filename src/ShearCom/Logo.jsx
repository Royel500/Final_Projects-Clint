import React from 'react';
import logo from '/logo.png'
import { motion } from "framer-motion";
const Logo = () => {
    return (

            <div className="flex items-end ">
                <img className='' 
                src={logo} alt="logo" />
                

                  <motion.label
      className="text-3xl -ml-3 font-extrabold"
      animate={{
        color: [ 

          "#e11d48", // rose
          "#3b82f6", // blue
          "#10b981", // green
          "#f59e0b", // amber
          "#8b5cf6", // violet
          "#ec4899", // pink
          "#14b8a6", // teal
          "#f43f5e", // red
          "#e11d48"]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      ProFast
    </motion.label>
            </div>
   
    );
};

export default Logo;