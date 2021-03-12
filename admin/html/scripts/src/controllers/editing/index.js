/*
	File for logically grouping editing controllers into 
	a concise, single location
*/

// Import editing controllers' methods
import { addGenre, updateGenre, removeGenre } from './genresController.js';
import { addLiteratureType, updateLiteratureType, removeLiteratureType } from './litTypesController.js';
import { addRate, updateRate, removeRate } from './ratesController.js';

export {
	 addGenre, updateGenre, removeGenre,
	 addLiteratureType, updateLiteratureType, removeLiteratureType,
	 addRate, updateRate, removeRate
}