import ProfilePreview from "@/components/Users/ProfilePreview";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserType } from "@/lib/types";
import { GET_USER_QUERY } from "@/queries/user";
import { useLazyQuery } from "@apollo/client";
import { MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * linkify function that converts URLs and hashtags into clickable links.
 * URLs are converted to <a> tags.
 * Hashtags are converted to <Link> components from react-router-dom.
 */
export const Linkify = (
  text: string,
  userMentions: {
    [key: string]: UserType | null;
  },
) => {
  const combinedRegex = /(https?:\/\/[^\s]+)|#([\wæøåÆØÅ]+)|@([\wæøåÆØÅ]+)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = combinedRegex.exec(text)) !== null) {
    const { index } = match;
    const [fullMatch, url, hashtag, mention] = match;

    if (index > lastIndex) {
      parts.push(text.substring(lastIndex, index));
    }

    if (url) {
      parts.push(
        <a
          key={`url-${index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(
            e: MouseEvent<HTMLAnchorElement> | TouchEvent<HTMLAnchorElement>,
          ) => {
            e.stopPropagation();
          }}
          className="text-blue-700 hover:underline dark:text-blue-500"
        >
          {url}
        </a>,
      );
    } else if (hashtag) {
      parts.push(
        <Link
          key={`hashtag-${index}`}
          to={`/hashtag/${hashtag}`}
          onClick={(
            e: MouseEvent<HTMLAnchorElement> | TouchEvent<HTMLAnchorElement>,
          ) => {
            e.stopPropagation();
          }}
          className="text-blue-700 hover:underline dark:text-blue-500"
        >
          #{hashtag}
        </Link>,
      );
    } else if (mention) {
      const user = userMentions[mention];
      parts.push(
        <TooltipProvider key={`mention-${index}`}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={`/user/${mention}`}
                onClick={(
                  e:
                    | MouseEvent<HTMLAnchorElement>
                    | TouchEvent<HTMLAnchorElement>,
                ) => {
                  e.stopPropagation();
                }}
                className="text-blue-700 underline-offset-4 hover:underline dark:text-blue-500"
              >
                @{mention}
              </Link>
            </TooltipTrigger>
            {user && (
              <TooltipContent className="border border-gray-300 p-0 dark:border-gray-600">
                <ProfilePreview user={user} />
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>,
      );
    }

    lastIndex = index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};

interface PostBodyProps {
  text: string;
  expanded: boolean;
}

const PostBody: React.FC<PostBodyProps> = ({ text, expanded }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const [showReadMore, setShowReadMore] = useState(false);

  const toggleExpand = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (bodyRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(bodyRef.current).lineHeight,
      );
      const lines = bodyRef.current.scrollHeight / lineHeight;
      if (lines <= 3) {
        setIsExpanded(true);
      } else {
        setShowReadMore(true);
      }
    }
  }, []);

  const [userMentions, setUserMentions] = useState<{
    [key: string]: UserType | null;
  }>({});
  const [fetchUser] = useLazyQuery<{ getUser: UserType }>(GET_USER_QUERY);

  useEffect(() => {
    const fetchUserMentions = async (mentions: string[]) => {
      const results = await Promise.all(
        mentions.map(async (mention) => {
          const { data } = await fetchUser({
            variables: { username: mention },
          });
          return { mention, user: data?.getUser };
        }),
      );
      const userMap: { [key: string]: UserType | null } = {};
      results.forEach(({ mention, user }) => {
        userMap[mention] = user ?? null;
      });
      setUserMentions(userMap);
    };

    const mentions = Array.from(
      new Set(text.match(/@(\w+)/g)?.map((m) => m.slice(1)) || []),
    );
    fetchUserMentions(mentions);
  }, [text, fetchUser]);

  return (
    <div>
      <p
        ref={bodyRef}
        className={`mx-1 w-fit max-w-full cursor-text whitespace-pre-wrap break-words ${
          isExpanded ? "" : "line-clamp-3"
        }`}
      >
        {Linkify(text, userMentions)}
      </p>
      {showReadMore && !expanded && (
        <button
          onClick={toggleExpand}
          className="p-2 pl-1 text-gray-500 hover:underline focus:outline-none dark:text-gray-300"
        >
          {isExpanded ? "Hide" : "Read more..."}
        </button>
      )}
    </div>
  );
};

export default PostBody;
