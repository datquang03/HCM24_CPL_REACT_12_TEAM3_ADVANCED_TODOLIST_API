import React, { useEffect, useState } from 'react';
import { Input, List } from 'antd';
import SearchIcon from "../assets/SearchIcon.svg";
import Post, { PostInterface } from "../model/Post";
import User, { UserInterface } from "../model/User";
const SearchPage = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [filteredResults, setFilteredResults] = useState<UserInterface[]>([]);
  const maxUserResult = 8;
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
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredResults(filtered.slice(0, maxUserResult));
    } else {
      setFilteredResults([]);
    }
  };
  //Handle click to view user info
  const handleClickUserInfo = () => {
  }
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
            style={{ width: '20px', height: '20px' }}
          />
        }
        style={{ width: '700px', marginBottom: '10px' }}
      />

      <List
        dataSource={filteredResults}
        renderItem={user => (
          <div className="flex items-center mb-4 cursor-pointer mt-4" >
              <img
                className="w-10 h-10 rounded-full mr-4 mb-2 mt-2 ml-4"
                src={user.avatar}
                alt="User avatar"
              />
              <div className="flex flex-col">
                <span className="text-base text-gray-500">{user.name}</span>
              </div>
            </div>
        )}
        style={{ width: '700px' }}
      />
    </div>
  );
};

export default SearchPage;
