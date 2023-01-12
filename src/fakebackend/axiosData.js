import axios from 'axios';

export const getDataMakeup = async () => {
  const response = await axios.get('https://makeup.p.rapidapi.com/products.json', {
      params: {brand: 'maybelline'},
    headers: {
      'X-RapidAPI-Key': "6f745fea8fmsh124417c37393be9p18a8c9jsn03627ab6b967",
      'X-RapidAPI-Host': 'makeup.p.rapidapi.com'
    }

  }, )

  return response.data

};