import { z } from 'zod';
import { items, insertItemSchema } from './schema';

export const api = {
  items: {
    list: {
      method: 'GET' as const,
      path: '/api/items',
      responses: {
        200: z.array(z.custom<typeof items.$inferSelect>()),
      },
    },
  },
};
