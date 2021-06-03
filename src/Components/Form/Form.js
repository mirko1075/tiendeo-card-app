import {react, useState, useEffect} from "react";
import apiService from "../../lib/api-service";

export default function Form(props) {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [descr, setDescr] = useState("");

    const handleChange = (e) => {
        switch(e.target.id){
          case "title":
            setTitle(e.target.value);
            break;
          case "description":
            setDescr(e.target.value);
            break;
          case "image":
            setImage(e.target.value);
            break;
        }
      };
    
      const handleImageChange = (e) => {
        setImage(e.target.files[0]);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        console.log('image :>> ', image);
        form_data.append('image', image, image.name);
        form_data.append('title', title);
        form_data.append('description', descr);
        apiService.postCard(form_data)
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err))
      };

    return (
        <div>
        <form onSubmit={handleSubmit}>
          <p>
            <input type="text" placeholder='Title' id='title' value={title} onChange={handleChange} required/>
          </p>
          <p>
            <input type="text" placeholder='Description' id='description' value={descr} onChange={handleChange} required/>

          </p>
          <p>
            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={handleImageChange} required/>
          </p>
          <input type="submit"/>
        </form>
        </div>
    )
}
