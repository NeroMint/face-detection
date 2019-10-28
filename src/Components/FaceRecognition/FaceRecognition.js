import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({img, box}) => {
    return (
        <div className='center'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='Faces' src={img} width='500px' height='auto'/>
                {
                    box.map((info,i) => {
                        return(
                            <div key={i} className='bounding-box' style={{top:info.topRow, right: info.rightCol, bottom:info.bottomRow, left:info.leftCol}}></div>
                       );   
                    })
                } 
            </div>
        </div>
    )
}

export default FaceRecognition;