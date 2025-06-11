import emui from "../../../assets/emiu.png";
import mechatronic from "../../../assets/mechatronic.jpeg";
import rotaract from "../../../assets/Rotaract.jpeg";
import ade from "../../../assets/three2.jpeg";
import dev from "../../../assets/three3.jpeg";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Qouts() {
  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2]);

  // Cycles each element’s position (center → bottom1 → bottom).
  const handleNext = () => {
    setPositionIndexes((prevIndexes) =>
      prevIndexes.map((ele) => (ele + 1) % 3)
    );
  };

  const QoutsArray = [
    <div className="
    max-sm:w-full
    min-h-50 max-h-70 shadow-xl w-[54%] py-8 px-5 text-center bg-white rounded-xl left-1/2 relative -translate-x-1/2 flex justify-center items-center">
      <p className="text-gray-400 text-[12px] tracking-wider text-center">
        "The brightest horizons for our school's endeavors are shaped not by what we face, but by the fire we ignite within ourselves to participate."
      </p>
    </div>,
    <div className="
    max-sm:w-full
    min-h-50 max-h-70 shadow-xl w-[54%] py-8 px-5 text-center bg-white rounded-xl left-1/2 relative -translate-x-1/2 flex justify-center items-center" >
      <p className="text-gray-400 text-[12px] tracking-wider text-center">
       Stepping into a new club means stepping beyond your comfort zone—into opportunities, challenges, and growth.
      </p>
    </div>,
    <div className="min-h-50 max-h-70 shadow-xl w-[54%] py-8 px-5 text-center bg-white rounded-xl left-1/2 relative -translate-x-1/2 flex justify-center items-center
    max-sm:w-full
    ">
      <p className="text-gray-400 text-[12px] tracking-wider text-center">
       "The only limit to our realization of tomorrow is our doubts of today." <br />- Franklin D. Roosevelt .

      </p>
    </div>,
  ];

  // Three “positions” we cycle through for each quote
  const positions = ["center", "bottom1", "bottom"];

  // Each position is layered/staggered with different scale, y-offset, and opacity.
  const QoutsVariants = {
    center: {
      y: "0%",
      scale: 1,
      zIndex: 50,
      opacity: 1,
    },
    bottom1: {
      y: "10%",
      scale: 0.95,
      zIndex: 40,
      opacity: 0.8,
    },
    bottom: {
      y: "20%",
      scale: 0.9,
      zIndex: 30,
      opacity: 0.6,
    },
  };

  return (
    <section className="container w-full flex flex-col mt-6 relative">
      {/* Background Blur / Gradient */}
      <span className="w-full h-screen bg-gradient-to-b from-violet-100 to-white filter blur-3xl absolute z-10" />

      <div className="z-30 flex flex-col w-full space-y-7 mt-6 relative">
        <h1 className="w-full text-center font-bold text-3xl text-gray-600">
          Trusted by Agencies <br /> & Store Owners
        </h1>
        <div className="flex w-full h-130 absolute z-40 top-0">
          {/* Left side images */}
          <div className="flex flex-col justify-evenly w-[20%]">
            <img src={emui} alt="emui" className="rounded-full size-20 self-end shadow-lg " />
            <img src={mechatronic} alt="mechatronic" className="rounded-full size-10 shadow-lg" />
            <img src={rotaract} alt="rotaract" className="rounded-full size-15 self-center shadow-lg" />
          </div>

         
          <div className="w-[70%] flex flex-col items-center justify-center relative z-50 ">
            {QoutsArray.map((qout, index) => (
              <motion.div
                key={index}
                className="absolute"
                initial="center"
                animate={positions[positionIndexes[index]]}
                variants={QoutsVariants}
                transition={{ duration: 0.5 }}
                style={{ width: "100%" }}
              >
                {qout}
              </motion.div>
            ))}
            <button
              className="btn z-50 absolute top-[80%] left-[70%] size-12 rounded-full text-sm
              animate-bounce
              "
              onClick={handleNext}
            >
              Next
            </button>
          </div>

          {/* Right side images */}
          <div className="flex flex-col justify-evenly w-[20%]">
            <img src={ade} alt="ade" className="rounded-full size-20 shadow-lg" />
            <img src={rotaract} alt="rotaract" className="rounded-full size-10 shadow-lg self-end" />
            <img src={dev} alt="dev" className="rounded-full size-15 self-center shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
