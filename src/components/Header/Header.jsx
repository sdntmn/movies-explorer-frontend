import React from "react";

import logoPath from "../../images/logo.svg";

export default function Header(children) {
  return (
    <div className="root__cover">
      <header className="header">
        <img className="logo" src={logoPath} alt="Логотип сайта" />
        <div className="header__nav"></div>
        {children}
      </header>
    </div>
  );
}

/*
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Navigation />}></Route>
        <Route
          path={"/login" || "/register"}
          element={
            <div>
              <header className="header">
                <img className="logo" src={logoPath} alt="Логотип сайта" />
              </header>
            </div>
          }
        ></Route>
      </Routes>
    </React.Fragment>
  );
};

export default Header;
*/
