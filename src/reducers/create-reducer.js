const createReducer = (start, actions) => {
    if (typeof start === 'undefined') {
      throw new Error("first state mustn't be undefined");
    }
    if (Object.prototype.toString.call(actions) !== '[object Object]') {
      throw new Error("the reducer's actions must be an object");
    }
  
    return (state = start, { type, payload }) =>
      actions.hasOwnProperty(type)
        ? actions[type].call(null, state, { type, payload })
        : state;
  };
  
  export default createReducer;