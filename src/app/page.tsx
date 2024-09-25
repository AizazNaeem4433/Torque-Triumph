/* eslint-disable */
import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { simpleblogtype } from "@/sanity/lib/interface";
import Image from "next/image";
import Link from "next/link";
import styles from './custom.module.css';
import CardStyles from './card.module.css'
export const revalidate = 10

async function getData() {
  const query = `*[_type == 'blog'] | order(_createAt desc){
    Title,
    Smalldescription,
    "currentSlug": slug.current,
    "image": image.asset->url,
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleblogtype[] = await getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-8">
      {data.map((post, idx) => (
        <Card key={idx} className={CardStyles.card}>
                 <div className={CardStyles.maincontent}>
          <Image
            src={urlFor(post.image).url()}
            alt="image"
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-cover shadow-lg"
          />
          <CardContent className="mt-5">
            <h3 className="text-xl line-clamp-2 font-bold">{post.Title}</h3>
                        <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-400">
              {post.Smalldescription}
            </p>
            <div className={styles.container}>
              <div className={styles.btn}>
                <Link href={`/blog/${post.currentSlug}`}>
                  Read More
                </Link>
              </div>
            </div>
          </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}
