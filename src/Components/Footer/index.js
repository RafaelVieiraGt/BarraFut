import { useEffect } from 'react';
import './footer.css'

import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";

function Footer(){

    
    
    return(
        <footer id='footer'>
           <div className='animation' id='footerAnimation'>
                <span className='first'>Developed by:</span>
                <span className='slide'>
                    <span className='second'> Rafael Camilli vieira</span>
                </span>
            </div>
            <div className='socialMedia'>
                <a href='https://www.linkedin.com/in/rafael-camilli-vieira-077355269/'><FaLinkedin size={25}/></a>
                <a href='https://github.com/RafaelVieiraGt'><FaGithub size={25}/></a>
                <a href='https://rafaelvieiraportfolio.netlify.app/'><FaComputer size={25}/></a>
            </div>
        </footer>
    )
}

export default Footer 