import { Card, Typography, Row, Col, Alert } from "antd";
import { Link, usePage } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";

type Book = { title: string; author: string; summary: string };

type PageProps = {
    books: Book[];
    pagination: {
        page: number;
        perPage: number;
        totalPages: number;
        totalItems: number;
    };
    error?: string | null;
};

const Books = () => {
    const { props } = usePage<PageProps>();
    const books = props.books ?? [];
    const page = props.pagination?.page ?? 1;
    const totalPages = props.pagination?.totalPages ?? 1;

    return (
        <AppLayout>
            <div className="hero__header">
                <Typography.Title level={2} style={{ margin: 0 }}>
                    รายการหนังสือ (SSR + React)
                </Typography.Title>
            </div>
            <Typography.Paragraph className="hero__meta">
                หน้า Inertia ที่เรนเดอร์จากเซิร์ฟเวอร์ทุกครั้งเมื่อเปลี่ยนหน้า เช่น `/books/2`, `/books/3`
            </Typography.Paragraph>

            {props.error && (
                <Alert type="error" showIcon style={{ marginBottom: 16 }} message={props.error} />
            )}

            <Row gutter={[16, 16]}>
                {books.map((book: Book, idx) => (
                    <Col xs={24} sm={12} md={8} key={`${book.title}-${idx}`}>
                        <Card variant="outlined" style={{ height: "100%" }}>
                            <Typography.Title level={4} style={{ marginTop: 0 }}>
                                {book.title}
                            </Typography.Title>
                            <Typography.Text type="secondary" style={{ display: "block", marginBottom: 8 }}>
                                โดย {book.author}
                            </Typography.Text>
                            <Typography.Paragraph>{book.summary}</Typography.Paragraph>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div
                style={{
                    marginTop: 16,
                    display: "flex",
                    justifyContent: "center",
                    gap: 8,
                    flexWrap: "wrap",
                    alignItems: "center",
                }}
            >
                <PageLink target={Math.max(1, page - 1)} label="ก่อนหน้า" disabled={page === 1} />
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <PageLink key={p} target={p} label={p.toString()} active={p === page} />
                ))}
                <PageLink target={Math.min(totalPages, page + 1)} label="ถัดไป" disabled={page === totalPages} />
            </div>
        </AppLayout>
    );
};

type PageLinkProps = {
    target: number;
    label: string;
    active?: boolean;
    disabled?: boolean;
};

const PageLink = ({ target, label, active, disabled }: PageLinkProps) => (
    <Link
        href={`/books/${target}`}
        preserveState={false}
        preserveScroll={false}
        className={`page-link ${active ? "active" : ""} ${disabled ? "disabled" : ""}`}
    >
        {label}
    </Link>
);

export default Books;
