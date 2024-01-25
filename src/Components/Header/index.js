import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.css"
import '../../Pages/LoginRegister/login.css'
import { signOut } from "firebase/auth";
import { auth } from "../../Services/firebaseconnection";

function Header({getData, getMyFuts}){

    async function handleLogout(){
        await signOut(auth)
        localStorage.clear()
    }   
    

    const navigate = useNavigate()
    const location = useLocation()
    return(
        <div className="header" >
            <div  onClick={()=> {
                if(location.pathname === '/feed'){
                    getData()
                }else{
                    navigate('/feed')
                }
                
            }}
            className='animation' id="headerAnimation">
                <span className='first' >/</span>
                <span className='slide'>
                    <span className='second'>Barra Fut</span>
                </span>
            </div>
            <nav>
                <Link to='/createfut'>Criar partida</Link>
                <button onClick={getMyFuts}>Meus jogos</button>
                <button onClick={handleLogout}>Sair</button>
            </nav>
        </div>
    )
}

export default Header;