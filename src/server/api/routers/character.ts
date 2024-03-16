import { z } from "zod";
import { publicProcedure } from "../trpc";
import { env } from "~/env.mjs";

export const characterRouter = {
  getCharacter: publicProcedure.input(z.object({})).mutation(async () => {
    const character = await fetch(
      `https://api.jikan.moe/v4/random/characters`,
      {
        method: "GET",
      },
    );
    return character.json();
  }),
};
