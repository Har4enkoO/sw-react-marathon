import React, { Component } from 'react';
import SwService from '../services/sw-service';

import "./character-style.css";

export default class Character extends Component {
  swService = new SwService();

  state = {
    id: 1,
    name: null,
    gender: null,
    birthYear: null,
    eyeColor: null,
  };
  constructor() {
    super();
    this.updateCharacter(this.state.id);
  }
  updateCharacter(id) {
    this.swService.getPerson(id).then((person) => {
      this.setState({
        id,
        name: person.name,
        gender: person.gender,
        birthYear: person.birth_year,
        eyeColor: person.eye_color,
      });
    });
  }
  changeCharacter = () => {
    this.updateCharacter(this.state.id + 1);
  };

  render() {
    const { id, name, gender, birthYear, eyeColor } = this.state;

    return (
      <div className='random-planet jumbotron rounded'>
        <div>
          <button className='btn btn-primary' onClick={this.changeCharacter}>
            Next
          </button>
        </div>
        <img
          className='planet-image'
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt='person' className = 'character-img'
        />
        <div>
          <h3>{name}</h3>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              <span className='term'>Gender: </span>
              <span>{gender}</span>
            </li>
            <li className='list-group-item'>
              <span className='term'>Birth Year: </span>
              <span>{birthYear}</span>
            </li>
            <li className='list-group-item'>
              <span className='term'>Eye Color: </span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
