import type { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import {
    CollectionReference,
    DocumentReference,
    Firestore,
    QueryDocumentSnapshot,
    Timestamp,
} from "firebase/firestore";
import { FirebaseStorage } from "firebase/storage";
import React from "react";

export type RouteError = {
    status: number;
    data?:
        | string
        | {
              message: string;
              redirect?: string;
              delay?: boolean;
          };
};

export type DefaultEntity = {
    id?: string;
};

export type EstateEntity = {
    title: string;
    address: string;
    description: string;
    owner: DefaultEntity & { email: string };
    owner_ref: DocumentReference<{ email: string }>;
    created_at: Timestamp;
    updated_at: Timestamp;
    deleted_at: Timestamp;
};

export type AppartEntity = {
    title: string;
    price: number;
    price_unit: string;
    description: string;
    owner: DefaultEntity & { email: string };
    owner_ref: DocumentReference<{ email: string }>;
    estate: DefaultEntity & EstateEntity;
    estate_ref?: DocumentReference<EstateEntity, EstateEntity>;
    occupant: DefaultEntity & OccupantEntity;
    occupant_ref?: DocumentReference<OccupantEntity, OccupantEntity>;
    history: (DefaultEntity & OccupantEntity & Record<"from" | "to", string>)[];
    payments: (DefaultEntity & PaymentEntity)[];
    paymentts_ref?: DocumentReference<PaymentEntity, PaymentEntity>[];
    created_at: Timestamp;
    updated_at: Timestamp;
    deleted_at: Timestamp;
};

export type PaymentEntity = {
    appart: DefaultEntity & AppartEntity;
    appart_ref?: DocumentReference<AppartEntity>;
    occupant: DefaultEntity & OccupantEntity;
    occupant_ref?: DocumentReference<OccupantEntity>;
    label: string;
    amount: string;
    date: { year: number; month: number; day?: number };
    created_at: Timestamp;
    updated_at: Timestamp;
    deleted_at: Timestamp;
};

export type OccupantEntity = {
    nom: string;
    phone?: string;
    email?: string;
    owner: string;
    created_at: Timestamp;
    updated_at: Timestamp;
    deleted_at: Timestamp;
};

export type FirebaseContextType = {
    firebase?: FirebaseApp;
    auth?: Auth;
    db?: Firestore;
    storage?: FirebaseStorage;
    status?: "DISCONNECTED" | "CONNECTED" | "LOADING";
    login?: (email: string, psw: string) => any;
    logout?: () => any;
    signup?: (email: string, psw: string) => any;
};

export type DimensionContextType = {
    screenX?: number;
    screenY?: number;
    isDark?: boolean;
};

export type ModalData =
    | { modalId: "CREATE_APPART"; payload: { estateId?: string } }
    | { modalId: "CREATE_ESTATE"; payload?: any }
    | { modalId: "ADD_OCCUPANT"; payload?: any }
    | { modalId: "EDIT_APPART"; payload: { appartId: string } }
    | { modalId: "DELETE_APPART"; payload: { appartId: string } }
    | { modalId: "DELETE_OCCUPANT"; payload: { occupantId: string } }
    | { modalId: "DELETE_PAYMENT"; payload: { paymentId: string } }
    | {
          modalId: "NEW_RENT";
          payload: { appartId?: string; occupantId?: string };
      }
    | {
          modalId: "SAVE_PAYMENT";
          payload: { appartId: string };
      };

export type ModalContextType = {
    modals?: ModalData & { thread: ModalData[] };
    closeModal?: (modalId?: ModalData["modalId"]) => any;
    openModal?: (data: ModalData) => any;
};

export type DrawerData =
    | {
          drawerId: "APPART_DETAILS";
          payload: { appartId: string };
      }
    | {
          drawerId: "ESTATE_DETAILS";
          payload: { estateId: string };
      }
    | {
          drawerId: "SOLVE_TS";
          payload: any;
      };
export type DrawerContextType = {
    drawers?: DrawerData & { thread: DrawerData[] };
    closeDrawer?: (drawerId?: DrawerData["drawerId"]) => any;
    openDrawer?: (data: DrawerData) => any;
};

export type EstateContextType = {
    estates?: QueryDocumentSnapshot<EstateEntity, EstateEntity>[];
    filter?: object;
    setFilter?: React.Dispatch<React.SetStateAction<object>>;
    estateCollection?: CollectionReference<EstateEntity, EstateEntity>;
};

export type AppartContextType = {
    apparts?: QueryDocumentSnapshot<AppartEntity, AppartEntity>[];
    filter?: object;
    setFilter?: React.Dispatch<React.SetStateAction<object>>;
    appartCollection?: CollectionReference<AppartEntity, AppartEntity>;
};

export type OccupantContextType = {
    occupants?: QueryDocumentSnapshot<OccupantEntity>[];
    filter?: object;
    setFilter?: React.Dispatch<React.SetStateAction<object>>;
    occupantCollection?: CollectionReference<OccupantEntity, OccupantEntity>;
};

export type PaymentContextType = {
    payments?: QueryDocumentSnapshot<PaymentEntity>[];
    filter?: object;
    setFilter?: React.Dispatch<React.SetStateAction<object>>;
    paymentCollection?: CollectionReference<PaymentEntity, PaymentEntity>;
};
