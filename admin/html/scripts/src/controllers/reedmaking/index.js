/*
	File for logically grouping reedmaking controllers into 
	a concise, single location
*/

// Import reedmaking controllers' methods
import { addReed, updateReed, removeReed } from './reedController.js';
import { addCategory, updateCategory, removeCategory } from './categoryController.js';

export {
	addReed, updateReed, removeReed,
	addCategory, updateCategory, removeCategory	
}