import React from 'react'

const Failed = (props) => {
    return (
        <div>
            <h1>দুঃখিত</h1>
            <h3></h3>
            <button onClick={props.onRestart}> RE-TRY </button>
        </div>
    )
}

export default Failed 