import Header from '../../Components/Header';
import api from '../../Services/api';
import quadraFutsal from '../../assets/quadraFutsal.jpg';
import campo from '../../assets/Campo.jpg';
import quadraSociety from '../../assets/quadraSociety.jpg';

//Icons
import { FaSearchLocation, FaCalendarDay, FaMapMarkerAlt, FaTrash } from 'react-icons/fa';
import { GiSoccerKick } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";



import './home.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Footer from '../../Components/Footer';


function Home(){

    const[futs, setFuts] = useState([])
    const[localizacao, setLocalizacao]= useState({})
    const userId = localStorage.getItem("@userid")
    

    useEffect(()=>{
        function getLoc(){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                  const userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  };
                  
                  setLocalizacao(userLocation);
                  
                });
              } else {
                console.error('Geolocalização não suportada pelo navegador.');
              }
        }
        

        getData()
        getLoc()
        
    }, [])

    
    
    async function getData(){
        const trashs = document.getElementsByClassName("iconContainer")
        const h1 = document.getElementById('titulo')
        h1.innerText = "Jogue perto de você!"
        for(let i = 0; i < trashs.length; i++){
            trashs[i].style.display = 'none'
        }
        try{
            const data = await api.get('/fut')
            setFuts(data.data)
        }catch{
            console.log("algo deu errado")
        }  
        
    }


      function calcularLoc(event) {
        try {
          const R = 6371; // Raio da Terra em quilômetros
          const lat1 = localizacao.latitude;
          const lon1 = localizacao.longitude;
          const lat2 = event.localizacao.coordinates[1];
          const lon2 = event.localizacao.coordinates[0];
      
          const dLat = (lat2 - lat1) * (Math.PI / 180);
          const dLon = (lon2 - lon1) * (Math.PI / 180);
      
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
              Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
      
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
          const distance = R * c;
      
          return distance;
        } catch (error) {
          console.error(error);
          return error.message;
        }
      }

      async function handleConfirm(id){
        let confirmadoButton = document.getElementById(id);
        let cancelarButton = document.getElementById(`12${id}345`);
        let confirmado = confirmadoButton.value
        let h1 = document.getElementById('titulo')


        cancelarButton.style.display = "inline-block"
        confirmadoButton.style.cursor = "not-allowed"
        confirmadoButton.disabled = true
        
        

        
        await api.post(`/fut/${id}`, {
            confirmado
        })
        .then(()=>{
            if(h1.innerText === "Meus jogos"){
                getMyFuts(userId)
            }else{
                getData()
            }
            
        })
        .catch((error)=>{
            console.log(error)
        })
      }

      async function handleCancel(id){
        let cancelarButton = document.getElementById(`12${id}345`)
        let confirmadoButton = document.getElementById(id)
        let confirmado = cancelarButton.value
        let h1 = document.getElementById('titulo')
        confirmadoButton.disabled = false
        confirmadoButton.style.cursor = "pointer"
        cancelarButton.style.display = "none"

        await api.post(`/fut/${id}`, {
            confirmado
        })
        .then(()=>{
            if(h1.innerText === "Meus jogos"){
                getMyFuts(userId)
            }else{
                getData()
            }
        })
        .catch((error)=>{
            console.log(error)
        })
      }
      
     const getMyFuts = async(id )=>{
        const trashs = document.getElementsByClassName("iconContainer")
        const h1 = document.getElementById('titulo')
        h1.innerText ="Meus jogos"
        for(let i = 0; i < trashs.length; i++){
            trashs[i].style.display = 'block'
        }
        
       try{
            const myFuts = await api.get(`/myfut?idOrganizador=${id}`)
            console.log(myFuts.data)
            setFuts(myFuts.data)
       }
       catch{
        console.log("erro")
       }
        
        
        
        
        
        console.log(futs)
        
      }

      async function handleExcluir(id){
        await api.delete(`fut/${id}`)

        getData()
      }
    return(
        <div className='container-feed'>
            <Header getFuts={()=>getData()} getMyFuts={ () => getMyFuts(userId, )} />
            <h1 id='titulo'>Jogue perto de você!</h1>
            <main>
                { futs.map((data)=> (
                    <article key={data._id}>
                        
                        <img src={data.modalidade === "Futsal" ? quadraFutsal : data.modalidade === "Campo" ? campo : quadraSociety} alt='imagem quadra'/>
                        <div className='infos'>
                            <div>
                                <h2>{data.titulo}</h2>
                                <span className='organizador'>{data.organizador}</span>
                            </div>
                            <div className='span-infos'>
                                <div className='list'>
                                    <ul>
                                        <li><FaSearchLocation size={20}/>{data.quadra}</li>
                                        <li><GiSoccerKick size={20}/> {data.modalidade}</li>
                                    </ul>
                                    <ul>
                                        <li><FaCalendarDay size={20}/>{data.data}</li>
                                        <li><FaPeopleGroup size={20}/> {data.vagas} Vagas</li>
                                    </ul>  
                                     
                                </div>
                                <span className='localizacao'> <FaMapMarkerAlt size={20}/>{typeof calcularLoc(data) === 'number' ? `${calcularLoc(data).toFixed(3)} Km de você!` : 'Erro ao calcular a distância'}</span>
                                <div className='buttonarea'>
                                    <button className='marcar' id={data._id} value="confirmado" onClick={() => handleConfirm(data._id)}>Vou colar!</button> 
                                    <button className='desmarcar' value="cancelado" id={`12${data._id}345`} onClick={() => handleCancel(data._id)}>Miou</button>
                                </div>
                                
                            </div>
                            
                        </div>
                        <div className='iconContainer' >
                            <FaTrash onClick={() => handleExcluir(data._id)} className='iconTrash' size={30}/>
                        </div>
                        
                    </article>
                ))}
                    
            </main>
            <Footer/>
        </div>
    )
}

export default Home 