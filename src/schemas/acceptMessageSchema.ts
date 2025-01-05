import { z } from 'zod';

export const AcceptMesaageSchema = z.object({
    acceptMessage:z.boolean(),
});