import axios from "axios";

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const query = async ({ url, method = 'GET', data = null, params = {}, responseType, headers = {} }) => {
  try {
    const response = await axios({
      method: method,
      url: `${BASE_URL}${url}`,
      data: data,
      params: { ...params, },
      responseType: responseType,
      headers: {
        Authorization: ``,
        ...headers,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error request:", error);
    throw error;
  }
};