export type HandlersMap<T extends string, P> = {
  [key in T]: P;
};

export class ChannelCollection<T extends string = string> {
  channel: HandlersMap<T, Channel>;
  eventKeys: T[];
  constructor(eventKeys: T[]) {
    const channel = {} as HandlersMap<T, Channel>;
    eventKeys.forEach((key) => {
      channel[key] = new Channel();
    });
    this.eventKeys = eventKeys;
    this.channel = channel;
  }

  subscribe(key: T, handler: Fn) {
    this.channel[key].subscribe(handler);
  }

  unsubscribe(key: T, fn: Fn) {
    this.channel[key].unsubscribe(fn);
  }

  emit(key: T, ...args: any[]) {
    this.channel[key].emit(...args);
  }

  stop() {
    this.eventKeys.forEach((e) => {
      this.channel[e].stop();
    });
  }
}

export class Channel {
  handlers: {
    handler: Fn;
    once?: boolean;
  }[] = [];

  subscribe(handler: Fn, once = false) {
    this.handlers.push({
      handler,
      once,
    });
  }

  unsubscribe(fn: Fn) {
    const index = this.handlers.findIndex(e => e.handler == fn);
    this.handlers.splice(index, 1);
  }

  emit(...args: any[]) {
    const onceHandlers: Fn[] = [];
    this.handlers.forEach(({ handler, once }) => {
      handler(...args);
      if (once)
        onceHandlers.push(handler);
    });
    onceHandlers.forEach(e => this.unsubscribe(e));
  }

  stop() {
    this.handlers = [];
  }
}

export function useChannel(channel: Channel, callback: Fn): void;
export function useChannel(channel: ChannelCollection, key: string, callback: Fn): void;
export function useChannel(
  channelOrChannelCollection: Channel | ChannelCollection,
  key: string | Fn,
  callback?: Fn,
) {
  function getFn() {
    if (typeof key == 'string')
      return callback!;

    return key!;
  }
  function getChannel() {
    return channelOrChannelCollection instanceof Channel
      ? channelOrChannelCollection
      : typeof key == 'string'
        ? channelOrChannelCollection.channel[key]
        : null;
  }
  onMounted(() => getChannel()?.subscribe(getFn()));
  onUnmounted(() => getChannel()?.unsubscribe(getFn()));
}
