import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonText,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonPopover,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import {
  personCircleOutline,
  logOutOutline,
  createOutline,
  gridOutline,
  eyeOutline,
  eyeOffOutline,
} from "ionicons/icons";

type Disponibilidade = {
  id: number;
  dia: number | "";
  inicio: string;
  fim: string;
};

const diasSemana = [
  { value: 0, label: "Segunda" },
  { value: 1, label: "Terça" },
  { value: 2, label: "Quarta" },
  { value: 3, label: "Quinta" },
  { value: 4, label: "Sexta" },
  { value: 5, label: "Sábado" },
  { value: 6, label: "Domingo" },
];

const EditarPerfil: React.FC = () => {
  // Estados básicos do formulário
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cpf] = useState<string>("000.000.000-00"); // mock – depois você pode preencher via API
  const [tipo] = useState<string>("Professor"); // mock
  const [descricao, setDescricao] = useState<string>("");
  const [certificacoes, setCertificacoes] = useState<string>("");
  const [competencias, setCompetencias] = useState<string>("");
  const [valorHora, setValorHora] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Áreas de atuação
  const [areaInput, setAreaInput] = useState<string>("");
  const [areas, setAreas] = useState<string[]>([]);

  // Disponibilidades
  const [disponibilidades, setDisponibilidades] = useState<Disponibilidade[]>(
    []
  );

  // Menu do usuário (avatar A)
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
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

  const handleAddArea = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const value = areaInput.trim();
    if (!value) return;
    if (!areas.includes(value)) {
      setAreas((prev) => [...prev, value]);
    }
    setAreaInput("");
  };

  const handleRemoveArea = (value: string) => {
    setAreas((prev) => prev.filter((a) => a !== value));
  };

  const handleAddDisponibilidade = () => {
    setDisponibilidades((prev) => [
      ...prev,
      {
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        dia: "",
        inicio: "",
        fim: "",
      },
    ]);
  };

  const handleClearDisponibilidades = () => {
    setDisponibilidades([]);
  };

  const updateDisponibilidade = (
    id: number,
    field: keyof Disponibilidade,
    value: string | number | ""
  ) => {
    setDisponibilidades((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const removeDisponibilidade = (id: number) => {
    setDisponibilidades((prev) => prev.filter((d) => d.id !== id));
  };

  const resumoDisponibilidades = () => {
    if (!disponibilidades.length) return "Nenhum horário cadastrado.";
    const qtdCheios = disponibilidades.filter(
      (d) => d.dia !== "" && d.inicio && d.fim
    ).length;
    if (!qtdCheios) return `${disponibilidades.length} linha(s) em edição.`;
    return `${qtdCheios} horário(s) configurado(s).`;
  };

  const handleSalvar = () => {
    if (!senha) {
      alert("Informe sua senha para salvar os dados.");
      return;
    }

    const payload = {
      nome,
      email,
      cpf,
      tipo,
      descricao,
      certificacoes: certificacoes
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      competencias: competencias
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      valorHora: valorHora ? Number(valorHora) : null,
      senha,
      areas,
      disponibilidades,
    };

    console.log("Payload para salvar (mock):", payload);
    alert("Dados salvos (mock). Depois você integra com a API editUserService.js.");
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

      {/* POPOVER MENU DO USUÁRIO */}
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
              // já está na tela de editar dados
            }}
          >
            <IonIcon icon={createOutline} slot="start" />
            <IonText>Editar dados</IonText>
          </IonItem>
          <IonItem
            button
            onClick={() => {
              setShowUserMenu(false);
              // depois você pode mudar para /teachers/dashboard
              alert("Navegação para dashboard ainda será configurada.");
            }}
          >
            <IonIcon icon={gridOutline} slot="start" />
            <IonText>Dashboard</IonText>
          </IonItem>
          <IonItem
            button
            onClick={() => {
              setShowUserMenu(false);
              handleLogout();
            }}
          >
            <IonIcon icon={logOutOutline} slot="start" />
            <IonText>Sair</IonText>
          </IonItem>
        </IonList>
      </IonPopover>

      {/* CONTEÚDO */}
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed>
          <IonRow>
            <IonCol size="12">
              <IonText>
                <h2
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    marginBottom: "1rem",
                  }}
                >
                  Editar dados do professor
                </h2>
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              {/* Nome */}
              <IonItem lines="none" style={{ marginBottom: "0.75rem" }}>
                <IonLabel position="stacked">Nome</IonLabel>
                <IonInput
                  value={nome}
                  placeholder="Seu nome completo"
                  onIonInput={(e) => setNome(e.detail.value ?? "")}
                />
              </IonItem>

              {/* Email */}
              <IonItem lines="none" style={{ marginBottom: "0.75rem" }}>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  type="email"
                  inputMode="email"
                  value={email}
                  placeholder="Seu e-mail"
                  onIonInput={(e) => setEmail(e.detail.value ?? "")}
                />
              </IonItem>

              {/* CPF (desabilitado) */}
              <IonItem lines="none" style={{ marginBottom: "0.75rem" }}>
                <IonLabel position="stacked">CPF</IonLabel>
                <IonInput value={cpf} disabled />
              </IonItem>

              {/* Tipo (desabilitado) */}
              <IonItem lines="none" style={{ marginBottom: "0.75rem" }}>
                <IonLabel position="stacked">Tipo</IonLabel>
                <IonInput value={tipo} disabled />
              </IonItem>

              {/* Descrição */}
              <IonItem lines="none" style={{ marginBottom: "0.75rem" }}>
                <IonLabel position="stacked">Descrição</IonLabel>
                <IonTextarea
                  autoGrow
                  value={descricao}
                  placeholder="Fale um pouco sobre você, sua experiência, áreas de atuação..."
                  onIonInput={(e) => setDescricao(e.detail.value ?? "")}
                />
              </IonItem>

              {/* Certificações */}
              <IonItem lines="none" style={{ marginBottom: "0.5rem" }}>
                <IonLabel position="stacked">
                  Certificações{" "}
                  <span style={{ fontSize: "0.8rem", color: "var(--ion-color-medium)" }}>
                    (Separe por vírgula)*
                  </span>
                </IonLabel>
                <IonTextarea
                  autoGrow
                  value={certificacoes}
                  placeholder="Ex.: Sistemas de Informação - PUC Minas, Pós em Docência..."
                  onIonInput={(e) => setCertificacoes(e.detail.value ?? "")}
                />
              </IonItem>

              {/* Competências */}
              <IonItem lines="none" style={{ marginBottom: "0.5rem" }}>
                <IonLabel position="stacked">
                  Competências{" "}
                  <span style={{ fontSize: "0.8rem", color: "var(--ion-color-medium)" }}>
                    (Separe por vírgula)*
                  </span>
                </IonLabel>
                <IonTextarea
                  autoGrow
                  value={competencias}
                  placeholder="Ex.: JavaScript, React, Banco de Dados..."
                  onIonInput={(e) => setCompetencias(e.detail.value ?? "")}
                />
              </IonItem>

              {/* Valor Hora */}
              <IonItem lines="none" style={{ marginBottom: "0.75rem" }}>
                <IonLabel position="stacked">Valor hora (R$)</IonLabel>
                <IonInput
                  type="number"
                  inputMode="decimal"
                  value={valorHora}
                  placeholder="Ex.: 99.90"
                  onIonInput={(e) => setValorHora(e.detail.value ?? "")}
                />
              </IonItem>

              {/* Senha */}
              <IonItem lines="none" style={{ marginBottom: "0.75rem" }}>
                <IonLabel position="stacked">
                  Senha{" "}
                  <span style={{ fontSize: "0.8rem", color: "var(--ion-color-medium)" }}>
                    (Informe sua senha para salvar os dados)*
                  </span>
                </IonLabel>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 8,
                    border: "1px solid rgba(148,163,184,0.6)",
                    paddingLeft: 8,
                    width: "100%",
                  }}
                >
                  <IonInput
                    type={showPassword ? "text" : "password"}
                    value={senha}
                    placeholder="Sua senha"
                    onIonInput={(e) => setSenha(e.detail.value ?? "")}
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

              {/* Áreas de Atuação */}
              <IonItem lines="none">
                <IonLabel position="stacked">Áreas de atuação</IonLabel>
                <form
                  onSubmit={handleAddArea}
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginTop: 4,
                    width: "100%",
                  }}
                >
                  <IonInput
                    value={areaInput}
                    placeholder="Digite uma área..."
                    onIonInput={(e) => setAreaInput(e.detail.value ?? "")}
                  />
                  <IonButton type="submit" size="small">
                    Adicionar
                  </IonButton>
                </form>
              </IonItem>

              {/* Lista de tags de áreas */}
              {areas.length > 0 && (
                <div
                  style={{
                    marginTop: 8,
                    marginBottom: 12,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                  }}
                >
                  {areas.map((area) => (
                    <IonChip
                      key={area}
                      onClick={() => handleRemoveArea(area)}
                      color="primary"
                      outline
                    >
                      {area}
                    </IonChip>
                  ))}
                </div>
              )}

              {/* Disponibilidades */}
              <section style={{ marginTop: 24 }}>
                <IonText>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    Disponibilidades
                  </h3>
                </IonText>

                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <IonButton
                    size="small"
                    onClick={handleAddDisponibilidade}
                    color="primary"
                  >
                    Adicionar horário
                  </IonButton>
                  <IonButton
                    size="small"
                    fill="outline"
                    color="medium"
                    onClick={handleClearDisponibilidades}
                  >
                    Limpar tudo
                  </IonButton>
                </div>

                {disponibilidades.map((d) => (
                  <IonCard key={d.id} style={{ marginBottom: 8 }}>
                    <IonCardContent>
                      <IonGrid>
                        <IonRow>
                          <IonCol size="12" sizeMd="4">
                            <IonItem lines="none">
                              <IonLabel position="stacked">Dia</IonLabel>
                              <IonSelect
                                value={d.dia}
                                placeholder="Selecione"
                                onIonChange={(e) =>
                                  updateDisponibilidade(
                                    d.id,
                                    "dia",
                                    e.detail.value
                                  )
                                }
                              >
                                {diasSemana.map((dia) => (
                                  <IonSelectOption
                                    key={dia.value}
                                    value={dia.value}
                                  >
                                    {dia.label}
                                  </IonSelectOption>
                                ))}
                              </IonSelect>
                            </IonItem>
                          </IonCol>
                          <IonCol size="6" sizeMd="4">
                            <IonItem lines="none">
                              <IonLabel position="stacked">Início</IonLabel>
                              <IonInput
                                type="time"
                                value={d.inicio}
                                onIonInput={(e) =>
                                  updateDisponibilidade(
                                    d.id,
                                    "inicio",
                                    e.detail.value ?? ""
                                  )
                                }
                              />
                            </IonItem>
                          </IonCol>
                          <IonCol size="6" sizeMd="4">
                            <IonItem lines="none">
                              <IonLabel position="stacked">Fim</IonLabel>
                              <IonInput
                                type="time"
                                value={d.fim}
                                onIonInput={(e) =>
                                  updateDisponibilidade(
                                    d.id,
                                    "fim",
                                    e.detail.value ?? ""
                                  )
                                }
                              />
                            </IonItem>
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol size="12">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: 8,
                              }}
                            >
                              <IonButton
                                size="small"
                                fill="clear"
                                color="danger"
                                onClick={() => removeDisponibilidade(d.id)}
                              >
                                Remover
                              </IonButton>
                            </div>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                ))}

                <IonText color="medium">
                  <p
                    style={{
                      fontSize: "0.85rem",
                      marginTop: 4,
                    }}
                  >
                    {resumoDisponibilidades()}
                  </p>
                </IonText>
              </section>

              {/* Botão salvar */}
              <div
                style={{
                  marginTop: 24,
                  marginBottom: 24,
                }}
              >
                <IonButton expand="block" color="secondary" onClick={handleSalvar}>
                  Salvar
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
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
    </IonPage>
  );
};

export default EditarPerfil;

