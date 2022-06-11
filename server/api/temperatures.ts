/* eslint-disable prefer-arrow-callback */
import * as mongoose from "mongoose";
import * as express from "express";
import { BTMLogger } from "../models/btmlogger";
import BTM4208SD from "../models/BTM4208SD";

const router = express.Router();

router.post("/minutes", async (req, res, next) => {
  try {
    // Requested channels sorted by logger
    const loggers: { id: string; channels: number[] }[] = req.body.loggers;
    const date: Date = new Date(req.body.date);

    const promises = loggers.map((logger) => {
      const { id, channels } = logger;
      const Collection: any = mongoose.model(`${id}temperatures`, BTM4208SD);
      return Collection.filterByMinute(1, channels, date);
    });

    const data = await Promise.all(promises);

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
});

router.post("/5minutes", async (req, res, next) => {
  try {
    // Requested channels sorted by logger
    const loggers: { id: string; channels: number[] }[] = req.body.loggers;
    const date: Date = new Date(req.body.date);

    const promises = loggers.map((logger) => {
      const { id, channels } = logger;
      const Collection: any = mongoose.model(`${id}temperatures`, BTM4208SD);
      return Collection.filterByMinute(5, channels, date);
    });

    const data = await Promise.all(promises);

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
});

router.post("/15minutes", async (req, res, next) => {
  try {
    // Requested channels sorted by logger
    const loggers: { id: string; channels: number[] }[] = req.body.loggers;
    const date: Date = new Date(req.body.date);

    const promises = loggers.map((logger) => {
      const { id, channels } = logger;
      const Collection: any = mongoose.model(`${id}temperatures`, BTM4208SD);
      return Collection.filterByMinute(15, channels, date);
    });

    const data = await Promise.all(promises);

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
});

router.post("/30minutes", async (req, res, next) => {
  try {
    // Requested channels sorted by logger
    const loggers: { id: string; channels: number[] }[] = req.body.loggers;
    const date: Date = new Date(req.body.date);

    const promises = loggers.map((logger) => {
      const { id, channels } = logger;
      const Collection: any = mongoose.model(`${id}temperatures`, BTM4208SD);
      return Collection.filterByMinute(30, channels, date);
    });

    const data = await Promise.all(promises);

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
});

router.post("/hours", async (req, res, next) => {
  try {
    // Requested channels sorted by logger
    const loggers: { id: string; channels: number[] }[] = req.body.loggers;
    const date: Date = new Date(req.body.date);

    const promises = loggers.map((logger) => {
      const { id, channels } = logger;
      const Collection: any = mongoose.model(`${id}temperatures`, BTM4208SD);
      return Collection.filterByHour(1, channels, date);
    });

    const data = await Promise.all(promises);

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
});

router.post("/minute", async (req, res, next) => {
  try {
    // Requested channels sorted by logger
    const loggers: { id: string; channels: number[] }[] = req.body;

    const promises = loggers.map((logger) => {
      const { id, channels } = logger;
      const Collection: any = mongoose.model(`${id}temperatures`, BTM4208SD);
      return Collection.filterByMinute(1, channels);
    });

    const data = await Promise.all(promises);

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
});

router.post("/5-minutes", async (req, res, next) => {
  try {
    // Requested channels sorted by logger
    const loggers: { id: string; channels: number[] }[] = req.body;

    const promises = loggers.map((logger) => {
      const { id, channels } = logger;
      const Collection: any = mongoose.model(`${id}temperatures`, BTM4208SD);
      return Collection.filterByMinute(5, channels);
    });

    const data = await Promise.all(promises);

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
});

router.post("/10-minutes", async (req, res, next) => {
  try {
    // Requested channels sorted by logger
    const loggers: { id: string; channels: number[] }[] = req.body;

    const promises = loggers.map((logger) => {
      const { id, channels } = logger;
      const Collection: any = mongoose.model(`${id}temperatures`, BTM4208SD);
      return Collection.filterByMinute(10, channels);
    });

    const data = await Promise.all(promises);

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
});

router.post("/15-minutes", async (req, res, next) => {
  try {
    // Requested channels sorted by logger
    const loggers: { id: string; channels: number[] }[] = req.body;

    const promises = loggers.map((logger) => {
      const { id, channels } = logger;
      const Collection: any = mongoose.model(`${id}temperatures`, BTM4208SD);
      return Collection.filterByMinute(15, channels);
    });

    const data = await Promise.all(promises);

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
});

router.post("/hours", async (req, res, next) => {
  try {
    // Requested channels sorted by logger
    const loggers: { id: string; channels: number[] }[] = req.body;

    const promises = loggers.map((logger) => {
      const { id, channels } = logger;
      const Collection: any = mongoose.model(`${id}temperatures`, BTM4208SD);
      return Collection.filterByHour(1, channels);
    });

    const data = await Promise.all(promises);

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
});

router.post("/4-hours", async (req, res, next) => {
  try {
    // Requested channels sorted by logger
    const loggers: { id: string; channels: number[] }[] = req.body;

    const promises = loggers.map((logger) => {
      const { id, channels } = logger;
      const Collection: any = mongoose.model(`${id}temperatures`, BTM4208SD);
      return Collection.filterByMinute(4, channels);
    });

    const data = await Promise.all(promises);

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
});

router.post("/day", async (req, res, next) => {
  try {
    // Requested channels sorted by logger
    const loggers: { id: string; channels: number[] }[] = req.body;

    const promises = loggers.map((logger) => {
      const { id, channels } = logger;
      const Collection: any = mongoose.model(`${id}temperatures`, BTM4208SD);
      return Collection.filterByDay(1, channels);
    });

    const data = await Promise.all(promises);

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
});

router.post("/insert-many", async (req, res, next) => {
  try {
    const { id, docs } = req.body;

    console.log(`Inserting ${docs.length} ${id} documents`);

    const Collection = mongoose.model(`${id}temperatures`, BTM4208SD);

    console.time(`${id} insert time`);

    Collection.insertMany(docs, { ordered: false }, function (error, docs) {
      if (error) {
        console.log("Error");
        console.timeEnd(`${id} insert time`);
        res.status(200).json({ result: error });
      } else {
        console.log("Success");
        console.timeEnd(`${id} insert time`);
        res.status(200).json({ result: docs });
      }
    });
  } catch (err) {
    next(err);
  }
});

router.get("/count", async (_req, res, next) => {
  try {
    console.log("Getting count");

    const Collection = mongoose.model(`atemperatures`, BTMLogger);

    Collection.count({}, (err, count) => {
      if (count) res.status(200).json({ count });
      else res.status(200).json({ err });
    });
  } catch (err) {
    next(err);
  }
});

export default router;
