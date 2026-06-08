import { EventEmitter } from 'events';

const bus = new EventEmitter();
bus.setMaxListeners(200); // allow many concurrent browser tabs

export function emitRefresh(storyId: string) {
  bus.emit('refresh', storyId);
}

export function onRefresh(storyId: string, handler: () => void) {
  const wrapped = (id: string) => { if (id === storyId) handler(); };
  bus.on('refresh', wrapped);
  return () => bus.off('refresh', wrapped);
}
