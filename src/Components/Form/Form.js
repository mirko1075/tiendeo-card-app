import { useEffect, useState, useRef } from "react";

export default function Form({ edit = false, setCreate, setEdit, addCard, updateCard, card }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState()
  const [title, setTitle] = useState(card ? card.title : "");
  const [description, setDescription] = useState(card ? card.description : "");
  const form = useRef(null);

  useEffect(() => {
    if (!image) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(image)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [image])

  const handleChange = (e) => {
    const funcName = "set" + e.target.id[0].toUpperCase() + e.target.id.slice(1);
    console.log(`funcName`, funcName);
    eval(funcName)(e.target.value);
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Update the formData object
    formData.append("title", title);
    formData.append("description", description);
    image && formData.append(
      "image",
      image,
      image.name
    );
    edit ? updateCard(card.id, { title, description }) : addCard(formData);
    setEdit && setEdit(false);
    setCreate && setCreate(false);
  };

  return (
    <div className="modal">
      <div className="closeDiv">
        <button onClick={() => setCreate(false)}>X</button>
      </div>
      <form ref={form} onSubmit={handleSubmit} className="form">
        <div className="inputContainer">
          <label htmlFor="title">Title</label>
          <input type="text" placeholder='Write here the title...' id='title' value={title} onChange={handleChange} required />
        </div>
        <div className="inputContainer">
          <label htmlFor="description">Description</label>
          <input type="text" placeholder='Write here descr...' id='description' value={description} onChange={handleChange} required />
        </div>
        {!edit &&
          <div className="inputContainer">
            <label htmlFor="image" class="imgLabel">Select an image</label>
            <input type="file"
              id="image"
              className="imgInput"
              accept="image/png, image/jpeg" onChange={handleImageChange} />
            {image && <img src={preview} alt="preview" />}
          </div>
        }
        <input className="button" type="submit" />
      </form>
    </div>
  )
}
