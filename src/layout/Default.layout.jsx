import React from 'react'
import Navbar from "../components/Navbar/Navbar.Component"

const DefaultLayoutHoc = (Component) => ({...props}) => {
    return (
        <div>
            <Navbar />
            <Component {...props} />
            <div>Footer</div> {/* Dummy Value */}
        </div>
    )
}

export default DefaultLayoutHoc