import { Drawer, Layout, Menu, Typography, Button, Grid } from "antd";
import {
    BookOutlined,
    AppstoreOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import { useState, type FC, type ReactNode } from "react";
import { Link, usePage } from "@inertiajs/react";
import AppLayout from "./AppLayout";

const { Sider, Content } = Layout;

type LibraryLayoutProps = {
    children: ReactNode;
};

const libraryNav = [
    { key: "/books", label: "Books (SSR)", icon: <BookOutlined /> },
    { key: "/card", label: "Card (API)", icon: <AppstoreOutlined /> },
];

/**
 * Shared shell for book/card views that adds a left-hand menu without
 * touching other pages.
 */
const LibraryLayout: FC<LibraryLayoutProps> = ({ children }) => {
    const { url } = usePage();
    const screens = Grid.useBreakpoint();
    const [mobileSiderOpen, setMobileSiderOpen] = useState(false);
    const isMobile = !screens.md;
    const activeKey =
        libraryNav.find(
            (item) =>
                url === item.key ||
                url.startsWith(`${item.key}/`) ||
                url.startsWith(`${item.key}?`)
        )?.key ?? "/books";

    const renderNav = (onNavigate?: () => void) => (
        <>
            <Typography.Title level={5} style={{ margin: "4px 0 12px 12px" }}>
                Library
            </Typography.Title>
            <Menu
                mode="inline"
                selectedKeys={[activeKey]}
                items={libraryNav.map((item) => ({
                    key: item.key,
                    icon: item.icon,
                    label: (
                        <Link
                            href={item.key}
                            preserveScroll={false}
                            preserveState={false}
                            onClick={onNavigate}
                        >
                            {item.label}
                        </Link>
                    ),
                }))}
                style={{
                    borderInlineEnd: "none",
                }}
            />
        </>
    );

    return (
        <AppLayout>
            <Layout
                hasSider={!isMobile}
                style={{
                    background: "transparent",
                    gap: 16,
                }}
                className="library-shell"
            >
                {!isMobile && (
                    <Sider
                        width={240}
                        theme="light"
                        style={{
                            background: "#fff",
                            borderRadius: 12,
                            border: "1px solid #f0f0f0",
                            padding: 12,
                            position: "sticky",
                            top: 88,
                            alignSelf: "flex-start",
                        }}
                        breakpoint="md"
                        collapsedWidth={0}
                    >
                        {renderNav()}
                    </Sider>
                )}

                <Content
                    style={{
                        minHeight: 360,
                        background: "#fff",
                        borderRadius: 12,
                        border: "1px solid #f0f0f0",
                        padding: 24,
                        boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
                    }}
                >
                    {isMobile && (
                        <>
                            <Button
                                type="text"
                                icon={<MenuOutlined />}
                                onClick={() => setMobileSiderOpen(true)}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: 0,
                                    marginBottom: 12,
                                }}
                            >
                                Library menu
                            </Button>
                            <Drawer
                                open={mobileSiderOpen}
                                onClose={() => setMobileSiderOpen(false)}
                                closable={false}
                                placement="left"
                                size={260}
                                styles={{
                                    body: {
                                        padding: 12,
                                    },
                                }}
                                maskClosable
                            >
                                {renderNav(() => setMobileSiderOpen(false))}
                            </Drawer>
                        </>
                    )}

                    {children}
                </Content>
            </Layout>
        </AppLayout>
    );
};

export default LibraryLayout;
