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
    Pagination,
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
    const totalItems = props.pagination?.totalItems ?? 0;
    const flashSuccess = props.flash?.success;

    const goToPage = (target: number, pageSize: number) => {
        router.get(
            "/books",
            { page: target, perPage: pageSize },
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
                        รายการหนังสือ Inertia::render(props)
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
                    message={flashSuccess}
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
                            title="ยังไม่มีข้อมูลหนังสือ ลองเพิ่มเล่มแรกได้เลย"
                            showIcon
                        />
                    </Col>
                )}
            </Row>

            <div style={{ marginTop: 16, textAlign: "center" }}>
                <Pagination
                    current={page}
                    pageSize={props.pagination.perPage}
                    total={totalItems}
                    showSizeChanger
                    onChange={(p, pageSize) => goToPage(p, pageSize)}
                    onShowSizeChange={(p, pageSize) => goToPage(p, pageSize)}
                    showQuickJumper
                    showTotal={(total) => `ทั้งหมด ${total} รายการ`}
                />
            </div>
        </LibraryLayout>
    );
};

export default Books;
