import './login.css'
import { useState } from 'react'
import { faUser, faEnvelope, faLock  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../Services/firebaseconnection'
import { useNavigate } from 'react-router-dom'
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
function LoginRegister(){

    const[btnStage, setBtnStage] = useState("register");
    const[nome, setNome] = useState("")
    const[email, setEmail] = useState("")
    const[senha, setSenha] = useState("")
    const[view, setView] = useState(false)

    const navigate = useNavigate()

    function changeBtn(){

        if(btnStage === "login"){
            handleSubmit(new Event('submit'));
        }else{
            let title = document.getElementById('title')
            let namefield = document.getElementById('namefield')
            let signupbtn = document.getElementById('signupbtn')
            let signinbtn = document.getElementById('signinbtn')
            namefield.style.maxHeight = "0";
            title.innerHTML = "Fazer Login";
            signupbtn.classList.add("disable")
            signinbtn.classList.remove('disable')
            setBtnStage("login")
        }
        
    }
    function changeBtn2(){
        if(btnStage ==="register"){
            handleSubmit(new Event('submit'));
        }else{
            let title = document.getElementById('title')
            let namefield = document.getElementById('namefield')
            let signupbtn = document.getElementById('signupbtn')
            let signinbtn = document.getElementById('signinbtn')
            namefield.style.maxHeight = "60px";
            title.innerHTML = "Cadastre-se"
            signupbtn.classList.remove('disable')
            signinbtn.classList.add('disable')
            setBtnStage("register")
        }
        

    }

    //SUBMIT
    async function handleSubmit(e){
        e.preventDefault()
         if(btnStage === 'register'){
            await createUserWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                

                localStorage.setItem("@username", nome)
                localStorage.setItem("@userid", userCredential.user.uid)
                
                
            })
           .catch((error)=> console.log(error))

           await updateProfile(auth.currentUser, {displayName: nome})
           .then(()=>{
            navigate('/feed')
           })
           .catch((error)=>console.log(error))
         }

         if(btnStage === 'login'){
            
            await signInWithEmailAndPassword(auth, email, senha)
            .then((value)=> {
                let idUser = value.user.uid
                let nomeUser = value.user.displayName
                

                localStorage.setItem("@username", nomeUser)
                localStorage.setItem("@userid", idUser)

                navigate('/feed')
            })
            .catch((error)=> console.log(error))
         }
    }

    function handleSeePassword(){
        let input = document.getElementById('passwd')
        setView(true)
        input.type = "text"
        
    }

    function handleHidePassword(){
        let input = document.getElementById('passwd')
        setView(false)
        input.type = "password"

    }
    return(
        <div className='container-login'>
            <div className='animation'>
                <span className='first'>/</span>
                <span className='slide'>
                    <span className='second'>Barra Fut</span>
                </span>
            </div>
            <div className='formbox'>
                
                <h1 id='title'>Cadastre-se</h1>
                <form onSubmit={handleSubmit}>
                    <div className='inputgroup'>
                        <div className='inputfield' id='namefield'>
                            <FontAwesomeIcon icon={faUser} size={25}/>
                            <input
                             type='text'
                             placeholder='Nome'
                             value={nome}
                             onChange={(e) => setNome(e.target.value)}
                             />
                        </div>

                        <div className='inputfield'>
                            <FontAwesomeIcon icon={faEnvelope} size={25}/>
                            <input
                             type='email'
                              placeholder='E-mail'
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              />
                        </div>

                        <div className='inputfield'>
                            <FontAwesomeIcon icon={faLock} size={25}/>
                            <input
                                id='passwd'
                             type='password'
                              placeholder='Senha'
                              value={senha}
                              onChange={(e) => setSenha(e.target.value)}
                              />

                                {!view ? (<FaRegEyeSlash onClick={handleSeePassword} className='viewPassword' size={25}/>) : <IoEyeSharp size={25} className='viewPassword' onClick={handleHidePassword} />}
                              
                        </div>
                    </div>
                    <div className='btnfield'>
                        <button  type="button" id='signupbtn' onClick={changeBtn2}>Cadastrar</button>
                        <button type="button" id='signinbtn' className='disable' onClick={changeBtn}>Fazer Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginRegister