import { useState, useRef } from "react";
import Form from "../Form/Form"
import defaultImg from "../../Resources/Img/user.png"
import pencilIcon from "../../Resources/Img/pencil.svg"
import deleteIcon from "../../Resources/Img/cancel-circle.svg"

export default function Card(props) {
  const card = props.card;
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(card.image);
  const [id, setId] = useState(card.id);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [edit, setEdit] = useState(false);
  const form = useRef(null);
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
    setEdit(false)
  };
  const toggle = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className="card">
      <div className="imgDiv"><img className="img object-fit_scale-down" src={card.imageUrl !== "https://tiendeo-frontend-cards-api.herokuapp.com/" ? card.imageUrl : defaultImg} alt="Image" /></div>
      <div className="titleDiv">{title}</div>
      <div className="descrDiv">{description}</div>
      <div className="buttonsContainer">
        <div className="buttonDiv"><button className="button" onClick={() => setEdit(true)}><img className="icons" src={pencilIcon} alt="edit" />Edit</button></div>
        <div className="buttonDiv"><button className="button" onClick={() => props.deleteCard(id)}><img className="icons" src={deleteIcon} alt="delete" />Delete</button></div>
      </div>
      {
        edit && <Form card={card} edit setEdit={setEdit} updateCard={props.updateCard} />
      }
    </div>
  )
}
