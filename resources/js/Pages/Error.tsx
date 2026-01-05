import { Result, Button, Space } from "antd";
import { Link } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";

type Props = {
    status: number;
};

const content: Record<
    number,
    { title: string; subtitle: string; cta?: string }
> = {
    404: {
        title: "ไม่พบหน้าที่ต้องการ",
        subtitle: "อาจถูกย้ายหรือลบไปแล้ว ลองกลับหน้าหลักหรือเปิดหน้าหนังสือ",
        cta: "กลับหน้าหลัก",
    },
    403: {
        title: "ไม่มีสิทธิ์เข้าถึง",
        subtitle: "ติดต่อผู้ดูแลระบบหรือเปลี่ยนบัญชีผู้ใช้",
    },
    500: {
        title: "เกิดข้อผิดพลาดภายในระบบ",
        subtitle: "โปรดลองใหม่อีกครั้งหรือติดต่อผู้ดูแล",
    },
    503: {
        title: "ระบบกำลังปิดปรับปรุง",
        subtitle: "ลองกลับมาใหม่อีกครั้ง",
    },
};

const ErrorPage = ({ status }: Props) => {
    const fallback = {
        title: "มีบางอย่างผิดพลาด",
        subtitle: "โปรดลองรีเฟรชหรือกลับไปหน้าอื่น",
    };
    const data = content[status] ?? fallback;

    return (
        <AppLayout>
            <div className="hero">
                <Result
                    status={status as any}
                    title={status}
                    subTitle={
                        <div>
                            <div style={{ fontWeight: 600, marginBottom: 4 }}>
                                {data.title}
                            </div>
                            <div style={{ color: "#5c5f66" }}>
                                {data.subtitle}
                            </div>
                        </div>
                    }
                    extra={
                        <Space>
                            <Link href="/">
                                <Button type="primary">กลับหน้า หลัก</Button>
                            </Link>
                            <Link href="/books">
                                <Button>ไปหน้าหนังสือ</Button>
                            </Link>
                        </Space>
                    }
                />
            </div>
        </AppLayout>
    );
};

export default ErrorPage;
