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
    const token=localStorage.getItem("token");
    setToken(token);
    apiService.getCards(token)
    .then(cardsReceived=>{
      console.log(`cardsReceived from App`, cardsReceived)
      setCards(cardsReceived);
    })
    .catch(err=>{
      console.log("err", err)
      if (err.message==="Unuthorized"){
        apiService.getToken()
        .then(tokenReceived=>{
          localStorage.setItem("token", tokenReceived);
          setToken(tokenReceived);
          apiService.getCards(token)
          .then(cardsReceived=>{
            console.log(`cardsReceived from App`, cardsReceived)
            setCards(cardsReceived);
          })
          .catch(err=>console.log(err))  
        })
        .catch(err=>console.log(err))        
      }
    });

  }, []);

  const addCard = (card) =>{
    apiService.postCard(card, token)
        .then(res => {
          const newCards=[...cards, res];
          setCards(newCards);
          setCreate(false);
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
    console.log(`token`, token)
    apiService.updateCard(card_id, formData, token)
    .then(res => {
        const index= cards.findIndex(el=>el.id===card_id);
        const newCards=[...cards];
        newCards[index].title=formData.title;
        newCards[index].description=formData.description;
        setCards([])
        setCards(...newCards);
        console.log(`cards new state`, cards)
    })
    .catch(err => console.log(err))
  }

  const orderArr = ( order) =>{
    const newCards = [...cards];
    switch(order){
      case "title-asc":
        newCards.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        setCards(newCards);
        break;
      case "title-desc":
        newCards.sort((a,b) => (a.title > b.title) ? -1 : ((b.title > a.title) ? 1 : 0))
        setCards(newCards);
        break;
        case "dateAsc":
          newCards.sort((a,b) => new Date(a.created)<new Date(b.created)? 1: -1)
          setCards(newCards);
          break;
        case "dateDesc":
          newCards.sort((a,b) => new Date(a.created)>new Date(b.created)? 1: -1)
          setCards(newCards);
          break;
    }
  }
  return (
    <div className="App">
    <nav>
      <div>Order per Title <a href="#" onClick={() => orderArr("title-asc")}>Asc</a> - <a href="#" onClick={() => orderArr( "title-desc")}>Desc </a> | Date <a href="#" onClick={()=>orderArr( "dateAsc")}>Asc</a> <a href="#" onClick={()=>orderArr( "dateDesc")}>Desc</a></div>
    </nav>
    <br /><br />
    <div className="container">
   {
        cards && cards.map(card=>
        <div>
        <Card key={card.id} card={card} deleteCard={deleteCard} updateCard={updateCard}  />
        </div>
        )
   }
   </div>
   <div>
    {create ? 
    <div>
    <a href="#" onClick={()=>setCreate(false)}>Close add</a>
      <Form addCard={addCard} deleteCard={deleteCard} />
    </div>
    :
      <a onClick={()=>setCreate(true)}>Create</a>
    } 
    </div>
    </div>
  );
}

export default App;
