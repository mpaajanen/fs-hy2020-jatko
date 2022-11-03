import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
  const assertnever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  }

  switch (part.type) {
    case "normal":
      return (
        <div><i>{part.description}</i></div>
      )
    case "groupProject":
      return (
        <div>project exercises: {part.groupProjectCount}</div>
      )
    case "submission":
      return (
        <div>
          <div><i>{part.description}</i></div>
          <div>submit to: {part.exerciseSubmissionLink}</div>
        </div>
      )
    case "special":
      // const skils = part.requirements.
      return (
        <div>required skils: {part.requirements.join(', ')}</div>
      )
      default:
      return assertnever(part);
  }
};

export default Part;

{/* <p>
{courseParts[1].name} {courseParts[1].exerciseCount}
</p> */}
