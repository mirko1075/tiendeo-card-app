import { useState, useRef } from "react";
import Form from "../Form/Form"
import defaultImg from "../../Resources/Img/user.png"
import pencilIcon from "../../Resources/Img/pencil.svg"
import deleteIcon from "../../Resources/Img/cancel-circle.svg"

export default function Card(props) {
  const card = props.card;
  const [isOpen, setIsOpen] = useState(false);
  const [isShortText, setIsShortText] = useState(false);
  const [image, setImage] = useState(card.image);
  const [id, setId] = useState(card.id);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const form = useRef(null);
  const descr = useRef(null);
  const points = useRef(null);

  const handleChange = (e) => {
    const funcName = "set" + e.target.id[0].toUpperCase() + e.target.id.slice(1);
    console.log(`funcName`, funcName);
    eval(funcName)(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Update the formData object
    console.log(`params`, title, description)
    formData.append("title", title);
    formData.append("description", description);
    props.updateCard(card.id, formData);
    props.setEdit(false)
  };

  const returnShortText = (text) => {
    return text.slice(0, 150)[0].toUpperCase() + text.slice(0, 150).slice(1);
  }


  const returnAllText = (text) => {
    if (isShortText) {
      descr.current.innerHTML = text[0].toUpperCase() + text.slice(1);
    } else {
      descr.current.innerHTML = text.slice(0, 150)[0].toUpperCase() + text.slice(0, 150).slice(1);
    }
    setIsShortText(!isShortText)
  }
  return (
    <div className="card">
      <div className="header">
        <div className="imgDiv"><img className="img object-fit_fill" src={card.imageUrl !== "https://tiendeo-frontend-cards-api.herokuapp.com/" ? card.imageUrl : defaultImg} alt="Image" /></div>
        <div className="titleDiv">{returnShortText(title)}</div>
      </div>

      <div className="descrDiv">
        <div ref={descr} className="descrText">{returnShortText(description)}</div>
        {description.length > 200 ? <div className="points" ref={points} onClick={() => returnAllText(description)}>...</div> : ""}
      </div>
      <div className="buttonsContainer">
        <div className="buttonDiv"><button className="button" data-testid="editButton" onClick={() => props.openEditForm(card)}><img className="icons" src={pencilIcon} alt="edit" />Edit</button></div>
        <div className="buttonDiv"><button className="button" data-testid="deleteButton" onClick={() => props.deleteCard(id)}><img className="icons" src={deleteIcon} alt="delete" />Delete</button></div>
      </div>
    </div>
  )
}
