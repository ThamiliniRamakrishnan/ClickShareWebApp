// import React, { useEffect, useState } from 'react';
// import { MdDownloadForOffline } from 'react-icons/md';
// import { Link, useParams } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';

// import { client, urlFor } from '../client';
// import MasonryLayout from './MasonryLayout';
// import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
// import Spinner from './Spinner';

// const PinDetail = ({ user = {} }) => {
//   const { pinId } = useParams();
//   const [pins, setPins] = useState();
//   const [pinDetail, setPinDetail] = useState();
//   const [comment, setComment] = useState('');
//   const [addingComment, setAddingComment] = useState(false);
//   const [editingComment, setEditingComment] = useState(null);
//   const [updatedComment, setUpdatedComment] = useState('');
//   const [replyingTo, setReplyingTo] = useState(null);
//   const [replyComment, setReplyComment] = useState('');

//   const fetchPinDetails = () => {
//     const query = pinDetailQuery(pinId);

//     if (query) {
//       client.fetch(`${query}`).then((data) => {
//         setPinDetail(data[0]);

//         if (data[0]) {
//           const query1 = pinDetailMorePinQuery(data[0]);
//           client.fetch(query1).then((res) => {
//             setPins(res);
//           });
//         }
//       });
//     }
//   };

//   useEffect(() => {
//     fetchPinDetails();
//   }, [pinId]);

//   const addComment = () => {
//     if (comment) {
//       setAddingComment(true);

//       client
//         .patch(pinId)
//         .setIfMissing({ comments: [] })
//         .insert('after', 'comments[-1]', [
//           {
//             comment,
//             _key: uuidv4(),
//             postedBy: { _type: 'postedBy', _ref: user?._id },
//           },
//         ])
//         .commit()
//         .then(() => {
//           fetchPinDetails();
//           setComment('');
//           setAddingComment(false);
//         });
//     }
//   };

//   const editComment = (commentId) => {
//     const commentToEdit = pinDetail.comments.find((comment) => comment._key === commentId);
//     if (commentToEdit) {
//       setEditingComment(commentId);
//       setUpdatedComment(commentToEdit.comment);
//     }
//   };


//   const saveEditedComment = (commentId) => {
//     const updatedComments = pinDetail.comments.map((comment) => {
//       if (comment._key === commentId) {
//         return {
//           ...comment,
//           comment: updatedComment,
//         };
//       }
//       return comment;
//     });
  
//     const updatedPinDetail = {
//       ...pinDetail,
//       comments: updatedComments.map((comment) => {
//         if (comment._key === commentId && comment.postedBy) {
//           return {
//             ...comment,
//             postedBy: { _type: 'postedBy', _ref: user?._id },
//           };
//         }
//         return comment;
//       }),
//     };
  
//     client
//       .patch(pinId)
//       .set({
//         comments: updatedComments.map((comment) => ({
//           ...comment,
//           postedBy: comment._key === commentId ? { _type: 'postedBy', _ref: user?._id } : { _type: 'postedBy', _ref: comment.postedBy._id },
//         })),
//       })
//       .commit()
//       .then(() => {
//         setPinDetail(updatedPinDetail);
//         setEditingComment(null);
//         setUpdatedComment('');
//       });
//   };
    
//   const cancelEditingComment = () => {
//     setEditingComment(null);
//     setUpdatedComment('');
//   };

//   const replyToComment = (commentId) => {
//     setReplyingTo(commentId);
//   };
  

//   const saveReplyComment = (commentId) => {
//     if (replyComment) {
//       const updatedComments = pinDetail.comments.map((comment) => {
//         if (comment._key === commentId) {
//           return {
//             ...comment,
//             replies: [
//               ...(comment.replies || []),
//               {
//                 reply: replyComment,
//                 _key: uuidv4(),
//                 postedBy: { _type: 'postedBy', _ref: user?._id },
//               },
//             ],
//           };
//         }
//         return comment;
//       });
  
//       const updatedPinDetail = {
//         ...pinDetail,
//         comments: updatedComments,
//       };
  
