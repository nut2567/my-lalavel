import type { FC } from "react";
import { Card, Form, Row, Col, Input, DatePicker, Space, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ProfileForm: FC = () => (
    <Card title="ข้อมูลส่วนตัว" variant="outlined" style={{ marginBottom: 16 }}>
        <Form layout="vertical">
            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item label="ชื่อ" name="firstName" rules={[{ required: true, message: "กรอกชื่อ" }]}>
                        <Input placeholder="เช่น สมชาย" prefix={<UserOutlined />} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label="นามสกุล" name="lastName" rules={[{ required: true, message: "กรอกนามสกุล" }]}>
                        <Input placeholder="เช่น ใจดี" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item label="อีเมล" name="email" rules={[{ type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง" }]}>
                        <Input placeholder="name@example.com" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label="วันเกิด" name="birthday">
                        <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item label="ที่อยู่" name="address">
                <Input.TextArea rows={3} placeholder="ที่อยู่ปัจจุบัน" />
            </Form.Item>
            <Space>
                <Button type="primary">บันทึก</Button>
                <Button htmlType="reset">ล้างข้อมูล</Button>
            </Space>
        </Form>
    </Card>
);

export default ProfileForm;
