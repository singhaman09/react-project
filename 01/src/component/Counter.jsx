
import React, { useState } from "react";

const Counter=(props) =>{
    const [count, setCount]=useState(0);

    return(
        <div className="counter">
            <p>You have clicked {count} times</p>
            <button id="btn" onClick={ ()=>{setCount(count+1)}}>Click me</button>

        </div>
    )
}

export default Counter