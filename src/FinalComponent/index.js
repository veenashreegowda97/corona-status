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
    newConfirm: 0,
    newRecover: 0,
    newDeath: 0,
    totalCount: 0,
    newtotal: 0,
    isFetching: true
  };
  handleCountryList = e => {
    this.setState({ dropdownValue: e.target.innerHTML }, () => {
      this.getDataBasedOnCountry();
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
      .get("https://api.covid19api.com/summary")
      .then(response => {
        this.setState(
          {
            dataResult: response.data.Countries
          },
          () => {
            this.getDataBasedOnCountry();
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
    let {
      confirmedCount,
      recoveredCount,
      deathCount,
      newConfirm,
      newDeath,
      newRecover
    } = this.state;
    return resultSet.map(dataElement => {
      if (dataElement.Country === `${this.state.dropdownValue}`) {
        this.setState({
          confirmedCount: dataElement.TotalConfirmed,
          recoveredCount: dataElement.TotalRecovered,
          deathCount: dataElement.TotalDeaths,
          newConfirm: dataElement.NewConfirmed,
          newDeath: dataElement.NewDeaths,
          newRecover: dataElement.NewRecovered,
          totalCount:
            dataElement.TotalConfirmed +
            dataElement.TotalRecovered +
            dataElement.TotalDeaths,
          newtotal:
            dataElement.NewConfirmed +
            dataElement.NewDeaths +
            dataElement.NewRecovered,
          isFetching: false
        });
      }
    });
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
        <div className="header-wrapper">
          <div className="fa fa-asterisk home"></div>
          <div className="dashboardContent-wrapper">COVID-19</div>
        </div>
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
                      new={this.state.newConfirm}
                      colour={confirmColor}
                    />
                  </div>
                  <div>
                    <Cards
                      title="Total Death Cases"
                      count={this.state.deathCount}
                      new={this.state.newDeath}
                      colour={deathColor}
                    />
                  </div>
                  <div>
                    <Cards
                      title="Total Recovered Cases"
                      count={this.state.recoveredCount}
                      new={this.state.newRecover}
                      colour={recoverColor}
                    />
                  </div>
                  <div>
                    <Cards
                      title="Total Cases"
                      count={this.state.totalCount}
                      new={this.state.newtotal}
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
