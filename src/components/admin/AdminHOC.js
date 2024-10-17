import React from 'react'
import AdminSideBar from './AdminSideBar'

const AdminHOC = (OldComponent) => {
 return function EnhancedComponent (){
    return <>
    <AdminSideBar />
    <OldComponent />
    </>
 }
}

export default AdminHOC