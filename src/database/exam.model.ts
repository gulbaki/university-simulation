import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { University } from './university.model';
import { Student } from './student.model';

interface Exam extends Document {
  readonly date?: Date;
  readonly questions: string[];
  readonly results:  {
    student: Partial<Student>;
    point: number
  };
  readonly university?: Partial<University>;
}

type ExamModel = Model<Exam>;

const ExamSchema = new Schema<Exam>(
  {
    date: SchemaTypes.String,
    questions: SchemaTypes.String,
    results: [
      {
        student: { type: SchemaTypes.ObjectId, ref: 'Student' },
        point: { type: SchemaTypes.Number, required: true },
      },
    ],
  },
  { timestamps: true },
);

const createExamModel: (conn: Connection) => ExamModel = (conn: Connection) =>
  conn.model<Exam>('Exam', ExamSchema, 'exams');

export { Exam, ExamModel, createExamModel };
