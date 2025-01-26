import React from "react";

const CourseCard = ({ courseName, libraryName, dateTime, onAttend}) => {
    return (
        <div style={{width: 1312, height: 706, background: '#3D4240', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 150}}>
            <div style={{width: 298, height: 48, textAlign: 'center', color: '#F0F0F0', fontSize: 48, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word'}}>Course</div>

                <div style={{width: 340, height: 32, textAlign: 'center', color: '#B3B3B3', fontSize: 32, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word'}}>Library</div>
                <div style={{width: 340, height: 64, textAlign: 'center', color: '#F0F0F0', fontSize: 32, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word'}}>Library Name</div>

                <div style={{width: 340, height: 32, textAlign: 'center', color: '#B3B3B3', fontSize: 32, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word'}}>Time</div>
                <div style={{width: 340, height: 64, textAlign: 'center', color: '#F0F0F0', fontSize: 32, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word'}}>Date and Time</div>

            <textarea
                className="bg-gray-700 text-white w-full rounded-lg p-4 text-sm resize-none"
                rows="3"
                placeholder="Default description"
            ></textarea>

            <button style={{width: 352, height: 32, textAlign: 'center', color: '#F0F0F0', fontSize: 32, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word'}}>Will Attend</button>
        </div>
    )
};

export default CourseCard