/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { _transformDeveloperResponse } from './developer.transform';
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

const findSingleDeveloper = async (developerId: string): Promise<IDeveloper | unknown> => {
  const foundDeveloper = await DeveloperCollection.findById(developerId);
  const transformedResponse: IDeveloper | Record<string, unknown> = _transformDeveloperResponse(foundDeveloper);
  return transformedResponse;
};

const createDeveloper = async (createDeveloperData: IDeveloper): Promise<IDeveloper | unknown> => {
  const newDeveloper = new DeveloperCollection(createDeveloperData);
  const savedDeveloperData = await newDeveloper.save();
  const transformedResponse: IDeveloper | Record<string, unknown> = _transformDeveloperResponse(savedDeveloperData);
  return transformedResponse;
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
