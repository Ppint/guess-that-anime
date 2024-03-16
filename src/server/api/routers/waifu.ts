import { z } from "zod";
import { publicProcedure } from "../trpc";
import { env } from "~/env.mjs";

export const waifuRouter = {
  getWaifu: publicProcedure.input(z.object({})).mutation(async () => {
    const waifu = await fetch("https://waifu.it/api/v4/waifu", {
      headers: {
        Authorization: env.ANIME_IT_API_TOKEN ?? "",
      },
      method: "GET",
    });
    return waifu.json();
  }),
};
