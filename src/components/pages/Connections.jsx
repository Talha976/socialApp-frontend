import React, { useEffect, useState } from 'react'
import Toaster from '../commonComponents/Toaster'
import avatar  from '../images/avatar.png'
import WithHeader from '../commonComponents/HOC'

const Connections = () => {
    const [connections, setConnections] = useState([])

    useEffect(()=>{
        getConnections()
    },[connections])

    const getConnections = async()=>{
      try {
        const response = await fetch('/get-connections', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }   
        })
        const data = await response.json()
        if(response.ok){
            setConnections(data)
        }
      } catch (error) {
        Toaster({status: 'error', message: error.message})
      }
    }
  return (
    <div className="mt-14 container mx-auto p-5">
        <div>
            <h2>Connections</h2>
            <div className='flex flex-col lg:flex-row gap-2'>
            {connections.map(connection=>(
                <div key={connection._id} className='flex flex-col rounded-md p-5 items-center justify-center bg-white shadow-md'>
                    <img src={connection.sender?.profileImage || avatar} alt="Profile Image"
                     className='w-28 h-28 rounded-full bg-cover bg-center' />
                    <h3>{connection.sender?.firstName} {connection.sender?.lastName}</h3>
                </div>
            ))}
            </div>
        </div>
    </div>
  )
}

export default WithHeader(Connections)