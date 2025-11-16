// src/pages/student/EditarPerfil.tsx
import React, { useState } from "react";

const EditarPerfil: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aqui você pode chamar o service da API depois
    console.log("Salvar dados do aluno...");
    alert("Dados salvos (simulação).");
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#050609",
        color: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER SIMPLES, NO MESMO CLIMA DO PERFIL */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backgroundColor: "#050609",
          borderBottom: "1px solid #1f2933",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "0.75rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <a
            href="/index"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
            }}
          >
            <img
              src="/assets/images/logo-100.png"
              alt="Saber+"
              style={{ height: 32, display: "block" }}
            />
          </a>

          {/* Avatar simples, sem dropdown, como você comentou no código original */}
          <button
            type="button"
            style={{
              width: 36,
              height: 36,
              borderRadius: "999px",
              border: "none",
              backgroundColor: "#1d4ed8",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            A
          </button>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main
        style={{
          flex: 1,
          padding: "1.5rem 1rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* "Cartão" de edição – mobile first, centralizado */}
          <section
            style={{
              width: "100%",
              maxWidth: 480,
              backgroundColor: "rgba(15,23,42,0.75)",
              borderRadius: 16,
              padding: "1.5rem 1.25rem",
              border: "1px solid #111827",
              boxShadow: "0 18px 50px rgba(0,0,0,0.65)",
            }}
          >
            <h1
              style={{
                margin: 0,
                marginBottom: "1.25rem",
                fontSize: "1.4rem",
                textAlign: "center",
              }}
            >
              Editar dados
            </h1>

            <form onSubmit={handleSubmit}>
              {/* Nome */}
              <div style={{ marginBottom: "0.9rem" }}>
                <label
                  htmlFor="nome"
                  style={{
                    display: "block",
                    marginBottom: "0.25rem",
                    fontSize: "0.85rem",
                  }}
                >
                  Nome
                </label>
                <input
                  id="nome"
                  type="text"
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.7rem",
                    borderRadius: 10,
                    border: "1px solid #374151",
                    backgroundColor: "#020617",
                    color: "#e5e7eb",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "0.9rem" }}>
                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    marginBottom: "0.25rem",
                    fontSize: "0.85rem",
                  }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.7rem",
                    borderRadius: 10,
                    border: "1px solid #374151",
                    backgroundColor: "#020617",
                    color: "#e5e7eb",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              {/* Senha */}
              <div style={{ marginBottom: "0.9rem" }}>
                <label
                  htmlFor="senha"
                  style={{
                    display: "block",
                    marginBottom: "0.25rem",
                    fontSize: "0.85rem",
                  }}
                >
                  Senha
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 10,
                    border: "1px solid #374151",
                    backgroundColor: "#020617",
                    overflow: "hidden",
                  }}
                >
                  <input
                    id="senha"
                    name="senha"
                    type={showPassword ? "text" : "password"}
                    style={{
                      flex: 1,
                      padding: "0.55rem 0.7rem",
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                      color: "#e5e7eb",
                      fontSize: "0.9rem",
                    }}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    style={{
                      padding: "0.55rem 0.75rem",
                      border: "none",
                      borderLeft: "1px solid #374151",
                      backgroundColor: "transparent",
                      color: "#9ca3af",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    {showPassword ? "Ocultar" : "Ver"}
                  </button>
                </div>
              </div>

              {/* CPF (desabilitado) */}
              <div style={{ marginBottom: "0.9rem" }}>
                <label
                  htmlFor="cpf"
                  style={{
                    display: "block",
                    marginBottom: "0.25rem",
                    fontSize: "0.85rem",
                  }}
                >
                  CPF
                </label>
                <input
                  id="cpf"
                  type="text"
                  disabled
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.7rem",
                    borderRadius: 10,
                    border: "1px solid #374151",
                    backgroundColor: "#020617",
                    color: "#6b7280",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              {/* Tipo (desabilitado) */}
              <div style={{ marginBottom: "0.9rem" }}>
                <label
                  htmlFor="tipo"
                  style={{
                    display: "block",
                    marginBottom: "0.25rem",
                    fontSize: "0.85rem",
                  }}
                >
                  Tipo
                </label>
                <input
                  id="tipo"
                  type="text"
                  disabled
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.7rem",
                    borderRadius: 10,
                    border: "1px solid #374151",
                    backgroundColor: "#020617",
                    color: "#6b7280",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              {/* Descrição */}
              <div style={{ marginBottom: "1.2rem" }}>
                <label
                  htmlFor="descricao"
                  style={{
                    display: "block",
                    marginBottom: "0.25rem",
                    fontSize: "0.85rem",
                  }}
                >
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.7rem",
                    borderRadius: 10,
                    border: "1px solid #374151",
                    backgroundColor: "#020617",
                    color: "#e5e7eb",
                    fontSize: "0.9rem",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Botão Salvar */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="submit"
                  style={{
                    padding: "0.55rem 1.3rem",
                    borderRadius: 999,
                    border: "none",
                    backgroundColor: "#16a34a",
                    color: "#fff",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  Salvar
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default EditarPerfil;
