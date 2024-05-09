import type { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ): Promise<void> {

//   const { path, token } = req.query

//   if ((token as string) !== process.env.NEXT_PUBLIC_REVALIDATION_TOKEN) {
//     return res.status(401).json({message: "Invalid token"})
//   } else if ((path as string).length === 0) {
//     return res.status(401).json({message: "Path is required"})
//   }

//   try {
//     await res.revalidate(path as string)
//   } catch (err) {
//     return res.status(500).send("Error revalidating page")
//   }

//   return res.status(200).json({
//     revalidated: true, 
//     message: `Path ${path} revalidated successfully`,
//   })

// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { path, token } = req.query
  // Check for secret to confirm this is a valid request
  if (token !== process.env.NEXT_PUBLIC_REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }
 
  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate(path as string)
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
