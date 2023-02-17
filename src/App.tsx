import './App.css';
import React from 'react';
import Search from './search/search';
import Forecast from './components/Forecast';
import useForecast from './hooks/useForecast';


const App = ():JSX.Element => {
  const { term, options, forecast, onInputChange, onOptionSelect, onSubmit } = useForecast()

  return (
    <div className="container">

      {forecast ? (
        <Forecast data={forecast} />
      ):
      (
        <Search 
        term={term} 
        options={options}
        onInputChange = {onInputChange}
        onOptionSelect = {onOptionSelect}
        onSubmit = {onSubmit}
      />
      )}

    </div>
  )
}
  


export default App
