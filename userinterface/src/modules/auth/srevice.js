import request from '../../utils/fetch';

export const emailLogin = ({email, password}) =>
  request.post(`/usermanagement/users/login`, {email, password});
