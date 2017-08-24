export const tasks = (state: any = [], {type, payload}) => {
    switch (type) {
        case 'GET_TASKS':
            return payload;
        case 'REESTABLISH_TASK': 
            return [...state, payload];
        case 'UPDATE_TASK':
            return state.map(campaign => {
                return campaign.token === payload.token ? Object.assign({}, campaign, payload): campaign;
            });
        case 'DELETE_TASK': 
            return state.filter(campaign => {
                return campaign.token !== payload.token;
            });
        default: 
            return state;
    }
}