import React from 'react';


const Rank = ({username, entries}) => {
    return (
        <div>
            <div className='white f3'>
                {`Hello ${username}, your current rank is ...`}
            </div>
            <div className='white f3'>
                {`#${entries}`}
            </div>
        </div>
    )
}

export default Rank;