/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import httpStatus from 'http-status';
import { Request, Response } from 'express';

import DeveloperService from './developer.service';
import { IDeveloperResponse } from './developer.interface';
interface SearchReqBody {
  level?: string;
}

const getDevelopers = async (req: Request, res: Response<IDeveloperResponse>) => {
  try {
    const foundDevelopers = await DeveloperService.getDevelopers();
    res
      .status(httpStatus.OK)
      .json({ success: true, message: 'All developers fetched successfully', data: foundDevelopers });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Error occurred while creating a ship' });
  }
};

const getSingleDeveloper = async (req: Request, res: Response<IDeveloperResponse>) => {
  const { developerId } = req.params;
  try {
    const foundDeveloper = await DeveloperService.findSingleDeveloper(developerId);
    if (!foundDeveloper) {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ success: true, message: 'A developer does not exist', data: foundDeveloper });
    } else {
      res
        .status(httpStatus.OK)
        .json({ success: true, message: 'A developer is fetched successfully', data: foundDeveloper });
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Error occurred while creating a ship' });
  }
};

const createDeveloper = async (req: Request, res: Response<IDeveloperResponse>) => {
  const inputData = req.body;
  try {
    const emailInUse = await DeveloperService.isEmailInUse(inputData);
    if (emailInUse) {
      res.status(httpStatus.CONFLICT).json({ success: true, message: `${inputData.email} already exist` });
    } else {
      const response = await DeveloperService.createDeveloper(inputData);
      res.status(httpStatus.OK).json({ success: true, message: 'A developer is created successfully', data: response });
    }
  } catch (error) {
    console.trace(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Error occurred while creating a developer on a board' });
  }
};

const filterDeveloperByLevel = async (req: Request<SearchReqBody>, res: Response) => {
  const inputData = req.query;
  try {
    const response = await DeveloperService.filterDevelopersByLevel(inputData.level as string);
    res
      .status(httpStatus.OK)
      .json({ success: true, message: `All developer at this ${inputData.level} level`, data: response });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Error occurred while filtering a developer by level' });
  }
};

const editSingleDeveloper = async (req: Request, res: Response) => {
  const { developerId } = req.params;
  const inputData = req.body;
  try {
    const response = await DeveloperService.updateSingleDeveloperRecord(developerId, inputData);
    res
      .status(httpStatus.OK)
      .json({ success: true, message: `A developer record is updated successfully`, data: response });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Error occurred while updating a developer on a board' });
  }
};

const deleteDeveloper = async (req: Request, res: Response) => {
  const { developerId } = req.params;
  try {
    const response = await DeveloperService.deleteDeveloper(developerId);
    res
      .status(httpStatus.OK)
      .json({ success: true, message: `A developer record deleted successfully`, data: response });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Error occurred while deleting a developer on a board' });
  }
};

export default {
  getDevelopers,
  getSingleDeveloper,
  createDeveloper,
  filterDeveloperByLevel,
  deleteDeveloper,
  editSingleDeveloper,
};
