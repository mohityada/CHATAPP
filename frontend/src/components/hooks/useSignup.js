import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';

const useSignup = () => {
    const [loading, setloading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const signup = async({fullName, userName, password, confirmPassword, gender}) => {
        const success = handleInputErrors({fullName, userName, password, confirmPassword, gender});
        if(!success) return;
        
        setloading(true);
        try{
            const res = await fetch( "/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({fullName, userName, password, confirmPassword, gender}),
            });
            const data = await res.json()
            if(data.error){
                throw new Error(data.error);
            }
            //localStorage //so that we can see from inspect that we are logged in
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
        } catch(error){
            toast.error(error.message)
        } finally{
            setloading(false)
        }
    };
    return {loading, signup}
}

export default useSignup

function handleInputErrors({fullName, userName, password, confirmPassword, gender}){
    if(!fullName || !userName || !password || !confirmPassword || !gender){
        toast.error('Please fill in all fields')
        console.log(fullName, userName, password, confirmPassword, gender);
        return false
    }
    if(password !== confirmPassword){
        toast.error('Passwords do not match')
        return false
    }
    if(password.length < 6){
        toast.error('Password must be atleast 6 characters')
        return false
    }
    return true
}