import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useEffect, useState } from "react";
import Post, { PostInterface } from "../model/Post";
import User, { UserInterface } from "../model/User";
import ManageUsersTable from '../components/ManageUserTable';
import ManagePostsTable from '../components/ManagePostsTable';


  

const AdminPage = () => {
    
    const [posts, setPosts] = useState<PostInterface[]>([]);
    const [users, setUsers] = useState<UserInterface[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
          const allPosts = await Post.getAll();
          setPosts(allPosts);
        };
    
        const fetchUsers = async () => {
          const allUsers = await User.getAll(); 
          setUsers(allUsers);
        };
    
        fetchPosts();
        fetchUsers();
    }, []);

    const onEdit = (postId: string) => {
        console.log(`Edit post ${postId}`);
        //opens a modal to edit
    };

    const onDelete = async (postId: string) => {
        await Post.delete(postId);
        setPosts(posts.filter((post) => post.id!== postId));
    };

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Manage Posts',
          children: <ManagePostsTable posts={posts} onEdit={onEdit} onDelete={onDelete}/>, 
        },
        {
          key: '2',
          label: 'Manage Users',
          children: <ManageUsersTable users={users} />, 
        }
    ];


    return (
        <div className='px-4'>
            <Tabs defaultActiveKey="1" items={items}/> 
        </div>
    )

}
export default AdminPage;




// const ManageUsersTable:FC.React<ManageUsersTableProps> = ({users}) => {
//   const [posts, setPosts] = useState<PostInterface[]>([]);
//   const [users, setUsers] = useState<UserInterface[]>([]);



//   const getUser = (userId: string): UserInterface => {
//     const user = users.find((user) => user.id === userId);
//     if (!user) {
//       return {
//         id: "default-user-id",
//         name: "Unknown User",
//         email: "",
//         password: "",
//         avatar: "",
//         createDate: new Date(),
//         updateDate: new Date(),
//       };
//     }
//     return user;
//   };

//   const navigate = useNavigate();

//   return (
//     <div
//       className="no-scrollbar"
//       style={{
//         overflow: "hidden",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: "20px",
//       }}
//     >
//       {posts.map((post) => (
//         <div
//           key={post.id}
//           style={{ cursor: "pointer", marginBottom: "20px" }} // Add margin for spacing
//           onClick={() => navigate(`/detail/${post.id}`)} // Use template literal to navigate to the detail page
//         >
//           <BlogCard key={post.id} post={post} creator={getUser(post.userId)} />
//         </div>
//       ))}
//     </div>
//   );
// };