//       client
//         .patch(pinId)
//         .set({
//           comments: updatedComments.map((comment) => ({
//             ...comment,
//             postedBy: { _type: 'postedBy', _ref: comment.postedBy._id } || { _type: 'postedBy', _ref: user?._id },
//           })),
//         })
//         .commit()
//         .then(() => {
//           setPinDetail(updatedPinDetail);
//           setReplyingTo(null);
//           setReplyComment('');
//         });
//     }
//   };
  
  
//   const cancelReplyComment = () => {
//     setReplyingTo(null);
//     setReplyComment('');
//   };

//   const renderReplies = (replies) => {
//     console.log('Replies:', replies);
    
//     return replies.map((reply) => {
//       console.log('Reply postedBy:', reply.postedBy);
      
//       return (
//         <div className="flex flex-col gap-2 mt-5 items-start bg-white rounded-lg" key={reply._key}>
//           <div className="flex items-start gap-2">
//             <img src={reply.postedBy.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
//             <div className="flex flex-col bg-slate-200 p-2 rounded-2xl">
//               <div className="flex items-center">
//                 <p className="font-bold">{reply.postedBy.userName}</p>
//               </div>
//               <p>{reply.reply}</p>
//             </div>
//           </div>
//         </div>
//       );
//     });
//   };

//   if (!pinDetail) {
//     return <Spinner message="Showing pin" />;
//   }

//   return (
//     <>
//       <div className="flex xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
//         <div className="flex justify-center items-center md:items-start flex-initial">
//           <img
//             className="rounded-t-3xl rounded-b-lg"
//             src={(pinDetail?.image && urlFor(pinDetail?.image).url())}
//             alt="user-post"
//           />
//         </div>
//         <div className="w-full p-5 flex-1 xl:min-w-620">
//           <div className="flex items-center justify-between">
//             <div className="flex gap-2 items-center">
//               <a
//                 href={`${pinDetail.image.asset.url}?dl=`}
//                 download
//                 className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
//               >
//                 <MdDownloadForOffline />
//               </a>
//             </div>
//             <a href={pinDetail.destination} target="_blank" rel="noreferrer">
//               More Info
//             </a>
//           </div>
//           <div>
//             <h1 className="text-4xl font-bold break-words mt-3">{pinDetail.title}</h1>
//             <p className="mt-3">{pinDetail.about}</p>
//           </div>
//           {user && pinDetail?.postedBy && (
//             <Link to={`/user-profile/${pinDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg">
//               {pinDetail?.postedBy.image && (
//                 <img src={pinDetail?.postedBy.image} className="w-10 h-10 rounded-full" alt="user-profile" />
//               )}
//               <p className="font-bold">{pinDetail?.postedBy.userName}</p>
//             </Link>
//           )}
//           <h2 className="mt-5 text-2xl">Comments</h2>
//           <div className="max-h-370 overflow-y-auto">
//             {pinDetail?.comments?.map((item) => {
//               const commentUser = item.postedBy || {};
//               const commentUserName = commentUser.userName || '';
//               const commentUserImage = commentUser.image || '';
//               console.log('item',item)
              
