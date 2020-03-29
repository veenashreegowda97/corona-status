import axios from "axios";
const api = {
  countryList: () => {
    return axios
      .get("https://api.covid19api.com/countries")
      .then(response => {
        console.log(response);
        //console.log("countryres", this.state.countryResult);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }
};

export default countryList;
