import React from 'react'
import TableRow from "./table-row";
const Table = (props) => {
    return (
        <div>
            <ul className={"list-group"}>
                {
                    props.answers.map((txt, index) =>{
                        return (
                            <TableRow
                                checkAnswer={props.checkAnswer}
                                text={txt}
                                currentKey={index}
                                markedAnswer={props.markedAnswer}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Table