import Button from "./components/Button";
import Form from "./components/form/Form";
import { useState, useEffect } from "react";
import AppExtensionsSDK from "@pipedrive/app-extensions-sdk";

function App() {
  const [isUser, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/user");
      if (res.ok) {
        setUser(true);
      }
      setLoading(false);
    };

    const initIFrame = async () => {
      const id = new URL(location.href).searchParams.get("id");
      if (id) {
        await new AppExtensionsSDK().initialize({
          size: { width: 720, height: 500 },
        });
      }
    };

    void initIFrame();
    void getUser();
  }, [isUser]);

  return (
    <main>
      {loading ? (
        "Loading..."
      ) : isUser ? (
        <Form />
      ) : (
        <Button
          text="Login"
          onClick={() => {
            location.replace("/login");
          }}
        />
      )}
    </main>
  );
}

export default App;
