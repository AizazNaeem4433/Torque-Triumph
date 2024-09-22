/* eslint-disable */
import { client } from "@/sanity/lib/client";
import { fullblog } from "@/sanity/lib/interface";
import { urlFor } from "@/sanity/lib/image";
import Image from 'next/image';
import { PortableText } from "next-sanity";

async function getData(slug: string) {
    const query = `*[_type == "blog" && slug.current == $slug]{
        'currentSlug': slug.current,
        Title,
        content,
        image
    }[0]`;
    const data = await client.fetch(query, { slug });
    return data;
}

export default async function BlogArtical({
    params,
}: { params: { slug: string } }) {
    const data: fullblog = await getData(params.slug);    
    return(
        <div>
            <h1>
                <span className="block text-base text-center text-orange-600 font-semibold tracking-wide uppercase">Speach-Blog</span>
                <span className="mt-2 black text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
                    {data.Title}
                </span>
            </h1>
            <div className="mt-6 w-full max-w-[500px] flex justify-center">
                    <Image 
                        src={urlFor(data.image).url()}
                        width={400}
                        height={400}
                        alt="image"
                        priority
                        className="rounded-lg flex justify-center w-full h-auto object-cover border"
                    />
                </div>
                <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-headings:underline">
                        <PortableText value={data.content}/>
                    </div>
            </div>
    )}
