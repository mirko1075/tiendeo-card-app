import { useState, useEffect } from "react";
import Card from "./Components/Card/Card"
import Form from "./Components/Form/Form"
import apiService from "./lib/api-service";
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [create, setCreate] = useState(false);
  const [token, setToken] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    apiService.getCards(token)
      .then(cardsReceived => {
        console.log(`cardsReceived from App`, cardsReceived)
        setCards(cardsReceived);
      })
      .catch(err => {
        console.log("err", err)
        if (err.message === "Unuthorized") {
          apiService.getToken()
            .then(tokenReceived => {
              localStorage.setItem("token", tokenReceived);
              setToken(tokenReceived);
              apiService.getCards(token)
                .then(cardsReceived => {
                  console.log(`cardsReceived from App`, cardsReceived)
                  setCards(cardsReceived);
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
      });

  }, []);

  const addCard = (card) => {
    apiService.postCard(card, token)
      .then(res => {
        const newCards = [...cards, res];
        setCards([...newCards]);
      })
      .catch(err => console.log(err))

  }

  const deleteCard = (idCard) => {
    apiService.deleteCard(idCard, token)
      .then(res => {
        const newCards = [...cards.filter(el => el.id !== idCard)];
        setCards([...newCards]);
      })
      .catch(err => console.log(err))

  }
  const updateCard = (card_id, formData) => {
    apiService.updateCard(card_id, formData, token)
      .then(res => {
        const newCards = [...cards];
        const index = newCards.findIndex(el => el.id === card_id);
        const obj = newCards[index];
        obj.title = formData.title;
        obj.description = formData.description;
        newCards[index] = obj;
        setCards([]);  // To force re-render - the Array had not changed reference
        setCards([...newCards]);
        console.log(`cards new `, cards)
      })
      .catch(err => console.log(err))
  }

  const orderArr = (order) => {
    const newCards = [...cards];
    switch (order) {
      case "title-asc":
        newCards.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        setCards(newCards);
        break;
      case "title-desc":
        newCards.sort((a, b) => (a.title > b.title) ? -1 : ((b.title > a.title) ? 1 : 0))
        setCards(newCards);
        break;
      case "dateAsc":
        newCards.sort((a, b) => new Date(a.created) < new Date(b.created) ? 1 : -1)
        setCards(newCards);
        break;
      case "dateDesc":
        newCards.sort((a, b) => new Date(a.created) > new Date(b.created) ? 1 : -1)
        setCards(newCards);
        break;
    }
  }
  return (
    <div className="App">
      <nav>
        <div><button className="button navButtons" href="#" onClick={() => orderArr("title-desc")}>Title &#11015;</button></div>
        <div><button href="#" className="button navButtons" onClick={() => orderArr("title-asc")}>Title &#11014; </button></div>
        <div><button href="#" className="button  navButtons" onClick={() => orderArr("dateAsc")}>Date &#11015;</button></div>
        <div> <button href="#" className="button navButtons" onClick={() => orderArr("dateDesc")}>Date &#11014;</button></div>
      </nav>
      <br /><br />
      <div className="container">
        {
          cards && cards.map(card =>
            <div>
              <Card key={card.id} card={card} deleteCard={deleteCard} updateCard={updateCard} />
            </div>
          )
        }
      </div>
      <div>
        {create ?
          <div>
            <Form setCreate={setCreate} addCard={addCard} deleteCard={deleteCard} />
          </div>
          :
          <div addDiv>
            <button class="buttonAdd" onClick={() => setCreate(true)}>+</button>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
