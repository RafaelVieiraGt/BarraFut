import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../Services/firebaseconnection";
import { Navigate } from "react-router-dom";


export default function Private({ children }){
    const [loading, setloading] = useState(true)
    const [signed, setSigned] = useState(false)

    useEffect(()=>{
        async function isSigned(){
            await onAuthStateChanged(auth, (user)=>{
                if(user){
                    setloading(false)
                    setSigned(true)
                }
                else{
                    setloading(false)
                    setSigned(false)
                }
            })
        }

        isSigned();
    }, [])
    
    if(loading){
        return(
            <div>
                
            </div>
        );
    }

    if(!signed){
        return <Navigate to="/"/>
    }

    return children
}