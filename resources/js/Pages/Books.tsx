import { useEffect, useState } from "react";
import { Card, Typography, Pagination, Skeleton, Row, Col, Alert } from "antd";
import { router, usePage } from "@inertiajs/react";
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
};

const Books = () => {
    const { props } = usePage<PageProps>();
    const [books, setBooks] = useState<Book[]>(props.books ?? []);
    const [page, setPage] = useState<number>(props.pagination?.page ?? 1);
    const [totalPages, setTotalPages] = useState<number>(props.pagination?.totalPages ?? 1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = async (targetPage: number) => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(`/api/books?page=${targetPage}&perPage=6`);
            const json = await res.json();
            setBooks(json.data);
            setPage(json.pagination.page);
            setTotalPages(json.pagination.totalPages);
            router.visit(`/books/${targetPage}`, { replace: true, preserveScroll: true, preserveState: true });
        } catch (err) {
            setError("โหลดข้อมูลไม่สำเร็จ");
        } finally {
            setLoading(false);
        }
    };

    // sync when props change (SSR render / first load)
    useEffect(() => {
        setBooks(props.books ?? []);
        setPage(props.pagination?.page ?? 1);
        setTotalPages(props.pagination?.totalPages ?? 1);
    }, [props.books, props.pagination]);

    return (
        <AppLayout>
            <div className="hero__header">
                <Typography.Title level={2} style={{ margin: 0 }}>
                    รายการหนังสือ (SSR + React)
                </Typography.Title>
            </div>
            <Typography.Paragraph className="hero__meta">
                ตัวอย่าง Inertia หน้าเดียว ใช้ข้อมูลจากเซิร์ฟเวอร์ (props) และสามารถเปลี่ยนหน้า `/books/N` ได้
            </Typography.Paragraph>

            {error && (
                <Alert
                    type="error"
                    showIcon
                    style={{ marginBottom: 16 }}
                    message={error}
                    action={
                        <Typography.Link onClick={() => fetchBooks(page)} underline>
                            ลองใหม่
                        </Typography.Link>
                    }
                />
            )}

            <Row gutter={[16, 16]}>
                {(loading ? Array.from({ length: 6 }) : books).map((book: Book, idx) => (
                    <Col xs={24} sm={12} md={8} key={idx}>
                        <Card variant="outlined" style={{ height: "100%" }}>
                            {loading ? (
                                <Skeleton active paragraph={{ rows: 3 }} />
                            ) : (
                                <>
                                    <Typography.Title level={4} style={{ marginTop: 0 }}>
                                        {book?.title}
                                    </Typography.Title>
                                    <Typography.Text type="secondary" style={{ display: "block", marginBottom: 8 }}>
                                        โดย {book?.author}
                                    </Typography.Text>
                                    <Typography.Paragraph>{book?.summary}</Typography.Paragraph>
                                </>
                            )}
                        </Card>
                    </Col>
                ))}
            </Row>

            <div style={{ marginTop: 16, textAlign: "center" }}>
                <Pagination
                    current={page}
                    total={totalPages * 10}
                    pageSize={10}
                    showSizeChanger={false}
                    onChange={(next) => fetchBooks(next)}
                />
            </div>
        </AppLayout>
    );
};

export default Books;
