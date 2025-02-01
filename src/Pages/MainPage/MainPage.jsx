import Header from "../../Components/Header"
import './MainPage.css'
import { useNavigate } from "react-router-dom"

export default function MainPage() {

    const navigate = useNavigate();

    return(
        <div>
            <section className="main">
                <div className="welcome__txt">
                    <p className="last_line">Choose<br/> a cocktail <br/>for yourself</p>
                    <button onClick={() => navigate(`/cocktail_database`)}>Go</button>
                </div>
            </section>
        </div>
        
        
    )
}