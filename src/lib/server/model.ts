import { generateObject, generateText, type LanguageModel } from "ai";
import { createGoogle } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createXai } from "@ai-sdk/xai";
import type { ZodType } from "zod";

export type AiProviderId = "xai" | "openai" | "google";

export function getAiProvider(): AiProviderId {
  const raw = (process.env.AI_PROVIDER ?? "xai").toLowerCase().trim();
  if (raw === "openai" || raw === "chatgpt") return "openai";
  if (raw === "google" || raw === "gemini") return "google";
  return "xai";
}

export function getAiModelId(): string {
  const provider = getAiProvider();
  if (provider === "openai") return process.env.OPENAI_MODEL?.trim() || "gpt-4.1-mini";
  if (provider === "google") return process.env.GOOGLE_MODEL?.trim() || "gemini-2.5-flash";
  return process.env.XAI_MODEL?.trim() || "grok-4.5";
}

function missingKeyMessage(provider: AiProviderId): string {
  if (provider === "openai") {
    return "OpenAI is selected (AI_PROVIDER=openai) but OPENAI_API_KEY is not set.";
  }
  if (provider === "google") {
    return "Gemini is selected (AI_PROVIDER=google) but GOOGLE_GENERATIVE_AI_API_KEY is not set.";
  }
  return "AI is not available in this environment.";
}

export function isAiConfigured(): boolean {
  const provider = getAiProvider();
  if (provider === "openai") return Boolean(process.env.OPENAI_API_KEY);
  if (provider === "google") {
    return Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY);
  }
  return Boolean(process.env.XAI_API_KEY);
}

export function getLanguageModel(): { ok: true; model: LanguageModel } | { ok: false; error: string } {
  const provider = getAiProvider();
  if (provider === "openai") {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return { ok: false, error: missingKeyMessage(provider) };
    return { ok: true, model: createOpenAI({ apiKey })(getAiModelId()) };
  }
  if (provider === "google") {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) return { ok: false, error: missingKeyMessage(provider) };
    return { ok: true, model: createGoogle({ apiKey })(getAiModelId()) };
  }
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return { ok: false, error: missingKeyMessage("xai") };
  return { ok: true, model: createXai({ apiKey })(getAiModelId()) };
}

export async function completeText(options: {
  system: string;
  messages: { role: "user" | "assistant" | "system"; content: string }[];
  maxOutputTokens?: number;
}): Promise<{ ok: true; text: string } | { ok: false; error: string }> {
  const resolved = getLanguageModel();
  if (!resolved.ok) return resolved;
  try {
    const { text } = await generateText({
      model: resolved.model,
      system: options.system,
      messages: options.messages.map((m) => ({
        role: m.role === "system" ? "user" : m.role,
        content: m.content,
      })),
      maxOutputTokens: options.maxOutputTokens ?? 600,
      temperature: 0.4,
    });
    return { ok: true, text: text ?? "" };
  } catch (err) {
    const message = err instanceof Error ? err.message : "AI request failed";
    return { ok: false, error: message };
  }
}

export async function completeObject<T>(options: {
  system: string;
  prompt: string;
  schema: ZodType<T>;
  maxOutputTokens?: number;
}): Promise<{ ok: true; object: T } | { ok: false; error: string }> {
  const resolved = getLanguageModel();
  if (!resolved.ok) return resolved;
  try {
    const { object } = await generateObject({
      model: resolved.model,
      system: options.system,
      prompt: options.prompt,
      schema: options.schema,
      maxOutputTokens: options.maxOutputTokens ?? 700,
      temperature: 0.3,
    });
    return { ok: true, object: object as T };
  } catch (err) {
    const message = err instanceof Error ? err.message : "AI request failed";
    return { ok: false, error: message };
  }
}
