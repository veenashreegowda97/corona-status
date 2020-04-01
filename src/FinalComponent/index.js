import React, { Component, Fragment } from "react";
import "./index.css";
import Cards from "../Card";
import "font-awesome/css/font-awesome.css";
import Dropdown from "../Dropdown";
import PieGraph from "../PieGraph";
import * as utils from "../utils/utils";
import BarGraph from "../BarGraph";
import { Spinner } from "reactstrap";
import { countryList, coronaSummary } from "../Api/index";

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
    countryList().then(res => {
      this.setState({
        countryResult: res.data
      });
    });
    coronaSummary().then(res => {
      this.setState(
        {
          dataResult: res.data.Countries
        },
        () => {
          this.getDataBasedOnCountry();
        }
      );
    });
  }
  getDataBasedOnCountry = () => {
    let resultSet = [...this.state.dataResult];
    resultSet.forEach(dataElement => {
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

  getColors = () => {
    let obj = {};
    utils.casesColor.forEach(colorElement => {
      if (colorElement.name === "Confirmed") {
        obj.confirmColor = colorElement.colour;
      } else if (colorElement.name === "Death") {
        obj.deathColor = colorElement.colour;
      } else if (colorElement.name === "Recovered") {
        obj.recoverColor = colorElement.colour;
      } else if (colorElement.name === "Total") {
        obj.totalColor = colorElement.colour;
      }
    });
    return obj;
  };
  getGraphData = () => {
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
    return graphdata;
  };

  render() {
    let getColorsData = this.getColors();
    let graphdata = this.getGraphData();
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
                      colour={getColorsData.confirmColor}
                    />
                  </div>
                  <div>
                    <Cards
                      title="Total Death Cases"
                      count={this.state.deathCount}
                      new={this.state.newDeath}
                      colour={getColorsData.deathColor}
                    />
                  </div>
                  <div>
                    <Cards
                      title="Total Recovered Cases"
                      count={this.state.recoveredCount}
                      new={this.state.newRecover}
                      colour={getColorsData.recoverColor}
                    />
                  </div>
                  <div>
                    <Cards
                      title="Total Cases"
                      count={this.state.totalCount}
                      new={this.state.newtotal}
                      colour={getColorsData.totalColor}
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
