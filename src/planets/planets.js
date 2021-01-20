import React, { Component } from 'react';
import SwService from '../services/sw-service';

import "./planet-style.css";

export default class Planets extends Component {
  swService = new SwService();

  state = {
    id: 2,
    name: null,
    population: null,
    rotationPeriod: null,
    diameter: null,
  };
  constructor() {
    super();
    this.updatePlanet(this.state.id);
  }
  updatePlanet(id) {
    this.swService.getPlanet(id).then((planet) => {
      this.setState({
        id,
        name: planet.name,
        population: planet.population,
        rotationPeriod: planet.rotation_period,
        diameter: planet.diameter,
      });
    });
  }
  changePlanet = () => {
    this.updatePlanet(this.state.id + 1);
  };

  render() {
    const { id, name, population, rotationPeriod, diameter } = this.state;

    return (
      <div className='jumbotron rounded'>
        <div>
          <button className='btn btn-primary' onClick={this.changePlanet}>
            Next
          </button>
        </div>
        <img
          src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
          alt='planet' className = 'planet-img'
        />
        <div>
          <h4>{name}</h4>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              <span className='term'>Population: </span>
              <span>{population}</span>
            </li>
            <li className='list-group-item'>
              <span className='term'>Rotation Period: </span>
              <span>{rotationPeriod}</span>
            </li>
            <li className='list-group-item'>
              <span className='term'>Diameter: </span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
