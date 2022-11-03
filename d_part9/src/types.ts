export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CoursePartBaseExtended extends CoursePartBase {
  description: string;
}

export interface CourseNormalPart extends CoursePartBaseExtended {
  type: "normal";
}

export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartBaseExtended {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CoursePartBaseExtended {
  type: "special";
  requirements: Array<string>;
}

export type CoursePart = CourseSpecialPart | CourseNormalPart | CourseProjectPart | CourseSubmissionPart;