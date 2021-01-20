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
  static getInfo = async (url) => {
        const resp = await axios.get(url);
         return resp.data
    }
}
