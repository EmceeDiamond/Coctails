import { data, useNavigate } from "react-router-dom"
import './CoctailsList.css'
import CocktailsCard from "../CoctailsCard/CoctailsCard";
import { fetchCoctails, fetchSearchCoctails, fetchCoctailsNext, fetchIngredients } from "../../API/Fetch";
import { useEffect, useState } from "react";
import Modal from "../../Components/Modal";

export default function CocktailsList() {
    const navigate = useNavigate();
    const [dataCoctails, setDataCoctails] = useState(null);
    const [dataFilter, setDataFilter] = useState({
        attribute:"",
        value: "",
    });
    const [modalActive, setModalActive] = useState(false);
    const [modalActiveSecond, setModalActiveSecond] = useState(false);
    const [allCocktails, setAllCocktails] = useState(null);
    const [filter, setFilter] = useState([]);
    const [ingredient, setIngredient] = useState([]);
    const [ingredientCheckbox, setIngredientCheckbox] = useState([]);

    const loadingIngredients = () => {
        fetchIngredients().then((data) => {
            setIngredient(data)})
    }
    

    const radioFilter = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (filter.length > 1) {
            filter.map((item) => {
                if (item.name === name){
                    item.value = value;
                }
            })
        }
        else {
            filter.push({name: name, value: value})
        }
    }

    const Accept = (e) => {
        let i = 0;
        let alc;
        let cat;
        while(i < filter.length){
            if (filter[i].name == "strAlcoholic") {
                alc = filter[i]
                
            }
            else {
                cat = filter[i]
            }
            i++;
        }
        setDataCoctails(allCocktails.filter((cocktail) => (cocktail[cat.name] == cat.value)&&(cocktail[alc.name] == alc.value)))
        setModalActive(false);
    }

    const dropFilter = () => {
        setDataCoctails(allCocktails)
    }

    useEffect(() => {
        fetchCoctails().then(data =>{
            setDataCoctails(data)
            setAllCocktails(data)
        })
    }, [])

    const handleInput = (e) => {
        var atr = document.getElementById("attribute").value;
        const value = e.target.value;
        setDataFilter({...dataFilter, value: value, attribute: atr});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dataFilter.value === "" ? fetchCoctails().then(data => setDataCoctails(data)) : fetchSearchCoctails(dataFilter.value).then(data => setDataCoctails(data))
    }

    const loadingCoctails = () => {
        fetchCoctailsNext().then((data)=> {
            setAllCocktails([...allCocktails, ...data])
            setDataCoctails([...allCocktails, ...data]);
        })
    }

    const choiceIngredients = (ingredient) => {
        if (ingredientCheckbox.length === 0){
            setIngredientCheckbox([...ingredientCheckbox, ingredient]);
        }
        else if (ingredientCheckbox.find((item) =>{ 
            if (ingredient.strIngredient1 === item.strIngredient1) {
                return item
            }
            }) === undefined){
            setIngredientCheckbox([...ingredientCheckbox, ingredient]);
        }
        else if (ingredientCheckbox.find((item) => ingredient.strIngredient1 === item.strIngredient1) !== undefined){
            setIngredientCheckbox(ingredientCheckbox.filter((item) => item.strIngredient1 !== ingredient.strIngredient1))
        }
    }

    const searchByIngredients = () => {
        setDataCoctails(allCocktails.filter((item) => {
            let ctr = 1;
            let prop = `strIngredient${ctr}`;
            let i = 0;
            let flag = true;

            while (ingredientCheckbox[i]){
                while (item[prop] !== null){
                    if (item[prop] !== ingredientCheckbox[i].strIngredient1){
                        ctr++;
                        prop = `strIngredient${ctr}`;
                    }
                    else if (item[prop] === ingredientCheckbox[i].strIngredient1){
                        flag = true;
                        break;
                    }
                    flag = false;
                }
                i++;
            }
            if (flag) {
                return item
            }
        }))
        setModalActiveSecond(false)
    }

    return(
        <div>
            <section className="coctails__list">
                <div className="search">
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Введите название коктейля" onChange={handleInput} id="attribute"/>
                        <button>Поиск</button>
                    </form>
                    <button onClick={() => setModalActive(true)}>Фильтры</button>
                    <button onClick={() => (setModalActiveSecond(true), loadingIngredients())}>Поиск по ингредиентам</button>
                    <Modal active={modalActive} setActive={setModalActive}>
                        <div className="">
                            <div className="filter">
                                <div className="first_group" onChange={radioFilter}>
                                    <div className="">
                                        <input type="radio" id="alcoholic" name="strAlcoholic" value="Alcoholic"/>
                                        <label for="alcoholic">Alcoholic</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" id="non_alcoholic" name="strAlcoholic" value="Non alcoholic"/>
                                        <label for="non_alcoholic">Non-Alcoholic</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" id="optional_alcohol" name="strAlcoholic" value="Optional Alcohol"/>
                                        <label for="optional_alcohol">Optional Alcohol</label>
                                    </div>
                                </div>
                                <div className="second_group"  onChange={radioFilter}>
                                    <div className="">
                                        <input type="radio" id="cocktail" name="strCategory" value="Cocktail"/>
                                        <label for="cocktail">Cocktail</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" id="ordinary_drink" name="strCategory" value="Ordinary Drink"/>
                                        <label for="ordinary_drink">Ordinary Drink</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" id="punch_party_drink" name="strCategory" value="Punch / Party Drink"/>
                                        <label for="punch_party_drink">Punch / Party Drink</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" id="shake" name="strCategory" value="Shake"/>
                                        <label for="shake">Shake</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" id="other_unknown" name="strCategory" value="Other / Unknown"/>
                                        <label for="other_unknown">Other / Unknown</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" id="cocoa" name="strCategory" value="Cocoa"/>
                                        <label for="cocoa">Cocoa</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" id="shot" name="strCategory" value="Shot"/>
                                        <label for="shot">Shot</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" id="coffee_tea" name="strCategory" value="Coffee / Tea"/>
                                        <label for="coffee_tea">Coffee / Tea</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" id="homemade_liqueur" name="strCategory" value="Homemade Liqueur"/>
                                        <label for="homemade_liqueur">Homemade Liqueur</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" id="beer" name="strCategory" value="Beer"/>
                                        <label for="beer">Beer</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" id="soft_drink" name="strCategory" value="Soft Drink"/>
                                        <label for="soft_drink">Soft Drink</label>
                                    </div>
                                </div>
                            </div>
                            <button onClick={Accept}>Применить</button>
                            <button onClick={dropFilter}>Сбросить</button>
                        </div>
                    </Modal>
                    <Modal active={modalActiveSecond} setActive={setModalActiveSecond}>
                        <div className="ingred">
                            {ingredient.map((item) => (
                                <div className="">
                                    <input type="checkbox" id="alcoholic" name="strAlcoholic" value="Alcoholic" onClick={() => (choiceIngredients(item))}/>
                                    <label for="alcoholic">{item.strIngredient1}</label>
                                </div>
                            ))}
                            <button onClick={() => searchByIngredients()}>Accept</button>
                        </div>
                    </Modal>
                </div>
                <div className="cards">
                    {dataCoctails!=null && dataCoctails.map((item) => (
                        <CocktailsCard cocktail={item}/>
                    ))}
                </div>
                <div className="load">
                    <div class="arrow-7" onClick={() => loadingCoctails()}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </section>
        </div>
    )
}