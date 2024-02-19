import { useEffect, useState } from "react";

const boxStyle = { display: "flex", gap: "1em", flexDirection: "col" };

/*
fetch(`https://api.frankfurter.app/latest?amount=10&from=GBP&to=USD`)
  .then(resp => resp.json())
  .then((data) => {
    alert(`10 GBP = ${data.rates.USD} USD`);
  });
*/

function App() {
  const [number, setNumber] = useState(1);
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("INR");
  const [ans, setAns] = useState();
  const [isLoading, setIsLoading] = useState(false);
  function handleAmountChange(e) {
    const value = e.target.value;
    setNumber(value);
    // console.log(value);
  }

  function handleConvertFrom(e) {
    const value = e.target.value;
    console.log(value);
    setConvertFrom(value);
  }
  function handleConvertTo(e) {
    const value = e.target.value;
    console.log(value);
    setConvertTo(value);
  }

  useEffect(
    function () {
      const abortController = new AbortController();
      setIsLoading(true);
      // console.log(number, "number");
      // console.log(convertFrom, "convertFrom");
      // console.log(convertTo, "convertTo");
      if (
        !convertFrom ||
        !convertTo ||
        number == 0 ||
        convertFrom == convertTo
      ) {
        setAns("");
        return;
      }
      fetch(
        `https://api.frankfurter.app/latest?amount=${number}&from=${convertFrom}&to=${convertTo}`,
        { signal: abortController.signal }
      )
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          console.log(data.rates[`${convertTo}`]);
          setAns(data.rates[`${convertTo}`]);
          setIsLoading(false);
          // alert(`10 GBP = ${data.rates.USD} USD`);
        })
        .catch((error) => {
          if (error.name == "abortError") {
            console.log(error);
          }
        });
      return () => {
        // abortController.abort();
      };
    },
    [number, convertFrom, convertTo]
  );

  return (
    <div>
      <div style={boxStyle}>
        <input
          type="number"
          value={number}
          placeholder="Enter the number..."
          onChange={handleAmountChange}
          disabled={isLoading}
        />
        <select onChange={handleConvertFrom}>
          <option>USD</option>
          <option>AUD</option>
          <option>INR</option>
          <option>GBP</option>
        </select>
        <select onChange={handleConvertTo}>
          <option>INR</option>
          <option>USD</option>
          <option>AUD</option>
          <option>GBP</option>
        </select>
      </div>
      <div>
        <p>OUTPUT</p>
        <p>{ans}</p>
      </div>
    </div>
  );
}
export default App;
