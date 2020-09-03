import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div>
            <h2>Unauthorized Access!</h2>
            <p>You need to be logged in to do that. Please <Link to = "/">Log in</Link></p>
        </div>
    );
};

export default Unauthorized;