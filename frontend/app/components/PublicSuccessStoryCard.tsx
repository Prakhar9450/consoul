import Image from "next/image";
import Link from "next/link";

interface NumberItem {
  key: string;
  value: number;
}

interface HelpItem {
  key: string;
  value: string;
}

interface SuccessStory {
  id: string;
  title: string;
  thumbnailURL: string;
  clientName?: string;
  clientImageURL?: string;
  industry?: string;
  customIndustry?: string;
  topic?: string;
  customTopic?: string;
  service?: string;
  customService?: string;
  company?: string;
  numbers: NumberItem[];
  keyChallenges: string[];
  howWeHelped: HelpItem[];
  feedback: string;
  createdAt: any;
  userId: string;
  tags?: string[];
}

interface PublicSuccessStoryCardProps {
  story: SuccessStory;
}

export default function PublicSuccessStoryCard({
  story,
}: PublicSuccessStoryCardProps) {
  // Format the date
  const formattedDate = story.createdAt
    ? new Date(story.createdAt.toDate()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Sept 27, 2023";

  // Calculate read time based on content length (roughly 200 words per minute)
  const contentLength =
    story.feedback.split(/\s+/).length +
    story.keyChallenges.reduce(
      (acc, challenge) => acc + challenge.split(/\s+/).length,
      0
    ) +
    story.howWeHelped.reduce(
      (acc, item) =>
        acc + item.key.split(/\s+/).length + item.value.split(/\s+/).length,
      0
    );

  const readTime = Math.max(1, Math.ceil(contentLength / 200));

  // Get the first key challenge as a description
  const description =
    story.keyChallenges.length > 0
      ? story.keyChallenges[0]
      : "A success story showcasing our effective solutions.";

  return (
    <div className="flex flex-col">
      <Link href={`/success-story/${story.id}`}>
        <div className="overflow-hidden rounded-lg">
          <Image
            src={story.thumbnailURL || "/placeholder.svg?height=400&width=600"}
            alt={story.title}
            width={600}
            height={400}
            className="h-[250px] w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <span>{readTime} mins read</span>
        </div>

        <Link href={`/success-story/${story.id}`} className="block">
          <h3 className="text-xl font-semibold leading-tight hover:text-primary transition-colors">
            {story.title}
          </h3>
        </Link>

        <p className="text-muted-foreground line-clamp-2">{description}</p>

        <Link href={`/success-story/${story.id}`} className="block">
          <h4 className="text-lg font-medium text-primary hover:text-primary-dark transition-colors">
            {story.company}
          </h4>
        </Link>

        {story.tags && story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {story.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block rounded-full px-3 py-1 text-xs bg-slate-100 text-slate-700">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
