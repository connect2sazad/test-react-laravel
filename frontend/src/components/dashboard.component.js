import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState();
    
    useEffect(() => {
        if(sessionStorage.getItem('user')){
            setUser(sessionStorage.getItem('user'));
        } else {
            navigate('/login');
        }
    }, [user]);
    
    return(
        <div>
            {user}
        </div>
    );
}