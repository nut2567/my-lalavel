import React, { StrictMode, type FC, useMemo } from "react";
import ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useLocation,
    Navigate,
} from "react-router-dom";
import {
    ConfigProvider,
    Layout,
    Typography,
    Space,
    Button,
    Card,
    Divider,
    Menu,
} from "antd";
import { SmileOutlined, RocketOutlined, BookOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "./bootstrap";
import "../css/app.css";
import "antd/dist/reset.css";
import ProfileForm from "./components/ProfileForm";
import LoginForm from "./components/LoginForm";
import WeatherCard from "./components/WeatherCard";
import BooksPage from "./components/BooksPage";
import type { ISpec } from "@visactor/vchart";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const navItems = [
    { key: "/", label: "หน้าหลัก" },
    { key: "/profile", label: "กรอกข้อมูลส่วนตัว" },
    { key: "/login", label: "เข้าสู่ระบบ" },
    { key: "/weather", label: "กราฟสภาพอากาศ" },
    { key: "/books", label: "รายการหนังสือ (React)" },
];

const AppShell: FC = () => {
    const location = useLocation();

    const weatherData = useMemo(() => {
        const days = dayjs().daysInMonth();
        return Array.from({ length: days }, (_, idx) => {
            const temperature =
                25 +
                Math.sin((idx / days) * Math.PI * 2) * 4 +
                Math.random() * 1.5;
            return {
                date: dayjs()
                    .date(idx + 1)
                    .format("YYYY-MM-DD"),
                temperature: Number(temperature.toFixed(1)),
            };
        });
    }, []);

    const chartSpec = useMemo<ISpec>(
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
            point: { visible: false },
            color: ["#1677ff"],
            axes: [
                { orient: "left", title: "อุณหภูมิ (°C)" },
                { orient: "bottom", type: "band", label: { autoHide: true } },
            ],
            tooltip: {
                mark: {
                    title: <span>สภาพอากาศเดือนนี้</span>,
                    content: [
                        { key: "วันที่", value: "$key" },
                        { key: "อุณหภูมิ", value: "$value°C" },
                    ],
                },
            },
        }),
        [weatherData]
    );

    const activeKey =
        navItems.find(
            (item) =>
                location.pathname === item.key ||
                location.pathname.startsWith(`${item.key}/`)
        )?.key ?? "/";

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
                        gap: 16,
                    }}
                >
                    <Space align="center">
                        <SmileOutlined
                            style={{ fontSize: 22, color: "#1677ff" }}
                        />
                        <Text strong>Laravel + Vite + Ant Design</Text>
                    </Space>
                    <Menu
                        mode="horizontal"
                        selectedKeys={[activeKey]}
                        items={navItems.map((item) => ({
                            key: item.key,
                            label: <Link to={item.key}>{item.label}</Link>,
                        }))}
                        style={{ flex: 1, minWidth: 0 }}
                    />
                </Header>

                <Content>
                    <div className="hero">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/profile" element={<ProfileForm />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route
                                path="/weather"
                                element={
                                    <WeatherCard
                                        chartSpec={chartSpec}
                                        data={weatherData}
                                    />
                                }
                            />
                            <Route path="/books" element={<BooksPage />} />
                            <Route
                                path="/books/:page"
                                element={<BooksPage />}
                            />
                            <Route
                                path="*"
                                element={<Navigate to="/" replace />}
                            />
                        </Routes>
                    </div>
                </Content>

                <Footer
                    style={{ textAlign: "center", background: "transparent" }}
                >
                    สร้างด้วย Laravel, Vite และ Ant Design
                </Footer>
            </Layout>
        </ConfigProvider>
    );
};

const Home: FC = () => (
    <>
        <div className="hero__header">
            <RocketOutlined style={{ fontSize: 26, color: "#1677ff" }} />
            <Title level={2} style={{ margin: 0 }}>
                ยินดีต้อนรับ
            </Title>
        </div>
        <Paragraph className="hero__meta">
            เลือกเมนูด้านบนเพื่อไปยังหน้ากรอกข้อมูลส่วนตัว, เข้าสู่ระบบ,
            กราฟสภาพอากาศ หรือหน้าแสดงรายการหนังสือที่ดึงข้อมูลจาก API (React)
        </Paragraph>

        <Card
            title="เริ่มต้นใช้งาน"
            variant="outlined"
            style={{ marginBottom: 16 }}
        >
            <Space size="middle">
                <Button type="primary" href="/profile">
                    ไปหน้าข้อมูลส่วนตัว
                </Button>
                <Button href="/login">ไปหน้าเข้าสู่ระบบ</Button>
                <Button href="/books">ไปหน้ารายการหนังสือ</Button>
                <Button
                    icon={<BookOutlined />}
                    href="https://ant.design"
                    target="_blank"
                >
                    เอกสาร Ant Design
                </Button>
            </Space>
        </Card>

        <Divider />
        <Card title="สิ่งที่คุณได้รับ" variant="outlined">
            <Space direction="vertical">
                <Text>
                    • หน้าหลัก + Profile + Login + Weather + Books (แยก route
                    ชัดเจน)
                </Text>
                <Text>
                    • คอมโพเนนต์แยกใน `resources/js/components`
                    นำกลับมาใช้ซ้ำได้
                </Text>
                <Text>
                    • หน้า Books ใช้ React fetch `/api/books` และรองรับแบ่งหน้า
                </Text>
            </Space>
        </Card>
    </>
);

const root = document.getElementById("app");

if (root) {
    ReactDOM.createRoot(root).render(
        <StrictMode>
            <BrowserRouter>
                <AppShell />
            </BrowserRouter>
        </StrictMode>
    );
}
