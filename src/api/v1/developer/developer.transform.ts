/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IDeveloper } from './developer.interface';

export const _transformDeveloperResponse = (developer: IDeveloper): IDeveloper | {} => {
  if (!developer) {
    return {};
  }
  const obj: IDeveloper | {} = {};

  return Object.assign(
    {},
    {
      _id: developer?._id,
      name: developer?.name,
      email: developer?.email,
      level: developer?.level,
    },
    obj,
  );
};
