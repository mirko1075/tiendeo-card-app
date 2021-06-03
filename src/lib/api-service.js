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
  getCards() {
    const token=this.getToken();
    const pr = this.api
      .get("/cards", { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        const data= response.data;
        return data
      })
      .catch((err) => {
        console.log(err);
      });
    return pr;
  }

  postCard(data) {
    const token=this.getToken();
    const pr = this.api
    .post(data, {
      headers: {
        "Authorization" : `Bearer ${token}`,
        'content-type': 'multipart/form-data'
      }})
      .then(response=>{
        return response;
      })
      .catch(err=>console.log(err))
  }
}

const apiService = new ApiService();

export default apiService;

