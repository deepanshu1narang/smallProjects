import React from 'react'
import {About} from './About';

const Notes = () => {
  
  const disclaimer = "Although Function based components are gonna be used more but one should have class based component understanding too";

  return (
    <div className='container'>
      <About />

      <ul>
        <h3>Work to do with this project</h3>
        <li>{disclaimer}</li>
        <li>To be included inside a router</li>
        <li>Convert this app to a function based component app</li>
        <li>Use material UI instead of bootstrap</li>
        <li>Try to learn CSS </li>
        <li>in this project buttons should also work.. ie by clicking on page no. it should navigate to that page.</li>
        <li>use country as a dropdown menu</li>
        <li>use category as a dropdown menu</li>
        <li>Do it everyday</li>
        <li>Use flexbox for footer for page navigation</li>
        <li><strong>Hint:</strong> The component doesn't remount by simply navigating to other categories. Try to re-render the component with change in props/state 🤪👽👽.... key thing is good too tho.</li>
        <li>Make a search bar and fetch news according to that search</li>
        <li>Always keep .env.local file outside src folder</li>
        <li>declare variable as 
          <i>REACT_APP_</i>SOME_VARIABLE
        </li>
        <li>the italic part is same and rest can be custom</li>
        <li>use it as 
          <div id="explanation">
            const globalVar = process.env.REACT_APP_SOME_VARIABLE
          </div>
        </li>
      </ul> 
    </div>
  )
}

export default Notes;