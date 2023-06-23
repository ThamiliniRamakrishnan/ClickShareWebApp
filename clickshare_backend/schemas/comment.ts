// // export default {
// //     name: 'comment',
// //     title: 'Comment',
// //     type: 'document',
// //     fields: [
// //         {
// //             name:'postedBy',
// //             title: 'PostedBy',
// //             type:'postedBy',
// //         },
// //         {
// //             name:'comment',
// //             title: 'Comment',
// //             type:'string',
// //         },
// //     ]
// // }
export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'postedBy',
      title: 'Posted By',
      type: 'postedBy',
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },
    {
      name: 'replies',
      title: 'Replies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'reply',
              title: 'Reply',
              type: 'string',
            },
            {
              name: 'commentId',
              title: 'CommentId',
              type: 'string',
            },
            {
              name: 'postedBy',
              title: 'Posted By',
              type: 'postedBy',
            },
          ],
        },
      ],
    },
  ],
}
  
// export default {
//   name: 'comment',
//   title: 'Comment',
//   type: 'document',
//   fields: [
//     {
//       name: 'comment',
//       title: 'Comment',
//       type: 'string'
//     },
//     {
//       name: 'postedBy',
//       title: 'Posted By',
//       type: 'reference',
//       to: [{ type: 'user' }]
//     },
//     {
//       name: 'replies',
//       title: 'Replies',
//       type: 'array',
//       of: [
//         {
//           type: 'object',
//           fields: [
//             {
//               name: 'reply',
//               title: 'Reply',
//               type: 'string'
//             },
//             {
//               name: 'postedBy',
//               title: 'Posted By',
//               type: 'reference',
//               to: [{ type: 'user' }]
//             }
//           ]
//         }
//       ]
//     }
//   ]
// };
