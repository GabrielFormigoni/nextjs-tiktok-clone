import { topicPostsQuery } from './../../../utils/queries';
import { client } from '../../../utils/client';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    if(req.method === "GET"){
        const { topic } = req.query

        const topicQuery = topicPostsQuery(topic)

        const videos = await client.fetch(topicQuery)

        res.status(200).json(videos)
    }
}
