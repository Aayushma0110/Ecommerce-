import { SetMetadata } from '@nestjs/common';

export const ROLES_Key = 'roles';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_Key, roles);
// for eg, we pass 'admin' ,'user' aas roles to the Roles  decorators as @Roles {'admin','user,};
// then it will save the meta data with the KEY 'ROLES' AND VALUES ['ADMIN', 'USER'] FOR THE ROUTE HANDLER.
//AS similar to object below
//{
//    "roles"
//    :['ADMIN','USER']
//};