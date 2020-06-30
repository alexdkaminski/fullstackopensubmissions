import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const anecdoteToChange = action.data.anecdote
      return state.map(anecdote =>
        anecdote.id !== anecdoteToChange.id ? anecdote : anecdoteToChange
      )
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
  default:
    return state
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const anecdoteToChange = anecdotes.find(a => a.id === id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    const updatedAnecdote = await anecdoteService.update(changedAnecdote)
    dispatch ({
      type: 'VOTE',
      data: {
        anecdote: updatedAnecdote
      }
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote= await anecdoteService.createNew(content)
    dispatch ({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer