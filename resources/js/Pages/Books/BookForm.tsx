import { Form, Input, Button, Space } from "antd";
import { Link } from "@inertiajs/react";

export type BookFormState = {
    title: string;
    author: string;
    summary?: string;
};

type BookFormProps = {
    form: {
        data: BookFormState;
        errors: Partial<Record<keyof BookFormState, string>>;
        processing: boolean;
        setData: (field: keyof BookFormState, value: string) => void;
    };
    onSubmit: () => void;
    submitLabel: string;
};

const BookForm = ({ form, onSubmit, submitLabel }: BookFormProps) => {
    const [antdForm] = Form.useForm<BookFormState>();
    const normalizedData = {
        ...form.data,
        summary: form.data.summary ?? "",
    };

    return (
        <Form
            layout="vertical"
            form={antdForm}
            initialValues={normalizedData}
            onValuesChange={(changedValues) => {
                Object.entries(changedValues).forEach(([key, value]) => {
                    form.setData(
                        key as keyof BookFormState,
                        typeof value === "string" ? value : value ?? ""
                    );
                });
            }}
            onFinish={(values) => {
                Object.entries(values).forEach(([key, value]) => {
                    form.setData(
                        key as keyof BookFormState,
                        typeof value === "string" ? value : value ?? ""
                    );
                });
                onSubmit();
            }}
        >
            <Form.Item
                label="ชื่อเรื่อง"
                required
                name="title"
                rules={[
                    {
                        required: true,
                        message: "กรอกชื่อเรื่อง",
                    },
                ]}
                validateStatus={form.errors.title ? "error" : undefined}
                help={form.errors.title}
            >
                <Input placeholder="เช่น The Wind and the Sea" />
            </Form.Item>
            <Form.Item
                label="ผู้เขียน"
                required
                name="author"
                rules={[
                    {
                        required: true,
                        message: "กรอกชื่อผู้เขียน",
                    },
                ]}
                validateStatus={form.errors.author ? "error" : undefined}
                help={form.errors.author}
            >
                <Input placeholder="เช่น Mara Lane" />
            </Form.Item>
            <Form.Item
                label="สรุปเนื้อหา"
                validateStatus={form.errors.summary ? "error" : undefined}
                help={form.errors.summary}
                name="summary"
            >
                <Input.TextArea
                    autoSize={{ minRows: 4, maxRows: 8 }}
                    placeholder="คำอธิบายหรือเนื้อหาโดยย่อ"
                />
            </Form.Item>

            <Space>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={form.processing}
                    disabled={form.processing}
                >
                    {submitLabel}
                </Button>
                <Link href="/books">
                    <Button disabled={form.processing}>ยกเลิก</Button>
                </Link>
            </Space>
        </Form>
    );
};

export default BookForm;
