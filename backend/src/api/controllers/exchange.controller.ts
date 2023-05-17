import { Request, Response } from "express";
import NodeCache from 'node-cache';

import exchangeService from "@/api/services/exchange.service";

export const cache = new NodeCache();

class ExchangeController {

  /**
    * GET /exchange?currency={currency}
    * 
    * @param {*} req A request 
    * @param {*} res A response
    * @returns paginate image list
    */
  async all(req: Request, res: Response) {
    const { currency } = req.query;
    const coins = await exchangeService.getAllExchange(String(currency));

    cache.set(req.originalUrl, coins, 3600);

    res.status(200).json(coins);
  }

  /**
    * GET /exchange?currency={currency}&coinId={coinId}
    * 
    * @param {*} req A request 
    * @param {*} res A response to send
    * @returns { exchange: 'Kraken' }
  */
  async exchange(req: Request, res: Response) {
    const { currency, coinId } = req.query;

    const exchange = await exchangeService.getExchange(String(currency), String(coinId));

    cache.set(req.originalUrl, exchange, 3600);

    res.status(200).json(exchange);
  }
}

export default new ExchangeController;