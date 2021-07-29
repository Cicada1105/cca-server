/*
	File for logically grouping reedmaking controllers into 
	a concise, single location
*/

// Import reedmaking controllers' methods
import { addReed, removeReed } from './reedController.js';
import { updateName } from './nameController.js';
import { updateDescription } from './descriptionController.js';
import { addRate, updateRate, removeRate } from './ratesController.js';

export {
	addReed, removeReed,
	updateName,
	updateDescription,
	addRate, updateRate, removeRate	
}