import { useMemo, useState } from "react";
import { Card, Typography, Pagination, Skeleton, Row, Col, Alert } from "antd";
import { useQuery } from "@tanstack/react-query";
import { router } from "@inertiajs/react";
import LibraryLayout from "../Layouts/LibraryLayout";

type Book = { title: string; author: string; summary: string };

type ApiResponse = {
    data: Book[];
    pagination: {
        page: number;
        perPage: number;
        totalPages: number;
        totalItems: number;
    };
};

const CardPage = () => {
    const initialPage = useMemo(() => {
        const url = new URL(window.location.href);
        const fromQuery = Number(url.searchParams.get("page"));
        return Number.isFinite(fromQuery) && fromQuery > 0 ? fromQuery : 1;
    }, []);

    const [page, setPage] = useState<number>(initialPage || 1);
    const perPage = 6;

    const { data, isFetching, error } = useQuery<ApiResponse>({
        queryKey: ["card", page, perPage],
        queryFn: async () => {
            const res = await fetch(`/api/card/${page}?perPage=${perPage}`);
            if (!res.ok) throw new Error("Failed to load books");
            return res.json();
        },
    });

    const books = data?.data ?? [];
    const totalPages = data?.pagination.totalPages ?? 1;

    const goToPage = (next: number) => {
        setPage(next);
        // Let Inertia manage the URL (history) without manual replaceState
        router.get(
            "/card",
            { page: next },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                only: [],
            }
        );
    };

    return (
        <LibraryLayout>
            <div className="hero__header">
                <Typography.Title level={2} style={{ margin: 0 }}>
                    Card list (React Query + API)
                </Typography.Title>
            </div>
            <Typography.Paragraph className="hero__meta">
                ใช้ React Query ดึงข้อมูลจาก /api/card/{page + "?"}และให้
                Inertia อัปเดต URL ?page=
            </Typography.Paragraph>

            {error && (
                <Alert
                    type="error"
                    showIcon
                    closable
                    style={{ marginBottom: 16 }}
                    message={(error as Error).message}
                />
            )}

            <Row gutter={[16, 16]}>
                {(isFetching ? Array.from({ length: perPage }) : books).map(
                    (book: Book, idx) => (
                        <Col
                            xs={24}
                            sm={12}
                            md={8}
                            key={`${book?.title}-${idx}`}
                        >
                            <Card variant="outlined" style={{ height: "100%" }}>
                                {isFetching ? (
                                    <Skeleton active paragraph={{ rows: 3 }} />
                                ) : (
                                    <>
                                        <Typography.Title
                                            level={4}
                                            style={{ marginTop: 0 }}
                                        >
                                            {book?.title}
                                        </Typography.Title>
                                        <Typography.Text
                                            type="secondary"
                                            style={{
                                                display: "block",
                                                marginBottom: 8,
                                            }}
                                        >
                                            ผู้เขียน {book?.author}
                                        </Typography.Text>
                                        <Typography.Paragraph>
                                            {book?.summary}
                                        </Typography.Paragraph>
                                    </>
                                )}
                            </Card>
                        </Col>
                    )
                )}
            </Row>

            <div style={{ marginTop: 16, textAlign: "center" }}>
                <Pagination
                    current={page}
                    total={totalPages * perPage}
                    pageSize={perPage}
                    showSizeChanger={false}
                    onChange={(next) => goToPage(next)}
                />
            </div>
        </LibraryLayout>
    );
};

export default CardPage;
