import React, { Component } from 'react';
import SwService from '../../services/sw-service';

import "./planet-style.css";

export default class Planets extends Component {
    constructor(props){
      super(props);
      this.state = {
        idPlanet: 1,
        error: null,
        urlImg: 'https://starwars-visualguide.com/assets/img/placeholder.jpg',
        isLoaded: false,
        item: {},
        urlInfo: 'https://swapi.dev/api/planets/1/'
      };
    }

    componentDidMount(){
      SwService.getInfo(this.state.urlInfo)
        .then(data => {
          this.setState({
            isLoaded: true,
            item: data
          })        
        })
        .catch((error) => {
          this.setState({
            isLoaded: true,
            error
          });
        })
    }

    nextPage = async () => {
      await this.setState( prev => {
        const newId = this.state.idPlanet + 1;
        return {
          urlInfo: `https://swapi.dev/api/planets/${ newId }/`,
          idPlanet: newId
        }
      })
      if(this.state.idPlanet !== 1 && this.state.idPlanet < 21 && this.state.idPlanet !== 20){
        await this.setState( {
          urlImg: `https://starwars-visualguide.com/assets/img/planets/${this.state.idPlanet}.jpg`
        })
      }else{
        await this.setState( {
          urlImg: 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
        })
      }
      await this.componentDidMount()
    }

    render(){
      const { error, isLoaded, item, urlImg } = this.state
      if (error) {
        return <div>Помилка: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Завантаження...</div>;
      } else {
        return (
          <div className='jumbotron rounded'>
            <div>
              <button className='btn btn-primary' onClick={this.nextPage}>
                Next
              </button>
            </div>
            <img
              src={urlImg}
              alt={item.name} className = 'planet-img'
            />
            <div>
              <h3>{item.name}</h3>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                  <span className='term'>Population: </span>
                  <span>{item.population}</span>
                </li>
                <li className='list-group-item'>
                  <span className='term'>Rotation Period: </span>
                  <span>{item.rotation_period}</span>
                </li>
                <li className='list-group-item'>
                  <span className='term'>Diameter: </span>
                  <span>{item.diameter}</span>
                </li>
              </ul>
            </div>
          </div>
        );
      }
    }
}
