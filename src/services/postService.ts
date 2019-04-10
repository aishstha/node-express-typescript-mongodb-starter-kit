import * as PostDao from '../daos/post';
import PostPayload from '../domain/requests/PostPayload';

export async function create(userId: any, post: PostPayload): Promise<PostPayload[]> {
  post.users = {
    _id: userId
  }
  const posts: any = await PostDao.create(post)

  return posts;
}

export async function getById(id: string): Promise<any[]> {
  const updateUser: any = await PostDao.getById(id)

  return updateUser;
}

/**
 * Fetch all users from users table.
 *
 * @returns {Promise<UserPayload[]>}
 */
export async function fetchAll(searchKey: string): Promise<PostPayload[]> {
  const users: any = await PostDao.fetchAll(searchKey);

  return users;
}
