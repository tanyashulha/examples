const activeTool = (state = 'pencil', action) => {
  switch (action.type) {
    case 'SET_ACTIVE_TOOL':
      return action.tool
    default:
      return state
  }
}

export default activeTool;