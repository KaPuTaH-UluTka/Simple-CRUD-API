import { validate, version } from 'uuid';

export function checkUUID(id: string) {
  return validate(id) && version(id) === 4;
}
