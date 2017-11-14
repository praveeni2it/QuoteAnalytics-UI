import axios from "axios";
const api = "http://localhost:3000/api";

const quotesApi = {
  getAllCustomers: () => {
    return axios.get(api + "/customers/list");
  },
  getAllProducts: () => {
    return axios.get(api + "/products/list");
  },
  getDeliveryAdder: (payload) => {
    return axios.post(api + "/deliveryadderanalytics/getAdder", payload);
  },
  getCustomerAdder: (payload) => {
    return axios.post(api + "/customeradderanalytics/getAdder", payload);
  },
  getCustomerVariance: (payload) => {
    return axios.post(api + "/customervarianceanalytics/getVariance", payload);
  }
};

export default quotesApi;
