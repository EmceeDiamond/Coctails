import CoctailInf from './CoctailInf'
import './CoctailsCard.css'
import { useState } from 'react';

export default function CocktailsCard(cocktail) {
        
    const [modalActive, setModalActive] = useState(false);

    const openModal = () => {
        setModalActive(true);
    }

    return(
        <div>
            <div className="card" onClick={() => openModal()}>
                <img src = {cocktail.cocktail.strDrinkThumb} alt="" />
                <p>{cocktail.cocktail.strDrink}</p>
            </div>
            <CoctailInf active={modalActive} setActive={setModalActive} coctail={cocktail.cocktail}/>
        </div>
    )
}