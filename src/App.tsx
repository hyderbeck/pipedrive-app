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
      const params = new URL(location.href).searchParams;
      if (params.get("id")) {
        await new AppExtensionsSDK().initialize({
          size: { width: 720, height: 620 },
        });
      }
    };

    void initIFrame();
    void getUser();
  }, [isUser]);

  return (
    <main className="flex justify-center p-2 sm:pt-4 text-neutral-900">
      {loading ? (
        <p className="text-lg">Loading...</p>
      ) : isUser ? (
        <Form />
      ) : (
        <Button
          text="Login"
          onClick={() => {
            window.open(`${location.origin}/login`, "_blank");
          }}
          className="text-lg px-4 border-blue-400"
        />
      )}
    </main>
  );
}

export default App;
