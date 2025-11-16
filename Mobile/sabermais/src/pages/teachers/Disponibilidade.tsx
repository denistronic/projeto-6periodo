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
  IonItem,
  IonLabel,
  IonInput,
  IonChip,
  IonList,
  IonCard,
  IonCardContent,
  IonSelect,
  IonSelectOption,
  IonPopover,
} from "@ionic/react";

import {
  personCircleOutline,
  logOutOutline,
  gridOutline,
  closeCircleOutline,
  trashOutline,
} from "ionicons/icons";

type Area = {
  id: number;
  nome: string;
};

type Horario = {
  id: number;
  day: string; // "0".."6"
  start: string; // "HH:MM"
  end: string; // "HH:MM"
};

const mockAreas: Area[] = [
  { id: 1, nome: "Matemática" },
  { id: 2, nome: "Português" },
  { id: 3, nome: "Ciências" },
  { id: 4, nome: "História" },
  { id: 5, nome: "Geografia" },
  { id: 6, nome: "Física" },
  { id: 7, nome: "Química" },
  { id: 8, nome: "Biologia" },
  { id: 9, nome: "Educação Física" },
  { id: 10, nome: "Artes" },
  { id: 11, nome: "Sociologia" },
  { id: 12, nome: "Filosofia" },
  { id: 13, nome: "Tecnologia da Informação" },
  { id: 14, nome: "Programação" },
  { id: 15, nome: "Administração" },
];

const weekDays = [
  { val: "0", label: "Segunda" },
  { val: "1", label: "Terça" },
  { val: "2", label: "Quarta" },
  { val: "3", label: "Quinta" },
  { val: "4", label: "Sexta" },
  { val: "5", label: "Sábado" },
  { val: "6", label: "Domingo" },
];

// Helpers de horário (adaptados do JS original)
function pad2(n: number) {
  return (n < 10 ? "0" : "") + n;
}

function timeToMinutes(t: string) {
  const [hh, mm] = (t || "0:0").split(":").map((x) => parseInt(x || "0", 10));
  return hh * 60 + mm;
}

