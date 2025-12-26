import { useEffect, useState } from "react";
import { Card, Typography, Pagination, Skeleton, Row, Col, Alert } from "antd";
import { useNavigate, useParams } from "react-router-dom";

type Book = { title: string; author: string; summary: string };
type ApiResponse = {
    data: Book[];
    pagination: { page: number; perPage: number; totalPages: number; totalItems: number };
};

const parsePage = (raw?: string) => {
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
};

const BooksPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState<number>(parsePage(params.page));
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = async (targetPage: number, replaceUrl = false) => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(`/api/books?page=${targetPage}&perPage=6`);
            const json: ApiResponse = await res.json();
            setBooks(json.data);
            setPage(json.pagination.page);
            setTotalPages(json.pagination.totalPages);
            navigate(`/books/${targetPage}`, { replace: replaceUrl });
        } catch (err) {
            setError("โหลดข้อมูลไม่สำเร็จ");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const target = parsePage(params.page);
        fetchBooks(target, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.page]);

    return (
        <>
            <div className="hero__header">
                <Typography.Title level={2} style={{ margin: 0 }}>
                    รายการหนังสือ (React + fetch)
                </Typography.Title>
            </div>
            <Typography.Paragraph className="hero__meta">
                ตัวอย่างหน้า React ดึงข้อมูลจาก API `/api/books` แล้วแสดงการ์ด พร้อมเปลี่ยนหน้า `/books/1`, `/books/2`
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
        </>
    );
};

export default BooksPage;
