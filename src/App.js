import "./App.css";
import StateCities from "./stateCities";
import React, { useState } from "react";
function App() {
  let listOfStates = Object.keys(StateCities);
  let firstState = listOfStates[0];
  let [State, setState] = useState(firstState);
  // console.log(StateCities[State][0]);
  let [city, setCity] = useState(StateCities[State][0]);
  // let [Resources, setResources] = useState("https://twitter.com/search?q=");
  let Resources = "https://twitter.com/search?q=";
  let [TextResources, setTextResources] = useState("");
  let callTwitter = () => {
    // console.log(Resources);
    // window.location.href = Resources;
    window.open(
      Resources,
      "_blank" // <- This is what makes it open in a new window.
    );
    window.location.reload();
  };
  let checkAll = e => {
    Resources += '"' + city + '" ' + TextResources + " OR ";

    Array.from(document.querySelectorAll('input[type="checkbox"]')).forEach(
      checkbox => {
        if (checkbox.checked === true) {
          Resources += checkbox.name + " OR ";
        }
      }
    );

    Resources = Resources.replace("OR", "AND (");
    Resources = Resources.trim();

    if (Resources.split(" ").slice(-1)[0] === "OR") {
      let n = Resources.lastIndexOf("OR");
      Resources = Resources.slice(0, n) + Resources.slice(n).replace("OR", ")");
    } else {
      Resources = Resources + ")";
    }
    Resources += "&src=typed_query&f=live";
    callTwitter();
  };

  return (
    <div className="App">
      <div className="title">
        <h3>Twitter Covid Resource Tracker</h3>
      </div>
      <div className="location">
        <label> State </label>
        <select
          value={State}
          onChange={e => {
            setState(e.target.value);
            setCity(StateCities[e.target.value][0]);
          }}
        >
          {listOfStates.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <br />
        <label> City </label>
        <select value={city} onChange={e => setCity(e.target.value)}>
          {StateCities[State].map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="Medics">
        <div>
          <input type="checkbox" name="Remidisvir" /> Remidisvir
        </div>
        <div>
          <input type="checkbox" name="Tocilizumab" /> Tocilizumab
        </div>
        <div>
          <input type="checkbox" name="Fabiflu" /> Fabiflu
        </div>
        <div>
          <input type="checkbox" name="Favipiravir" /> Favipiravir
        </div>
      </div>
      <div className="hospital_beds">
        <div>
          <input type="checkbox" name="Beds" /> Hospitals Beds
        </div>
        <div>
          <input type="checkbox" name="ICU" /> ICU Beds
        </div>
        <div>
          <input type="checkbox" name="Ventilator" /> Ventilator
        </div>
      </div>
      <div className="oxygen_supplies">
        <div>
          <input type="checkbox" name="Oxygen" /> Oxygen Cylinder
        </div>
        <div>
          <input type="checkbox" name="Concentrator" /> Oxygen Concentrator
        </div>
        <div>
          <input type="checkbox" name="Plasma" /> Plasma
        </div>
      </div>
      <div className="otherResc">
        <div>
          <input type="checkbox" name="Food" /> Food
        </div>
        <div>
          <input type="checkbox" name="Ambulance" /> Ambulance
        </div>
      </div>
      <div className="textresources">
        <label>Other Resources</label>
        <input
          type="text"
          name="OtherResources"
          className="text_field"
          onChange={e => setTextResources(e.target.value)}
        />

        <div className="text_message">
          (Please provide 'OR' keyword in-between, if adding more than one
          resource in the box)
        </div>
      </div>
      <div className="submit">
        <button className="submit_button" onClick={checkAll}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
