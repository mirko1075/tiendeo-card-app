import {react, useState, useEffect} from "react";
import Card from "./Components/Card/Card"
import EditCard from "./Components/Card/EditCard"
import Form from "./Components/Form/Form"
import apiService from "./lib/api-service";
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);


  useEffect(()=>{
    apiService.getCards()
    .then(cards=>setCards(cards.data))
    .catch(err=>console.log("err", err))
  }, []);


  return (
    <div className="App">
    {!edit ? 
        cards && cards.map(card=>
          <Card card={card} />
        )
    :
      cards && cards.map(card=>
        <EditCard card={card} />
      )
    }
    {create ? 
        <Form  />
    :
      <a onClick={setCreate}>Create</a>
    }  
    </div>
  );
}

export default App;
