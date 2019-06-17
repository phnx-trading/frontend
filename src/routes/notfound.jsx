'use strict';

import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="page-not-found">
      <p>Page not found.</p>
      <p><Link to="/sites">Click here to view sites</Link></p>
    </div>
  );
};

export default NotFoundPage;
