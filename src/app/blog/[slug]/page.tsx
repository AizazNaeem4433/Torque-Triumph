import { client } from "@/sanity/lib/client"
import { fullblog } from "@/sanity/lib/interface"
import { log } from "console"

async function getData(slug: string) {

    const query=
    `*[_type == "blog" && slug.current == '${slug}']{
        'currentSlug': slug.current,
          Title,
          content,
          image
      }[0]`
      const data = await client.fetch(query)
      return data 
    }

export default async function BlogArtical({params}: {params:{Slug: string}}){
    const data: fullblog = await getData(params.Slug)
    
    return (   
        <div>
            <h1>
                
            </h1>
        </div>
    )
}