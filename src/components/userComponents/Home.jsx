import React, { useEffect, useState } from 'react';
import pic from '../images/pic.jpg';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { io } from 'socket.io-client';
import Toaster from '../commonComponents/Toaster';
import Modal from '../commonComponents/Modal';
import WithHeader from '../commonComponents/HOC';
import { useSelector } from 'react-redux';


const socket = io('http://localhost:3001');

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ createPost: '', file: '' });
  const [profile, setProfile] = useState({});
  const [comment, setComment] = useState('');
  const [expandedComments, setExpandedComments] = useState({});
  const [fetchPost, setFetchPost] = useState([]);
  const [toggleLike, setToggleLike] = useState(false)
  const authUser = useSelector((state) => state.auth.user)
  const userId = authUser?.info?._id
  useEffect(() => {

    socket.on('post updated', async (updatedPost) => {
      setFetchPost((prevPosts) =>
        prevPosts.map((post) =>
          updatedPost._id === post._id ? updatedPost : post
        )
      )
    })

    fetchPosts();
    fetchProfile();
    return () => {
      socket.off('post updated')
    }
  }, []);

  const toggleComments = (postId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleToggleLike = () => {
    setToggleLike(!toggleLike)
  }

  const fetchProfile = async () => {
    try {
      const response = await fetch('/profile');
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
      } else {
        Toaster({ status: 'error', message: 'Error Fetching Profile' });
      }
    } catch (error) {
      Toaster({ status: 'error', message: 'Server Error: Unable to fetch profile' });
    }
  };

  const createPost = async () => {
    try {
      const formDataObj = new FormData();
      formDataObj.append('content', formData.createPost);
      formDataObj.append('file', formData.file);

      const response = await fetch('/create-post', {
        method: 'POST',
        body: formDataObj,
      });
      const data = await response.json();
      if (response.ok) {
        Toaster({ status: 'success', message: data.message });
        fetchPosts();
        handleModalOpen();
      } else {
        Toaster({ status: 'error', message: data.message });
      }
    } catch (error) {
      Toaster({ status: 'error', message: 'Server Error: Unable to create post' });
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('/fetch-posts');
      const data = await response.json();
      if (response.ok) {
        setFetchPost(data);
      } else {
        Toaster({ status: 'error', message: 'Error fetching posts' });
      }
    } catch (error) {
      Toaster({ status: 'error', message: 'Server Error: Unable to fetch posts' });
    }
  };


  const handleLike = async (postId, userId, recipientId) => {
    try {
      const response = await fetch('/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientId,
          userId,
          postId,
          action: 'like',
          message: `${authUser.info.firstName} liked your post`,
        }),
      });

      const data = await response.json();
      setToggleLike(true);
      if (!response.ok) {
        Toaster({ status: 'error', message: 'Error sending notification:' || data.message });
      }
    } catch (error) {
      Toaster({ status: 'error', message: 'Server error:' });
    }
  };

  const handleComment = async (postId, userId, recipientId) => {

    try {
      const response = await fetch('/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipientId,
          userId,
          postId,
          comment,
          action: 'comment',
          message: `${authUser.info.firstName} commented on your post`,
        })
      })
      const data = await response.json()
      if (response.ok) {
        Toaster({ status: 'success', message: data.message })
        fetchPosts()
      }
    } catch (error) {
      Toaster({ status: 'error', message: 'Server Error' });
    }
  };


  const handleUnlike = async (postId, userId) => {
    // socket.emit('unlike post', { postId, userId });
    try {
      const response = await fetch('/unlike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postId,
          userId
        })
      })
      const data = await response.json()
      setToggleLike(true);
      if (response.ok) {
        Toaster({ status: 'success', message: data.message })
        fetchPosts()
      }
    } catch (error) {
      Toaster({ status: 'error', message: 'Server Error' });
    }
  };

  const sendNotifications = async () => {

  }


  const handleModalOpen = () => setShowModal((prev) => !prev);

  return (
    <div className="mt-14 p-5 container mx-auto">
      <div className="flex flex-col lg:flex-row gap-5 justify-between">

        <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
          <div className="bg-gradient-to-l from-orange-50 to-gray-50 p-4 shadow rounded-lg">
            <div className="text-center">
              <img
                src={profile.profileImage || pic}
                alt="Profile"
                className="rounded-full mb-3 w-24 h-24 mx-auto"
              />
              <h3 className="text-xl font-semibold">
                {`${profile.firstName || ''} ${profile.lastName || ''}`}
              </h3>
              <p className="text-gray-600">{profile.headline || ''}</p>
            </div>
            <nav className="mt-4 space-y-2">
              <NavLink to="/connections" className="block text-blue-500">My Network</NavLink>
              <NavLink to="/jobs" className="block text-blue-500">Jobs</NavLink>
              <NavLink to="/messaging" className="block text-blue-500">Messaging</NavLink>
              <NavLink to="/notification" className="block text-blue-500">Notifications</NavLink>
            </nav>
          </div>
        </div>

        <div className="w-full lg:w-2/4 mb-4 lg:mb-0">
          <div className="bg-white p-4 shadow rounded-lg">
            <div className="flex items-center">
              <img
                src={profile.profileImage || pic}
                alt="Profile"
                className="rounded-full w-12 h-12 mr-2"
              />
              <input
                type="text"
                className="w-full p-2 rounded-full border border-gray-300"
                placeholder="Start a post"
                onClick={handleModalOpen}
              />
            </div>
            <div className="flex justify-start mt-3 gap-5">
              <NavLink to="#" className="text-blue-500">Media</NavLink>
              <NavLink to="#" className="text-blue-500">Event</NavLink>
              <NavLink to="#" className="text-blue-500">Article</NavLink>
            </div>
          </div>


          <div className="mt-4 space-y-4">
            {fetchPost.map((post) => (
              <div key={post._id} className="bg-white p-4 shadow rounded-lg">
                <div className="flex items-center">
                  <img
                    src={`/${post?.user?.profileImage || 'default-avatar.png'}`}
                    alt={`${post?.user?.firstName || 'Unknown'} ${post?.user?.lastName || 'User'}'s profile`}
                    className="rounded-full w-12 h-12 mr-2"
                  />
                  <div>
                    <h4 className="text-blue-500 text-lg font-semibold">
                      {`${post?.user?.firstName || 'Unknown'} ${post?.user?.lastName || 'User'}`}
                    </h4>
                    <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <p className="mt-2 text-gray-800">{post.content}</p>
                {post.image && (
                  <img
                    src={`/${post.image}`}
                    alt="Post content"
                    className="w-full h-auto mt-2 rounded-lg"
                  />
                )}
                <div className="flex justify-between text-gray-500 mt-2 border-b border-gray-300 pb-2">
                  <span>{post.likes?.length} Likes</span>
                  <span
                    onClick={() => toggleComments(post._id)}
                    className="cursor-pointer"
                  >
                    {post.comments?.length || 0} Comments
                  </span>
                </div>

                <div className="flex gap-4 mt-2">
                  <p

                    className="cursor-pointer"
                  >
                    {toggleLike ? (
                      <FontAwesomeIcon
                        onClick={() => handleUnlike(post._id, userId)}
                        icon={faThumbsDown}
                        className="text-blue-500 cursor-pointer"
                      />
                    ) : (
                      <FontAwesomeIcon
                        onClick={() => handleLike(post._id, userId, post.user._id)}
                        icon={faThumbsUp}
                        className="text-blue-500 cursor-pointer"
                      />
                    )}

                  </p>
                  <p
                    onClick={() => toggleComments(post._id)}
                    className="cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faComment} />
                  </p>
                </div>


                {expandedComments[post._id] && (
                  <>
                    <div className="mt-3 flex items-center">
                      <textarea
                        className="w-full p-2 rounded border border-gray-300"
                        rows="1"
                        placeholder="Write a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        style={{ resize: 'none' }}
                      />
                      <button
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                        onClick={() => handleComment(post._id, userId, post.user._id)}
                      >
                        Post
                      </button>
                    </div>
                    <ul className="mt-2 space-y-2">
                      {post.comments.map((comment, index) => (
                        <li key={index} className="bg-gray-100 p-2 rounded flex flex-row gap-2">
                          <img
                            src={`/${comment.user?.profileImage || 'default-avatar.png'}`}
                            className='rounded-full w-12 h-12 mr-2'
                            alt={`${comment.user?.firstName || 'User'} ${comment.user?.lastName || ''}`}
                          />
                          <div className='flex flex-col '>
                            <strong>{`${comment.user?.firstName || 'User'} ${comment.user?.lastName || ''}`}</strong>
                            {comment.comments}
                          </div>
                        </li>
                      ))}
                    </ul>

                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/4">
          <div className="bg-white p-4 shadow rounded-lg mb-4">
            <h4 className="text-lg font-semibold">Trending</h4>
            <p className="mt-2 text-gray-600">Trending post or topic</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h4 className="text-lg font-semibold">Ads</h4>
            <p className="mt-2 text-gray-600">Advertisement content</p>
          </div>
        </div>
      </div>

      <Modal show={showModal} handleClose={handleModalOpen} title="Post Something" handleSave={createPost}>
        <div>
          <textarea
            name="createPost"
            value={formData.createPost}
            onChange={handleInput}
            id="createPost"
            cols="30"
            rows="3"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
            placeholder="What's on your mind?"
          />

          <input
            type="file"
            name="file"
            onChange={handleInput}
            className="block w-full mt-2 cursor-pointer px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
          />

          <div className="flex flex-row gap-2 mt-4 items-center">
            <p>Share on LinkedIn?</p>
            <label htmlFor="check" className="bg-white cursor-pointer relative w-16 h-7 rounded-full flex items-center transition-colors duration-500 peer-checked:bg-blue-800">
              <input type="checkbox" id="check" className="sr-only peer" />
              <span className="w-6 h-6 bg-blue-500 absolute rounded-full left-1 peer-checked:bg-blue-700 peer-checked:left-9 transition-all duration-500"></span>
            </label>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default WithHeader(Home);


