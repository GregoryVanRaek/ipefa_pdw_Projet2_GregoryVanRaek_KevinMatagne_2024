export class CredentialUtils{

  public static getEmpty(): any {
    return {
      credential_id : '',
      username: '',
      password: null,
      mail: '',
      active: false,
      created: new Date(),
      updated: new Date(),
    };
  }

  public static fromDto(dto: any): any { // création d'un mapper pour récupérer les données de l'api
    return {
      credential_id: dto.credential_id || '',
      username: dto.username || '',
      password: dto.password || null,
      mail: dto.mail || '',
      active: dto.active !== undefined ? dto.active : false,
      created: dto.created ? new Date(dto.created) : new Date(),
      updated: dto.updated ? new Date(dto.updated) : new Date(),
    };
  }

}
