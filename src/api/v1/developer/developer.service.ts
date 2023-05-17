/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DeveloperCollection from './developer.entity';
import { IDeveloper } from './developer.interface';

const getDevelopers = async (): Promise<IDeveloper> => {
  const searchQuery = {};
  const foundDevelopers = await DeveloperCollection.find(searchQuery).lean<IDeveloper>().exec();

  return foundDevelopers;
};

const filterDevelopersByLevel = async (level: string): Promise<IDeveloper> => {
  const searchQuery = { level: level } as Pick<IDeveloper, 'level'>;
  const results = await DeveloperCollection.find(searchQuery).lean().exec();

  return results;
};

const findSingleDeveloper = async (developerId: string): Promise<IDeveloper | undefined> => {
  const foundDeveloper = await DeveloperCollection.findById(developerId);

  return foundDeveloper;
};

const createDeveloper = async (createDeveloperData: IDeveloper): Promise<IDeveloper> => {
  const newDeveloper = new DeveloperCollection(createDeveloperData);
  const savedDeveloperData = await newDeveloper.save();

  return savedDeveloperData;
};

const updateSingleDeveloperRecord = async (developerId, inputData) => {
  const developer = await DeveloperCollection.updateOne({ _id: developerId }, { $set: inputData });
  return developer;
};

const deleteDeveloper = async (developerId: string): Promise<boolean | void> => {
  const deleted = await DeveloperCollection.findByIdAndRemove(developerId);
  return deleted;
};

const isEmailInUse = async (data: Partial<IDeveloper>): Promise<boolean> => {
  const { email } = data;
  let developerEmailExist;
  const emailExist = await DeveloperCollection.findOne({ email }).exec();
  if (emailExist) developerEmailExist = true;

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
