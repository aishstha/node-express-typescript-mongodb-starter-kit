import User from '../models/userModel';
import UserPayload from '../domain/requests/UserPayload';

export function create(user:UserPayload){
  return new Promise((resolve, reject)=>{
    let UserModel = new User(user)
    UserModel.save()
    .then((user:any)=>resolve(user))
    .catch((err:any)=>reject(err));
  });
}

export function fetchAll(searchKey:string){
  return new Promise((resolve, reject)=>{
    let option ={}
    if (searchKey)
      option.name=searchKey;

    User.find(option)
    .then((user:any)=> resolve(user))
    .catch((err:any)=>reject(err));
  });
}

export function update(id:any , user:object){
  return new Promise((resolve, reject)=>{
    User.findOneAndUpdate({_id:id}, user)
    .then((user:any)=> resolve(user))
    .catch((err:any)=>reject(err));
  });
}

export function getById(id:any , user:object){
  return new Promise((resolve, reject)=>{
    User.findById(id)
    .then((user:any)=> resolve(user))
    .catch((err:any)=>reject(err));
  });
}
