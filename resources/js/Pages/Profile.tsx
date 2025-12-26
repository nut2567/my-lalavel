import type { FC } from "react";
import AppLayout from "../Layouts/AppLayout";
import ProfileForm from "../components/ProfileForm";

const Profile: FC = () => (
    <AppLayout>
        <ProfileForm />
    </AppLayout>
);

export default Profile;
