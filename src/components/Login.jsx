import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!emailRegex.test(email)) newErrors.email = "Geçerli bir email giriniz";
    if (!passRegex.test(password)) newErrors.password = "Şifre en az 8 karakter, 1 büyük harf ve 1 sayı içermeli";
    if (!terms) newErrors.terms = "Şartları kabul etmelisiniz";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/success");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        data-cy="input-email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email}</p>}
      <input
        data-cy="input-password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {errors.password && <p>{errors.password}</p>}
      <label>
        <input
          data-cy="input-terms"
          type="checkbox"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
        />
        Şartları kabul ediyorum
      </label>
      {errors.terms && <p>{errors.terms}</p>}
      <button data-cy="form-submit" type="submit" disabled={!email || !password || !terms}>
        Login
      </button>
    </form>
  );
}
