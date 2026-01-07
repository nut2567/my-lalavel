import { Typography } from "antd";
import { useForm } from "@inertiajs/react";
import type { ReactElement } from "react";
import LibraryLayout from "../../Layouts/LibraryLayout";
import BookForm, { type BookFormState } from "./BookForm";

const Create = () => {
    const form = useForm<BookFormState>({
        title: "",
        author: "",
        summary: "",
    });

    const submit = () => {
        form.post("/books");
    };

    return (
        <>
            <div className="hero__header" style={{ marginBottom: 16 }}>
                <Typography.Title level={2} style={{ margin: 0 }}>
                    เพิ่มหนังสือใหม่
                </Typography.Title>
            </div>

            <BookForm form={form} onSubmit={submit} submitLabel="บันทึก" />
        </>
    );
};

Create.layout = (page: ReactElement) => <LibraryLayout>{page}</LibraryLayout>;

export default Create;
