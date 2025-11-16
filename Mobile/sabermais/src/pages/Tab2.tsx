// src/pages/Tab2.tsx
import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

// importa a página renomeada
import Busca from "./Busca";
// se quiser, pode manter o CSS gerado pelo template, se o arquivo existir
import "./Tab2.css";

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Buscar</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Buscar</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Aqui entra a página Busca.tsx */}
        <Busca />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
