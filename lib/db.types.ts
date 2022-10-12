export type tag = { name: string, message: string }
export type track = { hour: string, activity: string, tag: string }
export type document = { tracks: track[], tags: tag[], name: string }