import axios from "axios";

const API_URL = "http://localhost:8080/api/test/teams";
class TeamServices{
        getTeams() {
        try {
          const response =  axios.get(API_URL);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
}

export default new TeamServices();