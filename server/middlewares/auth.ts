import { Request, Response, NextFunction } from 'express';
import * as Sentry from "@sentry/node"
import { prisma } from '../configs/prisma.js';

export const protect = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {userId} = req.auth()

        if(!userId) {
            return res.status(401).json({message: 'Unauthorized'})
        }

        // Auto-create user if they don't exist (useful for local dev when webhooks fail)
        const userExists = await prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) {
            // We can fetch basic info from Clerk if needed, but for now just create a stub
            await prisma.user.create({
                data: {
                    id: userId,
                    email: `user_${userId}@placeholder.com`,
                    name: `User ${userId.substring(0,5)}`,
                    image: '',
                    credits: 20 // default starter credits
                }
            });
        }

        next()
    } catch (error: any) {
        Sentry.captureException(error)
        res.status(401).json({message: error.code || error.message})
    }
}