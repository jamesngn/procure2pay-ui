/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';

export const buildProvidersTree = componentsWithProps => {
  const initialComponent = ({ children }) => <>{children}</>;

  return componentsWithProps.reduce((AccumulatedComponents, [Provider, props = {}]) => {
    return ({ children }) => (
      <AccumulatedComponents>
        <Provider {...props}>{children}</Provider>
      </AccumulatedComponents>
    );
  }, initialComponent);
};
