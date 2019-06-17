'use strict';

export const sortDesc = (key, transform = (d) => d) => {
  return (a, b) => {
    if (transform(a[key]) < transform(b[key])) return 1;
    if (transform(a[key]) > transform(b[key])) return -1;
    return 0;
  };
};

export const sortAsc = (key, transform = (d) => d) => {
  return (a, b) => {
    if (transform(a[key]) > transform(b[key])) return 1;
    if (transform(a[key]) < transform(b[key])) return -1;
    return 0;
  };
};
