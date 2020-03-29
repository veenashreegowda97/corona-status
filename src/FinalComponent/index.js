import React, { Component, Fragment } from "react";
import "./index.css";
import Cards from "../Card";
import "font-awesome/css/font-awesome.css";
import Dropdown from "../Dropdown";
import axios from "axios";
import moment from "moment";
import PieGraph from "../PieGraph";
import * as utils from "../utils/utils";
import BarGraph from "../BarGraph";
import { Spinner } from "reactstrap";

export default class FinalComponent extends Component {
  state = {
    countryResult: [],
    dropdownValue: "India",
    dataResult: [],
    confirmedCount: 0,
    recoveredCount: 0,
    deathCount: 0,
    totalCount: 0,
    isFetching: true
  };
  handleCountryList = e => {
    this.setState({ dropdownValue: e.target.innerHTML }, () => {
      this.getTotalData();
    });
  };
  componentDidMount() {
    axios
      .get("https://api.covid19api.com/countries")
      .then(response => {
        this.setState({
          countryResult: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {});

    axios
      .get("https://api.covid19api.com/all")
      .then(response => {
        this.setState(
          {
            dataResult: response.data
          },
          () => {
            this.getTotalData();
          }
        );
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {});
  }
  getDataBasedOnCountry = () => {
    let resultSet = [...this.state.dataResult];
    let countryArr = [];
    var startdate = moment()
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    resultSet.map(dataElement => {
      if (
        dataElement.Country === `${this.state.dropdownValue}` &&
        dataElement.Date === `${startdate}T00:00:00Z`
      ) {
        countryArr.push(dataElement);
      }
    });
    return countryArr;
  };
  getCountryData = inputArr => {
    let confirmCase = 0;
    let recoverCase = 0;
    let deathCase = 0;
    let totalCase = 0;
    if (inputArr.length === 3) {
      inputArr.map(countryElement => {
        if (countryElement.Status === "confirmed") {
          confirmCase = countryElement.Cases;
        } else if (countryElement.Status === "recovered") {
          recoverCase = countryElement.Cases;
        } else if (countryElement.Status === "deaths") {
          deathCase = countryElement.Cases;
        }
      });
      totalCase = confirmCase + recoverCase + deathCase;
    } else {
      inputArr.map(countryElement => {
        if (countryElement.Status === "confirmed") {
          confirmCase += Number(countryElement.Cases);
        } else if (countryElement.Status === "recovered") {
          recoverCase += Number(countryElement.Cases);
        } else if (countryElement.Status === "deaths") {
          deathCase += Number(countryElement.Cases);
        }
      });
      totalCase = confirmCase + recoverCase + deathCase;
    }
    this.setState({
      confirmedCount: confirmCase,
      recoveredCount: recoverCase,
      deathCount: deathCase,
      totalCount: totalCase,
      isFetching: false
    });
  };
  getTotalData = () => {
    let firstResult = this.getDataBasedOnCountry();
    this.getCountryData(firstResult);
  };

  render() {
    let confirmColor, recoverColor, deathColor, totalColor;
    utils.casesColor.map(colorElement => {
      if (colorElement.name === "Confirmed") {
        confirmColor = colorElement.colour;
      } else if (colorElement.name === "Death") {
        deathColor = colorElement.colour;
      } else if (colorElement.name === "Recovered") {
        recoverColor = colorElement.colour;
      } else if (colorElement.name === "Total") {
        totalColor = colorElement.colour;
      }
    });
    let graphdata = [
      {
        label: "Confirmed",
        value: this.state.confirmedCount
      },
      {
        label: "Recovered",
        value: this.state.recoveredCount
      },
      {
        label: "Death",
        value: this.state.deathCount
      }
    ];
    return (
      <div className="dashboard-wrapper">
        <div className="main-wrapper">
          <div className="left-wrapper">
            <div className="leftWrapper-covid-wrapper">
              <div className="fa fa-asterisk home"></div>
              <div className="dashboardContent-wrapper">COVID-19</div>
            </div>
            <div className="border-spacing"></div>
            <div className="leftWrapper-dashboard-wrapper">
              <div className="dashboard-title-wrapper">DASHBOARD</div>
            </div>
          </div>
          <div className="right-wrapper">
            <div className="header-wrapper">
              <div className="fa fa-asterisk home"></div>
              <div className="dashboardContent-wrapper">COVID-19</div>
            </div>

            {this.state.isFetching ? (
              <div className="spinner-wrapper">
                <Spinner type="grow" color="primary" />
              </div>
            ) : (
              <Fragment>
                <div className="rightWrapper-firstRow">
                  <div className="overview-wrapper">
                    <b>{this.state.dropdownValue}</b>
                  </div>
                  <div className="dropdown-wrapper">
                    <Dropdown
                      countryList={this.state.countryResult}
                      onChange={this.handleCountryList}
                      selectedCountry={this.state.dropdownValue}
                    />
                  </div>
                </div>

                <div className="rightWrapper-secondRow">
                  <div>
                    <Cards
                      title="Total Confirmed Cases"
                      count={this.state.confirmedCount}
                      colour={confirmColor}
                    />
                  </div>
                  <div>
                    <Cards
                      title="Total Death Cases"
                      count={this.state.deathCount}
                      colour={deathColor}
                    />
                  </div>
                  <div>
                    <Cards
                      title="Total Recovered Cases"
                      count={this.state.recoveredCount}
                      colour={recoverColor}
                    />
                  </div>
                  <div>
                    <Cards
                      title="Total Count"
                      count={this.state.totalCount}
                      colour={totalColor}
                    />
                  </div>
                </div>
                <div className="rightWrapper-thirdRow">
                  <div className="pie-wrapper">
                    <PieGraph data={graphdata} />
                  </div>
                  <div className="bar-wrapper">
                    <BarGraph data={graphdata} />
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}
