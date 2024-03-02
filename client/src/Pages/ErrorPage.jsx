import "../Assets/Styles/ErrorPage.css";

function ErrorPage() {
    return (
        <div className="error-container">
            <div>
                <div className="error-code">404</div>
                <div className="error-message">Oops! Page not found.</div>
                <div className="error-description">
                    The page you are looking for might have been removed, had
                    its name changed, or is temporarily unavailable.
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
