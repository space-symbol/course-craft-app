import './app.css'
import AppRouter from "./components/app-router/AppRouter";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";
import Spinner from "./components/spinner/Spinner";
import {useNavigate} from "react-router-dom";
import {CARDS_ROUTE} from "./utils/consts";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
            setLoading(false)
            return navigate(CARDS_ROUTE)
        }).catch(e => {
            if (e.response.status !== 401){
                return e
            }
        }).finally(() => setLoading(false))

    }, [])

    if (loading) {
        return <Spinner/>
    }
    return (
        <div className="app">
            <Header/>
            <Footer/>
            <AppRouter/>
        </div>
    );
});

export default App;
