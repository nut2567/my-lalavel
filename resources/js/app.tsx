import React, { StrictMode, type FC, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import {
    ConfigProvider,
    Layout,
    Typography,
    Space,
    Button,
    Card,
    Divider,
    Form,
    Input,
    DatePicker,
    Segmented,
    Row,
    Col,
    Alert,
} from "antd";
import { SmileOutlined, RocketOutlined, BookOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { VChart } from "@visactor/react-vchart";
import dayjs from "dayjs";
import "./bootstrap";
import "../css/app.css";
import "antd/dist/reset.css";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

type PageKey = "profile" | "login" | "weather";

const App: FC = () => {
    const [page, setPage] = useState<PageKey>("profile");

    const weatherData = useMemo(() => {
        const days = dayjs().daysInMonth();
        return Array.from({ length: days }, (_, idx) => {
            const temperature = 25 + Math.sin((idx / days) * Math.PI * 2) * 4 + Math.random() * 1.5;
            return {
                date: dayjs().date(idx + 1).format("YYYY-MM-DD"),
                temperature: Number(temperature.toFixed(1)),
            };
        });
    }, []);

    const chartOptions = useMemo(
        () => ({
            type: "line",
            height: 320,
            data: {
                id: "temp",
                values: weatherData,
            },
            xField: "date",
            yField: "temperature",
            smooth: true,
            point: {
                visible: false,
            },
            color: ["#1677ff"],
            axes: [
                {
                    orient: "left",
                    title: "อุณหภูมิ (°C)",
                },
                {
                    orient: "bottom",
                    type: "band",
                    label: {
                        autoHide: true,
                    },
                },
            ],
            tooltip: {
                mark: {
                    title: "สภาพอากาศเดือนนี้",
                    content: [
                        { key: "วันที่", value: "$key" },
                        { key: "อุณหภูมิ", value: "$value°C" },
                    ],
                },
            },
        }),
        [weatherData],
    );

    return (
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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div className="hero__header" style={{ margin: 0 }}>
                        <SmileOutlined style={{ fontSize: 22, color: "#1677ff" }} />
                        <Text strong>Laravel + Vite + Ant Design</Text>
                    </div>
                    <Segmented
                        options={[
                            { label: "กรอกข้อมูลส่วนตัว", value: "profile" },
                            { label: "เข้าสู่ระบบ", value: "login" },
                            { label: "กราฟอากาศ", value: "weather" },
                        ]}
                        value={page}
                        onChange={(value) => setPage(value as PageKey)}
                    />
                </Header>

                <Content>
                    <div className="hero">
                        <div className="hero__header">
                            <RocketOutlined style={{ fontSize: 26, color: "#1677ff" }} />
                            <Title level={2} style={{ margin: 0 }}>
                                {page === "profile" && "กรอกข้อมูลส่วนตัว"}
                                {page === "login" && "เข้าสู่ระบบ"}
                                {page === "weather" && "กราฟสภาพอากาศและอุณหภูมิ (เดือนนี้)"}
                            </Title>
                        </div>
                        <Paragraph className="hero__meta">
                            เลือกแท็บด้านบนเพื่อทำงานในหน้าที่ต้องการ ข้อมูลทุกหน้าใช้คอมโพเนนต์จาก Ant Design
                        </Paragraph>

                        {page === "profile" && <ProfileForm />}
                        {page === "login" && <LoginForm />}
                        {page === "weather" && <WeatherCard chartOptions={chartOptions} data={weatherData} />}

                        <Divider />

                        <Card title="แหล่งอ้างอิง" variant="outlined">
                            <Space size="middle">
                                <Button icon={<BookOutlined />} href="https://ant.design" target="_blank">
                                    เอกสาร Ant Design
                                </Button>
                                <Button
                                    icon={<BookOutlined />}
                                    href="https://www.visactor.io/vchart"
                                    target="_blank"
                                >
                                    เอกสาร VChart
                                </Button>
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
};

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

const LoginForm: FC = () => (
    <Card title="เข้าสู่ระบบ" variant="outlined" style={{ marginBottom: 16 }}>
        <Alert
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
            message="ตัวอย่างฟอร์มเข้าสู่ระบบ (สาธิตเท่านั้น)"
        />
        <Form layout="vertical">
            <Form.Item label="อีเมลหรือชื่อผู้ใช้" name="username" rules={[{ required: true, message: "กรอกข้อมูล" }]}>
                <Input prefix={<UserOutlined />} placeholder="user@example.com" />
            </Form.Item>
            <Form.Item label="รหัสผ่าน" name="password" rules={[{ required: true, message: "กรอกรหัสผ่าน" }]}>
                <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
            </Form.Item>
            <Space>
                <Button type="primary">เข้าสู่ระบบ</Button>
                <Button type="link">ลืมรหัสผ่าน?</Button>
            </Space>
        </Form>
    </Card>
);

type WeatherCardProps = {
    chartOptions: Record<string, unknown>;
    data: { date: string; temperature: number }[];
};

const WeatherCard: FC<WeatherCardProps> = ({ chartOptions, data }) => (
    <Card
        title="กราฟสภาพอากาศ/อุณหภูมิ (เดือนปัจจุบัน)"
        extra={<Text type="secondary">ข้อมูลจำลองสำหรับสาธิต UI</Text>}
        variant="outlined"
        style={{ marginBottom: 16 }}
    >
        <div style={{ height: 320 }}>
            <VChart options={chartOptions} style={{ height: 320 }} />
        </div>
        <Divider />
        <Typography.Paragraph>
            อุณหภูมิเฉลี่ย:{" "}
            <Text strong>
                {(
                    data.reduce((sum, item) => sum + item.temperature, 0) / Math.max(data.length, 1)
                ).toFixed(1)}{" "}
                °C
            </Text>
        </Typography.Paragraph>
    </Card>
);

const root = document.getElementById("app");

if (root) {
    ReactDOM.createRoot(root).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
}
