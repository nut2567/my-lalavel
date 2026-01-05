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

const BookForm = ({ form, onSubmit, submitLabel }: BookFormProps) => (
    <Form layout="vertical" onFinish={onSubmit}>
        <Form.Item
            label="ชื่อเรื่อง"
            required
            validateStatus={form.errors.title ? "error" : undefined}
            help={form.errors.title}
        >
            <Input
                value={form.data.title}
                onChange={(e) => form.setData("title", e.target.value)}
                placeholder="เช่น The Wind and the Sea"
            />
        </Form.Item>
        <Form.Item
            label="ผู้เขียน"
            required
            validateStatus={form.errors.author ? "error" : undefined}
            help={form.errors.author}
        >
            <Input
                value={form.data.author}
                onChange={(e) => form.setData("author", e.target.value)}
                placeholder="เช่น Mara Lane"
            />
        </Form.Item>
        <Form.Item
            label="สรุปเนื้อหา"
            validateStatus={form.errors.summary ? "error" : undefined}
            help={form.errors.summary}
        >
            <Input.TextArea
                value={form.data.summary}
                onChange={(e) => form.setData("summary", e.target.value)}
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

export default BookForm;
