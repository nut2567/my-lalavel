import LoginForm from "../components/LoginForm";
import { Row, Col, Card, Layout } from "antd";

const Login = () => (
    <Row gutter={[32, 32]} align="middle" style={{ justifyContent: "center" }}>
        <Col xs={24} lg={12}>
        </Col>
        <Col xs={24} lg={12}>
            <Card
                variant={"borderless"}
                style={{
                    borderRadius: 16,
                    boxShadow: "0 18px 48px rgba(15, 23, 42, 0.12)",
                    // paddingTop: "25%",
                    // paddingRight: "10%",
                }}
            >
                <LoginForm />
            </Card>
        </Col>
    </Row>
);
Login.layout = (page: React.ReactNode) => (
    <Layout>{page}</Layout>
);

export default Login;
