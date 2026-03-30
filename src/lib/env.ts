import "server-only";
import { z } from "zod";

const EnvSchema = z
	.object({
		CG_API_KEY: z.string({
			error: (iss) =>
				iss.input === undefined
					? "Missing CG_API_KEY"
					: "CG_API_KEY must be a string",
		}),
		CG_URL: z.url({
			error: (iss) =>
				iss.input === undefined
					? "Missing CG_URL"
					: "CG_URL must be a url",
		}),
	})
	.readonly()

export type Env = z.infer<typeof EnvSchema>;

export function readEnvOnce(): Readonly<Env> {
	const raw = {
		CG_API_KEY: process.env.COINGECKO_API_KEY,
		CG_URL: process.env.COINGECKO_URL,
	}

	const res = EnvSchema.safeParse(raw)

	if (!res.success) {
		console.error(
			"Invalide Env Variable:",
			z.prettifyError(res.error),
		)
		throw new Error("Invalide Env Variable..")
	}

	// Returns readonly types & enforces runtime immutability
	return Object.freeze(res.data)
}

export const env = readEnvOnce()
