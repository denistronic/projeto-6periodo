import React, { useEffect, useState } from "react";
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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonPopover,
} from "@ionic/react";

import {
  personCircleOutline,
  logOutOutline,
  calendarOutline,
  schoolOutline,
  peopleOutline,
  timeOutline,
  starHalfOutline,
} from "ionicons/icons";

type Stats = {
  aulasAgendadas: number;
  aulasConcluidas: number;
  totalAlunos: number;
  horasAula: number;
};

type Aula = {
  id: number;
  materia: string;
  aluno: string;
  data: string;
  horario: string;
  tipo: "Online" | "Presencial";
  status: "Pendente" | "Confirmada" | "Concluída";
};

type Atividade = {
  id: number;
  descricao: string;
  data: string;
};

const Cadastrar: React.FC = () => {
  const [userName, setUserName] = useState<string>("Professor(a)");
  const [stats, setStats] = useState<Stats>({
    aulasAgendadas: 0,
    aulasConcluidas: 0,
    totalAlunos: 0,
    horasAula: 0,
  });

  const [proximasAulas, setProximasAulas] = useState<Aula[]>([]);
  const [atividades, setAtividades] = useState<Atividade[]>([]);

  // menu usuário
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userMenuEvent, setUserMenuEvent] = useState<MouseEvent | null>(null);

  const toggleUserMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenuEvent(e.nativeEvent);
    setShowUserMenu((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    alert("Desconectando...");
    setTimeout(() => {
      window.location.href = "/login";
    }, 800);
  };

  // Mock inicial (no lugar do dashboard.js por enquanto)
  useEffect(() => {
    // Nome do usuário (pode puxar de localStorage depois)
    const storedName =
      localStorage.getItem("userName") || "Sávio Sérgio";
    setUserName(storedName);

    // Stats de exemplo
    setStats({
      aulasAgendadas: 3,
      aulasConcluidas: 18,
      totalAlunos: 8,
      horasAula: 45,
    });

    // Próximas aulas mock
    setProximasAulas([
      {
        id: 1,
        materia: "Programação Web",
        aluno: "Ana Costa",
        data: "Terça, 23 jan",
        horario: "16:00 (90min)",
        tipo: "Online",
        status: "Pendente",
      },
      {
        id: 2,
        materia: "Lógica de Programação",
        aluno: "Lucas Almeida",
        data: "Quarta, 24 jan",
        horario: "19:30 (60min)",
        tipo: "Online",
        status: "Confirmada",
      },
    ]);

    // Atividade recente mock
    setAtividades([
      {
        id: 1,
        descricao: "Concluiu aula com a aluna Ana sobre Introdução a HTML.",
        data: "Ontem",
      },
      {
        id: 2,
        descricao: "Novo aluno inscrito na disciplina de Programação Web.",
        data: "Há 2 dias",
      },
    ]);
  }, []);

  const statusColor = (status: Aula["status"]) => {
    switch (status) {
      case "Pendente":
        return "warning";
      case "Confirmada":
        return "primary";
      case "Concluída":
        return "success";
      default:
        return "medium";
    }
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
            <img
              src="/assets/images/logo-100.png"
              alt="Logo"
              style={{ height: 32 }}
            />
          </div>

          <IonButtons slot="end">
            <IonButton
              onClick={toggleUserMenu}
              color="primary"
              shape="round"
              style={{
                borderRadius: "999px",
                paddingInline: "0.75rem",
                minWidth: "2.2rem",
              }}
            >
              <IonIcon icon={personCircleOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* MENU DO USUÁRIO */}
      <IonPopover
        isOpen={showUserMenu}
        event={userMenuEvent as any}
        onDidDismiss={() => setShowUserMenu(false)}
      >
        <IonList>
          <IonItem
            button
            onClick={() => {
              setShowUserMenu(false);
              alert("Navegação para 'Editar Dados' ainda será configurada.");
            }}
          >
            <IonIcon icon={personCircleOutline} slot="start" />
            Editar Dados
          </IonItem>
          <IonItem
            button
            onClick={() => {
              setShowUserMenu(false);
              alert("Navegação para 'Dashboard' ainda será configurada.");
            }}
          >
            <IonIcon icon={schoolOutline} slot="start" />
            Dashboard
          </IonItem>
          <IonItem
            button
            onClick={() => {
              setShowUserMenu(false);
              handleLogout();
            }}
          >
            <IonIcon icon={logOutOutline} slot="start" />
            Sair
          </IonItem>
        </IonList>
      </IonPopover>

      {/* CONTEÚDO */}
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed>
          {/* Boas-vindas */}
          <IonRow>
            <IonCol size="12">
              <IonText>
                <h1
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  Olá, <span>{userName}</span>! 👋
                </h1>
              </IonText>
              <IonText color="medium">
                <p style={{ marginBottom: 16 }}>
                  Bem-vindo(a) ao seu painel de controle.
                </p>
              </IonText>
            </IonCol>
          </IonRow>

          {/* CARDS DE STATS */}
          <IonRow>
            <IonCol size="6" sizeMd="3">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle
                    style={{
                      fontSize: "1.4rem",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <IonIcon icon={calendarOutline} />
                    {stats.aulasAgendadas}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent
                  style={{ fontSize: "0.85rem", color: "var(--ion-color-medium)" }}
                >
                  Aulas agendadas
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6" sizeMd="3">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle
                    style={{
                      fontSize: "1.4rem",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <IonIcon icon={schoolOutline} />
                    {stats.aulasConcluidas}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent
                  style={{ fontSize: "0.85rem", color: "var(--ion-color-medium)" }}
                >
                  Aulas concluídas
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6" sizeMd="3">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle
                    style={{
                      fontSize: "1.4rem",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <IonIcon icon={peopleOutline} />
                    {stats.totalAlunos}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent
                  style={{ fontSize: "0.85rem", color: "var(--ion-color-medium)" }}
                >
                  Alunos atendidos
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6" sizeMd="3">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle
                    style={{
                      fontSize: "1.4rem",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <IonIcon icon={timeOutline} />
                    {stats.horasAula}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent
                  style={{ fontSize: "0.85rem", color: "var(--ion-color-medium)" }}
                >
                  Horas de aula
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* INFO DO PROFESSOR (placeholder) */}
          <IonRow>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle style={{ fontSize: "1rem" }}>
                    Informações do professor
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent style={{ fontSize: "0.9rem" }}>
                  Aqui você pode depois renderizar os dados detalhados do
                  professor usando a resposta da sua API (substituindo o
                  antigo <code>info-professor</code>).
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* COLUNAS: Próximas aulas / Atividade recente */}
          <IonRow>
            {/* Próximas aulas */}
            <IonCol size="12" sizeMd="7">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle style={{ fontSize: "1rem" }}>
                    Próximas aulas
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {proximasAulas.length === 0 ? (
                    <IonText color="medium">
                      <p style={{ fontSize: "0.9rem" }}>
                        Nenhuma aula agendada no momento.
                      </p>
                    </IonText>
                  ) : (
                    <IonList>
                      {proximasAulas.map((aula) => (
                        <IonItem key={aula.id} lines="full">
                          <IonLabel>
                            <h2 style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              {aula.materia}
                              <IonBadge
                                color={statusColor(aula.status)}
                                style={{ textTransform: "none" }}
                              >
                                {aula.status}
                              </IonBadge>
                            </h2>
                            <p>Aluno: {aula.aluno}</p>
                            <p>
                              <IonIcon icon={calendarOutline} /> {aula.data} ·{" "}
                              <IonIcon icon={timeOutline} /> {aula.horario} ·{" "}
                              {aula.tipo}
                            </p>
                          </IonLabel>
                          <IonButton
                            size="small"
                            fill="outline"
                            slot="end"
                            onClick={() =>
                              alert(
                                "Ação de re-agendar ainda será implementada."
                              )
                            }
                          >
                            Reagendar
                          </IonButton>
                          <IonButton
                            size="small"
                            color="primary"
                            slot="end"
                            onClick={() =>
                              alert("Ação de entrar na aula ainda será implementada.")
                            }
                          >
                            Iniciar
                          </IonButton>
                          <IonButton
                            size="small"
                            fill="clear"
                            color="warning"
                            slot="end"
                            onClick={() =>
                              alert("Modal de avaliação ainda será implementado.")
                            }
                          >
                            <IonIcon icon={starHalfOutline} slot="start" />
                            Avaliar
                          </IonButton>
                        </IonItem>
                      ))}
                    </IonList>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Atividade recente */}
            <IonCol size="12" sizeMd="5">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle style={{ fontSize: "1rem" }}>
                    Atividade recente
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {atividades.length === 0 ? (
                    <IonText color="medium">
                      <p style={{ fontSize: "0.9rem" }}>
                        Nenhuma atividade recente registrada.
                      </p>
                    </IonText>
                  ) : (
                    <IonList>
                      {atividades.map((atv) => (
                        <IonItem key={atv.id} lines="none">
                          <IonLabel>
                            <p
                              style={{
                                fontSize: "0.9rem",
                                marginBottom: 2,
                              }}
                            >
                              {atv.descricao}
                            </p>
                            <IonText color="medium">
                              <small>{atv.data}</small>
                            </IonText>
                          </IonLabel>
                        </IonItem>
                      ))}
                    </IonList>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* Footer bem discreto, sem texto saturando */}
          <IonRow>
            <IonCol size="12">
              <IonText color="medium">
                <p
                  style={{
                    fontSize: "0.75rem",
                    textAlign: "center",
                    marginTop: 8,
                    opacity: 0.6,
                  }}
                >
                  Área do professor · versão mobile
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

