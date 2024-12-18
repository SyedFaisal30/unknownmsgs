import { PassThrough } from "stream"
import { string, z } from "zod"

export const signInSchema=z.object({
    identifier:z.string(),
    password:z.string(),
});