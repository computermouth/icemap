import { useId, type FormEvent } from "react"

export default function MapTypeAhead() {

  const locationId = useId();


  const handleLocationInput = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

  }

  return (
    <form className="pa4 white-80">
      <div className="measure">
        <label htmlFor={locationId} className="f6 b db mb2">Location <span className="normal white-60">(Point of Interest or street address)</span></label>
        <div className="flex flex-column">
        <input onInput={handleLocationInput} id={locationId} className="white input-reset ba b--white-20 pa2 db w-100 bg-black-20" type="text" aria-describedby="location" />
        <TypeAheadComboBox />
        </div>
        <small id="name-desc" className="f6 white-60 db mb2">Locations searched not stored until submit.</small>
      </div>
    </form>
  )
}


function TypeAheadComboBox() {
  const items = [
    "Item 1",
    "Item 2",
    "Item 3"
  ];

  return (
    <div className="bg-white black w-100">
      <ul className="list">
        {items.map(i => (<li>{i}</li>))}
      </ul>
    </div>
  )
}
