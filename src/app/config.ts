export class Config {
  static get api(): string { return `http://ibge-alfred.herokuapp.com` }
  static get postStartChat(): string { return `${Config.api}/startChat` }
}