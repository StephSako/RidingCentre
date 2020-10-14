export class User {

  constructor(
    public id: number,
    public password: string,
    public lastName: string,
    public firstName: string,
    public phoneNumber: string,
    public email: string,
    public licenseNumber?: string
  ) {  }

}
