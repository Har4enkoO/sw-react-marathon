import React, { Component } from 'react';
import SwService from '../services/sw-service';

import './starship-style.css';

export default class Starships extends Component {
  swService = new SwService();

  state = {
    id: 1,
    name: null,
    model: null,
    passengers: null,
    manufacturer: null,
  };
  constructor() {
    super();
    this.updateStarShip(this.state.id);
  }
  updateStarShip(id) {
    this.swService.getStarship(id).then((starship) => {
      this.setState({
        id,
        name: starship.name,
        model: starship.gender,
        passengers: starship.passengers,
        manufacturer: starship.manufacturer,
      });
    });
  }
  changeStarship = () => {
    this.updateStarShip(this.state.id + 1);
  };

  render() {
    const { id, name, model, passengers, manufacturer } = this.state;

    return (
      <div className='jumbotron rounded'>
        <div>
          <button className='btn btn-primary' onClick={this.changeStarship}>
            Next
          </button>
        </div>
        <img
          src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
          alt='StarShip' className = 'starship-img'
        />
        <div>
          <h3>{name}</h3>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              <span className='term'>Model: </span>
              <span>{model}</span>
            </li>
            <li className='list-group-item'>
              <span className='term'>Passengers: </span>
              <span>{passengers}</span>
            </li>
            <li className='list-group-item'>
              <span className='term'>Manufacturer: </span>
              <span>{manufacturer}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
