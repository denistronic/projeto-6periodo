import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonBadge,
} from "@ionic/react";

import {
  createOutline,
  gridOutline,
  logInOutline,
  peopleOutline,
  schoolOutline,
  starOutline,
  calendarOutline,
  timeOutline,
  videocamOutline,
  playOutline,
  ribbonOutline,
  trophyOutline,
  medalOutline,
} from "ionicons/icons";

const Perfil: React.FC = () => {
  // Dados mockados com base no HTML original
  const teacher = {
    nome: "Sávio Sérgio",
    tipo: "Professor",
    membroDesde: "Junho 2023",
    stats: {
      aulas: 45,
      alunos: 8,
      avaliacoes: 45,
    },
    interesses: ["Remoto", "Presencial", "Programação", "Desenvolvimento Web"],
    objetivos: ["Aprender programação web"],
    certificacoes: ["Sistemas de Informação - PUC Minas"],
    atividadeRecente: {
      materia: "Química",
      status: "Pendente",
      professor: "Prof. Ana Costa",
      topico: "Química Orgânica",
      data: "ter., 23 de jan.",
      duracao: "16:00 (90min)",
      tipo: "Online",
    },
    conquistas: [
      {
        titulo: "Primeira Aula",
        descricao: "Completou sua primeira aula",
        icon: medalOutline,
        earned: true,
      },
      // { titulo: "Sequência de 7 dias", descricao: "Estudou por 7 dias seguidos", icon: flameOutline, earned: true },
      {
        titulo: "Professor 5 Estrelas",
        descricao: "Recebeu avaliação 5⭐ de um aluno",
        icon: starOutline,
        earned: true,
      },
      {
        titulo: "Mestre do Conhecimento",
        descricao: "Complete 100 aulas",
        icon: trophyOutline,
        earned: false,
      },
    ],
  };

  const handleEditarPerfil = () => {
    // Por enquanto só um placeholder; depois podemos abrir um modal ou navegar para /teachers/editar-perfil
    alert("Tela de edição de perfil ainda será implementada 🙂");
  };

  const handleEntrar = () => {
    // Pode redirecionar para /login depois
    alert("Fluxo de login/entrar ainda será conectado à autenticação.");
  };

  const handleIrDashboard = () => {
    // Você pode trocar o routerLink pra rota real do dashboard
    alert("Navegação para dashboard do professor ainda será configurada.");
  };

  const handleAbrirAula = () => {
    alert("Ação de entrar na aula ainda será implementada.");
  };

  const handleAvaliar = () => {
    alert("Tela de avaliação ainda será implementada.");
  };

  const handleReagendar = () => {
    alert("Fluxo de reagendamento ainda será implementado.");
  };

  return (
    <IonPage>
      {/* HEADER */}
      <IonHeader translucent>
        <IonToolbar>
          {/* Logo à esquerda */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <img
              src="/assets/images/logo-100.png"
              alt="Logo"
              style={{ height: 32 }}
            />
          </div>

          <IonButtons slot="end">
            <IonButton onClick={handleIrDashboard}>
              <IonIcon icon={gridOutline} slot="start" />
              Dashboard
            </IonButton>
            <IonButton color="primary" onClick={handleEntrar}>
              <IonIcon icon={logInOutline} slot="start" />
              Entrar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* CONTEÚDO */}
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed>
          {/* HEADER DO PERFIL */}
          <IonRow>
            <IonCol size="12">
              <section
                style={{
                  marginBottom: "1.5rem",
                  padding: "1rem",
                  borderRadius: "1rem",
                  background:
                    "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(16,185,129,0.16))",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  <div>
                    <IonText>
                      <h1
                        style={{
                          fontSize: "1.4rem",
                          fontWeight: 700,
                          margin: 0,
                        }}
                      >
                        {teacher.nome}
                      </h1>
                    </IonText>
                    <IonText color="medium">
                      <p
                        style={{
                          margin: "0.25rem 0",
                          fontSize: "0.9rem",
                        }}
                      >
                        {teacher.tipo}
                      </p>
                    </IonText>
                    <IonText color="medium">
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.8rem",
                        }}
                      >
                        Membro desde{" "}
                        <time dateTime="2023-06">{teacher.membroDesde}</time>
                      </p>
                    </IonText>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 12,
                      marginTop: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        minWidth: 80,
                      }}
                    >
                      <IonText>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            letterSpacing: 0.04,
                            color: "var(--ion-color-medium)",
                          }}
                        >
                          Aulas
                        </p>
                        <strong style={{ fontSize: "1.2rem" }}>
                          {teacher.stats.aulas}
                        </strong>
                      </IonText>
                    </div>
                    <div
                      style={{
                        minWidth: 80,
                      }}
                    >
                      <IonText>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            letterSpacing: 0.04,
                            color: "var(--ion-color-medium)",
                          }}
                        >
                          Alunos
                        </p>
                        <strong style={{ fontSize: "1.2rem" }}>
                          {teacher.stats.alunos}
                        </strong>
                      </IonText>
                    </div>
                    <div
                      style={{
                        minWidth: 80,
                      }}
                    >
                      <IonText>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            letterSpacing: 0.04,
                            color: "var(--ion-color-medium)",
                          }}
                        >
                          Avaliações
                        </p>
                        <strong style={{ fontSize: "1.2rem" }}>
                          {teacher.stats.avaliacoes}
                        </strong>
                      </IonText>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "0.75rem",
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    <IonButton
                      size="small"
                      color="light"
                      fill="outline"
                      onClick={handleEditarPerfil}
                    >
                      <IonIcon icon={createOutline} slot="start" />
                      Editar perfil
                    </IonButton>
                  </div>
                </div>
              </section>
            </IonCol>
          </IonRow>

          {/* COLUNAS (ESQUERDA / DIREITA) – em mobile empilha, em tablet divide */}
          <IonRow
            style={{
              gap: "1rem",
            }}
          >
            {/* Coluna Esquerda */}
            <IonCol size="12" sizeMd="6">
              {/* Interesses Acadêmicos */}
              <IonCard>
                <IonCardHeader
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <IonCardTitle style={{ fontSize: "1rem" }}>
                    Interesses acadêmicos
                  </IonCardTitle>
                  {/* botão editar de seção pode ser implementado depois */}
                </IonCardHeader>
                <IonCardContent>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    {teacher.interesses.map((i) => (
                      <IonChip key={i} outline color="primary">
                        {i}
                      </IonChip>
                    ))}
                  </div>
                </IonCardContent>
              </IonCard>

              {/* Objetivos de Ensino */}
              <IonCard>
                <IonCardHeader
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <IonCardTitle style={{ fontSize: "1rem" }}>
                    Objetivos de ensino
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <ul
                    style={{
                      paddingLeft: "1.1rem",
                      margin: 0,
                    }}
                  >
                    {teacher.objetivos.map((g) => (
                      <li key={g} style={{ fontSize: "0.9rem", marginBottom: 6 }}>
                        {g}
                      </li>
                    ))}
                  </ul>
                </IonCardContent>
              </IonCard>

              {/* Certificações */}
              <IonCard>
                <IonCardHeader
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <IonCardTitle style={{ fontSize: "1rem" }}>
                    Certificações
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <ul
                    style={{
                      paddingLeft: "1.1rem",
                      margin: 0,
                    }}
                  >
                    {teacher.certificacoes.map((c) => (
                      <li key={c} style={{ fontSize: "0.9rem", marginBottom: 4 }}>
                        {c}
                      </li>
                    ))}
                  </ul>
                </IonCardContent>
              </IonCard>

              {/* Atividade Recente */}
              <IonCard>
                <IonCardHeader
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <IonCardTitle style={{ fontSize: "1rem" }}>
                    Atividade recente
                  </IonCardTitle>
                  <IonButton
                    size="small"
                    fill="clear"
                    onClick={handleIrDashboard}
                  >
                    Ver todas
                  </IonButton>
                </IonCardHeader>
                <IonCardContent>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 12,
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Avatar simples com inicial A */}
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "999px",
                        background: "var(--ion-color-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    >
                      A
                    </div>

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 4,
                        }}
                      >
                        <IonText>
                          <h3
                            style={{
                              fontSize: "0.95rem",
                              margin: 0,
                            }}
                          >
                            {teacher.atividadeRecente.materia}
                          </h3>
                        </IonText>
                        <IonBadge color="warning">Pendente</IonBadge>
                      </div>

                      <IonText color="medium">
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.85rem",
                          }}
                        >
                          {teacher.atividadeRecente.professor}
                        </p>
                        <p
                          style={{
                            margin: "0.15rem 0",
                            fontSize: "0.85rem",
                          }}
                        >
                          {teacher.atividadeRecente.topico}
                        </p>
                      </IonText>

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 8,
                          marginTop: 4,
                          fontSize: "0.8rem",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <IonIcon icon={calendarOutline} />
                          {teacher.atividadeRecente.data}
                        </span>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <IonIcon icon={timeOutline} />
                          {teacher.atividadeRecente.duracao}
                        </span>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <IonIcon icon={videocamOutline} />
                          {teacher.atividadeRecente.tipo}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          marginTop: 10,
                        }}
                      >
                        <IonButton
                          size="small"
                          fill="outline"
                          onClick={handleReagendar}
                        >
                          <IonIcon icon={createOutline} slot="start" />
                          Reagendar
                        </IonButton>
                        <IonButton
                          size="small"
                          onClick={handleAbrirAula}
                          color="primary"
                        >
                          <IonIcon icon={playOutline} slot="start" />
                          Entrar
                        </IonButton>
                        <IonButton
                          size="small"
                          fill="clear"
                          color="warning"
                          onClick={handleAvaliar}
                        >
                          <IonIcon icon={starOutline} slot="start" />
                          Avaliar
                        </IonButton>
                      </div>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Coluna Direita */}
            <IonCol size="12" sizeMd="5">
              {/* Conquistas */}
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle style={{ fontSize: "1rem" }}>
                    Conquistas
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <ul
                    style={{
                      padding: 0,
                      margin: 0,
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {teacher.conquistas.map((c) => (
                      <li
                        key={c.titulo}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          opacity: c.earned ? 1 : 0.6,
                        }}
                      >
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 999,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: c.earned
                              ? "rgba(34,197,94,0.15)"
                              : "rgba(148,163,184,0.2)",
                          }}
                        >
                          <IonIcon
                            icon={c.icon || ribbonOutline}
                            color={c.earned ? "success" : "medium"}
                          />
                        </div>
                        <div>
                          <IonText>
                            <h3
                              style={{
                                margin: 0,
                                fontSize: "0.95rem",
                              }}
                            >
                              {c.titulo}
                            </h3>
                          </IonText>
                          <IonText color="medium">
                            <p
                              style={{
                                margin: "0.15rem 0 0",
                                fontSize: "0.85rem",
                              }}
                            >
                              {c.descricao}
                            </p>
                          </IonText>
                        </div>
                      </li>
                    ))}
                  </ul>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;

