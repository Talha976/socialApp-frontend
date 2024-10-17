import React from "react"
import Navbar from "./Navbar"

    const WithHeader = (OldComponent) =>{
     return function EnhancedComponent (){

     return  <>
        <Navbar />
        <OldComponent />
       </>
      }
    }

export default WithHeader