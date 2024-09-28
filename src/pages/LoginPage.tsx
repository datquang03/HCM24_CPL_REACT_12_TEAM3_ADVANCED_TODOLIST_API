import { Button, Form, Input } from "antd";
import React from "react";
import User from "../model/User"; // Update with the correct import path
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext"; // Import useUser from UserContext

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { setUser } = useUserContext(); // Get setUser function from context

  const onFinish = async (values: any) => {
    try {
      const user = await User.login(values.username, values.password);
      console.log("Login successful:", user);

      // Lưu toàn bộ thông tin người dùng vào context
      setUser(user); // Lưu đối tượng user đầy đủ
      if (user.id === "1") {
        // Điều hướng đến trang admin
        navigate("/Admin");
      } else {
      // Redirect to the homepage
      navigate("/homepage"); // Redirect to home page after login
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error (e.g., show a notification)
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-900">
      <div className="bg-zinc-900 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Log in
        </h2>
        <Form
          name="basic"
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              className="rounded-lg"
              placeholder="Enter your username"
              size="large"
              style={{ height: "50px", fontSize: "18px" }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              className="rounded-lg"
              placeholder="Enter your password"
              size="large"
              style={{ height: "50px", fontSize: "18px" }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-lg"
              size="large"
              style={{ height: "50px", fontSize: "18px" }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        {/* Forgot Password Link */}
        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-gray-500 ">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
