import { fromEvent, Subject } from 'rxjs';

export const createRef = () => {
  const producer = new EventProducer();

  function createEventStream(el: any) {
    producer.setElement(el);
  }

  createEventStream.events = (eventName: string) => {
    producer.setEventName(eventName);
    return producer.event$;
  };

  return createEventStream;
};

class EventProducer {
  public event$ = new Subject();
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
      fromEvent(this.element, this.eventName).subscribe(this.event$);
    }
  }
}
