
import './footer.css'

import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";

function Footer(){

    
    
    return(
        <footer id='footer'>
           <span>Developed by: Rafael Camilli Vieira</span>
            <div className='socialMedia'>
                <a href='https://www.linkedin.com/in/rafael-camilli-vieira-077355269/' ><FaLinkedin color='#fff' size={18}/></a>
                <a href='https://github.com/RafaelVieiraGt'><FaGithub color='#fff' size={18}/></a>
                <a href='https://rafaelvieiraportfolio.netlify.app/'><FaComputer color='#fff' size={18}/></a>
            </div>
        </footer>
    )
}

export default Footer 