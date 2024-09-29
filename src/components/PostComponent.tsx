import React, { useCallback, useState } from "react";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import { Modal } from "antd";
import { PostInterface } from "../model/Post";
import { FileImageFilled, TagFilled } from "@ant-design/icons";
import usePost from "../api/usePost";
import { useUserContext } from "../context/UserContext";

type PostText = {
  content: string,
  title:string
}

const PostComponent: React.FC = () => {
  const {user} = useUserContext();
  console.log("user", user);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<PostText>({} as PostText);

  const postUser: PostInterface = {
    id: "123",
    content: postContent.content,
    createDate: new Date(),
    status: "Posted",
    title:postContent.title,
    userId: user?.id as string ,
    updateDate: new Date(),
  };

  // Handlers for modal
  const showModal = (): void => setIsModalVisible(true);
  const handleOk = (): void => {
    setIsModalVisible(false);
  };
  const handleCancel = (): void => setIsModalVisible(false);
  // Handlers for post
  const handlePost = async () => {
    const result = await usePost("/post", postUser);
    if (result) {
      setIsModalVisible(false);
      console.log("response", result);
    }
  };

  return (
    <>
      {/*  */}
      <div className="bg-transparent p-5 rounded-lg shadow-md w-full max-w-3xl mx-auto">
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={user?.avatar}
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
            />
          </div>
          {/* Input */}
          
          <div className="flex-grow">
            <InputComponent
              placeholder="What's on your mind?"
              readOnly
              className="w-full !border-none shadow-none bg-transparent text-white placeholder-white focus:outline-none focus:bg-transparent hover:bg-transparent"
              aria-label="Post input"
              onClick={showModal}
            />
          </div>
          {/* Button */}
          <div>
            <ButtonComponent
              label="Post"
              shape="round"
              color="default"
              className="bg-transparent text-white border-none shadow-md px-4 py-2 hover:!bg-transparent transition"
              onClick={showModal}
            />
          </div>
        </div>
      </div>
      {/* Modal */}
      <Modal
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="!custom-modal"
        footer={(_, {}) => (
          <>
            <ButtonComponent
              label="Post"
              shape="round"
              color="default"
              className="bg-transparent text-white border-none shadow-md px-4 py-2 hover:!bg-transparent transition"
              onClick={handlePost}
            />
          </>
        )}
      >
        <div>
          {/* header */}
          <div className="flex justify-center ">
            <p className="text-bold text-xl text-white">New thread</p>
          </div>
          {/* body */}
          <div>
            <div className="flex">
              {/* img */}
              <div className="flex-shrink-0">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-12 h-12 rounded-full"
                />
              </div>
              {/* content */}
              <div className="flex flex-col w-full">
                <div>
                  <p className="text-white ml-3">{user?.name}</p>
                </div>
                <InputComponent
                  placeholder="Title?"
                  className="w-full border-none bg-transparent text-stone-400 placeholder-stone-400 focus:outline-none focus:bg-transparent hover:bg-transparent"
                  aria-label="Post title"
                  onClick={showModal}
                  onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) =>
                      setPostContent({...postContent, title:e.target.value})}
                />
                <InputComponent
                  placeholder="What's new?"
                  className="w-full border-none bg-transparent text-stone-400 placeholder-stone-400 focus:outline-none focus:bg-transparent hover:bg-transparent"
                  aria-label="Post input"
                  onClick={showModal}
                  onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) =>
                      setPostContent({...postContent,content:e.target.value})
                  }
                />

                {/* icons */}
                <div className="my-4">
                  <ButtonComponent
                    icon={
                      <FileImageFilled
                        style={{ backgroundColor: "transparent" }}
                      />
                    }
                    shape="circle"
                    className="bg-transparent border-none shadow-none hover:!bg-transparent"
                    onClick={handlePost}
                  />
                  <ButtonComponent
                    icon={<TagFilled />}
                    shape="circle"
                    className="bg-transparent border-none shadow-none hover:!bg-transparent"
                  />
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Custom Styles for Modal */}
    </>
  );
};

export default PostComponent;
