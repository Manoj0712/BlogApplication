import React from 'react';
import {useThemeContext} from '../hooks/useThemeContext';

export default function ThemeSwitch() {

    const { theme, dispatch } = useThemeContext()

    const switchTheme = () => {
        if (theme === "light") {
            dispatch({ type: "DARK" })
        } else {
            dispatch({ type: "LIGHT" })
        }
    }
    return (
        <div className='flex items-start pl-24 pt-5'>
            <input type="checkbox" role="switch" onClick={switchTheme} />
        </div>
    );
} 