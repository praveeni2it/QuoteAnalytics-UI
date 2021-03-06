import axios from "axios";
const api = "http://localhost:3000/api";

const quotesApi = {
  getAllCustomers: () => {
    return axios.get(api + "/customers/list");
  },
  getAllProducts: () => {
    return axios.get(api + "/products/list");
  },
  getCustomerAdder: (payload) => {
    return axios.post(api + "/customers/getAdder", payload);
  },
};

export default quotesApi;
