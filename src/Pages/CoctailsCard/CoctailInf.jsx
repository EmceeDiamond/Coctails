import Modal from "../../Components/Modal";
import './CoctailInf.css'

export default function CoctailInf ({active, setActive, coctail}) {
    let t = `&emsp;`
    const Ingredients = () => {
        let arr = []
        let i = 1;
        let property = `strIngredient${i}`;
        let property2 = `strMeasure${i}`;
        while ((coctail[property] !== null)){
            arr.push({"strIngredient": coctail[property], "strMeasure": coctail[property2]})
            i++;
            property = `strIngredient${i}`;
            property2 = `strMeasure${i}`;
        }
        return arr
    }


    return(
    <Modal active={active} setActive={setActive}>
        <div className="">
            <section className="coctail__info">
                <img src={coctail.strDrinkThumb} alt="" />
                <p className="name">{coctail.strDrink}</p>
                <p className="heading">Ingredients:</p>
                {Ingredients().map((item) => 
                    (
                        <div className="constituent">
                            <li className="ingredient">{item.strIngredient}</li>
                            <li className="measure">{item.strMeasure}</li>
                        </div>
                        
                    ))}
                <p className="heading">Instruction:</p>
                <p className="instruction">{coctail.strInstructions}</p>
            </section>
        </div>
    </Modal>
    )
    
}