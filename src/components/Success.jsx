import "./Success.css";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1 className="success-title">Giriş Başarılı!</h1>
        <p className="success-text">Hoş geldiniz, girişiniz başarıyla tamamlandı.</p>
        <button
          className="success-button"
          onClick={() => navigate("/")}
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}
