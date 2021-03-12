/*
	File for logically grouping past performance controllers
	into a concise, single location
*/

// Import past performances controllers' methods
import { addPastPerformance, updatePastPerformance, removePastPerformance } from './rootController.js';
import { addAnecdote, updateAnecdote, removeAnecdote } from './anecdotesController.js';
import { addCollaborator, updateCollaborator, removeCollaborator } from './collaboratorsController.js';

export {
	addPastPerformance, updatePastPerformance, removePastPerformance,
	addAnecdote, updateAnecdote, removeAnecdote,
	addCollaborator, updateCollaborator, removeCollaborator
}