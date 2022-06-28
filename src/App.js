import React,{useState} from 'react';
import "./App.css"
import Cities from './Cities.json';
import axios from 'axios'



const App = () => {

  const [searchword, setsearchword] = useState(" ");
  const  [filtertext, setfiltertext] = useState([]);
  const [data, setData] = useState({})

  let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchword}&appid=04fad1f119b7c5683e07dd5bb0c0523d`;
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setsearchword('')
    }
  }

  const handleFilter=(event)=>{
    const word = event.target.value;
    setsearchword(word);
    const newFilter = Cities.filter((value) => {
      return value.name.toLowerCase().includes(word.toLowerCase());

    })
    if (word === "") {
      setfiltertext([]);
    } else {
      setfiltertext(newFilter);
    }
  }
   const clearInput=()=>{
    setfiltertext([]);
    setsearchword("");
   }

   
  return <div className='search'>
    <div className='searchInputs'>
    
      <input
      type="text"
      value={searchword}
      onKeyPress={searchLocation}
      placeholder='enter a city'
      onChange={handleFilter}
    


      />
      
      
      <div className="searchIcon">
          {filtertext.length === 0 ? (
            <button> <i className="ri-search-line"></i></button>
          ) : (
            <button onClick={clearInput}>  <i className="ri-close-fill"></i> </button>
            
          )}
        </div>
      
    </div>
    
    {filtertext.length !== 0 &&  (
    
    <div className='filterbox'>
      {filtertext.map((c)=>{
       return(
        <div className='filteritem'>
       
         <p>{c.name}</p>
       </div>
      )
})
}
</div>
    )};

<div>
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h2>{data.main.temp.toFixed()}°F</h2> : null}
          </div> 
          </div>
          </div>
          {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <h3 className='bold'>{data.main.feels_like.toFixed()}°F</h3> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <h3 className='bold'>{data.main.humidity}%</h3> : null}
              <p>Humidity</p>
            </div>
            
          </div>
        }

  </div>;
};

export default App;





  
  


