import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
  IonChip,
  IonModal,
  IonRange,
  IonFooter,
  IonSpinner,
} from "@ionic/react";

import {
  searchOutline,
  funnelOutline,
  personOutline,
  pricetagOutline,
  starOutline,
  calendarOutline,
  closeOutline,
} from "ionicons/icons";

interface Teacher {
  id: number;
  nome: string;
  descricao?: string;
  certificacoes?: string[];
  competencias?: string[];
  valorHora?: number;
  areas?: { areaId?: number; area?: string }[];
  disponibilidades?: number[]; // 0 = segunda, ...
  avaliacao?: number;
}

const MOCK_DATA: Teacher[] = [
  {
    descricao: "Professora de programação.",
    certificacoes: ["Bacharelado em Sistemas de Informação"],
    competencias: ["TypeScript", "Node.js"],
    valorHora: 99.9,
    areas: [{ areaId: 1 }, { areaId: 4 }],
    disponibilidades: [0, 2, 4],
    avaliacao: 4.8,
    id: 21,
    nome: "Ana Beatriz Faria",
    email: "ana@gmail.com",
  } as any,
  {
    descricao:
      "Engenheiro de software com foco em back-end e banco de dados.",
    certificacoes: ["Mestrado em Engenharia de Software"],
    competencias: ["Java", "Spring Boot", "MySQL"],
    valorHora: 120.0,
    areas: [{ areaId: 1 }, { areaId: 3 }],
    disponibilidades: [1, 3, 5],
    avaliacao: 4.6,
    id: 22,
    nome: "Lucas Andrade",
    email: "lucas.andrade@gmail.com",
  } as any,
  {
    descricao:
      "Desenvolvedora front-end apaixonada por interfaces acessíveis e responsivas.",
    certificacoes: [
      "Tecnólogo em Desenvolvimento Web",
      "Certificação em UX Design",
    ],
    competencias: ["HTML", "CSS", "JavaScript", "React"],
    valorHora: 85.5,
    areas: [{ areaId: 2 }, { areaId: 4 }],
    disponibilidades: [0, 3, 4],
    avaliacao: 4.9,
    id: 23,
    nome: "Mariana Oliveira",
    email: "mariana.oliveira@gmail.com",
  } as any,
  {
    descricao: "Instrutor de ciência de dados e aprendizado de máquina.",
    certificacoes: [
      "Bacharelado em Estatística",
      "Especialização em Data Science",
    ],
    competencias: ["Python", "Pandas", "TensorFlow"],
    valorHora: 150.0,
    areas: [{ areaId: 5 }, { areaId: 6 }],
    disponibilidades: [2, 4, 6],
    avaliacao: 4.7,
    id: 24,
    nome: "Rafael Costa",
    email: "rafael.costa@gmail.com",
  } as any,
  {
    descricao:
      "Professora de design gráfico e desenvolvimento de interfaces digitais.",
    certificacoes: ["Bacharelado em Design Gráfico"],
    competencias: ["Figma", "Adobe XD", "UI/UX"],
    valorHora: 75.0,
    areas: [{ areaId: 2 }, { areaId: 7 }],
    disponibilidades: [1, 2, 4],
    avaliacao: 4.5,
    id: 25,
    nome: "Camila Ribeiro",
    email: "camila.ribeiro@gmail.com",
  } as any,
];

const API_BASE = "http://localhost:5041/api";
const API_PROFESSORES = `${API_BASE}/professores`;

const fmtPrice = (v?: number) =>
  v == null ? "Valor não informado" : `R$ ${Number(v).toFixed(2)}/h`;

