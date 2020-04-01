import axios from "axios";
export function countryList() {
  return axios.get("https://api.covid19api.com/countries");
  // .then(response => {
  //   console.log(response);
  //   //console.log("countryres", this.state.countryResult);
  // })
  // .catch(function(error) {
  //   console.log(error);
  // })
  // .finally(function() {
  //   // always executed
  // });
}
export function coronaSummary() {
  return axios.get("https://api.covid19api.com/summary");
  // .then(response => {
  //   console.log(response);
  // })
  // .catch(function(error) {
  //   console.log(error);
  // })
  // .finally(function() {});
}
