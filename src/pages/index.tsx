import Image from "next/image";
import { useState } from "react";

import { api } from "~/utils/api";

export default function Home() {
  const waifu = api.waifu.getWaifu.useMutation();
  const character = api.character.getCharacter.useMutation({});
  const [waifuPic, setWaifuPic] = useState<string>("/suisei.jpg");

  const onClickHandler = () => {
    character.mutate(
      {},
      {
        onSuccess: (data) => {
          setWaifuPic(data.data.images.jpg.image_url);
        },
      },
    );
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <Image src={waifuPic} alt="waifu" width={200} height={200} />
        <div onClick={() => onClickHandler()}>Click Me </div>
      </main>
    </>
  );
}
