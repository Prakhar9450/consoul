export interface BlogPost {
    id: string
    title: string
    description: string
    date: string
    readingTime: string
    category: string
    tags: string[]
    image: string
  }

  //komal ranka
  
  
  export const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      date: "Sept 27, 2023",
      readingTime: "5 mins read",
      category: "Business Analytics",
      tags: ["digital marketing", "lead gen", "customer lifecycle"],
      image: "/components/success.svg", 
      },

      

    {
      id: "2",
      title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      date: "Sept 27, 2023",
      readingTime: "3 mins read",
      category: "Business Analytics",
      tags: ["business intelligence", "data analytics", "AI tools"],
      image: "/components/success.svg",   },

     
    
  ].concat(
    Array(10)
      .fill(0)
      .map((_, i) => ({
        id: `${i + 3}`,
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        date: "Sept 27, 2023",
        readingTime: "4 mins read",
        category: "Business Analytics",
        tags: ["digital marketing", "business intelligence", "AI tools"],
        image: "/components/success.svg",
      })),
  )
  
  