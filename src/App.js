import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function App(){
    const [ratesCur, setRatesCur] = useState([])
    const data = [
        {cur: "CAD", buy: 0, exchangeRate: 0, sell: 0 },
        {cur: "EUR", buy: 0, exchangeRate: 0, sell: 0 },
        {cur: "IDR", buy: 0, exchangeRate: 0, sell: 0 },
        {cur: "JPY", buy: 0, exchangeRate: 0, sell: 0 },
        {cur: "CHF", buy: 0, exchangeRate: 0, sell: 0 },
        {cur: "GBP", buy: 0, exchangeRate: 0, sell: 0 },
      ]

      const GetDataFromFetch = () => {
        useEffect(()=>{
          axios.get('https://api.currencyfreaks.com/latest?apikey=b759ab5369c34d30897600785d3fb80d&symbols=CAD,EUR,IDR,JPY,CHF,GBP')
          .then(({data})=>{
            setRatesCur(data.rates)
          })
        }, [])
        return ratesCur
      }

      const GetAllData = (data, ratesCur) => {
        const res = [];
        for(let i=0; i<data.length; i++){
          let curKey = data[i].cur
          let exRate = Number(ratesCur[curKey]).toFixed(4)
          let rateSell = Number((exRate * 5)/100).toFixed(4)
          data[i].exchangeRate = exRate
          data[i].buy = Number(+exRate+ +rateSell).toFixed(4)
          data[i].sell = Number(exRate - rateSell).toFixed(4)
          res.push(data[i])
        }
        return res
      }
    
      const rateHitung = GetAllData(data, GetDataFromFetch())

    return(
        <div>
            <h1><center>Currency for forex</center></h1>
            <body>
                <table>
                    <tr className='tbl'>
                        <th>Currency</th>
                        <th>Buy</th>
                        <th>Exchange Rate</th>
                        <th>Sell</th>
                    </tr>
                    {
          rateHitung.map((datares, i)=>{
            return(
              <tr key={i}>
              <td className=''>{datares.cur}</td>
              <td>{datares.buy}</td>
              <td>{datares.exchangeRate}</td>
              <td>{datares.sell}</td>
            </tr>
            )
          })
        }
                </table>
            </body>
        </div>
    )

}

export default App;