import React from 'react';
import ThemeProvider from './src/components/theme/theme-context'
import './src/styles/global.css'
require('preline')

export const wrapRootElement = ({ element }) => (
    <ThemeProvider>
        {element}
    </ThemeProvider>
);