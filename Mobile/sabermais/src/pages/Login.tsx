import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonFooter,
  IonModal,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

import {
  searchOutline,
  personAddOutline,
  eyeOutline,
  eyeOffOutline,
  closeOutline,
  logInOutline,
  schoolOutline,
  personOutline,
} from "ionicons/icons";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showCadastroModal, setShowCadastroModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !senha) {
      setErrorMsg("Preencha e-mail e senha para continuar.");
      return;
    }

    // TODO: integrar com sua API (loginUser.js)
    console.log("Login ->", { email, senha });
    setErrorMsg("Login enviado (mock). Integre com a API depois.");
  };

  return (
    <IonPage>
      {/* HEADER */}
      <IonHeader translucent>
        <IonToolbar>
          {/* Só a imagem no cabeçalho */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <img
              src="/assets/images/logo-100.png"
              alt="Saber+"
              style={{ height: 32 }}
            />
          </div>

          <IonButtons slot="end">
            <IonButton routerLink="/buscar">
              <IonIcon icon={searchOutline} slot="start" />
              Encontrar professor
            </IonButton>
            <IonButton
              color="secondary"
              onClick={() => setShowCadastroModal(true)}
            >
              <IonIcon icon={personAddOutline} slot="start" />
              Cadastrar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* CONTEÚDO */}
      <IonContent fullscreen className="ion-padding">
        <section
          style={{
            maxWidth: 480,
            margin: "0 auto",
            paddingTop: "1.5rem",
          }}
          aria-labelledby="tituloLogin"
        >
          <IonText>
            <h1
              id="tituloLogin"
              style={{
                fontSize: "1.6rem",
                fontWeight: 700,
                marginBottom: "0.5rem",
              }}
            >
              Entrar no perfil
            </h1>
          </IonText>

          <IonText color="medium">
            <p
              style={{
                fontSize: "0.9rem",
                marginBottom: "1rem",
              }}
            >
              Não possui uma conta?{" "}
              <button
                type="button"
                onClick={() => setShowCadastroModal(true)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--ion-color-primary)",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                Criar cadastro
              </button>
            </p>
          </IonText>

          <form onSubmit={handleSubmit} noValidate>
            {/* E-mail */}
            <IonItem lines="none" style={{ marginBottom: "0.75rem" }}>
              <IonLabel position="stacked">E-mail</IonLabel>
              <IonInput
                type="email"
                inputmode="email"
                placeholder="Seu e-mail"
                required
                value={email}
                onIonInput={(e) =>
                  setEmail(e.detail.value ? e.detail.value : "")
                }
              />
            </IonItem>

            {/* Senha */}
            <IonItem lines="none" style={{ marginBottom: "0.5rem" }}>
              <IonLabel position="stacked">Senha *</IonLabel>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 8,
                  border: "1px solid rgba(148,163,184,0.5)",
                  paddingLeft: 8,
                  width: "100%",
                }}
              >
                <IonInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  required
                  value={senha}
                  onIonInput={(e) =>
                    setSenha(e.detail.value ? e.detail.value : "")
                  }
                  style={{ flex: 1 }}
                />
                <IonButton
                  fill="clear"
                  size="small"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} />
                </IonButton>
              </div>
            </IonItem>

            {/* Mensagem de erro */}
            {errorMsg && (
              <IonText color="danger">
                <p
                  style={{
                    fontSize: "0.85rem",
                    marginTop: "0.25rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  {errorMsg}
                </p>
              </IonText>
            )}

            {/* Botão entrar */}
            <IonButton
              type="submit"
              expand="block"
              style={{ marginTop: "0.5rem" }}
            >
              <IonIcon icon={logInOutline} slot="start" />
              Entrar
            </IonButton>
          </form>
        </section>
      </IonContent>

      {/* FOOTER */}
      <IonFooter>
        <div
          style={{
            padding: "0.5rem 1rem 1rem",
            textAlign: "center",
            fontSize: "0.75rem",
            color: "var(--ion-color-medium)",
          }}
        >
          <p style={{ marginBottom: "0.25rem" }}>
            O conhecimento que você procura, a um clique de distância.
          </p>
          <p>© 2025 Grupo 2. Todos os direitos reservados.</p>
        </div>
      </IonFooter>

      {/* MODAL DE CADASTRO (estudante / instrutor) */}
      <IonModal
        isOpen={showCadastroModal}
        onDidDismiss={() => setShowCadastroModal(false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Cadastro</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowCadastroModal(false)}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonText>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              Escolha como deseja se cadastrar
            </h2>
          </IonText>

          <IonCard
            button
            routerLink="/student/cadastrar"
            onClick={() => setShowCadastroModal(false)}
          >
            <IonCardHeader>
              <IonCardTitle
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <IonIcon icon={schoolOutline} />
                Cadastro para estudante
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Encontre professores, agende aulas e acompanhe sua jornada de
              aprendizado.
            </IonCardContent>
          </IonCard>

          <IonCard
            button
            routerLink="/teachers/cadastrar"
            onClick={() => setShowCadastroModal(false)}
          >
            <IonCardHeader>
              <IonCardTitle
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <IonIcon icon={personOutline} />
                Cadastro para instrutor
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Divulgue suas aulas, receba pedidos de agendamento e cresça com
              novos alunos.
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Login;
