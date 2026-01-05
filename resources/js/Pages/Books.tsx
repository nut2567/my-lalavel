import {
    Card,
    Typography,
    Row,
    Col,
    Alert,
    Button,
    Space,
    Tag,
    Modal,
} from "antd";
import { Link, router, usePage } from "@inertiajs/react";
import LibraryLayout from "../Layouts/LibraryLayout";

type Book = { id: number; title: string; author: string; summary?: string };

type PageProps = {
    books: Book[];
    pagination: {
        page: number;
        perPage: number;
        totalPages: number;
        totalItems: number;
    };
    flash?: {
        success?: string;
    };
};

const Books = () => {
    const { props } = usePage<PageProps>();
    const books = props.books ?? [];
    const page = props.pagination?.page ?? 1;
    const totalPages = props.pagination?.totalPages ?? 1;
    const flashSuccess = props.flash?.success;

    const goToPage = (target: number) => {
        router.get(
            "/books",
            { page: target },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    const handleDelete = (bookId: number) => {
        Modal.confirm({
            title: "ลบหนังสือ",
            content: "ต้องการลบรายการนี้หรือไม่?",
            okText: "ลบ",
            okButtonProps: { danger: true },
            cancelText: "ยกเลิก",
            onOk: () =>
                router.delete(`/books/${bookId}`, {
                    preserveScroll: true,
                }),
        });
    };

    return (
        <LibraryLayout>
            <div className="hero__header" style={{ marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                    <Typography.Title level={2} style={{ margin: 0 }}>
                        รายการหนังสือ
                    </Typography.Title>
                    <Typography.Text type="secondary">
                        ข้อมูลดึงจากฐานข้อมูลผ่าน Eloquent
                    </Typography.Text>
                </div>
                <Link href="/books/create">
                    <Button type="primary">เพิ่มหนังสือ</Button>
                </Link>
            </div>

            {flashSuccess && (
                <Alert
                    type="success"
                    showIcon
                    closable
                    style={{ marginBottom: 16 }}
                    title={flashSuccess}
                />
            )}

            <Row gutter={[16, 16]}>
                {books.map((book: Book) => (
                    <Col xs={24} sm={12} md={8} key={book.id}>
                        <Card
                            variant="outlined"
                            style={{ height: "100%" }}
                            title={book.title}
                            extra={<Tag color="blue">Book</Tag>}
                        >
                            <Typography.Text
                                type="secondary"
                                style={{
                                    display: "block",
                                    marginBottom: 8,
                                }}
                            >
                                ผู้เขียน {book.author}
                            </Typography.Text>
                            <Typography.Paragraph
                                ellipsis={{ rows: 3, expandable: true }}
                            >
                                {book.summary || "-"}
                            </Typography.Paragraph>

                            <Space size={8}>
                                <Link href={`/books/${book.id}/edit`}>
                                    <Button size="small">แก้ไข</Button>
                                </Link>
                                <Button
                                    size="small"
                                    danger
                                    onClick={() => handleDelete(book.id)}
                                >
                                    ลบ
                                </Button>
                            </Space>
                        </Card>
                    </Col>
                ))}
                {!books.length && (
                    <Col span={24}>
                        <Alert
                            type="info"
                            message="ยังไม่มีข้อมูลหนังสือ ลองเพิ่มเล่มแรกได้เลย"
                            showIcon
                        />
                    </Col>
                )}
            </Row>

            <div style={{ marginTop: 16, textAlign: "center" }}>
                <PaginationLinks
                    current={page}
                    totalPages={totalPages}
                    onChange={goToPage}
                />
            </div>
        </LibraryLayout>
    );
};

type PaginationLinksProps = {
    current: number;
    totalPages: number;
    onChange: (page: number) => void;
};

const PaginationLinks = ({
    current,
    totalPages,
    onChange,
}: PaginationLinksProps) => (
    <Space size="small" wrap>
        <Button
            type="text"
            disabled={current <= 1}
            onClick={() => onChange(Math.max(1, current - 1))}
        >
            ก่อนหน้า
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button
                key={p}
                type={p === current ? "primary" : "default"}
                onClick={() => onChange(p)}
            >
                {p}
            </Button>
        ))}
        <Button
            type="text"
            disabled={current >= totalPages}
            onClick={() => onChange(Math.min(totalPages, current + 1))}
        >
            ถัดไป
        </Button>
    </Space>
);

export default Books;
