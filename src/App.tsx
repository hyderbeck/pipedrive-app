import Button from "./components/Button";
import Form from "./components/form/Form";
import { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLogin = async () => {
      const res = await fetch("/api");
      if ((await res.text()) === "OK") {
        setIsLoggedIn(true);
      }
    };

    void checkLogin();
  }, [isLoggedIn]);

  return (
    <main>
      {!isLoggedIn && <Button text="Login" />}
      <Form />
    </main>
  );
}

export default App;
