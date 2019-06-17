'use strict';

import React from 'react';

export default (__html: string, props: { width: string, height: string, viewBox: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox={ `0 0 ${ props.width } ${ props.height }` }
    width={ props.width }
    height={ props.height }
    dangerouslySetInnerHTML={ { __html } } />
);
