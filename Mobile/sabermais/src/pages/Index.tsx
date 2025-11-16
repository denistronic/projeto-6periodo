import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonModal,
} from "@ionic/react";

import {
  searchOutline,
  personAddOutline,
  codeSlash,
  languageOutline,
  calculatorOutline,
  bookOutline,
  footballOutline,
  flaskOutline,
  closeOutline,
  logInOutline,
} from "ionicons/icons";

const Index: React.FC = () => {
  const [showCadastroModal, setShowCadastroModal] = useState(false);

  const categorias = [
    { icon: codeSlash, titulo: "Programação", descricao: "450+ professores" },
    { icon: languageOutline, titulo: "Idiomas", descricao: "320+ professores" },
    { icon: calculatorOutline, titulo: "Matemática", descricao: "210+ professores" },
    { icon: bookOutline, titulo: "Português", descricao: "190+ professores" },
    { icon: footballOutline, titulo: "Esportes", descricao: "150+ professores" },
    { icon: flaskOutline, titulo: "Ciências", descricao: "275+ professores" },
  ];

  const passos = [
    {
      numero: "1",
      titulo: "Busque e descubra",
      texto:
        "Use os filtros para encontrar especialistas na área que você deseja, por preço, modalidade e avaliações.",
    },
    {
      numero: "2",
      titulo: "Agende com facilidade",
      texto:
        "Veja horários disponíveis e envie uma solicitação de aula em poucos toques, com comunicação segura.",
    },
    {
      numero: "3",
      titulo: "Aprenda e evolua",
      texto:
        "Realize sua aula, avalie a experiência e continue avançando na sua jornada de conhecimento.",
    },
  ];

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
            <img
              src="/assets/images/logo-100.png"
              alt="Saber+"
              style={{ height: 32 }}
            />
            {/* Título removido: só o logo fica visível */}
            {/* <IonTitle
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
              }}
            >
              Saber+
            </IonTitle> */}
          </div>

          <IonButtons slot="end">
            <IonButton routerLink="/login">
              <IonIcon icon={logInOutline} slot="start" />
              Entrar
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
        {/* Hero */}
        <section
          style={{
            textAlign: "center",
            paddingTop: "1.5rem",
            paddingBottom: "2rem",
          }}
        >
          <IonText>
            <h1
              style={{
                fontSize: "1.8rem",
                fontWeight: 800,
                marginBottom: "0.75rem",
              }}
            >
              Encontre o professor perfeito
            </h1>
          </IonText>

          <IonText color="medium">
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.5,
                maxWidth: 600,
                margin: "0 auto 1.8rem",
              }}
            >
              Explore especialistas em diversas áreas, com aulas personalizadas
              para você alcançar seus objetivos, de um jeito simples, rápido e
              seguro.
            </p>
          </IonText>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              alignItems: "center",
            }}
          >
            <IonButton
              expand="block"
              size="large"
              style={{ maxWidth: 260 }}
              routerLink="/buscar"
            >
              <IonIcon icon={searchOutline} slot="start" />
              Encontrar professor
            </IonButton>

            <IonButton
              expand="block"
              fill="outline"
              size="large"
              style={{ maxWidth: 260 }}
              routerLink="/teachers/cadastrar"
            >
              Quero ser professor
            </IonButton>
          </div>
        </section>

        {/* Categorias populares */}
        <section style={{ marginBottom: "2rem" }}>
          <IonText>
            <h2
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "0.25rem",
              }}
            >
              Categorias populares
            </h2>
          </IonText>
          <IonText color="medium">
            <p
              style={{
                fontSize: "0.9rem",
                textAlign: "center",
                maxWidth: 600,
                margin: "0 auto 1.25rem",
              }}
            >
              Do reforço escolar ao seu próximo hobby, encontre a área que mais
              combina com você.
            </p>
          </IonText>

          <IonList lines="none">
            {categorias.map((cat) => (
              <IonItem
                key={cat.titulo}
                button
                detail
                style={{
                  borderRadius: 12,
                  marginBottom: 8,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                }}
              >
                <IonIcon
                  icon={cat.icon}
                  slot="start"
                  style={{ fontSize: "1.4rem" }}
                />
                <IonLabel>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    {cat.titulo}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                    }}
                  >
                    {cat.descricao}
                  </p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>

          <div style={{ textAlign: "center", marginTop: "0.75rem" }}>
            <IonButton size="small" fill="outline" routerLink="/buscar">
              🔍 Buscar outras categorias
            </IonButton>
          </div>
        </section>

        {/* Como funciona */}
        <section style={{ marginBottom: "2rem" }}>
          <IonText>
            <h2
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "0.25rem",
              }}
            >
              Como funciona?
            </h2>
          </IonText>
          <IonText color="medium">
            <p
              style={{
                fontSize: "0.9rem",
                textAlign: "center",
                maxWidth: 600,
                margin: "0 auto 1.25rem",
              }}
            >
              Em três passos simples você encontra e agenda a aula ideal.
            </p>
          </IonText>

          {passos.map((p) => (
            <IonCard key={p.numero} style={{ marginBottom: "0.75rem" }}>
              <IonCardHeader>
                <IonCardSubtitle
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.85rem",
                  }}
                >
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "var(--ion-color-primary, #3880ff)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}
                  >
                    {p.numero}
                  </span>
                  Passo {p.numero}
                </IonCardSubtitle>
                <IonCardTitle
                  style={{
                    fontSize: "1rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {p.titulo}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                }}
              >
                {p.texto}
              </IonCardContent>
            </IonCard>
          ))}
        </section>

        {/* Chamada final */}
        <section
          style={{
            marginBottom: "2.5rem",
            padding: "1.5rem",
            borderRadius: 16,
            background: "linear-gradient(145deg, #3b82f6, #2563eb)",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <IonText>
            <h2
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                marginBottom: "0.5rem",
              }}
            >
              Pronto para começar sua jornada de aprendizado?
            </h2>
          </IonText>
          <IonText>
            <p
              style={{
                fontSize: "0.9rem",
                marginBottom: "1.25rem",
              }}
            >
              Junte-se a milhares de alunos que já transformaram suas vidas
              através da educação.
            </p>
          </IonText>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              alignItems: "center",
            }}
          >
            <IonButton expand="block" style={{ maxWidth: 240 }} routerLink="/login">
              Começar agora
            </IonButton>
            <IonButton
              expand="block"
              fill="outline"
              color="light"
              style={{ maxWidth: 240 }}
              routerLink="/buscar"
            >
              Ver professores
            </IonButton>
          </div>
        </section>

        {/* Footer simples */}
        <footer
          style={{
            fontSize: "0.75rem",
            color: "var(--ion-color-medium)",
            textAlign: "center",
            paddingBottom: "1.25rem",
          }}
        >
          <p>© 2025 Grupo 2. Todos os direitos reservados.</p>
        </footer>

        {/* MODAL de cadastro simples */}
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
              <p
                style={{
                  fontSize: "0.9rem",
                  marginBottom: "1.25rem",
                }}
              >
                Escolha como você quer entrar na plataforma:
              </p>
            </IonText>

            <IonCard
              button
              routerLink="/student/cadastrar"
              onClick={() => setShowCadastroModal(false)}
            >
              <IonCardHeader>
                <IonCardTitle>Cadastro para estudante</IonCardTitle>
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
                <IonCardTitle>Cadastro para instrutor</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Divulgue suas aulas, receba pedidos de agendamento e cresça com
                novos alunos.
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Index;
