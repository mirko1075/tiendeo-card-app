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
  const classVar = setEdit ? 'editModal' : ''
  return (
    <div className={"modal " + classVar}>
      <form ref={form} onSubmit={handleSubmit} className="form">
        <div className="closeDiv">
          {
            edit ?
              <button className="closeButton" onClick={() => setEdit(false)}></button>
              :
              <button className="closeButton" onClick={() => setCreate(false)}></button>
          }

        </div>
        <div className="inputContainer">
          <label htmlFor="title">Title</label>
          <input type="text" placeholder='Write here the title...' id='title' value={title} onChange={handleChange} required />
        </div>
        <div className="inputContainer">
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" cols="30" rows="5" placeholder="Write here descr..." onChange={handleChange} required defaultValue={description ? description : ''} />
        </div>
        {!edit &&
          <div className="inputContainer">
            <label htmlFor="image" data-testid="imgLabel" className="imgLabel">Select an image</label>
            <input type="file"
              id="image"
              className="imgInput"
              accept="image/png, image/jpeg" onChange={handleImageChange} />
            <div className="imgPreview">
              {image && <img src={preview} className="img object-fit_scale-down" alt="preview" />}
            </div>
          </div>
        }
        <div className="sumbitDiv">
          <input className="button" data-testid="submit" type="submit" value="Submit" />
        </div>
      </form>
    </div >
  )
}
