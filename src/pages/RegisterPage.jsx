import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import "../styles/Register.scss";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

   const [passwordMatch, setPasswordMatch] = useState(true)

   useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "");
  }, [formData.password, formData.confirmPassword]);


   const navigate = useNavigate()

  const handleSubmit = async (e) => {
     e.preventDefault()

    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Указываем, что отправляем JSON
        },
        body: JSON.stringify(formData), // Преобразуем объект в JSON-строку
      });
    
       if (response.ok) {
         navigate("/login")
       }
     } catch (err) {
       console.log("Registration failed", err.message)
     }
    }

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="Имя"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Фамилия"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Пароль"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
          />
          <input
            placeholder="Подтвердите пароль"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )} 
        
          <button type="submit" disabled={!passwordMatch}>ЗАРЕГИСТРИРОВАТЬСЯ</button>
        </form>
        <a href="/login">Уже есть аккаунт? Войти.</a>
      </div>
    </div>
  );
};

export default RegisterPage;
