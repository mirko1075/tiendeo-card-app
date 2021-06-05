import { useState, useRef} from "react";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import Form from "../Form/Form"
import apiService from "../../lib/api-service";
import './Card.css';



export default function Card(props) {
    const card= props.card;
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState(card.image);
    const [id, setId] = useState(card.id);
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description);
    const [edit, setEdit] = useState(false);
    const form = useRef(null);
    const handleChange = (e) => {
      const funcName="set"+e.target.id[0].toUpperCase()+e.target.id.slice(1);
      console.log(`funcName`, funcName);
      eval(funcName)(e.target.value);
        // switch(e.target.id){
        //   case "title":
        //     setTitle(e.target.value);
        //     break;
        //   case "description":
        //     setDescription(e.target.value);
        //     break;
        //   case "image":
        //     setImage(e.target.value);
        //     break;
        // }
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
        <div isOpen={isOpen} toggle={toggle}>
                <div className="card">
                    <img className="object-fit_scale-down" src={card.imageUrl} alt="Image" />
                    <div>{title}</div>
                    <div>{description}</div>
                    <Button onClick={()=>setEdit(true)}>Edit</Button><br />
                    <Button onClick={()=>props.deleteCard(id)}>Delete</Button>
                </div>
            {
              edit && <Form card={card} edit setEdit={setEdit} updateCard={props.updateCard} />
            }
            </div>
    )
}
