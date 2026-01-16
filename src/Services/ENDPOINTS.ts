import axios from "axios";

const baseURL = "http://localhost:8080/api";

export const axiosInstances = axios.create({
  baseURL: baseURL
//   headers: { Authorization: localStorage.getItem("token") },
});

//Products URLs
const PRODUCTS_BASE_URL = `${baseURL}/products`;
export const PRODUCTS_URLs = 
{
    GET_ALL: `${PRODUCTS_BASE_URL}`,
    GET_BY_ID: (id: string) => `${PRODUCTS_BASE_URL}/${id}`,
    CREATE: `${PRODUCTS_BASE_URL}`,
    UPDATE: (id: string) => `${PRODUCTS_BASE_URL}/${id}`,
    DELETE: (id: string) => `${PRODUCTS_BASE_URL}/${id}`,
}

//Categories URLs
const CATEGORIES_BASE_URL = `${baseURL}/categories`;
export const CATEGORIES_URLs = 
{
    GET_ALL: `${CATEGORIES_BASE_URL}`,
    GET_BY_ID: (id: string) => `${CATEGORIES_BASE_URL}/${id}`,
    CREATE: `${CATEGORIES_BASE_URL}`,
    UPDATE: (id: string) => `${CATEGORIES_BASE_URL}/${id}`,
    DELETE: (id: string) => `${CATEGORIES_BASE_URL}/${id}`,
}