import Cheers from "../../segments/Cheers";
import {useEffect, useRef, useState} from "react";
import {maxNoOfDrinksHasError} from "../../validations/validations";
import useLocal from "../../hooks/useLocal";
import {sendFetchRequest, todApi} from "../../constants/constants";
import {QuestionCategory} from "../../models/models";

const GameHostPage = () => {


    //states

    const [limitDrinks, setLimitDrinks] = useState(false)
    const [maxDrinksError, setMaxLimitError] = useState(null)

    const [limitCategories, setLimitCategories] = useState(false)
    const [categoriesList, setCategoriesList] = useState([])
    const [categoriesAllowed, setCategoriesAllowed] = useState([])

    //refs
    const oneManShowRef = useRef(null);
    const orderedRef = useRef(null);
    const limitRef = useRef(null);
    const maxDrinksRef = useRef(null);
    const categoriesRef = useRef(null);
    const categoriesSelectedRef = useRef(null);

    //local
    const {isDBLoading, getError, setOperation, getResult} = useLocal();



    function validateNoOfDrinks () {
        let drinks = maxDrinksRef.current.value;
        setMaxLimitError(maxNoOfDrinksHasError(drinks))
    }

    function hostGame({ordered, oneManShow, categoriesAllowed, limitCategories, limitDrinks, maxDrinks}) {
        const hostForm = {"settings" : {
                "ordered": ordered,
                "private": false,
                "one_man_show": oneManShow,
                "category_setting" : {
                    "categories_allowed" : categoriesAllowed,
                    "limit_category": limitCategories
                },
                "answer_settings": {
                    "limit_drinks": limitDrinks,
                    "max_drinks" : maxDrinks
                }
            }}

        console.log(hostForm)
    }

    useEffect(() => {
        setOperation({
            method: "get",
            collection: "auth",
        }).then(() => {
            let token = getResult();
            if(!token) return
            token = token.token;
            sendFetchRequest({
                url: todApi("question/categories"),
                method: "GET",
                extraHeaders: {"Authorization" : "Bearer "+token}
            }).then(({data: apiResponse, error}) => {
                if(apiResponse.statusCode === 200) {
                    setCategoriesList(QuestionCategory.listFromApiResponse(apiResponse))
                }
            })
        })
    }, [])

    return (
        <div className="inner-parent">

        <div className="center-c">
            <Cheers loop={false}/>
            <h2 style={{margin: 30}}>Game session settings</h2>

            <div className="center-row">
                <input ref={oneManShowRef} type="checkbox" id="one-man-show" name="One man show" value="false"/>
                <label htmlFor="one-man-show"> One man show</label><br/>
            </div>

            <div className="center-row">
                <input ref={orderedRef} type="checkbox" id="order" name="Players in order" value="false"/>
                <label htmlFor="order"> Are players seated in a specific order?</label><br/>
            </div>

            <div className="center-row">
                <input ref={limitRef} onChange={() => {
                    setLimitDrinks(limitRef.current.value)
                }} type="checkbox" id="limit-drinks" name="Limit drinks" value="false" inputMode="numeric"/>
                <label htmlFor="limit-drinks"> Limit number of times a player is allowed to drink per round</label><br/>
            </div>

            {limitDrinks && <div className="center-c">
                <input className="field" onChange={validateNoOfDrinks} ref={maxDrinksRef} placeholder="Enter maximum number of times allowed to drink here" />
                {maxDrinksError && <p className="error">{maxDrinksError}</p>}
            </div>}


            <div className="center-row">
                <input ref={categoriesRef} onChange={() => {
                    setLimitCategories(categoriesRef.current.value)
                }} type="checkbox" id="categories" name="Categories" value="false"/>
                <label htmlFor="categories"> Do you want specific categories for questions?</label><br/>
            </div>

            {limitCategories && categoriesList.length > 0 && <div className="center-c">
                <label htmlFor="cat">Select question categories to include</label>

                <select ref={categoriesSelectedRef} name="categories" id="cat" onSelect={() => {
                    categoriesAllowed.add(categoriesSelectedRef.current.value)
                    console.log(<categoriesSelectedRef className="current value"></categoriesSelectedRef>)
                    setCategoriesAllowed(categoriesAllowed)
                }}>
                    {categoriesList.map(c => <option key={c.id} value={c.description}>{c.description}</option>)}
                </select>
            </div>}

            <div style={{margin: 50}}/>

            <div className="center-column"><button className="rounded_button" onClick={() =>{
                hostGame({
                    ordered: orderedRef.current.value,
                    oneManShow: oneManShowRef.current.value,
                    categoriesAllowed: categoriesAllowed,
                    limitCategories: limitCategories,
                    limitDrinks: limitDrinks,
                    maxDrinks: maxDrinksRef.current == null ? 0 : maxDrinksRef.current.value
                })
            }}>Host</button></div>

            <div style={{margin: 20}}/>


        </div>
        </div>
    );
}

export default GameHostPage;