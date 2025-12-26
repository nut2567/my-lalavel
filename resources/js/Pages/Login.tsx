import type { FC } from "react";
import AppLayout from "../Layouts/AppLayout";
import LoginForm from "../components/LoginForm";

const Login: FC = () => (
    <AppLayout>
        <LoginForm />
    </AppLayout>
);

export default Login;
