import useLogout from "../Hooks/useLogout.js";
import { useAuthContext } from "../Hooks/useAuthContext.js";
import "../Assets/Styles/Profile.css";
import useChangePassword from "../Hooks/useChangePassword.js";
import { useState } from "react";
import Modal from "../Assets/UI/Modal.jsx";
import ChangePasswordForm from "../Components/ChangePasswordForm.jsx";

const ProfilePage = () => {
    const { logout, isLoading } = useLogout();
    const { user } = useAuthContext();

    const [modal, setModal] = useState(false);

    return (
        <div>
            {user && user.success ? (
                <div className="profile-container">
                    <div className="profile-image-container">
                        <img
                            src={
                                "https://as2.ftcdn.net/v2/jpg/05/62/02/41/1000_F_562024161_tGM4lFlnO0OczLYHFFuNNdMUTG9ekHxb.jpg"
                            }
                            alt="Profile"
                            className="profile-image"
                        />
                    </div>

                    <div className="profile-info">
                        <h2 className="profile-username">{user.username}</h2>
                        <p className="profile-email">{user.email}</p>
                    </div>

                    <div className="profile-actions">
                        <button
                            className="profile-btn"
                            onClick={logout}
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging out..." : "Logout"}
                        </button>
                        <button
                            className="profile-btn"
                            onClick={() => setModal(true)}
                        >
                            Change Password
                        </button>

                        <Modal
                            onChange={setModal}
                            visible={modal}
                            setVisible={setModal}
                        >
                            <ChangePasswordForm />
                        </Modal>
                    </div>
                </div>
            ) : (
                <h1 style={{ textAlign: "center" }}>No access to profile</h1>
            )}
        </div>
    );
};

export default ProfilePage;
