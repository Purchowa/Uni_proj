import React from 'react'

const styles = {
    cursor: "pointer"
}

const TableRow = (props) =>{
    return(
        <li
            onClick={() => props.checkAnswer(props.text, props.currentKey)}
            className={"list-group-item " + (props.markedAnswer.key === props.currentKey ? props.markedAnswer.variant : '')}
            style={styles}
        >
            {props.text}
        </li>
    )
}

export default TableRow