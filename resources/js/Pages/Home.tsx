import { Card, Typography, Space, Button, Divider } from "antd";
import { RocketOutlined, BookOutlined } from "@ant-design/icons";
import { Link } from "@inertiajs/react";
import type { FC } from "react";
import AppLayout from "../Layouts/AppLayout";

const { Title, Paragraph, Text } = Typography;

const Home: FC = () => (
    <AppLayout>
        <div className="hero__header">
            <RocketOutlined style={{ fontSize: 26, color: "#1677ff" }} />
            <Title level={2} style={{ margin: 0 }}>
                ยินดีต้อนรับ
            </Title>
        </div>
        <Paragraph className="hero__meta">
            เลือกเมนูด้านบนเพื่อไปยังหน้ากรอกข้อมูลส่วนตัว, เข้าสู่ระบบ, กราฟสภาพอากาศ หรือหน้าแสดงรายการหนังสือที่ดึงข้อมูล
            จากเซิร์ฟเวอร์ (Inertia)
        </Paragraph>

        <Card title="เริ่มต้นใช้งาน" variant="outlined" style={{ marginBottom: 16 }}>
            <Space size="middle">
                <Link href="/profile">
                    <Button type="primary">ไปหน้าข้อมูลส่วนตัว</Button>
                </Link>
                <Link href="/login">
                    <Button>ไปหน้าเข้าสู่ระบบ</Button>
                </Link>
                <Link href="/books">
                    <Button>ไปหน้ารายการหนังสือ</Button>
                </Link>
                <Button icon={<BookOutlined />} href="https://ant.design" target="_blank">
                    เอกสาร Ant Design
                </Button>
            </Space>
        </Card>

        <Divider />
        <Card title="สิ่งที่คุณได้รับ" variant="outlined">
            <Space direction="vertical">
                <Text>• หน้าหลัก + Profile + Login + Weather + Books (แยก route ชัดเจน)</Text>
                <Text>• ใช้ Inertia render + SSR (เตรียมพร้อมใช้งาน) และแชร์คอมโพเนนต์จาก `resources/js/components`</Text>
                <Text>• หน้า Books ดึงข้อมูลจาก `/api/books` และรองรับแบ่งหน้า</Text>
            </Space>
        </Card>
    </AppLayout>
);

export default Home;
