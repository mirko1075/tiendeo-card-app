import { useRef, useState, useEffect } from "react";
import Card from "./Components/Card/Card"
import Form from "./Components/Form/Form"
import Nav from "./Components/Nav/Nav"
import apiService from "./lib/api-service";
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [cardsOrig, setCardsOrig] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [create, setCreate] = useState(false);
  const [token, setToken] = useState("");

  const inputRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    apiService.getCards(token)
      .then(cardsReceived => {
        console.log(`cardsReceived from App`, cardsReceived)
        setCards(cardsReceived);
        setCardsOrig(cardsReceived);
      })
      .catch(err => {
        if (err.message === "Unuthorized") {
          apiService.getToken()
            .then(tokenReceived => {
              localStorage.setItem("token", tokenReceived);
              setToken(tokenReceived);
              apiService.getCards(token)
                .then(cardsReceived => {
                  console.log(`cardsReceived from App`, cardsReceived)
                  setCards(cardsReceived);
                  setCardsOrig(cardsReceived);
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
        setCardsOrig([...newCards]);
      })
      .catch(err => console.log(err))

  }

  const deleteCard = (idCard) => {
    apiService.deleteCard(idCard, token)
      .then(res => {
        const newCards = [...cards.filter(el => el.id !== idCard)];
        setCards([...newCards]);
        setCardsOrig([...newCards]);
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
        setCardsOrig([]);
        setCardsOrig([...newCards]);
        console.log(`cards new `, cards)
      })
      .catch(err => console.log(err))
  }
  const handleChange = (e) => {
    setSearchText(inputRef.current.value);
  }
  useEffect(() => {
    let newCards = new Array();
    searchText.length > 0 ? newCards = [...cards.filter(el => el.title.includes(searchText) || el.description.includes(searchText))] : newCards = [...cardsOrig];
    setCards([...newCards]);
  }, [searchText]);

  const orderArr = (order) => {
    const newCards = [...cards];
    switch (order) {
      case "title-asc":
        newCards.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        setCards(newCards);
        setCardsOrig([...newCards]);
        break;
      case "title-desc":
        newCards.sort((a, b) => (a.title > b.title) ? -1 : ((b.title > a.title) ? 1 : 0))
        setCards(newCards);
        setCardsOrig([...newCards]);
        break;
      case "dateAsc":
        newCards.sort((a, b) => new Date(a.created) < new Date(b.created) ? 1 : -1)
        setCards(newCards);
        setCardsOrig([...newCards]);
        break;
      case "dateDesc":
        newCards.sort((a, b) => new Date(a.created) > new Date(b.created) ? 1 : -1)
        setCards(newCards);
        setCardsOrig([...newCards]);
        break;
    }
  }
  return (
    <div className="App">
      <Nav orderArr={orderArr} />
      <div className="searchDiv">
        <label htmlFor="searchInput" name="searchLabel" className="searchLabel">Search</label>
        <input ref={inputRef} type="text" placeholder="Search text..." className="searchInput" id="searchInput" onChange={handleChange} value={searchText} />
      </div>
      <br /><br />
      <div className="container">
        {
          cards && cards.map(card =>
            <Card key={card.id} name="card" card={card} deleteCard={deleteCard} updateCard={updateCard} />
          )
        }
      </div>
      <div>
        {create ?
          <Form setCreate={setCreate} addCard={addCard} deleteCard={deleteCard} />
          :
          <div className="addDiv">
            <button data-testid="buttonAdd" className="buttonAdd" onClick={() => setCreate(true)}></button>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
