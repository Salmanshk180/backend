import { Request, Response } from "express";
import { reviews } from "../../services/reviews/reviews.services";
import { getAllReviews } from "../../services/reviews/get-reviews.services";

export const handleReview = async (req: Request, res: Response) => {
    const reviewResponse = await reviews(req);
    return res.status(reviewResponse.statusCode).json({ message: reviewResponse.message, id: reviewResponse.id })
}

export const getReviews = async (req: Request, res: Response) =>{
    const reviewResponse = await getAllReviews();
    return res.status(reviewResponse.statusCode).json({ message: reviewResponse.message, id: reviewResponse.data })
}