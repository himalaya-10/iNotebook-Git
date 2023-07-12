import React from 'react'

export default function Alert(props) {
    return (
        <div className="sticky-top"style={{height: '50px'}}>
        {
            props.msg&&<div className="alert alert-success" role="alert">
                {props.msg}
                </div>
        }
        </div>
    )
}
