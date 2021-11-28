import { useEffect, useState } from 'react';
import { getUser } from '../api/auth';



export const useGetUser = async (key) => {
    const item = window.localStorage.getItem(key);

        useEffect(() => {
        if(!item){
            return false
        }
        
        return getUser()
    }, [item])
        


  

    
}