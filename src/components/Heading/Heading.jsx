import React from 'react';
import '../../asset/css/Heading.css'

const Heading = ({children}) => {
  return (
    <div className='heading'>
      {children}
    </div>
  );
}

export default Heading;
