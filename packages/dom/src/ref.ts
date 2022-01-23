import xs, { Producer, Listener } from 'xstream';
import fromEvent from 'xstream/extra/fromEvent';

export const createRef = () => {
  const producer = new EventProducer();

  function createEventStream(el: any) {
    producer.setElement(el);
  }

  createEventStream.events = (eventName: string) => {
    producer.setEventName(eventName);
    return xs.create(producer);
  };

  return createEventStream;
};

class EventProducer implements Producer<Event> {
  private listener?: Listener<Event>;
  private element?: Element;
  private eventName?: string;

  setElement(element: Element) {
    this.element = element;
    this.createEvent();
  }

  setEventName(eventName: string) {
    this.eventName = eventName;
    this.createEvent();
  }

  createEvent() {
    if (this.element && this.eventName) {
      fromEvent(this.element, this.eventName).addListener({
        next: (e) => this.listener?.next(e),
      });
    }
  }

  start(listener: Listener<Event>) {
    this.listener = listener;
  }

  stop() { }
}
