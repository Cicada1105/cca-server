/*
	This file is for importing and exporting
	add and edit card callback functions used
	by event listeners associated with callbacks
*/

import {
	addPastCard, addAnecdoteCard, addCollaboratorCard, addPresentCard, 
	addFutureCard, addEditingLitTypeCard, addEditingGenreCard, 
	addEditingRateCard, addReedCard, addReedRateCard
} from './add/';
import {
	editPastCard, editAnecdoteCard, editCollaboratorCard, 
	editPresentCard, editFutureCard, editEditingLitTypeCard,
	editEditingGenreCard, editEditingRateCard, editReedNameCard, 
	editReedDescriptionCard, editReedRateCard
} from './edit/';

export { 
	addPastCard, addAnecdoteCard, addCollaboratorCard, addPresentCard, 
	addFutureCard, addEditingLitTypeCard, addEditingGenreCard, 
	addEditingRateCard, addReedCard, addReedRateCard,
	
	editPastCard, editAnecdoteCard, editCollaboratorCard, 
	editPresentCard, editFutureCard, editEditingLitTypeCard,
	editEditingGenreCard, editEditingRateCard, editReedNameCard, 
	editReedDescriptionCard, editReedRateCard
}