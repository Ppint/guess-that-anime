import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { api } from "~/utils/api";
import { Button } from "@mui/material";

export default function Anime() {
  const [animePic, setAnimePic] = useState<string>("/suisei.jpg");
  const [answer, setAnswer] = useState<string>("");
  const [name, setName] = useState<string>("");
  const anime = api.anime.getAnime.useMutation();
  const animeSearch = api.anime.getAutoSearch.useQuery({ query: name });
  const [resetTrigger, setResetTrigger] = useState<number>(0);
  const onSubmitHandler = (e: KeyboardEvent) => {
    e.preventDefault();
    setResetTrigger((prev) => prev + 1);
    console.log(answer);
    console.log(name);
    if (name === answer) {
      console.log("correct");
      anime.mutate(
        {},
        {
          onSuccess: (data) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            setAnimePic(data?.data.images?.jpg?.image_url as string);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            setAnswer(data?.data.title as string);
          },
        },
      );
    }
    setName("");
  };

  useEffect(() => {
    anime.mutate(
      {},
      {
        onSuccess: (data) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          setAnimePic(data?.data.images?.jpg?.image_url as string);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          setAnswer(data?.data.title as string);
        },
      },
    );
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center">
        <div className="mx-auto mt-4 flex flex-col ">
          <div className="relative h-[30rem] w-[21rem]">
            <Image src={animePic} alt="waifu" fill={true} quality={100} />
          </div>

          <form className="mt-8 w-full">
            <Autocomplete
              key={resetTrigger}
              disablePortal
              autoComplete
              clearOnEscape
              selectOnFocus
              clearOnBlur
              loadingText="Loading"
              loading={animeSearch.status === "pending"}
              onChange={(e, v) => setName(v as string)}
              classes={{
                paper: "bg-black/30 text-white no-scrollbar ",
                inputRoot: "bg-black/30 text-white ",
              }}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              options={animeSearch.data ?? []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Movie"
                  InputLabelProps={{ className: "text-white" }}
                  onChange={(e) => setName(e.currentTarget.value)}
                  onKeyDown={(e) => e.key === "Enter" && onSubmitHandler(e)}
                />
              )}
            />
          </form>
          <Button
            onClick={() => {
              anime.mutate(
                {},
                {
                  onSuccess: (data) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    setAnimePic(data?.data.images?.jpg?.image_url as string);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    setAnswer(data?.data.title as string);
                  },
                },
              );
            }}
          >
            Skip
          </Button>
        </div>
      </main>
    </>
  );
}
