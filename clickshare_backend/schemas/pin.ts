export default {
    name:'pin',
    title:'Pin',
    type:'document',
    fields:[
        {
            name:'title',
            title:'Title',
            type:'string'
        },
        {
            name:'about',
            title:'About',
            type:'string'
        },
        {
            name:'destination',
            title:'Destination',
            type:'url'
        },
        {
            name:'category',
            title:'Category',
            type:'string'
        },
        {
            name:'image',
            title:'Image',
            type:'image',
            options:{
                hotspot:true
            }
        },
        {
            name:'userId',
            title:'UserId',
            type:'string'
        },
        {
            name:'postedBy',
            title:'PostedBy',
            type:'postedBy',
        },
        {
            name:'save',
            title:'Save',
            type:'array',
            of: [
                {   
                    type:'save' 
            }]
        },
        {
            name: 'comments',
            title: 'Comments',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'comment',
                    title: 'Comment',
                    type: 'string',
                  },
                  {
                    name: 'postedBy',
                    title: 'PostedBy',
                    type: 'postedBy',
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
                            title: 'PostedBy',
                            type: 'postedBy',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
        },
    ]
}
// export default {
//   name: 'pin',
//   title: 'Pin',
//   type: 'document',
//   fields: [
//     {
//       name: 'title',
//       title: 'Title',
//       type: 'string'
//     },
//     {
//       name: 'about',
//       title: 'About',
//       type: 'string'
//     },
//     {
//       name: 'destination',
//       title: 'Destination',
//       type: 'url'
//     },
//     {
//       name: 'category',
//       title: 'Category',
//       type: 'string'
//     },
//     {
//       name: 'image',
//       title: 'Image',
//       type: 'image',
//       options: {
//         hotspot: true
//       }
//     },
//     {
//       name: 'userId',
//       title: 'UserId',
//       type: 'string'
//     },
//     {
//       name: 'postedBy',
//       title: 'PostedBy',
//       type: 'reference',
//       to: [{ type: 'user' }]
//     },
//     {
//       name: 'save',
//       title: 'Save',
//       type: 'array',
//       of: [
//         {
//           type: 'save'
//         }
//       ]
//     },
//     {
//       name: 'comments',
//       title: 'Comments',
//       type: 'array',
//       of: [
//         {
//           type: 'object',
//           fields: [
//             {
//               name: 'comment',
//               title: 'Comment',
//               type: 'string'
//             },
//             {
//               name: 'postedBy',
//               title: 'PostedBy',
//               type: 'reference',
//               to: [{ type: 'user' }]
//             },
//             {
//               name: 'replies',
//               title: 'Replies',
//               type: 'array',
//               of: [
//                 {
//                   type: 'object',
//                   fields: [
//                     {
//                       name: 'reply',
//                       title: 'Reply',
//                       type: 'string'
//                     },
//                     {
//                       name: 'postedBy',
//                       title: 'PostedBy',
//                       type: 'reference',
//                       to: [{ type: 'user' }]
//                     }
//                   ]
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     }
//   ]
// };
