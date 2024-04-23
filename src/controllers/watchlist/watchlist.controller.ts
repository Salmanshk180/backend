import { Request, Response } from "express";
import { watchlist } from "../../services/watchlist/watchlist.services";
import { getWatchList } from "../../services/watchlist/get-watchlist.services";

export const handleWatchlist = async (req: Request, res: Response) => {
    const watchlistResponse = await watchlist(req);
    return res.status(watchlistResponse.statusCode).json({ message: watchlistResponse.message, data: watchlistResponse.data })
}

export const getWatchlist = async (req: Request, res: Response) => {
    const watchlistResponse = await getWatchList(req);
   return res.status(watchlistResponse.statusCode).json({ message: watchlistResponse.message, data: watchlistResponse.data})
}
