import P from "@prisma/client";
import { isServer } from "solid-js/web";

export const db = isServer ? new P.PrismaClient() : undefined;

db?.$connect();
