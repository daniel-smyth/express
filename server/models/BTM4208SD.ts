import mongoose from "mongoose";

const { Schema } = mongoose;

/** Document layout for BTM4208SD */
const document = {
  /** Default time series metadata for Tiger Spider */
  metadata: {
    des: { type: String, alias: "description" },
    qty: { type: String, alias: "quantity" },
    src: { type: String, alias: "dataSource" },
    unit: { type: String, alias: "measurementUnit" },
  },
  t: { type: Date, alias: "time" },
  _id: String, // Required for mongoose, equals time
  c1: Number || null, // Temperature
  c2: Number || null,
  c3: Number || null,
  c4: Number || null,
  c5: Number || null,
  c6: Number || null,
  c7: Number || null,
  c8: Number || null,
  c9: Number || null,
  c10: Number || null,
  c11: Number || null,
  c12: Number || null,
};

/**
 * Timeseries schema options for MongoDB
 * ? https://www.mongodb.com/docs/manual/core/timeseries-collections/
 */
const options = {
  timeseries: { timeField: "t", metaField: "metadata", granularity: "seconds" },
};

/**
 * MongoDB "schema" for BTM4208SD temperature logger
 */
const BTM4208SD = new Schema(document, options);

function all(channels: number[], startDate?: Date) {
  const loggerId = Array.from(this.modelName)[0];

  const match = startDate ? { t: { $gte: startDate } } : {};

  const project = {
    _id: 0,
    date: "$t",
  };
  /** Add requested channels to the project aggregate */
  channels.forEach((c) => (project[`${loggerId}${c}`] = `$c${c}`));

  const sort = { date: 1 };

  const aggregate = [{ $match: match }, { $project: project }, { $sort: sort }];

  return this.aggregate(aggregate);
}

/**
 * Filter all data into periods of days
 * @param {number} days Day period to filter by
 * @param {number[]} channels BTM temperature channels
 * @param {Date} startDate (optional) Start date
 * @returns Aggregate
 */
function filterByDay(days: number, channels: number[], startDate?: Date) {
  const loggerId = Array.from(this.modelName)[0];

  const match = startDate ? { t: { $gte: startDate } } : {};
  const addFields = { time: { $dateToParts: { date: "$t" } } };
  const group = {
    _id: {
      year: "$time.year",
      month: "$time.month",
      interval: {
        $subtract: ["$time.day", { $mod: ["$time.day", days] }],
      },
    },
  };
  /** Add requested channels to the group aggregate */
  channels.forEach((c) => (group[`c${c}`] = { $max: `$c${c}` }));

  const project = {
    _id: 0,
    date: {
      $dateFromParts: {
        year: "$_id.year",
        month: "$_id.month",
        day: "$_id.interval",
      },
    },
  };
  /** Add requested channels to the project aggregate */
  channels.forEach((c) => (project[`${loggerId}${c}`] = `$c${c}`));

  const sort = { date: 1 };

  const aggregate = [
    { $match: match },
    { $addFields: addFields },
    { $group: group },
    { $project: project },
    { $sort: sort },
  ];

  return this.aggregate(aggregate);
}

/**
 * Filter all data into periods of hours
 * @param {number} hours Hour period to filter by
 * @param {number[]} channels BTM temperature channels
 * @param {Date} startDate (optional) Start date
 * @returns Aggregate
 */
function filterByHour(hours: number, channels: number[], startDate?: Date) {
  const loggerId = Array.from(this.modelName)[0];

  const match = startDate ? { t: { $gte: startDate } } : {};
  const addFields = { time: { $dateToParts: { date: "$t" } } };
  const group = {
    _id: {
      year: "$time.year",
      month: "$time.month",
      day: "$time.day",
      interval: {
        $subtract: ["$time.hour", { $mod: ["$time.hour", hours] }],
      },
    },
  };
  /** Add requested channels to the group aggregate */
  channels.forEach((c) => (group[`c${c}`] = { $max: `$c${c}` }));

  const project = {
    _id: 0,
    date: {
      $dateFromParts: {
        year: "$_id.year",
        month: "$_id.month",
        day: "$_id.day",
        hour: "$_id.interval",
      },
    },
  };
  /** Add requested channels to the project aggregate */
  channels.forEach((c) => (project[`${loggerId}${c}`] = `$c${c}`));

  const sort = { date: 1 };

  const aggregate = [
    { $match: match },
    { $addFields: addFields },
    { $group: group },
    { $project: project },
    { $sort: sort },
  ];

  return this.aggregate(aggregate);
}

/**
 * Filter all data into periods of minutes
 * @param {number} minutes Minute period to filter by
 * @param {number[]} channels BTM temperature channels
 * @param {Date} startDate (optional) Start date
 * @returns Aggregate
 */
function filterByMinute(minutes: number, channels: number[], startDate?: Date) {
  const loggerId = Array.from(this.modelName)[0];

  const match = startDate ? { t: { $gte: startDate } } : {};
  const addFields = { time: { $dateToParts: { date: "$t" } } };
  const group = {
    _id: {
      year: "$time.year",
      month: "$time.month",
      day: "$time.day",
      hour: "$time.hour",
      interval: {
        $subtract: ["$time.minute", { $mod: ["$time.minute", minutes] }],
      },
    },
  };
  /** Add requested channels to the group aggregate */
  channels.forEach((c) => (group[`c${c}`] = { $max: `$c${c}` }));

  const project = {
    _id: 0,
    date: {
      $dateFromParts: {
        year: "$_id.year",
        month: "$_id.month",
        day: "$_id.day",
        hour: "$_id.hour",
        minute: "$_id.interval",
      },
    },
  };
  /** Add requested channels to the project aggregate */
  channels.forEach((c) => (project[`${loggerId}${c}`] = `$c${c}`));

  const sort = { date: -1 };

  const aggregate = [
    { $match: match },
    { $addFields: addFields },
    { $group: group },
    { $project: project },
    { $sort: sort },
  ];

  return this.aggregate(aggregate);
}

/** Assign method to model */
BTM4208SD.static("all", all);
BTM4208SD.static("filterByDay", filterByDay);
BTM4208SD.static("filterByHour", filterByHour);
BTM4208SD.static("filterByMinute", filterByMinute);

export default BTM4208SD;
