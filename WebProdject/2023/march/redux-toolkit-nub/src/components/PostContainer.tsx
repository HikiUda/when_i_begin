import { FC, useState, useEffect } from 'react';
import { IPost } from '../models/IPost';
import { postAPI } from '../services/PostService';
import PostItem from './PostItem';

const PostContainer: FC = () => {
   const [limit, setLimit] = useState(20);
   const { data: posts, isLoading, error, refetch } = postAPI.useFetchAllPostQuery(limit);
   const [createPost, {}] = postAPI.useCreatePostMutation();
   const [updatePost, {}] = postAPI.useUpdatePostMutation();
   const [deletePost, {}] = postAPI.useDeletePostMutation();
   useEffect(() => {
      // setTimeout(() => setLimit(3), 2000);
   }, []);

   const handleRemove = (post: IPost) => {
      deletePost(post);
   };
   const handleUpdate = (post: IPost) => {
      updatePost(post);
   };

   const handleCreate = async () => {
      const title = prompt();
      await createPost({ title, body: title } as IPost);
   };

   return (
      <div>
         <button onClick={() => refetch()}>refetch</button>
         <div>
            <button onClick={handleCreate}>Add new post</button>
            {isLoading && <h1>Loading...</h1>}
            {error && <h1>Error</h1>}
            {posts?.map((post) => {
               return (
                  <PostItem remove={handleRemove} update={handleUpdate} key={post.id} post={post} />
               );
            })}
         </div>
      </div>
   );
};

export default PostContainer;
