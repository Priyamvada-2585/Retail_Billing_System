import axios from 'axios';

const BASE = 'http://localhost:8081/api';

export const getProducts = () => axios.get(`${BASE}/products`);
export const addProduct = (data) => axios.post(`${BASE}/products`, data);
export const updateProduct = (id, data) => axios.put(`${BASE}/products/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${BASE}/products/${id}`);

export const getCustomers = () => axios.get(`${BASE}/customers`);
export const addCustomer = (data) => axios.post(`${BASE}/customers`, data);
export const updateCustomer = (id, data) => axios.put(`${BASE}/customers/${id}`, data);
export const deleteCustomer = (id) => axios.delete(`${BASE}/customers/${id}`);

export const createBill = (data) => axios.post(`${BASE}/bills`, data);
export const getBills = () => axios.get(`${BASE}/bills`);
export const getBillById = (id) => axios.get(`${BASE}/bills/${id}`);