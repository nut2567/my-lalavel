import { Link, usePage } from "@inertiajs/react";
import { Layout, Typography, Space, Menu } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import type { FC, ReactNode } from "react";

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

type AppLayoutProps = {
    children: ReactNode;
};

const navItems = [
    { key: "/", label: "หน้าหลัก" },
    { key: "/profile", label: "กรอกข้อมูลส่วนตัว" },
    { key: "/weather", label: "กราฟสภาพอากาศ" },
    { key: "/books", label: "รายการหนังสือ" },
    { key: "/card", label: "รายการข้อมูล" },
];

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
    const { url } = usePage();
    const activeKey =
        navItems.find(
            (item) =>
                url === item.key ||
                url.startsWith(`${item.key}/`) ||
                url.startsWith(`${item.key}?`)
        )?.key ?? "/";

    return (
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
                    <SmileOutlined style={{ fontSize: 22, color: "#1677ff" }} />
                    <Text strong>Laravel + Inertia + Ant Design</Text>
                </Space>
                <Menu
                    mode="horizontal"
                    selectedKeys={[activeKey]}
                    items={navItems.map((item) => ({
                        key: item.key,
                        label: <Link href={item.key}>{item.label}</Link>,
                    }))}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>

            <Content>
                <div className="hero">{children}</div>
            </Content>

            <Footer style={{ textAlign: "center", background: "transparent" }}>
                สร้างด้วย Laravel, Inertia, Vite และ Ant Design
            </Footer>
        </Layout>
    );
};

export default AppLayout;
