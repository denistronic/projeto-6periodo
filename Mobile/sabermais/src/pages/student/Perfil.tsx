// src/pages/student/Perfil.tsx
import React, { useState } from "react";

const PerfilStudent: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [name, setName] = useState("Ana Silva");
  const [bio, setBio] = useState("Fale um pouco sobre você...");

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    alert("Desconectando...");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  const handleShare = async () => {
    const url = window.location.href;

    try {
      // @ts-ignore
      if (navigator.share) {
        // @ts-ignore
        await navigator.share({
          title: "Meu perfil no Saber+",
          text: "Dá uma olhada no meu perfil no Saber+",
          url,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert("Link do perfil copiado para a área de transferência!");
      } else {
        alert(
          "Não foi possível compartilhar automaticamente. Copie o link da barra do navegador."
        );
      }
    } catch {
      // usuário cancelou, tudo bem
    }
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditOpen(false);
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
      {/* HEADER SIMPLES */}
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

          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setIsUserMenuOpen((prev) => !prev)}
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

            {isUserMenuOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  marginTop: 8,
                  backgroundColor: "#0b0c10",
                  borderRadius: 8,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.45)",
                  padding: "0.35rem 0",
                  minWidth: 170,
                  border: "1px solid #1f2933",
                }}
              >
                <a
                  href="/student/perfil"
                  style={{
                    display: "block",
                    padding: "0.5rem 0.9rem",
                    fontSize: "0.9rem",
                    color: "#e5e7eb",
                    textDecoration: "none",
                  }}
                >
                  Meu perfil
                </a>
                <a
                  href="/student/dashboard"
                  style={{
                    display: "block",
                    padding: "0.5rem 0.9rem",
                    fontSize: "0.9rem",
                    color: "#e5e7eb",
                    textDecoration: "none",
                  }}
                >
                  Dashboard
                </a>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "0.5rem 0.9rem",
                    fontSize: "0.9rem",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    color: "#f97373",
                    cursor: "pointer",
                  }}
                >
                  Sair
                </button>
              </div>
            )}
          </div>
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
            flexDirection: "column",
            gap: "1.75rem",
          }}
        >
          {/* BLOCO 1 – Cabeçalho do perfil */}
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "0.75rem",
            }}
          >
            <div>
              <h1
                id="profileName"
                style={{
                  margin: 0,
                  marginBottom: "0.25rem",
                  fontSize: "1.6rem",
                }}
              >
                {name}
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.95rem",
                  color: "#9ca3af",
                }}
              >
                Estudante
              </p>
              <p
                style={{
                  margin: 0,
                  marginTop: "0.15rem",
                  fontSize: "0.8rem",
                  color: "#6b7280",
                }}
              >
                Membro desde <time dateTime="2023-06">Junho 2023</time>
              </p>
            </div>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                flexWrap: "wrap",
                marginTop: "0.75rem",
                fontSize: "0.85rem",
              }}
            >
              <li>
                <strong style={{ display: "block", fontSize: "1.1rem" }}>
                  45
                </strong>
                <span style={{ color: "#9ca3af" }}>Aulas</span>
              </li>
              <li>
                <strong style={{ display: "block", fontSize: "1.1rem" }}>
                  8
                </strong>
                <span style={{ color: "#9ca3af" }}>Professores</span>
              </li>
              <li>
                <strong style={{ display: "block", fontSize: "1.1rem" }}>
                  67h
                </strong>
                <span style={{ color: "#9ca3af" }}>Estudadas</span>
              </li>
            </ul>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              <button
                type="button"
                onClick={() => setIsEditOpen(true)}
                style={{
                  padding: "0.4rem 0.9rem",
                  borderRadius: 999,
                  border: "1px solid #4b5563",
                  backgroundColor: "transparent",
                  color: "#e5e7eb",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                ✏️ Editar perfil
              </button>
              <button
                type="button"
                onClick={handleShare}
                style={{
                  padding: "0.4rem 0.9rem",
                  borderRadius: 999,
                  border: "none",
                  backgroundColor: "#2563eb",
                  color: "#fff",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                📤 Compartilhar
              </button>
            </div>
          </section>

          {/* BLOCO 2 – Sobre */}
          <section
            style={{
              backgroundColor: "rgba(15,23,42,0.7)",
              borderRadius: 16,
              padding: "1rem 1.1rem",
              border: "1px solid #111827",
            }}
          >
            <h2
              style={{
                fontSize: "1.1rem",
                margin: 0,
                marginBottom: "0.4rem",
              }}
            >
              Sobre
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                lineHeight: 1.5,
                color: "#d1d5db",
              }}
            >
              {bio || "Fale um pouco sobre você..."}
            </p>
          </section>

          {/* BLOCO 3 – Atividade Recente */}
          <section
            style={{
              backgroundColor: "rgba(15,23,42,0.7)",
              borderRadius: 16,
              padding: "1rem 1.1rem",
              border: "1px solid #111827",
            }}
          >
            <h2
              style={{
                fontSize: "1.1rem",
                margin: 0,
                marginBottom: "0.4rem",
              }}
            >
              Atividade recente
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: "#d1d5db",
                marginBottom: "0.35rem",
              }}
            >
              Você ainda não tem atividades recentes.
            </p>
            <a
              href="/student/dashboard"
              style={{
                fontSize: "0.85rem",
                color: "#60a5fa",
                textDecoration: "none",
              }}
            >
              Ver todas →
            </a>
          </section>

          {/* BLOCO 4 – Conquistas */}
          <section
            style={{
              backgroundColor: "rgba(15,23,42,0.7)",
              borderRadius: 16,
              padding: "1rem 1.1rem",
              border: "1px solid #111827",
              marginBottom: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.1rem",
                margin: 0,
                marginBottom: "0.6rem",
              }}
            >
              Conquistas
            </h2>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                fontSize: "0.9rem",
              }}
            >
              <li>
                <strong>Primeira aula</strong>
                <br />
                <span style={{ color: "#d1d5db" }}>
                  Completou sua primeira aula
                </span>
              </li>
              <li>
                <strong>Sequência de 7 dias</strong>
                <br />
                <span style={{ color: "#d1d5db" }}>
                  Estudou por 7 dias seguidos
                </span>
              </li>
              <li>
                <strong>Aluno 5 estrelas</strong>
                <br />
                <span style={{ color: "#d1d5db" }}>
                  Recebeu avaliação 5⭐ de um professor
                </span>
              </li>
              <li>
                <strong>Mestre do conhecimento</strong>
                <br />
                <span style={{ color: "#d1d5db" }}>
                  Complete 100 aulas
                </span>
              </li>
            </ul>
          </section>
        </div>

        {/* MODAL DE EDIÇÃO (inline, sem CSS externo) */}
        {isEditOpen && (
          <>
            {/* overlay */}
            <div
              onClick={() => setIsEditOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.6)",
                zIndex: 40,
              }}
            />
            {/* caixa do modal */}
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: 480,
                  backgroundColor: "#020617",
                  borderRadius: 16,
                  border: "1px solid #1f2933",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.9)",
                  padding: "1.25rem 1.25rem 1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.85rem",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "1.15rem",
                    }}
                  >
                    Editar perfil
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#9ca3af",
                      fontSize: "1.4rem",
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmitEdit}>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <label
                      htmlFor="profileNameInputMobile"
                      style={{
                        display: "block",
                        marginBottom: "0.25rem",
                        fontSize: "0.85rem",
                      }}
                    >
                      Nome
                    </label>
                    <input
                      id="profileNameInputMobile"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
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

                  <div style={{ marginBottom: "1rem" }}>
                    <label
                      htmlFor="profileBioInputMobile"
                      style={{
                        display: "block",
                        marginBottom: "0.25rem",
                        fontSize: "0.85rem",
                      }}
                    >
                      Descrição
                    </label>
                    <textarea
                      id="profileBioInputMobile"
                      rows={3}
                      placeholder="Fale um pouco sobre você..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
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
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "0.5rem",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setIsEditOpen(false)}
                      style={{
                        padding: "0.4rem 0.9rem",
                        borderRadius: 999,
                        border: "1px solid #4b5563",
                        backgroundColor: "transparent",
                        color: "#e5e7eb",
                        fontSize: "0.85rem",
                        cursor: "pointer",
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      style={{
                        padding: "0.4rem 0.9rem",
                        borderRadius: 999,
                        border: "none",
                        backgroundColor: "#2563eb",
                        color: "#fff",
                        fontSize: "0.85rem",
                        cursor: "pointer",
                      }}
                    >
                      Salvar alterações
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default PerfilStudent;
