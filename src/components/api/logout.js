import { useAuthContext } from '../context/authContext'
import Toaster from './Toaster'

const logout = async() => {
    const {setAuthUser} = useAuthContext()
 try {
    const response = await fetch('/logout',{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data = response.json()
    if(!response.ok){
        Toaster({status:'error', message:data.message})
    }else{
        setAuthUser(null)
        Toaster({status:'success', message:data.message})
    }
 } catch (error) {
    Toaster({status:'error', message:'Server Error'})
 }
}

export default logout