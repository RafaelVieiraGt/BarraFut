
import { MapContainer, TileLayer,Marker, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useRef, useEffect } from 'react';

import L from 'leaflet'


function Map({quadra,setQuadra,setLatitude, setLongitude}){

    const[position, setPosition] = useState([-22.497944, -48.550522])
    const[verificador, setVerificador] = useState('')
    const mapRef = useRef(null);

    useEffect(()=> {
            
            function inputAction(){
                console.log(quadra)
                let input = document.getElementById('activated')
                if(verificador !==''){
                   input.style.display = 'none'
                }else{
                    setQuadra('')
                    input.style.display = 'inline-block'
                    
                }
            }
           

            inputAction();
        
    }, [verificador])

    //Icone de marcação do mapa
    const defaultMarkerIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
    function LocationMarker() {
        const map = useMapEvents({
          click(e) {
            const { lat, lng } = e.latlng;
            setLatitude(lat);
            setLongitude(lng);
            setPosition([lat, lng])
            setVerificador('')
          },
        });
    
        return (
          <Marker position={position} icon={defaultMarkerIcon}>

          </Marker>  // Adicione um marcador padrão ou remova conforme necessário
        );
    }
    const quadras =[
        {nome: "AABB", latitude: -22.49779994417697, longitude: -48.555141816910286},
        {nome: "Ginásio municipal", latitude:-22.491449307743224, longitude: -48.55227191691056},
        {nome: "Igaraçu Park", latitude: -22.502232843222497, longitude: -48.56214564059412},
        {nome: "Clube de Campo", latitude: -22.533032064812954, longitude: -48.52901631639042},
        {nome: "Quadra da avenida", latitude: -22.498891873695424, longitude: -48.55737008840395},
        {nome: "quadra da Mirim", latitude: -22.49130115240299, longitude: -48.559858687450856}

    ]

    const handleSelectChange = (e) => {
        
        const selectedQuadra = quadras.find((loc) => loc.nome === e.target.value);
        if (selectedQuadra) {
            mapRef.current.setView([selectedQuadra.latitude, selectedQuadra.longitude], 16);
            setLatitude(selectedQuadra.latitude)
            setLongitude(selectedQuadra.longitude)
            setPosition([selectedQuadra.latitude, selectedQuadra.longitude]);
            setQuadra(selectedQuadra.nome)
            setVerificador('none')
        }
      };
   
    
    return (
        <div className='maparea'>
            <MapContainer ref={mapRef} center={[-22.497944, -48.550522]} zoom={16} style={{ width: '400px', height: '400px', maxWidth: '100%', maxHeight: '100%' }}  >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker />
            </MapContainer>
            <div className='areasProntas'>
                <select onChange={handleSelectChange}>
                    {quadras.map((loc)=> (
                        <option key={loc.nome} value={loc.nome}>{loc.nome}</option>
                    ))}
                </select>
                <div id='activated' className='inputarea'>
                    <label>Digite o nome da quadra</label>
                    <input type='text' value={quadra}  onChange={(e)=> setQuadra(e.target.value)} />
                </div>
            </div>
           
        </div>
        
    );
}

export default Map