import React from "react";

function CorrectIcon({ width = 16, height = 16, ...props }) {
    return (
        <svg width={width} height={height} viewBox="0 0 24 20" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
        <path d="M21.0312 0.96875C21.6406 1.53125 21.6406 2.51562 21.0312 3.07812L9.03125 15.0781C8.46875 15.6875 7.48438 15.6875 6.92188 15.0781L0.921875 9.07812C0.3125 8.51562 0.3125 7.53125 0.921875 6.96875C1.48438 6.35938 2.46875 6.35938 3.03125 6.96875L8 11.8906L18.9219 0.96875C19.4844 0.359375 20.4688 0.359375 21.0312 0.96875Z" fill="#44B556"/>
        </svg>
        


    );
}

export default CorrectIcon;
