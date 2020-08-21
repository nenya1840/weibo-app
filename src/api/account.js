import ajax from '../utils/ajax';
import { getAccessCode } from '../constants';

export function getAccess({ code }) {
  return ajax.post(getAccessCode(code));
}