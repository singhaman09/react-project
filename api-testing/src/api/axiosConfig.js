// src/api/freesoundApi.js
import axios from "axios";

const freesoundApi = axios.create({
  baseURL: "https://freesound.org/apiv2",
  headers: {
    Authorization: "Token dwhqiNKIVmkg5vkAYdVPnFOsZh95hkXg3FYavglr",
  },
});

export default freesoundApi;
