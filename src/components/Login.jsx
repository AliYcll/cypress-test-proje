import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const next = {};
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRe = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!emailRe.test(email)) next.email = "Geçerli bir email giriniz";
    if (!passRe.test(password)) next.password = "Şifre en az 8 karakter, 1 büyük harf ve 1 sayı içermeli";
    if (!terms) next.terms = "Şartları kabul etmelisiniz";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) navigate("/success");
  };

  const isInvalid = (key) => Boolean(errors[key]);

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={onSubmit} noValidate>
        <h1 className="login-title">Giriş Yap</h1>
        <p className="login-subtitle">Hesabınıza erişmek için bilgilerinizi girin</p>

        <div className="form-field">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            id="email"
            className={`input ${isInvalid("email") ? "is-invalid" : ""}`}
            type="email"
            placeholder="ornek@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-cy="input-email"
          />
          {isInvalid("email") && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="password">Şifre</label>
          <input
            id="password"
            className={`input ${isInvalid("password") ? "is-invalid" : ""}`}
            type="password"
            placeholder="En az 8 karakter, 1 büyük harf ve 1 sayı"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-cy="input-password"
          />
          {isInvalid("password") && <span className="error-text">{errors.password}</span>}
        </div>

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            data-cy="input-terms"
          />
          Şartları kabul ediyorum
        </label>
        {isInvalid("terms") && <span className="error-text">{errors.terms}</span>}

        <button
          className="button"
          type="submit"
          disabled={!email || !password || !terms}
          data-cy="form-submit"
        >
          Giriş
        </button>

        <div className="form-foot">© {new Date().getFullYear()} Projeniz</div>
      </form>
    </div>
  );
}
