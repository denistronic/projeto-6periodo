// src/pages/student/Cadastrar.tsx
import React, { useState } from "react";

const Cadastrar: React.FC = () => {
  // Etapa 1 ou 2
  const [step, setStep] = useState<1 | 2>(1);

  // Mostrar/ocultar senhas
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

  // Dados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    cpf: "",
    descricao: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (
      !formData.nome.trim() ||
      !formData.email.trim() ||
      !formData.senha.trim() ||
      !formData.confirmarSenha.trim()
    ) {
      alert("Preencha todos os campos da Etapa 1.");
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.cpf.trim() || !formData.descricao.trim()) {
      alert("Preencha CPF e Descrição.");
      return;
    }

    console.log("Dados enviados:", formData);
    alert("Cadastro enviado (simulação).");
  };

  const progressText = `Etapa ${step} de 2`;
  const progressWidth = step === 1 ? "50%" : "100%";

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
      {/* HEADER SIMPLES COM APENAS O LOGO */}
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
            href="/index.html"
            style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
          >
            <img
              src="/assets/images/logo-100.png"
              alt="Saber+"
              style={{ height: 32, display: "block" }}
            />
          </a>
          {/* lado direito vazio (sem Encontrar professor / Entrar) */}
          <div />
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main
        style={{
          flex: 1,
          padding: "1.5rem 1rem 2rem",
        }}
      >
        <section>
          <div
            style={{
              maxWidth: 960,
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
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
              {/* TÍTULO */}
              <h1
                style={{
                  margin: 0,
                  marginBottom: "0.5rem",
                  fontSize: "1.4rem",
                  textAlign: "center",
                }}
              >
                Cadastro de aluno
              </h1>

              <p
                style={{
                  fontSize: "0.9rem",
                  textAlign: "center",
                  marginBottom: "1.25rem",
                }}
              >
                Já possui uma conta?{" "}
                <a
                  href="/login.html"
                  style={{ color: "#60a5fa", textDecoration: "underline" }}
                >
                  Login
                </a>
              </p>

              {/* FORMULÁRIO */}
              <form
                id="multiStepForm"
                noValidate
                onSubmit={handleSubmit}
              >
                {/* PROGRESSO */}
                <div
                  aria-hidden="true"
                  style={{ marginBottom: "1.2rem" }}
                >
                  <span
                    style={{
                      fontSize: "0.85rem",
                      display: "block",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {progressText}
                  </span>
                  <div
                    style={{
                      height: "6px",
                      background: "#1f2933",
                      borderRadius: "999px",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: progressWidth,
                        background: "#3b82f6",
                        borderRadius: "999px",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>

                {/* ========== STEP 1 ========== */}
                {step === 1 && (
                  <fieldset
                    style={{
                      border: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.85rem",
                    }}
                  >
                    <div>
                      <label
                        htmlFor="nome"
                        style={{
                          display: "block",
                          marginBottom: "0.25rem",
                          fontSize: "0.85rem",
                        }}
                      >
                        Nome completo *
                      </label>
                      <input
                        id="nome"
                        type="text"
                        required
                        value={formData.nome}
                        onChange={handleChange}
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

                    <div>
                      <label
                        htmlFor="email"
                        style={{
                          display: "block",
                          marginBottom: "0.25rem",
                          fontSize: "0.85rem",
                        }}
                      >
                        E-mail *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
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

                    <div>
                      <label
                        htmlFor="senha"
                        style={{
                          display: "block",
                          marginBottom: "0.25rem",
                          fontSize: "0.85rem",
                        }}
                      >
                        Senha *
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
                          type={showSenha ? "text" : "password"}
                          required
                          value={formData.senha}
                          onChange={handleChange}
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
                          onClick={() => setShowSenha((v) => !v)}
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
                          {showSenha ? "Ocultar" : "Ver"}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="confirmarSenha"
                        style={{
                          display: "block",
                          marginBottom: "0.25rem",
                          fontSize: "0.85rem",
                        }}
                      >
                        Confirmar senha *
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
                          id="confirmarSenha"
                          name="confirmarSenha"
                          type={showConfirmarSenha ? "text" : "password"}
                          required
                          value={formData.confirmarSenha}
                          onChange={handleChange}
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
                          onClick={() => setShowConfirmarSenha((v) => !v)}
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
                          {showConfirmarSenha ? "Ocultar" : "Ver"}
                        </button>
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: "1rem",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        type="button"
                        onClick={handleNext}
                        style={{
                          padding: "0.6rem 1.3rem",
                          borderRadius: 999,
                          border: "none",
                          backgroundColor: "#3b82f6",
                          color: "#fff",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                      >
                        Próximo
                      </button>
                    </div>
                  </fieldset>
                )}

                {/* ========== STEP 2 ========== */}
                {step === 2 && (
                  <fieldset
                    style={{
                      border: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.85rem",
                    }}
                  >
                    <div>
                      <label
                        htmlFor="cpf"
                        style={{
                          display: "block",
                          marginBottom: "0.25rem",
                          fontSize: "0.85rem",
                        }}
                      >
                        CPF *
                      </label>
                      <input
                        id="cpf"
                        type="text"
                        required
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={handleChange}
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

                    <div>
                      <label
                        htmlFor="descricao"
                        style={{
                          display: "block",
                          marginBottom: "0.25rem",
                          fontSize: "0.85rem",
                        }}
                      >
                        Descrição *
                      </label>
                      <textarea
                        id="descricao"
                        rows={4}
                        required
                        value={formData.descricao}
                        onChange={handleChange}
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

                    <div
                      style={{
                        marginTop: "1rem",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "0.75rem",
                      }}
                    >
                      <button
                        type="button"
                        onClick={handleBack}
                        style={{
                          flex: 1,
                          padding: "0.6rem 1rem",
                          borderRadius: 999,
                          border: "1px solid #4b5563",
                          backgroundColor: "transparent",
                          color: "#e5e7eb",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                        }}
                      >
                        Voltar
                      </button>
                      <button
                        type="submit"
                        style={{
                          flex: 1,
                          padding: "0.6rem 1rem",
                          borderRadius: 999,
                          border: "none",
                          backgroundColor: "#16a34a",
                          color: "#fff",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                      >
                        Cadastrar
                      </button>
                    </div>
                  </fieldset>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER SIMPLE DARK */}
      <footer
        style={{
          borderTop: "1px solid #1f2933",
          padding: "1rem 1rem 1.25rem",
          backgroundColor: "#020617",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div>
            <img
              src="/assets/images/logo-100.png"
              alt="Logo do site"
              style={{ height: 28, marginBottom: "0.25rem" }}
            />
            <p
              style={{
                fontSize: "0.8rem",
                color: "#9ca3af",
                margin: 0,
              }}
            >
              O conhecimento que você procura, a um clique de distância
            </p>
          </div>

          <nav>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                gap: "1.25rem",
                fontSize: "0.8rem",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <li>
                <a
                  href="/index.html"
                  style={{ color: "#9ca3af", textDecoration: "none" }}
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="/sobre-nos.html"
                  style={{ color: "#9ca3af", textDecoration: "none" }}
                >
                  Sobre nós
                </a>
              </li>
              <li>
                <a
                  href="/contato.html"
                  style={{ color: "#9ca3af", textDecoration: "none" }}
                >
                  Contato
                </a>
              </li>
            </ul>
          </nav>

          <div
            style={{
              fontSize: "0.75rem",
              color: "#6b7280",
              marginTop: "0.25rem",
            }}
          >
            © 2025 Grupo 2. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cadastrar;
