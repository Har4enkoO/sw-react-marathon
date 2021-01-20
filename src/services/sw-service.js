import axios from 'axios';

export default class SwapiService {
  _apiBase = 'https://swapi.dev/api/';
  async getResource(url) {
    const res = await axios.get(`${this._apiBase}${url}`);
    const body = await res.data;
    return await body;
  }
  async getAllPeople() {
    const people = await this.getResource(`people/`);
    return people.results;
  }
  getPerson(id) {
    return this.getResource(`people/${id}`);
  }

  async getAllPlanets() {
    const planets = await this.getResource(`planets/`);
    return planets.results;
  }
  getPlanet(id) {
    return this.getResource(`planets/${id}`);
  }

  async getAllStarShips() {
    const starships = await this.getResource(`starships/`);
    return starships.results;
  }
  getStarship(id) {
    return this.getResource(`starships/${id}`);
  }
}
