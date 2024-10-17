import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Toaster from '../commonComponents/Toaster';
import WithHeader from '../commonComponents/HOC';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { format } from 'timeago.js';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/fetchbyId/${postId}`);
        const data = await response.json();
        if (response.ok) {
          setPost(data);
        } else {
          Toaster({ status: 'error', message: 'Error fetching post details' });
        }
      } catch (error) {
        Toaster({ status: 'error', message: 'Server Error: Unable to fetch post details' });
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <div className=" flex items-center justify-center mt-14 p-5 container mx-auto">
      {post ? (
        <div className="bg-white p-4 shadow rounded-lg lg:w-[60%] w-[95%]">
           <div className="flex items-center">
                  <img
                    src={`/${post.user?.profileImage || 'default-avatar.png'}`}
                    alt={`${post.user?.firstName || 'Unknown'} ${post?.user?.lastName || 'User'}'s profile`}
                    className="rounded-full w-12 h-12 mr-2"
                  />
                  <div>
                    <h4 className="text-blue-500 text-lg font-semibold">
                      {`${post.user?.firstName || 'Unknown'} ${post?.user?.lastName || 'User'}`}
                    </h4>
                    <p className="text-sm text-gray-500">{format(post?.createdAt)}</p>
                  </div>
                </div>
          <h1 className="text-xl font-semibold">{post?.title}</h1>
          <p className="text-gray-800 mt-2">{post?.content}</p>
          {post.image && (
            <img
              src={`/${post?.image}`}
              alt="Post content"
              className="w-full h-full mt-2 rounded-lg"
            />

          )}
           <div className="flex justify-between text-gray-500 mt-2 border-b border-gray-300 pb-2">
                  <span> <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="text-blue-500 cursor-pointer"
                      /> {post?.likes?.length} </span>
                  <span
                    className="cursor-pointer"
                  >
                    {post?.comments?.length || 0} Comments
                  </span>
                </div>
          <ul className="mt-2 space-y-2">
            {post.comments.map((comment, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded flex flex-row gap-2">
                <img
                  src={`/${comment?.user?.profileImage || 'default-avatar.png'}`}
                  className='rounded-full w-12 h-12 mr-2'
                  alt={`${comment?.user?.firstName || 'User'} ${comment?.user?.lastName || ''}`}
                />
                <div className='flex flex-col '>
                  <strong>{`${comment?.user?.firstName || 'User'} ${comment?.user?.lastName || ''}`}</strong>
                  {comment?.comments}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}


    </div>
  );
};

export default WithHeader(PostDetail);
