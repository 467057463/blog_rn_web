import { request } from '@/utils';

import type { RequestRespon } from '@/types/util';
import type { LoginRespon } from '@/types/user';

export function login(params) {
  return request.post<unknown, RequestRespon<LoginRespon>>(
    '/users/login',
    params
  );
}
