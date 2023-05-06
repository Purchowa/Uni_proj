import React, {useState} from 'react'

function Test_2(props){
    const [value, setValue] = useState(0)

    return <div>
        <p>{value}</p>
        <button className="btn btn-secondary" onClick={() => setValue(1)}>Set value</button>
    </div>
}

export default Test_2