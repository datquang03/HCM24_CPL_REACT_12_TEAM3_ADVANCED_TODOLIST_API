import React, { useEffect, useState } from 'react';
import { Input, List } from 'antd';
import { useNavigate } from "react-router-dom";
import SearchIcon from "../assets/SearchIcon.svg";
import Post, { PostInterface } from "../model/Post";
import User, { UserInterface } from "../model/User";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserInterface[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostInterface[]>([]);
  const maxUserResult = 8;
  const maxPostResult = 5;

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      // search by user name
      const filteredUserResults = users.filter(user =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filteredUserResults.slice(0, maxUserResult));

      // search by post title
      const filteredPostResults = posts.filter(post =>
        post.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPosts(filteredPostResults.slice(0, maxPostResult));
    } else {
      setFilteredUsers([]);
      setFilteredPosts([]);
    }
  };
  const navigate = useNavigate();

  const handleClickUserInfo = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  const handleClickPostInfo = (postId: string) => {
    navigate(`/detail/${postId}`);
  };

  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + ' . . .';
    }
    return title;
  };
  return (
    <div className="flex flex-col items-center">
      <Input
        size="large"
        placeholder="Search..."
        onChange={handleSearch}
        prefix={
          <img
            src={SearchIcon}
            alt="search icon"
            style={{ width: '16px', height: '16px' }}
          />
        }
        style={{ width: '700px' }}
      />
      {filteredPosts.length > 0 && (
        <List
          dataSource={filteredPosts}
          renderItem={post => (
            <div className="flex items-center mb-6 cursor-pointer mt-6" onClick={() => handleClickPostInfo(post.id)}  >
              <img 
                src={SearchIcon}
                alt='search icon'
                style={{ width: '16px', height: '16px' }}
              />
              <div className="flex flex-col ml-4">
                <span className="text-base text-white-800 font-bold">
                  {truncateTitle(post.title, 70)}</span>
              </div>              
            </div>
          )}
          style={{ width: '700px' }}
        />
      )}
      {filteredUsers.length > 0 && (
        <List
          dataSource={filteredUsers}
          renderItem={user => (
            <div className="flex items-center mb-4 cursor-pointer mt-4" onClick={ () => handleClickUserInfo(user.id)}>
              <img
                className="w-10 h-10 rounded-full mr-4 mb-2 mt-2 ml-4"
                src={user.avatar}
                alt="User avatar"
              />
              <div className="flex flex-col">
                <span className="text-base text-white-500 font-bold">{user.name}</span>
              </div>
            </div>
          )}
          style={{ width: '700px' }}
        />
      )}

    </div>
  );
};

export default SearchPage;
