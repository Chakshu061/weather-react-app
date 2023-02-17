
import React, { ChangeEvent } from 'react';
import { optionType } from '../temp/index';

type Props = {
    term: string;
    options: [],
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onOptionSelect: (option: optionType) => void;
    onSubmit: () => void
}

const Search = ({
    term,
    options,
    onInputChange,
    onOptionSelect,
    onSubmit
}: Props):JSX.Element => {

  

  return (
    <div className="container">

     <section className="content">

      <h1>Weather <span>Forecast</span></h1>
      <p>Enter the location you want to get the forecast report of</p>

      <div className="searching">
        <input 
          type="text" 
          value={ term } 
          className="bar"
          onChange={onInputChange}
        />

        <ul className="options">
          {options.map((option: optionType, index: number) => (
            <li key={option.name + '-' + index}>
              <button onClick={()=> onOptionSelect(option)}>{option.name}</button>
            </li> 
          ))}
        </ul>

        <button onClick={onSubmit}>Search</button>
      </div>

     </section>

    </div>
  )
}

export default Search