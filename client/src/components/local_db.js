import {v4 as uuidv4} from 'uuid';

const itemsFromBackend = [
    { id: uuidv4(), tags: ['Not Urgent'], date: Date(), title: "First task"},
    { id: uuidv4(), tags: ['Not Urgent'], date: Date(), title: "Second task" },
    { id: uuidv4(), tags: ['Not Urgent'], date: Date(), title: "Third task" },
    { id: uuidv4(), tags: ['Not Urgent'], date: Date(), title: "Fourth task" },
    { id: uuidv4(), tags: ['Not Urgent'], date: Date(), title: "Fifth task" }
  ];
  
export const columnsFromBackend = {
    [uuidv4()]: {
      name: "Requested",
      items: itemsFromBackend
    },
    [uuidv4()]: {
      name: "To do",
      items: []
    },
    [uuidv4()]: {
      name: "In Progress",
      items: []
    },
    [uuidv4()]: {
      name: "Done",
      items: []
    }
};