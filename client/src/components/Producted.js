import React from 'react'
import { Route, Redirect } from 'react-router-dom';

function Producted({component, ...rest}) {
    // console.log(rest)
    const RenderComponents = component;
    let hastoken = JSON.parse(localStorage.getItem('auth'));
    return (
        <div>
            <Route 
             {...rest}
             render = {
                 props => {
                     return hastoken !== null ? (
                     <RenderComponents {...props} />)
                     :
                     (
                        <Redirect to={{pathname:'/signin'}} />
                     )
                 }
             }
             />
        </div>
    )
}

export default Producted
