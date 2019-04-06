// import logger from '../utils/logger';
// import * as bcrypt from '../utils/bcrypt';
// import transform from '../utils/transform';
// import Role from '../resources/enums/Role';
// import User from '../models/userModel';
import * as UserDao from '../daos/user';
import UserPayload from '../domain/requests/UserPayload';
// import * as userDao from '../daos/user';
// import UserDetail from '../domain/entities/UserDetail';
// import UserPayload from '../domain/requests/UserPayload';

/**
 * Fetch all users from users table.
 *
 * @returns {Promise<UserPayload[]>}
 */
export async function fetchAll(searchKey:string): Promise<UserPayload[]> {
  let users:any = await UserDao.fetchAll(searchKey);

  return users;
}

export async function create(user:UserPayload): Promise<UserPayload[]> {
  let users:any = await UserDao.create(user)

  return users;
}

export async function update(id: string,user:UserPayload): Promise<UserPayload[]> {
  let updateUser:any = await UserDao.update(id, user)

  return updateUser;
}

export async function getById(id: string): Promise<UserPayload[]> {
  let updateUser:any = await UserDao.getById(id)

  return updateUser;
}
