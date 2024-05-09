import { NextApiRequest, NextApiResponse } from "next";
import BlogDataApi from "@/services/BlogDataApi";

export const getPastorsPosts = async(locale: string) => {
  const postsData = await BlogDataApi.getPostsDataByLang(locale);

  return postsData;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse, locale: string) => {
  if(req.method === 'GET') {
    const data = await getPastorsPosts(locale);

    res.status(200).json({posts: data})
  } else if(req.method === 'POST') {}
}