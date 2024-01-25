import { useState } from 'react';
import Header from '../../Components/Header';
import './create.css'
import Map from '../../Components/Mapa';
import api from '../../Services/api';
import { toast } from 'react-toastify';
import Footer from '../../Components/Footer';


function CreateFut(){

    const[title, setTitle] = useState('')
    const organizador = localStorage.getItem('@username')
    const idOrganizador = localStorage.getItem('@userid')
    const[modalidade, setModalidade] = useState('')
    const[vagas, setVagas] =useState(0)
    const[quadra, setQuadra] = useState('custom')
    const[latitude, setLatitude] = useState(null)
    const[longitude, setLongitude] = useState(null)
    const[data, setData] = useState('')

    const valueSelect = ["Futsal", "Campo", "Society"]


    async function handleSubmit(){
        if(title && organizador && idOrganizador && modalidade && vagas && quadra && latitude && longitude && data){
            

            await api.post('/fut', {
                titulo: title,
                organizador,
                idOrganizador,
                modalidade,
                vagas,
                quadra,
                longitude,
                latitude,
                data
            })
            .then(()=> {
                toast.success("Jogo cadastrado com sucesso!")
                setTitle('')
                setModalidade('')
                setVagas(0)
                setQuadra('')
                setLatitude(null)
                setLongitude(null)
                setData('')
                
            })
            .catch((error) => {
                toast.error("algo deu errado!")
                setTitle('')
                setModalidade('')
                setVagas(0)
                setQuadra('')
                setLatitude(null)
                setLongitude(null)
                setData('')
                
                console.log(error)
            })
        }
        else(
            toast.info("Preencha todos os campos!")
        )
    }
    return(
        <div className='container-create'>
            <Header />
            <main>
                <form className='conteudo-main' onSubmit={handleSubmit}>
                    <header>
                        <h1>Bora jogar!?</h1>
                        <span>Preencha as informações para cadastrar seu jogo.</span>
                    </header>
                    <div className='inputarea'>
                        <label>Nome do game</label>
                        <input value={title} onChange={(e)=> setTitle(e.target.value)} type='text' maxLength={100} placeholder='Nome da sua pelada'/>
                    </div>

                    <div className='inputarea'>
                        <label>modalidade</label>
                        <select id='selectModalidade' value={modalidade} onChange={(e) => setModalidade(e.target.value)}>
                            {valueSelect.map((value)=> (
                                <option value={value}>{value}</option>
                            ))}
                        </select>
                    </div>

                    <div className='inputarea'>
                        <label>Vagas</label>
                        <input value={vagas} onChange={(e)=> setVagas(e.target.value)} maxLength={100} type='number'/>
                    </div>

                    <div className='inputarea' id='mapa'>
                        <label>Selecione a melhor quadra</label>
                        <Map quadra={quadra} setQuadra={setQuadra} setLatitude={setLatitude} setLongitude={setLongitude}/>
                    </div>

                    <div className='inputarea'>
                        <label>Data</label>
                        <input value={data} onChange={(e)=> setData(e.target.value)} type='date' placeholder='xx/xx/xxxx'/>
                    </div>

                    <button type='submit'>Criar Fut</button>
                </form>
            </main>
            <Footer/>
        </div>
    )
}

export default CreateFut;