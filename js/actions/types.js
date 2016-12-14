
export type Action =
    { type: 'PUSH_NEW_ROUTE', route: string }
        | { type: 'POP_ROUTE' }
        | { type: 'POP_TO_ROUTE', route: string }
        | { type: 'REPLACE_ROUTE', route: string }
        | { type: 'REPLACE_OR_PUSH_ROUTE', route: string }
        | { type: 'OPEN_DRAWER'}
        | { type: 'CLOSE_DRAWER'}
        | { type: 'USER_LOGIN_SUCCESS'}
        | { type: 'USER_LOGIN_FAILURE'}
        | { type: 'USER_REGISTER_SUCCESS'}
        | { type: 'USER_REGISTER_FAILURE'}

export type Dispatch = (action:Action | Array<Action>) => any;
export type GetState = () => Object;
export type PromiseAction = Promise<Action>;
