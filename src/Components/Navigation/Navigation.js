import React from 'react';

const Navigation = ({onRouteChange}) => {
    return (
        <nav style={{display:'flex', justifyContent: 'flex-end'}}>
            <p  
                onClick={() => {onRouteChange('signin','','',0)}}
                className='f3 link dim black underline pa3 pointer'> 
                Sign Out 
            </p>
        </nav>
    )
}

export default Navigation;