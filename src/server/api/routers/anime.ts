/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import { publicProcedure } from "../trpc";
import { env } from "~/env.mjs";

export const animeRouter = {
  getAnime: publicProcedure.input(z.object({})).mutation(async () => {
    const anime = await fetch(`https://api.jikan.moe/v4/random/anime`, {
      method: "GET",
    });
    return anime.json();
  }),
  getAutoSearch: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const anime = await fetch(
        `https://api.jikan.moe/v4/anime?q=${input.query}&order_by=favorites&sort=desc`,
        {
          method: "GET",
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const animeData = await anime.json();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const titles = animeData.data.map((anime: { title: any }) => anime.title);

      return titles;
    }),
};
