import axios from "axios";
const API_URL = "https://cricket-live-line1.p.rapidapi.com";
const HEADERS = {
  "x-rapidapi-key": "9f011b9b6emsh8e7a4589791b917p1f5fe5jsnb2fd71281356",
  "x-rapidapi-host": "cricket-live-line1.p.rapidapi.com",
};

export const getPointsTable = async () => {
  const options = {
    method: "GET",
    url: `${API_URL}/series/336/pointsTable`,
    headers: HEADERS,
  };

  try {
    const response = await axios.request(options);
    console.log("Points table data", response.data);

    if (!response.data?.status || !response.data?.data?.A) {
      throw new Error("Invalid points table data format");
    }

    return response.data.data.A.map((team) => ({
      team: team.teams,
      played: team.P,
      won: team.W,
      loss: team.L,
      points: team.Pts,
      nrr: team.NRR,
      flag: team.flag,
    }));
  } catch (error) {
    console.error("Error fetching the data");
    throw error;
  }
};
