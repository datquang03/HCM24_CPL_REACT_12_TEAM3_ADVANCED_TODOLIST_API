import { Button, Form, Input } from "antd";
import React from "react";
import User from "../model/User"; // Update with the correct import path

const LoginPage = () => {
  const onFinish = async (values: any) => {
    try {
      // Use the login method from User class
      const user = await User.login(values.username, values.password);
      console.log("Login successful:", user);
      // Here you can set user data to context or state for global access
      // For example, redirect the user to a dashboard or homepage
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error (e.g., show a notification)
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
