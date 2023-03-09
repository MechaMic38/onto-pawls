/**
 * This is the main entry point for the UI. You should not need to make any
 * changes here unless you want to update the theme.
 *
 * @see https://github.com/allenai/varnish
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@allenai/varnish';
import { AuthProvider } from './context';
import '@allenai/varnish/dist/varnish.css';

import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <ThemeProvider>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </ThemeProvider>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
