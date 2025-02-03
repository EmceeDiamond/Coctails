

const fetchCoctailsNext = async () => {
	let counter = 0;
	let arr = [];
	let char = 98;
	let num = 49;
    try {
		while (counter < 36){
			if (char < 123){
				const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${String.fromCharCode(char)}`)
				if (!response.ok) {
					throw new Error('Ошибка при загрузке пользователей')
				}
				const data = await response.json()
				if (data.drinks !== null ){
					arr = arr.concat(data.drinks)
				}
				char++;
			}
			counter++;
		}
		return arr
	} catch (error) {
		throw new Error('Ошибка при загрузке пользователей')
	}
}

const fetchCoctails = async () => {
    try {
		const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`)
		if (!response.ok) {
			throw new Error('Ошибка при загрузке пользователей')
		}
		const data = await response.json()
		return data.drinks
	} catch (error) {
		throw new Error('Ошибка при загрузке пользователей')
	}
}

const fetchIngredients = async () => {
    try {
		const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`)
		if (!response.ok) {
			throw new Error('Ошибка при загрузке пользователей')
		}
		const data = await response.json()
		return data.drinks
	} catch (error) {
		throw new Error('Ошибка при загрузке пользователей')
	}
}

const fetchSearchCoctails = async (coctail_name) => {
    try {
		const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${coctail_name}`)
		if (!response.ok) {
			throw new Error('Ошибка при загрузке пользователей')
		}
		const data = await response.json()
		return data.drinks
	} catch (error) {
		throw new Error('Ошибка при загрузке пользователей')
	}
}

export {fetchCoctails, fetchSearchCoctails, fetchCoctailsNext, fetchIngredients}