import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { teamId } = req.query;

  if (req.method === 'GET') {
    try {
      const members = await db.member.findMany({
        where: { teamId: teamId as string },
        include: {
          taroCard: true,
        },
      });

      res.status(200).json(members);
    } catch (error) {
      console.error('Error fetching members:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { firstname, surname, date, card, teamId } = req.body;

      if (!firstname || !surname || !date || !card || !teamId) {
        return res.status(400).json({ error: 'Name, surname, date, card, and teamId are required' });
      }

      const name = `${firstname} ${surname}`;
      const newMember = await db.member.create({
        data: {
          name,
          dateOfBirth: new Date(date),
          taroCard: {
            connect: { id: card.id },
          },
          team: {
            connect: { id: teamId },
          },
        },
      });

      res.status(201).json(newMember);
    } catch (error) {
      console.error('Error creating new member:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}