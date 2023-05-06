import React from 'react'

const Actions = (props) => {
    return (
        <div>
            <div className={"d-flex justify-content-between"}>
                {props.disablePrev ? '' : <button onClick={props.prev} className={"btn btn-danger"}>Prev</button>}
                {props.disableNext ? '' : <button onClick={props.next} className={"btn btn-success"}>Next</button>}
            </div>
        </div>
    )
}

export default Actions