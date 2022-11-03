import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map(part => (
        <div key={part.type}>
          <div>
            <strong>{part.name} {part.exerciseCount}</strong>
          </div>
          <Part part={part} />
        </div>
      ))}
      </div>
  );
};

export default Content;