//               return (
//                 <div className="flex flex-col gap-2 mt-5 items-start bg-white rounded-lg" key={item._key}>
//                   <div className="flex items-start gap-2">
//                     <img src={commentUserImage} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
//                     <div className="flex flex-col bg-slate-200 p-2 rounded-2xl">
//                       <div className="flex items-center">
//                         <p className="font-bold">{commentUserName}</p>
//                       </div>
//                       {editingComment === item._key ? (
//                         <input
//                           className="border-gray-100 outline-none border-2 p-2 rounded-2xl"
//                           type="text"
//                           value={updatedComment}
//                           onChange={(e) => setUpdatedComment(e.target.value)}
//                         />
//                       ) : (
//                         <p>{item.comment}</p>
//                       )}
//                       {editingComment === item._key && (
//                         <div className="flex items-center ml-4 space-x-2">
//                           <button onClick={() => saveEditedComment(item._key)}>Save</button>
//                           <button onClick={() => cancelEditingComment()}>Cancel</button>
//                         </div>
//                       )}
//                       {replyingTo === item._key && (
//                         <div className="flex flex-col bg-slate-200 p-2 rounded-2xl">
//                           <input
//                             className="border-gray-100 outline-none border-2 p-2 rounded-2xl"
//                             type="text"
//                             placeholder="Reply to comment"
//                             value={replyComment}
//                             onChange={(e) => setReplyComment(e.target.value)}
//                           />
//                           <div className="flex items-center ml-4 space-x-2">
//                             <button onClick={() => saveReplyComment(item._key)}>Reply</button>
//                             <button onClick={() => cancelReplyComment()}>Cancel</button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex gap-2 ms-14 font-size">
//                     {user && user.userName === commentUser?.userName && !editingComment && (
//                       <button onClick={() => editComment(item._key)}>Edit</button>
//                     )}
//                     {!replyingTo && (
//                       <button onClick={() => replyToComment(item._key)}>Reply</button>
//                     )}
//                   </div>
//                   {item.replies && renderReplies(item.replies)}
//                 </div>
//               );
//             })}
//           </div>
          
//           <div className="flex flex-wrap mt-6 gap-3">
//             {user && (
//               <Link to={`/user-profile/${user._id}`}>
//                 <img src={user.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
//               </Link>
//             )}
//             <input
//               className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
//               type="text"
//               placeholder="Add a comment"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//             />
//             <button
//               type="button"
//               className="bg-red-500 text-white rounded-full px-6 py-2"
//               disabled={addingComment}
//               onClick={addComment}
//             >
//               Add Comment
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PinDetail;

import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';

