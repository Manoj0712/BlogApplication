

import React from 'react';
import { useThemeContext } from '../../hooks/useThemeContext';

function Submitbutton({onclick,title}) {
const {theme} = useThemeContext()
    return (
        <div>
           <button type="submit" onClick={onclick} className={`border-2 border-black w-20 ${theme==="dark"?"bg-blue-500":"bg-red-500"} text-white`}>{title}</button>
        </div>
    );
}

export default Submitbutton;