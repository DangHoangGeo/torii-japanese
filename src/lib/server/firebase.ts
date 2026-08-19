import type { LearnerSnapshot } from "@/lib/store";

function serviceAccountFromEnv():
  | { projectId: string; clientEmail: string; privateKey: string }
  | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as {
        project_id?: string;
        projectId?: string;
        client_email?: string;
        clientEmail?: string;
        private_key?: string;
        privateKey?: string;
      };
      const projectId = parsed.project_id || parsed.projectId;
      const clientEmail = parsed.client_email || parsed.clientEmail;
      const privateKey = parsed.private_key || parsed.privateKey;
      if (projectId && clientEmail && privateKey) {
        return { projectId, clientEmail, privateKey: privateKey.replace(/\\n/g, "\n") };
      }
    } catch {
      return null;
    }
  }
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (projectId && clientEmail && privateKey) {
    return { projectId, clientEmail, privateKey };
  }
  return null;
}

export function isFirebaseConfigured(): boolean {
  return serviceAccountFromEnv() !== null;
}

export function firebaseProjectId(): string | null {
  return serviceAccountFromEnv()?.projectId ?? null;
}

async function getDb() {
  const creds = serviceAccountFromEnv();
  if (!creds) return null;
  const { cert, getApps, initializeApp } = await import("firebase-admin/app");
  const { getFirestore } = await import("firebase-admin/firestore");
  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: creds.projectId,
        clientEmail: creds.clientEmail,
        privateKey: creds.privateKey,
      }),
    });
  }
  return getFirestore();
}

export async function persistLearner(userKey: string, data: LearnerSnapshot): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  const ref = db.collection("learners").doc(userKey);
  await ref.set(
    {
      profile: data.profile,
      cards: data.cards,
      daily: data.daily,
      completedReadings: data.completedReadings,
      writings: data.writings,
      chat: data.chat,
      lastStreakDate: data.lastStreakDate,
      streak: data.streak,
      lastInsight: data.lastInsight ?? null,
      updatedAt: data.profile.updatedAt,
    },
    { merge: true },
  );

  const batch = db.batch();
  for (const turn of data.chat.slice(-40)) {
    const id = `${turn.at}_${turn.role}`.replace(/[^\w.-]+/g, "_");
    batch.set(ref.collection("chat").doc(id), turn, { merge: true });
  }
  for (const writing of data.writings.slice(-20)) {
    const id = writing.at.replace(/[^\w.-]+/g, "_");
    batch.set(ref.collection("writings").doc(id), writing, { merge: true });
  }
  if (data.lastInsight) {
    batch.set(ref.collection("insights").doc("latest"), data.lastInsight, { merge: true });
  }
  await batch.commit();
  return true;
}

export async function loadLearner(userKey: string): Promise<LearnerSnapshot | null> {
  const db = await getDb();
  if (!db) return null;
  const snap = await db.collection("learners").doc(userKey).get();
  if (!snap.exists) return null;
  const data = snap.data() as Partial<LearnerSnapshot> | undefined;
  if (!data?.profile) return null;
  return {
    profile: data.profile,
    cards: data.cards ?? {},
    daily: data.daily ?? {},
    completedReadings: data.completedReadings ?? [],
    writings: data.writings ?? [],
    chat: data.chat ?? [],
    lastStreakDate: data.lastStreakDate ?? null,
    streak: data.streak ?? 0,
    lastInsight: data.lastInsight ?? null,
  };
}
