import React from 'react'
import './Card.css'
function Card({email,timestamp,message, image}) {
    return (
        <div className="card">
            <img src={image} alt="Avatar" style={{ width: '100%' }} />
            <div className="container">
                <h4><b>{message}</b></h4>
                <p>{email}</p>
                <p>{new Date(timestamp?.toDate()).toLocaleString()}</p>
            </div>
        </div>

    )
}

export default Card
