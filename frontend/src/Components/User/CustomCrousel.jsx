import React, { useState } from "react";

function CustomCarousel({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const slideNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const slidePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] flex justify-center items-center overflow-hidden">
      {/* Slide Container */}
      <div className="flex w-full h-full justify-center items-center">
        {children.map((child, index) => {
          const position =
            index === activeIndex
              ? "z-10 scale-100 opacity-100"
              : index === (activeIndex + 1) % children.length
              ? "z-5 scale-90 opacity-70 translate-x-[20%] md:translate-x-[30%]"
              : index === (activeIndex - 1 + children.length) % children.length
              ? "z-5 scale-90 opacity-70 -translate-x-[20%] md:-translate-x-[30%]"
              : "hidden";

          return (
            <div
              key={index}
              className={`absolute transition-all duration-500 transform w-[90%] md:w-[70%] h-[85%] rounded-lg overflow-hidden bg-gray-300 shadow-lg ${position}`}>
              {child}
              {/* Navigation Buttons on Active Slide */}
              {index === activeIndex && (
                <>
                  <button
                    onClick={slidePrev}
                    className="absolute text-2xl md:text-5xl left-5 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full hover:bg-opacity-70">
                    {"<"}
                  </button>
                  <button
                    onClick={slideNext}
                    className="absolute text-2xl md:text-5xl right-5 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full hover:bg-opacity-70">
                    {">"}
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CustomCarousel;
