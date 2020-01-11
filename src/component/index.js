import React, { Component } from "react";
import "../App.css";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import _ from "lodash";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: ["twitter stream"],
      datasets: [
        {
          id: 'positif',
          label: "sentimen positif",
          backgroundColor: "rgba(75,192,192,1)",
          data: [0]
        },
        {
          id: 'netral',
          label: "sentimen netral",
          backgroundColor: "rgb(228,227,115)",
          data: [0]
        },
        {
          id: 'negatif',
          label: "sentimen negatif",
          backgroundColor: "rgb(227,21,55)",
          data: [0]
        }
      ],
      data: []
    };
  }

  getData = () => {
    const urlData = "https://bluetweets.herokuapp.com/sentiment";
    let data = [];
    axios
      .get(
        urlData,
        {},
        {
          headers: {
            "content-type": "application/json"
          }
        }
      )
      .then(response => {
        if (response.status === 200 && response.data !== "undefined") {
          data.push(response.data);
          console.log("cek data", data)
          this.getDataResponse(data);
        }
      })
      .catch(function(err) {
        return console.log("error get data", err);
      });
  };

  setInterval = () => {
    setInterval(this.getData, 10000);
  };

  componentDidMount() {
    this.getData();
  }

  handleDataToDisplay = (value) =>{
    let datanormal, datanegatif, datapositif = [];
    let tempData = [...this.state.datasets]
    
    _.map(value, v => {
        let data = [...v]
      _.map(data, item => {
        switch (item.word) {
          case 'POSITIF':
            datapositif = item.value;
            break;
          case 'NEGATIF':
            datanegatif = item.value;
          break;
          default:
            datanormal = item.value;
        }
      });
    });

    if(!!datanormal){
      _.map(tempData, v =>{
        switch (v.id) {
          case 'positif':
            v.data[0] = datapositif
            break;
          case 'negatif':
            v.data[0] = datanegatif
          break;
          default:
            v.data[0] = datanormal
        }
      })
      if(tempData !== this.state.datasets){
        this.setState({datasets: tempData})
      }
    }
  }
  

  getDataResponse = value => {
    this.handleDataToDisplay(value)
    let dataSet = this.state;
    return dataSet;
  };

  render() {
    return (
      <div className="Container">
        <div className="App-header">
          <p>Tugas big data analytics</p>
        </div>
        <div className="Body">
          <Bar
            data={this.getDataResponse()}
            options={{
              title: {
                display: true,
                text: "Sentimen Analisis Presiden",
                fontSize: 20
              },
              legend: {
                display: true,
                position: "bottom"
              }
            }}
          />
        </div>
      </div>
    );
  }
}

export default Home;