const SobreNos: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filtered, setFiltered] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [minRating, setMinRating] = useState<number>(0);

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Carrega professores da API com fallback no mock
  useEffect(() => {
    const load = async () => {
      try {
        const resp = await fetch(API_PROFESSORES, {
          headers: { Accept: "application/json" },
        });
        if (!resp.ok) throw new Error("HTTP " + resp.status);
        const data = (await resp.json()) as Teacher[];
        if (Array.isArray(data) && data.length) {
          setTeachers(data);
          setFiltered(data);
        } else {
          setTeachers(MOCK_DATA);
          setFiltered(MOCK_DATA);
        }
      } catch (err) {
        console.warn("Falha na API, usando MOCK_DATA:", err);
        setTeachers(MOCK_DATA);
        setFiltered(MOCK_DATA);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Aplica filtros sempre que algo muda
  useEffect(() => {
    let list = [...teachers];

    const term = searchTerm.toLowerCase().trim();
    if (term) {
      list = list.filter((p) => {
        const nome = (p.nome || "").toLowerCase();
        const desc = (p.descricao || "").toLowerCase();
        const comps = (p.competencias || [])
          .join(" ")
          .toLowerCase();
        return (
          nome.includes(term) || desc.includes(term) || comps.includes(term)
        );
      });
    }

    list = list.filter((p) => {
      const valor = p.valorHora ?? 0;
      const rating = p.avaliacao ?? 0;
      return (
        valor >= minPrice &&
        valor <= maxPrice &&
        rating >= minRating
      );
    });

    setFiltered(list);
  }, [teachers, searchTerm, minPrice, maxPrice, minRating]);

  const openProfile = (t: Teacher) => {
    setSelectedTeacher(t);
    setShowProfileModal(true);
  };

  const diasEnum: Record<number, string> = {
    0: "Segunda",
    1: "Terça",
    2: "Quarta",
    3: "Quinta",
    4: "Sexta",
    5: "Sábado",
    6: "Domingo",
  };

  return (
    <IonPage>
      {/* HEADER */}
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Buscar professores</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowFilterModal(true)}>
              <IonIcon icon={funnelOutline} slot="start" />
              Filtros
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* CONTEÚDO */}
      <IonContent fullscreen className="ion-padding">
        {/* Título / subtítulo */}
        <section style={{ marginBottom: "0.75rem" }}>
          <IonText>
            <h1
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                marginBottom: "0.25rem",
              }}
            >
              Busque pelo professor perfeito
            </h1>
          </IonText>
          <IonText color="medium">
            <p style={{ fontSize: "0.9rem", margin: 0 }}>
              Pesquise por nome, matéria ou habilidade e encontre alguém que
              combine com o que você precisa aprender.
            </p>
          </IonText>
        </section>

        {/* Busca */}
        <IonSearchbar
          value={searchTerm}
          debounce={350}
          placeholder="Pesquisar por nome, matéria ou habilidade..."
          onIonInput={(e) =>
            setSearchTerm(e.detail.value ? e.detail.value : "")
          }
          showClearButton="always"
        >
          <IonIcon slot="start" icon={searchOutline} />
        </IonSearchbar>

        {loading ? (
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <IonSpinner />
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              marginTop: "1.5rem",
              textAlign: "center",
              fontSize: "0.9rem",
            }}
          >
            <IonText color="medium">
              Nenhum professor encontrado. Tente outro termo ou ajuste os
              filtros.
            </IonText>
          </div>
        ) : (
          <IonList lines="none" style={{ marginTop: "1rem" }}>
            {filtered.map((t) => (
              <IonCard key={t.id}>
                <IonCardHeader>
                  <IonCardTitle
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <IonIcon icon={personOutline} />
                    <span>{t.nome}</span>
                  </IonCardTitle>
                  <IonCardSubtitle
                    style={{ display: "flex", gap: 8, marginTop: 4 }}
                  >
                    <span>
                      <IonIcon icon={pricetagOutline} /> {fmtPrice(t.valorHora)}
                    </span>
                    {typeof t.avaliacao === "number" && (
                      <span>
                        <IonIcon icon={starOutline} />{" "}
                        {t.avaliacao.toFixed(1)}
                      </span>
                    )}
                  </IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  {t.descricao && (
                    <p
                      style={{
                        fontSize: "0.9rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {t.descricao}
                    </p>
                  )}

                  {t.competencias && t.competencias.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {t.competencias.slice(0, 4).map((c) => (
                        <IonChip key={c} color="primary" outline>
                          {c}
                        </IonChip>
                      ))}
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 8,
                      marginTop: "0.5rem",
                    }}
                  >
                    <IonButton
                      size="small"
                      expand="block"
                      onClick={() => openProfile(t)}
                    >
                      Ver perfil
                    </IonButton>
                    <IonButton
                      size="small"
                      expand="block"
                      fill="outline"
                      color="secondary"
                      onClick={() => openProfile(t)}
                    >
                      <IonIcon icon={calendarOutline} slot="start" />
                      Agendar
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        )}
      </IonContent>

      {/* FOOTER simples */}
      <IonFooter>
        <div
          style={{
            padding: "0.5rem 1rem 1rem",
            textAlign: "center",
            fontSize: "0.75rem",
            color: "var(--ion-color-medium)",
          }}
        >
          © 2025 Grupo 2. Todos os direitos reservados.
        </div>
      </IonFooter>

      {/* MODAL DE FILTROS */}
      <IonModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Filtros</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowFilterModal(false)}>
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
              Ajustar filtros
            </h2>
          </IonText>

          {/* Faixa de preço */}
          <section style={{ marginBottom: "1.5rem" }}>
            <IonText>
              <h3
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                Valor da hora (R$)
              </h3>
            </IonText>
            <IonRange
              dualKnobs
              min={0}
              max={300}
              step={10}
              value={{ lower: minPrice, upper: maxPrice }}
              onIonChange={(e) => {
                const val = e.detail.value as { lower: number; upper: number };
                setMinPrice(val.lower);
                setMaxPrice(val.upper);
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.8rem",
                marginTop: 4,
              }}
            >
              <span>Mín: R$ {minPrice.toFixed(0)}</span>
              <span>Máx: R$ {maxPrice.toFixed(0)}</span>
            </div>
          </section>

          {/* Avaliação */}
          <section style={{ marginBottom: "1.5rem" }}>
            <IonText>
              <h3
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                Avaliação mínima
              </h3>
            </IonText>
            <IonRange
              min={0}
              max={5}
              step={0.5}
              value={minRating}
              onIonChange={(e) =>
                setMinRating(Number(e.detail.value ?? 0))
              }
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.8rem",
                marginTop: 4,
              }}
            >
              <span>
                <IonIcon icon={starOutline} /> {minRating.toFixed(1)}+
              </span>
            </div>
          </section>

          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
              marginTop: "1.5rem",
            }}
          >
            <IonButton
              fill="outline"
              onClick={() => {
                setMinPrice(0);
                setMaxPrice(1000);
                setMinRating(0);
              }}
            >
              Limpar
            </IonButton>
            <IonButton onClick={() => setShowFilterModal(false)}>
              Aplicar
            </IonButton>
          </div>
        </IonContent>
      </IonModal>

      {/* MODAL DE PERFIL */}
      <IonModal
        isOpen={showProfileModal && !!selectedTeacher}
        onDidDismiss={() => setShowProfileModal(false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Perfil do professor</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowProfileModal(false)}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {selectedTeacher && (
            <>
              <IonText>
                <h2
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    marginBottom: "0.25rem",
                  }}
                >
                  {selectedTeacher.nome}
                </h2>
              </IonText>
              <IonText color="medium">
                <p style={{ marginBottom: "0.5rem" }}>
                  {fmtPrice(selectedTeacher.valorHora)}
                  {typeof selectedTeacher.avaliacao === "number" && (
                    <>
                      {" "}
                      · <IonIcon icon={starOutline} />{" "}
                      {selectedTeacher.avaliacao.toFixed(1)}
                    </>
                  )}
                </p>
              </IonText>

              {selectedTeacher.descricao && (
                <section style={{ marginBottom: "1rem" }}>
                  <IonText>
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        marginBottom: "0.35rem",
                      }}
                    >
                      Sobre o professor
                    </h3>
                  </IonText>
                  <IonText color="medium">
                    <p style={{ lineHeight: 1.5 }}>
                      {selectedTeacher.descricao}
                    </p>
                  </IonText>
                </section>
              )}

              {selectedTeacher.competencias &&
                selectedTeacher.competencias.length > 0 && (
                  <section style={{ marginBottom: "1rem" }}>
                    <IonText>
                      <h3
                        style={{
                          fontSize: "1rem",
                          fontWeight: 600,
                          marginBottom: "0.35rem",
                        }}
                      >
                        Competências
                      </h3>
                    </IonText>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                      }}
                    >
                      {selectedTeacher.competencias.map((c) => (
                        <IonChip key={c}>{c}</IonChip>
                      ))}
                    </div>
                  </section>
                )}

              {selectedTeacher.certificacoes &&
                selectedTeacher.certificacoes.length > 0 && (
                  <section style={{ marginBottom: "1rem" }}>
                    <IonText>
                      <h3
                        style={{
                          fontSize: "1rem",
                          fontWeight: 600,
                          marginBottom: "0.35rem",
                        }}
                      >
                        Certificações
                      </h3>
                    </IonText>
                    <ul style={{ paddingLeft: "1.1rem" }}>
                      {selectedTeacher.certificacoes.map((c) => (
                        <li key={c} style={{ fontSize: "0.9rem" }}>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

              {selectedTeacher.disponibilidades &&
                selectedTeacher.disponibilidades.length > 0 && (
                  <section style={{ marginBottom: "1rem" }}>
                    <IonText>
                      <h3
                        style={{
                          fontSize: "1rem",
                          fontWeight: 600,
                          marginBottom: "0.35rem",
                        }}
                      >
                        Dias disponíveis
                      </h3>
                    </IonText>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                      }}
                    >
                      {selectedTeacher.disponibilidades.map((d) => (
                        <IonChip key={d} outline>
                          {diasEnum[d] || d}
                        </IonChip>
                      ))}
                    </div>
                  </section>
                )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginTop: "1rem",
                }}
              >
                <IonButton expand="block">
                  <IonIcon icon={calendarOutline} slot="start" />
                  Agendar aula
                </IonButton>
                <IonButton
                  expand="block"
                  fill="outline"
                  onClick={() => setShowProfileModal(false)}
                >
                  Fechar
                </IonButton>
              </div>
            </>
          )}
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default SobreNos;

