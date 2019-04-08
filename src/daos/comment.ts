import Comment from '../models/commentModel';
import CommentPayload from '../domain/requests/CommentPayload';

export function create(comment: CommentPayload, postId: any){
  return new Promise((resolve, reject) => {
    let buildComment = {
      description: comment.description || '',
      posts: {
        "_id": postId
      },
      users: {
        "_id": "5ca8b91e9aaedf1052da6205"
      }
    }
    const CommentModel = new Comment(buildComment)
    CommentModel.save()
    .then((comment: any) => resolve(comment))
    .catch((err: any) => reject(err));
  });
}

export function findByPostId(postId: string){
  return new Promise((resolve, reject) => {
    let option = {}
    if (!postId) {
      throw new Error("pass post id please")
    }
    option = {
      posts: postId
    }

    Comment.find(option).populate('users', 'name').populate({
      path: 'sub_comments.users',
      model: 'users',
      select: 'name'
      })
    .then((user: any) => resolve(user))
    .catch((err: any) => reject(err));
  });
}

export function createSubComment(subComment: CommentPayload, commentId: any){
  return new Promise((resolve, reject) => {
    let sub_comment = {
      description: subComment.description || '',
      users: {
        "_id": "5ca8b91e9aaedf1052da6205"
      }
    }

    Comment.findOneAndUpdate(
      {"_id": commentId}, 
      {$push: {sub_comments: sub_comment}})
      .then((comment:any) =>resolve(comment))
      .catch((err: any) => reject(err));
  });
}

export function updateSubComment(subComment: CommentPayload, commentId: any, subCommentId:any){
  return new Promise((resolve, reject) => {

    Comment.findById(commentId)
      .then((comment:any) =>{
        let subDoc = comment.sub_comments.id(subCommentId);
        subDoc.set({"description": subComment.description || ''});

        console.log("the description is ", subDoc)
        
        comment.save().then(function(savedComment: any) {
          resolve(savedComment)
        }).catch(function(err: any) {
          reject(err)
        });
      })
      .catch((err: any) => reject(err));
  });
}
