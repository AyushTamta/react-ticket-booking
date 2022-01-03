import { useIsLogin } from "../../hooks/useIsLogin";
import { Link, Redirect } from "react-router-dom";
export default function HeaderSearch(props) {
  // function handleChangeSearch(evt) {
  //   setSearchStr(evt.target.value);
  // }

  // function handleSubmit(evt) {
  //   evt.preventDefault();
  //   history.push("/search?q=" + searchStr);
  // }

  // Có nhiều cách gửi searchStr sang một trang khác
  // Cách 1: Lưu vào trong Redux -> Trang Search lấy data từ redux về
  // Cách 2: Lưu vào trong localStorage
  // Cách 3: ...
  // Cách 4: Truyền thông qua đường dẫn (URL). Params string
  // after login

  const { isLogin, user } = useIsLogin();
  return (
    <>
      <div className="header__auth">
        <button
          className="header__search-btn"
          type="button"
          onClick={props.handleClick}
        >
          <i className="icon ion-ios-search" />
        </button>
        {isLogin ? (
          <li className="header__nav-item">
            <button className="header__sign-in" data-toggle="dropdown">
              <span>{user.taiKhoan}</span>
            </button>
            <ul
              className="dropdown-menu header__dropdown-menu"
              aria-labelledby="dropdownMenuHome"
            >
              <li>
                <Link to="/profile">Personal information</Link>
              </li>
              <li>
                {user.maLoaiNguoiDung === "QuanTri" ? (
                  <Link to="/admin">System administration</Link>
                ) : (
                  <></>
                )}
              </li>
              <li>
                <a
                  href="/"
                  onClick={async () => {
                    localStorage.removeItem("userLogin");
                    localStorage.removeItem("accessToken");
                    return <Redirect to="/" />;
                  }}
                >
                  Log off
                </a>
              </li>
            </ul>
          </li>
        ) : (
          <Link to="/signin" className="header__sign-in">
            <i className="icon ion-ios-log-in" />
            <span>sign in</span>
          </Link>
        )}
      </div>
    </>
  );
}
