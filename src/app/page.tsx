"use client"
import { useEffect, useState } from "react"; // Import hooks from React
import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { simpleblogtype } from "@/sanity/lib/interface";
import Image from "next/image";
import Link from "next/link";
import styles from './custom.module.css';
import Cardstyles from './card.module.css';

async function getData(): Promise<simpleblogtype[]> {
  try {
    const query = `*[_type == 'blog'] | order(_createdAt desc){
      Title,
      Smalldescription,
      "currentSlug": slug.current,
      "image": image.asset->url,
    }`;

    const data: simpleblogtype[] = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return []; // Return an empty array if there's an error
  }
}

export default function Home() {
  const [data, setData] = useState<simpleblogtype[]>([]);
  
  // Fetch data on mount and every second
  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    // Initial fetch
    fetchData();
    
    // Set an interval to fetch data every second
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-8">
      {data.map((post, idx) => (
        <Card key={idx} className={Cardstyles.card}>
          <div className={Cardstyles.maincontent}>
            <Image
              src={urlFor(post.image).url() ?? ''} // Use nullish coalescing for safety
              alt={post.Title || "image"} // Better accessibility
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
      {/* Render nothing if no data */}
    </div>
  );
}
