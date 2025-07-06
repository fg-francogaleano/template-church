import { useEffect, useState } from "react";
import { sanityClient, urlFor } from "../../studio/lib/sanityClient";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "landing"][0]`)
      .then((res) => {
        console.log("📦 Datos recibidos:", res);
        setData(res);
      })
      .catch((err) => {
        console.error("❌ Error al traer datos:", err);
      });
  }, []);

  if (!data) return <p>Cargando...</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>{data.title}</h1>
      <p>{data.subtitle}</p>
      {data.mainImage && (
        <img
          src={urlFor(data.mainImage).width(800).url()}
          alt="Imagen principal"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      )}
    </div>
  );
}

export default App;
