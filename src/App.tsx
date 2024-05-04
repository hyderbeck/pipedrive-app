import Button from "./components/Button";
import Form from "./components/form/Form";
import { useState, useEffect } from "react";

function App() {
  const [username, setUsername] = useState<string | null>("");
  useEffect(() => {
    const getUsername = async () => {
      const res = await fetch("/api/username");
      const text = await res.text();
      if (text != "None") {
        setUsername(text);
      } else {
        setUsername(null);
      }
    };

    void getUsername();
  }, [username]);

  return (
    <main>
      {username
        ? `Hello, ${username}!`
        : username === null && <Button text="Login" />}
      <Form />
    </main>
  );
}

export default App;
