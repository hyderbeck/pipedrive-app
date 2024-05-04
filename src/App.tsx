import Button from "./components/Button";
import Form from "./components/form/Form";
import { useState, useEffect } from "react";

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsername = async () => {
      const res = await fetch("/api/username");
      const text = await res.text();
      if (text != "None") {
        setUsername(text);
      }
      setLoading(false);
    };

    void getUsername();
  }, [username]);

  return (
    <main>
      {loading ? (
        "Loading..."
      ) : (
        <>
          {username ? (
            `Hello, ${username}!`
          ) : (
            <Button
              text="Login"
              onClick={() => {
                location.replace("/login");
              }}
            />
          )}
          <Form />
        </>
      )}
    </main>
  );
}

export default App;
