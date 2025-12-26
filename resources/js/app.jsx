import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider, Layout, Typography, Space, Button, Card, Divider } from "antd";
import { SmileOutlined, RocketOutlined, BookOutlined } from "@ant-design/icons";
import "./bootstrap";
import "../css/app.css";
import "antd/dist/reset.css";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const App = () => (
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: "#1677ff",
                borderRadius: 10,
            },
        }}
    >
        <Layout className="app-shell">
            <Header
                style={{
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid #edf1f7",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                }}
            >
                <div className="hero__header" style={{ margin: 0 }}>
                    <SmileOutlined style={{ fontSize: 22, color: "#1677ff" }} />
                    <Text strong>Laravel + Vite + Ant Design</Text>
                </div>
            </Header>

            <Content>
                <div className="hero">
                    <div className="hero__header">
                        <SmileOutlined style={{ fontSize: 26, color: "#1677ff" }} />
                        <Title level={2} style={{ margin: 0 }}>
                            ยินดีต้อนรับ
                        </Title>
                    </div>
                    <Paragraph className="hero__meta">
                        โปรเจ็กต์นี้ลบ Tailwind แล้ว และตั้งค่า Ant Design สำหรับงาน frontend ที่ใช้ React
                        พร้อมใช้งานทันที
                    </Paragraph>

                    <Space size="middle">
                        <Button type="primary" icon={<RocketOutlined />}>
                            เริ่มต้นใช้งาน
                        </Button>
                        <Button icon={<BookOutlined />} href="https://ant.design" target="_blank">
                            เอกสาร Ant Design
                        </Button>
                    </Space>

                    <Divider />

                    <Card title="สิ่งที่คุณได้รับ" bordered={false}>
                        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                            <Paragraph style={{ margin: 0 }}>
                                • โหลดสไตล์หลักผ่าน <Text code>antd/dist/reset.css</Text> แล้ว
                            </Paragraph>
                            <Paragraph style={{ margin: 0 }}>
                                • จุด mount React อยู่ที่ <Text code>#app</Text> ในไฟล์ Blade
                            </Paragraph>
                            <Paragraph style={{ margin: 0 }}>
                                • คุณสามารถเริ่มสร้างหน้าใหม่ด้วยคอมโพเนนต์ของ Ant Design ได้ทันที
                            </Paragraph>
                        </Space>
                    </Card>
                </div>
            </Content>

            <Footer style={{ textAlign: "center", background: "transparent" }}>
                สร้างด้วย Laravel, Vite และ Ant Design
            </Footer>
        </Layout>
    </ConfigProvider>
);

const root = document.getElementById("app");

if (root) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
}
