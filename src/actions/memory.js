import axios from "axios"

export const memory = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://youtube-v31.p.rapidapi.com/search",
      {
        headers: {
          'X-RapidAPI-Key':'ab1f43fd56msh3a0458653f27989p13db7fjsn35665919f8d7',
          "x-RapidAPI-Host": "youtube-v31.p.rapidapi.com",

        },
        params: {
          data: 'data',
          part: 'snippet',
          maxResults: '50'
        },
      }
    );
    dispatch({ type: "yaziListesi", payload: response.data });
 console.log(response.data)
  } catch (error) {

  }
};