function minutesToTime(min: number) {
  const total = ((min % (24 * 60)) + 24 * 60) % (24 * 60);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${pad2(h)}:${pad2(m)}`;
}

function addMinutesToTimeString(timeStr: string, minutesToAdd: number) {
  if (!timeStr) return "";
  const total = timeToMinutes(timeStr) + minutesToAdd;
  return minutesToTime(total);
}

function durationMinutes(start: string, end: string) {
  let s = timeToMinutes(start);
  let e = timeToMinutes(end);
  if (e <= s) e += 24 * 60;
  return e - s;
}

const Disponibilidade: React.FC = () => {
  // Menu usuário
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userMenuEvent, setUserMenuEvent] = useState<MouseEvent | null>(null);

  // Áreas
  const [areaInput, setAreaInput] = useState("");
  const [selectedAreas, setSelectedAreas] = useState<Area[]>([]);
  const [suggestions, setSuggestions] = useState<Area[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Horários
  const [rows, setRows] = useState<Horario[]>([]);
  const [nextId, setNextId] = useState(1);

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

  // ÁREAS: autocomplete
  const handleAreaInputChange = (value: string) => {
    setAreaInput(value);
    const q = value.toLowerCase().trim();
    if (!q) {
      setShowSuggestions(false);
      setSuggestions([]);
      return;
    }
    const filtered = mockAreas.filter((a) =>
      a.nome.toLowerCase().includes(q)
    );
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  };

  const addAreaByName = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const found = mockAreas.find(
      (a) => a.nome.toLowerCase() === trimmed.toLowerCase()
    );
    const newArea: Area =
      found || { id: Date.now(), nome: trimmed };

    if (
      !selectedAreas.some(
        (a) => a.nome.toLowerCase() === newArea.nome.toLowerCase()
      )
    ) {
      setSelectedAreas((prev) => [...prev, newArea]);
    }

    setAreaInput("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleAddAreaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    addAreaByName(areaInput);
  };

  const handleAreaKeyDown = (e: React.KeyboardEvent<HTMLIonInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addAreaByName(areaInput);
    }
  };

  const handleSelectSuggestion = (area: Area) => {
    addAreaByName(area.nome);
  };

  const handleRemoveArea = (area: Area) => {
    setSelectedAreas((prev) => prev.filter((a) => a.id !== area.id));
  };

  // HORÁRIOS
  const createRow = (day = "0", start = "08:00") => {
    const id = nextId;
    setNextId((prev) => prev + 1);

    const row: Horario = {
      id,
      day,
      start,
      end: addMinutesToTimeString(start, 60),
    };

    setRows((prev) => [...prev, row]);
  };

  const updateRow = (
    id: number,
    field: keyof Horario,
    value: string
  ) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, [field]: value } : r
      )
    );
  };

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const clearRows = () => {
    if (window.confirm("Limpar todos os horários?")) {
      setRows([]);
    }
  };

  const summaryText = () => {
    if (!rows.length) return "Nenhum horário cadastrado.";
    let totalMin = 0;
    rows.forEach((r) => {
      if (r.start && r.end) totalMin += durationMinutes(r.start, r.end);
    });
    const totalHoras = Math.floor(totalMin / 60);
    return `Total de aulas: ${rows.length} (${totalHoras}h semanais)`;
  };

  const handleSave = () => {
    const payload = {
      Areas: selectedAreas,
      Disponibilidade: rows.map((r) => ({
        DiaDaSemana: parseInt(r.day, 10),
        HoraInicio: r.start ? `${r.start}:00` : "",
        HoraFim: r.end ? `${r.end}:00` : "",
      })),
    };

    console.log("Payload para enviar à API:", payload);
    alert("Disponibilidade salva! (mock, veja o console)");
  };

  // cria uma linha inicial por padrão
  React.useEffect(() => {
    if (rows.length === 0) {
      createRow("0", "08:00");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              // depois você liga com o router para /teachers/perfil
              alert("Navegação para 'Meu Perfil' ainda será configurada.");
            }}
          >
            <IonIcon icon={personCircleOutline} slot="start" />
            Meu perfil
          </IonItem>
          <IonItem
            button
            onClick={() => {
              setShowUserMenu(false);
              // depois você liga com o router para /teachers/dashboard
              alert("Navegação para dashboard ainda será configurada.");
            }}
          >
            <IonIcon icon={gridOutline} slot="start" />
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
          <IonRow>
            <IonCol size="12">
              <IonText>
                <h1
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    marginBottom: "0.4rem",
                  }}
                >
                  Finalize o seu cadastro
                </h1>
              </IonText>
              <IonText color="medium">
                <p style={{ marginBottom: "1.2rem" }}>
                  Escolha seus horários e compartilhe suas competências
                  para disponibilizar seu perfil como professor.
                </p>
              </IonText>
            </IonCol>
          </IonRow>

          {/* ÁREAS DE ATUAÇÃO */}
          <IonRow>
            <IonCol size="12">
              <IonText>
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  Áreas de atuação
                </h3>
              </IonText>

              <IonItem lines="none">
                <IonLabel position="stacked">Adicionar área</IonLabel>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginTop: 4,
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <IonInput
                    value={areaInput}
                    placeholder="Digite uma área..."
                    onIonInput={(e) =>
                      handleAreaInputChange(e.detail.value ?? "")
                    }
                    onKeyDown={handleAreaKeyDown}
                  />
                  <IonButton
                    size="small"
                    onClick={handleAddAreaClick}
                  >
                    Adicionar
                  </IonButton>
                </div>
              </IonItem>

              {/* Sugestões */}
              {showSuggestions && suggestions.length > 0 && (
                <div
                  style={{
                    marginTop: 4,
                    borderRadius: 8,
                    border: "1px solid rgba(148,163,184,0.5)",
                    padding: 4,
                    background: "var(--ion-color-light, #f9fafb)",
                    maxHeight: 180,
                    overflowY: "auto",
                  }}
                >
                  {suggestions.map((area) => (
                    <div
                      key={area.id}
                      style={{
                        padding: "6px 8px",
                        cursor: "pointer",
                        borderRadius: 6,
                      }}
                      onClick={() => handleSelectSuggestion(area)}
                    >
                      {area.nome}
                    </div>
                  ))}
                </div>
              )}

              {/* Tags selecionadas */}
              {selectedAreas.length > 0 && (
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                  }}
                >
                  {selectedAreas.map((area) => (
                    <IonChip
                      key={area.id}
                      color="primary"
                      outline
                      onClick={() => handleRemoveArea(area)}
                    >
                      {area.nome}
                      <IonIcon
                        icon={closeCircleOutline}
                        style={{ marginLeft: 4 }}
                      />
                    </IonChip>
                  ))}
                </div>
              )}
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <hr
                style={{
                  margin: "24px 0 16px",
                  opacity: 0.25,
                  border: "none",
                  borderBottom: "1px solid currentColor",
                }}
              />
            </IonCol>
          </IonRow>

          {/* DISPONIBILIDADES */}
          <IonRow>
            <IonCol size="12">
              <IonText>
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  Disponibilidades
                </h3>
              </IonText>
              <IonText color="medium">
                <p style={{ marginBottom: 10 }}>
                  Selecione os períodos da semana em que poderá atender
                  seus alunos.
                </p>
              </IonText>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <IonButton
                  size="small"
                  color="primary"
                  onClick={() => createRow()}
                >
                  Adicionar horário
                </IonButton>
                <IonButton
                  size="small"
                  fill="outline"
                  color="medium"
                  onClick={clearRows}
                >
                  Limpar tudo
                </IonButton>
              </div>

              {/* Lista de horários */}
              {rows.map((r) => (
                <IonCard key={r.id} style={{ marginBottom: 8 }}>
                  <IonCardContent>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12" sizeMd="4">
                          <IonItem lines="none">
                            <IonLabel position="stacked">Dia</IonLabel>
                            <IonSelect
                              value={r.day}
                              placeholder="Selecione"
                              onIonChange={(e) =>
                                updateRow(
                                  r.id,
                                  "day",
                                  e.detail.value as string
                                )
                              }
                            >
                              {weekDays.map((d) => (
                                <IonSelectOption
                                  key={d.val}
                                  value={d.val}
                                >
                                  {d.label}
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
                              value={r.start}
                              onIonInput={(e) =>
                                updateRow(
                                  r.id,
                                  "start",
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
                              value={r.end}
                              onIonInput={(e) =>
                                updateRow(
                                  r.id,
                                  "end",
                                  e.detail.value ?? ""
                                )
                              }
                            />
                          </IonItem>
                        </IonCol>
                      </IonRow>

                      <IonRow
                        style={{
                          marginTop: 4,
                          alignItems: "center",
                        }}
                      >
                        <IonCol size="6">
                          <IonText color="medium">
                            <p style={{ fontSize: "0.85rem" }}>
                              {r.start && r.end
                                ? `${durationMinutes(
                                    r.start,
                                    r.end
                                  ) / 60}h no dia`
                                : "Defina início e fim"}
                            </p>
                          </IonText>
                        </IonCol>
                        <IonCol
                          size="6"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <IonButton
                            size="small"
                            fill="clear"
                            color="danger"
                            onClick={() => removeRow(r.id)}
                          >
                            <IonIcon icon={trashOutline} slot="start" />
                            Remover
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              ))}

              {/* Resumo */}
              <IonText color="medium">
                <p
                  style={{
                    fontSize: "0.85rem",
                    marginTop: 8,
                  }}
                >
                  {summaryText()}
                </p>
              </IonText>

              {/* Botão salvar */}
              <div style={{ marginTop: 16, marginBottom: 32 }}>
                <IonButton
                  expand="block"
                  color="secondary"
                  onClick={handleSave}
                >
                  Salvar
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Disponibilidade;

