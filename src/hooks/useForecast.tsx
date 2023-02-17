import { ChangeEvent, useEffect, useState } from "react";
import { optionType, forecasteType } from "../temp";

const useForecast = () => {
    const [ term, setTerm ] = useState('');
    const [ city, setCity ] = useState<optionType | null>(null)
    const [options, setOptions] = useState<[]>([])
    const [forecast, setForecast] = useState<forecasteType | null>(null)
  
    const getSearchOptions = (value: string) => {
  
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=15ea041b149bfda2c96f3eb590d18bfb`)
      .then((res)=> res.json())
      .then((data) => setOptions(data))
  
    }
  
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();
      setTerm(value);
  
      if (value === '') return
  
      getSearchOptions(value);
    }
  
    const onOptionSelect = (option: optionType) =>{
      setCity(option)
    }
 
    const getForecast = (city: optionType) => {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=15ea041b149bfda2c96f3eb590d18bfb`)
      .then((res)=> res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        }
        setForecast(forecastData)}).catch(e => console.log(e))
    }

    const onSubmit = () => {
      if(!city) return
    
      getForecast(city)
    }
    
    useEffect(() => {
      if (city){
        setTerm(city.name)
        setOptions([])
      }
    }, [city])


    return{
      term, options, forecast, onInputChange, onOptionSelect, onSubmit
    }
        
}




export default useForecast;