const PinDetail = ({ user = {} }) => {
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [updatedComment, setUpdatedComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyComment, setReplyComment] = useState('');

  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        console.log('Fetched pin details:', data[0]);
        setPinDetail(data[0]);

        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuidv4(),
            postedBy: { _type: 'postedBy', _ref: user?._id },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };

  const editComment = (commentId) => {
    const commentToEdit = pinDetail.comments.find((comment) => comment._key === commentId);
    if (commentToEdit) {
      setEditingComment(commentId);
      setUpdatedComment(commentToEdit.comment);
    }
  };


  const saveEditedComment = (commentId) => {
    const updatedComments = pinDetail.comments.map((comment) => {
      if (comment._key === commentId) {
        return {
          ...comment,
          comment: updatedComment,
        };
      }
      return comment;
    });
  
    const updatedPinDetail = {
      ...pinDetail,
      comments: updatedComments.map((comment) => {
        if (comment._key === commentId && comment.postedBy) {
          return {
            ...comment,
            postedBy: { _type: 'postedBy', _ref: user?._id },
          };
        }
        return comment;
      }),
    };
  
    client
      .patch(pinId)
      .set({
        comments: updatedComments.map((comment) => ({
          ...comment,
          postedBy: comment._key === commentId ? { _type: 'postedBy', _ref: user?._id } : { _type: 'postedBy', _ref: comment.postedBy._id },
        })),
      })
      .commit()
      .then(() => {
        setPinDetail(updatedPinDetail);
        setEditingComment(null);
        setUpdatedComment('');
      });
  };
    
  const cancelEditingComment = () => {
    setEditingComment(null);
    setUpdatedComment('');
  };

  // const replyToComment = (commentId) => {
  //   setReplyingTo(commentId);
  // };
   
  // const saveReplyComment = (commentId) => {
  //   if (replyComment) {
  //     const userId = user?._id;
  //     const updatedComments = pinDetail.comments.map((comment) => {
  //       if (comment._key === commentId) {
  //         const updatedReplies = [
  //           ...(comment.replies || []),
  //           {
  //             reply: replyComment,
  //             _key: uuidv4(),
  //             commentId: comment._key,
  //             postedBy: userId ? { _type: 'postedBy', _ref: userId } : undefined },
  //         ];
  
  //         return {
  //           ...comment,
  //           replies: updatedReplies,
  //         };
  //       }
  
  //       return comment;
  //     });
      
  //     console.log('updated comments', updatedComments);
  //     updatedComments.map((comment) => {
  //       console.log('updated comment', comment)
  //       console.log('comment replies', comment.replies)
  //     });
  
  //     const updatedPinDetail = {
  //       ...pinDetail,
  //       comments: updatedComments,
  //     };
  
  //     client
  //       .patch(pinId)
  //       .set({
  //         comments: updatedComments.map((comment) => ({
  //           ...comment,
  //           ...(comment.postedBy ? { postedBy: { _type: 'postedBy', _ref: comment.postedBy._id  } } : {}),
  //           replies: comment.replies.map((reply) => ({
  //             ...reply,
  //             postedBy: reply.commentId === commentId ? { _type: 'postedBy', _ref: user?._id } : { _type: 'postedBy', _ref: reply.postedBy?._ref }
  //                           // postedBy: reply._key === commentId ? { _type: 'postedBy', _ref: user?._id } : reply.postedBy
  //           })),
  //         })),
  //       })
  //       .commit()
  //       .then(() => {
  //         setPinDetail(updatedPinDetail);
  //         setReplyingTo(null);
  //         setReplyComment('');
  //       });
  //   }
  // };
  
  
  // const saveReplyComment = (commentId) => {
  //   if (replyComment) {
  //     const userId = user?._id;
  //     let updatedReplies = [];
  
  //     const updatedComments = pinDetail.comments.map((comment) => {
  //       if (comment._key === commentId) {
  //         updatedReplies = [
  //           ...(comment.replies || []),
  //           {
  //             reply: replyComment,
  //             _key: uuidv4(),
  //             commentId: comment._key,
  //             postedBy: userId ? { _type: 'postedBy', _ref: userId } : undefined,
  //           },
  //         ];
  
  //         return {
  //           ...comment,
  //           replies: updatedReplies,
  //         };
  //       }
  
  //       return comment;
  //     });
  
  //     const updatedPinDetail = {
  //       ...pinDetail,
  //       comments: updatedComments,
  //     };
  
  //     client
  //       .patch(pinId)
  //       .set({
  //         comments: updatedComments.map((comment) => ({
  //           ...comment,
  //           ...(comment.postedBy ? { postedBy: { _type: 'postedBy', _ref: comment.postedBy._id } } : {}),
  //           replies: comment.replies.map((reply) => {
  //             if (reply._key === updatedReplies[updatedReplies.length - 1]._key) {
  //               return {
  //                 ...reply,
  //                 postedBy: { _type: 'postedBy', _ref: user?._id },
  //               };
  //             }
  //             return reply;
  //           }),
  //         })),
  //       })
  //       .commit()
  //       .then(() => {
  //         setPinDetail(updatedPinDetail);
  //         setReplyingTo(null);
  //         setReplyComment('');
  //       });
  //   }
  // };
  
  
  
  
  
  
  // const cancelReplyComment = () => {
  //   setReplyingTo(null);
  //   setReplyComment('');
  // };
  


  // const renderReplies = (replies, commentId) => {
  //   return replies
  //     .filter((reply) => reply.commentId === commentId)
  //     .map((reply) => {
  //       return (
  //         <div className="reply-container" key={reply._key}>
  //           <div className="flex items-start gap-2">
  //             <img src={reply.postedBy.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
  //             <div className="flex flex-col bg-slate-200 p-2 rounded-2xl">
  //               <div className="flex items-center">
  //                 <p className="font-bold">{reply.postedBy.userName}</p>
  //               </div>
  //               <p>{reply.reply}</p>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     });
  // };
  
  // const renderReplies = (replies, commentId) => {
  //   return replies
  //     .filter((reply) => reply.commentId === commentId)
  //     .map((reply) => {
  //       const replyUser = reply.postedBy || {};
  //       const replyUserName = replyUser.userName || '';
  //       const replyUserImage = replyUser.image || '';
  
  //       return (
  //         <div className="reply-container" key={reply._key}>
  //           <div className="flex items-start gap-2">
  //             <img src={replyUserImage} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
  //             <div className="flex flex-col bg-slate-200 p-2 rounded-2xl">
  //               <div className="flex items-center">
  //                 <p className="font-bold">{replyUserName}</p>
  //               </div>
  //               <p>{reply.reply}</p>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     });
  // };

  
  if (!pinDetail) {
    return <Spinner message="Showing pin" />;
  }

  return (
    <>
      <div className="flex xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
        <div className="flex justify-center items-center md:items-start flex-initial">
          <img
            className="rounded-t-3xl rounded-b-lg"
            src={(pinDetail?.image && urlFor(pinDetail?.image).url())}
            alt="user-post"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                href={`${pinDetail.image.asset.url}?dl=`}
                download
                className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a href={pinDetail.destination} target="_blank" rel="noreferrer">
              More Info
            </a>
          </div>
          <div>
            <h1 className="text-4xl font-bold break-words mt-3">{pinDetail.title}</h1>
            <p className="mt-3">{pinDetail.about}</p>
          </div>
          {user && pinDetail?.postedBy && (
            <Link to={`/user-profile/${pinDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg">
              {pinDetail?.postedBy.image && (
                <img src={pinDetail?.postedBy.image} className="w-10 h-10 rounded-full" alt="user-profile" />
              )}
              <p className="font-bold">{pinDetail?.postedBy.userName}</p>
            </Link>
          )}
          <h2 className="mt-5 text-2xl">Comments</h2>
          <div className="max-h-370 overflow-y-auto">
              {pinDetail?.comments?.map((item) => {
                const commentUser = item.postedBy || {};
                const commentUserName = commentUser.userName || '';
                const commentUserImage = commentUser.image || '';

                return (
                  <div className="flex flex-col gap-2 mt-5 items-start bg-white rounded-lg" key={item._key}>
                    <div className="flex items-start gap-2">
                      <img src={commentUserImage} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
                      <div className="flex flex-col bg-slate-200 p-2 rounded-2xl">
                        <div className="flex items-center">
                          <p className="font-bold">{commentUserName}</p>
                        </div>
                        {editingComment === item._key ? (
                          <input
                            className="border-gray-100 outline-none border-2 p-2 rounded-2xl"
                            type="text"
                            value={updatedComment}
                            onChange={(e) => setUpdatedComment(e.target.value)}
                          />
                        ) : (
                          <p>{item.comment}</p>
                        )}
                        {editingComment === item._key && (
                          <div className="flex items-center ml-4 space-x-2">
                            <button onClick={() => saveEditedComment(item._key)}>Save</button>
                            <button onClick={() => cancelEditingComment()}>Cancel</button>
                          </div>
                        )}
                        {/* {replyingTo === item._key && (
                          <div className="flex flex-col bg-slate-200 p-2 rounded-2xl">
                            <input
                              className="border-gray-100 outline-none border-2 p-2 rounded-2xl"
                              type="text"
                              placeholder="Reply to comment"
                              value={replyComment}
                              onChange={(e) => setReplyComment(e.target.value)}
                            />
                            <div className="flex items-center ml-4 space-x-2">
                              <button onClick={() => saveReplyComment(item._key)}>Reply</button>
                              <button onClick={() => cancelReplyComment()}>Cancel</button>
                            </div>
                          </div>
                        )} */}
                      </div>
                    </div>
                    <div className="flex gap-2 ms-14">
                      {user && user.userName === commentUser?.userName && !editingComment && (
                        <button onClick={() => editComment(item._key)}>Edit</button>
                      )}
                      {/* {!replyingTo && (
                        <button onClick={() => replyToComment(item._key)}>Reply</button>
                      )} */}
                    </div>
                    {/* <div className="flex flex-col gap-2 ms-14">
                      {item.replies && renderReplies(item.replies, item._key)}
                    </div> */}
                  </div>
                );
              })}
          </div>
          
          <div className="flex flex-wrap mt-6 gap-3">
            {user && (
              <Link to={`/user-profile/${user._id}`}>
                <img src={user.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
              </Link>
            )}
            <input
              className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-red-500 text-white rounded-full px-6 py-2"
              disabled={addingComment}
              onClick={addComment}
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PinDetail;
