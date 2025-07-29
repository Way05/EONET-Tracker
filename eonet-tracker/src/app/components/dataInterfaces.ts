export interface categoriesFormat {
  id: string;
  title: string;
}

export interface sourcesFormat {
  id: string;
  url: string;
}

export interface geometryFormat {
  magnitudeValue: number;
  magnitudeUnit: string;
  date: string;
  type: string;
  coordinates: [number, number];
}

export interface eventFormat {
  id: string;
  title: string;
  description: string | null;
  link: string;
  closed: boolean | null;
  categories: categoriesFormat[];
  sources: sourcesFormat[];
  geometry: geometryFormat[];
}

export interface allEventsFormat {
  title: string;
  description: string;
  link: string;
  events: eventFormat[];
}

export type propsListEvents = {
  events: eventFormat[] | undefined;
};
