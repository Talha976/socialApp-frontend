import React from 'react'

const Post = () => {
  return (
    <div>
        <div key={post._id} className="bg-white p-4 shadow rounded-lg">
                <div className="flex items-center">
                  <img
                    src={`/${post.user?.profileImage || 'default-avatar.png'}`}
                    alt={`${post.user?.firstName || 'Unknown'} ${post.user?.lastName || 'User'}'s profile`}
                    className="rounded-full w-12 h-12 mr-2"
                  />
                  <div>
                    <h4 className="text-blue-500 text-lg font-semibold">
                      {`${post.user?.firstName || 'Unknown'} ${post.user?.lastName || 'User'}`}
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
    </div>
  )
}

export default Post