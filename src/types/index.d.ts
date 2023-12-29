import type { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";

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

export type AppartEntity = {
    id: string;
};

export type PaymentEntity = {
    id: string;
};

export type ClientEntity = {
    id: string;
};

export type FirebaseContextType = {
    firebase?: FirebaseApp;
    auth?: Auth;
    db?: Firestore;
    status?: "DISCONNECTED" | "CONNECTED" | "LOADING";
    login?: (email: string, psw: string) => any;
    logout?: () => any;
    signup?: (email: string, psw: string) => any;
};
