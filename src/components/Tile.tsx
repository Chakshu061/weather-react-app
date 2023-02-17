import { Visibility } from "@material-ui/icons"
import React from "react"
import Feels from "./icons/Feels"
import Humidity from "./icons/Humidity"
import Pop from "./icons/Pop"
import Pressure from "./icons/Pressure"
import Wind from "./icons/Wind"

type Props = {
    icon: 'wind' | 'feels' | 'humidity' | 'visibility' | 'pressure' | 'pop'
    title: string
    info: string | JSX.Element
    description?: string | JSX.Element
}

const icons = {
    wind: Wind,
    feels: Feels,
    humidity: Humidity,
    visibility: Visibility,
    pressure: Pressure,
    pop: Pop,
}
  
const Tile = ({ icon, title, info, description }: Props): JSX.Element => {
    const Icon = icons[icon]
  
    return (
      <article className="cube">
        <div>
          <Icon /> <h4>{title}</h4>
        </div>
        <h3>{info}</h3>
  
        <div>{description}</div>
      </article>
    )
  }
  export default Tile