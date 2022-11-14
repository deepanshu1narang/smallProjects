import React from "react";
import { useState } from "react";

let dataReceivedArray = [];
let nData = 0;

export default function Form() {
  const [details, setDetails] = useState({
    name: "",
    cashadvance: "",
    currency: "",
    purpose: "",
    cashadvancecomment: "",
  });

  function valid(str){
    return(
        /^[A-Za-z\s]*$/.test(str) && /[A-Za-z]/.test(str)
    );
    
}

  function storeDetails(event) {
    event.preventDefault();
    
    document.querySelectorAll(".invalid")[0].innerHTML = null;
    document.querySelectorAll(".invalid")[1].innerHTML = null;

    setDetails((prevDetails) => {
      if (event.target.name === "name") {
        return {
          name: event.target.value,
          cashadvance: prevDetails.cashadvance,
          currency: prevDetails.currency,
          purpose: prevDetails.purpose,
          cashadvancecomment: prevDetails.cashadvancecomment,
        };
      } else if (event.target.name === "cashadvance") {
        return {
          name: prevDetails.name,
          cashadvance: event.target.value,
          currency: prevDetails.currency,
          purpose: prevDetails.purpose,
          cashadvancecomment: prevDetails.cashadvancecomment,
        };
      } else if (event.target.name === "currency") {
        return {
          name: prevDetails.name,
          cashadvance: prevDetails.cashadvance,
          currency: event.target.value,
          purpose: prevDetails.purpose,
          cashadvancecomment: prevDetails.cashadvancecomment,
        };
      } else if (event.target.name === "purpose") {
        return {
          name: prevDetails.name,
          cashadvance: prevDetails.cashadvance,
          currency: prevDetails.currency,
          purpose: event.target.value,
          cashadvancecomment: prevDetails.cashadvancecomment,
        };
      } else if (event.target.name === "cashadvancecomment") {
        return {
          name: prevDetails.name,
          cashadvance: prevDetails.cashadvance,
          currency: prevDetails.currency,
          purpose: prevDetails.purpose,
          cashadvancecomment: event.target.value,
        };
      }
    });
  }

  function displayDetails(event) {
    event.preventDefault();

    let dataReceived = {
      id: nData,
      name: details.name,
      cashadvance: details.cashadvance,
      currency: details.currency,
      purpose: details.purpose,
      cashadvancecomment: details.cashadvancecomment,
    };

    if ( dataReceived.name.trim().length !== 0 && dataReceived["cashadvance"].trim().length !== 0 && dataReceived.currency.trim().length !== 0 && dataReceived["purpose"].trim().length !== 0 && dataReceived["cashadvancecomment"].trim().length !== 0 ) {

        if(valid(dataReceived.name) && valid(dataReceived.currency) ){

            
            dataReceivedArray.push(dataReceived);
            nData++;
            localStorage.setItem("dataRec", JSON.stringify(dataReceivedArray));
            
            console.log(JSON.parse(localStorage.getItem("dataRec")));
            
            setDetails(() => {
                return {
                    name: "",
                    cashadvance: "",
                    currency: "",
                    purpose: "",
                    cashadvancecomment: "",
                };
            });
            
            document.querySelector("#emptyFields").innerHTML = null;
            document.querySelectorAll(".invalid")[0].innerHTML = null;
            document.querySelectorAll(".invalid")[1].innerHTML = null;
        }

        if( !valid(dataReceived.name) ){
            document.querySelectorAll(".invalid")[0].innerHTML = "Please enter the valid name."
        }

        if( !valid(dataReceived.currency) ){
            document.querySelectorAll(".invalid")[1].innerHTML = "Please enter the valid currency."
        }


    } 
    else if ( dataReceived["name"].trim().length === 0 || dataReceived["cashadvance"].trim().length === 0 || dataReceived["currency"].trim().length === 0 || dataReceived["purpose"].trim().length === 0 || dataReceived["cashadvancecomment"].trim().length === 0
    ) {
      document.querySelector("#emptyFields").innerHTML =
        "! All the fields are mandatory to fill";
    }
  }

  return (
    <div>
      <form autoComplete="off">
        <h1>Form to fill</h1>
        <div>
          <label>Name:</label>
          <input
            onChange={storeDetails}
            name="name"
            type="text"
            // value = { valid(details.name) ? details.name : null }
            value={details.name}
            required
          />
          <span className = "invalid" ></span>
        </div>
        <div>
          <label>Cashadvance:</label>
          <input
            onChange={storeDetails}
            name="cashadvance"
            type="number"
            value={details.cashadvance}
            required
          />
        </div>
        <div>
          <label>Currency:</label>
          <input
            onChange={storeDetails}
            name="currency"
            type="text"
            // value = { ValidCurrency ? details.name : <p>Please Enter an appropriate Currency</p> }
            value={details.currency}
            required
          />
          <span className = "invalid" ></span>
          {/* {inValidCurrency && <p>Please enter a valid Currency name</p>} */}
        </div>
        <div>
          <label>Purpose:</label>
          <input
            onChange={storeDetails}
            name="purpose"
            type="text"
            value={details.purpose}
            required
          />
        </div>
        <div>
          <label>Cashadvancecomment:</label>
          <input
            onChange={storeDetails}
            name="cashadvancecomment"
            type="text"
            value={details.cashadvancecomment}
            required
          />
        </div>
        <button className="submit" onClick={displayDetails}>Submit</button>

        <div id="emptyFields" style={{ color: "red" }}></div>
      </form>
      <div>
        {/* {inValidName && <p>Please enter a valid Name</p>} */}
        {/* {inValidCurrency && <p>Please enter a valid Currency name</p>} */}
      </div>
    </div>
  );
}

