import React, { Component } from 'react';
import SwService from '../../services/sw-service';

import './starship-style.css';

export default class Starships extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idStarships: 0,
      error: null,
      isLoaded: false,
      items: [],
      currentItem: {},
      imageUrl: 'https://starwars-visualguide.com/assets/img/placeholder.jpg',
      urlInfo: 'https://swapi.dev/api/starships/',
    };
  }
  componentDidMount() {
    SwService.getInfo(this.state.urlInfo)
      .then((data) => {
        this.setState({
          isLoaded: true,
          items: data.results,
          currentItem: data.results[0],
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }

  nextPage = async () => {
    await this.setState((prev) => {
      const newId = this.state.idStarships + 1;
      if (newId < 10) {
        return {
          currentItem: prev.items[newId],
          idStarships: newId,
        };
      }
      return {
        currentItem: prev.items[0],
        idStarships: 0,
      };
    });
    await this.setState(() => {
      const regex = /\d+/g;
      const url = this.state.currentItem.url;
      let matches = url.match(regex);
      if (matches[0] === '2' || matches[0] === '3' || matches[0] === '17') {
        return {
          imageUrl:
            'https://starwars-visualguide.com/assets/img/placeholder.jpg',
        };
      }
      return {
        imageUrl: `https://starwars-visualguide.com/assets/img/starships/${matches[0]}.jpg`,
      };
    });
  };

  render() {
    const { error, isLoaded, currentItem, imageUrl } = this.state;
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
          <img src={imageUrl} alt={currentItem.name} className='starship-img' />
          <div>
            <h3>{currentItem.name}</h3>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>
                <span className='term'>Model: </span>
                <span>{currentItem.model}</span>
              </li>
              <li className='list-group-item'>
                <span className='term'>Manufacturer: </span>
                <span>{currentItem.manufacturer}</span>
              </li>
              <li className='list-group-item'>
                <span className='term'>Cost: </span>
                <span>{currentItem.cost_in_credits}</span>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }
}
