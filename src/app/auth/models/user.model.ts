export interface User {

  _expiry: Date,
  _token: string,
  user: {
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    is_admin: boolean
  }


}
