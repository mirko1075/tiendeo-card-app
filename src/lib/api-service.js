import axios from "axios";
require("dotenv").config();

// //Connection to DB parameters
// const API_BASE_URL = process.env.API_BASE_URL.toString();
// const API_PORT = process.env.API_PORT.toString();

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://tiendeo-frontend-cards-api.herokuapp.com"
    });
  }


  getToken() {
    const pr = this.api
      .get("/users")
      .then((response) => {
        const data= response.data;
        return data
      })
      .catch((err) => {
        console.log(err);
      });

    return pr;
  }
  getCards(token) {
    const pr = this.api
      .get("/cards", { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        const data= response.data;
        return data
      })
      .catch((err) => {
        throw err;
      });
    return pr;
  }
  getCard(card_id,token) {
    const pr = this.api
      .get("/cards/"+card_id, { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        const data= response.data;
        return data
      })
      .catch((err) => {
        console.log(err);
      });
    return pr;
  }

  postCard(data, token) {
    console.log('data :>> ', data);

    const pr = this.api
    .post("/cards",data, {
      headers: {
        "Authorization" : `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }})
      .then(response=>{
        return response.data;
      })
      .catch(err=>console.log(err))
      return pr;
  }
  updateCard(id, data, token) {
    console.log('data :>> ', data, id);
    const pr = this.api
    .put("/cards/"+id, data, {
      headers: {
        "Authorization" : `Bearer ${token}`,
        'Content-Type': 'application/json'
      }})
      .then(response=>{

        return response.data;
      })
      .catch(err=>{
        if (err.message="Unauthorized"){
          this.getToken()
          .then(res=>{
            token=res;
            //this.updateCard(id, data, token);
          })
          .catch(err=>console.log(err))
        }}
       )
      return pr;
  }

  deleteCard(id, token) {
    console.log('data :>> ', id);

    const pr = this.api
    .delete("/cards/"+id, {
      headers: {
        "Authorization" : `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }})
      .then(response=>{
        return response.data;
      })
      .catch(err=>console.log("err", err))
      return pr;
  }
}

const apiService = new ApiService();

export default apiService;

