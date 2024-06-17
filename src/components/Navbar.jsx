import { IconButton } from "@mui/material";
import { Search, Person } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";


const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("")

  const navigate = useNavigate()

  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.png" alt="logo" />
      </a>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Поиск ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton
        disabled={search === ""}
        onClick={() => {navigate(`/properties/search/${search}`)}}
          >
          <Search
            sx={{ color: variables.pinkred }}
            />
        </IconButton>
      </div>

      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">
            <p>Создать <br/>маршрут</p>
          </a>
        ) : (
          <a href="/login" className="host">
            <p>Создать <br/>маршрут</p>
          </a>
        )}

      <button
        className="navbar_right_account"
        onClick={() => setDropdownMenu(!dropdownMenu)}
      >
        {!user ? (
          <Person sx={{ color: variables.darkgrey }} />
        ) : (
          <Person sx={{ color: variables.pinkred }} />
        )}
      </button>


        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Войти</Link>
            <Link to="/register">Зарегестрироваться</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={`/${user._id}/trips`}>Мои путешествия</Link>
            <Link to="/create-listing">Создать маршрут</Link>
            <Link to={`/${user._id}/properties`}>Мои маршруты</Link>
            <Link to="/chat">Сгенерировать маршрут</Link>

            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Выйти
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
