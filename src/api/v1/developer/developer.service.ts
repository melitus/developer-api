/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ObjectID } from 'mongodb';
import shortid from 'shortid';

import { isDevEnv } from '../../../helpers/environment';
import DeveloperCollection from './developer.entity';
import { IDeveloper, IDeveloperOnDevelopment } from './developer.interface';

const developers: IDeveloperOnDevelopment[] = [];

const getDevelopers = async (): Promise<IDeveloper> => {
  let foundDevelopers;
  if (isDevEnv()) {
    foundDevelopers = developers;
  } else {
    const searchQuery = {};
    foundDevelopers = await DeveloperCollection.find(searchQuery).lean<IDeveloper>().exec();
  }

  return foundDevelopers;
};

const filterDevelopersByLevel = async (level: string): Promise<IDeveloper> => {
  let results;
  if (isDevEnv()) {
    results = developers.filter((developer) => developer.level.includes(level));
  } else {
    const searchQuery = { level: level };
    results = await DeveloperCollection.find(searchQuery).lean<IDeveloper>().exec();
  }

  return results;
};

const findSingleDeveloper = async (id: string): Promise<IDeveloper | undefined> => {
  let foundDeveloper;
  if (isDevEnv()) {
    foundDeveloper = developers.find((developer) => developer._id === id);
  } else {
    foundDeveloper = await DeveloperCollection.findById(id);
  }
  return foundDeveloper;
};

const createDeveloper = async (createDeveloperData: IDeveloper): Promise<IDeveloper | number> => {
  let savedDeveloperData;
  if (isDevEnv()) {
    savedDeveloperData = developers.push({
      ...createDeveloperData,
      _id: shortid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } else {
    const newDeveloper = new DeveloperCollection(createDeveloperData);
    savedDeveloperData = await newDeveloper.save();
  }
  return savedDeveloperData;
};

const updateSingleDeveloperRecord = async (developerId, inputData) => {
  let developer;
  if (isDevEnv()) {
    developer = developers.find((developer) => developer._id === developerId);
    const { name, level } = inputData;
    if (name) developer.name = name;
    if (level) developer.level = level;
  } else {
    developer = await DeveloperCollection.updateOne({ _id: developerId }, { $set: inputData });
    return developer;
  }
};

const deleteDeveloper = async (developerId: string | any): Promise<boolean | void> => {
  let deleted;
  if (isDevEnv()) {
    const index = developers.findIndex((developer) => developer._id === developerId);
    developers.splice(index, 1);
    deleted = true;
  } else {
    await DeveloperCollection.findByIdAndRemove(developerId);
    deleted = true;
  }
  return deleted;
};

const isEmailInUse = async (data: Partial<IDeveloper>): Promise<boolean> => {
  const { email } = data;
  let developerEmailExist;
  if (isDevEnv()) {
    const checksEmailExist = developers.some((el) => el.email === email);
    if (checksEmailExist) developerEmailExist = true;
  } else {
    const emailExist = await DeveloperCollection.findOne({ email }).exec();
    if (emailExist) developerEmailExist = true;
  }

  return developerEmailExist;
};

export default {
  createDeveloper,
  getDevelopers,
  updateSingleDeveloperRecord,
  findSingleDeveloper,
  filterDevelopersByLevel,
  deleteDeveloper,
  isEmailInUse,
};
