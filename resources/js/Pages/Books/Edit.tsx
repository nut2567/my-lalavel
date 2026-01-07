import { Typography } from "antd";
import { useForm, usePage } from "@inertiajs/react";
import type { ReactElement } from "react";
import LibraryLayout from "../../Layouts/LibraryLayout";
import BookForm, { type BookFormState } from "./BookForm";

type PageProps = {
    book: {
        id: number;
        title: string;
        author: string;
        summary?: string;
    };
};

const Edit = () => {
    const { props } = usePage<PageProps>();
    const book = props.book;

    const form = useForm<BookFormState>({
        title: book.title,
        author: book.author,
        summary: book.summary ?? "",
    });

    const submit = () => {
        form.put(`/books/${book.id}`);
    };

    return (
        <>
            <div className="hero__header" style={{ marginBottom: 16 }}>
                <Typography.Title level={2} style={{ margin: 0 }}>
                    แก้ไขหนังสือ
                </Typography.Title>
            </div>

            <BookForm form={form} onSubmit={submit} submitLabel="อัปเดต" />
        </>
    );
};

Edit.layout = (page: ReactElement) => <LibraryLayout>{page}</LibraryLayout>;

export default Edit;
