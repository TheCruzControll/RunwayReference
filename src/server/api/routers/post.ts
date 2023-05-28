import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const createPost = publicProcedure
  .input(z.object({ text: z.string().min(1) }))
  .mutation(async ({ ctx, input }) => {

    return ctx.prisma.post.create({
      data: {
        text: input.text,
      }
    });
  });

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  createNew: createPost,

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
