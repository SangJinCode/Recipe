import { Heart, HeartPulse, Search, Soup } from 'lucide-react';
import {useState} from "react";

const getTwoValuesFromArray = (arr) => {
    return [arr[0], arr[1]]
}


const RecipeCard = ({ recipe, bg, badge }) => {
    console.log("**recipe**", recipe)
    console.log("**bg**", bg)
    console.log("**badge**", badge)

    const healthLabels = getTwoValuesFromArray(recipe.healthLabels);

    //localStorage의 favorites에서 recipe.label에 해당하는 data만 받아온다.
    //하트 표시의 state 값으로 사용한다. 값이 있으면 하트가  red로 아니면 white로 표시
    const [isFavorite, setIsFavorite] = useState(localStorage.getItem("favorites")?.includes(recipe.label));
    
    const addRecipeToFavorites = () => {
        //localstorage에서 "favorites"에 해당하는 값을 가져온다.
        //localStorage에는 문자열 data만 가능하기 때문에 JSON.parse()를 통해 가져온다.
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        //some()은 특정 조건에 맞족하는지 순회하면 검사 후 맞은면 true를 반환
        //localStorage에 recipe.label과 동일한 값이 있으면 true를 반환한다.
        const isRecipeAlreadyInFavorites = favorites.some((fav) => fav.lable === recipe.label);

        //일치되는 값이 있으면 filter()를 사용해 recipe.lable과 일치하지 않는 값만 추출하고
        //push()를 통해 favorites에 삽입 후 localStorage에 favorites을 저장한다.
        //localStorage에는 문자열 data만 가능하기 때문에 JSON.stringify()를 실행 후 저장한다.
        if (isRecipeAlreadyInFavorites) {
            favorites = favorites.filter((fav) => fav.label !== recipe.label);
            setIsFavorite(false);
        } else {
            favorites.push(recipe)
            setIsFavorite(true);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    return (
        <div className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}>
            <a 
                href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`} 
                target='_blank'
                className='relative h-32'
            >
                <div className='skeleton absolute inset-0'/>
                <img 
                    src={recipe.image} 
                    alt="recipe img" 
                    className='rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500'
                    onLoad={(e) => {
                        e.currentTarget.style.opacity = 1;
                        e.currentTarget.previousElementSibling.style.display = "none";
                    }}
                />
                <div className='absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm'>
                    <Soup size={16}/> {recipe.yield} Servings
                </div>
                <div 
                    className='absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer'
                    onClick={(e) => {
                        e.preventDefault();
                        addRecipeToFavorites();
                    }}
                >   
                    {!isFavorite && <Heart size={20} className='hover:fill-red-500 hover:text-red-500'/>}
                    {isFavorite && <Heart size={20} className='fill-red-500 text-red-500' />}
                </div>
            </a>

            <div className='flex mt-1'>
                <p className='font-bold tracking-wide'>{recipe.label}</p>
            </div>
            <p className='my-2'>
            {recipe.cuisineType[0].charAt(0).toUpperCase() + recipe.cuisineType[0].slice(1)} Kitchen
            </p>

            <div className='flex gap-2 mt-auto'>
                {healthLabels.map((label, idx) => (
                    <div key={idx} className={`flex gap-1 ${badge} items-center p-1 rounded-md`}>
                        <HeartPulse size={16} />
                        <span className='text-sm tracking-tighter font-semibold'>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecipeCard;