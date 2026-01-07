import type { FC } from "react";
import { Card, Alert, Form, Input, Space, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginForm: FC = () => (
    <Card title="เข้าสู่ระบบ" variant="outlined" style={{ marginBottom: 16 }}>
        <Alert
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
            title="ตัวอย่างฟอร์มเข้าสู่ระบบ"
            description="สาธิตการจัดวางฟอร์มด้วย Ant Design ไม่มีการส่งข้อมูลจริง"
        />
        <Form layout="vertical">
            <Form.Item
                label="อีเมลหรือชื่อผู้ใช้"
                name="username"
                rules={[{ required: true, message: "กรอกข้อมูล" }]}
            >
                <Input
                    prefix={<UserOutlined />}
                    placeholder="user@example.com"
                />
            </Form.Item>
            <Form.Item
                label="รหัสผ่าน"
                name="password"
                rules={[{ required: true, message: "กรอกรหัสผ่าน" }]}
            >
                <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="••••••••"
                />
            </Form.Item>
            <Space>
                <Button type="primary">เข้าสู่ระบบ</Button>
                <Button type="link">ลืมรหัสผ่าน?</Button>
            </Space>
        </Form>
    </Card>
);

export default LoginForm;
