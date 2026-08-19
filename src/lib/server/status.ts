import { createServerFn } from "@tanstack/react-start";
import { firebaseProjectId, isFirebaseConfigured } from "./firebase";
import { getAiModelId, getAiProvider, isAiConfigured } from "./model";

export const getRuntimeStatus = createServerFn({ method: "GET" }).handler(async () => {
  return {
    firebase: isFirebaseConfigured(),
    firebaseProjectId: firebaseProjectId(),
    postgres: Boolean(process.env.DATABASE_URL),
    ai: isAiConfigured(),
    aiProvider: getAiProvider(),
    aiModel: getAiModelId(),
  };
});
