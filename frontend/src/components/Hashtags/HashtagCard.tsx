import { HashtagType } from "@/lib/types";

const HashTagCard = ({ hashtag }: { hashtag: HashtagType }) => (
  <a
    key={hashtag.tag}
    href={`/hashtag/${hashtag.tag}`}
    className="bg-white-100 flex w-full flex-col items-center gap-2 rounded-lg border px-2 py-6 shadow-lg hover:scale-105 dark:border-gray-700 dark:bg-gray-900/50"
  >
    <h1 className="break-all text-base font-bold text-blue-600 dark:text-blue-400 md:text-xl">
      #{hashtag.tag}
    </h1>
    <p>
      {hashtag.count}
      {hashtag.count <= 1 ? " post" : " posts"}
    </p>
  </a>
);

export default HashTagCard;
