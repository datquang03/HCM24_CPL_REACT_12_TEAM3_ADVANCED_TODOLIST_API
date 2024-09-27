import React, { useEffect, useState } from "react";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import { PostInterface } from "../model/Post";

const PostComponent = () => {
  const [user, setUser] = useState<PostInterface | null>({} as PostInterface);

  useEffect (()=>{

  },[])
  return (
    <div>
      {/* wrap */}
      <div className="flex justify-between items-center">
        {/* avatar */}
        <div className="ms-10">
          <img
            src="https://th.bing.com/th/id/OIP.aVtg8witXWnxcT0MTTB2tQHaHa?rs=1&pid=ImgDetMain"
            alt=""
            className=""
          />
        </div>
        {/* input */}
        <div>
          <InputComponent
            placeholder="What news"
            readOnly
            className="w-[550px] border-none shadow-none bg-transparent text-white placeholder-white hover:bg-transparent"
          />
        </div>
        {/* button */}
        <div>
          <ButtonComponent
            label="Post"
            shape="round"
            color="default"
            className="bg-black border-none shadow-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
