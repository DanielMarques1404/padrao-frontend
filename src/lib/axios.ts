import Axios from "axios";

export const axios = Axios.create({
  baseURL: "http://localhost:8000/",
});

export const axiosGet = <T>(url: string): Promise<T | undefined> => {
  return axios
    .get<T>(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return undefined;
    });
};


export function axiosPost(url: string, data?: any, params?: any) {
  return axios.post(url, data, params).then((response) => response.data);
}

export function axiosPut(url: string, data?: any, params?: any) {
  return axios.put(url, data, params).then((response) => response.data);
}

export function axiosDelete(url: string) {
  return axios.delete(url).then((response) => response.data);
}
