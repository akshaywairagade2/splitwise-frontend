import react, { useEffect } from "react"
import Header from "../../Header/Header";
import Home from "./home";
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!userInfo) navigate('/login')
    }, [userInfo])

    return (
        <>
            <Header />
            <Home />
        </>
    )
}

export default Homepage;