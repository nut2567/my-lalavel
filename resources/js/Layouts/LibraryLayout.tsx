import { Layout, Menu, Typography } from "antd";
import { BookOutlined, AppstoreOutlined } from "@ant-design/icons";
import type { FC, ReactNode } from "react";
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
    const activeKey =
        libraryNav.find(
            (item) =>
                url === item.key ||
                url.startsWith(`${item.key}/`) ||
                url.startsWith(`${item.key}?`)
        )?.key ?? "/books";

    return (
        <AppLayout>
            <Layout
                hasSider
                style={{
                    background: "transparent",
                    gap: 16,
                }}
                className="library-shell"
            >
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
                    breakpoint="xxl"
                    collapsedWidth={0}
                >
                    <Typography.Title
                        level={5}
                        style={{ margin: "4px 0 12px 12px" }}
                    >
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
                                >
                                    {item.label}
                                </Link>
                            ),
                        }))}
                        style={{
                            borderInlineEnd: "none",
                        }}
                    />
                </Sider>
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
                    {children}
                </Content>
            </Layout>
        </AppLayout>
    );
};

export default LibraryLayout;
