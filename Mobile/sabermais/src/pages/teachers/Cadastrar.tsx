import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";
import { logInOutline, helpCircleOutline } from "ionicons/icons";

const Cadastrar: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [cpf, setCpf] = useState("");
  const [descricao, setDescricao] = useState("");
  const [certificacoes, setCertificacoes] = useState("");
  const [competencias, setCompetencias] = useState("");
  const [valorHora, setValorHora] = useState("");

  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

  const progressPercent = step === 1 ? 0.5 : 1;
  const progressText = step === 1 ? "Etapa 1 de 2" : "Etapa 2 de 2";

  const handleNext = () => {
    if (!nome.trim() || !email.trim() || !senha || !confirmarSenha) {
      alert("Preencha todos os campos da etapa 1.");
      return;
    }
    if (senha !== confirmarSenha) {
      alert("As senhas não conferem.");
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cpf.trim() ||
        !descricao.trim() ||
        !certificacoes.trim() ||
        !competencias.trim() ||
        !valorHora.trim()
    ) {
      alert("Preencha todos os campos da etapa 2.");
      return;
    }

    const payload = {
      nome,
      email,
      senha,
      cpf,
      descricao,
      certificacoes: certificacoes.split(",").map((c) => c.trim()).filter(Boolean),
      competencias: competencias.split(",").map((c) => c.trim()).filter(Boolean),
      valorHora: Number(valorHora),
    };

    console.log("Payload de cadastro (mock):", payload);
    alert("Cadastro enviado! (simulação – depois ligamos com a API)");

    // se quiser, pode limpar o formulário aqui:
    // setStep(1);
    // setNome(""); setEmail(""); setSenha(""); setConfirmarSenha("");
    // setCpf(""); setDescricao(""); setCertificacoes(""); setCompetencias(""); setValorHora("");
  };

  return (
    <IonPage>
      {/* HEADER */}
      <IonHeader translucent>
        <IonToolbar>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <a href="/index">
              <img
                src="/assets/images/logo-100.png"
                alt="Logo"
                style={{ height: 32 }}
              />
            </a>

            <a
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: "0.85rem",
                textDecoration: "none",
                color: "var(--ion-color-primary)",
              }}
            >
              <IonIcon icon={helpCircleOutline} />
              <span>Como funciona?</span>
            </a>
          </div>

          <IonButtons slot="end">
            <IonButton href="/login">
              <IonIcon icon={logInOutline} slot="start" />
              Entrar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* CONTEÚDO */}
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed>
          <IonRow>
            <IonCol size="12">
              <section className="section-size formulario">
                <div className="formulario-cadastro">
                  <div
                    className="form-wrap"
                    role="region"
                    aria-labelledby="tituloCadastro"
                  >
                    <h1 id="tituloCadastro" className="title">
                      Cadastro de Professor
                    </h1>
                    <p style={{ marginBottom: "1rem" }}>
                      Já possui uma conta?{" "}
                      <a href="/login">
                        <u>Entrar</u>
                      </a>
                    </p>

                    {/* Progress bar */}
                    <div
                      id="progress"
                      aria-hidden="true"
                      style={{ marginBottom: "12px" }}
                    >
                      <span id="progressText">{progressText}</span>
                      <div
                        style={{
                          height: 6,
                          background: "#e6e6e6",
                          borderRadius: 6,
                          marginTop: 6,
                        }}
                      >
                        <div
                          id="progressBar"
                          style={{
                            height: "100%",
                            width: `${progressPercent * 100}%`,
                            background: "#000",
                            borderRadius: 6,
                            transition: "width 0.2s ease",
                          }}
                        />
                      </div>
                    </div>

                    <form
                      id="multiStepForm"
                      className="cadastro-form"
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      {/* STEP 1 */}
                      {step === 1 && (
                        <fieldset data-step="1">
                          <label className="field-label" htmlFor="nome">
                            Nome completo *
                          </label>
                          <input
                            id="nome"
                            className="input-field org-input--field"
                            type="text"
                            name="nome"
                            required
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                          />

                          <label className="field-label" htmlFor="email">
                            E-mail *
                          </label>
                          <input
                            id="email"
                            className="input-field org-input--field"
                            type="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />

                          <label className="field-label" htmlFor="senha">
                            Senha *
                          </label>
                          <div className="password-wrapper org-input--field">
                            <input
                              id="senha"
                              name="senha"
                              type={showSenha ? "text" : "password"}
                              className="input-field input-password"
                              required
                              value={senha}
                              onChange={(e) => setSenha(e.target.value)}
                            />
                            <button
                              type="button"
                              className="btn-eye"
                              id="toggleSenha"
                              onClick={() => setShowSenha((prev) => !prev)}
                            >
                              {showSenha ? "🙈" : "👁️"}
                            </button>
                          </div>

                          <label
                            className="field-label"
                            htmlFor="confirmarSenha"
                          >
                            Confirmar senha *
                          </label>
                          <div className="password-wrapper org-input--field">
                            <input
                              id="confirmarSenha"
                              name="confirmarSenha"
                              type={showConfirmarSenha ? "text" : "password"}
                              className="input-field input-password"
                              required
                              value={confirmarSenha}
                              onChange={(e) =>
                                setConfirmarSenha(e.target.value)
                              }
                            />
                            <button
                              type="button"
                              className="btn-eye"
                              id="toggleConfirmarSenha"
                              onClick={() =>
                                setShowConfirmarSenha((prev) => !prev)
                              }
                            >
                              {showConfirmarSenha ? "🙈" : "👁️"}
                            </button>
                          </div>

                          <div style={{ marginTop: "0.75rem" }}>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              id="nextBtn1"
                              onClick={handleNext}
                            >
                              Próximo
                            </button>
                          </div>
                        </fieldset>
                      )}

                      {/* STEP 2 */}
                      {step === 2 && (
                        <fieldset data-step="2">
                          <label className="field-label" htmlFor="cpf">
                            CPF *
                          </label>
                          <input
                            id="cpf"
                            className="input-field org-input--field"
                            type="text"
                            name="cpf"
                            required
                            placeholder="000.000.000-00"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                          />

                          <label className="field-label" htmlFor="descricao">
                            Descrição *
                          </label>
                          <textarea
                            id="descricao"
                            className="input-field org-input--field"
                            name="descricao"
                            rows={4}
                            required
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                          />

                          <label
                            className="field-label"
                            htmlFor="certificacoes"
                          >
                            Certificações *{" "}
                            <small>(separe por vírgula)</small>
                          </label>
                          <input
                            id="certificacoes"
                            className="input-field org-input--field"
                            type="text"
                            name="certificacoes"
                            required
                            placeholder="Cisco, Google"
                            value={certificacoes}
                            onChange={(e) =>
                              setCertificacoes(e.target.value)
                            }
                          />

                          <label
                            className="field-label"
                            htmlFor="competencias"
                          >
                            Competências *{" "}
                            <small>(separe por vírgula)</small>
                          </label>
                          <input
                            id="competencias"
                            className="input-field org-input--field"
                            type="text"
                            name="competencias"
                            required
                            placeholder="JavaScript, Python"
                            value={competencias}
                            onChange={(e) =>
                              setCompetencias(e.target.value)
                            }
                          />

                          <label
                            className="field-label"
                            htmlFor="valorHora"
                          >
                            Valor por Hora (R$) *
                          </label>
                          <input
                            id="valorHora"
                            className="input-field org-input--field"
                            type="number"
                            name="valorHora"
                            required
                            min="0"
                            step="0.01"
                            placeholder="75.50"
                            value={valorHora}
                            onChange={(e) => setValorHora(e.target.value)}
                          />

                          <div className="actions" style={{ marginTop: 12 }}>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              id="backBtn2"
                              onClick={handleBack}
                            >
                              Voltar
                            </button>
                            <button
                              type="submit"
                              className="btn btn-submit"
                              id="submitBtn"
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
            </IonCol>
          </IonRow>

          {/* footer bem discreto, sem aquele texto saturado */}
          <IonRow>
            <IonCol size="12">
              <IonText color="medium">
                <p
                  style={{
                    fontSize: "0.75rem",
                    textAlign: "center",
                    marginTop: 16,
                    opacity: 0.6,
                  }}
                >
                  Cadastro de professor · versão mobile
                </p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Cadastrar;

