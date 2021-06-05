import { useState, useEffect} from "react";
import Card from "./Components/Card/Card"
import EditCard from "./Components/Card/EditCard"
import Form from "./Components/Form/Form"
import apiService from "./lib/api-service";
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [create, setCreate] = useState(false);
  const [token, setToken] = useState("")

  useEffect(()=>{
    const tokenVar=apiService.getToken()
    .then(tokenReceived=>setToken(tokenReceived))
    .catch(err=>console.log(err))
    apiService.getCards(token)
    .then(cards=>{
      setCards(cards);
    })
    .catch(err=>console.log("err", err))
  }, []);

  const addCard = (card) =>{
    apiService.postCard(card, token)
        .then(res => {
          const newCards=[...cards, res];
          setCards([...newCards]);
        })
        .catch(err => console.log(err))

  }
  const deleteCard = (idCard) =>{
    apiService.deleteCard(idCard, token)
        .then(res => {
          const newCards=[...cards.filter(el=>el.id!==idCard)];
          setCards([...newCards]);
        })
        .catch(err => console.log(err))

  }
  const updateCard = (card_id, formData) =>{
    apiService.updateCard(card_id,formData, token)
    .then(res => {
      console.log(`res`, res)
        cards[cards.findIndex(el=>el.id===card_id)]=res;
    })
    .catch(err => console.log(err))
  }
  function compare( a, b ) {
    if ( a.title < b.title ){
      return -1;
    }
    if ( a.title > b.title ){
      return 1;
    }
    return 0;
  }
  
  const orderArr = (arr, order) =>{
    function order_per_date(a, b) { 
      console.log(`a,b`, a.created,b.created);
      let dateA = new Date(a.created).getTime();
      let dateB = new Date(b.created).getTime();
      return dateA > dateB ? 1 : -1; 
    }; 
    function order_per_field_asc (a,b) {
        return a.title > b.title ? 1: -1;
    }
    function order_per_field_desc (a,b) {
        return b.title < a.title ? 1: -1;
    }
    switch(order){
      case "title-asc":
        console.log(`cards`, cards)
        cards.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        console.log(`cards`, cards)
        //setCards(cards);
        break;
      case "title-desc":
        console.log(`cards`, cards)
        cards.sort((a,b) => (a.title > b.title) ? -1 : ((b.title > a.title) ? 1 : 0))
        console.log(`cards`, cards)
        //setCards(cards);
        break;
      case "date":
        console.log(`cards`, cards)
        cards.sort((a,b) => (new Date(a.created) > new Date(b.created)) ? 1 : ((new Date(b.created) > new Date(a.created)) ? -1 : 0))
        console.log(`cards`, cards)
        //setCards(cards);
        break;
    }
  }
  return (
    <div className="App">
    <nav>
      <div>Order per Title <a href="#" onClick={() => orderArr(cards,"title-asc")}>asc</a> - <a href="#" onClick={() => orderArr(cards, "title-desc")}>desc </a></div><div>| Date <a href="#" onClick={()=>orderArr(cards, "date")}>Asc</a> <a href="#" onClick={()=>orderArr(cards, "date")}>Desc</a></div>
    </nav>
    <div>
   {
        cards && cards.map(card=>
          <Card key={card.id} card={card} deleteCard={deleteCard} updateCard={updateCard}  />
        )
   }
   </div>
   <div>
    {create ? 
        <Form addCard={addCard} deleteCard={deleteCard} />
    :
      <a onClick={()=>setCreate(true)}>Create</a>
    } 
    </div>
    </div>
  );
}

export default App;
