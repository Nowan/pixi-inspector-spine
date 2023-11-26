import type { IAnimation, ITrackEntry } from "pixi-spine";

export type SpineProperties = {
  spineAnimationHead: number;
  spinePlaybackSpeed: number;
  spineTracks: SpineSerializableTrackData[];
  spineAnimations: IAnimation[];
}

export type SpineSerializableTrackData = SpineSerializableTrackEntry[] | null

export type SpineSerializableTrackEntry = {
  animation: SpineSerializableAnimationData;
  loop: boolean;
  delay: number;
}

export type SpineSerializableAnimationData = Omit<IAnimation, "timelines">;

export type TrackEntry = ITrackEntry & { animation: IAnimation, next: TrackEntry | null }

export type SpinePropertyTab = "spine";