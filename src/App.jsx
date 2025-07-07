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
        console.error(" Error al traer datos:", err);
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

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
