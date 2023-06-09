import React from 'react'
import { Header } from '../components';
import main from '../assests/img/main.jpg';
import "./Services.css";

const Services = () => {
    return (
        <div className='services'>
            <Header />

            <div className='container' style={{backgroundImage: "url('main.jpg')"}}>
                <div>hello</div>
            </div>
            
        </div>

    )
}

export default Services